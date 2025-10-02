import React, { useState, useEffect, useRef } from 'react';
import { MdClose, MdPsychology, MdCheckCircle, MdArrowBack, MdRocket } from 'react-icons/md';
import { FaQuoteLeft, FaUserAlt, FaTag, FaBrain, FaSpinner, FaLink } from 'react-icons/fa';
import type { Quote } from '../services/blockchainService';
import { blockchainService } from '../services/blockchainService';
import { pythonAIService } from '../services/pythonAIService';

interface SuperQuoteCreatorProps {
  walletAddress: string;
  onQuoteCreated: (quote: Quote, quoteText: string, author: string) => void;
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
  const [completedStages, setCompletedStages] = useState<string[]>([]);
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
    setCompletedStages([]);
    const category = formData.category || aiAnalysis?.suggestedCategory || 'wisdom';

    const markStageComplete = (stage: string) => {
      setCompletedStages(prev => [...prev, stage]);
    };

    try {
      // Stage 0: Verify wallet connection
      setProcessingStage('Verifying wallet connection...');
      if (!blockchainService.isWalletConnected()) {
        throw new Error('Wallet not connected. Please reconnect your wallet and try again.');
      }
      await delay(1500);
      markStageComplete('wallet');

      // Stage 1: Validation
      setProcessingStage('Validating quote data...');
      await delay(1800);
      markStageComplete('validation');

      // Stage 2: Contract Preparation
      setProcessingStage('Preparing smart contract transaction...');
      await delay(2000);
      markStageComplete('preparation');

      // Stage 3: MetaMask Signing
      setProcessingStage('Awaiting MetaMask signature...');
      
      const txResponse = await blockchainService.addQuote(formData.text, formData.author, category);
      markStageComplete('signing');

      // Stage 4: Broadcasting
      setProcessingStage(`Broadcasting transaction to network...`);
      await delay(1800);
      markStageComplete('broadcasting');

      // Stage 5: Mining
      setProcessingStage(`Mining transaction (TX: ${txResponse.hash.slice(0, 10)}...)`);
      const receipt = await txResponse.wait();
      markStageComplete('mining');

      // Stage 6: Verification
      setProcessingStage(`Transaction confirmed in block #${receipt.blockNumber}`);
      await delay(1500);
      markStageComplete('verification');

      // Stage 7: Fetch updated quote
      setProcessingStage('Fetching quote from blockchain...');
      const quotes = await blockchainService.getAllQuotes();
      const newQuote = quotes[quotes.length - 1];
      await delay(1200);
      markStageComplete('fetching');

      // Success!
      setProcessingStage('Quote successfully stored on blockchain!');
      markStageComplete('success');
      await delay(1500);

      // Pass data to parent for toast notification
      onQuoteCreated(newQuote, formData.text, formData.author);
      
      // Close modal
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
                <h3 style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 'var(--space-2)', 
                  fontSize: 'var(--text-2xl)', 
                  color: 'var(--black)', 
                  marginBottom: 'var(--space-6)',
                  fontWeight: 'var(--font-bold)'
                }}>
                  <FaLink style={{ fontSize: '1.5rem' }} /> Creating on Blockchain
                </h3>
                
                <div style={{ 
                  padding: 'var(--space-6)', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 'var(--radius-xl)', 
                  marginBottom: 'var(--space-8)', 
                  textAlign: 'left',
                  boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <blockquote style={{ 
                    fontSize: 'var(--text-lg)', 
                    fontStyle: 'italic', 
                    color: 'var(--white)', 
                    marginBottom: 'var(--space-3)',
                    lineHeight: '1.6'
                  }}>
                    "{formData.text}"
                  </blockquote>
                  <cite style={{ 
                    display: 'block', 
                    textAlign: 'right', 
                    color: 'rgba(255, 255, 255, 0.9)', 
                    fontSize: 'var(--text-sm)', 
                    marginBottom: 'var(--space-3)',
                    fontWeight: 'var(--font-medium)'
                  }}>
                    — {formData.author}
                  </cite>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: 'var(--space-2) var(--space-4)', 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    color: 'var(--white)', 
                    borderRadius: 'var(--radius-full)', 
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-semibold)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    {formData.category || aiAnalysis?.suggestedCategory}
                  </span>
                </div>

                {/* Enhanced Processing Stages */}
                <div style={{
                  background: 'linear-gradient(to bottom, #f8f9ff, #ffffff)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
                  marginBottom: 'var(--space-6)',
                  border: '2px solid #e8eaf6',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)'
                  }}>
                    {/* Stage 1: Wallet Connection */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: completedStages.includes('wallet') ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      border: completedStages.includes('wallet') ? '2px solid #76c893' : '2px solid #e0e0e0',
                      transition: 'all 0.5s ease',
                      boxShadow: completedStages.includes('wallet') ? '0 4px 15px rgba(118, 200, 147, 0.3)' : 'none'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: completedStages.includes('wallet') ? '#52b788' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        color: 'var(--white)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s ease'
                      }}>
                        {completedStages.includes('wallet') ? '✓' : '1'}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--black)' }}>
                          Wallet Connection
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                          Verifying wallet status
                        </div>
                      </div>
                      {!completedStages.includes('wallet') && processingStage.includes('wallet') && (
                        <FaSpinner style={{ fontSize: '1.25rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
                      )}
                    </div>

                    {/* Stage 2: Validation */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: completedStages.includes('validation') ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      border: completedStages.includes('validation') ? '2px solid #76c893' : '2px solid #e0e0e0',
                      transition: 'all 0.5s ease',
                      boxShadow: completedStages.includes('validation') ? '0 4px 15px rgba(118, 200, 147, 0.3)' : 'none'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: completedStages.includes('validation') ? '#52b788' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        color: 'var(--white)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s ease'
                      }}>
                        {completedStages.includes('validation') ? '✓' : '2'}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--black)' }}>
                          Data Validation
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                          Validating quote content
                        </div>
                      </div>
                      {!completedStages.includes('validation') && processingStage.includes('Validating') && (
                        <FaSpinner style={{ fontSize: '1.25rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
                      )}
                    </div>

                    {/* Stage 3: Contract Preparation */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: completedStages.includes('preparation') ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      border: completedStages.includes('preparation') ? '2px solid #76c893' : '2px solid #e0e0e0',
                      transition: 'all 0.5s ease',
                      boxShadow: completedStages.includes('preparation') ? '0 4px 15px rgba(118, 200, 147, 0.3)' : 'none'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: completedStages.includes('preparation') ? '#52b788' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        color: 'var(--white)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s ease'
                      }}>
                        {completedStages.includes('preparation') ? '✓' : '3'}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--black)' }}>
                          Contract Preparation
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                          Preparing smart contract call
                        </div>
                      </div>
                      {!completedStages.includes('preparation') && processingStage.includes('Preparing') && (
                        <FaSpinner style={{ fontSize: '1.25rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
                      )}
                    </div>

                    {/* Stage 4: MetaMask Signing */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: completedStages.includes('signing') ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      border: completedStages.includes('signing') ? '2px solid #76c893' : '2px solid #e0e0e0',
                      transition: 'all 0.5s ease',
                      boxShadow: completedStages.includes('signing') ? '0 4px 15px rgba(118, 200, 147, 0.3)' : 'none'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: completedStages.includes('signing') ? '#52b788' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        color: 'var(--white)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s ease'
                      }}>
                        {completedStages.includes('signing') ? '✓' : '4'}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--black)' }}>
                          MetaMask Signature
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                          Awaiting your confirmation
                        </div>
                      </div>
                      {!completedStages.includes('signing') && processingStage.includes('MetaMask') && (
                        <FaSpinner style={{ fontSize: '1.25rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
                      )}
                    </div>

                    {/* Stage 5: Broadcasting */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: completedStages.includes('broadcasting') ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      border: completedStages.includes('broadcasting') ? '2px solid #76c893' : '2px solid #e0e0e0',
                      transition: 'all 0.5s ease',
                      boxShadow: completedStages.includes('broadcasting') ? '0 4px 15px rgba(118, 200, 147, 0.3)' : 'none'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: completedStages.includes('broadcasting') ? '#52b788' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        color: 'var(--white)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s ease'
                      }}>
                        {completedStages.includes('broadcasting') ? '✓' : '5'}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--black)' }}>
                          Broadcasting
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                          Sending to blockchain network
                        </div>
                      </div>
                      {!completedStages.includes('broadcasting') && processingStage.includes('Broadcasting') && (
                        <FaSpinner style={{ fontSize: '1.25rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
                      )}
                    </div>

                    {/* Stage 6: Mining */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: completedStages.includes('mining') ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      border: completedStages.includes('mining') ? '2px solid #76c893' : '2px solid #e0e0e0',
                      transition: 'all 0.5s ease',
                      boxShadow: completedStages.includes('mining') ? '0 4px 15px rgba(118, 200, 147, 0.3)' : 'none'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: completedStages.includes('mining') ? '#52b788' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        color: 'var(--white)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s ease'
                      }}>
                        {completedStages.includes('mining') ? '✓' : '6'}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--black)' }}>
                          Mining Transaction
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                          {processingStage.includes('TX:') ? processingStage : 'Waiting for confirmation'}
                        </div>
                      </div>
                      {!completedStages.includes('mining') && processingStage.includes('Mining') && (
                        <FaSpinner style={{ fontSize: '1.25rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
                      )}
                    </div>

                    {/* Stage 7: Verification */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: completedStages.includes('verification') ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      border: completedStages.includes('verification') ? '2px solid #76c893' : '2px solid #e0e0e0',
                      transition: 'all 0.5s ease',
                      boxShadow: completedStages.includes('verification') ? '0 4px 15px rgba(118, 200, 147, 0.3)' : 'none'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: completedStages.includes('verification') ? '#52b788' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        color: 'var(--white)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s ease'
                      }}>
                        {completedStages.includes('verification') ? '✓' : '7'}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--black)' }}>
                          Block Confirmation
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                          {processingStage.includes('block #') ? processingStage : 'Verifying transaction'}
                        </div>
                      </div>
                      {!completedStages.includes('verification') && processingStage.includes('confirmed') && (
                        <FaSpinner style={{ fontSize: '1.25rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
                      )}
                    </div>

                    {/* Stage 8: Fetching */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4)',
                      background: completedStages.includes('fetching') ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' : 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      border: completedStages.includes('fetching') ? '2px solid #76c893' : '2px solid #e0e0e0',
                      transition: 'all 0.5s ease',
                      boxShadow: completedStages.includes('fetching') ? '0 4px 15px rgba(118, 200, 147, 0.3)' : 'none'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: completedStages.includes('fetching') ? '#52b788' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        color: 'var(--white)',
                        fontWeight: 'bold',
                        transition: 'all 0.5s ease'
                      }}>
                        {completedStages.includes('fetching') ? '✓' : '8'}
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-base)', color: 'var(--black)' }}>
                          Retrieving Data
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                          Fetching quote from blockchain
                        </div>
                      </div>
                      {!completedStages.includes('fetching') && processingStage.includes('Fetching') && (
                        <FaSpinner style={{ fontSize: '1.25rem', color: '#667eea', animation: 'spin 1s linear infinite' }} />
                      )}
                    </div>

                    {/* Success State */}
                    {completedStages.includes('success') && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-3)',
                        padding: 'var(--space-6)',
                        background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
                        borderRadius: 'var(--radius-lg)',
                        border: '2px solid #52b788',
                        boxShadow: '0 8px 25px rgba(82, 183, 136, 0.4)',
                        animation: 'pulse 0.6s ease-in-out'
                      }}>
                        <MdCheckCircle style={{ fontSize: '2.5rem', color: '#2d6a4f' }} />
                        <div>
                          <div style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-xl)', color: '#1b4332' }}>
                            Success!
                          </div>
                          <div style={{ fontSize: 'var(--text-sm)', color: '#2d6a4f' }}>
                            Quote stored on blockchain
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transaction Info / Help */}
                {!processingStage.includes('❌') ? (
                  <div style={{ 
                    marginTop: 'var(--space-4)', 
                    padding: 'var(--space-5)', 
                    background: 'linear-gradient(135deg, #667eea15, #764ba215)',
                    border: '2px solid #667eea', 
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>💡</span>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--black)', margin: 0 }}>
                      {processingStage.includes('MetaMask') ? 
                        'Please confirm the transaction in your MetaMask wallet' : 
                        'Processing your transaction on the blockchain...'}
                    </p>
                  </div>
                ) : (
                  <div style={{ 
                    marginTop: 'var(--space-4)', 
                    padding: 'var(--space-5)', 
                    background: '#fff3cd', 
                    border: '2px solid #ffc107', 
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 4px 15px rgba(255, 193, 7, 0.2)'
                  }}>
                    <p style={{ 
                      fontSize: 'var(--text-base)', 
                      fontWeight: 'bold', 
                      color: '#856404', 
                      marginBottom: 'var(--space-3)', 
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--space-2)'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>⚠️</span> Quick Fix Guide
                    </p>
                    <ol style={{ 
                      fontSize: 'var(--text-sm)', 
                      color: '#856404', 
                      margin: 0, 
                      paddingLeft: 'var(--space-6)', 
                      textAlign: 'left',
                      lineHeight: '1.8'
                    }}>
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
