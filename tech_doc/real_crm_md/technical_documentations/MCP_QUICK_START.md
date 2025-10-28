# 🚀 MCP Server Quick Start Guide

## ✅ Status: FIXED & WORKING

Both VS Code and Claude Desktop MCP servers are now configured and operational.

---

## 🔧 Configuration Files

### 1. Claude Desktop (macOS)
**Location:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "django-mcp": {
      "command": "/Users/ahmedgomaa/Downloads/real_crm/venv/bin/python",
      "args": [
        "/Users/ahmedgomaa/Downloads/real_crm/scripts/mcp_server.py"
      ],
      "env": {
        "DJANGO_SETTINGS_MODULE": "real_estate_crm.settings",
        "PYTHONPATH": "/Users/ahmedgomaa/Downloads/real_crm"
      }
    }
  }
}
```

### 2. VS Code
**Location:** `.vscode/mcp.json`

```json
{
  "servers": {
    "django-mcp": {
      "command": "/Users/ahmedgomaa/Downloads/real_crm/venv/bin/python",
      "args": [
        "/Users/ahmedgomaa/Downloads/real_crm/scripts/mcp_server.py"
      ],
      "type": "stdio"
    }
  }
}
```

---

## 🎯 Quick Commands

### Start/Stop MCP Server (VS Code)
```bash
# Start
Task: "Start MCP Server"

# Stop
Task: "Stop MCP Server"
```

### Test MCP Server Manually
```bash
cd /Users/ahmedgomaa/Downloads/real_crm
./venv/bin/python scripts/mcp_server.py
```

### View Logs
```bash
# Claude Desktop logs
tail -f ~/Library/Logs/Claude/mcp-server-django-mcp.log

# Check for errors
tail -20 ~/Library/Logs/Claude/mcp.log | grep error
```

---

## 📋 Available MCP Tools

| Tool | Description | Example |
|------|-------------|---------|
| `read_file` | Read project files | `read_file("properties/models.py")` |
| `write_file` | Create/update files | `write_file("test.py", "print('hello')")` |
| `list_project_files` | List directory | `list_project_files("authentication")` |
| `db_query` | SQL queries | `db_query("SELECT COUNT(*) FROM leads_lead")` |
| `run_manage` | Django commands | `run_manage("showmigrations")` |
| `get_project_info` | Project info | `get_project_info()` |

---

## 🔍 Verify Setup

### Quick Test (Claude Desktop)
1. Restart Claude Desktop
2. Ask: "What Django apps are installed?"
3. Should list: authentication, leads, properties, etc.

### Quick Test (VS Code)
1. Open Command Palette (Cmd+Shift+P)
2. Run MCP command
3. Check connection status

---

## 🐛 Troubleshooting

### Issue: "spawn python ENOENT"
**Fix:** Use full Python path, not just `python`
```json
"command": "/Users/ahmedgomaa/Downloads/real_crm/venv/bin/python"
```

### Issue: "Could not connect to MCP server"
**Fix:** Check script path is correct
```bash
ls -la /Users/ahmedgomaa/Downloads/real_crm/scripts/mcp_server.py
```

### Issue: "Module not found"
**Fix:** Add PYTHONPATH to env
```json
"env": {
  "PYTHONPATH": "/Users/ahmedgomaa/Downloads/real_crm"
}
```

---

## 📊 Database Statistics (Verified via MCP)

- **Total Properties:** 11,949
- **Total Leads:** 666
- **Residential Properties:** 9
- **Commercial Properties:** 516 (Retail)
- **Office Properties:** 0

---

## 🔐 Security Features

✅ File access restricted to project directory  
✅ Destructive SQL requires explicit permission  
✅ Dangerous Django commands blocked  
✅ All operations logged  

---

## 📚 Documentation Files

1. `technical_documentations/MCP_SERVER_SETUP.md` - Full setup guide
2. `technical_documentations/MCP_CLAUDE_DESKTOP_FIX.md` - Troubleshooting guide
3. `technical_documentations/claude_desktop_config.json` - Config template

---

## ✨ What Was Fixed

**October 19, 2025 - 5:35 AM**

| Component | Issue | Solution |
|-----------|-------|----------|
| Claude Desktop | `spawn python ENOENT` | Use full Python path |
| Both | Wrong script path | Fixed to `/scripts/mcp_server.py` |
| MCP Server | Wrong PROJECT_DIR | Fixed to use `parent.parent` |
| Environment | Missing PYTHONPATH | Added to configs |

---

## 🎉 Current Status

| Platform | Status | Tools Available |
|----------|--------|----------------|
| **VS Code** | 🟢 Working | 6 tools |
| **Claude Desktop** | 🟢 Working | 6 tools |
| **Database** | 🟢 Connected | MariaDB |
| **Django** | 🟢 Operational | v5.2.6 |

---

## 🚀 Ready to Use!

The MCP server is now fully operational in both VS Code and Claude Desktop. You can:

✅ Query the database  
✅ Read and modify project files  
✅ Run Django management commands  
✅ Get project information  
✅ List directories  

**No further configuration needed!**

---

**Last Updated:** October 19, 2025  
**Version:** 1.0.0  
**Status:** 🟢 **PRODUCTION READY**
