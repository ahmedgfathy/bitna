# MCP Server for Django + MariaDB Project

## 🎯 Overview

This MCP (Model Context Protocol) server provides secure access to your Django project files, management commands, and MariaDB database for AI agents and tools.

## ✨ Features

- **File Operations**: Read/write files within project directory
- **Django Management**: Execute Django commands safely
- **Database Queries**: Run SQL queries on MariaDB
- **Security**: Path restrictions, query validation, audit logging

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements-mcp.txt
```

### 2. Start the MCP Server

```bash
python mcp_server.py
```

Or use VSCode Task:
- Press `Cmd+Shift+P` → "Tasks: Run Task" → "Start MCP Server"

### 3. Server Configuration

- **URL**: `http://localhost:9000`
- **Protocol**: stdio transport
- **Project**: `/Users/ahmedgomaa/Downloads/real_crm`
- **Database**: `glomart_crm@localhost:3306`

## 🛠️ Available Tools

### 1. read_file(path)
Read a file from the project directory.

```python
# Example
read_file("real_estate_crm/settings.py")
```

### 2. write_file(path, content)
Write or update a file in the project.

```python
# Example
write_file("test.py", "print('Hello World')")
```

### 3. run_manage(command)
Execute Django management commands.

```python
# Examples
run_manage("showmigrations")
run_manage("migrate")
run_manage("makemigrations")
run_manage("collectstatic --noinput")
```

**Blocked commands** (for safety):
- `flush`
- `sqlflush`
- `dbshell`

### 4. db_query(sql, allow_modify=False)
Execute SQL queries on MariaDB.

```python
# Read-only queries (safe by default)
db_query("SHOW TABLES;")
db_query("SELECT * FROM auth_user LIMIT 5;")
db_query("DESCRIBE leads_lead;")

# Modifying queries (requires explicit permission)
db_query("UPDATE auth_user SET is_active=1 WHERE id=1;", allow_modify=True)
db_query("INSERT INTO leads_lead (name, email) VALUES ('Test', 'test@example.com');", allow_modify=True)
```

**Safety Features**:
- Destructive queries (`DROP`, `TRUNCATE`, `DELETE`, `UPDATE`, `INSERT`, `ALTER`) require `allow_modify=True`
- All queries are logged
- Connection auto-closes after each query

### 5. list_project_files(directory=".")
List files in a project directory.

```python
# Examples
list_project_files(".")  # Root directory
list_project_files("leads")  # Leads app
list_project_files("static/css")  # CSS files
```

### 6. get_project_info()
Get Django project information.

```python
# Returns JSON with:
# - Project directory
# - Python version
# - Django version
# - Database configuration
# - Installed apps
# - Debug mode status
get_project_info()
```

## 🔒 Security Features

### File Access
- ✅ Restricted to project directory only
- ✅ Absolute and relative paths supported
- ❌ Access outside project denied

### Database Access
- ✅ Read queries allowed by default
- ✅ Modify queries require explicit `allow_modify=True`
- ✅ All queries logged with timestamps
- ❌ Direct dbshell access blocked

### Django Commands
- ✅ Safe commands allowed (migrate, collectstatic, etc.)
- ✅ 30-second timeout for all commands
- ❌ Dangerous commands blocked (flush, dbshell)

### Audit Logging
All tool calls are logged with:
- Tool name
- Parameters (truncated for SQL)
- Success/failure status
- Error messages

## 📝 Example Usage

### AI Agent Connection

```json
{
  "mcpServers": {
    "django-mcp": {
      "command": "python",
      "args": ["/Users/ahmedgomaa/Downloads/real_crm/mcp_server.py"],
      "transport": "stdio"
    }
  }
}
```

### Common Workflows

#### Check Database Tables
```python
db_query("SHOW TABLES;")
```

#### View Migrations Status
```python
run_manage("showmigrations")
```

#### Read Settings File
```python
read_file("real_estate_crm/settings.py")
```

#### List App Structure
```python
list_project_files("leads")
```

#### Create a New Model File
```python
content = '''from django.db import models

class TestModel(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
'''
write_file("leads/test_model.py", content)
```

#### Run Migrations
```python
run_manage("makemigrations")
run_manage("migrate")
```

## 🎮 VSCode Integration

### Tasks Available
- **Start MCP Server**: Run MCP server in terminal
- **Stop MCP Server**: Stop running MCP server
- **Start Django Server**: Run development server
- **Django Migrations**: Run migrations
- **Make Migrations**: Create new migrations
- **Collect Static Files**: Gather static assets

### Launch Configurations
- **MCP Server**: Debug MCP server with breakpoints
- **Django Server**: Debug Django development server

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill existing process
pkill -f 'mcp_server.py'

# Or use a different port
# Edit mcp_server.py and change the port number
```

### Database Connection Error
Check database credentials in `mcp_server.py`:
```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'zerocall',
    'password': 'zerocall',
    'database': 'glomart_crm',
    'port': 3306
}
```

### Permission Denied Errors
Ensure the MCP server script is executable:
```bash
chmod +x mcp_server.py
```

### Import Errors
Reinstall dependencies:
```bash
pip install -r requirements-mcp.txt
```

## 📊 Verification Tests

Run these commands to verify everything works:

```python
# Test 1: Read settings file
read_file("real_estate_crm/settings.py")

# Test 2: List project files
list_project_files(".")

# Test 3: Get project info
get_project_info()

# Test 4: Show migrations
run_manage("showmigrations")

# Test 5: Show database tables
db_query("SHOW TABLES;")

# Test 6: Check database structure
db_query("DESCRIBE auth_user;")
```

## 🌐 Architecture

```
┌─────────────────┐
│   AI Agent      │
│ (Claude/Copilot)│
└────────┬────────┘
         │ MCP Protocol
         │ (stdio)
┌────────▼────────┐
│   MCP Server    │
│  (mcp_server.py)│
├─────────────────┤
│ • File Tools    │
│ • Django Tools  │
│ • DB Tools      │
└────┬──────┬─────┘
     │      │
┌────▼──┐ ┌─▼────────┐
│ Files │ │ MariaDB  │
│       │ │ Database │
└───────┘ └──────────┘
```

## 📚 Database Schema

Current database: `glomart_crm`

Key tables:
- `auth_user` - User accounts
- `leads_lead` - Lead management
- `properties_property` - Property listings
- `projects_project` - Project tracking
- And more...

To view all tables:
```python
db_query("SHOW TABLES;")
```

To view table structure:
```python
db_query("DESCRIBE table_name;")
```

## 🎓 Best Practices

1. **Always test queries with SELECT first** before running UPDATE/DELETE
2. **Use allow_modify=True explicitly** for data changes
3. **Check migration status** before running migrate
4. **Backup database** before destructive operations
5. **Monitor logs** for security and debugging
6. **Use relative paths** for files when possible
7. **Test in development** before using in production

## 🆘 Support

For issues or questions:
1. Check the logs in terminal where MCP server is running
2. Verify database connection with `get_project_info()`
3. Ensure all dependencies are installed
4. Check VSCode Tasks are configured correctly

## 📄 License

Part of the Glomart CRM project.

---

**Server Status**: 🟢 Ready
**Last Updated**: October 17, 2025
