import { useState } from 'react';
import { pythonAIService } from '../services/pythonAIService';

interface AddQuoteFormProps {
  onAddQuote: (text: string, author: string, category: string) => void;
  onCancel: () => void;
}

export function AddQuoteForm({ onAddQuote, onCancel }: AddQuoteFormProps) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedCategories = [
    'motivation', 'wisdom', 'life', 'love', 'success', 
    'innovation', 'inspiration', 'philosophy', 'humor', 'general'
  ];

  const handleAnalyze = async () => {
    if (!text.trim() || !author.trim()) {
      alert('Please enter both quote text and author before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    try {
      // Use Python AI service for analysis
      const result = await pythonAIService.analyzeQuote(text, author);
      setCategory(result.category);
      setAiAnalysis(`${result.analysis}\n\nSentiment: ${result.sentiment}\nConfidence: ${(result.confidence * 100).toFixed(1)}%`);
    } catch (error) {
      console.error('Failed to analyze quote:', error);
      alert('Failed to analyze quote. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || !author.trim()) {
      alert('Please enter both quote text and author.');
      return;
    }

    if (!category.trim()) {
      alert('Please select or enter a category.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddQuote(text.trim(), author.trim(), category.toLowerCase().trim());
      // Reset form
      setText('');
      setAuthor('');
      setCategory('');
      setAiAnalysis('');
    } catch (error) {
      console.error('Failed to add quote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-quote-form">
      <h3>📝 Add New Quote</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="quote-text">Quote Text *</label>
          <textarea
            id="quote-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the quote text..."
            className="form-input"
            rows={3}
            maxLength={500}
            required
          />
          <small>{text.length}/500 characters</small>
        </div>

        <div className="form-group">
          <label htmlFor="quote-author">Author *</label>
          <input
            id="quote-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter the author's name..."
            className="form-input"
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <div className="ai-analyze-section">
            <button 
              type="button"
              className="btn btn-ai"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text.trim() || !author.trim()}
            >
              {isAnalyzing ? '🤖 Analyzing...' : '🤖 AI Analyze & Categorize'}
            </button>
          </div>
          
          {aiAnalysis && (
            <div className="ai-analysis">
              <h4>AI Analysis:</h4>
              <p>{aiAnalysis}</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="quote-category">Category *</label>
          <div className="category-input-group">
            <select
              id="quote-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="">Select a category...</option>
              {predefinedCategories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <span className="or-text">or</span>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter custom category..."
              className="form-input category-custom"
              maxLength={30}
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting || !text.trim() || !author.trim() || !category.trim()}
          >
            {isSubmitting ? '📤 Adding to Blockchain...' : '📤 Add to Blockchain'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="form-help">
        <p>💡 <strong>Tip:</strong> Use the AI analysis to get suggestions for categorization and insights about your quote!</p>
        <p>⛓️ Your quote will be permanently stored on the blockchain and associated with your wallet address.</p>
      </div>
    </div>
  );
}
