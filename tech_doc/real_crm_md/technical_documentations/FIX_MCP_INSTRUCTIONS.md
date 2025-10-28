# 🔧 MCP Server Fix Instructions

## Your MCP Server is Not Working - Here's How to Fix It

### The Problem

Your MCP server configuration in `.vscode/mcp.json` is for VS Code, but Claude Desktop needs a different configuration file in a different location.

---

## ✅ Quick Fix (Recommended)

Run this single command to automatically fix everything:

```bash
cd /Users/ahmedgomaa/Downloads/real_crm
chmod +x quick_fix.sh
./quick_fix.sh
```

This will:
- ✅ Create/verify virtual environment
- ✅ Install all dependencies
- ✅ Configure Claude Desktop properly
- ✅ Test the server
- ✅ Give you next steps

Then:
1. **Completely quit Claude Desktop** (Cmd+Q)
2. **Reopen Claude Desktop**
3. **Look for the 🔌 icon** - you should see "django-real-crm"

---

## 🔍 Diagnose Issues

If you want to see what's wrong first:

```bash
cd /Users/ahmedgomaa/Downloads/real_crm
chmod +x diagnose_mcp.sh
./diagnose_mcp.sh
```

This will test 19 different things and tell you exactly what's broken.

---

## 🛠️ Manual Fix Steps

If you prefer to fix things manually:

### Step 1: Install Dependencies

```bash
cd /Users/ahmedgomaa/Downloads/real_crm

# Create virtual environment if missing
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install fastmcp mcp mysql-connector-python django
```

### Step 2: Configure Claude Desktop

```bash
# Run the setup script
chmod +x setup_claude_mcp.sh
./setup_claude_mcp.sh
```

Or manually create the config file:

```bash
# Create directory
mkdir -p ~/Library/Application\ Support/Claude

# Create config file
cat > ~/Library/Application\ Support/Claude/claude_desktop_config.json << 'EOF'
{
  "mcpServers": {
    "django-real-crm": {
      "command": "/Users/ahmedgomaa/Downloads/real_crm/venv/bin/python",
      "args": [
        "/Users/ahmedgomaa/Downloads/real_crm/mcp_server.py"
      ],
      "env": {
        "PYTHONUNBUFFERED": "1"
      }
    }
  }
}
EOF
```

### Step 3: Restart Claude Desktop

1. **Completely quit** Claude Desktop (Cmd+Q, not just close the window)
2. **Reopen** Claude Desktop
3. Look for the **🔌 hammer icon**
4. You should see **"django-real-crm"** listed

---

## 🧪 Test the Server Manually

To test if the server works outside of Claude Desktop:

```bash
cd /Users/ahmedgomaa/Downloads/real_crm
chmod +x test_mcp_manual.sh
./test_mcp_manual.sh
```

You should see a startup banner with available tools. Press Ctrl+C to stop.

---

## 📋 Available Scripts

After running the fix, you'll have these scripts:

| Script | Purpose |
|--------|---------|
| `quick_fix.sh` | Automatically fix all issues ⭐ |
| `diagnose_mcp.sh` | Run diagnostic tests |
| `setup_claude_mcp.sh` | Setup Claude Desktop config |
| `test_mcp_manual.sh` | Test server manually |
| `start_mcp_server.sh` | Start the server in terminal |

---

## 🎯 What Should Happen in Claude Desktop

After fixing and restarting Claude Desktop:

1. **Icon Appears**: You'll see a 🔌 hammer/tools icon in the interface
2. **Server Listed**: Clicking it shows "django-real-crm" server
3. **Status**: Should show as "Connected" with a green indicator
4. **Tools Available**: 6 tools should be listed:
   - read_file
   - write_file
   - run_manage
   - db_query
   - list_project_files
   - get_project_info

---

## 🐛 Common Issues

### Issue 1: "No such file or directory: python"
**Fix**: Virtual environment not created or corrupted
```bash
cd /Users/ahmedgomaa/Downloads/real_crm
rm -rf venv
python3 -m venv venv
./venv/bin/pip install fastmcp mcp mysql-connector-python django
```

### Issue 2: "Module 'fastmcp' not found"
**Fix**: Dependencies not installed
```bash
cd /Users/ahmedgomaa/Downloads/real_crm
./venv/bin/pip install fastmcp mcp mysql-connector-python django
```

### Issue 3: "Database connection failed"
**Fix**: Check database credentials in `mcp_server.py`

1. Open `mcp_server.py`
2. Find the `DB_CONFIG` section (around line 37)
3. Verify these match your database:
```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'zerocall',
    'database': 'django_db_real_crm',
    'port': 3306
}
```

### Issue 4: "Server not showing in Claude Desktop"
**Fix**: Configuration file in wrong location or format
```bash
# Check if config exists
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# If not, run setup
./setup_claude_mcp.sh

# Then COMPLETELY restart Claude Desktop (Cmd+Q and reopen)
```

### Issue 5: "Django setup failed"
**Fix**: Django settings not found
```bash
cd /Users/ahmedgomaa/Downloads/real_crm
./venv/bin/python manage.py check
```

---

## 📖 Understanding the Setup

### Why Two Config Files?

1. **`.vscode/mcp.json`** - For VS Code editor integration (not Claude Desktop)
2. **`~/Library/Application Support/Claude/claude_desktop_config.json`** - For Claude Desktop app

You need the second one for Claude Desktop to work!

### How MCP Works

```
┌─────────────────┐
│ Claude Desktop  │  (The app you're using)
└────────┬────────┘
         │ Reads config from:
         │ ~/Library/Application Support/Claude/
         │     claude_desktop_config.json
         │
         │ Starts server using:
┌────────▼────────┐
│  Python         │  /Users/ahmedgomaa/Downloads/
│  mcp_server.py  │      real_crm/venv/bin/python
└────────┬────────┘
         │ Connects to:
    ┌────┴─────┐
    │          │
┌───▼───┐  ┌───▼──────┐
│Files  │  │ MariaDB  │
└───────┘  └──────────┘
```

---

## ✅ Verification Checklist

After running the fix, verify these:

- [ ] Virtual environment exists: `ls -la /Users/ahmedgomaa/Downloads/real_crm/venv`
- [ ] Dependencies installed: `./venv/bin/pip list | grep fastmcp`
- [ ] Config file exists: `cat ~/Library/Application\ Support/Claude/claude_desktop_config.json`
- [ ] Server starts: `./test_mcp_manual.sh` (should show startup banner)
- [ ] Claude Desktop restarted: Completely quit (Cmd+Q) and reopened
- [ ] Server visible: 🔌 icon appears in Claude Desktop
- [ ] Server connected: Shows "Connected" status

---

## 🎓 Testing Your Server

Once connected in Claude Desktop, try asking:

```
Can you use the get_project_info tool to show me information about my Django project?
```

Or:

```
Use list_project_files to show me what's in my project root directory.
```

Or:

```
Run db_query('SHOW TABLES;') to show me all database tables.
```

---

## 📚 Additional Resources

- **Detailed Troubleshooting**: Read `MCP_TROUBLESHOOTING.md`
- **Server Documentation**: Read `MCP_SERVER_README.md`
- **Run Diagnostics**: `./diagnose_mcp.sh`
- **Test Manually**: `./test_mcp_manual.sh`

---

## 🆘 Still Not Working?

1. **Run full diagnostics**:
   ```bash
   ./diagnose_mcp.sh
   ```

2. **Check Claude Desktop logs**:
   - Open Claude Desktop
   - Go to menu: Help → View Logs
   - Look for MCP-related errors

3. **Try a clean installation**:
   ```bash
   cd /Users/ahmedgomaa/Downloads/real_crm
   rm -rf venv
   rm ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ./quick_fix.sh
   ```

4. **Verify your system**:
   - macOS: Check this is the correct path for Claude config
   - Python 3.8+: `python3 --version`
   - MySQL running: `pgrep mysqld` or `pgrep mariadbd`

---

## 🎉 Success Indicators

You'll know it's working when:

✅ The `quick_fix.sh` script completes without errors  
✅ The `diagnose_mcp.sh` shows all tests passing  
✅ Claude Desktop shows the 🔌 icon  
✅ "django-real-crm" appears in the server list  
✅ Server status shows as "Connected" (green)  
✅ Claude can successfully call tools like `get_project_info()`  

---

## 💡 Pro Tips

1. **Always completely restart Claude Desktop** (Cmd+Q, not just close window)
2. **Check logs first** when things don't work
3. **Test server manually** with `./test_mcp_manual.sh` before blaming Claude
4. **Run diagnostics** with `./diagnose_mcp.sh` to pinpoint issues
5. **Keep dependencies updated**: `./venv/bin/pip install --upgrade fastmcp mcp`

---

**Created**: October 17, 2025  
**Project**: real_crm Django + MariaDB  
**Server**: django-real-crm MCP Server
