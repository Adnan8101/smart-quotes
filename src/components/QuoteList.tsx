import type { Quote } from '../services/blockchainService';

interface QuoteListProps {
  quotes: Quote[];
  loading: boolean;
  highlightedQuote?: Quote;
  onQuoteClick?: (quote: Quote) => void;
}

export function QuoteList({ quotes, loading, highlightedQuote, onQuoteClick }: QuoteListProps) {
  if (loading) {
    return (
      <div className="quote-list">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading quotes from blockchain...</p>
        </div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="quote-list">
        <div className="empty-state">
          <h3>No quotes found</h3>
          <p>Be the first to add a quote to the blockchain!</p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="quote-list">
      <h2>Quotes ({quotes.length})</h2>
      <div className="quotes-grid">
        {quotes.map((quote) => (
          <div 
            key={quote.id} 
            className={`quote-card ${highlightedQuote?.id === quote.id ? 'highlighted' : ''} ${onQuoteClick ? 'clickable' : ''}`}
            onClick={() => onQuoteClick?.(quote)}
          >
            <div className="quote-content">
              <blockquote>"{quote.text}"</blockquote>
              <cite>— {quote.author}</cite>
            </div>
            
            <div className="quote-meta">
              <span className="category">{quote.category}</span>
              <span className="date">{formatDate(quote.timestamp)}</span>
            </div>
            
            <div className="quote-footer">
              <span className="submitter">
                By: {formatAddress(quote.submitter)}
              </span>
              <span className="quote-id">#{quote.id}</span>
            </div>
            
            {onQuoteClick && (
              <div className="quote-click-hint">
                <span className="click-hint-text">Click for AI insights !</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
