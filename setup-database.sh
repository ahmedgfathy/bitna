#!/bin/bash

# Database Setup Script for MCP Server
# This script helps set up the database for the MCP server

set -e

echo "================================================"
echo "   Bitna CRM - Database Setup for MCP"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Database credentials (change these if needed)
DB_USER="root"
DB_PASS="zerocall"
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="contaboo_mcp"

echo "This script will:"
echo "1. Check if MariaDB/MySQL is running"
echo "2. Create the database if it doesn't exist"
echo "3. Grant necessary permissions"
echo "4. Verify the connection"
echo ""

read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

# Check if MariaDB/MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL/MariaDB client not found${NC}"
    echo "Please install MariaDB client: sudo apt install mariadb-client"
    exit 1
fi

echo -e "${GREEN}✓${NC} MySQL/MariaDB client found"

# Check if MariaDB server is running
echo ""
echo "🔍 Checking if MariaDB server is running..."

if sudo systemctl is-active --quiet mariadb; then
    echo -e "${GREEN}✓${NC} MariaDB is running"
elif sudo systemctl is-active --quiet mysql; then
    echo -e "${GREEN}✓${NC} MySQL is running"
else
    echo -e "${RED}❌ MariaDB/MySQL is not running${NC}"
    echo ""
    echo "Starting MariaDB..."
    if sudo systemctl start mariadb 2>/dev/null || sudo systemctl start mysql 2>/dev/null; then
        echo -e "${GREEN}✓${NC} MariaDB started successfully"
    else
        echo -e "${RED}❌ Failed to start MariaDB${NC}"
        echo "Please start it manually: sudo systemctl start mariadb"
        exit 1
    fi
fi

echo ""
echo "🔐 Connecting to database..."
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo "   User: $DB_USER"
echo ""

# Test connection
if ! mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}❌ Failed to connect to database${NC}"
    echo ""
    echo "Please check:"
    echo "1. Username and password are correct"
    echo "2. MariaDB is running: sudo systemctl status mariadb"
    echo "3. User has proper permissions"
    echo ""
    echo "Try connecting manually: mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p"
    exit 1
fi

echo -e "${GREEN}✓${NC} Connected to database successfully"
echo ""

# Check if database exists
echo "🔍 Checking if database '$DB_NAME' exists..."

DB_EXISTS=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -e "SHOW DATABASES LIKE '$DB_NAME';" | grep -c "$DB_NAME" || true)

if [ "$DB_EXISTS" -eq "0" ]; then
    echo -e "${YELLOW}⚠${NC}  Database '$DB_NAME' does not exist"
    echo ""
    echo "Creating database '$DB_NAME'..."
    
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Database '$DB_NAME' created successfully"
    else
        echo -e "${RED}❌ Failed to create database${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} Database '$DB_NAME' already exists"
fi

echo ""
echo "🔑 Granting permissions..."

mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" << EOF
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'$DB_HOST';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'%';
FLUSH PRIVILEGES;
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Permissions granted successfully"
else
    echo -e "${YELLOW}⚠${NC}  Permission grant had warnings (this might be okay)"
fi

echo ""
echo "🔍 Verifying database access..."

if mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -e "USE $DB_NAME; SELECT 1;" &> /dev/null; then
    echo -e "${GREEN}✓${NC} Can access database '$DB_NAME' successfully"
else
    echo -e "${RED}❌ Cannot access database '$DB_NAME'${NC}"
    exit 1
fi

echo ""
echo "📊 Database Information:"
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -e "
USE $DB_NAME;
SELECT 
    'Database Size' as Info, 
    CONCAT(ROUND(SUM(data_length + index_length) / 1024 / 1024, 2), ' MB') as Value
FROM information_schema.TABLES 
WHERE table_schema = '$DB_NAME'
UNION ALL
SELECT 
    'Number of Tables' as Info,
    COUNT(*) as Value
FROM information_schema.TABLES 
WHERE table_schema = '$DB_NAME';
" 2>/dev/null || echo "No tables yet (this is normal for a new database)"

echo ""
echo "================================================"
echo -e "${GREEN}✅ Database setup complete!${NC}"
echo "================================================"
echo ""
echo "📝 Database Configuration:"
echo "   DATABASE_URL=\"mysql://$DB_USER:$DB_PASS@$DB_HOST:$DB_PORT/$DB_NAME\""
echo ""
echo "Next steps:"
echo "1. Update .env file in /home/xinreal/bitna/mcp-server/"
echo "2. Run: cd /home/xinreal/bitna/mcp-server && npx prisma generate"
echo "3. Run: npx prisma db push"
echo "4. Start MCP server: ./start-mcp.sh"
echo ""
