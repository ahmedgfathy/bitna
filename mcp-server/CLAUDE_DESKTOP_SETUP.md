# Claude Desktop MCP Server Setup Guide

## ✅ Setup Complete!

Your MCP server has been configured for Claude Desktop on Windows with WSL.

## Configuration Files

### 1. MCP Server Startup Script
**Location:** `/home/xinreal/bitna/mcp-server/start-mcp.sh`

```bash
#!/bin/bash
cd /home/xinreal/bitna/mcp-server
node dist/index.js
```

### 2. Claude Desktop Configuration
**Location:** `C:\Users\Ahmed Fathy\AppData\Roaming\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bitna-crm": {
      "command": "wsl.exe",
      "args": [
        "-e",
        "/home/xinreal/bitna/mcp-server/start-mcp.sh"
      ],
      "env": {
        "DATABASE_URL": "mysql://root:zerocall@localhost:3306/contaboo",
        "NODE_ENV": "development"
      }
    }
  }
}
```

### 3. MCP Server Environment
**Location:** `/home/xinreal/bitna/mcp-server/.env`

```env
DATABASE_URL="mysql://root:zerocall@localhost:3306/contaboo"
PORT=3001
NODE_ENV=development
```

## How to Use

### Step 1: Restart Claude Desktop
1. **Close Claude Desktop completely** (check system tray)
2. **Reopen Claude Desktop**
3. The MCP server will automatically start

### Step 2: Verify Connection
Look for the MCP icon or tools in Claude Desktop. You should see:
- 🔌 **MCP Server Connected:** bitna-crm

### Step 3: Available Tools
You can now use these 6 MCP tools in Claude Desktop:

1. **get_properties** - Retrieve properties from database
   - Parameters: limit, offset, status, type, region
   - Example: "Get me 5 properties for rent"

2. **get_leads** - Retrieve leads
   - Parameters: limit, offset, status, source
   - Example: "Show me the last 10 leads"

3. **get_users** - Retrieve users
   - Parameters: limit, offset, role, status
   - Example: "List all active sales agents"

4. **get_activities** - Retrieve activities
   - Parameters: limit, offset, type, status, priority
   - Example: "Show me pending tasks"

5. **get_stats** - Get dashboard statistics
   - No parameters needed
   - Example: "Give me the dashboard stats"

6. **get_static_data** - Get dropdown options
   - Parameters: type (property_types, regions, categories, statuses, amenities)
   - Example: "What property types are available?"

## Testing the Setup

### Test from Command Line (WSL)
```bash
cd /home/xinreal/bitna/mcp-server
./start-mcp.sh
# Should see: [MCP Server] Contaboo MCP Server started
```

### Test with Node
```bash
cd /home/xinreal/bitna/mcp-server
node quick-test.js
# Should see: ✨ MCP Server is WORKING!
```

## Troubleshooting

### Check Logs
If MCP server doesn't connect in Claude Desktop, check the logs:

**Windows:**
```
C:\Users\Ahmed Fathy\AppData\Roaming\Claude\logs\mcp-server-bitna-crm.log
```

**Common Issues:**

1. **"No such file or directory"**
   - Make sure the startup script exists and is executable
   - Run: `chmod +x /home/xinreal/bitna/mcp-server/start-mcp.sh`

2. **"Database connection failed"**
   - Verify MariaDB is running
   - Check database credentials in .env file
   - Test: `mysql -u root -pzerocall -e "USE contaboo; SELECT COUNT(*) FROM properties;"`

3. **"Server disconnected"**
   - Check if Node.js is installed in WSL
   - Rebuild the server: `cd /home/xinreal/bitna/mcp-server && npm run build`

4. **"Module not found"**
   - Reinstall dependencies: `cd /home/xinreal/bitna/mcp-server && npm install`

### View Real-Time Logs
```bash
# In WSL terminal
tail -f "/mnt/c/Users/Ahmed Fathy/AppData/Roaming/Claude/logs/mcp-server-bitna-crm.log"
```

## Database Connection

The MCP server connects to:
- **Host:** localhost
- **Port:** 3306
- **Database:** contaboo
- **User:** root
- **Password:** zerocall

**Data Available:**
- 12,398 Properties
- Multiple Leads
- Active Users
- Activities & Tasks

## What Changed

1. ✅ Fixed module system: CommonJS → ES Modules
2. ✅ Created startup script: `start-mcp.sh`
3. ✅ Updated Claude Desktop config with correct path
4. ✅ Updated database connection: `contaboo_mcp` → `contaboo`
5. ✅ Added `.js` extensions to imports for ES modules

## Example Usage in Claude Desktop

Once connected, you can ask Claude:

- "Show me the latest properties for sale"
- "How many properties do we have in total?"
- "List all leads from the last week"
- "What regions are available for properties?"
- "Give me statistics about our CRM data"

The MCP server will query your database and return real data!

## Next Steps

1. ✅ Configuration complete
2. ⏳ **Restart Claude Desktop** (important!)
3. ⏳ Test by asking Claude about your CRM data
4. ⏳ Monitor logs if you encounter issues

---

**Setup Date:** October 29, 2025  
**Status:** ✅ READY TO USE  
**Database:** contaboo (12,398 properties)  
**MCP Tools:** 6 available
