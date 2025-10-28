# Scripts Directory - Quick Reference

## 🧹 Cleanup Scripts

### 1. `organize_and_cleanup.sh` ⭐ **RECOMMENDED**
**Purpose**: Complete system cleanup and documentation organization

**What it does**:
- ✅ Moves all .md files to `technical_documentations/`
- ✅ Cleans Python cache (__pycache__, *.pyc)
- ✅ Removes old backup files
- ✅ Removes temporary scripts
- ✅ Cleans old log files (30+ days)
- ✅ Clears Django static files cache
- ✅ Removes temporary database copies
- ✅ **PRESERVES**: Database, migrations, virtual environments, media files

**Usage**:
```bash
./scripts/organize_and_cleanup.sh
```

**Safe to run**: ✅ Yes - Preserves all critical files

---

### 2. `safe_cleanup.sh`
**Purpose**: Safe cleanup without documentation organization

**What it does**:
- ✅ Removes test files
- ✅ Removes backup files
- ✅ Removes temporary scripts
- ✅ Cleans Python cache
- ✅ **Can remove virtual environments** (optional)

**Usage**:
```bash
./scripts/safe_cleanup.sh
```

**Safe to run**: ⚠️ Yes, but reads script first (can remove venv)

---

### 3. `clear-cache.sh`
**Purpose**: Quick cache clearing only

**What it does**:
- ✅ Clears Python cache only
- ✅ Collects Django static files

**Usage**:
```bash
./scripts/clear-cache.sh
```

**Safe to run**: ✅ Yes - Very safe, only clears cache

---

## 📊 Database Scripts

### `setup_mariadb_database.sh`
Setup MariaDB database from scratch

### `verify_database.sh`
Verify database configuration

### `convert-sqlite-to-mariadb.sh`
Migrate from SQLite to MariaDB

---

## 🤖 MCP Server Scripts

### `start_mcp_server.sh`
Start the MCP server

### `setup_claude_mcp.sh`
Setup Claude Desktop MCP integration

### `diagnose_mcp.sh`
Diagnose MCP issues

### `test_mcp_manual.sh`
Test MCP server manually

### `verify_mcp.py`
Verify MCP server configuration

---

## 🔧 Utility Scripts

### `initialize_modules.py`
Initialize Django modules and permissions

### `setup_audit_permissions.py`
Setup audit trail permissions

### `create_admin_profile.py`
Create admin user profile

### `create_property_currencies.py`
Setup property currency system

---

## 🚀 Development Scripts

### `setup_local_dev.py`
Setup local development environment

### `update_local_settings.py`
Update local settings

---

## 📸 Documentation Scripts

### `push-screenshots.sh`
Push screenshots to documentation

### `visual_guide.sh`
Generate visual guides

---

## 🆘 Emergency Scripts

### `emergency_fix.sh`
Emergency fixes for critical issues

### `quick_fix.sh`
Quick fixes for common issues

### `quick_password_fix.py`
Reset admin password

---

## 📋 Best Practices

### Regular Maintenance (Weekly)
```bash
# Run the main cleanup script
./scripts/organize_and_cleanup.sh

# Then hard refresh your browser
# Mac: Cmd+Shift+R
# Windows/Linux: Ctrl+Shift+R
```

### After Major Changes
```bash
# Clear cache
./scripts/clear-cache.sh

# Verify database
./scripts/verify_database.sh
```

### Before Deployment
```bash
# Full cleanup
./scripts/organize_and_cleanup.sh

# Collect static files
source venv/bin/activate
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

# Test the application
python manage.py runserver
```

---

## ⚠️ Safety Notes

### Always Safe to Run
- ✅ `organize_and_cleanup.sh`
- ✅ `clear-cache.sh`
- ✅ `verify_database.sh`
- ✅ `diagnose_mcp.sh`

### Review Before Running
- ⚠️ `safe_cleanup.sh` (can remove venv)
- ⚠️ `emergency_fix.sh` (makes system changes)
- ⚠️ `setup_mariadb_database.sh` (database changes)

### Requires Backup First
- 🛑 Any script that modifies the database
- 🛑 Scripts with "convert" or "migrate" in name

---

## 🔄 Script Maintenance

### Making Scripts Executable
```bash
chmod +x scripts/script_name.sh
```

### Running Scripts
```bash
# From project root
./scripts/script_name.sh

# Or with full path
/Users/ahmedgomaa/Downloads/real_crm/scripts/script_name.sh
```

---

## 📞 Getting Help

If a script fails:
1. Check `technical_documentations/` for relevant guides
2. Run diagnostic scripts first
3. Check script comments for requirements
4. Ensure virtual environment is activated if needed

---

**Last Updated**: October 20, 2025
