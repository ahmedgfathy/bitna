# Properties Import Feature - Documentation

## 🎉 Overview

The Properties module now has **100% identical import functionality** as the Leads module, with advanced column mapping, template saving, and comprehensive import statistics.

## 🚀 Features

### 1. **3-Step Wizard Interface**
- **Step 1:** Upload CSV/Excel file
- **Step 2:** Map columns with drag & drop
- **Step 3:** Review settings and execute import

### 2. **Advanced Column Mapping**
- Drag and drop CSV columns to system fields
- Visual mapping indicators
- Sample data preview for each column
- Fields grouped by category for easy navigation

### 3. **Saved Mapping Templates**
- Save frequently used mappings for reuse
- Share templates with team members
- Quick load from saved mappings

### 4. **Comprehensive Field Support** (50+ fields)

#### Basic Information
- property_number (required), name, property_type, category, status, activity

#### Location
- region, compound, building, unit_number, floor_number, apartment_number, plot_number

#### Property Details
- rooms, bathrooms, living_rooms, finishing_type, unit_purpose, year_built, total_floors

#### Area & Space
- total_space, sales_area, land_area, land_garden_area

#### Pricing
- base_price, asking_price, total_price, sold_price, price_per_meter, currency

#### Payment Details
- down_payment, installment, monthly_payment, payment_frequency

#### Features
- has_garage, has_garden, has_pool, has_terraces

#### Contact Information
- mobile_number, secondary_phone, owner_name, owner_phone, owner_email

#### Additional Information
- description, unit_features, notes, owner_notes

### 5. **Default Values**
Set default values for fields not present in your CSV:
- Default Region
- Default Property Type
- Default Category
- Default Status
- Default Activity
- Default Currency

### 6. **Import Settings**
- **Skip duplicates:** Skip properties with same property_number
- **Update existing:** Update existing properties instead of skipping

### 7. **Import Statistics**
After import, view detailed statistics:
- Total rows processed
- Successfully imported count
- Updated properties count
- Skipped duplicates count
- Error count with details

### 8. **Import History**
- Track all import operations
- View statistics for each import
- Access error logs
- Filter by date and user

## 📋 Usage Instructions

### Step 1: Prepare Your File

Create a CSV or Excel file with your property data. Example:

```csv
Property Number,Property Name,Region,Property Type,Total Space,Total Price,Rooms,Bathrooms
PROP-001,Luxury Villa,New Cairo,Villa,500,5000000,5,4
PROP-002,Modern Apartment,6th October,Apartment,150,2500000,3,2
PROP-003,Commercial Shop,Downtown,Shop,80,1500000,0,1
```

**Requirements:**
- First row must contain column headers
- Property Number is required (must be unique)
- Other fields are optional

### Step 2: Access Import Page

1. Navigate to **Properties** page
2. Click the **"Import"** button (top right)
3. You'll see the 3-step wizard interface

### Step 3: Upload File

1. Click **"Choose File"** or drag & drop your CSV/Excel file
2. Supported formats: `.csv`, `.xlsx`, `.xls`
3. Maximum file size: 10MB
4. Click **"Next: Map Columns"**

### Step 4: Map Columns

1. **Review Sample Data:** See the first 3 rows from your file
2. **Map Columns:** Drag CSV columns from left to system fields on right
   - OR click on a system field to manually select CSV column
3. **Save Mapping (Optional):**
   - Check "Save this mapping for future imports"
   - Give it a descriptive name
   - Optionally share with team
4. **Load Saved Mapping (Optional):**
   - Click on a saved mapping at the top to instantly apply it
5. Click **"Next: Review"**

### Step 5: Review & Configure

1. **Review Mapped Fields:** Verify your column mappings
2. **Set Default Values:** Choose defaults for unmapped fields
3. **Configure Settings:**
   - ✅ Skip duplicate properties (recommended)
   - □ Update existing properties instead of skipping
4. **Save Mapping Template:** Optionally save for future use
5. Click **"Start Import"**

### Step 6: View Results

- See import progress
- View detailed statistics:
  - ✅ Imported: New properties created
  - 🔄 Updated: Existing properties updated
  - ⏭️ Skipped: Duplicates skipped
  - ❌ Errors: Problems encountered
- Click **"View Imported Properties"** to see your properties
- Or **"Import More"** to import another file

## 🎯 Best Practices

### 1. **Use Consistent Column Names**
Save mapping templates with descriptive names for different data sources:
- "Facebook Lead Ads Export"
- "Website Inquiry Form"
- "Partner Agency Import"

### 2. **Set Default Values**
Always set default values for:
- Currency (if not in CSV)
- Status (e.g., "Available", "Pending")
- Activity (e.g., "For Sale", "For Rent")

### 3. **Test with Small Batches**
- First import: 5-10 properties to test mapping
- Verify data accuracy
- Then import full dataset

### 4. **Handle Duplicates Wisely**
- **Skip duplicates:** Safe option, won't modify existing data
- **Update existing:** Use when refreshing property details from source

### 5. **Check Import History**
- Review past imports for patterns
- Identify common errors
- Refine your CSV data

## ⚠️ Common Issues & Solutions

### Issue 1: "Property Number is required"
**Solution:** Make sure your CSV has a column mapped to "Property Number" and contains values for all rows.

### Issue 2: Duplicate Properties Skipped
**Solution:** 
- Expected behavior if properties exist with same property_number
- Enable "Update existing" if you want to refresh data
- Or use unique property numbers

### Issue 3: Foreign Key Fields Not Mapped
**Solution:**
- Region, Property Type, etc. must match existing values in system
- Go to Admin panel to add missing options
- Or set as default value instead

### Issue 4: Numeric Field Errors
**Solution:**
- Ensure numeric fields (price, rooms, area) contain only numbers
- Remove currency symbols: ✅ `5000000` ❌ `$5,000,000`
- Remove units: ✅ `500` ❌ `500 sqm`

### Issue 5: Excel File Not Supported
**Solution:**
- Install openpyxl: `pip install openpyxl`
- Or save Excel as CSV format

## 📊 Sample CSV Templates

### Basic Property Import
```csv
Property Number,Property Name,Region,Total Price,Rooms,Bathrooms
PROP-001,Luxury Apartment,New Cairo,3500000,3,2
PROP-002,Villa with Garden,6th October,8000000,5,4
```

### Complete Property Import
```csv
Property Number,Property Name,Region,Property Type,Total Space,Total Price,Price Per Meter,Rooms,Bathrooms,Has Garden,Has Pool,Owner Name,Owner Phone,Description
PROP-001,Modern Villa,New Cairo,Villa,500,5000000,10000,5,4,true,true,Ahmed Ali,01012345678,Luxury villa with garden and pool
PROP-002,Studio Apartment,Downtown,Apartment,50,1200000,24000,1,1,false,false,Mohamed Hassan,01098765432,Cozy studio in downtown
```

## 🔗 URLs

- **Import Start:** `/properties/import/advanced/`
- **Import History:** `/properties/import/history/`
- **Get Mapping:** `/properties/import/mapping/<id>/`
- **Delete Mapping:** `/properties/import/mapping/<id>/delete/`

## 🛠️ Technical Details

### Database Tables Created
- `properties_importmapping` - Stores mapping templates
- `properties_importhistory` - Tracks import operations

### Models
- **ImportMapping:** Template name, mapping data, default values, settings
- **ImportHistory:** Filename, user, statistics, errors, timestamp

### File Formats Supported
- CSV (Comma Separated Values)
- Excel (.xlsx, .xls) - requires openpyxl

### Data Validation
- Property Number: Required, must be unique
- Numeric fields: Automatically converted from strings
- Boolean fields: Accepts true/false, yes/no, 1/0
- Foreign keys: Must match existing records (case-insensitive)

## 📞 Support

For issues or questions:
1. Check Import History for error details
2. Review this documentation
3. Contact system administrator
4. Check Django logs for technical errors

---

**Created:** October 18, 2025  
**Version:** 1.0  
**Author:** Real Estate CRM Team

