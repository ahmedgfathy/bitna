# MCP Server Setup & Usage Guide

## ✅ MCP Server is Now Working!

The Model Context Protocol (MCP) server has been successfully configured and is now operational.

---

## 🔧 What Was Fixed

### 1. **Corrected File Path**
- **Old Path (Wrong):** `/Users/ahmedgomaa/Downloads/real_crm/mcp_server.py`
- **New Path (Correct):** `/Users/ahmedgomaa/Downloads/real_crm/scripts/mcp_server.py`

### 2. **Fixed PROJECT_DIR**
- Changed from `Path(__file__).resolve().parent` 
- To: `Path(__file__).resolve().parent.parent` (to go up from scripts/ to project root)

### 3. **Updated Configuration Files**
- `.vscode/mcp.json` - VS Code MCP configuration
- `technical_documentations/claude_desktop_config.json` - Claude Desktop reference

---

## 📋 Available MCP Tools

The MCP server provides these tools for interacting with the Django project:

### 1. **read_file(path)**
Read any file within the project directory
```python
# Example: Read a model file
path: "properties/models.py"
```

### 2. **write_file(path, content)**
Write or update files (with safety checks)
```python
# Example: Update a view
path: "authentication/views.py"
content: "# Your code here"
```

### 3. **list_project_files(directory)**
List all files and directories
```python
# Example: List authentication app files
directory: "authentication"
```

### 4. **db_query(sql, allow_modify=False)**
Execute SQL queries on MariaDB database
```sql
-- Example: Get property counts
SELECT pt.name, COUNT(p.property_id) as count 
FROM properties_propertytype pt 
LEFT JOIN properties_property p ON pt.id = p.property_type_id 
GROUP BY pt.name
```

**⚠️ Safety Feature:** Destructive queries (INSERT, UPDATE, DELETE) require `allow_modify=True`

### 5. **run_manage(command)**
Run Django management commands
```bash
# Example: Check migrations
command: "showmigrations"

# Example: Create superuser (if needed)
command: "createsuperuser --noinput --username admin --email admin@example.com"
```

**🔒 Blocked Commands:** `flush`, `sqlflush`, `dbshell` (for safety)

### 6. **get_project_info()**
Get comprehensive project information
- Project directory
- Python & Django versions
- Database configuration
- Installed apps
- Debug mode status

---

## 🚀 How to Use MCP Server

### In VS Code (Current Setup)

The MCP server is configured to run automatically in VS Code via `.vscode/mcp.json`

**Start the server:**
```bash
# Use VS Code task
Task: "Start MCP Server"
```

**Stop the server:**
```bash
# Use VS Code task
Task: "Stop MCP Server"
```

### In Claude Desktop (Optional)

To use with Claude Desktop app, add this to your Claude Desktop config:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "django-mcp": {
      "command": "/Users/ahmedgomaa/Downloads/real_crm/venv/bin/python",
      "args": [
        "/Users/ahmedgomaa/Downloads/real_crm/scripts/mcp_server.py"
      ],
      "transport": "stdio",
      "env": {
        "DJANGO_SETTINGS_MODULE": "real_estate_crm.settings"
      }
    }
  }
}
```

---

## 🔍 Verified Database Statistics

Current project statistics (verified via MCP):

### Property Types Distribution
| Type | ID | Count |
|------|----|----|
| **Retail** | 6 | 516 |
| **Apartment** | 1 | 4 |
| **Villa** | 2 | 2 |
| **Duplex** | 9 | 1 |
| **Penthouse** | 4 | 1 |
| **Townhouse** | 3 | 1 |
| **Land** | 8 | 0 |
| **Office** | 5 | 0 |
| **Warehouse** | 7 | 0 |
| **Unclassified** | NULL | 11,424 |
| **TOTAL** | - | **11,949** |

### Other Counts
- **Total Leads:** 666
- **Total Opportunities:** (varies)
- **Total Projects:** (varies)

---

## 🛡️ Security Features

1. **File Access Control**
   - Restricted to project directory only
   - Cannot access files outside `/Users/ahmedgomaa/Downloads/real_crm/`

2. **SQL Query Safety**
   - Read queries (SELECT, SHOW, DESCRIBE) allowed by default
   - Destructive queries require explicit `allow_modify=True`
   - Prevents accidental data loss

3. **Django Command Protection**
   - Dangerous commands (`flush`, `sqlflush`, `dbshell`) blocked
   - Prevents database wipes

4. **Activity Logging**
   - All tool calls logged to stderr
   - Includes success/failure status
   - Helps with debugging and security audits

---

## 📊 Database Connection Details

- **Engine:** MariaDB
- **Host:** localhost
- **Port:** 3306
- **Database:** django_db_real_crm
- **User:** root
- **Connection:** mysql.connector

---

## 🐛 Troubleshooting

### MCP Server Won't Start
```bash
# Check if Python path is correct
which python
# Should show: /Users/ahmedgomaa/Downloads/real_crm/venv/bin/python

# Check if mcp_server.py exists
ls -la /Users/ahmedgomaa/Downloads/real_crm/scripts/mcp_server.py

# Check Django setup
cd /Users/ahmedgomaa/Downloads/real_crm
./venv/bin/python manage.py check
```

### Database Connection Issues
```bash
# Test MariaDB connection
mysql -u root -p -h localhost django_db_real_crm

# Check Django database settings
./venv/bin/python manage.py dbshell
```

### Permission Errors
```bash
# Make sure mcp_server.py is executable
chmod +x /Users/ahmedgomaa/Downloads/real_crm/scripts/mcp_server.py
```

---

## 📝 Example Usage Scenarios

### Scenario 1: Query Property Data
```python
# Get all commercial properties
sql = """
SELECT property_id, property_number, name, total_price 
FROM properties_property 
WHERE property_type_id = 6 
LIMIT 10
"""
```

### Scenario 2: Check Migration Status
```python
command = "showmigrations"
```

### Scenario 3: Read Model Definition
```python
path = "properties/models.py"
```

### Scenario 4: List Templates
```python
directory = "authentication/templates/authentication"
```

---

## ✨ Recent Fixes Applied

### Dashboard Issues Fixed (October 19, 2025)

1. **Total Leads Count**
   - Was showing: 12 (incorrect)
   - Now showing: 666 (correct)
   - Fixed by using `total_leads` instead of `active_leads`

2. **Commercial Property Filter**
   - Was showing: 0 results (broken text search)
   - Now showing: 516 properties (correct)
   - Fixed by using `property_type_id=6` instead of search parameter

3. **Property Type Filters**
   - Residential: `property_type=1,2,3,4,9` (Apartment, Villa, Townhouse, Penthouse, Duplex)
   - Commercial: `property_type=6` (Retail)
   - Office: `property_type=5` (Office)

---

## 📚 Additional Resources

- **Django Documentation:** https://docs.djangoproject.com/
- **MCP Protocol:** https://modelcontextprotocol.io/
- **FastMCP Library:** https://github.com/jlowin/fastmcp

---

## 🎯 Next Steps

1. ✅ MCP Server - **Working**
2. ✅ Database Queries - **Working**
3. ✅ File Operations - **Working**
4. ✅ Django Commands - **Working**
5. 🔄 Consider adding more MCP tools for:
   - Automated testing
   - Data migration helpers
   - Report generation
   - Backup/restore operations

---

**Status:** 🟢 **Fully Operational**

Last Updated: October 19, 2025
