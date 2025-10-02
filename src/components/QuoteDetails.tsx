import { useState } from 'react';
import type { Quote } from '../services/blockchainService';
import { blockchainService } from '../services/blockchainService';

interface QuoteDetailsProps {
  quote: Quote;
  onClose: () => void;
}

export function QuoteDetails({ quote, onClose }: QuoteDetailsProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return {
      full: date.toLocaleString('en-US', { 
        dateStyle: 'full', 
        timeStyle: 'long' 
      }),
      relative: getRelativeTime(timestamp)
    };
  };

  const getRelativeTime = (timestamp: number) => {
    const seconds = Math.floor(Date.now() / 1000 - timestamp);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBlockExplorerUrl = () => {
    const network = blockchainService.getCurrentNetwork();
    const networkConfig = blockchainService.getAvailableNetworks().find(n => n.key === network);
    
    if (networkConfig?.blockExplorer) {
      return `${networkConfig.blockExplorer}/tx/${quote.id}`;
    }
    return null;
  };

  const getCharacterCount = (text: string) => {
    return {
      characters: text.length,
      words: text.split(/\s+/).filter(w => w.length > 0).length,
      sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    };
  };

  const stats = getCharacterCount(quote.text);
  const dateInfo = formatDate(quote.timestamp);
  const explorerUrl = getBlockExplorerUrl();

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--space-4)',
        overflow: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'var(--black)',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          position: 'relative',
          color: 'white'
        }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 'var(--text-xl)',
              color: 'white',
              transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ✕
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-2xl)'
            }}>
              📜
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)' }}>
                Quote Details
              </h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: 'var(--text-sm)' }}>
                Quote #{quote.id}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--space-6)' }}>
          {/* Quote Text */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)'
            }}>
              <span style={{ fontSize: 'var(--text-xl)' }}>💬</span>
              <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                Quote Text
              </h4>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #00000015, #33333315)',
              border: '2px solid var(--black)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                fontSize: '80px',
                color: 'var(--black)',
                opacity: 0.1,
                lineHeight: 1
              }}>"</div>
              <blockquote style={{
                margin: 0,
                fontSize: 'var(--text-xl)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: 'var(--black)',
                position: 'relative',
                zIndex: 1
              }}>
                {quote.text}
              </blockquote>
              <cite style={{
                display: 'block',
                marginTop: 'var(--space-4)',
                fontStyle: 'normal',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--black)',
                fontSize: 'var(--text-lg)'
              }}>
                — {quote.author}
              </cite>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)'
            }}>
              <span style={{ fontSize: 'var(--text-xl)' }}>📊</span>
              <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                Quick Stats
              </h4>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'var(--space-3)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b98115, #34d39915)',
                border: '1px solid #10b981',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>
                  {stats.characters}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#047857', fontWeight: 'var(--font-semibold)' }}>
                  Characters
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #00000015, #33333315)',
                border: '1px solid var(--black)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>
                  {stats.words}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-700)', fontWeight: 'var(--font-semibold)' }}>
                  Words
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #00000015, #33333315)',
                border: '1px solid var(--black)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>
                  {stats.sentences}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-700)', fontWeight: 'var(--font-semibold)' }}>
                  Sentences
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)'
            }}>
              <span style={{ fontSize: 'var(--text-xl)' }}>ℹ️</span>
              <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                Metadata
              </h4>
            </div>
            <div style={{
              background: 'white',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border-medium)' }}>
                <div style={{ background: 'white', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>Category</span>
                  <span style={{
                    background: 'var(--black)',
                    color: 'white',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: '999px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)'
                  }}>
                    {quote.category}
                  </span>
                </div>
                
                <div style={{ background: 'white', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>Status</span>
                  <span style={{
                    background: quote.isActive ? '#10b981' : '#ef4444',
                    color: 'white',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: '999px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)'
                  }}>
                    {quote.isActive ? '✓ Active' : '✕ Inactive'}
                  </span>
                </div>

                <div style={{ background: 'white', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>Quote ID</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', fontFamily: 'monospace' }}>
                    #{quote.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Info */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)'
            }}>
              <span style={{ fontSize: 'var(--text-xl)' }}>⛓️</span>
              <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                Blockchain Information
              </h4>
            </div>
            <div style={{
              background: 'white',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border-medium)' }}>
                <div style={{ background: 'white', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)', marginBottom: 'var(--space-1)' }}>
                    Submitter Address
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-2)',
                    fontFamily: 'monospace',
                    fontSize: 'var(--text-sm)'
                  }}>
                    <span style={{ wordBreak: 'break-all' }}>{quote.submitter}</span>
                    <button
                      onClick={() => copyToClipboard(quote.submitter)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 'var(--text-lg)',
                        padding: 'var(--space-1)'
                      }}
                      title="Copy address"
                    >
                      {copied ? '✓' : '📋'}
                    </button>
                  </div>
                </div>

                <div style={{ background: 'white', padding: 'var(--space-4)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)', marginBottom: 'var(--space-1)' }}>
                    Timestamp
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)' }}>
                    {dateInfo.full}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)', marginTop: 'var(--space-1)' }}>
                    {dateInfo.relative}
                  </div>
                </div>

                {explorerUrl && (
                  <div style={{ background: 'white', padding: 'var(--space-4)' }}>
                    <a
                      href={explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        color: 'var(--black)',
                        textDecoration: 'none',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-semibold)'
                      }}
                    >
                      <span>🔗</span>
                      <span>View on Block Explorer</span>
                      <span>→</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => copyToClipboard(quote.text)}
              style={{
                flex: 1,
                minWidth: '150px',
                padding: 'var(--space-3) var(--space-4)',
                background: 'var(--black)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'var(--gray-800)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'var(--black)';
              }}
            >
              {copied ? '✓ Copied!' : '📋 Copy Quote'}
            </button>
            
            <button
              onClick={() => {
                const shareText = `"${quote.text}" - ${quote.author}`;
                if (navigator.share) {
                  navigator.share({ text: shareText });
                } else {
                  copyToClipboard(shareText);
                }
              }}
              style={{
                flex: 1,
                minWidth: '150px',
                padding: 'var(--space-3) var(--space-4)',
                background: 'white',
                color: 'var(--black)',
                border: '2px solid var(--black)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--black)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = 'var(--black)';
              }}
            >
              📤 Share Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteDetails;
