/**
 * Python AI Service - Local Machine Learning Model
 * 
 * This service connects to the Python Flask backend running on localhost:5001
 * It provides sentiment analysis, category classification, and AI insights
 * without requiring external API keys.
 * 
 * Team: Adnan Qureshi (67), Chirayu Giri (68), Abdul Adeen (69)
 */

import type { Quote } from './blockchainService';

const AI_API_URL = 'http://localhost:5001/api';

export interface AIAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentEmoji: string;
  sentimentScore: number;
  confidence: number;
  category: string;
  keywords: string[];
  insights: string[];
  recommendations: string[];
  analysis: {
    wordCount: number;
    characterCount: number;
    polarity: number;
  };
}

export interface QuoteSearchResult {
  selectedQuote: Quote | null;
  explanation: string;
  confidence: number;
  matchScore?: number;
}

export interface RealtimeStatus {
  processing: boolean;
  stage: string;
  progress: number;
  message: string;
}

class PythonAIService {
  private statusCallbacks: ((status: RealtimeStatus) => void)[] = [];

  /**
   * Check if AI service is running
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${AI_API_URL}/health`, {
        method: 'GET',
      });
      const data = await response.json();
      return data.status === 'healthy';
    } catch (error) {
      console.error('AI service health check failed:', error);
      return false;
    }
  }

  /**
   * Analyze a quote and get AI insights
   */
  async analyzeQuote(text: string, author: string = 'Unknown'): Promise<AIAnalysisResult> {
    try {
      this.notifyStatus({
        processing: true,
        stage: 'Analyzing',
        progress: 30,
        message: 'Processing quote with AI...'
      });

      const response = await fetch(`${AI_API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, author }),
      });

      if (!response.ok) {
        throw new Error(`AI analysis failed: ${response.statusText}`);
      }

      const data = await response.json();

      this.notifyStatus({
        processing: false,
        stage: 'Complete',
        progress: 100,
        message: 'Analysis complete!'
      });

      return data;
    } catch (error) {
      this.notifyStatus({
        processing: false,
        stage: 'Error',
        progress: 0,
        message: 'Analysis failed'
      });
      
      console.error('AI analysis error:', error);
      throw new Error('Failed to analyze quote. Is the Python AI service running?');
    }
  }

  /**
   * Find the best matching quote from a list
   */
  async findBestQuote(query: string, quotes: Quote[]): Promise<QuoteSearchResult> {
    try {
      this.notifyStatus({
        processing: true,
        stage: 'Searching',
        progress: 50,
        message: 'Finding best match...'
      });

      const response = await fetch(`${AI_API_URL}/find-quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, quotes }),
      });

      if (!response.ok) {
        throw new Error(`Quote search failed: ${response.statusText}`);
      }

      const data = await response.json();

      this.notifyStatus({
        processing: false,
        stage: 'Complete',
        progress: 100,
        message: 'Search complete!'
      });

      return data;
    } catch (error) {
      this.notifyStatus({
        processing: false,
        stage: 'Error',
        progress: 0,
        message: 'Search failed'
      });
      
      console.error('Quote search error:', error);
      throw new Error('Failed to search quotes. Is the Python AI service running?');
    }
  }

  /**
   * Get a random quote with AI insight
   */
  async getRandomQuoteWithInsight(quotes: Quote[]): Promise<QuoteSearchResult> {
    try {
      this.notifyStatus({
        processing: true,
        stage: 'Generating',
        progress: 50,
        message: 'Selecting random quote...'
      });

      const response = await fetch(`${AI_API_URL}/random-insight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quotes }),
      });

      if (!response.ok) {
        throw new Error(`Random quote failed: ${response.statusText}`);
      }

      const data = await response.json();

      this.notifyStatus({
        processing: false,
        stage: 'Complete',
        progress: 100,
        message: 'Random quote selected!'
      });

      return data;
    } catch (error) {
      this.notifyStatus({
        processing: false,
        stage: 'Error',
        progress: 0,
        message: 'Failed to get random quote'
      });
      
      console.error('Random quote error:', error);
      throw new Error('Failed to get random quote. Is the Python AI service running?');
    }
  }

  /**
   * Get AI insights for a specific quote
   */
  async getQuoteInsights(quote: Quote): Promise<QuoteSearchResult> {
    try {
      this.notifyStatus({
        processing: true,
        stage: 'Analyzing',
        progress: 50,
        message: 'Getting AI insights...'
      });

      const response = await fetch(`${AI_API_URL}/quote-insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quote }),
      });

      if (!response.ok) {
        throw new Error(`Quote insights failed: ${response.statusText}`);
      }

      const data = await response.json();

      this.notifyStatus({
        processing: false,
        stage: 'Complete',
        progress: 100,
        message: 'Insights generated!'
      });

      return data;
    } catch (error) {
      this.notifyStatus({
        processing: false,
        stage: 'Error',
        progress: 0,
        message: 'Failed to get insights'
      });
      
      console.error('Quote insights error:', error);
      // Fallback to local analysis if backend is not available
      return {
        selectedQuote: quote,
        explanation: `This inspiring ${quote.category} quote by ${quote.author} offers valuable wisdom and perspective.`,
        confidence: 0.85
      };
    }
  }

  /**
   * Subscribe to status updates
   */
  onStatusUpdate(callback: (status: RealtimeStatus) => void) {
    this.statusCallbacks.push(callback);
  }

  /**
   * Notify all subscribers of status changes
   */
  private notifyStatus(status: RealtimeStatus) {
    this.statusCallbacks.forEach(callback => callback(status));
  }

  /**
   * Clear all status callbacks
   */
  clearStatusCallbacks() {
    this.statusCallbacks = [];
  }
}

// Export singleton instance
export const pythonAIService = new PythonAIService();
export default pythonAIService;
