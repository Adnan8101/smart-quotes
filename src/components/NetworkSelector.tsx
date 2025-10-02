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
            <div className="error-container">
              <div className="error-text">
                <span>⚠️</span>
                {error}
              </div>
            </div>
          )}

          <div className="info-box">
            💡 <strong>Recommended:</strong> Hardhat Local for instant transactions
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            {freeNetworks.map((network) => (
              <label
                key={network.key}
                className={`network-card ${selectedNetwork === network.key ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="network"
                  value={network.key}
                  checked={selectedNetwork === network.key}
                  onChange={() => setSelectedNetwork(network.key)}
                  className="network-card-radio"
                />
                <div className="network-card-content">
                  <div className="network-card-header">
                    <span className="network-card-icon">{network.icon}</span>
                    <strong className="network-card-name">{network.chainName}</strong>
                  </div>
                  <div className="network-card-currency">
                    Currency: {network.nativeCurrency.symbol} (Test Tokens)
                  </div>
                  <div className={`network-card-badge ${network.isFree ? '' : 'paid'}`}>
                    {network.isFree ? '✅ 100% FREE - NO REAL MONEY' : '💰 COSTS REAL MONEY'}
                  </div>
                  {network.isFree && (
                    <div className="network-card-note">
                      MetaMask will show gas fees, but you're using test tokens!
                    </div>
                  )}
                </div>
                {selectedNetwork === network.key && (
                  <span className="network-card-checkmark">✓</span>
                )}
              </label>
            ))}
          </div>

          <div className="info-box note">
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
                <span className="loading-spinner"></span>
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
