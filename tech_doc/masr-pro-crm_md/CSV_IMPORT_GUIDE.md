# CSV Import Feature - Visual Guide

## Step-by-Step Usage

### Step 1: Access Import Feature
```
Leads Page → Click "استيراد" (Import) button
```
**Location**: Top right of the Leads page, next to "تصدير" (Export) and "إضافة عميل" (Add Lead)

---

### Step 2: Upload CSV File
**What you'll see:**
- File upload input
- "Upload CSV File" button

**Actions:**
1. Click "Choose File" or upload button
2. Select your CSV file
3. System detects columns automatically

**Example CSV Format:**
```csv
Name,Phone,Email,City,Source
Ahmed Ali,01234567890,ahmed@example.com,Cairo,Facebook
```

---

### Step 3: Map CSV Columns (Auto or Manual)

**Auto-Detection:**
System automatically maps common column names:
- "name" → Full Name
- "phone"/"mobile" → Phone
- "email" → Email
- "city"/"location" → City
- "source" → Source
- "budget min" → Budget Min
- "budget max" → Budget Max
- "property"/"type" → Property Type
- "note" → Notes

**Manual Mapping:**
For each CSV column, select target database field from dropdown:
```
CSV Column: "Client Name"  →  Database: [Full Name ▼]
CSV Column: "Tel"          →  Database: [Phone ▼]
CSV Column: "Address"      →  Database: [City ▼]
CSV Column: "Extra Info"   →  Database: [-- Skip Column --]
```

**Required Mappings (marked with *):**
- ✅ Full Name (required)
- ✅ Phone (required)
- ✅ City (required)

---

### Step 4: Save Mapping Template (Optional but Recommended)

**Why Save Templates?**
- Reuse mappings for future imports
- Save time on recurring data sources
- Different templates for different sources

**Example Templates:**
- "Facebook Lead Ads" - for FB ad exports
- "Website Contact Form" - for website exports
- "Manual Entry Sheet" - for data entry team
- "Agent Submissions" - for agent data

**How to Save:**
1. Enter template name in text box
2. Click "Save Template" button
3. Template saved for future use

**How to Load:**
1. Select from "Load saved mapping..." dropdown
2. All mappings applied automatically
3. Delete unwanted templates with X button

---

### Step 5: Preview Data

**Preview Section Shows:**
- First 3 rows of your CSV
- How columns are mapped
- Final field mapping for verification

**Example Preview:**
```
┌──────────────┬──────────────┬─────────────────────────┐
│ Name         │ Phone        │ City                    │
│ → Full Name  │ → Phone      │ → City                  │
├──────────────┼──────────────┼─────────────────────────┤
│ Ahmed Ali    │ 01234567890  │ Cairo                   │
│ Sara Mohamed │ 01098765432  │ Alexandria              │
│ Mohamed      │ 01156789012  │ Giza                    │
└──────────────┴──────────────┴─────────────────────────┘
```

---

### Step 6: Import Leads

**Final Step:**
1. Click "Import X Leads" button (X = number of rows)
2. System processes each row
3. Shows progress/result

**Import Result:**
```
✓ Import completed: 10 successful, 0 failed
```

**What Happens:**
- Each row creates a new lead
- Required fields validated
- Budget fields converted to numbers
- Default values applied (Source: "CSV Import", Status: "new")
- Duplicates are NOT checked (all rows imported)

---

## UI Components Breakdown

### Dialog Layout:
```
┌─────────────────────────────────────────────────────┐
│ Import Leads from CSV                          [X]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 1. Upload CSV File                                 │
│   [Choose File] [📤]                               │
│   sample_leads.csv - 10 columns, 9 rows            │
│                                                     │
│ 2. Load or Save Mapping Template                   │
│   [Load saved mapping... ▼]                   [X]  │
│   [Template name...          ] [Save Template]     │
│                                                     │
│ 3. Map CSV Columns to Lead Fields                  │
│   ┌──────────────────────────────────────────┐    │
│   │ Name            →  [Full Name ▼]         │    │
│   │ Phone           →  [Phone ▼]             │    │
│   │ Email           →  [Email ▼]             │    │
│   │ City            →  [City ▼]              │    │
│   │ Source          →  [Source ▼]            │    │
│   │ Budget Min      →  [Budget Min ▼]        │    │
│   │ Budget Max      →  [Budget Max ▼]        │    │
│   │ Property Type   →  [Property Type ▼]     │    │
│   │ Notes           →  [Notes ▼]             │    │
│   └──────────────────────────────────────────┘    │
│   * Required fields: Full Name, Phone, City        │
│                                                     │
│ 4. Preview (First 3 rows)                          │
│   [Preview Table with mapped columns]              │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [Close]                      [Import 9 Leads]      │
└─────────────────────────────────────────────────────┘
```

---

## Sample Mapping Templates

### Template: "Facebook Lead Ads"
```json
{
  "Full Name": "full_name",
  "Phone Number": "phone",
  "Email": "email",
  "Location": "city",
  "Budget Range Min": "budget_min",
  "Budget Range Max": "budget_max",
  "Interested In": "preferred_property_type"
}
```

### Template: "Website Contact Form"
```json
{
  "name": "full_name",
  "phone": "phone",
  "email": "email",
  "city": "city",
  "message": "notes"
}
```

### Template: "Agent Data Entry"
```json
{
  "Client Name": "full_name",
  "Contact": "phone",
  "Email Address": "email",
  "City": "city",
  "Lead Source": "source",
  "Min Budget": "budget_min",
  "Max Budget": "budget_max",
  "Property Type": "preferred_property_type",
  "Additional Notes": "notes"
}
```

---

## Error Handling

### Common Errors & Solutions:

**Error: "Missing required fields"**
- Solution: Map Full Name, Phone, and City columns

**Error: "Invalid file type"**
- Solution: Upload only .csv files

**Error: "Empty file"**
- Solution: Ensure CSV has data rows (not just headers)

**Error: "Failed to save template"**
- Solution: Check you're logged in and template name is unique

**Import Result: "X failed"**
- Reasons: Invalid data, missing required fields in specific rows
- Check console for detailed error messages

---

## Tips & Best Practices

### 1. Data Preparation
✅ Remove empty rows
✅ Clean phone numbers (remove spaces, dashes)
✅ Standardize city names
✅ Remove currency symbols from budget fields
✅ Use consistent date formats

### 2. Template Management
✅ Create templates for each data source
✅ Use descriptive template names
✅ Delete outdated templates
✅ Test templates with small CSV first

### 3. Import Strategy
✅ Preview before importing
✅ Start with small batch (10-20 rows) for testing
✅ Verify first import in Leads list
✅ Then import larger datasets
✅ Check success/failed counts

### 4. Performance
- Small files (< 100 rows): Import instantly
- Medium files (100-500 rows): ~5-15 seconds
- Large files (500+ rows): Consider batch imports

---

## Database Schema

### Leads Table Fields (Import Target)
```typescript
{
  full_name: string          // Required
  phone: string              // Required
  email?: string             // Optional
  city: string               // Required
  source: string             // Default: "CSV Import"
  status: string             // Default: "new"
  budget_min?: number        // Optional
  budget_max?: number        // Optional
  preferred_property_type?: string  // Optional
  notes?: string             // Optional
}
```

### Mapping Templates Table
```sql
import_mapping_templates {
  id: UUID
  name: TEXT
  module: TEXT (always "leads")
  mapping: JSONB
  created_by: UUID
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

---

## Testing the Feature

### Test Case 1: Basic Import
1. Use `sample_leads.csv` (provided)
2. All columns should auto-map correctly
3. Preview shows correct data
4. Import all 10 leads
5. Verify in Leads page

### Test Case 2: Save & Load Template
1. Map columns manually
2. Save as "Test Template"
3. Close dialog
4. Reopen import dialog
5. Load "Test Template"
6. Verify all mappings restored

### Test Case 3: Skip Columns
1. Upload CSV with extra columns
2. Map some columns to "-- Skip Column --"
3. Import
4. Verify skipped data not imported

### Test Case 4: Required Fields Validation
1. Upload CSV
2. Don't map Phone or City
3. Click Import
4. Should show error: "Missing required fields"

---

## Keyboard Shortcuts
- `Esc` - Close dialog
- `Tab` - Navigate between mapping dropdowns
- `Enter` - Confirm dropdown selection

---

## Mobile Responsiveness
- Dialog scrolls on small screens
- Touch-friendly dropdowns
- Responsive table preview
- Optimized for tablet portrait mode

