# City Field Made Optional - Changes Summary

## What Changed

### ✅ City is now OPTIONAL (not required)

Previously required fields: Full Name ⭐, Phone ⭐, City ⭐
**Now required fields: Full Name ⭐, Phone ⭐**

## Changes Made

### 1. ImportLeadsDialog.tsx
- Removed ⭐ from City field label
- Updated validation to only require `full_name` and `phone`
- Added default value "Unknown" for city if not provided during import
- Updated help text to show only 2 required fields

### 2. Database Migration
**File**: `supabase/migrations/20251013030000_make_city_optional.sql`

```sql
ALTER TABLE public.leads ALTER COLUMN city DROP NOT NULL;
```

This makes the `city` column nullable in the database.

### 3. TypeScript Types
**File**: `src/integrations/supabase/types.ts`

Updated types to reflect that `city` is now optional:
- `Row.city`: `string | null` (was `string`)
- `Insert.city`: `string | null` (was `string`)
- `Update.city`: `string | null` (unchanged)

## How to Apply Changes

### Step 1: Apply Database Migration

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste this SQL:
   ```sql
   ALTER TABLE public.leads ALTER COLUMN city DROP NOT NULL;
   ```
4. Click "Run"

**Option B: Using Supabase CLI (if you have Docker)**
```bash
npx supabase db reset
```

### Step 2: Test Import

1. Reload your app (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
2. Go to Leads page
3. Click "استيراد" (Import) button
4. Upload your CSV
5. Map only Full Name and Phone columns
6. **City can now be skipped!**
7. Click "Import" - should work even without city data

## Import Behavior

### With City Data
```csv
Name,Phone,City
Ahmed,01234567890,Cairo
```
Result: Lead created with city = "Cairo"

### Without City Data (Mapped but Empty)
```csv
Name,Phone,City
Ahmed,01234567890,
```
Result: Lead created with city = "Unknown"

### Without City Column (Skipped)
```csv
Name,Phone
Ahmed,01234567890
```
Result: Lead created with city = "Unknown"

## Validation Rules (Updated)

### ✅ Required Fields (Cannot be empty or skipped):
- **Full Name** - Must be mapped and have data
- **Phone** - Must be mapped and have data

### ⚠️ Optional Fields (Can be empty or skipped):
- City (defaults to "Unknown" if not provided)
- Email
- Source (defaults to "CSV Import")
- Status (defaults to "new")
- Budget Min
- Budget Max
- Property Type
- Notes

## Testing Checklist

- [ ] Apply database migration
- [ ] Hard refresh browser
- [ ] Open Import dialog
- [ ] Upload CSV without City column
- [ ] Map only Name → Full Name and Phone → Phone
- [ ] Import button should be enabled
- [ ] Click Import
- [ ] Should succeed without errors
- [ ] Check Leads page - new leads should show with city = "Unknown"

## Reverting Changes (If Needed)

If you need to make city required again:

```sql
-- First, set default value for existing NULL cities
UPDATE public.leads SET city = 'Unknown' WHERE city IS NULL;

-- Then make it required again
ALTER TABLE public.leads ALTER COLUMN city SET NOT NULL;
```

## Files Modified

1. ✅ `src/components/leads/ImportLeadsDialog.tsx` - UI and validation
2. ✅ `src/integrations/supabase/types.ts` - TypeScript types
3. ✅ `supabase/migrations/20251013030000_make_city_optional.sql` - Database schema

## Notes

- Existing leads with city data are not affected
- New leads can be created without city
- City field still appears in the form but is not required
- Import will set city to "Unknown" if not provided
- You can manually update city later from the lead details page
