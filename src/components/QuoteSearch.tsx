import { useState } from 'react';

interface QuoteSearchProps {
  onSearch: (keywords: string) => void;
  onRandomQuote: () => void;
  onClearSearch: () => void;
}

export function QuoteSearch({ onSearch, onRandomQuote, onClearSearch }: QuoteSearchProps) {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeywords.trim()) return;
    
    setIsSearching(true);
    try {
      await onSearch(searchKeywords.trim());
    } finally {
      setIsSearching(false);
    }
  };

  const handleRandomQuote = async () => {
    setIsSearching(true);
    try {
      await onRandomQuote();
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setSearchKeywords('');
    onClearSearch();
  };

  return (
    <div className="quote-search">
      <h3>🤖 AI-Powered Search</h3>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={searchKeywords}
            onChange={(e) => setSearchKeywords(e.target.value)}
            placeholder="Search for quotes by keywords, themes, or emotions..."
            className="search-input"
            disabled={isSearching}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!searchKeywords.trim() || isSearching}
          >
            {isSearching ? '🔍' : 'Search'}
          </button>
        </div>
      </form>

      <div className="search-actions">
        <button 
          className="btn btn-secondary"
          onClick={handleRandomQuote}
          disabled={isSearching}
        >
          🎲 Random Quote + AI Insight
        </button>
        
        <button 
          className="btn btn-outline"
          onClick={handleClear}
          disabled={isSearching}
        >
          Clear
        </button>
      </div>

      <div className="search-help">
        <p>💡 Try searching for:</p>
        <div className="search-examples">
          <button 
            className="example-tag" 
            onClick={() => setSearchKeywords('motivation')}
          >
            motivation
          </button>
          <button 
            className="example-tag" 
            onClick={() => setSearchKeywords('life wisdom')}
          >
            life wisdom
          </button>
          <button 
            className="example-tag" 
            onClick={() => setSearchKeywords('success')}
          >
            success
          </button>
          <button 
            className="example-tag" 
            onClick={() => setSearchKeywords('inspiration')}
          >
            inspiration
          </button>
        </div>
      </div>
    </div>
  );
}
