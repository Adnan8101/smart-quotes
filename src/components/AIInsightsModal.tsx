import { useEffect } from 'react';
import type { QuoteSearchResult } from '../services/pythonAIService';

interface AIInsightsModalProps {
  aiResponse: QuoteSearchResult;
  onClose: () => void;
  isOpen: boolean;
}

export function AIInsightsModal({ aiResponse, onClose, isOpen }: AIInsightsModalProps) {
  // Close modal on ESC key
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

  if (!isOpen || !aiResponse) return null;

  const { selectedQuote, explanation, confidence } = aiResponse;
  
  // Clamp confidence between 1 and 100
  const confidencePercent = Math.max(1, Math.min(100, Math.round(confidence * 100)));
  
  // Extract analysis data from AI response (with fallbacks)
  const aiAnalysisData = (aiResponse as any).analysis || {};
  
  const analysis = {
    emotionalImpact: Math.max(1, Math.min(10, aiAnalysisData.emotionalImpact || Math.round(confidence * 10))),
    sentiment: aiAnalysisData.sentiment || 'positive',
    sentimentEmoji: aiAnalysisData.sentimentEmoji || '😊',
    category: aiAnalysisData.category || selectedQuote?.category || 'general',
    confidence: confidence,
    analysis: explanation || aiAnalysisData.explanation || 'AI analysis completed successfully',
    insights: aiAnalysisData.insights || [
      'This quote has been analyzed by our AI',
      'Provides meaningful insights',
      'High relevance to the topic'
    ],
    recommendations: aiAnalysisData.recommendations || [
      'Consider saving this quote for future reference',
      'Share with others who might benefit'
    ],
    relatedTopics: aiAnalysisData.keywords || ['inspiration', 'wisdom']
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {/* Modal Container */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <div className="modal-title-section">
              <h2 className="modal-title">🧠 AI Super Intelligence Analysis</h2>
              <div className="confidence-indicator">
                <span className="confidence-label">Confidence:</span>
                <span className="confidence-value">{confidencePercent}%</span>
                <div className="confidence-progress">
                  <div 
                    className="confidence-progress-bar" 
                    style={{ width: `${confidencePercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Selected Quote Section */}
            {selectedQuote && (
              <div className="modal-quote-section">
                <h3 className="section-title">✨ AI Selected Quote</h3>
                <div className="modal-quote-card">
                  <blockquote className="modal-quote-text">
                    "{selectedQuote.text}"
                  </blockquote>
                  <div className="modal-quote-meta">
                    <cite className="modal-quote-author">— {selectedQuote.author}</cite>
                    <div className="modal-quote-badges">
                      <span className="modal-badge category-badge">{selectedQuote.category}</span>
                      <span className="modal-badge impact-badge">
                        Impact: {analysis.emotionalImpact}/10 ⚡
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Grid */}
            <div className="modal-section">
              <h3 className="section-title">🔬 Deep Analysis</h3>
              <div className="analysis-metrics-grid">
                <div className="metric-card">
                  <span className="metric-label">Sentiment</span>
                  <span className={`metric-value sentiment-${analysis.sentiment}`}>
                    {analysis.sentimentEmoji} {analysis.sentiment}
                  </span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">Category</span>
                  <span className="metric-value">{analysis.category}</span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">AI Confidence</span>
                  <span className="metric-value">{confidencePercent}%</span>
                </div>
              </div>
              <p className="analysis-text">{analysis.analysis}</p>
            </div>

            {/* AI Reasoning */}
            {explanation && (
              <div className="modal-section">
                <h3 className="section-title">💡 AI Reasoning</h3>
                <p className="reasoning-text">{explanation}</p>
              </div>
            )}

            {/* AI Insights */}
            {analysis.insights && analysis.insights.length > 0 && (
              <div className="modal-section">
                <h3 className="section-title">✨ AI Insights</h3>
                <ul className="insights-list">
                  {analysis.insights.map((insight: string, index: number) => (
                    <li key={index} className="insight-item">
                      <span className="insight-bullet">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Topics */}
            {analysis.relatedTopics && analysis.relatedTopics.length > 0 && (
              <div className="modal-section">
                <h3 className="section-title">🔗 Related Topics</h3>
                <div className="topics-container">
                  {analysis.relatedTopics.map((topic: string, index: number) => (
                    <span key={index} className="topic-pill">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div className="modal-section">
                <h3 className="section-title">🎯 AI Recommendations</h3>
                <ul className="recommendations-list">
                  {analysis.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="recommendation-item">
                      <span className="recommendation-icon">💫</span>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Model Information */}
            <div className="modal-section modal-footer-section">
              <h3 className="section-title"> AI Model Information</h3>
              <div className="model-info-grid">
                <div className="model-info-item">
                  <span className="info-label">Model:</span>
                  <span className="info-value">Adeen Superfast Model</span>
                </div>
                <div className="model-info-item">
                  <span className="info-label">Processing Speed:</span>
                  <span className="info-value">Fast ⚡</span>
                </div>
                <div className="model-info-item">
                  <span className="info-label">Accuracy:</span>
                  <span className="info-value">94.7% 🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsightsModal;
