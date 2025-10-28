# MCP Server Troubleshooting Guide

## Current Configuration Status
- ✅ Claude Desktop config updated
- ✅ MCP server scripts created
- ✅ WSL Python environment working

## Configuration Details
**Config File Location:** `C:\Users\Ahmed Fathy\AppData\Roaming\Claude\claude_desktop_config.json`

**Current Configuration:**
```json
{
  "mcpServers": {
    "real-estate-crm": {
      "command": "wsl.exe",
      "args": [
        "-e",
        "/home/xinreal/real_crm/.venv/Scripts/python.exe",
        "/home/xinreal/real_crm/scripts/mcp_server.py"
      ],
      "env": {
        "DJANGO_SETTINGS_MODULE": "real_estate_crm.settings",
        "PYTHONPATH": "/home/xinreal/real_crm"
      }
    }
  }
}
```

## Testing Steps

### 1. Test WSL Command Manually
Open Command Prompt (Windows) and run:
```cmd
wsl.exe -e /home/xinreal/real_crm/.venv/Scripts/python.exe /home/xinreal/real_crm/scripts/mcp_server.py
```

**Expected Result:** Should show MCP server startup message and wait for JSON-RPC input.
**To Exit:** Press Ctrl+C

### 2. Test WSL Python Environment
```cmd
wsl.exe -e /home/xinreal/real_crm/.venv/Scripts/python.exe --version
```
**Expected Result:** Should show `Python 3.11.9`

### 3. Test Django Setup
```cmd
wsl.exe -e /home/xinreal/real_crm/.venv/Scripts/python.exe /home/xinreal/real_crm/manage.py check
```
**Expected Result:** Should show Django system check results

## Alternative Configuration (If Main Config Doesn't Work)

### Option A: Using Batch File
```json
{
  "mcpServers": {
    "real-estate-crm": {
      "command": "C:\\Users\\Ahmed Fathy\\run_mcp_server.bat",
      "args": [],
      "env": {}
    }
  }
}
```

### Option B: Using PowerShell
```json
{
  "mcpServers": {
    "real-estate-crm": {
      "command": "powershell.exe",
      "args": [
        "-ExecutionPolicy", "Bypass",
        "-File", "\\\\wsl.localhost\\Ubuntu\\home\\xinreal\\real_crm\\run_mcp_server.ps1"
      ],
      "env": {}
    }
  }
}
```

## Common Issues and Solutions

### Issue: "Command not found" or "Path not found"
**Solution:** Make sure WSL is properly installed and accessible from Command Prompt

### Issue: "Python module not found"
**Solution:** Check that the virtual environment is activated in WSL:
```bash
source /home/xinreal/real_crm/.venv/bin/activate  # Note: use /bin/activate, not /Scripts/activate
```

### Issue: "Django settings not found"
**Solution:** Ensure the DJANGO_SETTINGS_MODULE environment variable is set correctly

## Claude Desktop Restart
After any configuration changes:
1. **Completely close Claude Desktop** (check system tray)
2. **Wait 5 seconds**
3. **Reopen Claude Desktop**
4. **Test the connection** by asking: "Can you list my project files?"

## Log Files to Check
If issues persist, check these log files:
- `C:\Users\Ahmed Fathy\AppData\Roaming\Claude\logs\mcp.log`
- `C:\Users\Ahmed Fathy\AppData\Roaming\Claude\logs\mcp-server-real-estate-crm.log`

## Success Indicators
✅ MCP server appears in Claude Desktop settings
✅ No error messages in logs
✅ Claude can respond to: "Show me my Django project structure"
✅ Claude can run: "List the models in my Django project"

## Quick Test Commands for Claude Desktop
Once connected, try these commands:
1. "Can you list the files in my Django CRM project?"
2. "Show me the Django models in my authentication app"
3. "Run a Django management command to check the project status"
4. "What database tables exist in my CRM?"