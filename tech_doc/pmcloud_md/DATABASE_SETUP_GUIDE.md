# Database Setup and Company Name Update - Troubleshooting Guide

## Step 1: Run Database Migrations First

From your WSL terminal (not PowerShell), run:

```bash
cd /home/xinreal/pmcloud
npx prisma db push
```

This will create all the necessary tables in your database.

## Step 2: Check Database Tables

In MariaDB, run:
```sql
USE pms_cloud;
SHOW TABLES;
```

You should see tables like:
- company_settings
- users  
- files
- file_shares
- activities
- notifications

## Step 3: Update Company Name

Once tables exist, run:
```sql
-- Check current company settings
SELECT * FROM company_settings;

-- Update the company name
UPDATE company_settings 
SET companyName = 'PMS Drive' 
WHERE companyName = 'PM Cloud';

-- Verify the change
SELECT * FROM company_settings;
```

## Step 4: If No Records Exist

If the table is empty, create a new record:
```sql
INSERT INTO company_settings (
    id, 
    companyName, 
    primaryColor, 
    secondaryColor, 
    isConfigured, 
    createdAt, 
    updatedAt
) VALUES (
    'comp_default',
    'PMS Drive',
    '#2563eb',
    '#1e40af',
    false,
    NOW(),
    NOW()
);
```

## Step 5: Alternative - Run Node Script

From WSL terminal:
```bash
cd /home/xinreal/pmcloud
node setup-and-update-db.js
```

This script will:
- Check database connectivity
- List available databases and tables
- Find the correct table name
- Update company name automatically

## Common Issues:

1. **Table doesn't exist**: Run `npx prisma db push` first
2. **Connection refused**: Check if MariaDB is running
3. **Wrong credentials**: Verify username: root, password: zerocall
4. **Wrong database name**: Make sure it's 'pms_cloud'

## After Success:

1. Refresh your browser (hard refresh: Ctrl+Shift+R)
2. The website should show "PMS Drive" permanently
3. No more auto-revert to "PM Cloud"