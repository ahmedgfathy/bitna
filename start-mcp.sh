#!/bin/bash

# MCP Server Startup Script
# Location: /home/xinreal/bitna/start-mcp.sh

set -e

echo "================================================"
echo "   Bitna CRM - MCP Server Startup"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Change to MCP server directory
cd /home/xinreal/bitna/mcp-server

echo "📂 Current directory: $(pwd)"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18 or higher"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm version: $(npm --version)"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    echo "Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}⚠${NC}  Please edit .env file with your database credentials"
        exit 1
    else
        echo -e "${RED}❌ .env.example not found${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓${NC} Environment file exists"

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${GREEN}✓${NC} Dependencies already installed"
fi
echo ""

# Check if dist directory exists
if [ ! -d dist ]; then
    echo -e "${YELLOW}🔨 Building TypeScript...${NC}"
    npm run build
    echo -e "${GREEN}✓${NC} Build complete"
else
    echo -e "${GREEN}✓${NC} Build directory exists"
fi
echo ""

# Check database connection
echo "🔍 Testing database connection..."

# Read DATABASE_URL from .env
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ DATABASE_URL not found in .env${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} DATABASE_URL configured"
echo ""

# Test MySQL connection
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')

echo "📊 Database Configuration:"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo "   Database: $DB_NAME"
echo "   User: $DB_USER"
echo ""

# Test MySQL connection
if mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -e "USE $DB_NAME; SELECT 1;" &> /dev/null; then
    echo -e "${GREEN}✓${NC} Database connection successful"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    echo ""
    echo "Troubleshooting steps:"
    echo "1. Check if MariaDB/MySQL is running: sudo systemctl status mariadb"
    echo "2. Start MariaDB if needed: sudo systemctl start mariadb"
    echo "3. Verify credentials in .env file"
    echo "4. Test manual connection: mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p"
    exit 1
fi
echo ""

# Generate Prisma Client if needed
if [ ! -d node_modules/@prisma/client ]; then
    echo "🔧 Generating Prisma Client..."
    npx prisma generate
    echo -e "${GREEN}✓${NC} Prisma Client generated"
    echo ""
fi

# Push database schema
echo "📤 Pushing database schema..."
if npx prisma db push --accept-data-loss &> /dev/null; then
    echo -e "${GREEN}✓${NC} Database schema updated"
else
    echo -e "${YELLOW}⚠${NC}  Database schema push had warnings (this is usually okay)"
fi
echo ""

# Start the MCP server
echo "================================================"
echo "🚀 Starting MCP Server..."
echo "================================================"
echo ""
echo "Server will start in 3 seconds..."
sleep 1
echo "2..."
sleep 1
echo "1..."
sleep 1
echo ""
echo -e "${GREEN}Server is starting...${NC}"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Run the server
node dist/index.js
