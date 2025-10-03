import React, { useState } from 'react';
import './documentation.css';
import { 
  FaRocket, FaUsers, FaBolt, FaLock, FaPalette, FaServer, 
  FaPython, FaReact, FaEthereum, FaTools, FaCheckCircle,
  FaWallet, FaBrain, FaGithub, FaCog, FaBook
} from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdContentCopy } from 'react-icons/md';
import { BiSolidBrain } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi';
import Toast from './Toast';

const Documentation: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastDetails, setToastDetails] = useState('');

  const copyToClipboard = (text: string, commandType: string = 'Command') => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(' Copied Successfully!');
      setToastDetails(`${commandType} copied to clipboard and ready to paste`);
      setShowToast(true);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setToastMessage(' Copy Failed');
      setToastDetails('Please try copying manually');
      setShowToast(true);
    });
  };

  return (
    <div className="documentation-container">
      {/* Header */}
      <div className="doc-header">
        <h1 className="doc-title">
          <HiSparkles /> AI Blockchain Quote Manager
        </h1>
        <p className="doc-subtitle">
          A next-generation decentralized quote management platform powered by 
          <strong> blockchain technology</strong> and <strong>Custom Python AI Model</strong>
        </p>
        
        {/* Tech Stack Badges */}
        <div className="tech-stack">
          <div className="tech-badge"><FaReact /> React</div>
          <div className="tech-badge"><FaEthereum /> Ethereum</div>
          <div className="tech-badge"><FaPython /> Python AI</div>
          <div className="tech-badge"><FaServer /> Hardhat</div>
          <div className="tech-badge"><FaWallet /> MetaMask</div>
          <div className="tech-badge"><HiSparkles /> React Icons</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="doc-content">
        {/* Quick Start Section */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <FaRocket />
            </div>
            <h2 className="section-title">Quick Start Guide</h2>
          </div>
          <div className="section-content">
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Install Dependencies</h3>
                <p className="step-description">
                  Install all required packages for the project
                </p>
                <div className="code-block">
                  <span className="code-label">Terminal</span>
                  <code>npm install && pip install -r requirements.txt</code>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard('npm install && pip install -r requirements.txt', 'Install command')}
                    title="Copy command"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Start Hardhat Node</h3>
                <p className="step-description">
                  Launch local blockchain with 20 test accounts
                </p>
                <div className="code-block">
                  <span className="code-label">Terminal 1</span>
                  <code>npx hardhat node</code>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard('npx hardhat node', 'Hardhat command')}
                    title="Copy command"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Deploy Contract</h3>
                <p className="step-description">
                  Deploy QuoteManager smart contract to local network
                </p>
                <div className="code-block">
                  <span className="code-label">Terminal 2</span>
                  <code>npx hardhat run scripts/deploy.js --network localhost</code>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard('npx hardhat run scripts/deploy.js --network localhost', 'Deploy command')}
                    title="Copy command"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <h3 className="step-title">Start Python AI</h3>
                <p className="step-description">
                  Launch the local AI server for quote analysis
                </p>
                <div className="code-block">
                  <span className="code-label">Terminal 3</span>
                  <code>python3 ai_server.py</code>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard('python3 ai_server.py', 'Python AI command')}
                    title="Copy command"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">5</div>
                <h3 className="step-title">Start Frontend</h3>
                <p className="step-description">
                  Run the React development server
                </p>
                <div className="code-block">
                  <span className="code-label">Terminal 4</span>
                  <code>npm run dev</code>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard('npm run dev', 'Dev server command')}
                    title="Copy command"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>

              <div className="step-card">
                <div className="step-number">6</div>
                <h3 className="step-title">Import Hardhat Account</h3>
                <p className="step-description">
                  Add test account to MetaMask with 10,000 ETH
                </p>
                <div className="code-block">
                  <span className="code-label">MetaMask</span>
                  <code>0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80</code>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', 'Private key')}
                    title="Copy private key"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <FaUsers />
            </div>
            <h2 className="section-title">Development Dream Team</h2>
          </div>
          <div className="section-content">
            {/* Project Mentor */}
            <div className="mentor-card" style={{ 
              textAlign: 'center', 
              marginBottom: '2rem', 
              padding: '1.5rem', 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 240, 255, 0.95))',
              borderRadius: '16px',
              border: '2px solid rgba(88, 166, 255, 0.5)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="mentor-label" style={{ 
                fontSize: '0.875rem', 
                color: 'rgba(0, 0, 0, 0.6)', 
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600'
              }}>
                Project Mentor
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                color: '#000', 
                marginBottom: '0.25rem',
                fontWeight: '700'
              }}>
                Abhijeet Jhadhav
              </h3>
              <p style={{ 
                color: 'rgba(0, 0, 0, 0.7)', 
                fontSize: '0.95rem',
                fontWeight: '500'
              }}>
                Faculty Guide & Advisor
              </p>
            </div>

            <div className="team-grid">
              <div className="team-card">
                <div className="team-avatar">AQ</div>
                <h3 className="team-name">Adnan Qureshi</h3>
                <p className="team-id">Roll No: 67</p>
                <p className="team-role">Project Lead & Blockchain Developer</p>
                <div className="team-skills">
                  <span className="skill-badge">Solidity</span>
                  <span className="skill-badge">Smart Contracts</span>
                  <span className="skill-badge">Web3</span>
                </div>
              </div>

              <div className="team-card">
                <div className="team-avatar">CG</div>
                <h3 className="team-name">Chirayu Giri</h3>
                <p className="team-id">Roll No: 68</p>
                <p className="team-role">AI Developer</p>
                <div className="team-skills">
                  <span className="skill-badge">Python</span>
                  <span className="skill-badge">AI/ML</span>
                  <span className="skill-badge">NLP</span>
                </div>
              </div>

              <div className="team-card">
                <div className="team-avatar">AA</div>
                <h3 className="team-name">Abdul Adeen</h3>
                <p className="team-id">Roll No: 69</p>
                <p className="team-role">Frontend Developer</p>
                <div className="team-skills">
                  <span className="skill-badge">React</span>
                  <span className="skill-badge">TypeScript</span>
                  <span className="skill-badge">UI/UX</span>
                </div>
              </div>

              <div className="team-card">
                <div className="team-avatar">RG</div>
                <h3 className="team-name">Ralph Gonsalves</h3>
                <p className="team-id">Roll No: 9</p>
                <p className="team-role">Backend Developer</p>
                <div className="team-skills">
                  <span className="skill-badge">Flask</span>
                  <span className="skill-badge">APIs</span>
                  <span className="skill-badge">Python</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <FaBolt />
            </div>
            <h2 className="section-title">Core Features & Capabilities</h2>
          </div>
          <div className="section-content">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaEthereum />
                </div>
                <h3 className="feature-title">Blockchain Storage</h3>
                <p className="feature-description">
                  Quotes are permanently stored on the Ethereum blockchain using immutable smart contracts
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">Solidity</span>
                  <span className="feature-tag">Web3</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <BiSolidBrain />
                </div>
                <h3 className="feature-title">Custom Python AI</h3>
                <p className="feature-description">
                  Local Python AI model with Flask API provides sentiment analysis and intelligent insights - no API keys needed!
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">Python</span>
                  <span className="feature-tag">Flask</span>
                  <span className="feature-tag">TextBlob</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FaPalette />
                </div>
                <h3 className="feature-title">Premium UI/UX</h3>
                <p className="feature-description">
                  Stunning glassmorphism design with fluid animations and responsive mobile compatibility
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">React</span>
                  <span className="feature-tag">CSS3</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FaWallet />
                </div>
                <h3 className="feature-title">Wallet Integration</h3>
                <p className="feature-description">
                  Secure MetaMask integration for transaction signing and decentralized authentication
                </p>
                <div className="feature-tags">
                  <span className="feature-tag">MetaMask</span>
                  <span className="feature-tag">Ethers.js</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <FaServer />
            </div>
            <h2 className="section-title">System Architecture</h2>
          </div>
          <div className="section-content">
            <div className="architecture-layers">
              <div className="architecture-layer">
                <h3 className="layer-title">
                  <FaEthereum /> Smart Contract Layer
                </h3>
                <div className="layer-content">
                  <ul>
                    <li>QuoteManager.sol - Main contract for quote storage</li>
                    <li>Gas-optimized storage with mapping-based indexing</li>
                    <li>Event emission for frontend updates</li>
                    <li>Owner-based access control</li>
                  </ul>
                </div>
              </div>

              <div className="architecture-layer">
                <h3 className="layer-title">
                  <FaServer /> Backend Services
                </h3>
                <div className="layer-content">
                  <ul>
                    <li>blockchainService.ts - Web3 integration with ethers.js v6</li>
                    <li>pythonAIService.ts - Python Flask AI API integration</li>
                    <li>Type-safe contract interactions with TypeScript</li>
                    <li>Error handling and transaction management</li>
                  </ul>
                </div>
              </div>

              <div className="architecture-layer">
                <h3 className="layer-title">
                  <FaPython /> Python AI Backend
                </h3>
                <div className="layer-content">
                  <ul>
                    <li>Flask REST API - Runs on localhost:5001</li>
                    <li>TextBlob - NLP for sentiment analysis</li>
                    <li>NLTK - Advanced text processing</li>
                    <li>No API Keys Required - Fully local and free!</li>
                  </ul>
                </div>
              </div>

              <div className="architecture-layer">
                <h3 className="layer-title">
                  <FaReact /> Frontend Components
                </h3>
                <div className="layer-content">
                  <ul>
                    <li>QuoteApp - Main application container</li>
                    <li>WalletConnection - MetaMask integration</li>
                    <li>AddQuoteForm - Quote submission interface</li>
                    <li>QuoteList - Display and manage quotes</li>
                    <li>QuoteSearch - AI-powered search functionality</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Python AI Features */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <FaBrain />
            </div>
            <h2 className="section-title">Python AI Model Features</h2>
          </div>
          <div className="section-content">
            <div className="info-box success">
              <div className="info-box-title">
                <FaCheckCircle /> Why Python AI?
              </div>
              <div className="info-box-content">
                100% Free • Privacy First • Lightning Fast • Fully Customizable
              </div>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">💚</div>
                <h3 className="feature-title">100% Free</h3>
                <p className="feature-description">
                  No API keys, no subscriptions, no costs. Runs completely offline.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FaLock />
                </div>
                <h3 className="feature-title">Privacy First</h3>
                <p className="feature-description">
                  All data stays on your local machine. No external services.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <MdSpeed />
                </div>
                <h3 className="feature-title">Lightning Fast</h3>
                <p className="feature-description">
                  Local processing means instant results with no network latency.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FaCog />
                </div>
                <h3 className="feature-title">Customizable</h3>
                <p className="feature-description">
                  Full control over the AI model. Modify and extend as needed.
                </p>
              </div>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>AI Capabilities</h3>
            <div className="code-block">
              <code>{`• Sentiment Analysis - Detects positive, negative, or neutral emotions
• Confidence Scoring - Provides AI confidence percentage (0-100%)
• Category Classification - Auto-categorizes quotes
• Keyword Extraction - Identifies key themes and topics
• Smart Insights - Generates contextual recommendations
• Text Analysis - Word count, character count, polarity scores`}</code>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <FaTools />
            </div>
            <h2 className="section-title">Installation & Setup</h2>
          </div>
          <div className="section-content">
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Prerequisites</h3>
            <div className="info-box">
              <div className="info-box-content">
                Node.js (v18+) • Python (v3.11+) • MetaMask • npm/yarn • pip
              </div>
            </div>

            <h3 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Environment Setup</h3>
            <div className="code-block">
              <span className="code-label">Clone & Install</span>
              <code>{`# Clone the repository
git clone <repository-url>
cd aib

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install flask flask-cors textblob nltk

# Download NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('brown')"`}</code>
            </div>

            <div className="info-box warning" style={{ marginTop: '1.5rem' }}>
              <div className="info-box-title">⚠️ Important Note</div>
              <div className="info-box-content">
                No environment file needed! Python AI runs locally without API keys.
              </div>
            </div>
          </div>
        </section>

        {/* Smart Contract */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <FaBook />
            </div>
            <h2 className="section-title">Smart Contract Details</h2>
          </div>
          <div className="section-content">
            <div className="info-box">
              <div className="info-box-title">Contract Address (Local Hardhat Network)</div>
              <div className="info-box-content">
                <code>0x5FbDB2315678afecb367f032d93F642f64180aa3</code>
              </div>
            </div>

            <h3 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Main Functions</h3>
            <div className="code-block">
              <code>{`addQuote(text, author, category)      → Add new quote
getAllQuotes()                         → Get all active quotes
getQuotesByCategory(category)          → Filter quotes by category
getUserQuotes(address)                 → Get user's quotes
updateQuote(id, text, author)          → Update quote (owner only)`}</code>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <HiSparkles />
            </div>
            <h2 className="section-title">Complete Technology Stack</h2>
          </div>
          <div className="section-content">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaReact />
                </div>
                <h3 className="feature-title">Frontend</h3>
                <div className="feature-tags">
                  <span className="feature-tag">React 18</span>
                  <span className="feature-tag">TypeScript</span>
                  <span className="feature-tag">Vite</span>
                  <span className="feature-tag">React Icons</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FaEthereum />
                </div>
                <h3 className="feature-title">Blockchain</h3>
                <div className="feature-tags">
                  <span className="feature-tag">Solidity</span>
                  <span className="feature-tag">Hardhat</span>
                  <span className="feature-tag">Ethers.js v6</span>
                  <span className="feature-tag">MetaMask</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FaPython />
                </div>
                <h3 className="feature-title">AI/ML</h3>
                <div className="feature-tags">
                  <span className="feature-tag">Python 3.11+</span>
                  <span className="feature-tag">Flask</span>
                  <span className="feature-tag">TextBlob</span>
                  <span className="feature-tag">NLTK</span>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FaTools />
                </div>
                <h3 className="feature-title">Development</h3>
                <div className="feature-tags">
                  <span className="feature-tag">Git</span>
                  <span className="feature-tag">ESLint</span>
                  <span className="feature-tag">HMR</span>
                  <span className="feature-tag">TS Strict</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes It Special */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <HiSparkles />
            </div>
            <h2 className="section-title">What Makes This Project Special</h2>
          </div>
          <div className="section-content">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">100% Decentralized</h3>
                <p className="feature-description">
                  Quotes stored on blockchain - no central server, no downtime
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <MdSecurity />
                </div>
                <h3 className="feature-title">Private & Secure</h3>
                <p className="feature-description">
                  AI runs locally - your data never leaves your machine
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Lightning Fast</h3>
                <p className="feature-description">
                  Local AI processing with instant blockchain confirmations
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💚</div>
                <h3 className="feature-title">Completely Free</h3>
                <p className="feature-description">
                  No API keys, no subscriptions, no hidden costs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="doc-section">
          <div className="section-header">
            <div className="section-icon">
              <FaTools />
            </div>
            <h2 className="section-title">Troubleshooting</h2>
          </div>
          <div className="section-content">
            <div className="info-box warning">
              <div className="info-box-title">⚠️ MetaMask Cache Issue</div>
              <div className="info-box-content">
                If you see &quot;invalid block tag&quot; or transaction errors, reset MetaMask:<br/>
                Settings → Advanced → Clear activity and nonce data → Refresh page
              </div>
            </div>

            <div className="info-box" style={{ marginTop: '1rem' }}>
              <div className="info-box-title">💡 Common Issues</div>
              <div className="info-box-content">
                <strong>Port Already in Use:</strong> Kill the process: <code>lsof -ti:5001 | xargs kill -9</code><br/>
                <strong>Cannot Connect to Hardhat:</strong> Start Hardhat node first: <code>npx hardhat node</code><br/>
                <strong>Insufficient Funds:</strong> Import Hardhat test account with private key<br/>
                <strong>Contract Not Found:</strong> Deploy contract after starting Hardhat node
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="doc-footer">
          <h3 className="footer-title">AIB Quote Manager</h3>
          <p className="footer-subtitle">Next-Generation Blockchain Quote Platform</p>
          <p className="footer-team">
            Built with ❤️ by Team AIB
          </p>
          <p className="footer-team">
            <strong>Adnan Qureshi (67)</strong> • <strong>Chirayu Giri (68)</strong> • <strong>Abdul Adeen (69)</strong> • <strong>Ralph Gonsalves (9)</strong>
          </p>
          <p className="footer-team" style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Project Mentor: <strong>Abhijeet Jhadhav</strong>
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
          <div className="tech-stack" style={{ marginTop: '1.5rem' }}>
            <div className="tech-badge"><FaGithub /> Open Source</div>
            <div className="tech-badge"><FaReact /> React</div>
            <div className="tech-badge"><FaEthereum /> Ethereum</div>
            <div className="tech-badge"><FaPython /> Python AI</div>
          </div>
        </footer>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          details={toastDetails}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
};

export default Documentation;
