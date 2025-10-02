#!/bin/bash

# AIB Quote Manager - Startup Script
# This script starts both the Python AI service and the React frontend

echo "=========================================="
echo "🚀 AIB Quote Manager - Starting Services"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0.32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${BLUE}📦 Creating Python virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${BLUE}🔧 Activating Python environment...${NC}"
source venv/bin/activate

# Install Python dependencies
echo -e "${BLUE}📚 Installing Python dependencies...${NC}"
pip install -q -r requirements.txt

# Download NLTK data
echo -e "${BLUE}📥 Downloading AI models...${NC}"
python3 -c "import nltk; nltk.download('punkt', quiet=True); nltk.download('stopwords', quiet=True)"

echo ""
echo -e "${GREEN}✅ Python AI service ready${NC}"
echo ""

# Start Python AI server in background
echo -e "${BLUE}🤖 Starting Python AI Service on port 5001...${NC}"
python3 ai_server.py &
AI_PID=$!

# Wait for AI service to start
sleep 3

# Check if AI service started successfully
if ps -p $AI_PID > /dev/null; then
    echo -e "${GREEN}✅ Python AI Service running (PID: $AI_PID)${NC}"
else
    echo -e "${RED}❌ Failed to start Python AI Service${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}⚛️  Starting React Frontend on port 5173...${NC}"
echo ""

# Start React development server
npm run dev

# Cleanup function
cleanup() {
    echo ""
    echo -e "${BLUE}🛑 Shutting down services...${NC}"
    kill $AI_PID 2>/dev/null
    echo -e "${GREEN}✅ Services stopped${NC}"
    exit 0
}

# Trap CTRL+C and cleanup
trap cleanup INT TERM

wait
