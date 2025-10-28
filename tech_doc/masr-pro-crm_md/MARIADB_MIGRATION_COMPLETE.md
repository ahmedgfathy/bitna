# MariaDB Migration Complete ✅

## Overview
Successfully migrated the Masr Pro CRM from Lovable's managed Supabase (PostgreSQL) to local MariaDB server.

## Migration Summary

### 1. Database Created
- **Database Name**: `masr_pro_crm`
- **Server**: MariaDB 12.0.2
- **Charset**: utf8mb4_unicode_ci
- **Location**: localhost (root/zerocall)

### 2. Tables Created (22 Total)

#### Core CRM Tables (9)
1. **profiles** - User profiles
2. **user_roles** - User role assignments
3. **static_data** - Master data/lookups
4. **leads** - Lead management
5. **events** - Calendar events
6. **notes** - Notes system
7. **documents** - Document management
8. **audit_logs** - Audit trail
9. **import_mapping_templates** - CSV import mappings

#### Properties Module - Lookup Tables (8)
10. **property_types** - Property categories (17 types seeded)
11. **property_statuses** - Status options (6 statuses seeded)
12. **finishing_types** - Finishing options (8 types seeded)
13. **floor_types** - Floor levels (15 types seeded)
14. **usage_types** - Usage categories (6 types seeded)
15. **offered_by_types** - Offering party (5 types seeded)
16. **areas** - Geographic areas
17. **compounds** - Compound/development names

#### Properties Module - Main & Junction Tables (5)
18. **properties** - Main properties table
19. **property_status_mapping** - Many-to-many: properties ↔ statuses
20. **property_floors** - Many-to-many: properties ↔ floors
21. **property_usage_types** - Many-to-many: properties ↔ usage types
22. **property_leads** - Many-to-many: properties ↔ leads

### 3. Seed Data Inserted (57 Records)
- **Property Types**: 17 (Apartment-Compound, Villa, Duplex, Penthouse, Office, etc.)
- **Property Statuses**: 6 (For Sale, For Rent, Sold Out, Rented, Hold, Recycle)
- **Finishing Types**: 8 (Fully Finished, Semi Finished, Lux, Super Lux, etc.)
- **Floor Types**: 15 (Basement, Ground, 1st-10th, Roof, Penthouse)
- **Usage Types**: 6 (Residential, Administrative, Commercial, Mixed, etc.)
- **Offered By Types**: 5 (Owner, Property Guard, Developer, etc.)

### 4. PostgreSQL → MariaDB Conversions

| PostgreSQL Feature | MariaDB Equivalent | Status |
|-------------------|-------------------|--------|
| ENUM types | ENUM or VARCHAR with CHECK | ✅ Converted |
| UUID type | CHAR(36) with UUID() | ✅ Converted |
| JSONB type | JSON | ✅ Converted |
| TEXT[] arrays | JSON arrays | ✅ Converted |
| TIMESTAMP WITH TIME ZONE | TIMESTAMP | ✅ Converted |
| gen_random_uuid() | UUID() | ✅ Converted |
| RLS Policies | Application-level security | ⚠️ To be implemented in app |

### 5. Files Created

#### Database Files
- `/mariadb_migration.sql` - Complete schema migration
- `.env` - Updated with MariaDB credentials

#### Integration Files
- `/src/integrations/mariadb/client.ts` - Database connection pool & helpers
- `/src/integrations/mariadb/types.ts` - TypeScript type definitions
- `/src/integrations/mariadb/services/propertyService.ts` - Property CRUD operations

### 6. NPM Packages Installed
```bash
npm install mysql2
```

### 7. Environment Variables
```env
# MariaDB Configuration
VITE_DB_HOST="localhost"
VITE_DB_USER="root"
VITE_DB_PASSWORD="zerocall"
VITE_DB_NAME="masr_pro_crm"
```

## Next Steps

### Immediate (Required)
1. **Update Properties.tsx** to use MariaDB instead of Supabase
2. **Test property listing** with MariaDB connection
3. **Implement authentication** (Supabase Auth still works via API, or implement JWT)
4. **Update all existing pages** (Leads, Events, Notes, Documents) to use MariaDB

### Short Term
5. **Build PropertyDetails component** (view/edit with 6 tabs)
6. **Build AddProperty component** (form with all fields)
7. **Build ImportProperties dialog** (CSV mapping for 129K properties)
8. **Import Property.csv data** into database

### Medium Term
9. **Implement RLS at application level** (user permissions/access control)
10. **Add audit logging** for all CRUD operations
11. **Test all CRUD operations** across all modules
12. **Performance optimization** (indexes, caching)

## API Usage Examples

### Using Property Service
```typescript
import { propertyService } from '@/integrations/mariadb/services/propertyService';

// Get paginated properties
const { data, total } = await propertyService.getProperties({
  page: 1,
  limit: 12,
  search: 'apartment',
  propertyTypeId: 'some-uuid',
  areaId: 'some-uuid',
});

// Get single property
const property = await propertyService.getPropertyById('property-uuid');

// Get lookup data
const types = await propertyService.getPropertyTypes();
const statuses = await propertyService.getPropertyStatuses();
const areas = await propertyService.getAreas();

// Create property
const newId = await propertyService.createProperty({
  property_number: 'P-2025-001',
  property_type_id: 'type-uuid',
  area_id: 'area-uuid',
  total_price: 5000000,
  currency: 'EGP',
  rooms: 3,
  description: 'Beautiful apartment',
  owner_name: 'Ahmed Gomaa',
  mobile_no: '+20123456789',
  created_by: 'user-uuid',
});

// Update property
await propertyService.updateProperty('property-uuid', {
  total_price: 5500000,
  rooms: 4,
  last_modified_by: 'user-uuid',
});

// Delete property
await propertyService.deleteProperty('property-uuid');
```

### Direct SQL Queries
```typescript
import { query, queryOne, insert, execute } from '@/integrations/mariadb/client';

// Query multiple rows
const leads = await query<Lead>('SELECT * FROM leads WHERE status = ?', ['new']);

// Query single row
const lead = await queryOne<Lead>('SELECT * FROM leads WHERE id = ?', [leadId]);

// Insert
const newId = await insert('INSERT INTO areas (name) VALUES (?)', ['New Cairo']);

// Update/Delete
const affected = await execute('UPDATE leads SET status = ? WHERE id = ?', ['contacted', leadId]);
```

## Database Schema Highlights

### Properties Table (40+ Fields)
- Full property details (number, type, area, pricing)
- Location details (compound, building, unit, phase)
- Dimensions (building size, land area, space per meter)
- Features (rooms, finishing, floors, usage types)
- Owner information (name, mobile, telephone, WhatsApp)
- Media (images JSON array, PDF links, location map)
- Assignment (sales person, handler)
- Follow-ups (last follow date, reminder date/time)
- Notes (description, unit features, facilities, updates)
- Audit fields (created_by, last_modified_by, timestamps)

### Junction Tables for Many-to-Many
- **property_status_mapping**: One property can have multiple statuses (For Sale AND For Rent)
- **property_floors**: One property can span multiple floors
- **property_usage_types**: One property can have mixed usage (Residential + Administrative)
- **property_leads**: Track which leads viewed which properties with interest level

## Verification Commands

```bash
# Check all tables
mysql -u root -pzerocall masr_pro_crm -e "SHOW TABLES;"

# Check property types seed data
mysql -u root -pzerocall masr_pro_crm -e "SELECT name_en FROM property_types ORDER BY display_order;"

# Check property statuses
mysql -u root -pzerocall masr_pro_crm -e "SELECT name_en, color FROM property_statuses;"

# Check database size
mysql -u root -pzerocall masr_pro_crm -e "SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)' FROM information_schema.TABLES WHERE table_schema = 'masr_pro_crm' ORDER BY (data_length + index_length) DESC;"
```

## Migration Status

| Component | Status | Notes |
|-----------|--------|-------|
| Database Schema | ✅ Complete | All 22 tables created |
| Seed Data | ✅ Complete | 57 lookup records inserted |
| Type Definitions | ✅ Complete | Full TypeScript types |
| Database Client | ✅ Complete | Connection pool with helpers |
| Property Service | ✅ Complete | CRUD operations ready |
| Environment Config | ✅ Complete | .env updated |
| Properties UI | ⏳ Pending | Need to update to use MariaDB |
| Authentication | ⏳ Pending | Need to implement |
| Other Modules | ⏳ Pending | Leads, Events, Notes, Documents |
| CSV Import | ⏳ Pending | 129K properties to import |

## Success Criteria Met ✅

1. ✅ MariaDB 12.0.2 connected successfully
2. ✅ Database `masr_pro_crm` created with proper charset
3. ✅ All 22 tables created with proper structure
4. ✅ Foreign key constraints in place
5. ✅ Indexes created on frequently queried fields
6. ✅ Seed data for all lookup tables
7. ✅ TypeScript types matching database schema
8. ✅ Connection pool with query helpers
9. ✅ Property service with CRUD operations
10. ✅ JSON handling for arrays (images, tags)
11. ✅ UUID generation using MariaDB UUID()
12. ✅ Timestamp auto-update on modifications

## Known Differences from Supabase

1. **Row Level Security (RLS)**: Not available in MariaDB - must implement in application layer
2. **Realtime Subscriptions**: Not available - would need WebSockets or polling
3. **Storage API**: Supabase Storage still can be used, or implement file storage separately
4. **Auth API**: Supabase Auth can still be used via API, or implement JWT-based auth
5. **PostgREST Auto API**: Not available - created custom service layer instead
6. **Automatic API Documentation**: Not available - document APIs manually

## Performance Optimizations Applied

1. **Connection Pooling**: 10 connection limit, reuse connections
2. **Indexes**: Created on all foreign keys and frequently queried fields
3. **Proper Data Types**: DECIMAL for money, ENUM for fixed choices
4. **JSON for Arrays**: Single field vs multiple rows (property_images)
5. **Junction Tables**: Efficient many-to-many relationships
6. **Timestamps**: Auto-update on modification

## Backup Recommendation

```bash
# Backup database
mysqldump -u root -pzerocall masr_pro_crm > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
mysql -u root -pzerocall masr_pro_crm < backup_20250113_120000.sql
```

---

**Migration Completed**: January 13, 2025  
**Database Version**: MariaDB 12.0.2  
**Total Tables**: 22  
**Total Seed Records**: 57  
**Status**: ✅ Ready for application integration
