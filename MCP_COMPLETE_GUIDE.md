# 🚀 MCP Server Setup & Connection Guide

## 📋 Overview

This guide will help you:
1. ✅ Set up the MCP (Model Context Protocol) server
2. ✅ Connect it to your local MariaDB database
3. ✅ Integrate it with Claude Desktop

---

## 🎯 Quick Start (3 Steps)

### Step 1: Setup Database

```bash
cd /home/xinreal/bitna

# Make scripts executable
chmod +x setup-database.sh start-mcp.sh

# Run database setup
./setup-database.sh
```

### Step 2: Configure & Start MCP Server

```bash
cd /home/xinreal/bitna/mcp-server

# Install dependencies (if needed)
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Build TypeScript
npm run build

# Start the server (test)
node dist/index.js
```

If you see this output, it's working:
```
[MCP Server] Contaboo MCP Server started
[MCP Server] Database health: {"status":"connected","message":"Database connection successful"}
```

Press `Ctrl+C` to stop.

### Step 3: Configure Claude Desktop

1. **Open Claude Desktop config file:**
   - Windows: Press `Win + R`, type `%APPDATA%\Claude`, press Enter
   - Open `claude_desktop_config.json` in a text editor

2. **Replace contents with:**
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

3. **Restart Claude Desktop:**
   - Quit completely (right-click system tray icon → Quit)
   - Start Claude Desktop again
   - Wait 10-15 seconds

4. **Test in Claude:**
   ```
   What MCP tools do you have?
   ```

---

## 📁 Project Structure

```
/home/xinreal/bitna/
├── mcp-server/              # MCP Server directory
│   ├── src/                 # TypeScript source files
│   │   ├── index.ts         # Main server file
│   │   └── config/
│   │       └── database.ts  # Database connection
│   ├── dist/                # Compiled JavaScript (generated)
│   ├── prisma/              # Prisma ORM files
│   │   └── schema.prisma    # Database schema
│   ├── .env                 # Environment variables
│   ├── package.json         # Dependencies
│   └── tsconfig.json        # TypeScript config
├── start-mcp.sh            # Startup script ⭐
├── setup-database.sh       # Database setup script ⭐
├── START_MCP_SERVER.md     # Detailed startup guide
└── CLAUDE_DESKTOP_CONFIG.md # Claude Desktop config guide
```

---

## 🔧 Available MCP Tools

Once connected, Claude will have access to these tools:

### 1. get_properties
Retrieve properties from database with filters:
- `limit` - Number of properties to return (default: 10)
- `offset` - Pagination offset (default: 0)
- `status` - Filter by status (ACTIVE, SOLD, RENTED, PENDING)
- `type` - Filter by property type
- `region` - Filter by region
- `minPrice` / `maxPrice` - Price range filters

**Example:**
```
Show me the first 5 active properties
```

### 2. get_leads
Retrieve leads with filters:
- `limit` / `offset` - Pagination
- `status` - Lead status (NEW, CONTACTED, QUALIFIED, etc.)
- `source` - Lead source (WEBSITE, REFERRAL, etc.)
- `assignedTo` - Filter by assigned user

**Example:**
```
Get all new leads from today
```

### 3. get_users
Retrieve users with filters:
- `limit` / `offset` - Pagination
- `role` - User role (OWNER, MANAGER, SALES_AGENT, etc.)
- `status` - User status (ACTIVE, INACTIVE, SUSPENDED)

**Example:**
```
Show me all active sales agents
```

### 4. get_activities
Retrieve activities with filters:
- `limit` / `offset` - Pagination
- `type` - Activity type (TASK, NOTE, MEETING)
- `status` - Status (PENDING, COMPLETED, CANCELLED)
- `priority` - Priority level (LOW, MEDIUM, HIGH)
- `assignedTo` - Filter by user

**Example:**
```
Get all high priority pending tasks
```

### 5. get_stats
Get dashboard statistics:
- Total properties count
- Total leads count
- Total active users count
- Recent activities (last 7 days)

**Example:**
```
Show me the database statistics
```

### 6. get_static_data
Get dropdown options for:
- `property_types` - All property types
- `regions` - All regions
- `categories` - Property categories
- `statuses` - Property statuses
- `amenities` - Available amenities

**Example:**
```
Get all available property types
```

---

## 🗄️ Database Configuration

### Current Configuration

```
Host: localhost
Port: 3306
User: root
Password: zerocall
Database: contaboo_mcp
```

### Changing Database Name

If you want to use your existing `bitna` database instead:

1. **Update `.env` file:**
   ```bash
   nano /home/xinreal/bitna/mcp-server/.env
   
   # Change:
   DATABASE_URL="mysql://root:zerocall@localhost:3306/bitna"
   ```

2. **Update Claude Desktop config:**
   ```json
   "DATABASE_URL": "mysql://root:zerocall@localhost:3306/bitna"
   ```

3. **Restart MCP server and Claude Desktop**

### Database Tables

The MCP server works with these main tables:
- `properties` - Property listings
- `leads` - Lead information
- `users` - User accounts
- `activities` - Tasks, notes, meetings
- `tenants` - Company/tenant data
- `property_types`, `regions`, `property_categories`, etc. - Static data

---

## 🔍 Troubleshooting

### Issue: "Database connection failed"

**Solutions:**
```bash
# Check if MariaDB is running
sudo systemctl status mariadb

# Start MariaDB
sudo systemctl start mariadb

# Enable MariaDB to start on boot
sudo systemctl enable mariadb

# Test connection manually
mysql -u root -p -h localhost -P 3306
```

### Issue: "Command not found" in Claude Desktop

**Solution:** Use full node path:
```bash
# Find node location
which node

# Update Claude config with full path:
"args": ["/usr/bin/node", "/home/xinreal/bitna/mcp-server/dist/index.js"]
```

### Issue: "Cannot connect to database from Claude"

**Solutions:**
1. **Use WSL IP instead of localhost:**
   ```bash
   # Get WSL IP
   hostname -I
   # Example output: 172.24.144.144
   
   # Update .env:
   DATABASE_URL="mysql://root:zerocall@172.24.144.144:3306/contaboo_mcp"
   ```

2. **Configure MariaDB to listen on all interfaces:**
   ```bash
   sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
   
   # Change:
   bind-address = 0.0.0.0
   
   # Restart MariaDB:
   sudo systemctl restart mariadb
   ```

### Issue: "Prisma Client not generated"

**Solution:**
```bash
cd /home/xinreal/bitna/mcp-server
npx prisma generate
```

### Issue: "Build failed"

**Solution:**
```bash
cd /home/xinreal/bitna/mcp-server

# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Issue: "Permission denied"

**Solution:**
```bash
# Make scripts executable
chmod +x /home/xinreal/bitna/start-mcp.sh
chmod +x /home/xinreal/bitna/setup-database.sh

# Fix ownership if needed
sudo chown -R $USER:$USER /home/xinreal/bitna/
```

---

## 📊 Monitoring & Logs

### MCP Server Logs

```bash
# Real-time logs
cd /home/xinreal/bitna/mcp-server
node dist/index.js 2> mcp-server.log &

# View logs
tail -f mcp-server.log
```

### MariaDB Logs

```bash
# Error log
sudo tail -f /var/log/mysql/error.log

# General query log (if enabled)
sudo tail -f /var/log/mysql/mysql.log
```

### Claude Desktop Logs

Windows: `%APPDATA%\Claude\logs\`

Look for files like:
- `mcp.log`
- `mcp-server-bitna-crm.log`

---

## ⚡ Quick Commands

```bash
# Start MCP server
cd /home/xinreal/bitna && ./start-mcp.sh

# Stop MCP server
pkill -f "node.*mcp-server"

# Check if server is running
ps aux | grep mcp-server

# Test database connection
mysql -u root -pzerocall -e "USE contaboo_mcp; SELECT COUNT(*) FROM properties;"

# Rebuild everything
cd /home/xinreal/bitna/mcp-server
npm run build
npx prisma generate
npx prisma db push

# Check MariaDB status
sudo systemctl status mariadb

# Restart MariaDB
sudo systemctl restart mariadb
```

---

## 🎓 Usage Examples

Once connected to Claude Desktop, try these:

### Example 1: Get Statistics
```
Use get_stats to show me an overview of the database
```

### Example 2: Search Properties
```
Show me the top 10 most expensive properties for sale
```

### Example 3: View Leads
```
Get all new leads that haven't been contacted yet
```

### Example 4: Check Activities
```
Show me all high priority tasks that are pending
```

### Example 5: Get Static Data
```
What property types are available in the system?
```

### Example 6: Complex Query
```
Show me active apartment listings in Cairo with a price range of 1-3 million EGP
```

---

## 🔐 Security Notes

1. **Database Credentials**: Currently using default credentials. For production:
   ```sql
   CREATE USER 'mcp_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON contaboo_mcp.* TO 'mcp_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Environment Variables**: Never commit `.env` file to git

3. **Network Security**: If using WSL IP, consider firewall rules

---

## 📝 Maintenance

### Regular Tasks

1. **Backup Database:**
   ```bash
   mysqldump -u root -p contaboo_mcp > backup_$(date +%Y%m%d).sql
   ```

2. **Update Dependencies:**
   ```bash
   cd /home/xinreal/bitna/mcp-server
   npm update
   ```

3. **Check Logs:**
   ```bash
   tail -100 /home/xinreal/bitna/mcp-server/mcp-server.log
   ```

---

## 🆘 Getting Help

If you encounter issues not covered here:

1. Check detailed guides:
   - `START_MCP_SERVER.md` - Comprehensive startup guide
   - `CLAUDE_DESKTOP_CONFIG.md` - Detailed config guide

2. Verify setup:
   ```bash
   # Run diagnostic
   cd /home/xinreal/bitna/mcp-server
   node -e "const db = require('./dist/config/database.js'); db.checkDatabaseConnection().then(console.log);"
   ```

3. Check all components:
   - [ ] WSL Ubuntu is running
   - [ ] MariaDB is running
   - [ ] Node.js is installed (v18+)
   - [ ] MCP server builds without errors
   - [ ] Database connection works
   - [ ] Claude Desktop config is valid JSON
   - [ ] Claude Desktop has been restarted

---

## ✅ Success Checklist

Your MCP server is working correctly when:

- ✅ `./start-mcp.sh` runs without errors
- ✅ You see "Database connection successful" message
- ✅ Claude Desktop shows MCP tools available
- ✅ You can successfully call `get_stats` and get results
- ✅ No errors in Claude Desktop logs
- ✅ All 6 tools (get_properties, get_leads, etc.) are available

---

## 📚 Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MariaDB Documentation](https://mariadb.com/kb/en/documentation/)

---

**Last Updated:** October 29, 2025
**Version:** 1.0.0
