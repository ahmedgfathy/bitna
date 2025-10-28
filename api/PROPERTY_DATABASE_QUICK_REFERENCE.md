# 🚀 Property Database - Quick Reference Guide

## 📊 Current Status

**Last Updated:** January 29, 2025

### Database Statistics
- **Total Properties:** 12,398
- **Property Types:** 28 active
- **Regions:** 37 major areas
- **Date Range:** 2017-2025
- **Success Rate:** 99.77%

---

## 🔍 Quick Queries

### Basic Queries

```sql
-- Count all properties
SELECT COUNT(*) FROM properties;

-- Properties by status
SELECT ps.name, COUNT(*) 
FROM properties p 
JOIN property_statuses ps ON p.status_id = ps.id 
GROUP BY ps.name;

-- Properties by region
SELECT r.display_name, COUNT(*) 
FROM properties p 
JOIN regions r ON p.region_id = r.id 
GROUP BY r.display_name 
ORDER BY COUNT(*) DESC;

-- Properties available for sale
SELECT p.property_number, p.property_name, p.sale_price, c.code
FROM properties p
JOIN property_statuses ps ON p.status_id = ps.id
JOIN currencies c ON p.currency_id = c.id
WHERE ps.name = 'FOR_SALE'
ORDER BY p.sale_price DESC
LIMIT 10;

-- Properties available for rent
SELECT p.property_number, p.property_name, p.rental_price_monthly, c.code
FROM properties p
JOIN property_statuses ps ON p.status_id = ps.id
JOIN currencies c ON p.currency_id = c.id
WHERE ps.name = 'FOR_RENT' AND p.rental_price_monthly IS NOT NULL
ORDER BY p.rental_price_monthly DESC
LIMIT 10;
```

### Advanced Queries

```sql
-- Properties with complete information
SELECT 
  p.property_number,
  p.property_name,
  pt.name as type,
  ps.name as status,
  r.display_name as region,
  fs.name as finishing,
  p.rooms_count,
  p.total_area,
  COALESCE(p.sale_price, p.rental_price_monthly) as price,
  c.code as currency
FROM properties p
LEFT JOIN property_types pt ON p.type_id = pt.id
LEFT JOIN property_statuses ps ON p.status_id = ps.id
LEFT JOIN regions r ON p.region_id = r.id
LEFT JOIN finishing_statuses fs ON p.finishing_status_id = fs.id
LEFT JOIN currencies c ON p.currency_id = c.id
WHERE p.type_id IS NOT NULL 
  AND p.status_id IS NOT NULL 
  AND p.region_id IS NOT NULL
LIMIT 100;

-- Properties needing data updates (missing info)
SELECT COUNT(*) as missing_type FROM properties WHERE type_id IS NULL;
SELECT COUNT(*) as missing_status FROM properties WHERE status_id IS NULL;
SELECT COUNT(*) as missing_region FROM properties WHERE region_id IS NULL;
SELECT COUNT(*) as missing_price FROM properties WHERE sale_price IS NULL AND rental_price_monthly IS NULL;

-- Top 10 most expensive properties
SELECT 
  p.property_number,
  p.property_name,
  pt.name as type,
  r.display_name as region,
  p.sale_price,
  c.code
FROM properties p
JOIN property_types pt ON p.type_id = pt.id
LEFT JOIN regions r ON p.region_id = r.id
JOIN currencies c ON p.currency_id = c.id
WHERE p.sale_price IS NOT NULL
ORDER BY p.sale_price DESC
LIMIT 10;

-- Properties by compound (Top 10)
SELECT 
  COALESCE(r.display_name, 'Unknown') as compound,
  COUNT(*) as property_count,
  AVG(p.sale_price) as avg_sale_price,
  AVG(p.rental_price_monthly) as avg_rental_price
FROM properties p
LEFT JOIN regions r ON p.region_id = r.id
GROUP BY r.display_name
HAVING property_count > 10
ORDER BY property_count DESC
LIMIT 10;

-- Recent properties (last 30 days)
SELECT 
  p.property_number,
  p.property_name,
  pt.name as type,
  ps.name as status,
  p.created_at
FROM properties p
JOIN property_types pt ON p.type_id = pt.id
JOIN property_statuses ps ON p.status_id = ps.id
WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY p.created_at DESC;
```

---

## 📋 Lookup Tables

### Property Categories
```sql
SELECT * FROM property_categories WHERE company_id = 'demo-tenant-1';
```
- RESIDENTIAL
- ADMIN
- COMMERCIAL
- CLINICS
- RESIDENTIAL_OFFICE
- MIXED_USE

### Property Types
```sql
SELECT * FROM property_types WHERE company_id = 'demo-tenant-1' ORDER BY name;
```
**Top Types:**
- APARTMENT_COMPOUND (2,933 properties)
- APARTMENT_OUT (2,258)
- STANDALONE_COMPOUND (1,457)
- OFFICE_SPACE (1,023)
- VILLA_OUT (721)
- TWIN_HOUSE (551)
- RETAIL (518)
- CHALET (458)

### Property Statuses
```sql
SELECT * FROM property_statuses WHERE company_id = 'demo-tenant-1';
```
**Active Statuses:**
- FOR_SALE (3,029 properties)
- FOR_RENT (5,619)
- SOLD_OUT (841)
- NOW_RENTED (1,941)
- HOLD (185)
- RECYCLE (620)

### Regions
```sql
SELECT * FROM regions WHERE company_id = 'demo-tenant-1' ORDER BY display_name;
```
**Major Regions:**
- West Golf (غرب الجولف)
- Katameya Heights
- Uptown Cairo
- Hyde Park
- Mivida
- Stella Heights (ستيلا هايتس)
- North Coast (الساحل الشمالي)
- New Cairo Sectors 1-3

---

## 🔧 Maintenance Tasks

### Update Missing Data

```sql
-- Find properties without type
SELECT property_number, property_name 
FROM properties 
WHERE type_id IS NULL 
LIMIT 10;

-- Find properties without status
SELECT property_number, property_name 
FROM properties 
WHERE status_id IS NULL 
LIMIT 10;

-- Find properties without region
SELECT property_number, property_name 
FROM properties 
WHERE region_id IS NULL 
LIMIT 10;
```

### Data Cleanup Examples

```sql
-- Update property status
UPDATE properties 
SET status_id = (SELECT id FROM property_statuses WHERE name = 'FOR_SALE' LIMIT 1)
WHERE property_number = 'PRO123';

-- Update property region
UPDATE properties 
SET region_id = (SELECT id FROM regions WHERE display_name = 'Hyde Park' LIMIT 1)
WHERE property_number = 'PRO123';

-- Update property price
UPDATE properties 
SET sale_price = 5000000, currency_id = (SELECT id FROM currencies WHERE code = 'EGP' LIMIT 1)
WHERE property_number = 'PRO123';
```

---

## 📦 Backup & Export

### Create Backup
```bash
# Full database backup
mysqldump -u root -pzerocall bitna > bitna_backup_$(date +%Y%m%d_%H%M%S).sql

# Properties table only
mysqldump -u root -pzerocall bitna properties > properties_backup_$(date +%Y%m%d_%H%M%S).sql

# With lookup tables
mysqldump -u root -pzerocall bitna properties property_types property_statuses regions finishing_statuses > property_data_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Export to CSV
```bash
# Export all properties
mysql -u root -pzerocall bitna -e "
SELECT 
  p.property_number,
  p.property_name,
  pt.name as type,
  ps.name as status,
  r.display_name as region,
  p.sale_price,
  p.rental_price_monthly,
  c.code as currency
FROM properties p
LEFT JOIN property_types pt ON p.type_id = pt.id
LEFT JOIN property_statuses ps ON p.status_id = ps.id
LEFT JOIN regions r ON p.region_id = r.id
LEFT JOIN currencies c ON p.currency_id = c.id
" | sed 's/\t/,/g' > properties_export_$(date +%Y%m%d).csv
```

---

## 🔗 Related Files

- `CSV_IMPORT_SUCCESS_SUMMARY.md` - Detailed import report
- `MIGRATION_SUCCESS_SUMMARY.md` - Database migration report
- `UNIFIED_PROPERTY_DATABASE_SCHEMA.sql` - Complete schema
- `seed_lookup_data.sql` - Lookup data seeding
- `import_properties.py` - Property import script
- `analyze_csv_data.py` - CSV analysis script
- `csv_analysis.json` - Complete analysis results

---

## 📞 Support

### Common Issues

**Q: How to find properties with missing information?**
```sql
SELECT COUNT(*) as missing_count, 
  'Missing Type' as issue 
FROM properties WHERE type_id IS NULL
UNION ALL
SELECT COUNT(*), 'Missing Status' FROM properties WHERE status_id IS NULL
UNION ALL
SELECT COUNT(*), 'Missing Region' FROM properties WHERE region_id IS NULL;
```

**Q: How to update multiple properties at once?**
```sql
-- Example: Mark all recycled properties as available
UPDATE properties p
JOIN property_statuses ps_old ON p.status_id = ps_old.id AND ps_old.name = 'RECYCLE'
SET p.status_id = (SELECT id FROM property_statuses WHERE name = 'FOR_SALE' LIMIT 1);
```

**Q: How to add a new region?**
```sql
INSERT INTO regions (id, name, display_name, description, company_id, is_active, sort_order, created_at, updated_at)
VALUES (UUID(), 'New Region Arabic', 'New Region English', 'Description', 'demo-tenant-1', 1, 99, NOW(), NOW());
```

---

## 🎯 Next Steps

1. **Property Images**
   - Import image references from CSV
   - Link to property_images table

2. **Additional Regions**
   - Add remaining 190+ regions from csv_analysis.json
   - Create district/neighborhood hierarchy

3. **Property Amenities**
   - Parse Unit Facilities from CSV
   - Link to amenities and features tables

4. **User Assignments**
   - Map Handler/Sales to user IDs
   - Track property ownership

5. **Compound Data**
   - Create compounds table
   - Link properties to specific compounds

---

**Database:** bitna  
**Tenant:** demo-tenant-1 (Demo Real Estate Company)  
**Updated:** January 29, 2025
