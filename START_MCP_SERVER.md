# Start MCP Server - Complete Guide

## Current Status ✅
- MCP server code is complete and compiled
- Prisma schema is configured for MariaDB
- Environment variables are configured
- Project structure is ready

## Step 1: Verify MariaDB Connection

First, ensure your MariaDB server is running and accessible:

```bash
# Test MariaDB connection
mysql -u root -p -h localhost -P 3306

# Enter password: zerocall

# Check if contaboo_mcp database exists
SHOW DATABASES LIKE 'contaboo_mcp';

# If database doesn't exist, create it:
CREATE DATABASE IF NOT EXISTS contaboo_mcp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Exit MySQL
exit;
```

## Step 2: Update Environment Configuration

Your current `.env` file is configured correctly:
```
DATABASE_URL="mysql://root:zerocall@localhost:3306/contaboo_mcp"
PORT=3001
NODE_ENV=development
```

If you need to change the database name to match your existing database, update it:
```bash
# Navigate to mcp-server directory
cd /home/xinreal/bitna/mcp-server

# Edit .env file
nano .env

# Update DATABASE_URL if needed (e.g., to use 'bitna' database instead)
# DATABASE_URL="mysql://root:zerocall@localhost:3306/bitna"
```

## Step 3: Generate Prisma Client & Migrate Database

```bash
cd /home/xinreal/bitna/mcp-server

# Generate Prisma Client
npx prisma generate

# Push the schema to your database (this will create all tables)
npx prisma db push

# Or run migrations if they exist
npx prisma migrate deploy
```

## Step 4: Build the MCP Server (if needed)

The server is already built, but if you make changes:

```bash
cd /home/xinreal/bitna/mcp-server

# Install dependencies (if not already installed)
npm install

# Build TypeScript to JavaScript
npm run build
```

## Step 5: Start the MCP Server

### Option A: Start in Development Mode (with hot reload)
```bash
cd /home/xinreal/bitna/mcp-server
npm run dev
```

### Option B: Start in Production Mode
```bash
cd /home/xinreal/bitna/mcp-server
npm start
```

### Option C: Test the MCP Server with stdio
```bash
cd /home/xinreal/bitna/mcp-server
node dist/index.js
```

The server should output to stderr:
```
[MCP Server] Contaboo MCP Server started
[MCP Server] Database health: {"status":"connected","message":"Database connection successful"}
```

## Step 6: Configure Claude Desktop

The Claude Desktop config needs to be updated for WSL/Ubuntu paths:

**Location:** 
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Updated Configuration for WSL Ubuntu:**
```json
{
  "mcpServers": {
    "bitna-crm": {
      "command": "wsl",
      "args": [
        "node",
        "/home/xinreal/bitna/mcp-server/dist/index.js"
      ],
      "env": {
        "DATABASE_URL": "mysql://root:zerocall@localhost:3306/contaboo_mcp",
        "NODE_ENV": "development"
      }
    }
  }
}
```

**Alternative: If using Node.js installed in WSL:**
```json
{
  "mcpServers": {
    "bitna-crm": {
      "command": "wsl",
      "args": [
        "/usr/bin/node",
        "/home/xinreal/bitna/mcp-server/dist/index.js"
      ],
      "env": {
        "DATABASE_URL": "mysql://root:zerocall@localhost:3306/contaboo_mcp",
        "NODE_ENV": "development"
      }
    }
  }
}
```

## Step 7: Restart Claude Desktop

After updating the configuration:
1. Completely quit Claude Desktop
2. Restart Claude Desktop
3. The MCP server should automatically connect

## Step 8: Test MCP Connection in Claude

In Claude Desktop, try these commands:

1. **List available tools:**
   - "What tools do you have access to?"
   
2. **Get statistics:**
   - "Use get_stats to show me database statistics"
   
3. **Get properties:**
   - "Show me the first 5 properties from the database"
   
4. **Get static data:**
   - "Get all property types from the database"

## Troubleshooting

### Database Connection Issues

```bash
# Check MariaDB is running
sudo systemctl status mariadb

# Start MariaDB if not running
sudo systemctl start mariadb

# Test connection
mysql -u root -p -h localhost -P 3306
```

### Permission Issues

```bash
# Grant necessary permissions
mysql -u root -p

# In MySQL prompt:
GRANT ALL PRIVILEGES ON contaboo_mcp.* TO 'root'@'localhost';
GRANT ALL PRIVILEGES ON bitna.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
exit;
```

### WSL Network Issues

If Claude Desktop can't connect to WSL MariaDB:

```bash
# Find WSL IP address
ip addr show eth0 | grep inet

# Update DATABASE_URL in .env with WSL IP
# DATABASE_URL="mysql://root:zerocall@172.x.x.x:3306/contaboo_mcp"
```

### Check MCP Server Logs

```bash
# View stderr output (MCP server logs go here)
cd /home/xinreal/bitna/mcp-server
node dist/index.js 2> mcp-server.log

# In another terminal, tail the logs
tail -f mcp-server.log
```

### Verify Node.js Version

```bash
# MCP SDK requires Node.js 18 or higher
node --version

# Should output v18.x.x or higher
```

## Available MCP Tools

Once connected, you'll have access to these tools:

1. **get_properties** - Retrieve properties with filters
   - Filters: limit, offset, status, type, region, minPrice, maxPrice
   
2. **get_leads** - Retrieve leads
   - Filters: limit, offset, status, source, assignedTo
   
3. **get_users** - Retrieve users
   - Filters: limit, offset, role, status
   
4. **get_activities** - Retrieve activities
   - Filters: limit, offset, type, status, priority, assignedTo
   
5. **get_stats** - Get dashboard statistics
   - Returns: total properties, leads, users, recent activities
   
6. **get_static_data** - Get dropdown options
   - Types: property_types, regions, categories, statuses, amenities

## Quick Start Script

Create a startup script:

```bash
# Create script file
nano /home/xinreal/bitna/start-mcp.sh

# Add content:
#!/bin/bash
cd /home/xinreal/bitna/mcp-server
echo "Starting MCP Server..."
node dist/index.js

# Make executable
chmod +x /home/xinreal/bitna/start-mcp.sh

# Run it
./start-mcp.sh
```

## Health Check

Test the server manually:

```bash
cd /home/xinreal/bitna/mcp-server

# This will start the server and show health status
node -e "
const { checkDatabaseConnection } = require('./dist/config/database.js');
checkDatabaseConnection().then(console.log).catch(console.error);
"
```

## Next Steps

1. ✅ Verify MariaDB is running
2. ✅ Update .env with correct database name
3. ✅ Run `npx prisma generate`
4. ✅ Run `npx prisma db push`
5. ✅ Test server with `node dist/index.js`
6. ✅ Update Claude Desktop config
7. ✅ Restart Claude Desktop
8. ✅ Test MCP tools in Claude

---

**Need Help?**
- Check MCP server logs: `tail -f /home/xinreal/bitna/mcp-server/mcp-server.log`
- Check MariaDB logs: `sudo tail -f /var/log/mysql/error.log`
- Test database connection: `mysql -u root -p -h localhost -P 3306`
