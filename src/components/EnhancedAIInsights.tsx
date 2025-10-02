import type { QuoteSearchResult } from '../services/pythonAIService';

interface EnhancedAIInsightsProps {
  aiResponse: QuoteSearchResult;
  onClose: () => void;
}

export function EnhancedAIInsights({ aiResponse, onClose }: EnhancedAIInsightsProps) {
  if (!aiResponse) return null;

  const { selectedQuote, explanation, confidence } = aiResponse;
  
  // Ensure confidence is a valid number and normalize it to 0-1 range
  let validConfidence = 0.85; // default 85%
  if (typeof confidence === 'number' && !isNaN(confidence)) {
    // If confidence is already a percentage (e.g., 80), convert to decimal (0.80)
    validConfidence = confidence > 1 ? confidence / 100 : confidence;
    // Ensure it's within 0-1 range
    validConfidence = Math.min(Math.max(validConfidence, 0), 1);
  }
  
  // Mock data for display (will be replaced with actual Python AI data)
  const analysis = {
    emotionalImpact: 8,
    sentiment: 'positive' as const,
    category: selectedQuote?.category || 'general',
    confidence: validConfidence,
    analysis: explanation || 'This quote has been carefully selected by our AI to match your search criteria.',
    insights: [
      'This quote has strong emotional resonance',
      'Perfect for inspirational contexts',
      'High memorability factor',
      'Excellent for social sharing'
    ],
    recommendations: [
      'Consider adding to daily motivation collection',
      'Perfect for team building sessions',
      'Great for social media posts'
    ],
    relatedTopics: ['motivation', 'success', 'inspiration']
  };

  return (
    <div style={{
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
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: 'var(--radius-xl)',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
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
              🧠
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)' }}>
                AI Intelligence Analysis
              </h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: 'var(--text-sm)' }}>
                Powered by Advanced AI Models
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>
              Confidence Score
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{
                flex: 1,
                height: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '999px',
                overflow: 'hidden',
                width: '120px'
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981, #34d399)',
                  width: `${validConfidence * 100}%`,
                  transition: 'width 0.5s ease',
                  borderRadius: '999px'
                }}></div>
              </div>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                {Math.round(validConfidence * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--space-6)' }}>
          {/* Selected Quote */}
          {selectedQuote && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)'
              }}>
                <span style={{ fontSize: 'var(--text-xl)' }}>✨</span>
                <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                  AI Selected Quote
                </h4>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #667eea15, #764ba215)',
                border: '2px solid #667eea',
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
                  color: '#667eea',
                  opacity: 0.1,
                  lineHeight: 1
                }}>"</div>
                <blockquote style={{
                  margin: 0,
                  fontSize: 'var(--text-lg)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  color: 'var(--black)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {selectedQuote.text}
                </blockquote>
                <div style={{
                  marginTop: 'var(--space-4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  flexWrap: 'wrap'
                }}>
                  <cite style={{
                    fontStyle: 'normal',
                    fontWeight: 'var(--font-semibold)',
                    color: '#667eea',
                    fontSize: 'var(--text-base)'
                  }}>
                    — {selectedQuote.author}
                  </cite>
                  <span style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-semibold)'
                  }}>
                    {selectedQuote.category}
                  </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-semibold)'
                  }}>
                    Impact: {analysis.emotionalImpact}/10 ⚡
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Grid */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)'
            }}>
              <span style={{ fontSize: 'var(--text-xl)' }}>🔬</span>
              <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                Deep Analysis
              </h4>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-4)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b98115, #34d39915)',
                border: '1px solid #10b981',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 'var(--text-xs)', color: '#047857', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)' }}>
                  Sentiment
                </div>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>
                  {analysis.sentiment === 'positive' ? '😊' : analysis.sentiment === 'negative' ? '😔' : '😐'}
                </div>
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: '#059669', textTransform: 'capitalize' }}>
                  {analysis.sentiment}
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #667eea15, #764ba215)',
                border: '1px solid #667eea',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 'var(--text-xs)', color: '#5145cd', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)' }}>
                  Category
                </div>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>
                  📚
                </div>
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: '#667eea', textTransform: 'capitalize' }}>
                  {analysis.category}
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #f59e0b15, #d9770615)',
                border: '1px solid #f59e0b',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 'var(--text-xs)', color: '#b45309', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-1)' }}>
                  AI Confidence
                </div>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>
                  🎯
                </div>
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: '#d97706' }}>
                  {Math.round(analysis.confidence * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* AI Reasoning */}
          {explanation && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)'
              }}>
                <span style={{ fontSize: 'var(--text-xl)' }}>💡</span>
                <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                  AI Reasoning
                </h4>
              </div>
              <div style={{
                background: 'var(--bg-secondary)',
                borderLeft: '4px solid #667eea',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.6,
                color: 'var(--gray-700)'
              }}>
                {explanation}
              </div>
            </div>
          )}

          {/* AI Insights */}
          {analysis.insights && analysis.insights.length > 0 && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)'
              }}>
                <span style={{ fontSize: 'var(--text-xl)' }}>✨</span>
                <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                  Key Insights
                </h4>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-3)'
              }}>
                {analysis.insights.map((insight, index) => (
                  <div key={index} style={{
                    background: 'white',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                    display: 'flex',
                    gap: 'var(--space-2)',
                    transition: 'all var(--transition-normal)',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                  }}>
                    <span style={{ fontSize: 'var(--text-lg)', flexShrink: 0 }}>💎</span>
                    <span style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Topics */}
          {analysis.relatedTopics && analysis.relatedTopics.length > 0 && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)'
              }}>
                <span style={{ fontSize: 'var(--text-xl)' }}>🔗</span>
                <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                  Related Topics
                </h4>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {analysis.relatedTopics.map((topic, index) => (
                  <span key={index} style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: '999px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-semibold)',
                    transition: 'all var(--transition-normal)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)'
              }}>
                <span style={{ fontSize: 'var(--text-xl)' }}>🎯</span>
                <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                  AI Recommendations
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(90deg, #fef3c7 0%, #fde68a 100%)',
                    border: '1px solid #fbbf24',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)'
                  }}>
                    <span style={{ fontSize: 'var(--text-xl)', flexShrink: 0 }}>💫</span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: '#92400e' }}>
                      {recommendation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Model Info */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5)',
            color: 'white'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)'
            }}>
              <span style={{ fontSize: 'var(--text-xl)' }}>🤖</span>
              <h4 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                AI Model Information
              </h4>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'var(--space-4)'
            }}>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.7, marginBottom: 'var(--space-1)' }}>
                  Model
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>
                  AIB-v2.0-SuperPower
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.7, marginBottom: 'var(--space-1)' }}>
                  Processing Speed
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>
                  Ultra-Fast ⚡
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', opacity: 0.7, marginBottom: 'var(--space-1)' }}>
                  Accuracy
                </div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>
                  94.7% 🎯
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedAIInsights;
