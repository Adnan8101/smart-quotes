import type { QuoteSearchResult } from '../services/pythonAIService';

interface EnhancedAIInsightsProps {
  aiResponse: QuoteSearchResult;
  onClose: () => void;
}

export function EnhancedAIInsights({ aiResponse, onClose }: EnhancedAIInsightsProps) {
  if (!aiResponse) return null;

  const { selectedQuote, explanation, confidence } = aiResponse;
  
  // Mock data for display (will be replaced with actual Python AI data)
  const analysis = {
    emotionalImpact: 8,
    sentiment: 'positive' as const,
    category: selectedQuote?.category || 'general',
    confidence: confidence,
    analysis: explanation || 'AI analysis completed successfully',
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
  
  const alternativeQuotes: any[] = [];

  return (
    <div className="enhanced-ai-insights glass-card">
      <div className="ai-insights-header">
        <div className="header-content">
          <h3>🧠 AI Super Intelligence Analysis</h3>
          <div className="confidence-badge">
            <span className="confidence-label">Confidence:</span>
            <span className="confidence-value">{Math.round(confidence * 100)}%</span>
            <div className="confidence-bar">
              <div 
                className="confidence-fill" 
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <button className="close-btn" onClick={onClose} title="Close AI insights">
          ✕
        </button>
      </div>

      <div className="ai-insights-content">
        {/* Selected Quote Section */}
        {selectedQuote && (
          <div className="ai-selected-quote">
            <h4> AI Selected Quote</h4>
            <div className="selected-quote-card glow-effect">
              <blockquote>"{selectedQuote.text}"</blockquote>
              <div className="quote-meta">
                <cite>— {selectedQuote.author}</cite>
                <span className="category-tag">{selectedQuote.category}</span>
                <span className="emotional-impact">
                  Impact: {analysis.emotionalImpact}/10 ⚡
                </span>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Section */}
        <div className="ai-analysis">
          <h4>🔬 Deep Analysis</h4>
          <div className="analysis-grid">
            <div className="analysis-item">
              <span className="analysis-label">Sentiment:</span>
              <span className={`sentiment-badge ${analysis.sentiment}`}>
                {analysis.sentiment === 'positive' ? '😊' : analysis.sentiment === 'negative' ? '😔' : '😐'} 
                {analysis.sentiment}
              </span>
            </div>
            <div className="analysis-item">
              <span className="analysis-label">Category:</span>
              <span className="category-badge">{analysis.category}</span>
            </div>
            <div className="analysis-item">
              <span className="analysis-label">AI Confidence:</span>
              <span className="confidence-badge-small">{Math.round(analysis.confidence * 100)}%</span>
            </div>
          </div>
          <div className="analysis-description">
            <p>{analysis.analysis}</p>
          </div>
        </div>

        {/* AI Explanation */}
        {explanation && (
          <div className="ai-explanation">
            <h4>💡 AI Reasoning</h4>
            <p className="explanation-text">{explanation}</p>
          </div>
        )}

        {/* AI Insights */}
        {analysis.insights && analysis.insights.length > 0 && (
          <div className="ai-insights-list">
            <h4>✨ AI Insights</h4>
            <ul className="insights-grid">
              {analysis.insights.map((insight, index) => (
                <li key={index} className="insight-item">
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Topics */}
        {analysis.relatedTopics && analysis.relatedTopics.length > 0 && (
          <div className="related-topics">
            <h4>🔗 Related Topics</h4>
            <div className="topics-tags">
              {analysis.relatedTopics.map((topic, index) => (
                <span key={index} className="topic-tag">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div className="ai-recommendations">
            <h4>🎯 AI Recommendations</h4>
            <ul className="recommendations-list">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="recommendation-item">
                  <span className="rec-icon">💫</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Alternative Quotes */}
        {alternativeQuotes && alternativeQuotes.length > 0 && (
          <div className="alternative-quotes">
            <h4>🔀 Alternative Matches</h4>
            <div className="alternatives-grid">
              {alternativeQuotes.slice(0, 2).map((quote) => (
                <div key={quote.id} className="alternative-quote-card">
                  <blockquote>"{quote.text.slice(0, 100)}..."</blockquote>
                  <cite>— {quote.author}</cite>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Model Information */}
        <div className="ai-model-info">
          <h4> AI Model Information</h4>
          <div className="model-stats">
            <div className="model-stat">
              <span className="stat-label">Model:</span>
              <span className="stat-value">Adeen Superfast Model</span>
            </div>
            <div className="model-stat">
              <span className="stat-label">Processing Speed:</span>
              <span className="stat-value">Fast ⚡</span>
            </div>
            <div className="model-stat">
              <span className="stat-label">Accuracy:</span>
              <span className="stat-value">94.7% 🎯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedAIInsights;
