# 🔧 API FIXES AND TESTING GUIDE

**Date:** October 29, 2025  
**Status:** ⚠️ **REQUIRES IMMEDIATE ATTENTION**

---

## 🚨 CRITICAL ISSUES IDENTIFIED

### Issue 1: GitHub Push Blocked - Large File
**Error:** `File all_databases_backup.sql is 206.07 MB; exceeds GitHub's file size limit of 100.00 MB`

**✅ FIXED:**
- Removed `all_databases_backup.sql` from Git tracking
- Compressed to `all_databases_backup.sql.gz` (32MB, 84% reduction)
- Updated `.gitignore` to exclude large SQL backups
- Added backup files to `.gitignore`

### Issue 2: Prisma Schema Mismatch - CRITICAL
**Error:** 
```
Invalid `prisma.property.findMany()` invocation
The column `bitna.properties.price` does not exist in the current database.
```

**Root Cause:**
- **Database:** Has new unified schema with `sale_price`, `rental_price_monthly`, `type_id`, `status_id`, etc.
- **Prisma Schema:** Still uses old schema with single `price` field
- **Service Layer:** References old field names

**Impact:** 🔴 **HIGH** - All property API endpoints are broken

---

## 🛠️ REQUIRED FIXES

### Priority 1: Update Prisma Schema (BLOCKING)

The `api/prisma/schema.prisma` file needs to be completely rewritten to match the new unified database schema.

#### Current Wrong Model:
```prisma
model Property {
  id          String  @id @default(uuid())
  title       String
  description String? @db.Text
  price       Decimal @db.Decimal(15, 2)  // ❌ DOES NOT EXIST
  isPublic    Boolean @default(false)      // ❌ DOES NOT EXIST
  bedrooms    Int?                         // ❌ WRONG NAME
  bathrooms   Int?                         // ❌ WRONG NAME
  area        Decimal? @db.Decimal(10, 2) // ❌ WRONG NAME
  
  tenantId    String   // ❌ WRONG NAME (should be company_id)
  tenant      Tenant   // ❌ WRONG RELATION
  
  propertyTypeId    String?     // ❌ WRONG NAME (should be type_id)
  regionId          String?     // ❌ OK but missing relations
  categoryId        String?     // ❌ OK but missing relations
  listingStatusId   String?     // ❌ WRONG NAME (should be status_id)
}
```

#### Required New Model:
```prisma
model Property {
  id                      String   @id @default(uuid())
  company_id              String
  company                 Company  @relation(fields: [company_id], references: [id], onDelete: Cascade)
  
  // Identification
  property_number         String?
  property_name           String?
  title                   String?
  description             String?  @db.Text
  
  // Classification (Foreign Keys)
  category_id             String?
  type_id                 String?
  status_id               String?
  sub_category_id         String?
  
  // Relations
  category                PropertyCategory?     @relation(fields: [category_id], references: [id])
  type                    PropertyType?         @relation(fields: [type_id], references: [id])
  status                  PropertyStatus?       @relation(fields: [status_id], references: [id])
  sub_category            PropertySubCategory?  @relation(fields: [sub_category_id], references: [id])
  
  // Pricing (IMPORTANT: Two separate fields!)
  sale_price              Decimal? @db.Decimal(15, 2)
  rental_price_monthly    Decimal? @db.Decimal(15, 2)
  rental_price_yearly     Decimal? @db.Decimal(15, 2)
  price_per_meter         Decimal? @db.Decimal(15, 2)
  currency_id             String?
  currency                Currency? @relation(fields: [currency_id], references: [id])
  
  // Size & Layout (use correct column names!)
  land_area               Decimal? @db.Decimal(10, 2)
  built_area              Decimal? @db.Decimal(10, 2)
  total_area              Decimal? @db.Decimal(10, 2)
  garden_area             Decimal? @db.Decimal(10, 2)
  
  bedrooms_count          Int?
  bathrooms_count         Int?
  rooms_count             Int?
  living_rooms_count      Int?
  floor_number            String?  // VARCHAR for Arabic text
  total_floors            Int?
  
  // Location Hierarchy
  region_id               String?
  district_id             String?
  neighborhood_id         String?
  compound_id             String?
  address                 String?  @db.Text
  
  region                  Region?       @relation(fields: [region_id], references: [id])
  district                District?     @relation(fields: [district_id], references: [id])
  neighborhood            Neighborhood? @relation(fields: [neighborhood_id], references: [id])
  compound                Compound?     @relation(fields: [compound_id], references: [id])
  
  // Coordinates
  latitude                Decimal? @db.Decimal(10, 8)
  longitude               Decimal? @db.Decimal(11, 8)
  
  // Status Flags (replace isPublic with multiple flags)
  is_active               Boolean  @default(true)
  is_available            Boolean  @default(true)
  is_featured             Boolean  @default(false)
  is_verified             Boolean  @default(false)
  
  // Finishing & Condition
  finishing_status_id     String?
  finishing_status        FinishingStatus? @relation(fields: [finishing_status_id], references: [id])
  
  construction_status_id  String?
  construction_status     ConstructionStatus? @relation(fields: [construction_status_id], references: [id])
  
  furnishing_status_id    String?
  furnishing_status       FurnishingStatus? @relation(fields: [furnishing_status_id], references: [id])
  
  property_condition_id   String?
  property_condition      PropertyCondition? @relation(fields: [property_condition_id], references: [id])
  
  ownership_status_id     String?
  ownership_status        OwnershipStatus? @relation(fields: [ownership_status_id], references: [id])
  
  // View & Orientation
  view_type_id            String?
  view_type               ViewType? @relation(fields: [view_type_id], references: [id])
  
  orientation_id          String?
  orientation             Orientation? @relation(fields: [orientation_id], references: [id])
  
  // Additional Info
  year_built              Int?
  delivery_date           DateTime?
  listing_purpose_id      String?
  listing_purpose         ListingPurpose? @relation(fields: [listing_purpose_id], references: [id])
  
  priority_level_id       String?
  priority_level          PriorityLevel? @relation(fields: [priority_level_id], references: [id])
  
  // Owner
  owner_name              String?
  owner_phone             String?
  owner_email             String?
  owner_mobile            String?
  
  // Relations (One-to-Many)
  images                  PropertyImage[]
  documents               PropertyDocument[]
  amenities               PropertyAmenity[]
  features                PropertyFeature[]
  utilities               PropertyUtility[]
  distances               PropertyDistance[]
  activities              PropertyActivity[]
  call_logs               PropertyCallLog[]
  advertisements          PropertyAdvertisement[]
  audit_logs              PropertyAuditLog[]
  
  // Metadata
  created_at              DateTime @default(now())
  updated_at              DateTime @updatedAt
  deleted_at              DateTime?
  
  @@index([company_id])
  @@index([type_id])
  @@index([status_id])
  @@index([category_id])
  @@index([region_id])
  @@index([is_active])
  @@index([is_available])
  @@index([property_number])
  @@map("properties")
}
```

#### Additional Required Models:
```prisma
model Company {
  id              String   @id @default(uuid())
  name            String
  company_code    String   @unique
  email           String?
  phone           String?
  is_active       Boolean  @default(true)
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  
  properties      Property[]
  property_types  PropertyType[]
  regions         Region[]
  // ... other relations
  
  @@map("companies")
}

model PropertyCategory {
  id          String     @id @default(uuid())
  company_id  String
  name        String
  description String?    @db.Text
  is_active   Boolean    @default(true)
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
  
  properties  Property[]
  
  @@index([company_id])
  @@map("property_categories")
}

model PropertyType {
  id          String     @id @default(uuid())
  company_id  String
  name        String
  description String?    @db.Text
  is_active   Boolean    @default(true)
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
  
  properties  Property[]
  
  @@index([company_id])
  @@map("property_types")
}

model PropertyStatus {
  id          String     @id @default(uuid())
  company_id  String
  name        String
  color       String?
  description String?    @db.Text
  is_active   Boolean    @default(true)
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
  
  properties  Property[]
  
  @@index([company_id])
  @@map("property_statuses")
}

model Region {
  id           String     @id @default(uuid())
  company_id   String
  name         String
  display_name String?
  description  String?    @db.Text
  is_active    Boolean    @default(true)
  sort_order   Int        @default(0)
  created_at   DateTime   @default(now())
  updated_at   DateTime   @updatedAt
  
  properties   Property[]
  districts    District[]
  
  @@index([company_id])
  @@map("regions")
}

model District {
  id          String     @id @default(uuid())
  company_id  String
  region_id   String?
  name        String
  is_active   Boolean    @default(true)
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
  
  region      Region?    @relation(fields: [region_id], references: [id])
  properties  Property[]
  neighborhoods Neighborhood[]
  
  @@index([company_id])
  @@index([region_id])
  @@map("districts")
}

model FinishingStatus {
  id          String     @id @default(uuid())
  company_id  String
  name        String
  description String?    @db.Text
  is_active   Boolean    @default(true)
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
  
  properties  Property[]
  
  @@index([company_id])
  @@map("finishing_statuses")
}

model Currency {
  id          String     @id @default(uuid())
  company_id  String
  code        String     // EGP, USD, EUR
  name        String     // Egyptian Pound, US Dollar
  symbol      String     // £, $, €
  is_active   Boolean    @default(true)
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
  
  properties  Property[]
  
  @@index([company_id])
  @@map("currencies")
}

// Add all other lookup tables from UNIFIED_PROPERTY_DATABASE_SCHEMA.sql
```

---

## 🔄 MIGRATION STEPS

### Step 1: Introspect Existing Database
```bash
cd /Users/ahmedgomaa/bitna/api
npx prisma db pull
```

This will generate a Prisma schema from your actual MySQL database.

### Step 2: Review Generated Schema
```bash
cat prisma/schema.prisma
```

Check if it matches the new unified schema structure.

### Step 3: Generate Prisma Client
```bash
npx prisma generate
```

This creates the TypeScript types and client for the new schema.

### Step 4: Update Service Layer

The `database.service.ts` needs updates in multiple places:

#### Fix `getPropertiesByTenant` (Line 168)
**Current (BROKEN):**
```typescript
export const getPropertiesByTenant = async (tenantId: string) => {
  return await prisma.property.findMany({
    where: { tenantId },  // ❌ Field doesn't exist
    include: {
      propertyType: true,  // ❌ Relation doesn't exist
      region: true,
      category: true,
      listingStatus: true,  // ❌ Should be 'status'
      createdBy: {  // ❌ Relation doesn't exist
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },  // ❌ Should be 'created_at'
  });
};
```

**Required Fix:**
```typescript
export const getPropertiesByTenant = async (companyId: string) => {
  return await prisma.property.findMany({
    where: { company_id: companyId },
    include: {
      type: true,           // Include property type
      status: true,         // Include property status
      category: true,       // Include category
      region: true,         // Include region
      district: true,       // Include district
      compound: true,       // Include compound
      finishing_status: true,
      currency: true,
      images: {
        orderBy: { display_order: 'asc' },
        take: 5
      }
    },
    orderBy: { created_at: 'desc' },
  });
};
```

#### Fix `getPublicProperties` (Line 194)
**Current (BROKEN):**
```typescript
export const getPublicProperties = async (filters?: {
  propertyTypeId?: string;
  regionId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return await prisma.property.findMany({
    where: {
      isPublic: true,  // ❌ Field doesn't exist
      ...(filters?.propertyTypeId && { propertyTypeId: filters.propertyTypeId }),
      ...(filters?.minPrice && { price: { gte: filters.minPrice } }),  // ❌ Field doesn't exist
      ...(filters?.maxPrice && { price: { lte: filters.maxPrice } }),  // ❌ Field doesn't exist
    },
    // ...
  });
};
```

**Required Fix:**
```typescript
export const getPublicProperties = async (filters?: {
  typeId?: string;
  regionId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return await prisma.property.findMany({
    where: {
      is_active: true,
      is_available: true,
      ...(filters?.typeId && { type_id: filters.typeId }),
      ...(filters?.regionId && { region_id: filters.regionId }),
      ...(filters?.categoryId && { category_id: filters.categoryId }),
      ...(filters?.minPrice && {
        OR: [
          { sale_price: { gte: filters.minPrice } },
          { rental_price_monthly: { gte: filters.minPrice } }
        ]
      }),
      ...(filters?.maxPrice && {
        OR: [
          { sale_price: { lte: filters.maxPrice } },
          { rental_price_monthly: { lte: filters.maxPrice } }
        ]
      }),
    },
    include: {
      type: true,
      status: true,
      category: true,
      region: true,
      finishing_status: true,
      images: { take: 1 }
    },
    orderBy: { created_at: 'desc' },
  });
};
```

#### Fix Property Creation
Update any `createProperty` functions to use new field names:
```typescript
export const createProperty = async (data: {
  company_id: string;
  property_name?: string;
  title?: string;
  description?: string;
  type_id?: string;
  status_id?: string;
  category_id?: string;
  sale_price?: number;
  rental_price_monthly?: number;
  total_area?: number;
  bedrooms_count?: number;
  bathrooms_count?: number;
  region_id?: string;
  district_id?: string;
  address?: string;
  is_active?: boolean;
  is_available?: boolean;
  // ... other fields
}) => {
  return await prisma.property.create({
    data: data,
    include: {
      type: true,
      status: true,
      category: true,
      region: true,
    }
  });
};
```

---

## 🧪 TESTING CHECKLIST

### Database Connection
- [ ] Database connection works
- [ ] Can query properties table
- [ ] Lookup tables accessible

### Prisma Schema
- [ ] Schema introspected successfully
- [ ] Prisma client generated
- [ ] TypeScript types available
- [ ] No compilation errors

### API Endpoints
- [ ] `GET /api/properties` returns properties
- [ ] Properties include nested relations (type, status, region)
- [ ] `sale_price` and `rental_price_monthly` returned correctly
- [ ] `GET /api/properties/:id` returns single property
- [ ] `POST /api/properties` creates property
- [ ] `PUT /api/properties/:id` updates property
- [ ] `DELETE /api/properties/:id` deletes property

### Lookup Endpoints (Need to be created)
- [ ] `GET /api/property-types` returns types
- [ ] `GET /api/property-statuses` returns statuses
- [ ] `GET /api/regions` returns regions
- [ ] `GET /api/finishing-statuses` returns finishing statuses
- [ ] `GET /api/currencies` returns currencies

### Frontend Integration
- [ ] Mobile app can fetch properties
- [ ] Properties display with correct data
- [ ] Type, status, region names show correctly
- [ ] Prices display correctly (sale vs rental)
- [ ] Property detail screen works

---

## 📋 QUICK FIX COMMANDS

### Fix Git Push Issue (DONE)
```bash
cd /Users/ahmedgomaa/bitna
git rm --cached all_databases_backup.sql
gzip -9 all_databases_backup.sql
git add .gitignore
git commit -m "Remove large SQL backup, use compressed version"
git push origin main
```

### Fix Prisma Schema
```bash
cd /Users/ahmedgomaa/bitna/api

# Backup current schema
cp prisma/schema.prisma prisma/schema.prisma.backup

# Introspect database to get actual schema
npx prisma db pull

# Generate Prisma client
npx prisma generate

# Check for errors
npx tsc --noEmit
```

### Test API
```bash
cd /Users/ahmedgomaa/bitna/api

# Start API server
npm run dev

# In another terminal, test endpoints
curl http://localhost:3000/api/properties

# Should return properties with new schema
```

---

## 🚨 IMMEDIATE ACTION REQUIRED

1. **Run Prisma introspection** to update schema from database
2. **Update service layer** with correct field names
3. **Test API endpoints** to ensure they work
4. **Update frontend API calls** if needed
5. **Create lookup table endpoints** for dropdowns

---

## 📞 SUPPORT

**Schema Reference:**
- Database: `/Users/ahmedgomaa/bitna/UNIFIED_PROPERTY_DATABASE_SCHEMA.sql`
- Frontend Types: `/Users/ahmedgomaa/bitna/mobile/src/types/property.ts`
- Integration Guide: `/Users/ahmedgomaa/bitna/COMPLETE_INTEGRATION_GUIDE.md`

**Next Steps:**
1. Fix Prisma schema (CRITICAL)
2. Update service layer
3. Test API endpoints
4. Update frontend integration

---

**Status:** ⚠️ **REQUIRES IMMEDIATE ATTENTION**  
**Priority:** 🔴 **HIGH - API BROKEN**  
**Date:** October 29, 2025
