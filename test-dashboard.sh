#!/bin/bash

# CRM Dashboard Test Script
# This script helps test the redesigned dashboard

echo "=============================================="
echo "CRM Dashboard - Testing Guide"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Installing Dependencies${NC}"
echo "Installing expo-linear-gradient..."
cd /home/xinreal/bitna/mobile
npx expo install expo-linear-gradient
echo ""

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 2: Building MCP Server${NC}"
cd /home/xinreal/bitna/mcp-server
npm run build
echo ""
echo -e "${GREEN}✓ MCP Server built${NC}"
echo ""

echo "=============================================="
echo -e "${YELLOW}Next Steps:${NC}"
echo "=============================================="
echo ""
echo "1. Start API Server (Terminal 1):"
echo "   cd /home/xinreal/bitna/api"
echo "   npm run dev"
echo ""
echo "2. Start MCP Server (Terminal 2):"
echo "   cd /home/xinreal/bitna/mcp-server"
echo "   npm start"
echo ""
echo "3. Start Mobile App (Terminal 3):"
echo "   cd /home/xinreal/bitna/mobile"
echo "   npm start"
echo ""
echo "=============================================="
echo -e "${GREEN}Dashboard Features:${NC}"
echo "=============================================="
echo "✓ Gradient stat cards with real data"
echo "✓ Recent properties with images"
echo "✓ Recent activities timeline"
echo "✓ Lead funnel visualization"
echo "✓ Property analytics charts"
echo "✓ Pull-to-refresh functionality"
echo "✓ Enhanced error handling"
echo ""
echo "=============================================="
echo -e "${BLUE}Documentation:${NC}"
echo "=============================================="
echo "• DASHBOARD_QUICK_START.md - Quick start guide"
echo "• DASHBOARD_REDESIGN_COMPLETE.md - Full technical docs"
echo ""
echo -e "${GREEN}Ready to test! 🚀${NC}"
echo ""
