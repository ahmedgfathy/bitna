#!/bin/bash

# MCP Server Test Script
# Tests all components before starting the server

set -e

echo "================================================"
echo "   MCP Server - System Test"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TEST_PASSED=0
TEST_FAILED=0

# Test function
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo -n "Testing $test_name... "
    
    if eval "$test_command" &> /dev/null; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((TEST_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        ((TEST_FAILED++))
        return 1
    fi
}

# Test 1: Node.js
run_test "Node.js installation" "command -v node"
if command -v node &> /dev/null; then
    echo "   Version: $(node --version)"
fi
echo ""

# Test 2: npm
run_test "npm installation" "command -v npm"
if command -v npm &> /dev/null; then
    echo "   Version: $(npm --version)"
fi
echo ""

# Test 3: MySQL/MariaDB client
run_test "MySQL/MariaDB client" "command -v mysql"
echo ""

# Test 4: MariaDB server
run_test "MariaDB server running" "sudo systemctl is-active mariadb || sudo systemctl is-active mysql"
echo ""

# Test 5: Project directory
run_test "Project directory exists" "[ -d /home/xinreal/bitna/mcp-server ]"
echo ""

# Test 6: Environment file
run_test ".env file exists" "[ -f /home/xinreal/bitna/mcp-server/.env ]"
if [ -f /home/xinreal/bitna/mcp-server/.env ]; then
    source /home/xinreal/bitna/mcp-server/.env
    echo "   Database: $(echo $DATABASE_URL | sed 's/.*@.*\/\(.*\)/\1/')"
fi
echo ""

# Test 7: node_modules
run_test "Dependencies installed" "[ -d /home/xinreal/bitna/mcp-server/node_modules ]"
echo ""

# Test 8: Build directory
run_test "TypeScript compiled" "[ -f /home/xinreal/bitna/mcp-server/dist/index.js ]"
echo ""

# Test 9: Database connection
echo -n "Testing database connection... "
if [ -f /home/xinreal/bitna/mcp-server/.env ]; then
    source /home/xinreal/bitna/mcp-server/.env
    DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
    DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
    DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
    DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
    DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
    
    if mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -e "USE $DB_NAME; SELECT 1;" &> /dev/null; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((TEST_PASSED++))
        echo "   Connected to: $DB_NAME@$DB_HOST:$DB_PORT"
    else
        echo -e "${RED}✗ FAIL${NC}"
        ((TEST_FAILED++))
        echo "   Could not connect to: $DB_NAME@$DB_HOST:$DB_PORT"
    fi
else
    echo -e "${RED}✗ FAIL${NC}"
    ((TEST_FAILED++))
    echo "   .env file not found"
fi
echo ""

# Test 10: Database tables
echo -n "Testing database tables... "
if [ -f /home/xinreal/bitna/mcp-server/.env ]; then
    source /home/xinreal/bitna/mcp-server/.env
    DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
    DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
    DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
    DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
    DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
    
    TABLE_COUNT=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -D "$DB_NAME" -s -N -e "SELECT COUNT(*) FROM information_schema.TABLES WHERE table_schema = '$DB_NAME';" 2>/dev/null || echo "0")
    
    if [ "$TABLE_COUNT" -gt "0" ]; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((TEST_PASSED++))
        echo "   Found $TABLE_COUNT tables"
    else
        echo -e "${YELLOW}⚠ WARNING${NC}"
        echo "   No tables found. Run: npx prisma db push"
    fi
else
    echo -e "${RED}✗ FAIL${NC}"
    ((TEST_FAILED++))
fi
echo ""

# Test 11: Prisma Client
echo -n "Testing Prisma Client... "
if [ -d /home/xinreal/bitna/mcp-server/node_modules/@prisma/client ]; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((TEST_PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((TEST_FAILED++))
    echo "   Run: npx prisma generate"
fi
echo ""

# Test 12: Startup script
echo -n "Testing startup script... "
if [ -x /home/xinreal/bitna/start-mcp.sh ]; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((TEST_PASSED++))
else
    if [ -f /home/xinreal/bitna/start-mcp.sh ]; then
        echo -e "${YELLOW}⚠ WARNING${NC}"
        echo "   Script exists but not executable. Run: chmod +x start-mcp.sh"
    else
        echo -e "${RED}✗ FAIL${NC}"
        ((TEST_FAILED++))
        echo "   Startup script not found"
    fi
fi
echo ""

# Summary
echo "================================================"
echo "   Test Summary"
echo "================================================"
echo ""
echo -e "Tests Passed:  ${GREEN}$TEST_PASSED${NC}"
if [ $TEST_FAILED -gt 0 ]; then
    echo -e "Tests Failed:  ${RED}$TEST_FAILED${NC}"
else
    echo -e "Tests Failed:  ${GREEN}0${NC}"
fi
echo ""

# Recommendations
if [ $TEST_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "You can now start the MCP server:"
    echo "  cd /home/xinreal/bitna"
    echo "  ./start-mcp.sh"
    echo ""
    echo "Or start manually:"
    echo "  cd /home/xinreal/bitna/mcp-server"
    echo "  node dist/index.js"
else
    echo -e "${RED}⚠ Some tests failed${NC}"
    echo ""
    echo "Please fix the issues above before starting the server."
    echo ""
    echo "Common fixes:"
    echo "  1. Install dependencies: cd mcp-server && npm install"
    echo "  2. Generate Prisma Client: npx prisma generate"
    echo "  3. Build TypeScript: npm run build"
    echo "  4. Setup database: ./setup-database.sh"
    echo "  5. Push schema: cd mcp-server && npx prisma db push"
fi

echo ""
echo "================================================"

exit $TEST_FAILED
