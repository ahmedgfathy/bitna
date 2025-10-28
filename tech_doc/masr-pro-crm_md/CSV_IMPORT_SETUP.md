# CSV Import System for Leads

## Overview
This system allows you to import leads from CSV files with a flexible column mapping feature. You can save your column mappings as templates for future use.

## Setup Instructions

### 1. Apply Database Migration

You need to create the `import_mapping_templates` table in your Supabase database. 

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `/supabase/migrations/20251013020000_import_mapping_templates.sql`
4. Paste and run the SQL query
5. Verify the table was created in the Table Editor

**Option B: Using Supabase CLI (if you have Docker running)**
```bash
npx supabase db reset
```

### 2. Migration SQL
The migration file creates:
- `import_mapping_templates` table to store your CSV mapping templates
- RLS policies so users can only see their own templates
- Indexes for better performance
- Trigger for `updated_at` field

## Features

### 1. CSV File Upload
- Click the "استيراد" (Import) button on the Leads page
- Select a CSV file from your computer
- The system will automatically detect columns

### 2. Column Mapping
- Map CSV columns to your database fields
- Auto-detection tries to match columns by name
- Required fields: Full Name, Phone, City
- Optional fields: Email, Source, Status, Budget Min/Max, Property Type, Notes

### 3. Save Mapping Templates
- After mapping columns, enter a template name
- Click "Save Template" to save for future use
- Example names: "Facebook Leads", "Website Export", "Agent Data"

### 4. Load Saved Templates
- Use the dropdown to select a previously saved template
- Your column mappings will be automatically applied
- Delete templates you no longer need with the X button

### 5. Preview & Import
- Preview the first 3 rows before importing
- See how your data will be mapped
- Click "Import X Leads" to start the import process
- View success/failed counts after import

## CSV Format Example

```csv
Name,Phone,Email,City,Source,Budget,Property Type
Ahmed Ali,01234567890,ahmed@example.com,Cairo,Facebook,500000,Apartment
Sara Mohamed,01098765432,sara@example.com,Alexandria,Website,1000000,Villa
```

## Column Mapping Options

| Database Field | Description | Required |
|---------------|-------------|----------|
| Full Name | Lead's full name | ✅ Yes |
| Phone | Contact phone number | ✅ Yes |
| Email | Email address | No |
| City | City/Location | ✅ Yes |
| Source | Lead source (defaults to "CSV Import") | No |
| Status | Lead status (defaults to "new") | No |
| Budget Min | Minimum budget (numbers only) | No |
| Budget Max | Maximum budget (numbers only) | No |
| Property Type | Preferred property type | No |
| Notes | Additional notes | No |
| Skip Column | Ignore this CSV column | N/A |

## Tips

1. **Clean Your Data**: Make sure phone numbers and emails are properly formatted
2. **Use Templates**: Save time by creating templates for recurring import sources
3. **Check Preview**: Always preview data before importing to catch mapping errors
4. **Budget Fields**: Remove currency symbols (like EGP, £, $) - system accepts numbers only
5. **Status Values**: Use: new, contacted, qualified, negotiation, won, lost

## Troubleshooting

### Import Failed
- Check that all required fields (Name, Phone, City) are mapped
- Verify CSV file is properly formatted
- Ensure phone numbers don't contain spaces or special characters

### Template Not Saving
- Make sure you're logged in
- Check that template name is unique
- Verify database migration was applied

### Auto-detection Not Working
- CSV headers should be in the first row
- Use common names like "name", "phone", "email" for better detection
- You can always manually map columns

## Technical Details

### Files Created/Modified
1. **ImportLeadsDialog.tsx** - Main import dialog component
2. **20251013020000_import_mapping_templates.sql** - Database migration
3. **types.ts** - Updated Supabase types
4. **Leads.tsx** - Added import button and dialog integration

### Database Table: import_mapping_templates
```sql
- id (UUID) - Primary key
- name (TEXT) - Template name
- module (TEXT) - Module type ("leads")
- mapping (JSONB) - Column mapping JSON
- created_by (UUID) - User who created template
- created_at (TIMESTAMP) - Creation time
- updated_at (TIMESTAMP) - Last update time
```

## Future Enhancements
- Export leads to CSV
- Import validation rules
- Duplicate detection
- Bulk update via CSV
- Import history/logs
