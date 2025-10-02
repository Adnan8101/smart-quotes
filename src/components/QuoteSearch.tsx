import { useState } from 'react';
import { FaSearch, FaDice, FaTimes, FaLightbulb, FaBrain } from 'react-icons/fa';

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
      <div className="search-header">
        <FaBrain className="search-icon" />
        <h3>AI-Powered Search</h3>
      </div>
      
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
            <FaSearch />
            <span>{isSearching ? 'Searching...' : 'Search'}</span>
          </button>
        </div>
      </form>

      <div className="search-actions">
        <button 
          className="btn btn-secondary"
          onClick={handleRandomQuote}
          disabled={isSearching}
        >
          <FaDice />
          <span>Random Quote</span>
        </button>
        
        <button 
          className="btn btn-outline"
          onClick={handleClear}
          disabled={isSearching}
        >
          <FaTimes />
          <span>Clear</span>
        </button>
      </div>

      <div className="search-help">
        <div className="search-help-header">
          <FaLightbulb className="help-icon" />
          <p>Try searching for:</p>
        </div>
        <div className="search-examples">
          <button 
            className="example-tag" 
            onClick={() => setSearchKeywords('motivation')}
            disabled={isSearching}
          >
            motivation
          </button>
          <button 
            className="example-tag" 
            onClick={() => setSearchKeywords('life wisdom')}
            disabled={isSearching}
          >
            life wisdom
          </button>
          <button 
            className="example-tag" 
            onClick={() => setSearchKeywords('success')}
            disabled={isSearching}
          >
            success
          </button>
          <button 
            className="example-tag" 
            onClick={() => setSearchKeywords('inspiration')}
            disabled={isSearching}
          >
            inspiration
          </button>
        </div>
      </div>
    </div>
  );
}
