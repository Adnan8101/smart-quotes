import { useState } from 'react';
import { blockchainService, NETWORKS, type NetworkKey } from '../services/blockchainService';

interface NetworkSelectorProps {
  onNetworkSelected: (networkKey: NetworkKey) => void;
  onCancel: () => void;
}

export function NetworkSelector({ onNetworkSelected, onCancel }: NetworkSelectorProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkKey>('HARDHAT_LOCAL');
  const [isSwitching, setIsSwitching] = useState(false);
  const [error, setError] = useState('');

  const networks = blockchainService.getAvailableNetworks();
  const freeNetworks = networks.filter(n => n.isFree);

  const handleNetworkSelect = async () => {
    setIsSwitching(true);
    setError('');

    try {
      await blockchainService.switchNetwork(selectedNetwork);
      onNetworkSelected(selectedNetwork);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to switch network';
      setError(errorMessage);
      console.error('Network switch error:', err);
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            <span>🌐</span>
            Select Network
          </h2>
          <button className="modal-close-btn" onClick={onCancel}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div className="error-container" style={{ marginBottom: 'var(--space-4)' }}>
              <div className="error-text">
                <span>⚠️</span>
                {error}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{
              padding: 'var(--space-3)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--text-sm)',
              color: 'var(--gray-700)',
              textAlign: 'center'
            }}>
              💡 <strong>Recommended:</strong> Hardhat Local for instant transactions
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {freeNetworks.map((network) => (
              <label
                key={network.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 'var(--space-4)',
                  background: selectedNetwork === network.key ? 'var(--black)' : 'var(--white)',
                  color: selectedNetwork === network.key ? 'var(--white)' : 'var(--black)',
                  border: `2px solid ${selectedNetwork === network.key ? 'var(--black)' : 'var(--border-medium)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-normal)',
                  gap: 'var(--space-3)'
                }}
                onMouseEnter={(e) => {
                  if (selectedNetwork !== network.key) {
                    e.currentTarget.style.borderColor = 'var(--border-dark)';
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedNetwork !== network.key) {
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                    e.currentTarget.style.background = 'var(--white)';
                  }
                }}
              >
                <input
                  type="radio"
                  name="network"
                  value={network.key}
                  checked={selectedNetwork === network.key}
                  onChange={() => setSelectedNetwork(network.key)}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: selectedNetwork === network.key ? 'var(--white)' : 'var(--black)'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    <span style={{ fontSize: 'var(--text-lg)' }}>{network.icon}</span>
                    <strong style={{ fontSize: 'var(--text-base)' }}>{network.chainName}</strong>
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-xs)',
                    opacity: 0.8,
                    marginBottom: 'var(--space-2)'
                  }}>
                    Currency: {network.nativeCurrency.symbol} (Test Tokens)
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: 'var(--space-1) var(--space-3)',
                    background: network.isFree ? '#10b981' : '#ef4444',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-bold)',
                    marginBottom: 'var(--space-1)'
                  }}>
                    {network.isFree ? '✅ 100% FREE - NO REAL MONEY' : '💰 COSTS REAL MONEY'}
                  </div>
                  {network.isFree && (
                    <>
                      <div style={{
                        fontSize: 'var(--text-xs)',
                        color: '#059669',
                        fontWeight: 'var(--font-semibold)',
                        fontStyle: 'italic',
                        marginBottom: 'var(--space-2)'
                      }}>
                        MetaMask will show gas fees, but you're using test tokens!
                      </div>
                      {network.key === 'SEPOLIA' && (
                        <div style={{
                          marginTop: 'var(--space-2)',
                          padding: 'var(--space-2)',
                          background: '#fef3c7',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--text-xs)'
                        }}>
                          <strong style={{ color: '#92400e' }}>Need test ETH?</strong>
                          <br />
                          <a 
                            href="https://sepoliafaucet.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#0ea5e9', textDecoration: 'underline', fontWeight: 'var(--font-semibold)' }}
                          >
                            Get free Sepolia ETH →
                          </a>
                        </div>
                      )}
                      {network.key === 'POLYGON_AMOY' && (
                        <div style={{
                          marginTop: 'var(--space-2)',
                          padding: 'var(--space-2)',
                          background: '#fef3c7',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--text-xs)'
                        }}>
                          <strong style={{ color: '#92400e' }}>Need test MATIC?</strong>
                          <br />
                          <a 
                            href="https://faucet.polygon.technology" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#0ea5e9', textDecoration: 'underline', fontWeight: 'var(--font-semibold)' }}
                          >
                            Get free Amoy MATIC →
                          </a>
                        </div>
                      )}
                      {network.key === 'HARDHAT_LOCAL' && (
                        <div style={{
                          marginTop: 'var(--space-2)',
                          padding: 'var(--space-2)',
                          background: '#dbeafe',
                          borderRadius: 'var(--radius-md)',
                          fontSize: 'var(--text-xs)',
                          color: '#1e40af'
                        }}>
                          ⚡ <strong>Instant & Free!</strong> Pre-loaded with 10,000 ETH
                        </div>
                      )}
                    </>
                  )}
                </div>
                {selectedNetwork === network.key && (
                  <span style={{ fontSize: 'var(--text-xl)' }}>✓</span>
                )}
              </label>
            ))}
          </div>

          <div style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-4)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--text-xs)',
            color: 'var(--gray-600)'
          }}>
            <strong>Note:</strong> Make sure you have the selected network configured in MetaMask. 
            The system will automatically add it if it's not available.
          </div>

          <div style={{
            marginTop: 'var(--space-4)',
            padding: 'var(--space-4)',
            background: 'linear-gradient(135deg, #667eea15, #764ba215)',
            border: '2px solid #667eea',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--text-sm)',
            color: 'var(--black)'
          }}>
            <div style={{ fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-lg)' }}>📍</span>
              Where Are Your Quotes Stored?
            </div>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-5)', fontSize: 'var(--text-xs)', lineHeight: '1.6' }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>Hardhat Local:</strong> Stored on your computer (localhost:8545) - Resets when you restart the node
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>Sepolia Testnet:</strong> Stored on Ethereum Sepolia public testnet - Permanent & viewable on <a href="https://sepolia.etherscan.io" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>Sepolia Etherscan</a>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>Polygon Amoy:</strong> Stored on Polygon Amoy testnet - Permanent & viewable on <a href="https://amoy.polygonscan.com" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>Amoy PolygonScan</a>
              </li>
              <li>
                💡 After deployment, check <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px', fontSize: 'var(--text-xs)' }}>src/contract-address.json</code> for your contract address
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn-modal-secondary"
            onClick={onCancel}
            disabled={isSwitching}
          >
            Cancel
          </button>
          <button 
            className="btn-modal-primary"
            onClick={handleNetworkSelect}
            disabled={isSwitching}
          >
            {isSwitching ? (
              <>
                <span className="loading-spinner" style={{ width: '16px', height: '16px' }}></span>
                <span>Switching...</span>
              </>
            ) : (
              <>
                <span>✓</span>
                <span>Connect to {NETWORKS[selectedNetwork].chainName}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
