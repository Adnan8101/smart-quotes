import hre from "hardhat";
import fs from "fs";

const { ethers } = hre;

async function main() {
  console.log("Deploying QuoteManager contract...");

  // Get the ContractFactory and Signers here.
  const QuoteManager = await ethers.getContractFactory("QuoteManager");
  
  // Deploy the contract
  const quoteManager = await QuoteManager.deploy();
  
  await quoteManager.waitForDeployment();

  console.log("QuoteManager deployed to:", await quoteManager.getAddress());
  
  // Add some sample quotes
  console.log("Adding sample quotes...");
  
  const sampleQuotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "motivation"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      category: "innovation"
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon",
      category: "life"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "inspiration"
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
      category: "wisdom"
    }
  ];
  
  for (const quote of sampleQuotes) {
    const tx = await quoteManager.addQuote(quote.text, quote.author, quote.category);
    await tx.wait();
    console.log(`Added quote: "${quote.text.substring(0, 50)}..." by ${quote.author}`);
  }
  
  console.log("Deployment completed!");
  console.log("Contract address:", await quoteManager.getAddress());
  
  // Save the contract address and ABI for the frontend
  const contractInfo = {
    address: await quoteManager.getAddress(),
    network: hre.network.name
  };
  
  fs.writeFileSync(
    "./src/contract-address.json",
    JSON.stringify(contractInfo, null, 2)
  );
  
  console.log("Contract address saved to src/contract-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
