# Property Schema Migration Guide

## Overview

This migration replaces the existing property tables with a comprehensive, professional property management schema. **All other tables (tenants, users, leads, activities) remain unchanged.**

## ⚠️ Important Warnings

1. **Data Loss**: All existing property data will be **permanently deleted**
2. **Backup Required**: Always backup your database before running this migration
3. **Downtime**: The migration will cause temporary application downtime
4. **Testing**: Test thoroughly in a development environment first

## What Gets Replaced

### Tables Being Removed:
- `properties`
- `property_types`
- `regions`
- `categories`
- `listing_statuses`

### Tables Being Added (35+ new tables):

#### Location Hierarchy (4 tables):
- `regions` (enhanced)
- `districts` (new)
- `neighborhoods` (new)
- `compounds` (new)

#### Property Lookup Tables (15 tables):
- `property_categories`
- `property_types` (enhanced)
- `property_sub_categories`
- `property_statuses`
- `furnishing_statuses`
- `construction_statuses`
- `finishing_statuses`
- `property_conditions`
- `ownership_statuses`
- `view_types`
- `orientations`
- `currencies`
- `listing_purposes`
- `priority_levels`

#### Main Property Table:
- `properties` (comprehensive with 100+ fields)

#### Property Related Tables (6 tables):
- `property_images`
- `property_documents`
- `amenities`
- `property_amenities` (junction)
- `features`
- `property_features` (junction)
- `property_utilities`
- `property_distances`

#### Activity & Tracking (4 tables):
- `property_activities`
- `property_call_logs`
- `property_advertisements`
- `property_audit_logs`

### Tables Remaining Unchanged:
- ✅ `tenants` (unchanged)
- ✅ `users` (unchanged)
- ✅ `leads` (unchanged)
- ✅ `activities` (unchanged)

## New Property Table Features

The new `properties` table includes **100+ fields** organized in categories:

### Primary Identification
- Auto-generated property numbers (PROP-2025-000001)
- Property name and title

### Multi-tenant & Ownership
- Company isolation
- Created by / Updated by tracking

### Location
- 4-level hierarchy: Region → District → Neighborhood → Compound
- GPS coordinates
- Detailed address fields

### Physical Specifications
- 6 area types (total, built, usable, land, balcony, garden)
- Room counts (bedrooms, bathrooms, living rooms, kitchens)
- Building information (floors, year built, age)

### Pricing
- Sale price, monthly rent, yearly rent
- Price per square meter
- Deposit, service charges, maintenance fees
- Multi-currency support

### Payment Terms
- Installment options
- Down payment tracking
- Payment frequency

### Features (17 boolean flags)
- Elevator, garden, garage, swimming pool
- Gym, security system
- Utilities: electricity, water, gas, internet, landline, satellite TV
- Air conditioning, heating
- Balcony, terrace, storage

### Property Characteristics
- View type, orientation
- Corner unit, penthouse, duplex
- Furnished status
- Pet-friendly, smoking policies

### Legal & Documentation
- Title deed, registration numbers
- Tax ID
- Legal issues tracking

### Owner Information
- Name, contacts
- Owner type (individual/corporate/government)

### Management & Assignment
- Assigned handler
- Sales representative
- Property manager

### Marketing & Media
- SEO-friendly title and descriptions
- Virtual tour URL
- Video URL
- Brochure URL

### Marketing Flags
- Featured, hot deal, new listing
- Exclusive property
- Website/social media visibility

### Activity Tracking
- Last contact date
- Next follow-up date
- View count, inquiry count

### Status Flags
- Verified, published, archived, deleted

### Flexible Data
- Custom fields (JSON)
- Metadata (JSON)

## Migration Process

### Option 1: Automated Script (Recommended)

1. **Make the script executable:**
   ```bash
   cd /Users/ahmedgomaa/bitna/api
   chmod +x migrate_property_schema.sh
   ```

2. **Run the migration:**
   ```bash
   ./migrate_property_schema.sh
   ```

3. **Follow the prompts:**
   - The script will create a backup automatically
   - Confirm when prompted
   - Wait for completion

### Option 2: Manual Migration

1. **Backup your database:**
   ```bash
   mysqldump -u root -p bitna > bitna_backup_$(date +%Y%m%d).sql
   ```

2. **Apply the migration:**
   ```bash
   mysql -u root -p bitna < ./prisma/migrations/replace_property_schema.sql
   ```

3. **Verify the migration:**
   ```bash
   mysql -u root -p bitna -e "SHOW TABLES LIKE '%propert%';"
   ```

## Post-Migration Steps

### 1. Verify Tables
```sql
-- Check that all new tables exist
SHOW TABLES;

-- Check properties table structure
DESCRIBE properties;

-- Check sample lookup tables
DESCRIBE property_types;
DESCRIBE regions;
DESCRIBE districts;
```

### 2. Seed Default Data

The migration automatically inserts default currencies:
- USD, EUR, GBP, EGP, AED, SAR

You may want to add default values for:
- Property categories (Residential, Commercial, Industrial)
- Property types (Apartment, Villa, Office, etc.)
- Property statuses (Available, Sold, Rented, etc.)
- Regions for your area

Example seed data:
```sql
-- Add property categories
INSERT INTO property_categories (id, company_id, name, display_name, is_active, is_system) VALUES
(UUID(), NULL, 'RESIDENTIAL', 'Residential', true, true),
(UUID(), NULL, 'COMMERCIAL', 'Commercial', true, true),
(UUID(), NULL, 'INDUSTRIAL', 'Industrial', true, true);

-- Add property types for a specific tenant
INSERT INTO property_types (id, company_id, category_id, name, display_name, is_active) VALUES
(UUID(), 'your-tenant-id', 'residential-category-id', 'APARTMENT', 'Apartment', true),
(UUID(), 'your-tenant-id', 'residential-category-id', 'VILLA', 'Villa', true),
(UUID(), 'your-tenant-id', 'commercial-category-id', 'OFFICE', 'Office', true);

-- Add property statuses
INSERT INTO property_statuses (id, company_id, name, display_name, color, is_active) VALUES
(UUID(), 'your-tenant-id', 'AVAILABLE', 'Available', '#22c55e', true),
(UUID(), 'your-tenant-id', 'SOLD', 'Sold', '#ef4444', true),
(UUID(), 'your-tenant-id', 'RENTED', 'Rented', '#3b82f6', true);
```

### 3. Import Property Data

Prepare your property data CSV with the new structure and import using your preferred method.

Example minimal property insert:
```sql
INSERT INTO properties (
    id,
    property_number,
    property_name,
    company_id,
    created_by_id,
    title,
    description,
    sale_price,
    total_area,
    bedrooms_count,
    bathrooms_count,
    gps_latitude,
    gps_longitude,
    created_at,
    updated_at
) VALUES (
    UUID(),
    'PROP-2025-000001',
    'Beautiful Apartment',
    'your-tenant-id',
    'user-id',
    'Beautiful 3BR Apartment in Downtown',
    'Spacious apartment with modern amenities',
    250000.00,
    120.50,
    3,
    2,
    30.044420,
    31.235712,
    NOW(),
    NOW()
);
```

### 4. Update Application Code

Update your API endpoints to work with the new schema:

- Update property creation/update logic
- Add handlers for new lookup tables
- Implement property image upload
- Add document management endpoints
- Implement activity tracking

### 5. Test Thoroughly

- Create new properties
- Update existing properties (once imported)
- Test all lookup tables
- Verify multi-tenant isolation
- Test image uploads
- Test document management
- Check audit logs

## Rollback Procedure

If something goes wrong, you can restore from backup:

```bash
# Stop your application first

# Restore from backup
mysql -u root -p bitna < /path/to/backup/bitna_backup_YYYYMMDD_HHMMSS.sql

# Restart your application
```

## Database Schema Diagram

```
tenants (UNCHANGED)
  ├── users (UNCHANGED)
  ├── leads (UNCHANGED)
  ├── activities (UNCHANGED)
  │
  ├── regions (NEW)
  │   └── districts (NEW)
  │       └── neighborhoods (NEW)
  │           └── compounds (NEW)
  │
  ├── property_categories (NEW)
  │   └── property_types (ENHANCED)
  │       └── property_sub_categories (NEW)
  │
  ├── property_statuses (NEW)
  ├── furnishing_statuses (NEW)
  ├── construction_statuses (NEW)
  ├── finishing_statuses (NEW)
  │
  └── properties (COMPREHENSIVE)
      ├── property_images (NEW)
      ├── property_documents (NEW)
      ├── property_amenities (NEW)
      ├── property_features (NEW)
      ├── property_utilities (NEW)
      ├── property_distances (NEW)
      ├── property_activities (NEW)
      ├── property_call_logs (NEW)
      ├── property_advertisements (NEW)
      └── property_audit_logs (NEW)
```

## Performance Considerations

The new schema includes **50+ strategic indexes** for optimal query performance:

- Company ID indexes (multi-tenant filtering)
- Status and type indexes (filtering)
- Location indexes (geographic queries)
- Price range indexes (search)
- Date indexes (sorting)
- Foreign key indexes (joins)

## Support & Troubleshooting

### Common Issues

1. **Foreign key constraint errors:**
   - Ensure all tenant IDs exist in the tenants table
   - Ensure all user IDs exist in the users table

2. **Duplicate property numbers:**
   - The system auto-generates unique property numbers
   - Format: PROP-YYYY-NNNNNN (e.g., PROP-2025-000001)

3. **Missing lookup data:**
   - Seed default data for your tenant
   - Use the seed SQL examples above

4. **JSON field errors:**
   - Ensure MySQL version supports JSON (5.7.8+)
   - Use valid JSON format for custom_fields and metadata

### Getting Help

If you encounter issues:
1. Check the backup file exists
2. Review error messages in detail
3. Test queries manually in MySQL
4. Check foreign key constraints

## Migration Checklist

- [ ] Read this entire guide
- [ ] Test migration in development environment
- [ ] Backup production database
- [ ] Schedule maintenance window
- [ ] Run migration script
- [ ] Verify all tables created
- [ ] Seed default lookup data
- [ ] Import property data
- [ ] Update application code
- [ ] Test all functionality
- [ ] Monitor for errors
- [ ] Keep backup safe for 30 days

## File Locations

- Migration SQL: `/Users/ahmedgomaa/bitna/api/prisma/migrations/replace_property_schema.sql`
- Migration Script: `/Users/ahmedgomaa/bitna/api/migrate_property_schema.sh`
- Backup Directory: `/Users/ahmedgomaa/bitna/api/backups/`
- Schema Reference: `/Users/ahmedgomaa/bitna/UNIFIED_PROPERTY_DATABASE_SCHEMA.sql`

## Next Steps After Migration

1. ✅ Migration completed
2. Import your property data
3. Update Prisma schema (if using Prisma)
4. Update API endpoints
5. Update frontend components
6. Test thoroughly
7. Deploy to production

---

**Last Updated:** October 28, 2025  
**Version:** 1.0  
**Contact:** Your development team
