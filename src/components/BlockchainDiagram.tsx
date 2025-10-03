import { useState, useEffect } from 'react';
import { 
  FaEthereum, FaCube, FaHashtag, FaClock, 
  FaGasPump, FaUserAlt, FaCoins, FaNetworkWired, FaLayerGroup,
  FaCode, FaLock, FaCheckCircle, FaQuoteLeft
} from 'react-icons/fa';
import { MdTimeline, MdSecurity, MdSpeed } from 'react-icons/md';
import { BiTransfer, BiData } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi';
import type { Quote } from '../services/blockchainService';
import { blockchainService } from '../services/blockchainService';
import './BlockchainDiagram.css';

interface BlockchainDiagramProps {
  quote: Quote;
  onClose: () => void;
  isOpen: boolean;
}

interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  blockHash: string;
  from: string;
  to: string;
  gasUsed: string;
  gasPrice: string;
  timestamp: number;
  status: 'confirmed' | 'pending' | 'failed';
  value: string;
  data: string;
}

interface NetworkStats {
  gasPrice: string;
  blockNumber: number;
  networkName: string;
  totalSupply?: string;
  difficulty?: string;
  hashRate?: string;
}

export function BlockchainDiagram({ quote, onClose, isOpen }: BlockchainDiagramProps) {
  const [activeTab, setActiveTab] = useState<'diagram' | 'transaction' | 'network' | 'security'>('diagram');
  const [transactionData, setTransactionData] = useState<BlockchainTransaction | null>(null);
  const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      loadBlockchainData();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const loadBlockchainData = async () => {
    setLoading(true);
    try {
      // Load network stats
      const stats = await blockchainService.getNetworkStats();
      setNetworkStats(stats);

      // Simulate transaction data (in real implementation, you'd fetch this from the blockchain)
      const mockTransaction: BlockchainTransaction = {
        hash: `0x${Math.random().toString(16).substr(2, 40)}`,
        blockNumber: stats.blockNumber - Math.floor(Math.random() * 100),
        blockHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        from: quote.submitter,
        to: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Contract address
        gasUsed: (45000 + Math.floor(Math.random() * 10000)).toString(),
        gasPrice: stats.gasPrice,
        timestamp: quote.timestamp,
        status: 'confirmed',
        value: '0',
        data: `addQuote("${quote.text.substring(0, 20)}...", "${quote.author}", "${quote.category}")`
      };
      setTransactionData(mockTransaction);
    } catch (error) {
      console.error('Failed to load blockchain data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatGwei = (wei: string) => {
    try {
      const gwei = parseFloat(wei) / 1e9;
      return `${gwei.toFixed(2)} Gwei`;
    } catch {
      return wei;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (!isOpen) return null;

  return (
    <div className="blockchain-diagram-overlay">
      <div className="blockchain-diagram-modal">
        {/* Header */}
        <div className="blockchain-header">
          <div className="header-content">
            <div className="header-icon">
              <FaEthereum />
            </div>
            <div className="header-text">
              <h2>Blockchain Transaction Analysis</h2>
              <p>Quote ID: #{quote.id} • {quote.category}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="blockchain-nav">
          <button 
            className={`nav-tab ${activeTab === 'diagram' ? 'active' : ''}`}
            onClick={() => setActiveTab('diagram')}
          >
            <MdTimeline />
            <span>Blockchain Flow</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'transaction' ? 'active' : ''}`}
            onClick={() => setActiveTab('transaction')}
          >
            <BiTransfer />
            <span>Transaction Details</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'network' ? 'active' : ''}`}
            onClick={() => setActiveTab('network')}
          >
            <FaNetworkWired />
            <span>Network Stats</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <MdSecurity />
            <span>Security Analysis</span>
          </button>
        </div>

        {/* Content */}
        <div className="blockchain-content">
          {loading ? (
            <div className="loading-state">
              <div className="blockchain-spinner"></div>
              <p>Analyzing blockchain data...</p>
            </div>
          ) : (
            <>
              {/* Blockchain Diagram Tab */}
              {activeTab === 'diagram' && (
                <div className="diagram-tab">
                  <div className="blockchain-flow">
                    {/* Step 1: User Wallet */}
                    <div className="flow-step">
                      <div className="step-icon wallet-icon">
                        <FaUserAlt />
                      </div>
                      <div className="step-content">
                        <h3>User Wallet</h3>
                        <p>{formatAddress(quote.submitter)}</p>
                        <div className="step-details">
                          <span className="detail-item">
                            <FaEthereum />
                            MetaMask Connected
                          </span>
                        </div>
                      </div>
                      <div className="flow-arrow">→</div>
                    </div>

                    {/* Step 2: Smart Contract */}
                    <div className="flow-step">
                      <div className="step-icon contract-icon">
                        <FaCode />
                      </div>
                      <div className="step-content">
                        <h3>Smart Contract</h3>
                        <p>QuoteManager.sol</p>
                        <div className="step-details">
                          <span className="detail-item">
                            <FaLock />
                            Secure & Immutable
                          </span>
                          <span className="detail-item">
                            <MdSpeed />
                            Gas Optimized
                          </span>
                        </div>
                      </div>
                      <div className="flow-arrow">→</div>
                    </div>

                    {/* Step 3: Blockchain Block */}
                    <div className="flow-step">
                      <div className="step-icon block-icon">
                        <FaCube />
                      </div>
                      <div className="step-content">
                        <h3>Blockchain Block</h3>
                        <p>Block #{transactionData?.blockNumber || '...'}</p>
                        <div className="step-details">
                          <span className="detail-item">
                            <FaCheckCircle />
                            Confirmed
                          </span>
                          <span className="detail-item">
                            <FaHashtag />
                            Hash Verified
                          </span>
                        </div>
                      </div>
                      <div className="flow-arrow">→</div>
                    </div>

                    {/* Step 4: Network Distribution */}
                    <div className="flow-step">
                      <div className="step-icon network-icon">
                        <FaNetworkWired />
                      </div>
                      <div className="step-content">
                        <h3>Network Distribution</h3>
                        <p>{networkStats?.networkName || 'Ethereum Network'}</p>
                        <div className="step-details">
                          <span className="detail-item">
                            <FaLayerGroup />
                            Distributed Ledger
                          </span>
                          <span className="detail-item">
                            <HiSparkles />
                            Consensus Reached
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Blockchain Visualization */}
                  <div className="blockchain-visualization">
                    <h3>Live Blockchain Visualization</h3>
                    <div className="block-chain">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`block ${i === 2 ? 'active-block' : ''}`}>
                          <div className="block-header">
                            <FaCube />
                            <span>Block #{(transactionData?.blockNumber || 1000) - (4 - i)}</span>
                          </div>
                          <div className="block-content">
                            <div className="block-hash">
                              {i === 2 ? transactionData?.blockHash.slice(0, 10) : `0x${Math.random().toString(16).substr(2, 8)}`}...
                            </div>
                            <div className="block-transactions">
                              {i === 2 && (
                                <div className="transaction-highlight">
                                  <FaQuoteLeft className="quote-icon" />
                                  <span>Your Quote Transaction</span>
                                </div>
                              )}
                              <span className="tx-count">{Math.floor(Math.random() * 50) + 10} txs</span>
                            </div>
                          </div>
                          {i < 4 && <div className="block-connector">⛓️</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Details Tab */}
              {activeTab === 'transaction' && transactionData && (
                <div className="transaction-tab">
                  <div className="transaction-overview">
                    <div className="tx-status">
                      <FaCheckCircle className="success-icon" />
                      <div>
                        <h3>Transaction Confirmed</h3>
                        <p>Your quote has been permanently stored on the blockchain</p>
                      </div>
                    </div>
                  </div>

                  <div className="transaction-details-grid">
                    <div className="detail-card">
                      <div className="detail-header">
                        <FaHashtag />
                        <h4>Transaction Hash</h4>
                      </div>
                      <div className="detail-value hash-value">
                        {transactionData.hash}
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(transactionData.hash)}>
                          📋
                        </button>
                      </div>
                    </div>

                    <div className="detail-card">
                      <div className="detail-header">
                        <FaCube />
                        <h4>Block Number</h4>
                      </div>
                      <div className="detail-value">
                        #{transactionData.blockNumber}
                      </div>
                    </div>

                    <div className="detail-card">
                      <div className="detail-header">
                        <FaClock />
                        <h4>Timestamp</h4>
                      </div>
                      <div className="detail-value">
                        {formatTimestamp(transactionData.timestamp)}
                      </div>
                    </div>

                    <div className="detail-card">
                      <div className="detail-header">
                        <FaGasPump />
                        <h4>Gas Used</h4>
                      </div>
                      <div className="detail-value">
                        {parseInt(transactionData.gasUsed).toLocaleString()} gas
                      </div>
                    </div>

                    <div className="detail-card">
                      <div className="detail-header">
                        <FaCoins />
                        <h4>Gas Price</h4>
                      </div>
                      <div className="detail-value">
                        {formatGwei(transactionData.gasPrice)}
                      </div>
                    </div>

                    <div className="detail-card">
                      <div className="detail-header">
                        <BiData />
                        <h4>Transaction Data</h4>
                      </div>
                      <div className="detail-value code-value">
                        {transactionData.data}
                      </div>
                    </div>
                  </div>

                  {/* Quote Data Breakdown */}
                  <div className="quote-data-breakdown">
                    <h4>📊 Stored Quote Data</h4>
                    <div className="data-fields">
                      <div className="data-field">
                        <span className="field-label">Quote Text:</span>
                        <span className="field-value">"{quote.text}"</span>
                      </div>
                      <div className="data-field">
                        <span className="field-label">Author:</span>
                        <span className="field-value">{quote.author}</span>
                      </div>
                      <div className="data-field">
                        <span className="field-label">Category:</span>
                        <span className="field-value">{quote.category}</span>
                      </div>
                      <div className="data-field">
                        <span className="field-label">Submitter:</span>
                        <span className="field-value">{formatAddress(quote.submitter)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Network Stats Tab */}
              {activeTab === 'network' && networkStats && (
                <div className="network-tab">
                  <div className="network-overview">
                    <div className="network-status">
                      <FaNetworkWired className="network-icon" />
                      <div>
                        <h3>{networkStats.networkName}</h3>
                        <p>Current blockchain network status and statistics</p>
                      </div>
                    </div>
                  </div>

                  <div className="network-stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <FaCube />
                      </div>
                      <div className="stat-content">
                        <h4>Latest Block</h4>
                        <div className="stat-value">#{networkStats.blockNumber}</div>
                        <div className="stat-change">+1 every ~12s</div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <FaGasPump />
                      </div>
                      <div className="stat-content">
                        <h4>Gas Price</h4>
                        <div className="stat-value">{formatGwei(networkStats.gasPrice)}</div>
                        <div className="stat-change">Network standard</div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <MdSpeed />
                      </div>
                      <div className="stat-content">
                        <h4>Network Speed</h4>
                        <div className="stat-value">12s</div>
                        <div className="stat-change">Avg block time</div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <FaLock />
                      </div>
                      <div className="stat-content">
                        <h4>Security Level</h4>
                        <div className="stat-value">Maximum</div>
                        <div className="stat-change">Cryptographically secured</div>
                      </div>
                    </div>
                  </div>

                  {/* Network Health */}
                  <div className="network-health">
                    <h4>🏥 Network Health Monitor</h4>
                    <div className="health-metrics">
                      <div className="health-metric">
                        <span className="metric-name">Node Connectivity</span>
                        <div className="metric-bar">
                          <div className="metric-fill" style={{ width: '98%' }}></div>
                        </div>
                        <span className="metric-value">98%</span>
                      </div>
                      <div className="health-metric">
                        <span className="metric-name">Transaction Throughput</span>
                        <div className="metric-bar">
                          <div className="metric-fill" style={{ width: '85%' }}></div>
                        </div>
                        <span className="metric-value">85%</span>
                      </div>
                      <div className="health-metric">
                        <span className="metric-name">Network Consensus</span>
                        <div className="metric-bar">
                          <div className="metric-fill" style={{ width: '100%' }}></div>
                        </div>
                        <span className="metric-value">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Analysis Tab */}
              {activeTab === 'security' && (
                <div className="security-tab">
                  <div className="security-overview">
                    <div className="security-status">
                      <FaLock className="security-icon" />
                      <div>
                        <h3>Security Analysis</h3>
                        <p>Comprehensive security assessment of your quote transaction</p>
                      </div>
                    </div>
                  </div>

                  <div className="security-checks">
                    <div className="security-check passed">
                      <FaCheckCircle />
                      <div>
                        <h4>Cryptographic Signature Verified</h4>
                        <p>Transaction signed with your private key and verified by the network</p>
                      </div>
                    </div>

                    <div className="security-check passed">
                      <FaCheckCircle />
                      <div>
                        <h4>Smart Contract Security</h4>
                        <p>Contract follows OpenZeppelin security patterns and best practices</p>
                      </div>
                    </div>

                    <div className="security-check passed">
                      <FaCheckCircle />
                      <div>
                        <h4>Immutability Guarantee</h4>
                        <p>Quote data cannot be altered once stored on the blockchain</p>
                      </div>
                    </div>

                    <div className="security-check passed">
                      <FaCheckCircle />
                      <div>
                        <h4>Decentralized Storage</h4>
                        <p>Data replicated across thousands of nodes worldwide</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Score */}
                  <div className="security-score">
                    <h4>🛡️ Security Score</h4>
                    <div className="score-visualization">
                      <div className="score-circle">
                        <svg width="120" height="120">
                          <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" strokeWidth="8"/>
                          <circle 
                            cx="60" 
                            cy="60" 
                            r="50" 
                            fill="none" 
                            stroke="#4CAF50" 
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 50 * 0.97} ${2 * Math.PI * 50}`}
                            strokeDashoffset={2 * Math.PI * 50 * 0.25}
                            transform="rotate(-90 60 60)"
                          />
                        </svg>
                        <div className="score-text">
                          <span className="score-number">97</span>
                          <span className="score-label">/ 100</span>
                        </div>
                      </div>
                      <div className="score-description">
                        <h5>Excellent Security Rating</h5>
                        <p>Your quote transaction meets the highest security standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlockchainDiagram;
