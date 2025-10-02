// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title QuoteManager
 * @dev A smart contract for storing and managing quotes on the blockchain
 */
contract QuoteManager {
    struct Quote {
        uint256 id;
        string text;
        string author;
        string category;
        address submitter;
        uint256 timestamp;
        bool isActive;
    }
    
    // State variables
    uint256 private _quoteCounter;
    Quote[] private _quotes;
    mapping(uint256 => uint256) private _quoteIndexes; // quoteId => array index
    mapping(address => uint256[]) private _userQuotes;
    mapping(string => uint256[]) private _categoryQuotes;
    
    // Events
    event QuoteAdded(uint256 indexed quoteId, string text, string author, address indexed submitter);
    event QuoteUpdated(uint256 indexed quoteId, string text, string author);
    event QuoteDeactivated(uint256 indexed quoteId);
    
    // Modifiers
    modifier onlyQuoteOwner(uint256 quoteId) {
        require(_quotes[_quoteIndexes[quoteId]].submitter == msg.sender, "Not the quote owner");
        _;
    }
    
    modifier validQuoteId(uint256 quoteId) {
        require(quoteId > 0 && quoteId <= _quoteCounter, "Invalid quote ID");
        require(_quotes[_quoteIndexes[quoteId]].isActive, "Quote is not active");
        _;
    }
    
    /**
     * @dev Add a new quote to the blockchain
     * @param text The quote text
     * @param author The author of the quote
     * @param category The category of the quote
     */
    function addQuote(string memory text, string memory author, string memory category) public returns (uint256) {
        require(bytes(text).length > 0, "Quote text cannot be empty");
        require(bytes(author).length > 0, "Author cannot be empty");
        
        _quoteCounter++;
        uint256 newQuoteId = _quoteCounter;
        
        Quote memory newQuote = Quote({
            id: newQuoteId,
            text: text,
            author: author,
            category: category,
            submitter: msg.sender,
            timestamp: block.timestamp,
            isActive: true
        });
        
        _quotes.push(newQuote);
        _quoteIndexes[newQuoteId] = _quotes.length - 1;
        _userQuotes[msg.sender].push(newQuoteId);
        
        if (bytes(category).length > 0) {
            _categoryQuotes[category].push(newQuoteId);
        }
        
        emit QuoteAdded(newQuoteId, text, author, msg.sender);
        return newQuoteId;
    }
    
    /**
     * @dev Get a quote by its ID
     * @param quoteId The ID of the quote
     */
    function getQuote(uint256 quoteId) public view validQuoteId(quoteId) returns (Quote memory) {
        return _quotes[_quoteIndexes[quoteId]];
    }
    
    /**
     * @dev Get all active quotes
     */
    function getAllQuotes() public view returns (Quote[] memory) {
        uint256 activeCount = 0;
        
        // Count active quotes
        for (uint256 i = 0; i < _quotes.length; i++) {
            if (_quotes[i].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active quotes
        Quote[] memory activeQuotes = new Quote[](activeCount);
        uint256 activeIndex = 0;
        
        for (uint256 i = 0; i < _quotes.length; i++) {
            if (_quotes[i].isActive) {
                activeQuotes[activeIndex] = _quotes[i];
                activeIndex++;
            }
        }
        
        return activeQuotes;
    }
    
    /**
     * @dev Get quotes by category
     * @param category The category to filter by
     */
    function getQuotesByCategory(string memory category) public view returns (Quote[] memory) {
        uint256[] memory quoteIds = _categoryQuotes[category];
        Quote[] memory categoryQuotes = new Quote[](quoteIds.length);
        
        uint256 activeIndex = 0;
        for (uint256 i = 0; i < quoteIds.length; i++) {
            if (_quotes[_quoteIndexes[quoteIds[i]]].isActive) {
                categoryQuotes[activeIndex] = _quotes[_quoteIndexes[quoteIds[i]]];
                activeIndex++;
            }
        }
        
        // Resize array to remove empty slots
        Quote[] memory result = new Quote[](activeIndex);
        for (uint256 i = 0; i < activeIndex; i++) {
            result[i] = categoryQuotes[i];
        }
        
        return result;
    }
    
    /**
     * @dev Get quotes submitted by a user
     * @param user The address of the user
     */
    function getUserQuotes(address user) public view returns (Quote[] memory) {
        uint256[] memory quoteIds = _userQuotes[user];
        Quote[] memory userQuotes = new Quote[](quoteIds.length);
        
        uint256 activeIndex = 0;
        for (uint256 i = 0; i < quoteIds.length; i++) {
            if (_quotes[_quoteIndexes[quoteIds[i]]].isActive) {
                userQuotes[activeIndex] = _quotes[_quoteIndexes[quoteIds[i]]];
                activeIndex++;
            }
        }
        
        // Resize array to remove empty slots
        Quote[] memory result = new Quote[](activeIndex);
        for (uint256 i = 0; i < activeIndex; i++) {
            result[i] = userQuotes[i];
        }
        
        return result;
    }
    
    /**
     * @dev Update a quote (only by owner)
     * @param quoteId The ID of the quote to update
     * @param text New quote text
     * @param author New author
     */
    function updateQuote(uint256 quoteId, string memory text, string memory author) 
        public 
        validQuoteId(quoteId) 
        onlyQuoteOwner(quoteId) 
    {
        require(bytes(text).length > 0, "Quote text cannot be empty");
        require(bytes(author).length > 0, "Author cannot be empty");
        
        uint256 index = _quoteIndexes[quoteId];
        _quotes[index].text = text;
        _quotes[index].author = author;
        
        emit QuoteUpdated(quoteId, text, author);
    }
    
    /**
     * @dev Deactivate a quote (only by owner)
     * @param quoteId The ID of the quote to deactivate
     */
    function deactivateQuote(uint256 quoteId) 
        public 
        validQuoteId(quoteId) 
        onlyQuoteOwner(quoteId) 
    {
        uint256 index = _quoteIndexes[quoteId];
        _quotes[index].isActive = false;
        
        emit QuoteDeactivated(quoteId);
    }
    
    /**
     * @dev Get total number of quotes (including inactive)
     */
    function getTotalQuoteCount() public view returns (uint256) {
        return _quoteCounter;
    }
    
    /**
     * @dev Get number of active quotes
     */
    function getActiveQuoteCount() public view returns (uint256) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < _quotes.length; i++) {
            if (_quotes[i].isActive) {
                activeCount++;
            }
        }
        return activeCount;
    }
}
