# Claude Desktop Configuration for WSL Ubuntu MCP Server

## Quick Setup

### Step 1: Locate Claude Desktop Config File

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```
Full path usually: `C:\Users\YourUsername\AppData\Roaming\Claude\claude_desktop_config.json`

**To open in Windows Explorer:**
1. Press `Win + R`
2. Type: `%APPDATA%\Claude`
3. Press Enter
4. Open `claude_desktop_config.json` in a text editor

### Step 2: Update Configuration

Replace the entire contents with one of the configurations below:

---

## Configuration Option 1: Standard WSL Setup (Recommended)

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

---

## Configuration Option 2: Using Full Node.js Path in WSL

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

---

## Configuration Option 3: Specific WSL Distribution

If you have multiple WSL distributions:

```json
{
  "mcpServers": {
    "bitna-crm": {
      "command": "wsl",
      "args": [
        "-d",
        "Ubuntu",
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

---

## Configuration Option 4: Using Bash Script

```json
{
  "mcpServers": {
    "bitna-crm": {
      "command": "wsl",
      "args": [
        "bash",
        "/home/xinreal/bitna/start-mcp.sh"
      ],
      "env": {
        "DATABASE_URL": "mysql://root:zerocall@localhost:3306/contaboo_mcp",
        "NODE_ENV": "development"
      }
    }
  }
}
```

---

## Important Notes

### Database URL Options

**Option A: Using contaboo_mcp database (default)**
```json
"DATABASE_URL": "mysql://root:zerocall@localhost:3306/contaboo_mcp"
```

**Option B: Using existing bitna database**
```json
"DATABASE_URL": "mysql://root:zerocall@localhost:3306/bitna"
```

**Option C: Using WSL IP (if localhost doesn't work)**
```json
"DATABASE_URL": "mysql://root:zerocall@172.x.x.x:3306/contaboo_mcp"
```

To find your WSL IP:
```bash
wsl hostname -I
```

### Common Issues and Solutions

#### Issue 1: "Command not found" error

**Solution:** Specify full path to node
```bash
# Find node path in WSL
wsl which node

# Update config with full path
"command": "wsl",
"args": ["/usr/bin/node", "/home/xinreal/bitna/mcp-server/dist/index.js"]
```

#### Issue 2: Database connection refused

**Solutions:**
1. Use WSL IP instead of localhost
2. Check if MariaDB is running: `wsl sudo systemctl status mariadb`
3. Verify MariaDB is listening on all interfaces in `/etc/mysql/mariadb.conf.d/50-server.cnf`:
   ```
   bind-address = 0.0.0.0
   ```

#### Issue 3: Permission denied

**Solution:** Make scripts executable
```bash
wsl chmod +x /home/xinreal/bitna/start-mcp.sh
wsl chmod +x /home/xinreal/bitna/setup-database.sh
```

#### Issue 4: Claude Desktop doesn't recognize the server

**Solutions:**
1. Verify JSON syntax is valid (no trailing commas, proper quotes)
2. Completely quit Claude Desktop (right-click system tray icon → Quit)
3. Restart Claude Desktop
4. Check Claude Desktop logs

### Claude Desktop Log Locations

**Windows:**
```
%APPDATA%\Claude\logs\
```

Check `mcp.log` or `mcp-server-bitna-crm.log` for errors

---

## Testing the Connection

### Step 1: Restart Claude Desktop

1. Completely quit Claude Desktop
2. Restart the application
3. Wait 10-15 seconds for MCP server to initialize

### Step 2: Verify in Claude

Open a new conversation in Claude and try:

```
What MCP tools do you have available?
```

You should see these tools listed:
- get_properties
- get_leads  
- get_users
- get_activities
- get_stats
- get_static_data

### Step 3: Test a Tool

```
Use get_stats to show me the database statistics
```

Expected response should include:
- Total properties count
- Total leads count
- Total active users count
- Recent activities count

---

## Advanced Configuration

### Multiple MCP Servers

You can configure multiple MCP servers:

```json
{
  "mcpServers": {
    "bitna-crm": {
      "command": "wsl",
      "args": ["node", "/home/xinreal/bitna/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "mysql://root:zerocall@localhost:3306/contaboo_mcp"
      }
    },
    "another-server": {
      "command": "node",
      "args": ["C:\\path\\to\\another-server\\index.js"]
    }
  }
}
```

### Debug Mode

Enable debug logging:

```json
{
  "mcpServers": {
    "bitna-crm": {
      "command": "wsl",
      "args": ["node", "/home/xinreal/bitna/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "mysql://root:zerocall@localhost:3306/contaboo_mcp",
        "NODE_ENV": "development",
        "DEBUG": "*"
      }
    }
  }
}
```

---

## Verification Checklist

Before reporting issues, verify:

- [ ] WSL Ubuntu is installed and working
- [ ] Node.js is installed in WSL: `wsl node --version`
- [ ] MariaDB is running: `wsl sudo systemctl status mariadb`
- [ ] Database exists: `wsl mysql -u root -p -e "SHOW DATABASES;"`
- [ ] MCP server builds successfully: `wsl cd /home/xinreal/bitna/mcp-server && npm run build`
- [ ] MCP server starts manually: `wsl node /home/xinreal/bitna/mcp-server/dist/index.js`
- [ ] Claude Desktop config JSON is valid
- [ ] Claude Desktop has been completely restarted
- [ ] No other process is using port 3306

---

## Getting Help

If you encounter issues:

1. **Check MCP Server Logs:**
   ```bash
   wsl tail -f /home/xinreal/bitna/mcp-server/mcp-server.log
   ```

2. **Check MariaDB Logs:**
   ```bash
   wsl sudo tail -f /var/log/mysql/error.log
   ```

3. **Test Database Connection:**
   ```bash
   wsl mysql -u root -p -h localhost -P 3306 -e "USE contaboo_mcp; SELECT 1;"
   ```

4. **Check Claude Desktop Logs:**
   - Open `%APPDATA%\Claude\logs\`
   - Look for recent error messages

5. **Verify WSL Networking:**
   ```bash
   # From Windows Command Prompt
   wsl hostname -I
   ping <WSL_IP>
   ```

---

## Success Indicators

✅ **Server is working when:**
- Claude Desktop shows MCP tools in the interface
- You can successfully call `get_stats` and receive data
- No error messages in Claude Desktop logs
- MCP server logs show "Database connection successful"

---

## Quick Commands Reference

```bash
# Start MCP server manually
wsl node /home/xinreal/bitna/mcp-server/dist/index.js

# Check if running
wsl ps aux | grep node

# Stop MCP server
wsl pkill -f "node.*mcp-server"

# Rebuild MCP server
wsl bash -c "cd /home/xinreal/bitna/mcp-server && npm run build"

# Test database
wsl mysql -u root -pzerocall -e "SHOW DATABASES;"

# Check Node.js path
wsl which node

# Check MariaDB status
wsl sudo systemctl status mariadb
```
