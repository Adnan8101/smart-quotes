import { useEffect } from 'react';
import { MdClose, MdContentCopy } from 'react-icons/md';
import { FaQuoteLeft, FaUserAlt, FaTag, FaClock, FaEthereum, FaCheckCircle, FaHashtag, FaCube } from 'react-icons/fa';
import type { Quote } from '../services/blockchainService';

interface QuoteDetailsModalProps {
  quote: Quote;
  onClose: () => void;
  onOpenBlockchainDiagram: (quote: Quote) => void;
  isOpen: boolean;
}

export function QuoteDetailsModal({ quote, onClose, onOpenBlockchainDiagram, isOpen }: QuoteDetailsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !quote) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return {
      full: date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
    console.log(`${label} copied to clipboard!`);
  };

  const dateInfo = formatDate(quote.timestamp);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container quote-details-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            <FaQuoteLeft />
            Quote Details
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Quote Content Section */}
          <div className="detail-section quote-content-section">
            <h3 className="detail-section-title">
              <FaQuoteLeft /> Quote
            </h3>
            <blockquote className="detail-quote">
              "{quote.text}"
            </blockquote>
            <cite className="detail-author">— {quote.author}</cite>
          </div>

          {/* Basic Information */}
          <div className="detail-section">
            <h3 className="detail-section-title">Basic Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">
                  <FaHashtag /> Quote ID
                </div>
                <div className="detail-value">
                  #{quote.id}
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(quote.id.toString(), 'Quote ID')}
                    title="Copy Quote ID"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FaTag /> Category
                </div>
                <div className="detail-value">
                  <span className="category-badge">{quote.category}</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FaCheckCircle /> Status
                </div>
                <div className="detail-value">
                  <span className={`status-badge ${quote.isActive ? 'active' : 'inactive'}`}>
                    {quote.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Information */}
          <div className="detail-section">
            <h3 className="detail-section-title">
              <FaEthereum /> Blockchain Information
            </h3>
            <div className="detail-grid">
              <div className="detail-item full-width">
                <div className="detail-label">
                  <FaUserAlt /> Submitter Address
                </div>
                <div className="detail-value">
                  <code className="address-code">{quote.submitter}</code>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(quote.submitter, 'Submitter Address')}
                    title="Copy Address"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FaClock /> Created
                </div>
                <div className="detail-value">
                  <div className="timestamp-info">
                    <div className="timestamp-relative">{formatTimestamp(quote.timestamp)}</div>
                    <div className="timestamp-date">{dateInfo.date}</div>
                    <div className="timestamp-time">{dateInfo.time}</div>
                  </div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  Unix Timestamp
                </div>
                <div className="detail-value">
                  <code>{quote.timestamp}</code>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(quote.timestamp.toString(), 'Timestamp')}
                    title="Copy Timestamp"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Full Date & Time */}
          <div className="detail-section">
            <h3 className="detail-section-title">
              <FaClock /> Full Date & Time
            </h3>
            <div className="detail-fulldate">
              {dateInfo.full}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="detail-section">
            <h3 className="detail-section-title">Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Quote Length</div>
                <div className="stat-value">{quote.text.length}</div>
                <div className="stat-unit">characters</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Word Count</div>
                <div className="stat-value">{quote.text.split(' ').length}</div>
                <div className="stat-unit">words</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Author Length</div>
                <div className="stat-value">{quote.author.length}</div>
                <div className="stat-unit">characters</div>
              </div>
            </div>
          </div>

          {/* Blockchain Notice */}
          <div className="detail-notice">
            <div className="notice-icon">🔒</div>
            <div className="notice-content">
              <div className="notice-title">Stored on Blockchain</div>
              <div className="notice-text">
                This quote is permanently stored on the Ethereum blockchain and cannot be modified or deleted.
                All transactions are immutable and publicly verifiable.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            className="btn-modal-primary" 
            onClick={() => onOpenBlockchainDiagram(quote)}
            style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaCube />
            View Blockchain Diagram
          </button>
          <button className="btn-modal-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
