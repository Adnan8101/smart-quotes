import { useEffect, useState } from 'react';
import { blockchainService, NETWORKS } from '../services/blockchainService';

export function NetworkWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<string>('');

  useEffect(() => {
    checkNetwork();

    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
        checkNetwork();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', checkNetwork);
      }
    };
  }, []);

  const checkNetwork = async () => {
    if (!window.ethereum) return;

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setCurrentChainId(chainId);

      // Check if it's Ethereum Mainnet (0x1)
      const isMainnet = chainId.toLowerCase() === '0x1';
      
      // Check if it's any of our free networks
      const isFreeNetwork = Object.values(NETWORKS).some(
        network => network.chainId.toLowerCase() === chainId.toLowerCase()
      );

      setShowWarning(isMainnet || !isFreeNetwork);
    } catch (error) {
      console.error('Error checking network:', error);
    }
  };

  const handleSwitchToFree = async () => {
    try {
      await blockchainService.switchNetwork('HARDHAT_LOCAL');
      setShowWarning(false);
    } catch (error) {
      console.error('Error switching network:', error);
      alert('Please manually switch to a free network in MetaMask');
    }
  };

  if (!showWarning) return null;

  const isMainnet = currentChainId.toLowerCase() === '0x1';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isMainnet ? '#dc2626' : '#f59e0b',
      color: 'white',
      padding: 'var(--space-4)',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      animation: 'pulse 2s ease infinite'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <p style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-bold)',
            marginBottom: 'var(--space-1)'
          }}>
            {isMainnet ? '🚨 DANGER: You\'re on Ethereum Mainnet!' : '⚠️ Warning: You\'re on a paid network'}
          </p>
          <p style={{ fontSize: 'var(--text-sm)' }}>
            {isMainnet 
              ? 'Creating quotes will cost REAL MONEY ($0.15+). Switch to a FREE network immediately!'
              : 'This network may charge gas fees. Switch to a free test network to avoid costs.'}
          </p>
        </div>
        <button
          onClick={handleSwitchToFree}
          style={{
            background: 'white',
            color: isMainnet ? '#dc2626' : '#f59e0b',
            border: 'none',
            padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 'var(--font-bold)',
            fontSize: 'var(--text-base)',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all var(--transition-normal)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🔧 Switch to FREE Network
        </button>
        <button
          onClick={() => setShowWarning(false)}
          style={{
            background: 'transparent',
            color: 'white',
            border: '2px solid white',
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--text-xl)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
