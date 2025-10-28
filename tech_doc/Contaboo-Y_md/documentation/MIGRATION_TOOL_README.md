# 🔄 Appwrite to MariaDB Migration Tool

This is a **temporary** interactive tool to migrate data from your external Appwrite database to your local MariaDB database with full column mapping control.

## 🚀 Quick Start

### 1. Setup (One-time)
```bash
cd scripts
chmod +x setup-migration.sh
./setup-migration.sh
```

### 2. Run Migration Tool
```bash
cd scripts
node appwrite-migration-tool.js
```

## 📋 What This Tool Does

### ✅ Interactive Process
1. **Lists all Appwrite collections** from your external database
2. **Shows your local MariaDB tables** for selection
3. **Displays sample data** from both sources
4. **Column-by-column mapping** - you choose how to map each field
5. **Migration confirmation** - shows exactly what will happen
6. **Safe execution** - only migrates when you confirm "yes"

### ✅ Flexible Mapping Options
- **Direct field mapping**: Appwrite field → Local column
- **Default values**: Set static values for any column
- **Skip columns**: Leave columns empty or auto-increment
- **Data preview**: See sample data before mapping

### ✅ Safety Features
- **Read-only on Appwrite**: Only reads from external database
- **Confirmation required**: Must explicitly confirm before migration
- **Error handling**: Continues migration even if some records fail
- **Progress tracking**: Shows real-time migration progress

## 🗄️ Available Collections

Your Appwrite database contains these collections:

### Main Data
- **users** - User accounts and profiles
- **leads** - Lead information and tracking
- **properties** - Property listings and details
- **projects** - Project management data
- **sheets** - Spreadsheet data
- **filter_settings** - User filter preferences
- **lead_history** - Lead activity history

### Reference Data
- **property_types** - Property type definitions
- **finishing_levels** - Finishing level options
- **currencies** - Currency configurations
- **categories** - Property categories
- **unit_facilities** - Unit facility options
- **lead_sources** - Lead source tracking
- **property_status** - Property status options
- **unit_types** - Unit type definitions
- **payment_types** - Payment method options
- **lead_qualities** - Lead quality ratings
- **lead_priorities** - Lead priority levels
- **budget_ranges** - Budget range options
- **customer_types** - Customer type classifications
- **property_purposes** - Property purpose categories
- **regions** - Geographic regions

## 🎯 Example Migration Flow

```
🚀 Appwrite to MariaDB Migration Tool
=====================================
✅ Successfully connected to Appwrite
✅ Connected to local MariaDB database

📊 Available Appwrite Collections:
1. users (674b14b2000bdd8ac7ce)
2. leads (67339a5e003b8cf8eade)
3. properties (6737698b000cccaf6f16)
...

Select Appwrite collection (enter number): 2

📡 Fetching data from Appwrite collection: leads
📊 Found 150 records in Appwrite collection

🗄️ Available Local Tables:
1. leads
2. properties
3. users
...

Select local table (enter number): 1

🔗 Column Mapping Configuration
=================================

📋 Appwrite Fields: name, email, phone, status, created_at
📋 Local Columns: id (int), full_name (varchar), email_address (varchar), phone_number (varchar), lead_status (varchar), created_date (datetime)

🎯 Mapping for local column: full_name (varchar)
Available Appwrite fields:
  1. name
  2. email  
  3. phone
  4. status
  5. created_at
  0. Skip this column
  -1. Set default value

Choose mapping (enter number): 1
✅ full_name -> name

...

📋 Migration Summary
====================
Source: Appwrite collection "leads" (150 records)
Target: Local table "leads"

Column Mapping:
  full_name <- name
  email_address <- email
  phone_number <- phone
  lead_status <- status
  created_date <- created_at

❓ Proceed with migration? (yes/no): yes

🚀 Starting Migration...
📊 Fetching all documents from Appwrite...
📈 Processing 150 documents...
📈 Migrated 100 records...
📈 Migrated 150 records...

✅ Migration Complete!
📊 Success: 150 records
❌ Errors: 0 records
```

## ⚙️ Configuration

The tool uses these environment variables from your `.env` file:

```env
# Local MariaDB (your current database)
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=zerocall
DATABASE_NAME=glomart_crm_local
DATABASE_PORT=3306
```

Appwrite credentials are hardcoded in the script from your provided configuration.

## 🗑️ Cleanup After Migration

Once you've completed all migrations:

```bash
# Remove temporary dependencies
rm -rf scripts/node_modules
rm -f scripts/package-lock.json

# Remove migration tools (optional)
rm -f scripts/appwrite-migration-tool.js
rm -f scripts/appwrite-fetcher.js
rm -f scripts/migration-package.json
rm -f scripts/setup-migration.sh
```

## 🔒 Security Notes

- ✅ **Read-only access** to Appwrite database
- ✅ **No changes** to external systems
- ✅ **Local execution** only
- ✅ **Temporary dependencies** in scripts folder
- ✅ **No impact** on your main project

## ⚠️ Important Notes

1. **Temporary Tool**: This is designed for one-time migration only
2. **No Backup**: Always backup your local database before migration
3. **Data Types**: Review data type compatibility between systems
4. **Dependencies**: Uses temporary npm packages in scripts/ folder
5. **Manual Process**: Requires your input for each mapping decision

## 🛠️ Troubleshooting

### Connection Issues
- Verify `.env` file has correct MariaDB credentials
- Check if MariaDB service is running
- Ensure Appwrite credentials are valid

### Mapping Issues
- Check data types compatibility
- Use default values for missing fields
- Skip auto-increment columns

### Migration Errors
- Review error messages for specific issues
- Check required vs optional fields
- Verify foreign key constraints

## 📞 Need Help?

The tool provides detailed error messages and progress updates. Each step is interactive and reversible until you confirm the final migration.
