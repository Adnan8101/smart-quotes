# 🚀 AI Blockchain Quote Manager

A next-generation decentralized quote management platform powered by **blockchain technology** and **custom Python AI model** - completely free, private, and open-source!

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-Hardhat-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-0.8-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1-000000?style=for-the-badge&logo=flask&logoColor=white)

## 👥 Development Team

**Project Mentor:** Abhijeet Jhadhav

| Name | Roll No | Role |
|------|---------|------|
| **Adnan Qureshi** | 67 | Project Lead & Blockchain Developer |
| **Chirayu Giri** | 68 | AI Developer |
| **Abdul Adeen** | 69 | Frontend Developer |
| **Ralph Gonsalves** | 9 | Backend Developer |

## 🌟 Features

### 🔗 Blockchain Integration
- **Immutable Storage**: Quotes are permanently stored on the Ethereum blockchain
- **Smart Contract Security**: Gas-optimized Solidity contracts with proper access controls
- **MetaMask Integration**: Secure wallet connection for transaction signing
- **Decentralized Architecture**: No central authority controls your data

### 🤖 Custom Python AI Model
- **100% Free**: No API keys, no subscriptions, runs completely offline
- **Privacy First**: All AI processing happens locally on your machine
- **Sentiment Analysis**: Detects positive, negative, or neutral emotions with emoji indicators
- **Smart Categorization**: Automatic quote classification (motivation, wisdom, humor, etc.)
- **Confidence Scoring**: AI confidence percentage (0-100%)
- **Keyword Extraction**: Identifies key themes and topics
- **Lightning Fast**: Local processing with instant results

### 🎨 Premium User Experience
- **Luxurious Design**: Premium glassmorphism UI with smooth animations
- **React Icons**: Modern, scalable icons throughout the interface
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Real-time Updates**: Live blockchain event listening
- **3D Effects**: Hover animations, shadows, and depth effects
- **Intuitive Navigation**: Easy-to-use interface for all users

## 🏗️ Architecture

### Smart Contract Layer
```
QuoteManager.sol
├── Quote Storage & Retrieval
├── Access Control & Ownership
├── Event Emission for Frontend
└── Gas-Optimized Operations
```

### Backend Services
```
services/
├── blockchainService.ts    # Web3 integration with ethers.js v6
└── pythonAIService.ts      # Python Flask AI API integration

Python AI/
├── ai_server.py           # Main Flask server (port 5001)
├── ai_model.py            # Alternative AI model
└── requirements.txt       # Python dependencies
```

### Frontend Components
```
components/
├── QuoteApp.tsx           # Main application container
├── WalletConnection.tsx   # MetaMask integration
├── SuperQuoteCreator.tsx  # AI-powered quote creation
├── QuoteList.tsx          # Display and manage quotes
├── QuoteSearch.tsx        # AI-powered search
├── EnhancedAIInsights.tsx # Python AI analysis display
├── Documentation.tsx      # Complete project documentation
└── NetworkWarning.tsx     # Network status indicator
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **npm** or **yarn** package manager
- **MetaMask** browser extension
- **pip** (Python package installer)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aib
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download NLTK data** (automatic on first run)
   ```bash
   python3 -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
   ```

5. **Start the blockchain network**
   ```bash
   npx hardhat node
   ```
   *Keep this terminal running*

6. **Deploy smart contracts** (in terminal 2)
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

7. **Start the Python AI server** (in terminal 3)
   ```bash
   python3 ai_server.py
   ```
   *Server will run on http://localhost:5001*

8. **Start the development server** (in terminal 4)
   ```bash
   npm run dev
   ```

9. **Open your browser**
   Navigate to `http://localhost:5173`

### 🎯 One-Command Startup (Alternative)
```bash
npm start
```
This runs everything automatically!

### MetaMask Setup

1. **Install MetaMask** extension in your browser
2. **Add Hardhat Network**:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://localhost:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

3. **Import Test Account**:
   - Use any private key from the Hardhat node output
   - Example: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - This gives you 10,000 free test ETH!

## 💻 Usage

### Adding Quotes
1. Connect your MetaMask wallet
2. Click "Add Quote" button
3. Fill in the quote text, author, and category
4. Confirm the transaction in MetaMask
5. Wait for blockchain confirmation

### Searching Quotes
1. Use the search bar for AI-powered semantic search
2. Try queries like "motivation" or "happiness"
3. Get AI insights about the best matching quotes
4. Use the random quote feature for discovery

### Managing Quotes
- View all quotes in the main list
- Filter by category using the dropdown
- See quote details including blockchain metadata
- Update or deactivate your own quotes

## 🔧 Development

### Project Structure
```
aib/
├── contracts/              # Solidity smart contracts
│   └── QuoteManager.sol   # Main quote management contract
├── scripts/               # Deployment and utility scripts
│   └── deploy.js         # Contract deployment script
├── src/                  # React TypeScript application
│   ├── components/       # React components
│   ├── services/         # Blockchain and AI services
│   └── assets/          # Static assets
├── test/                # Smart contract tests
├── artifacts/           # Compiled contract artifacts
└── hardhat.config.cjs   # Hardhat configuration
```

### Available Scripts

- `npm start` - Start everything (recommended!)
- `npm run dev` - Start development server only
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run ai:start` - Start Python AI server only
- `npx hardhat node` - Start local blockchain
- `npx hardhat test` - Run smart contract tests
- `npx hardhat compile` - Compile smart contracts

### Smart Contract Functions

| Function | Description | Gas Estimate |
|----------|-------------|--------------|
| `addQuote(text, author, category)` | Add new quote | ~50,000 gas |
| `getAllQuotes()` | Retrieve all quotes | View function |
| `getQuotesByCategory(category)` | Filter by category | View function |
| `getUserQuotes(address)` | Get user's quotes | View function |
| `updateQuote(id, text, author)` | Update existing quote | ~30,000 gas |

## 🤖 Python AI Integration

### Custom AI Features

The application uses a **100% free, local Python AI model** for:

- **Sentiment Analysis**: TextBlob-powered emotion detection (positive, negative, neutral)
- **Smart Categorization**: Automatic classification into 10+ categories
- **Keyword Extraction**: NLTK-based topic identification
- **Confidence Scoring**: AI confidence percentage (0-100%)
- **Quote Insights**: Context-aware recommendations and analysis
- **Privacy First**: All processing happens locally - no external API calls!

### API Endpoints

```python
# Python AI Server (Port 5001)
GET  /api/health          # Health check
POST /api/analyze         # Analyze quote sentiment & category
POST /api/find-quote      # Find best matching quote
POST /api/random          # Get random quote with insights
```

### Why Python AI?

✅ **100% Free** - No API keys or subscriptions  
✅ **Privacy First** - All data stays on your machine  
✅ **Lightning Fast** - Local processing, instant results  
✅ **Fully Customizable** - Modify the AI model as needed  
✅ **No Rate Limits** - Unlimited usage

## 🛠️ Troubleshooting

### Common Issues

**MetaMask Connection Failed**
- Ensure MetaMask is installed and unlocked
- Check network configuration (localhost:8545, Chain ID: 31337)
- Try refreshing the page and reconnecting

**Contract Deployment Failed**
- Verify Hardhat node is running
- Check that contracts compile without errors
- Ensure sufficient ETH in deployment account

**AI Features Not Working**
- Make sure Python AI server is running on port 5001
- Check if port 5001 is free: `lsof -ti:5001`
- Verify Python dependencies are installed: `pip install -r requirements.txt`
- Check terminal for Python server errors

**Transaction Failures**
- Check MetaMask account has sufficient ETH
- Verify gas limits and network congestion
- Try increasing gas price in MetaMask

### Gas Optimization Tips

- Batch multiple quotes in a single transaction when possible
- Use appropriate gas limits (50,000 for adding quotes)
- Monitor network congestion and adjust gas prices accordingly

## 🔐 Security Considerations

- **Smart Contract Security**: Contracts use OpenZeppelin patterns
- **Access Control**: Only quote owners can modify their quotes
- **Input Validation**: All user inputs are validated on-chain
- **Private Key Safety**: Never share private keys or seed phrases

## 🚀 Deployment

### Local Deployment
Already covered in Quick Start section.

### Testnet Deployment
1. Update `hardhat.config.cjs` with testnet configuration
2. Fund deployment account with testnet ETH
3. Deploy using: `npx hardhat run scripts/deploy.js --network <testnet>`

### Mainnet Deployment
⚠️ **Warning**: Mainnet deployment involves real ETH costs
1. Thoroughly test on testnets first
2. Audit smart contracts for security
3. Consider gas optimization strategies
4. Use multi-signature wallets for contract ownership

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for type safety
- Follow React functional component patterns with hooks
- Implement proper error handling for blockchain and AI operations
- Write comprehensive tests for smart contracts
- Ensure responsive design for mobile compatibility

## 📞 Support

- **Documentation**: Visit the in-app documentation page
- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions

## 🎯 Roadmap

### Phase 1 ✅
- [x] Basic quote storage on blockchain
- [x] MetaMask integration
- [x] Google Gemini AI integration
- [x] Modern UI with glassmorphism design

### Phase 2 🚧
- [ ] User profiles and social features
- [ ] Quote NFT minting
- [ ] Advanced AI features (sentiment analysis)
- [ ] Mobile app development

### Phase 3 🔮
- [ ] Cross-chain compatibility
- [ ] Decentralized governance
- [ ] Advanced analytics dashboard
- [ ] Integration with other AI models

---

<div align="center">

**Built with ❤️ by Team AIB**

**Adnan Qureshi (67)** • **Chirayu Giri (68)** • **Abdul Adeen (69)** • **Ralph Gonsalves (9)**

**Project Mentor:** Abhijeet Jhadhav

[🌐 Live Demo](http://localhost:5173) • [📖 Documentation](http://localhost:5173) • [🔗 GitHub](https://github.com/Adnan8101/smart-quotes)

---

### 🎓 Academic Project
Fr. Conceicao Rodrigues College of Engineering  
Department of Computer Engineering  
2024-2025

</div>

## ✨ Features

- **🤖 AI-Powered Search**: Use Google Gemini AI to find quotes based on semantic meaning, themes, and emotions
- **⛓️ Blockchain Storage**: Permanently store quotes on Ethereum-compatible blockchain
- **🔍 Smart Categorization**: AI automatically categorizes and analyzes quotes
- **💡 AI Insights**: Get AI-generated insights and interpretations of quotes
- **🎲 Random Quotes**: Discover quotes with AI-powered commentary
- **🔗 Wallet Integration**: Connect with MetaMask for blockchain interactions
- **📱 Responsive Design**: Modern glassmorphism UI that works on all devices

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS3** with glassmorphism design
- **Responsive** design for mobile compatibility

### Blockchain
- **Solidity** smart contracts
- **Hardhat** for development and deployment
- **Ethers.js** for Web3 integration
- **MetaMask** wallet connection

### AI Integration
- **Google Gemini AI** for text processing
- **Semantic search** and quote matching
- **Automated categorization**
- **AI-generated insights**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MetaMask browser extension
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd aib
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key
   ```

3. **Start local blockchain**
   ```bash
   npx hardhat node
   ```

4. **Deploy smart contracts** (in a new terminal)
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Go to `http://localhost:5173`
   - Connect your MetaMask wallet
   - Switch to Hardhat local network (Chain ID: 1337, RPC: http://localhost:8545)

## 🔧 Configuration

### MetaMask Setup
1. Install [MetaMask](https://metamask.io/)
2. Add Hardhat network:
   - Network Name: Hardhat Local
   - RPC URL: http://localhost:8545
   - Chain ID: 1337
   - Currency Symbol: ETH

### Environment Variables
Create a `.env` file with:
```env
VITE_GEMINI_API_KEY=your-gemini-api-key-here
VITE_NETWORK_URL=http://localhost:8545
VITE_CHAIN_ID=1337
```

## 📖 Usage

### Adding Quotes
1. Connect your MetaMask wallet
2. Click "Add Quote"
3. Enter quote text and author
4. Use AI analysis for automatic categorization
5. Submit to blockchain (requires gas fee)

### Searching Quotes
1. Use the AI-powered search to find quotes by:
   - Keywords and themes
   - Emotions and feelings
   - Semantic meaning
2. Try the "Random Quote" feature for AI insights
3. Filter by categories

### AI Features
- **Smart Search**: Find quotes based on meaning, not just keywords
- **Auto-Categorization**: AI suggests appropriate categories
- **Quote Analysis**: Get insights about quote meaning and significance
- **Random Insights**: Discover quotes with AI commentary

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── QuoteApp.tsx    # Main application component
│   ├── QuoteList.tsx   # Quote display and grid
│   ├── QuoteSearch.tsx # AI-powered search interface
│   ├── AddQuoteForm.tsx# Form for adding new quotes
│   ├── AIInsights.tsx  # AI analysis display
│   └── WalletConnection.tsx # MetaMask integration
├── services/           # Business logic
│   ├── geminiService.ts # Google Gemini AI integration
│   └── blockchainService.ts # Web3 and smart contract interaction
├── contracts/          # Solidity smart contracts
│   └── QuoteManager.sol # Main quote storage contract
└── scripts/           # Deployment scripts
    └── deploy.js      # Contract deployment script
```

## How AI Integration Works

### Quote Search
1. User enters search keywords
2. System fetches all quotes from blockchain
3. Gemini AI analyzes user intent and quote content
4. AI returns best matching quote with explanation

### Quote Analysis
1. User submits a new quote
2. Gemini AI analyzes the quote's:
   - Thematic content
   - Appropriate category
   - Meaning and significance
3. AI suggestions are presented to user

### Random Insights
1. System randomly selects a quote
2. Gemini AI provides:
   - Interpretation of the quote
   - Modern life applications
   - Related themes and concepts

## 🔧 Development

### Running Tests
```bash
npx hardhat test
```

### Compiling Contracts
```bash
npx hardhat compile
```

### Deploying to Different Networks
```bash
# Local Hardhat network
npx hardhat run scripts/deploy.js --network localhost

# Testnet (configure in hardhat.config.cjs)
npx hardhat run scripts/deploy.js --network sepolia
```

## 🌐 Deployment

### Frontend Deployment
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Smart Contract Deployment
1. Configure your target network in `hardhat.config.cjs`
2. Deploy contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```
3. Update `src/contract-address.json` with the new address

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful text processing
- [Hardhat](https://hardhat.org/) for Ethereum development tools
- [React](https://react.dev/) for the user interface
- [Ethers.js](https://ethers.org/) for Web3 integration

## 🆘 Troubleshooting

### Common Issues

**"Failed to connect wallet"**
- Ensure MetaMask is installed and unlocked
- Check that you're on the correct network

**"Contract not found"**
- Make sure local blockchain is running
- Verify contract is deployed to the correct network

**"AI service error"**
- Check your Gemini API key in `.env`
- Verify API key has proper permissions

**"Transaction failed"**
- Ensure you have enough ETH for gas fees
- Check if contract address is correct

For more help, check the browser console for detailed error messages.
