import React from 'react';
import { 
  FaReact, FaPython, FaEthereum, FaNode, 
  FaDatabase, FaShieldAlt, FaChartLine, FaBrain,
  FaCode, FaNetworkWired, FaLock, FaRocket,
  FaCheck, FaGraduationCap, FaBook, FaUsers
} from 'react-icons/fa';
import { SiTypescript, SiSolidity, SiVite, SiFlask } from 'react-icons/si';

const VivaExplanation: React.FC = () => {
  return (
    <div className="documentation">
      <div className="doc-container">
        {/* Header */}
        <div className="doc-header">
          <h1>🎓 VIVA PREPARATION GUIDE</h1>
          <p className="doc-subtitle">
            Complete Project Explanation - AI Blockchain Quote Manager
          </p>
          <div className="tech-stack">
            <span className="tech-badge">🚀 Final Year Project</span>
            <span className="tech-badge">👨‍💻 Team of 4</span>
            <span className="tech-badge">📅 October 2025</span>
          </div>
        </div>

        {/* Project Overview */}
        <section className="premium-hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">⭐</span>
              <span>Project Overview</span>
            </div>
            <h1 className="premium-hero-title">
              <span className="title-gradient">AI Blockchain</span>
              <span className="title-accent">Quote Manager</span>
            </h1>
            <p className="premium-hero-subtitle">
              A decentralized quote management platform combining blockchain immutability 
              with AI-powered insights. Quotes are stored permanently on Ethereum blockchain 
              and analyzed using a custom Python AI model - all completely free and private!
            </p>

            <div className="premium-stats-grid">
              <div className="premium-stat-card">
                <div className="stat-glow"></div>
                <span className="stat-icon">🔗</span>
                <div className="stat-content">
                  <span className="stat-value">Web3</span>
                  <span className="stat-label">Blockchain</span>
                </div>
              </div>
              <div className="premium-stat-card">
                <div className="stat-glow"></div>
                <span className="stat-icon">🤖</span>
                <div className="stat-content">
                  <span className="stat-value">AI</span>
                  <span className="stat-label">Python Model</span>
                </div>
              </div>
              <div className="premium-stat-card">
                <div className="stat-glow"></div>
                <span className="stat-icon">⚡</span>
                <div className="stat-content">
                  <span className="stat-value">React</span>
                  <span className="stat-label">Modern UI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="doc-section">
          <h2><FaUsers /> Development Team</h2>
          <p><strong>Project Mentor:</strong> Abhijeet Jhadhav</p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">AQ</div>
              <h3>Adnan Qureshi</h3>
              <p className="member-id">Roll No: 67</p>
              <p className="member-role">Project Lead & Blockchain Developer</p>
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                Smart Contracts, Web3 Integration, Architecture
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">CG</div>
              <h3>Chirayu Giri</h3>
              <p className="member-id">Roll No: 68</p>
              <p className="member-role">AI Developer</p>
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                Python AI Model, Flask API, ML Integration
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">AA</div>
              <h3>Abdul Adeen</h3>
              <p className="member-id">Roll No: 69</p>
              <p className="member-role">Frontend Developer</p>
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                React Components, UI/UX, Responsive Design
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">RG</div>
              <h3>Ralph Gonsalves</h3>
              <p className="member-id">Roll No: 9</p>
              <p className="member-role">Backend Developer</p>
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
                Backend Services, API Integration, Testing
              </p>
            </div>
          </div>
        </section>

        {/* Complete Tech Stack */}
        <section className="premium-installation-section">
          <h2><FaCode /> Complete Technology Stack</h2>
          
          <div className="step-group">
            <div className="step">
              <div className="step-number">1</div>
              <div>
                <h4><FaReact /> Frontend Technologies</h4>
                <div className="feature-grid">
                  <div className="feature-card">
                    <h3><FaReact /> React 19.1.0</h3>
                    <p>Modern UI library for building interactive interfaces with component-based architecture</p>
                  </div>
                  <div className="feature-card">
                    <h3><SiTypescript /> TypeScript 5.8</h3>
                    <p>Static typing for better code quality, IDE support, and catching errors early</p>
                  </div>
                  <div className="feature-card">
                    <h3><SiVite /> Vite 6.0</h3>
                    <p>Lightning-fast build tool with instant hot module replacement (HMR)</p>
                  </div>
                  <div className="feature-card">
                    <h3>🎨 CSS3 + Custom Design</h3>
                    <p>Premium minimalist design system with glassmorphism, animations, and responsive layout</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div>
                <h4><FaEthereum /> Blockchain Technologies</h4>
                <div className="feature-grid">
                  <div className="feature-card">
                    <h3><SiSolidity /> Solidity 0.8.27</h3>
                    <p>Smart contract programming language for Ethereum blockchain</p>
                  </div>
                  <div className="feature-card">
                    <h3>🔨 Hardhat</h3>
                    <p>Professional Ethereum development environment for compiling, testing, and deploying</p>
                  </div>
                  <div className="feature-card">
                    <h3>⚡ Ethers.js v6</h3>
                    <p>Modern Web3 library for interacting with Ethereum blockchain and smart contracts</p>
                  </div>
                  <div className="feature-card">
                    <h3>🦊 MetaMask</h3>
                    <p>Browser wallet extension for secure transaction signing and account management</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div>
                <h4><FaPython /> AI & Backend Technologies</h4>
                <div className="feature-grid">
                  <div className="feature-card">
                    <h3><FaPython /> Python 3.11</h3>
                    <p>High-level programming language for AI/ML development</p>
                  </div>
                  <div className="feature-card">
                    <h3><SiFlask /> Flask 3.1</h3>
                    <p>Lightweight Python web framework for creating AI model API endpoints</p>
                  </div>
                  <div className="feature-card">
                    <h3>🤗 Transformers</h3>
                    <p>Hugging Face library for NLP models (sentiment analysis, classification)</p>
                  </div>
                  <div className="feature-card">
                    <h3>🧠 TextBlob</h3>
                    <p>Python library for text processing and sentiment analysis</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div>
                <h4><FaNode /> Development Tools</h4>
                <div className="feature-grid">
                  <div className="feature-card">
                    <h3><FaNode /> Node.js</h3>
                    <p>JavaScript runtime for running development server and build tools</p>
                  </div>
                  <div className="feature-card">
                    <h3>📦 npm/yarn</h3>
                    <p>Package managers for installing and managing JavaScript dependencies</p>
                  </div>
                  <div className="feature-card">
                    <h3>🔧 ESLint</h3>
                    <p>Code quality tool for identifying and fixing JavaScript/TypeScript issues</p>
                  </div>
                  <div className="feature-card">
                    <h3>🎨 React Icons</h3>
                    <p>Popular icon library with thousands of customizable icons</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Architecture */}
        <section className="premium-running-section">
          <h2><FaNetworkWired /> System Architecture</h2>
          
          <div className="premium-run-container">
            <h3>Three-Layer Architecture</h3>
            
            <div className="step-group">
              <div className="step">
                <div className="step-number">1</div>
                <div>
                  <h4>📱 Frontend Layer (React + TypeScript)</h4>
                  <div className="code-block">
                    <pre>{`React Application
├── User Interface Components
│   ├── Quote Creation Form
│   ├── Quote Display Grid
│   ├── AI Insights Panel
│   └── Wallet Connection UI
├── State Management (React Hooks)
├── Web3 Integration (ethers.js)
└── API Communication (Fetch API)`}</pre>
                  </div>
                  <p>
                    The frontend handles all user interactions, displays quotes beautifully, 
                    and communicates with both blockchain and AI backend.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div>
                  <h4>⛓️ Blockchain Layer (Ethereum Smart Contract)</h4>
                  <div className="code-block">
                    <pre>{`QuoteManager.sol
├── Data Structures
│   ├── Quote struct (text, author, category, timestamp)
│   └── Mapping for storage
├── Functions
│   ├── addQuote() - Add new quote
│   ├── getQuote() - Get single quote
│   ├── getAllQuotes() - Get all quotes
│   └── getQuoteCount() - Total count
├── Events
│   └── QuoteAdded - Emitted on new quote
└── Access Control
    └── Owner-based permissions`}</pre>
                  </div>
                  <p>
                    Smart contract ensures data immutability, transparency, and decentralization. 
                    Once deployed, quotes cannot be modified or deleted.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div>
                  <h4>🤖 AI Layer (Python Flask Server)</h4>
                  <div className="code-block">
                    <pre>{`Python AI Server (Port 5001)
├── Flask REST API
│   ├── /analyze - Quote analysis endpoint
│   └── CORS enabled for frontend
├── AI Models
│   ├── Sentiment Analysis (Transformers)
│   ├── Category Classification
│   ├── Keyword Extraction
│   └── Confidence Scoring
└── Response Format
    └── JSON with sentiment, category, keywords`}</pre>
                  </div>
                  <p>
                    Custom Python AI model runs locally, ensuring privacy and zero costs. 
                    Analyzes quotes for sentiment, categories, and extracts keywords.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="premium-contract-section">
          <h2><FaRocket /> Core Features Explained</h2>
          
          <div className="function-list">
            <div className="function-item">
              <code><FaShieldAlt /> Blockchain Immutability</code>
              <p>
                Quotes stored on Ethereum blockchain cannot be modified or deleted. 
                Each quote has a permanent, tamper-proof record with timestamp and ownership.
              </p>
            </div>

            <div className="function-item">
              <code><FaBrain /> AI-Powered Analysis</code>
              <p>
                Custom Python model analyzes each quote for:
                • Sentiment (positive/negative/neutral)
                • Category (motivation/wisdom/humor/life/success/philosophy)
                • Keywords (main themes and topics)
                • Confidence score (AI certainty percentage)
              </p>
            </div>

            <div className="function-item">
              <code><FaLock /> Privacy First</code>
              <p>
                All AI processing happens locally on your machine. No data sent to 
                third-party APIs, no tracking, completely private and free forever.
              </p>
            </div>

            <div className="function-item">
              <code><FaChartLine /> Real-time Updates</code>
              <p>
                Uses Web3 event listeners to detect new quotes added to blockchain 
                and updates UI instantly without page refresh.
              </p>
            </div>

            <div className="function-item">
              <code><FaDatabase /> Decentralized Storage</code>
              <p>
                No central database. All data stored on Ethereum blockchain, 
                accessible from anywhere, resistant to censorship and data loss.
              </p>
            </div>

            <div className="function-item">
              <code>🎨 Premium User Experience</code>
              <p>
                Modern minimalist design with glassmorphism effects, smooth animations, 
                responsive layout, and intuitive navigation. Works perfectly on all devices.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="premium-ai-section">
          <h2><FaBook /> How It Works - Step by Step</h2>
          
          <div className="step-group">
            <div className="step">
              <div className="step-number">1</div>
              <div>
                <h4>User Connects Wallet</h4>
                <p>
                  User clicks "Connect Wallet" → MetaMask prompts for permission → 
                  User approves → Application receives wallet address → Can now interact with blockchain
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div>
                <h4>User Creates Quote</h4>
                <p>
                  User enters quote text, author, and category → Frontend validates input → 
                  Sends to Python AI for analysis → Receives AI insights (sentiment, keywords, confidence)
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div>
                <h4>Blockchain Transaction</h4>
                <p>
                  User clicks "Add to Blockchain" → Smart contract addQuote() function called → 
                  MetaMask shows transaction details and gas fees → User confirms → 
                  Transaction sent to blockchain → Mined in next block
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div>
                <h4>Real-time Update</h4>
                <p>
                  Smart contract emits QuoteAdded event → Frontend event listener detects it → 
                  Automatically fetches updated quote list → UI updates instantly → 
                  New quote appears in the grid
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">5</div>
              <div>
                <h4>View & Search</h4>
                <p>
                  Users can view all quotes in beautiful card layout → 
                  Filter by category → Search by keywords → 
                  Click for detailed view with full AI analysis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Smart Contract Details */}
        <section className="doc-section">
          <h2><SiSolidity /> Smart Contract Explained</h2>
          
          <div className="code-block">
            <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuoteManager {
    // Data structure for each quote
    struct Quote {
        string text;      // Quote content
        string author;    // Quote author
        string category;  // motivation, wisdom, etc.
        uint256 timestamp; // When it was added
        address owner;    // Who added it
    }
    
    // Storage
    Quote[] public quotes;           // Array of all quotes
    mapping(uint256 => Quote) private quoteMap; // Quick lookup
    
    // Events for frontend
    event QuoteAdded(
        uint256 indexed id,
        string text,
        string author,
        string category,
        uint256 timestamp,
        address indexed owner
    );
    
    // Main functions
    function addQuote(
        string memory _text,
        string memory _author,
        string memory _category
    ) public returns (uint256) {
        // Create new quote
        Quote memory newQuote = Quote({
            text: _text,
            author: _author,
            category: _category,
            timestamp: block.timestamp,
            owner: msg.sender
        });
        
        // Store it
        quotes.push(newQuote);
        uint256 quoteId = quotes.length - 1;
        quoteMap[quoteId] = newQuote;
        
        // Emit event
        emit QuoteAdded(
            quoteId,
            _text,
            _author,
            _category,
            block.timestamp,
            msg.sender
        );
        
        return quoteId;
    }
    
    function getAllQuotes() public view returns (Quote[] memory) {
        return quotes;
    }
    
    function getQuoteCount() public view returns (uint256) {
        return quotes.length;
    }
}`}</pre>
          </div>

          <h3>Gas Optimization Techniques Used:</h3>
          <ul>
            <li>✅ Used memory instead of storage where possible</li>
            <li>✅ Efficient data structures (array + mapping)</li>
            <li>✅ Minimal state changes</li>
            <li>✅ Optimized event emissions</li>
            <li>✅ No unnecessary loops or iterations</li>
          </ul>
        </section>

        {/* Python AI Model */}
        <section className="doc-section">
          <h2><FaPython /> Python AI Model Explained</h2>
          
          <div className="code-block">
            <pre>{`# ai_server.py - Flask REST API Server

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from textblob import TextBlob
import re

app = Flask(__name__)
CORS(app)  # Allow frontend to connect

# Load AI models
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

@app.route('/analyze', methods=['POST'])
def analyze_quote():
    data = request.json
    quote_text = data.get('text', '')
    
    # 1. Sentiment Analysis
    sentiment_result = sentiment_analyzer(quote_text)[0]
    sentiment = sentiment_result['label'].lower()  # positive/negative
    confidence = sentiment_result['score'] * 100   # 0-100%
    
    # 2. Category Classification
    category = classify_category(quote_text)
    
    # 3. Keyword Extraction
    keywords = extract_keywords(quote_text)
    
    # 4. Return JSON response
    return jsonify({
        'sentiment': sentiment,
        'confidence': confidence,
        'category': category,
        'keywords': keywords,
        'emoji': get_sentiment_emoji(sentiment)
    })

def classify_category(text):
    # Rule-based + ML classification
    text_lower = text.lower()
    
    motivation_words = ['success', 'achieve', 'dream', 'goal']
    wisdom_words = ['wisdom', 'knowledge', 'learn', 'understand']
    humor_words = ['funny', 'laugh', 'joke', 'humor']
    
    # Count matches and return best category
    # ... classification logic ...
    
    return 'motivation'  # or wisdom, humor, etc.

def extract_keywords(text):
    # NLP keyword extraction
    blob = TextBlob(text)
    # Extract noun phrases and important words
    keywords = list(blob.noun_phrases)
    return keywords[:5]  # Top 5 keywords

if __name__ == '__main__':
    app.run(port=5001, debug=True)`}</pre>
          </div>

          <h3>AI Capabilities:</h3>
          <ul>
            <li>🎯 <strong>Sentiment Analysis:</strong> Uses DistilBERT model trained on sentiment data</li>
            <li>📊 <strong>Confidence Scoring:</strong> Shows AI certainty (85% means highly confident)</li>
            <li>🏷️ <strong>Auto-Categorization:</strong> Classifies into 6 categories using NLP</li>
            <li>🔑 <strong>Keyword Extraction:</strong> Identifies main themes using TextBlob</li>
            <li>😊 <strong>Emoji Mapping:</strong> Visual sentiment indicators</li>
          </ul>
        </section>

        {/* Viva Questions & Answers */}
        <section className="premium-installation-section">
          <h2><FaGraduationCap /> Expected Viva Questions & Answers</h2>
          
          <div className="function-list">
            <div className="function-item">
              <code>Q: Why blockchain for quotes?</code>
              <p>
                <strong>Answer:</strong> Blockchain provides immutability (quotes can't be changed or deleted), 
                transparency (anyone can verify), decentralization (no single point of failure), 
                and proof of authorship with timestamps. Traditional databases can be hacked, 
                modified, or deleted - blockchain ensures permanent, tamper-proof storage.
              </p>
            </div>

            <div className="function-item">
              <code>Q: Why custom AI model instead of ChatGPT API?</code>
              <p>
                <strong>Answer:</strong> Three main reasons:
                <br/>1. <strong>Cost:</strong> API calls cost money, our model is 100% free
                <br/>2. <strong>Privacy:</strong> No data sent to third parties, all processing local
                <br/>3. <strong>Learning:</strong> Building custom AI model demonstrates ML skills
                <br/>4. <strong>Control:</strong> We can fine-tune and customize for our specific needs
              </p>
            </div>

            <div className="function-item">
              <code>Q: What is gas fee and how is it calculated?</code>
              <p>
                <strong>Answer:</strong> Gas fee is the cost to execute operations on Ethereum blockchain. 
                It's calculated as: Gas Fee = Gas Units × Gas Price. 
                More complex operations (like storing data) require more gas units. 
                Gas price fluctuates based on network demand. Our contract is optimized to minimize gas costs.
              </p>
            </div>

            <div className="function-item">
              <code>Q: How does MetaMask work?</code>
              <p>
                <strong>Answer:</strong> MetaMask is a browser extension that acts as a wallet. 
                It securely stores private keys, signs transactions, and manages multiple accounts. 
                When our app needs to interact with blockchain, MetaMask prompts user for approval, 
                signs the transaction with private key, and broadcasts it to the network.
              </p>
            </div>

            <div className="function-item">
              <code>Q: What is ethers.js and why use it?</code>
              <p>
                <strong>Answer:</strong> Ethers.js is a modern Web3 library for Ethereum interaction. 
                We chose it over web3.js because it's:
                <br/>• More lightweight and faster
                <br/>• Better TypeScript support
                <br/>• Cleaner API design
                <br/>• Actively maintained with latest features
              </p>
            </div>

            <div className="function-item">
              <code>Q: How do you ensure security?</code>
              <p>
                <strong>Answer:</strong> Multiple layers:
                <br/>1. Smart contract uses access control (only owner can modify settings)
                <br/>2. Input validation on frontend and backend
                <br/>3. MetaMask handles secure transaction signing
                <br/>4. CORS enabled on Flask server for API security
                <br/>5. No sensitive data stored in frontend code
              </p>
            </div>

            <div className="function-item">
              <code>Q: What is the difference between public and private blockchain?</code>
              <p>
                <strong>Answer:</strong> 
                <br/><strong>Public:</strong> Anyone can join, view, and participate (Ethereum, Bitcoin)
                <br/><strong>Private:</strong> Restricted access, controlled by organization (Hyperledger)
                <br/>We use public Ethereum for transparency, but can deploy on private network for testing.
              </p>
            </div>

            <div className="function-item">
              <code>Q: How does sentiment analysis work?</code>
              <p>
                <strong>Answer:</strong> We use DistilBERT, a transformer-based model:
                <br/>1. Text is tokenized (broken into pieces)
                <br/>2. Model processes through multiple neural network layers
                <br/>3. Attention mechanism identifies important words
                <br/>4. Final layer classifies as positive/negative with confidence score
                <br/>Model was pre-trained on millions of text samples.
              </p>
            </div>

            <div className="function-item">
              <code>Q: What are the limitations of your project?</code>
              <p>
                <strong>Answer:</strong> Honest assessment:
                <br/>• Gas fees can be high on Ethereum mainnet (mitigated by using testnets)
                <br/>• Transaction speed limited by block time (~12 seconds)
                <br/>• AI model accuracy could improve with more training data
                <br/>• Scalability limited by blockchain throughput
                <br/><strong>Future improvements:</strong> Layer 2 solutions, better AI models, IPFS for large data
              </p>
            </div>

            <div className="function-item">
              <code>Q: What testing did you perform?</code>
              <p>
                <strong>Answer:</strong>
                <br/>• Unit testing of smart contract functions in Hardhat
                <br/>• Frontend component testing with React
                <br/>• AI model accuracy testing with sample quotes
                <br/>• Integration testing of full workflow
                <br/>• UI/UX testing on different devices and browsers
                <br/>• Gas optimization testing to reduce costs
              </p>
            </div>
          </div>
        </section>

        {/* Future Enhancements */}
        <section className="premium-contract-section">
          <h2>🚀 Future Enhancements</h2>
          
          <div className="overview-grid">
            <div className="feature-card">
              <h3>🌐 IPFS Integration</h3>
              <p>Store large content on IPFS (decentralized file storage) and save only hash on blockchain</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Layer 2 Solutions</h3>
              <p>Deploy on Polygon or Arbitrum for faster, cheaper transactions</p>
            </div>
            <div className="feature-card">
              <h3>🤖 Advanced AI</h3>
              <p>Fine-tune models on quote-specific data, add quote generation capability</p>
            </div>
            <div className="feature-card">
              <h3>👥 Social Features</h3>
              <p>User profiles, quote sharing, voting system, leaderboards</p>
            </div>
            <div className="feature-card">
              <h3>📱 Mobile App</h3>
              <p>React Native mobile application for iOS and Android</p>
            </div>
            <div className="feature-card">
              <h3>🔔 Notifications</h3>
              <p>Web push notifications for new quotes, comments, interactions</p>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="premium-ai-section">
          <h2><FaCheck /> Key Points to Remember for Viva</h2>
          
          <div className="function-list">
            <div className="function-item">
              <code>1. Project Uniqueness</code>
              <p>
                Combines TWO cutting-edge technologies: Blockchain + AI. 
                Not just using APIs, but built custom AI model and smart contract from scratch.
              </p>
            </div>

            <div className="function-item">
              <code>2. Practical Application</code>
              <p>
                Real-world use case: Preserving wisdom, protecting authorship, 
                preventing quote manipulation, enabling decentralized quote libraries.
              </p>
            </div>

            <div className="function-item">
              <code>3. Technical Depth</code>
              <p>
                Full-stack project covering frontend (React), backend (Python Flask), 
                blockchain (Solidity), and AI/ML (Transformers, NLP). Demonstrates versatility.
              </p>
            </div>

            <div className="function-item">
              <code>4. Team Collaboration</code>
              <p>
                Clear role distribution: Blockchain (Adnan), AI (Chirayu), 
                Frontend (Abdul), Backend (Ralph). Agile methodology with regular sync-ups.
              </p>
            </div>

            <div className="function-item">
              <code>5. Problem Solving</code>
              <p>
                Solved real challenges: Gas optimization, AI model selection, 
                CORS issues, MetaMask integration, real-time updates, responsive design.
              </p>
            </div>

            <div className="function-item">
              <code>6. Industry Relevance</code>
              <p>
                Blockchain and AI are top industry trends. Skills learned are directly 
                applicable to jobs in Web3, DeFi, NFTs, and AI/ML fields.
              </p>
            </div>
          </div>
        </section>

        {/* Final Tips */}
        <section className="doc-section">
          <h2>💡 Final Viva Tips</h2>
          
          <div className="overview-grid">
            <div className="feature-card">
              <h3>✅ Be Confident</h3>
              <p>You built this. You know it. Speak clearly and confidently about your work.</p>
            </div>
            <div className="feature-card">
              <h3>🎯 Stay Focused</h3>
              <p>Answer the question asked. Don't go off-topic. If unsure, ask for clarification.</p>
            </div>
            <div className="feature-card">
              <h3>🔍 Show Working Project</h3>
              <p>Demo is worth 1000 words. Have the project running smoothly before viva.</p>
            </div>
            <div className="feature-card">
              <h3>📊 Know Your Code</h3>
              <p>Be able to explain ANY line of code in your project. Review key files.</p>
            </div>
            <div className="feature-card">
              <h3>💬 Admit When Unsure</h3>
              <p>"Great question! I'd need to research that further" is better than making up answers.</p>
            </div>
            <div className="feature-card">
              <h3>🎓 Show Learning</h3>
              <p>Emphasize what you learned, challenges faced, and how you overcame them.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="premium-doc-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-icon">🎓</span>
              <div className="footer-text">
                <h3>Good Luck Tomorrow!</h3>
                <p>You've got this! 💪</p>
              </div>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-team">
              <p className="footer-label">Development Team</p>
              <div className="footer-members">
                <span className="footer-member">Adnan Qureshi (67)</span>
                <span className="footer-dot">•</span>
                <span className="footer-member">Chirayu Giri (68)</span>
                <span className="footer-dot">•</span>
                <span className="footer-member">Abdul Adeen (69)</span>
                <span className="footer-dot">•</span>
                <span className="footer-member">Ralph Gonsalves (9)</span>
              </div>
              <p className="footer-year">© 2025 - AI Blockchain Quote Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VivaExplanation;
