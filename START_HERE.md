# 🚀 Quick Start Guide - AIB Quote Manager

## Step-by-Step Instructions

### 1️⃣ **Kill any process using port 5001 (if needed)**
```bash
lsof -ti:5001 | xargs kill -9
```

### 2️⃣ **Open Terminal 1: Start Hardhat Blockchain**
```bash
cd /Users/adnan/Downloads/aib
npx hardhat node
```
Leave this running! You should see 20 accounts with private keys.

### 3️⃣ **Open Terminal 2: Deploy Smart Contract**
```bash
cd /Users/adnan/Downloads/aib
npx hardhat run scripts/deploy.js --network localhost
```
You should see: "QuoteManager deployed to: 0x5FbDB..."

### 4️⃣ **Open Terminal 3: Start Python AI Server**
```bash
cd /Users/adnan/Downloads/aib
source venv/bin/activate
python3 ai_server.py
```
Server should start on http://localhost:5001

### 5️⃣ **Open Terminal 4: Start React Frontend**
```bash
cd /Users/adnan/Downloads/aib
npm run dev
```
Frontend will open on http://localhost:5173

### 6️⃣ **Configure MetaMask**
1. Open MetaMask
2. Add Network:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency: `ETH`
3. Import Account (use Account #0 private key from Hardhat):
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

## 🎉 You're Ready!
Open http://localhost:5173 in your browser and start adding quotes!

---

## 🔧 One-Command Startup (Alternative)
```bash
npm start
```
This runs `start.sh` which starts everything automatically.

---

## ⚠️ Troubleshooting

### Port 5001 Already in Use
```bash
lsof -ti:5001 | xargs kill -9
```

### Cannot Connect to Hardhat
Make sure Terminal 1 is running `npx hardhat node`

### Contract Not Deployed
Make sure Terminal 2 successfully deployed the contract

### MetaMask Shows Wrong Chain
Reset MetaMask: Settings → Advanced → Clear activity and nonce data

---

## 👥 Team AIB
- **Adnan Qureshi (67)** - Project Lead & Blockchain Developer
- **Chirayu Giri (68)** - AI Developer  
- **Abdul Adeen (69)** - Frontend Developer
- **Ralph Gonsalves (9)** - Backend Developer

**Project Mentor:** Abhijeet Jhadhav
