import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("QuoteManager", function () {
  let QuoteManager;
  let quoteManager;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    QuoteManager = await ethers.getContractFactory("QuoteManager");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    quoteManager = await QuoteManager.deploy();
  });

  describe("Deployment", function () {
    it("Should start with zero quotes", async function () {
      expect(await quoteManager.getTotalQuoteCount()).to.equal(0);
      expect(await quoteManager.getActiveQuoteCount()).to.equal(0);
    });
  });

  describe("Adding Quotes", function () {
    it("Should add a quote successfully", async function () {
      const text = "The only way to do great work is to love what you do.";
      const author = "Steve Jobs";
      const category = "motivation";

      const tx = await quoteManager.addQuote(text, author, category);
      const receipt = await tx.wait();

      // Check if QuoteAdded event was emitted
      const events = receipt.logs.filter(log => {
        try {
          const parsed = quoteManager.interface.parseLog(log);
          return parsed.name === "QuoteAdded";
        } catch {
          return false;
        }
      });
      
      expect(events.length).to.be.greaterThan(0);
      
      if (events.length > 0) {
        const event = quoteManager.interface.parseLog(events[0]);
        expect(event.args.quoteId).to.equal(1);
        expect(event.args.text).to.equal(text);
        expect(event.args.author).to.equal(author);
      }

      // Check quote count
      expect(await quoteManager.getTotalQuoteCount()).to.equal(1);
      expect(await quoteManager.getActiveQuoteCount()).to.equal(1);
    });

    it("Should not add empty quote", async function () {
      await expect(
        quoteManager.addQuote("", "Author", "category")
      ).to.be.revertedWith("Quote text cannot be empty");
    });

    it("Should not add quote without author", async function () {
      await expect(
        quoteManager.addQuote("Some text", "", "category")
      ).to.be.revertedWith("Author cannot be empty");
    });
  });

  describe("Retrieving Quotes", function () {
    beforeEach(async function () {
      // Add some sample quotes
      await quoteManager.addQuote("Quote 1", "Author 1", "motivation");
      await quoteManager.addQuote("Quote 2", "Author 2", "wisdom");
      await quoteManager.addQuote("Quote 3", "Author 3", "motivation");
    });

    it("Should get a quote by ID", async function () {
      const quote = await quoteManager.getQuote(1);
      expect(quote.id).to.equal(1);
      expect(quote.text).to.equal("Quote 1");
      expect(quote.author).to.equal("Author 1");
      expect(quote.category).to.equal("motivation");
      expect(quote.isActive).to.be.true;
    });

    it("Should get all quotes", async function () {
      const quotes = await quoteManager.getAllQuotes();
      expect(quotes.length).to.equal(3);
      expect(quotes[0].text).to.equal("Quote 1");
      expect(quotes[1].text).to.equal("Quote 2");
      expect(quotes[2].text).to.equal("Quote 3");
    });

    it("Should get quotes by category", async function () {
      const motivationQuotes = await quoteManager.getQuotesByCategory("motivation");
      expect(motivationQuotes.length).to.equal(2);
      expect(motivationQuotes[0].text).to.equal("Quote 1");
      expect(motivationQuotes[1].text).to.equal("Quote 3");

      const wisdomQuotes = await quoteManager.getQuotesByCategory("wisdom");
      expect(wisdomQuotes.length).to.equal(1);
      expect(wisdomQuotes[0].text).to.equal("Quote 2");
    });

    it("Should get quotes by user", async function () {
      // Add a quote with addr1
      await quoteManager.connect(addr1).addQuote("User Quote", "User Author", "test");
      
      const userQuotes = await quoteManager.getUserQuotes(addr1.address);
      expect(userQuotes.length).to.equal(1);
      expect(userQuotes[0].text).to.equal("User Quote");
      expect(userQuotes[0].submitter).to.equal(addr1.address);
    });
  });

  describe("Quote Management", function () {
    beforeEach(async function () {
      await quoteManager.addQuote("Test Quote", "Test Author", "test");
    });

    it("Should update quote by owner", async function () {
      await quoteManager.updateQuote(1, "Updated Quote", "Updated Author");
      
      const quote = await quoteManager.getQuote(1);
      expect(quote.text).to.equal("Updated Quote");
      expect(quote.author).to.equal("Updated Author");
    });

    it("Should not update quote by non-owner", async function () {
      await expect(
        quoteManager.connect(addr1).updateQuote(1, "Hacked Quote", "Hacker")
      ).to.be.revertedWith("Not the quote owner");
    });

    it("Should deactivate quote by owner", async function () {
      await quoteManager.deactivateQuote(1);
      
      await expect(
        quoteManager.getQuote(1)
      ).to.be.revertedWith("Quote is not active");
      
      expect(await quoteManager.getActiveQuoteCount()).to.equal(0);
      expect(await quoteManager.getTotalQuoteCount()).to.equal(1);
    });

    it("Should not deactivate quote by non-owner", async function () {
      await expect(
        quoteManager.connect(addr1).deactivateQuote(1)
      ).to.be.revertedWith("Not the quote owner");
    });
  });
});
