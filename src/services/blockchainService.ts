import { ethers } from 'ethers';
import contractAddress from '../contract-address.json';

// Network Configuration Type
export interface NetworkConfig {
  chainId: string;
  chainName: string;
  rpcUrl: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  isFree: boolean;
  icon: string;
  blockExplorer?: string;
  warning?: string;
}

// Supported Networks Configuration
export const NETWORKS: Record<string, NetworkConfig> = {
  HARDHAT_LOCAL: {
    chainId: '0x7a69', // 31337 in hex
    chainName: 'Hardhat Local',
    rpcUrl: 'http://localhost:8545',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    isFree: true,
    icon: '🔧'
  },
  SEPOLIA: {
    chainId: '0xaa36a7', // 11155111 in hex
    chainName: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/your-key',
    nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
    isFree: true,
    icon: '🧪',
    blockExplorer: 'https://sepolia.etherscan.io'
  },
  POLYGON_MUMBAI: {
    chainId: '0x13881', // 80001 in hex
    chainName: 'Polygon Mumbai',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    isFree: true,
    icon: '🟣',
    blockExplorer: 'https://mumbai.polygonscan.com'
  }
};

export type NetworkKey = keyof typeof NETWORKS;

// Import the contract ABI (will be generated after compilation)
const QuoteManagerABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "text", "type": "string"},
      {"internalType": "string", "name": "author", "type": "string"},
      {"internalType": "string", "name": "category", "type": "string"}
    ],
    "name": "addQuote",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllQuotes",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "text", "type": "string"},
          {"internalType": "string", "name": "author", "type": "string"},
          {"internalType": "string", "name": "category", "type": "string"},
          {"internalType": "address", "name": "submitter", "type": "address"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct QuoteManager.Quote[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "quoteId", "type": "uint256"}],
    "name": "getQuote",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "text", "type": "string"},
          {"internalType": "string", "name": "author", "type": "string"},
          {"internalType": "string", "name": "category", "type": "string"},
          {"internalType": "address", "name": "submitter", "type": "address"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct QuoteManager.Quote",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "category", "type": "string"}],
    "name": "getQuotesByCategory",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "text", "type": "string"},
          {"internalType": "string", "name": "author", "type": "string"},
          {"internalType": "string", "name": "category", "type": "string"},
          {"internalType": "address", "name": "submitter", "type": "address"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct QuoteManager.Quote[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserQuotes",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "text", "type": "string"},
          {"internalType": "string", "name": "author", "type": "string"},
          {"internalType": "string", "name": "category", "type": "string"},
          {"internalType": "address", "name": "submitter", "type": "address"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct QuoteManager.Quote[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "quoteId", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "text", "type": "string"},
      {"indexed": false, "internalType": "string", "name": "author", "type": "string"},
      {"indexed": true, "internalType": "address", "name": "submitter", "type": "address"}
    ],
    "name": "QuoteAdded",
    "type": "event"
  }
];

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  submitter: string;
  timestamp: number;
  isActive: boolean;
}

class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: ethers.Contract | null = null;
  private readOnlyContract: ethers.Contract | null = null;
  private currentNetwork: NetworkKey = 'HARDHAT_LOCAL';

  constructor() {
    this.initializeReadOnlyProvider();
  }

  /**
   * Initialize read-only provider for viewing quotes without wallet connection
   */
  private initializeReadOnlyProvider() {
    try {
      // Use Hardhat local node by default
      const readOnlyProvider = new ethers.JsonRpcProvider(NETWORKS.HARDHAT_LOCAL.rpcUrl);
      this.readOnlyContract = new ethers.Contract(
        contractAddress.address,
        QuoteManagerABI,
        readOnlyProvider
      );
    } catch (error) {
      console.error('Failed to initialize read-only provider:', error);
    }
  }

  /**
   * Get current network
   */
  getCurrentNetwork(): NetworkKey {
    return this.currentNetwork;
  }

  /**
   * Get available networks
   */
  getAvailableNetworks() {
    return Object.entries(NETWORKS).map(([key, config]) => ({
      key: key as NetworkKey,
      ...config
    }));
  }

  /**
   * Switch to a specific network
   */
  async switchNetwork(networkKey: NetworkKey): Promise<void> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const network = NETWORKS[networkKey];
    
    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });
      this.currentNetwork = networkKey;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: network.chainId,
              chainName: network.chainName,
              nativeCurrency: network.nativeCurrency,
              rpcUrls: [network.rpcUrl],
              blockExplorerUrls: network.blockExplorer ? [network.blockExplorer] : undefined,
            }],
          });
          this.currentNetwork = networkKey;
        } catch (addError) {
          throw new Error('Failed to add network to MetaMask');
        }
      } else {
        throw switchError;
      }
    }
  }

  /**
   * Connect to user's wallet with optional network selection
   */
  async connectWallet(networkKey?: NetworkKey): Promise<string | null> {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Switch network if specified - MUST happen before account connection
      if (networkKey) {
        await this.switchNetwork(networkKey);
        
        // Wait a bit for MetaMask to complete the network switch
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verify we're on the correct network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const expectedChainId = NETWORKS[networkKey].chainId.toLowerCase();
        if (chainId.toLowerCase() !== expectedChainId) {
          throw new Error(`Network switch failed. Expected ${NETWORKS[networkKey].chainName} but got chain ${chainId}`);
        }
      }

      // Request account access AFTER network is confirmed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      this.contract = new ethers.Contract(
        contractAddress.address,
        QuoteManagerABI,
        this.signer
      );

      const address = await this.signer.getAddress();
      
      // Update current network
      const network = await this.provider.getNetwork();
      this.currentNetwork = this.getNetworkKeyFromChainId(network.chainId.toString());
      
      console.log(`✅ Connected to ${NETWORKS[this.currentNetwork].chainName} at ${address}`);
      
      return address;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  /**
   * Helper to get network key from chain ID
   */
  private getNetworkKeyFromChainId(chainId: string): NetworkKey {
    const chainIdHex = '0x' + parseInt(chainId).toString(16);
    for (const [key, config] of Object.entries(NETWORKS)) {
      if (config.chainId.toLowerCase() === chainIdHex.toLowerCase()) {
        return key as NetworkKey;
      }
    }
    return 'HARDHAT_LOCAL'; // Default fallback
  }

  /**
   * Check if wallet is connected
   */
  isWalletConnected(): boolean {
    return this.provider !== null && this.signer !== null && this.contract !== null;
  }

  /**
   * Disconnect wallet
   */
  disconnectWallet(): void {
    this.provider = null;
    this.signer = null;
    this.contract = null;
  }

  /**
   * Get all quotes from the blockchain
   */
  async getAllQuotes(): Promise<Quote[]> {
    try {
      const contract = this.contract || this.readOnlyContract;
      if (!contract) {
        throw new Error('No contract instance available');
      }

      const quotes = await contract.getAllQuotes();
      return quotes.map((quote: any) => ({
        id: Number(quote.id),
        text: quote.text,
        author: quote.author,
        category: quote.category,
        submitter: quote.submitter,
        timestamp: Number(quote.timestamp),
        isActive: quote.isActive
      }));
    } catch (error) {
      console.error('Failed to get quotes:', error);
      throw error;
    }
  }

  /**
   * Add a new quote to the blockchain
   */
  async addQuote(text: string, author: string, category: string): Promise<any> {
    try {
      if (!this.contract || !this.signer) {
        throw new Error('Wallet not connected');
      }

      // Get current account address
      const address = await this.signer.getAddress();
      console.log('Adding quote from address:', address);

      // Get the current nonce from the network
      let nonce;
      try {
        nonce = await this.provider!.getTransactionCount(address, 'latest');
        console.log('Current nonce:', nonce);
      } catch (nonceError) {
        console.warn('Failed to get nonce, will let ethers handle it:', nonceError);
      }

      // Estimate gas with a buffer
      let gasLimit;
      try {
        const estimatedGas = await this.contract.addQuote.estimateGas(text, author, category);
        // Add 20% buffer to estimated gas
        gasLimit = (estimatedGas * 120n) / 100n;
        console.log('Estimated gas:', estimatedGas.toString(), 'Using gas limit:', gasLimit.toString());
      } catch (gasError) {
        console.error('Gas estimation failed:', gasError);
        // Check if it's a stale block issue
        if (gasError instanceof Error && gasError.message.includes('invalid block tag')) {
          throw new Error('⚠️ MetaMask cache issue detected!\n\n' +
            'Please reset your MetaMask account:\n' +
            '1. Open MetaMask\n' +
            '2. Go to Settings → Advanced\n' +
            '3. Click "Clear activity and nonce data"\n' +
            '4. Refresh the page and try again');
        }
        // Use a safe default gas limit if estimation fails
        gasLimit = 500000n;
      }

      // Prepare transaction options
      const txOptions: any = { gasLimit };
      if (nonce !== undefined) {
        txOptions.nonce = nonce;
      }

      // Send transaction with explicit gas limit and nonce
      const tx = await this.contract.addQuote(text, author, category, txOptions);
      
      console.log('Transaction sent:', tx.hash);
      return tx; // Return the full transaction object
    } catch (error: any) {
      console.error('Failed to add quote:', error);
      
      // Provide more helpful error messages
      if (error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction was rejected by user');
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error('Insufficient funds to pay for gas');
      } else if (error.message?.includes('nonce') || error.message?.includes('invalid block tag')) {
        throw new Error('⚠️ MetaMask cache issue!\n\n' +
          'Please reset your MetaMask account:\n' +
          '1. Open MetaMask\n' +
          '2. Go to Settings → Advanced\n' +
          '3. Click "Clear activity and nonce data"\n' +
          '4. Refresh the page and try again\n\n' +
          'This happens when Hardhat restarts.');
      } else if (error.message?.includes('Internal JSON-RPC error')) {
        throw new Error('⚠️ Network error detected!\n\n' +
          'Possible causes:\n' +
          '1. MetaMask cache is stale (most likely)\n' +
          '2. Hardhat node is not running\n\n' +
          'Solution: Reset MetaMask account (Settings → Advanced → Clear activity and nonce data)');
      }
      
      throw error;
    }
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<{gasPrice: string, blockNumber: number, networkName: string}> {
    try {
      const provider = this.provider;
      if (!provider) {
        // Use read-only provider as fallback
        const readOnlyProvider = new ethers.JsonRpcProvider('http://localhost:8545');
        const [gasPrice, blockNumber] = await Promise.all([
          readOnlyProvider.getFeeData(),
          readOnlyProvider.getBlockNumber()
        ]);

        return {
          gasPrice: gasPrice.gasPrice ? ethers.formatUnits(gasPrice.gasPrice, 'gwei') : '0',
          blockNumber,
          networkName: 'Hardhat Local'
        };
      }

      const [gasPrice, blockNumber] = await Promise.all([
        provider.getFeeData(),
        provider.getBlockNumber()
      ]);

      return {
        gasPrice: gasPrice.gasPrice ? ethers.formatUnits(gasPrice.gasPrice, 'gwei') : '0',
        blockNumber,
        networkName: 'Hardhat Local'
      };
    } catch (error) {
      console.error('Failed to get network stats:', error);
      return {
        gasPrice: '0',
        blockNumber: 0,
        networkName: 'Hardhat Local'
      };
    }
  }

  /**
   * Get a specific quote by ID
   */
  async getQuote(quoteId: number): Promise<Quote> {
    try {
      const contract = this.contract || this.readOnlyContract;
      if (!contract) {
        throw new Error('No contract instance available');
      }

      const quote = await contract.getQuote(quoteId);
      return {
        id: Number(quote.id),
        text: quote.text,
        author: quote.author,
        category: quote.category,
        submitter: quote.submitter,
        timestamp: Number(quote.timestamp),
        isActive: quote.isActive
      };
    } catch (error) {
      console.error('Failed to get quote:', error);
      throw error;
    }
  }

  /**
   * Get quotes by category
   */
  async getQuotesByCategory(category: string): Promise<Quote[]> {
    try {
      const contract = this.contract || this.readOnlyContract;
      if (!contract) {
        throw new Error('No contract instance available');
      }

      const quotes = await contract.getQuotesByCategory(category);
      return quotes.map((quote: any) => ({
        id: Number(quote.id),
        text: quote.text,
        author: quote.author,
        category: quote.category,
        submitter: quote.submitter,
        timestamp: Number(quote.timestamp),
        isActive: quote.isActive
      }));
    } catch (error) {
      console.error('Failed to get quotes by category:', error);
      throw error;
    }
  }

  /**
   * Get quotes submitted by a specific user
   */
  async getUserQuotes(userAddress: string): Promise<Quote[]> {
    try {
      const contract = this.contract || this.readOnlyContract;
      if (!contract) {
        throw new Error('No contract instance available');
      }

      const quotes = await contract.getUserQuotes(userAddress);
      return quotes.map((quote: any) => ({
        id: Number(quote.id),
        text: quote.text,
        author: quote.author,
        category: quote.category,
        submitter: quote.submitter,
        timestamp: Number(quote.timestamp),
        isActive: quote.isActive
      }));
    } catch (error) {
      console.error('Failed to get user quotes:', error);
      throw error;
    }
  }

  /**
   * Get the current user's address
   */
  async getCurrentUserAddress(): Promise<string | null> {
    if (!this.signer) return null;
    return await this.signer.getAddress();
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const blockchainService = new BlockchainService();
