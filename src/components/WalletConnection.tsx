import { useState, useEffect } from 'react';
import { blockchainService, NETWORKS, type NetworkKey } from '../services/blockchainService';
import { NetworkSelector } from './NetworkSelector';
import contractAddressData from '../contract-address.json';

interface WalletConnectionProps {
  onWalletConnected: (address: string) => void;
}

export function WalletConnection({ onWalletConnected }: WalletConnectionProps) {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showNetworkSelector, setShowNetworkSelector] = useState<boolean>(false);
  const [currentNetwork, setCurrentNetwork] = useState<NetworkKey>('HARDHAT_LOCAL');

  useEffect(() => {
    // Check if wallet is already connected
    checkWalletConnection();
    
    // Update current network from blockchain service
    const network = blockchainService.getCurrentNetwork();
    setCurrentNetwork(network);
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => {
        // Reload the page when chain changes
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkWalletConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          // Re-initialize the blockchain service connection
          const address = await blockchainService.connectWallet();
          if (address) {
            setWalletAddress(address);
            onWalletConnected(address);
            
            // Update current network
            const network = blockchainService.getCurrentNetwork();
            setCurrentNetwork(network);
          }
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected wallet
      blockchainService.disconnectWallet();
      setWalletAddress('');
      onWalletConnected('');
    } else {
      // User switched accounts - reconnect with new account
      try {
        const address = await blockchainService.connectWallet();
        if (address) {
          setWalletAddress(address);
          onWalletConnected(address);
          
          // Update current network
          const network = blockchainService.getCurrentNetwork();
          setCurrentNetwork(network);
        }
      } catch (error) {
        console.error('Error handling account change:', error);
        blockchainService.disconnectWallet();
        setWalletAddress('');
        onWalletConnected('');
      }
    }
  };

  const handleConnectClick = () => {
    setShowNetworkSelector(true);
  };

  const handleNetworkSelected = async (networkKey: NetworkKey) => {
    setIsConnecting(true);
    setError('');
    setShowNetworkSelector(false);
    
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const address = await blockchainService.connectWallet(networkKey);
      if (address) {
        setWalletAddress(address);
        setCurrentNetwork(networkKey);
        onWalletConnected(address);
        
        console.log(`✅ Network switched to: ${NETWORKS[networkKey].chainName}`);
        console.log(`📍 Current network state: ${networkKey}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    blockchainService.disconnectWallet();
    setWalletAddress('');
    onWalletConnected('');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!window.ethereum) {
    return (
      <div className="wallet-connection">
        <div className="wallet-error">
          <p>❌ MetaMask not detected</p>
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-connection">
      {error && (
        <div className="wallet-error">
          <p>❌ {error}</p>
          <button onClick={() => setError('')} className="btn btn-small">
            Dismiss
          </button>
        </div>
      )}

      {walletAddress ? (
        <div className="wallet-connected">
          <div className="wallet-info">
            <span className="wallet-icon">🟢</span>
            <span className="wallet-address">{formatAddress(walletAddress)}</span>
            <span style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--gray-500)',
              marginLeft: 'var(--space-2)'
            }}>
              {NETWORKS[currentNetwork]?.icon} {NETWORKS[currentNetwork]?.chainName}
            </span>
          </div>
          <button 
            className="btn btn-outline btn-small"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="wallet-disconnected">
          <button 
            className="btn btn-primary"
            onClick={handleConnectClick}
            disabled={isConnecting}
          >
            {isConnecting ? '🔗 Connecting...' : '🔗 Connect Wallet'}
          </button>
          <p className="wallet-help">
            Connect your wallet to add quotes to the blockchain (Free networks available!)
          </p>
        </div>
      )}

      {/* Contract Information - Show when connected */}
      {walletAddress && (
        <div style={{
          marginTop: 'var(--space-4)',
          padding: 'var(--space-4)',
          background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
          border: '2px solid #0ea5e9',
          borderRadius: 'var(--radius-lg)',
          fontSize: 'var(--text-xs)'
        }}>
          <div style={{ fontWeight: 'var(--font-bold)', color: '#0369a1', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-base)' }}>📍</span>
            Where Your Quotes Are Stored
          </div>
          <div style={{ marginBottom: 'var(--space-2)', color: '#075985' }}>
            <strong>Network:</strong> {NETWORKS[currentNetwork]?.chainName}
          </div>
          <div style={{ marginBottom: 'var(--space-2)', color: '#075985' }}>
            <strong>Contract Address:</strong>
            <div style={{ 
              background: 'white', 
              padding: 'var(--space-2)', 
              borderRadius: 'var(--radius-md)', 
              marginTop: 'var(--space-1)',
              fontFamily: 'monospace',
              fontSize: 'var(--text-xs)',
              wordBreak: 'break-all',
              color: '#0369a1',
              fontWeight: 'var(--font-semibold)'
            }}>
              {contractAddressData.address}
            </div>
          </div>
          {currentNetwork === 'HARDHAT_LOCAL' ? (
            <div style={{ fontSize: 'var(--text-xs)', color: '#0c4a6e', background: '#bae6fd', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)' }}>
              💡 <strong>Local Network:</strong> Quotes stored on your computer (localhost:8545). Data resets when Hardhat restarts.
            </div>
          ) : (
            <div style={{ fontSize: 'var(--text-xs)', color: '#0c4a6e' }}>
              🌐 <strong>Public Testnet:</strong> Your quotes are permanently stored on the blockchain! 
              {currentNetwork === 'SEPOLIA' && (
                <div style={{ marginTop: 'var(--space-2)' }}>
                  View on <a href={`https://sepolia.etherscan.io/address/${contractAddressData.address}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0ea5e9', textDecoration: 'underline', fontWeight: 'var(--font-semibold)' }}>Sepolia Etherscan →</a>
                </div>
              )}
              {currentNetwork === 'POLYGON_AMOY' && (
                <div style={{ marginTop: 'var(--space-2)' }}>
                  View on <a href={`https://amoy.polygonscan.com/address/${contractAddressData.address}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0ea5e9', textDecoration: 'underline', fontWeight: 'var(--font-semibold)' }}>Amoy PolygonScan →</a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Network Selector Modal */}
      {showNetworkSelector && (
        <NetworkSelector
          onNetworkSelected={handleNetworkSelected}
          onCancel={() => setShowNetworkSelector(false)}
        />
      )}
    </div>
  );
}
