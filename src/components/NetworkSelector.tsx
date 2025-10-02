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
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: '#059669',
                      fontWeight: 'var(--font-semibold)',
                      fontStyle: 'italic'
                    }}>
                      MetaMask will show gas fees, but you're using test tokens!
                    </div>
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
