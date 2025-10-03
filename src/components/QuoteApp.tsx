import { useState, useEffect } from 'react';
import { blockchainService } from '../services/blockchainService';
import { pythonAIService } from '../services/pythonAIService';
import type { Quote } from '../services/blockchainService';
import type { QuoteSearchResult, RealtimeStatus } from '../services/pythonAIService';
import { QuoteList } from './QuoteList';
import { QuoteSearch } from './QuoteSearch';
import { AddQuoteForm } from './AddQuoteForm';
import AIInsightsModal from './AIInsightsModal';
import { QuoteDetailsModal } from './QuoteDetailsModal';
import BlockchainDiagram from './BlockchainDiagram';
import { WalletConnection } from './WalletConnection';
import SuperQuoteCreator from './SuperQuoteCreator';
import Toast from './Toast';
import { FaRocket, FaSync, FaGithub, FaReact, FaEthereum, FaPython } from 'react-icons/fa';

export function QuoteApp() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<QuoteSearchResult | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showSuperCreator, setShowSuperCreator] = useState<boolean>(false);
  const [aiStatus, setAiStatus] = useState<RealtimeStatus | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastDetails, setToastDetails] = useState<string>('');
  const [showAIModal, setShowAIModal] = useState<boolean>(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showQuoteDetails, setShowQuoteDetails] = useState<boolean>(false);
  const [showBlockchainDiagram, setShowBlockchainDiagram] = useState<boolean>(false);
  const [blockchainQuote, setBlockchainQuote] = useState<Quote | null>(null);

  // Subscribe to AI processing status updates
  useEffect(() => {
    pythonAIService.onStatusUpdate((status: RealtimeStatus) => {
      setAiStatus(status);
    });
  }, []);

  // Load quotes on component mount
  useEffect(() => {
    loadQuotes();
  }, []);

  // Filter quotes when category changes
  useEffect(() => {
    filterQuotes();
  }, [quotes, selectedCategory]);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      setError('');
      const fetchedQuotes = await blockchainService.getAllQuotes();
      setQuotes(fetchedQuotes);
    } catch (err) {
      setError(`Failed to load quotes: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Error loading quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterQuotes = () => {
    if (selectedCategory === 'all') {
      setFilteredQuotes(quotes);
    } else {
      setFilteredQuotes(quotes.filter(quote => 
        quote.category.toLowerCase() === selectedCategory.toLowerCase()
      ));
    }
  };

  const handleSearch = async (keywords: string) => {
    try {
      setError('');
      const aiResult = await pythonAIService.findBestQuote(keywords, quotes);
      setAiResponse(aiResult);
      setShowAIModal(true);
      
      if (aiResult.selectedQuote) {
        // Highlight the selected quote in the list
        setFilteredQuotes([aiResult.selectedQuote]);
      }
    } catch (err) {
      setError(`Search failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleRandomQuote = async () => {
    try {
      setError('');
      const aiResult = await pythonAIService.getRandomQuoteWithInsight(quotes);
      setAiResponse(aiResult);
      setShowAIModal(true);
      
      if (aiResult.selectedQuote) {
        setFilteredQuotes([aiResult.selectedQuote]);
      }
    } catch (err) {
      setError(`Failed to get random quote: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleQuoteClick = async (quote: Quote) => {
    // Show quote details modal
    setSelectedQuote(quote);
    setShowQuoteDetails(true);
  };

  // const handleGetAIInsights = async (quote: Quote) => {
  //   try {
  //     setError('');
  //     setShowQuoteDetails(false); // Close details modal
  //     // Get AI insights for the clicked quote
  //     const aiResult = await pythonAIService.getQuoteInsights(quote);
  //     setAiResponse(aiResult);
  //     setShowAIModal(true);
  //   } catch (err) {
  //     setError(`Failed to get quote insights: ${err instanceof Error ? err.message : 'Unknown error'}`);
  //   }
  // };

  const handleAddQuote = async () => {
    try {
      setError('');
      if (!walletAddress) {
        throw new Error('Please connect your wallet first');
      }

      // Verify blockchain service connection
      if (!blockchainService.isWalletConnected()) {
        // Try to reconnect
        const address = await blockchainService.connectWallet();
        if (address) {
          setWalletAddress(address);
        } else {
          throw new Error('Failed to connect wallet. Please try again.');
        }
      }

      setShowSuperCreator(true);
      setShowAddForm(false);
      
      // The SuperQuoteCreator will handle the entire process
    } catch (err) {
      setError(`Failed to open quote creator: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleQuoteCreated = (newQuote: Quote, quoteText: string, author: string) => {
    setQuotes(prev => [...prev, newQuote]);
    setShowSuperCreator(false);
    setError('');
    
    // Show success toast notification
    setToastMessage('🎉 Quote Created Successfully!');
    setToastDetails(`"${quoteText.substring(0, 60)}${quoteText.length > 60 ? '...' : ''}" by ${author} has been permanently stored on the blockchain!`);
    setShowToast(true);
  };

  const handleWalletConnected = (address: string) => {
    setWalletAddress(address);
  };

  const clearAIResponse = () => {
    setAiResponse(null);
    setAiStatus(null);
    setShowAIModal(false);
    filterQuotes(); // Reset to show all filtered quotes
  };

  const categories = ['all', ...new Set(quotes.map(quote => quote.category))];

  return (
    <div className="quote-app-container fade-in">
      {/* Ultra Premium Hero Section */}
      <section className="premium-hero-section">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>AI-Powered • Blockchain-Secured</span>
          </div>
          <h1 className="premium-hero-title">
            <span className="title-gradient">Premium Quote</span>
            <span className="title-accent">Manager</span>
          </h1>
          <p className="premium-hero-subtitle">
            Experience the future of quote management with cutting-edge AI and immutable blockchain technology
          </p>
          
          {/* Animated Stats Cards */}
          <div className="premium-stats-grid">
            <div className="premium-stat-card">
              <div className="stat-icon"></div>
              <div className="stat-content">
                <span className="stat-value">{quotes.length}</span>
                <span className="stat-label">Total Quotes</span>
              </div>
              <div className="stat-glow"></div>
            </div>
            <div className="premium-stat-card">
              <div className="stat-icon"></div>
              <div className="stat-content">
                <span className="stat-value">{filteredQuotes.length}</span>
                <span className="stat-label">Active Filters</span>
              </div>
              <div className="stat-glow"></div>
            </div>
            <div className="premium-stat-card">
              <div className="stat-icon">{walletAddress ? '' : '⚡'}</div>
              <div className="stat-content">
                <span className="stat-value">{walletAddress ? 'Connected' : 'Ready'}</span>
                <span className="stat-label">Wallet Status</span>
              </div>
              <div className="stat-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Status Bar */}
      {aiStatus && aiStatus.processing && (
        <div className="ai-status-bar">
          <div className="ai-status-indicator"></div>
          <span className="ai-status-text">
            AI Processing: {aiStatus.stage} - {aiStatus.progress}%
          </span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-container">
          <div className="error-text">
            <span>⚠️</span>
            {error}
          </div>
        </div>
      )}

      {/* Quick Actions Bar */}
      <div className="quick-actions-bar">
        <button 
          className="quick-action-btn primary"
          onClick={handleAddQuote}
          disabled={!walletAddress}
          title={!walletAddress ? "Connect wallet to add quotes" : ""}
        >
          <FaRocket />
          <span>{showAddForm ? 'Cancel' : 'Create Super Quote'}</span>
        </button>
        
        <button 
          className="quick-action-btn"
          onClick={loadQuotes}
          disabled={loading}
        >
          <FaSync className={loading ? 'spinning' : ''} />
          <span>{loading ? 'Loading...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="main-content-grid">
        <div className="content-left">
          {/* Wallet Connection Card */}
          <div className="premium-card">
            <div className="card-header">
              <div className="card-title">
                <span className="card-icon"></span>
                Wallet Connection
              </div>
            </div>
            <WalletConnection onWalletConnected={handleWalletConnected} />
          </div>

          {/* Search Section */}
          <div className="premium-card">
            <div className="card-header">
              <div className="card-title">
                <span className="card-icon">🔍</span>
                AI-Powered Search
              </div>
            </div>
            <QuoteSearch 
              onSearch={handleSearch}
              onRandomQuote={handleRandomQuote}
              onClearSearch={clearAIResponse}
            />
            
            <div className="search-section">
              <div className="search-controls">
                <div className="search-input-group">
                  <select 
                    className="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Add Quote Form */}
          {showAddForm && (
            <div className="premium-card slide-up">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">✍️</span>
                  Add New Quote
                </div>
                <button 
                  className="quick-action-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  ✕
                </button>
              </div>
              <AddQuoteForm 
                onAddQuote={async (_text: string, _author: string, _category: string) => {
                  setShowAddForm(false);
                  setShowSuperCreator(true);
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
        </div>

        <div className="content-right">
          {/* Quick Info Card - Shown when no AI response */}
          {!aiResponse && (
            <div className="premium-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">💡</span>
                  Quick Tips
                </div>
              </div>
              <div className="tips-content">
                <p className="tip-item"> Click any quote to get AI insights</p>
                <p className="tip-item"> Use AI search to find the perfect quote</p>
                <p className="tip-item"> Try the random quote feature</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quotes Display */}
      <div className="premium-card">
        <div className="card-header">
          <div className="card-title">
            <span className="card-icon"></span>
            Quote Collection ({filteredQuotes.length})
          </div>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading quotes from blockchain...</div>
          </div>
        ) : (
          <QuoteList 
            quotes={filteredQuotes}
            loading={loading}
            highlightedQuote={aiResponse?.selectedQuote || undefined}
            onQuoteClick={handleQuoteClick}
          />
        )}
      </div>

      {/* AI Insights Modal */}
      {aiResponse && (
        <AIInsightsModal
          aiResponse={aiResponse}
          onClose={clearAIResponse}
          isOpen={showAIModal}
        />
      )}

      {/* Quote Details Modal */}
      {selectedQuote && (
        <QuoteDetailsModal
          quote={selectedQuote}
          onClose={() => {
            setShowQuoteDetails(false);
            setSelectedQuote(null);
          }}
          onOpenBlockchainDiagram={(quote) => {
            setBlockchainQuote(quote);
            setShowBlockchainDiagram(true);
            setShowQuoteDetails(false);
            setSelectedQuote(null);
          }}
          isOpen={showQuoteDetails}
        />
      )}

      {/* Blockchain Diagram Modal */}
      {showBlockchainDiagram && blockchainQuote && (
        <BlockchainDiagram
          quote={blockchainQuote}
          onClose={() => {
            setShowBlockchainDiagram(false);
            setBlockchainQuote(null);
          }}
          isOpen={showBlockchainDiagram}
        />
      )}

      {/* Super Quote Creator Modal */}
      {showSuperCreator && (
        <SuperQuoteCreator
          walletAddress={walletAddress}
          onQuoteCreated={handleQuoteCreated}
          onClose={() => setShowSuperCreator(false)}
        />
      )}

      {/* Detailed Footer */}
      <footer className="doc-footer" style={{ marginTop: 'var(--space-12)' }}>
        <h3 className="footer-title">AIB Quote Manager</h3>
        <p className="footer-subtitle">Next-Generation Blockchain Quote Platform</p>
        <p className="footer-team">
          Built with ❤️ by Team AIB
        </p>
        <p className="footer-team">
          <strong>Adnan Qureshi (67)</strong> • <strong>Chirayu Giri (68)</strong> • <strong>Abdul Adeen (69)</strong> • <strong>Ralph Gonsalves (9)</strong>
        </p>
        <p className="footer-team" style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
          Project Mentor: <strong>Abhijeet Jhadhav</strong>
        </p>
        <p className="footer-copyright">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
        <div className="tech-stack" style={{ marginTop: '1.5rem' }}>
          <a 
            href="https://github.com/Adnan8101/smart-quotes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tech-badge"
            style={{ textDecoration: 'none' }}
          >
            <FaGithub /> Open Source
          </a>
          <div className="tech-badge"><FaReact /> React</div>
          <div className="tech-badge"><FaEthereum /> Ethereum</div>
          <div className="tech-badge"><FaPython /> Python AI</div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          details={toastDetails}
          onClose={() => setShowToast(false)}
          duration={6000}
        />
      )}
    </div>
  );
}
