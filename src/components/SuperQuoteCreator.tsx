import React, { useState, useEffect, useRef } from 'react';
import { MdClose, MdPsychology, MdCheckCircle, MdArrowBack, MdRocket } from 'react-icons/md';
import { FaQuoteLeft, FaUserAlt, FaTag, FaBrain, FaSpinner, FaLink } from 'react-icons/fa';
import type { Quote } from '../services/blockchainService';
import { blockchainService } from '../services/blockchainService';
import { pythonAIService } from '../services/pythonAIService';

interface SuperQuoteCreatorProps {
  walletAddress: string;
  onQuoteCreated: (quote: Quote) => void;
  onClose: () => void;
}

const SuperQuoteCreator: React.FC<SuperQuoteCreatorProps> = ({  
  onQuoteCreated, 
  onClose 
}) => {
  const [step, setStep] = useState<'input' | 'ai-analysis' | 'blockchain-processing'>('input');
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    category: ''
  });
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const processingStarted = useRef(false);

  const categories = [
    'motivation', 'wisdom', 'love', 'success', 'philosophy', 
    'leadership', 'creativity', 'courage', 'innovation', 'life'
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAIAnalysis = async () => {
    if (!formData.text.trim() || !formData.author.trim()) {
      alert('Please fill in quote text and author');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Check if Python AI service is running
      const isHealthy = await pythonAIService.checkHealth();
      if (!isHealthy) {
        throw new Error('Python AI service is not running. Please start it with: python3 ai_model.py');
      }

      // Call Python AI service for real analysis
      const aiResult = await pythonAIService.analyzeQuote(formData.text, formData.author);
      
      // Format the analysis result
      setAiAnalysis({
        sentiment: aiResult.sentiment,
        sentimentEmoji: aiResult.sentimentEmoji,
        suggestedCategory: formData.category || aiResult.category,
        confidence: aiResult.confidence / 100, // Convert to 0-1 range
        insights: aiResult.insights,
        recommendations: aiResult.recommendations,
        keywords: aiResult.keywords,
        analysis: aiResult.analysis
      });
      
      setStep('ai-analysis');
    } catch (error) {
      console.error('AI analysis failed:', error);
      alert(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}\n\nYou can still proceed with manual category selection.`);
      
      // Fallback to basic analysis
      setAiAnalysis({
        sentiment: 'neutral',
        sentimentEmoji: '😐',
        suggestedCategory: formData.category || 'wisdom',
        confidence: 0.50,
        insights: [
          '⚠️ Using fallback analysis (AI service unavailable)',
          '💡 Start Python AI: python3 ai_model.py',
          '📝 Manual category selection recommended'
        ],
        recommendations: [
          'Verify AI service is running on port 5001',
          'Check console for connection errors'
        ]
      });
      
      setStep('ai-analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleProceedToBlockchain = () => {
    // Auto-fill category from AI suggestion if not provided
    if (!formData.category && aiAnalysis?.suggestedCategory) {
      setFormData(prev => ({ ...prev, category: aiAnalysis.suggestedCategory }));
    }
    setStep('blockchain-processing');
  };

  // Auto-start blockchain processing when entering that step
  useEffect(() => {
    if (step === 'blockchain-processing' && !processingStarted.current) {
      processingStarted.current = true;
      processBlockchain();
    }
  }, [step]);

  const processBlockchain = async () => {
    setIsProcessing(true);
    const category = formData.category || aiAnalysis?.suggestedCategory || 'wisdom';

    try {
      // Stage 0: Verify wallet connection
      setProcessingStage('🔗 Verifying wallet connection...');
      if (!blockchainService.isWalletConnected()) {
        throw new Error('Wallet not connected. Please reconnect your wallet and try again.');
      }
      await delay(500);

      // Stage 1: Validation
      setProcessingStage(' Validating quote data...');
      await delay(800);

      // Stage 2: Contract Preparation
      setProcessingStage(' Preparing smart contract transaction...');
      await delay(1000);

      // Stage 3: MetaMask Signing
      setProcessingStage('🔐 Please sign the transaction in MetaMask...');
      
      const txResponse = await blockchainService.addQuote(formData.text, formData.author, category);

      // Stage 4: Broadcasting
      setProcessingStage(` Broadcasting transaction to network...`);
      await delay(800);

      // Stage 5: Mining
      setProcessingStage(` Mining transaction (TX: ${txResponse.hash.slice(0, 8)}...)`);
      const receipt = await txResponse.wait();

      // Stage 6: Verification
      setProcessingStage(` Transaction confirmed in block #${receipt.blockNumber}`);
      await delay(1000);

      // Stage 7: Fetch updated quote
      setProcessingStage(' Fetching quote from blockchain...');
      const quotes = await blockchainService.getAllQuotes();
      const newQuote = quotes[quotes.length - 1];

      // Success!
      setProcessingStage(' Quote successfully stored on blockchain!');
      await delay(1500);

      onQuoteCreated(newQuote);
      onClose();
    } catch (error: any) {
      console.error('Blockchain processing error:', error);
      
      // Check if it's a MetaMask cache issue
      if (error.message?.includes('MetaMask cache') || 
          error.message?.includes('invalid block tag') ||
          error.message?.includes('Network error')) {
        setProcessingStage(`❌ MetaMask Cache Issue Detected!

📋 Quick Fix (3 steps):
1. Open MetaMask → Settings → Advanced
2. Click "Clear activity and nonce data"
3. Refresh this page and try again

This happens when Hardhat restarts.`);
      } else {
        setProcessingStage(`❌ Error: ${error.message || 'Transaction failed'}

Please check:
• MetaMask is connected
• Hardhat node is running
• You have sufficient test ETH`);
      }
      
      await delay(8000); // Give more time to read the error
      setStep('ai-analysis'); // Go back to previous step
      processingStarted.current = false;
    } finally {
      setIsProcessing(false);
    }
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            <FaQuoteLeft />
            Super Quote Creator
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="modal-body">
          <div className="modal-steps">
            <div className={`step-item ${step === 'input' ? 'active' : (step === 'ai-analysis' || step === 'blockchain-processing') ? 'completed' : ''}`}>
              <span className="step-number">
                {(step === 'ai-analysis' || step === 'blockchain-processing') ? <MdCheckCircle /> : '1'}
              </span>
              <label className="step-label">Input</label>
            </div>
            <div className={`step-item ${step === 'ai-analysis' ? 'active' : step === 'blockchain-processing' ? 'completed' : ''}`}>
              <span className="step-number">
                {step === 'blockchain-processing' ? <MdCheckCircle /> : '2'}
              </span>
              <label className="step-label">AI Analysis</label>
            </div>
            <div className={`step-item ${step === 'blockchain-processing' ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <label className="step-label">Blockchain</label>
            </div>
          </div>

          {/* Content */}
          <div className="modal-form">
            {step === 'input' && (
              <>
                <div className="form-group">
                  <label className="form-label required">
                    <FaQuoteLeft /> Quote Text
                  </label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => handleInputChange('text', e.target.value)}
                    placeholder="Enter your inspiring quote here..."
                    className="form-textarea"
                    maxLength={500}
                  />
                  <div className="form-helper">
                    <span className={`character-count ${formData.text.length > 450 ? 'warning' : ''}`}>
                      {formData.text.length}/500
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label required">
                    <FaUserAlt /> Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Who said this?"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaTag /> Category (AI will suggest if empty)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Let AI choose...</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {step === 'ai-analysis' && aiAnalysis && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xl)', color: 'var(--black)' }}>
                    <MdPsychology /> AI Analysis Results
                  </h3>
                </div>
                
                <div style={{ display: 'grid', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                  <div style={{ padding: 'var(--space-4)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'var(--font-semibold)', color: 'var(--black)' }}>Sentiment:</span>
                    <span style={{ 
                      fontWeight: 'var(--font-medium)', 
                      fontSize: 'var(--text-lg)',
                      color: aiAnalysis.sentiment === 'positive' ? 'var(--brand-success)' : 
                             aiAnalysis.sentiment === 'negative' ? 'var(--brand-error)' : 'var(--gray-600)' 
                    }}>
                      {aiAnalysis.sentimentEmoji || (aiAnalysis.sentiment === 'positive' ? '😊' : 
                       aiAnalysis.sentiment === 'negative' ? '😔' : '😐')} {' '}
                      {aiAnalysis.sentiment.charAt(0).toUpperCase() + aiAnalysis.sentiment.slice(1)}
                    </span>
                  </div>
                  
                  <div style={{ padding: 'var(--space-4)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'var(--font-semibold)', color: 'var(--black)' }}>AI Confidence:</span>
                    <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--black)' }}>{Math.round(aiAnalysis.confidence * 100)}%</span>
                  </div>
                  
                  <div style={{ padding: 'var(--space-4)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'var(--font-semibold)', color: 'var(--black)' }}>Suggested Category:</span>
                    <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--black)' }}>{aiAnalysis.suggestedCategory}</span>
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)', color: 'var(--black)' }}>✨ AI Insights</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--space-2)' }}>
                    {aiAnalysis.insights.map((insight: string, index: number) => (
                      <li key={index} style={{ padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--gray-700)' }}>{insight}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)', color: 'var(--black)' }}>💡 Recommendations</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 'var(--space-2)' }}>
                    {aiAnalysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} style={{ padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--gray-700)' }}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {step === 'blockchain-processing' && (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xl)', color: 'var(--black)', marginBottom: 'var(--space-4)' }}>
                  <FaLink /> Creating on Blockchain
                </h3>
                
                <div style={{ padding: 'var(--space-6)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-6)', textAlign: 'left' }}>
                  <blockquote style={{ fontSize: 'var(--text-lg)', fontStyle: 'italic', color: 'var(--black)', marginBottom: 'var(--space-3)' }}>
                    "{formData.text}"
                  </blockquote>
                  <cite style={{ display: 'block', textAlign: 'right', color: 'var(--gray-600)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
                    — {formData.author}
                  </cite>
                  <span style={{ display: 'inline-block', padding: 'var(--space-1) var(--space-3)', background: 'var(--black)', color: 'var(--white)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)' }}>
                    {formData.category || aiAnalysis?.suggestedCategory}
                  </span>
                </div>

                {/* Real-time Processing Status */}
                <div style={{ 
                  padding: 'var(--space-6)', 
                  background: processingStage.includes('❌') ? '#fee' : 'var(--white)', 
                  border: processingStage.includes('❌') ? '2px solid #f44' : '2px solid var(--border-medium)', 
                  borderRadius: 'var(--radius-xl)', 
                  textAlign: 'center' 
                }}>
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    {isProcessing && !processingStage.includes('❌') && (
                      <FaSpinner style={{ fontSize: '2rem', color: 'var(--black)', animation: 'spin 1s linear infinite' }} />
                    )}
                  </div>
                  <p style={{ 
                    fontSize: 'var(--text-lg)', 
                    fontWeight: 'var(--font-semibold)', 
                    color: processingStage.includes('❌') ? '#c00' : 'var(--black)', 
                    marginBottom: 'var(--space-2)',
                    whiteSpace: 'pre-line'
                  }}>
                    {processingStage}
                  </p>
                  {!processingStage.includes('❌') && (
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                      Please wait while we process your transaction...
                    </p>
                  )}
                </div>

                {/* Transaction Info / Help */}
                {!processingStage.includes('❌') ? (
                  <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xl)' }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-700)', margin: 0, textAlign: 'center' }}>
                      💡 Confirm the transaction in MetaMask to complete the process
                    </p>
                  </div>
                ) : (
                  <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: 'var(--radius-xl)' }}>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: '#856404', marginBottom: 'var(--space-2)', textAlign: 'center' }}>
                      ⚠️ Quick Fix Guide
                    </p>
                    <ol style={{ fontSize: 'var(--text-sm)', color: '#856404', margin: 0, paddingLeft: 'var(--space-6)', textAlign: 'left' }}>
                      <li>Open MetaMask extension</li>
                      <li>Click Settings → Advanced</li>
                      <li>Click "Clear activity and nonce data"</li>
                      <li>Refresh this page (Cmd+R / Ctrl+R)</li>
                      <li>Try creating the quote again</li>
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer with action buttons */}
        {step !== 'blockchain-processing' && (
          <div className="modal-footer">
            {step === 'ai-analysis' && (
              <>
                <button className="btn-modal-secondary" onClick={() => setStep('input')}>
                  <MdArrowBack /> Back to Edit
                </button>
                <button className="btn-modal-primary" onClick={handleProceedToBlockchain}>
                  <MdRocket /> Create on Blockchain
                </button>
              </>
            )}
            {step === 'input' && (
              <button 
                className="btn-modal-primary"
                onClick={handleAIAnalysis}
                disabled={isAnalyzing || !formData.text.trim() || !formData.author.trim()}
                style={{ width: '100%' }}
              >
                {isAnalyzing ? (
                  <>
                    <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> AI Analyzing...
                  </>
                ) : (
                  <>
                    <FaBrain /> Analyze with AI
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperQuoteCreator;
