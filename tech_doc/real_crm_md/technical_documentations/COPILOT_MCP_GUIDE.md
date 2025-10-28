# 🎯 GitHub Copilot MCP Setup Guide

## ✅ Configuration Complete!

Your VSCode is now configured to use MCP with GitHub Copilot!

---

## 📋 What Was Configured

### File: `.vscode/mcp.json`
```json
{
  "servers": {
    "django-mcp": {
      "command": "python",
      "args": ["/Users/ahmedgomaa/Downloads/real_crm/mcp_server.py"],
      "type": "stdio"
    }
  }
}
```

This tells VSCode/Copilot to:
- Run the MCP server using Python
- Use stdio transport (standard input/output)
- Make 6 tools available to Copilot

---

## 🚀 How to Use MCP with GitHub Copilot

### Step 1: Reload VSCode Window
1. Press `Cmd+Shift+P` (or `Ctrl+Shift+P`)
2. Type: "Reload Window"
3. Select: "Developer: Reload Window"

### Step 2: Open Copilot Chat
1. Click the Copilot icon in the sidebar
2. Or press `Cmd+I` (or `Ctrl+I`)

### Step 3: Ask Copilot to Use MCP Tools

Now you can ask Copilot things like:

**Example 1: Read a file**
```
@workspace Can you read the leads/models.py file using MCP?
```

**Example 2: Check database**
```
@workspace Show me all database tables using db_query
```

**Example 3: Run Django command**
```
@workspace Run showmigrations using the MCP server
```

**Example 4: List files**
```
@workspace List all files in the leads directory
```

**Example 5: Get project info**
```
@workspace Get the Django project information
```

---

## 🛠️ Available MCP Tools

When you ask Copilot, it can now use these tools:

| Tool | What It Does | Example Ask |
|------|--------------|-------------|
| `read_file(path)` | Read any project file | "Read leads/models.py" |
| `write_file(path, content)` | Create/update files | "Create a new test file" |
| `run_manage(command)` | Run Django commands | "Show migrations status" |
| `db_query(sql)` | Query database | "Show all database tables" |
| `list_project_files(dir)` | List directory contents | "List files in leads folder" |
| `get_project_info()` | Get project details | "Show project information" |

---

## 💬 Example Conversations with Copilot

### Example 1: Explore Database
**You**: "Using MCP, show me all tables in the database"

**Copilot will**:
- Use `db_query("SHOW TABLES;")`
- Return the list of 58 tables

### Example 2: Check Migrations
**You**: "What's the migration status for the leads app?"

**Copilot will**:
- Use `run_manage("showmigrations leads")`
- Show you all migrations

### Example 3: Read Model
**You**: "Show me the Lead model definition"

**Copilot will**:
- Use `read_file("leads/models.py")`
- Display the model code

### Example 4: Create New File
**You**: "Create a new utility file in the leads app with a helper function"

**Copilot will**:
- Use `write_file("leads/utils.py", <code>)`
- Create the file with your requirements

---

## 🔄 Reloading MCP Server

If you make changes to the MCP server:

1. **Stop the old process**:
   ```bash
   pkill -f 'mcp_server.py'
   ```

2. **Reload VSCode window**:
   - `Cmd+Shift+P` → "Reload Window"

---

## 🔍 Troubleshooting

### MCP Tools Not Showing Up?

1. **Check the config file exists**:
   ```bash
   cat .vscode/mcp.json
   ```

2. **Reload VSCode window**:
   - `Cmd+Shift+P` → "Developer: Reload Window"

3. **Check Copilot is active**:
   - Look for Copilot icon in status bar
   - Should be green/active

### Copilot Not Using MCP?

Try being more explicit:
```
Using the MCP tools, show me the database tables
```

Or:
```
@workspace Use db_query to show tables
```

---

## 🎓 Pro Tips

### Tip 1: Be Specific
Instead of: "Show me the database"
Say: "Use MCP db_query to show all tables"

### Tip 2: Chain Commands
```
First, list files in the leads directory, 
then read the models.py file,
then show me the Lead table structure from the database
```

### Tip 3: Use @workspace
The `@workspace` mention helps Copilot understand you want to work with your project files.

---

## ✅ Verification

To verify MCP is working:

1. **Open Copilot Chat**
2. **Type**: "List files in the current directory using MCP"
3. **Copilot should**:
   - Recognize the MCP tools are available
   - Use `list_project_files(".")`
   - Return your project structure

---

## 📊 Your MCP Configuration

- **Server Name**: `django-mcp`
- **Transport**: stdio
- **Project**: `/Users/ahmedgomaa/Downloads/real_crm`
- **Database**: `django_db_real_crm@localhost:3306`
- **Tools Available**: 6

---

## 🎉 You're Ready!

Your GitHub Copilot can now:
✅ Read your Django project files
✅ Execute Django management commands
✅ Query your MariaDB database
✅ List and explore your codebase
✅ Create and update files
✅ Get project information

**Just reload VSCode and start chatting with Copilot!**

---

## 📚 Next Steps

1. ✅ **Reload VSCode**: `Cmd+Shift+P` → "Reload Window"
2. ✅ **Open Copilot Chat**: Click Copilot icon or `Cmd+I`
3. ✅ **Try it out**: "Using MCP, show me all database tables"

---

**Last Updated**: October 17, 2025
**Status**: 🟢 Ready for GitHub Copilot
