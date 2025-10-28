# How to Apply Properties Module Migration

## 🚀 Quick Setup Instructions

Since we have connection issues with the CLI, here's how to apply the migration through the Supabase Dashboard:

### **Step 1: Open Supabase Dashboard**
1. Go to: https://supabase.com/dashboard/project/qudyodtaqwnehbqgzdma
2. Login to your account

### **Step 2: Open SQL Editor**
1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**

### **Step 3: Copy the Migration**
1. Open the file: `/supabase/migrations/20251013040000_create_properties_module.sql`
2. Copy the ENTIRE content (it's a long file - scroll to the bottom to make sure you got everything)

### **Step 4: Paste and Run**
1. Paste the SQL into the query editor
2. Click **Run** button (or press Cmd/Ctrl + Enter)
3. Wait for execution to complete (may take 10-20 seconds)

### **Step 5: Verify Installation**
Run this query to verify all tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND (
  table_name LIKE 'property%' 
  OR table_name IN ('areas', 'compounds', 'finishing_types', 'floor_types', 
                    'usage_types', 'offered_by_types')
)
ORDER BY table_name;
```

**Expected result: 13 tables**
- areas
- compounds
- finishing_types
- floor_types
- offered_by_types
- properties
- property_floors
- property_leads
- property_status_mapping
- property_statuses
- property_types
- property_usage_types
- usage_types

### **Step 6: Check Seed Data**
Verify that lookup tables have seed data:

```sql
SELECT 'property_types' as table_name, COUNT(*) as records FROM property_types
UNION ALL
SELECT 'property_statuses', COUNT(*) FROM property_statuses
UNION ALL
SELECT 'finishing_types', COUNT(*) FROM finishing_types
UNION ALL
SELECT 'floor_types', COUNT(*) FROM floor_types
UNION ALL
SELECT 'usage_types', COUNT(*) FROM usage_types
UNION ALL
SELECT 'offered_by_types', COUNT(*) FROM offered_by_types;
```

**Expected results:**
- property_types: 17 rows
- property_statuses: 6 rows
- finishing_types: 8 rows
- floor_types: 15 rows
- usage_types: 6 rows
- offered_by_types: 5 rows

---

## 🧪 Test the Frontend

After applying the migration:

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to Properties page:**
   - Go to http://localhost:5173/properties
   - You should see the empty state (no properties yet)
   - All dropdowns (Type, Area) should be populated from database

3. **Check browser console:**
   - Open DevTools (F12)
   - Look for any errors
   - You should see successful API calls to Supabase

---

## 🐛 Troubleshooting

### **Error: "relation already exists"**
Some tables might already exist from old schema. Drop them first:

```sql
-- Drop old schema (if needed)
DROP TABLE IF EXISTS property_leads CASCADE;
DROP TABLE IF EXISTS property_usage_types CASCADE;
DROP TABLE IF EXISTS property_floors CASCADE;
DROP TABLE IF EXISTS property_status_mapping CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP VIEW IF EXISTS properties_full_view;

-- Then run the migration again
```

### **Error: "permission denied"**
Make sure you're logged in as the project owner/admin in Supabase Dashboard.

### **Tables created but no data**
The seed data is included in the migration. Check if the INSERT statements ran successfully.

---

## 📊 What Gets Created

### **Lookup Tables (57 seed records total):**
- Property Types: Apartment, Villa, Office, etc.
- Statuses: For Sale, For Rent, Sold Out, etc.
- Finishing: Fully Finished, Semi Finished, etc.
- Floors: Basement, Ground, 1st-10th, Roof, etc.
- Usage Types: Residential, Commercial, Admin, etc.
- Offered By: Owner, Guard, Office, etc.

### **Main Table:**
- `properties` - 40+ fields ready for your data

### **Junction Tables:**
- Allow properties to have multiple statuses, floors, usage types
- Link properties to leads (many-to-many)

### **Indexes & Performance:**
- 25+ indexes for fast queries
- Auto-updating timestamps
- Full-text search ready

### **Security:**
- RLS policies enabled
- Authenticated users can CRUD properties
- Everyone can read lookup tables

---

## ✅ Next Steps After Migration

1. **Test the Properties page** - Should load without errors
2. **Verify dropdowns** - Type and Area filters should show options
3. **Ready for components** - Can now build AddProperty and PropertyDetails dialogs

---

Need help? Check the console for errors or let me know what you see! 🚀
