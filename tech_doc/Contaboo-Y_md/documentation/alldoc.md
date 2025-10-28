# Property Database Model Documentation

## Overview
This document explains the complete Property database model and all related tables in the Glomart CRM real estate management system. The model is designed to handle comprehensive property management with relationships, lookups, and audit trails.

## Core Property Model

### Main Property Table: `properties`
The central table that stores all property information.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                PROPERTIES TABLE                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│ Field Name              │ Type      │ Description                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id                      │ String    │ Primary Key (cuid)                        │
│ propertyNumber          │ String    │ Unique identifier (PROP-2025-001)        │
│ propertyName            │ String?   │ Display name of property                  │
│ companyId               │ String    │ Foreign Key → companies.id                │
│ createdById             │ String    │ Foreign Key → users.id (creator)         │
│ updatedById             │ String?   │ Foreign Key → users.id (last modifier)   │
│ createdAt               │ DateTime  │ Creation timestamp                        │
│ updatedAt               │ DateTime  │ Last update timestamp                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                           LOOKUP RELATIONSHIPS                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│ propertyTypeId          │ String?   │ FK → PropertyTypeLookup                   │
│ propertyCategoryId      │ String?   │ FK → PropertyCategoryLookup               │
│ propertySubCategoryId   │ String?   │ FK → PropertySubCategory                  │
│ propertyStatusId        │ String?   │ FK → PropertyStatus                       │
│ regionId                │ String?   │ FK → Region                               │
│ districtId              │ String?   │ FK → District                             │
│ neighborhoodId          │ String?   │ FK → Neighborhood                         │
│ compoundId              │ String?   │ FK → Compound                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                        PHYSICAL SPECIFICATIONS                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│ totalArea               │ Float?    │ Total area in square meters              │
│ builtArea               │ Float?    │ Built-up area                           │
│ usableArea              │ Float?    │ Usable living area                      │
│ landArea                │ Float?    │ Land plot area                          │
│ balconyArea             │ Float?    │ Balcony/terrace area                    │
│ roomsCount              │ Int?      │ Total number of rooms                   │
│ bedroomsCount           │ Int?      │ Number of bedrooms                      │
│ bathroomsCount          │ Int?      │ Number of bathrooms                     │
│ livingRoomsCount        │ Int?      │ Number of living rooms                  │
│ floorNumber             │ Int?      │ Floor level                             │
│ totalFloorsInBuilding   │ Int?      │ Total floors in building                │
│ parkingSpotsCount       │ Int?      │ Parking spaces                          │
│ builtYear               │ Int?      │ Year of construction                    │
│ propertyAge             │ Int?      │ Calculated age                          │
│ lastRenovationYear      │ Int?      │ Last renovation year                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                           LOCATION DETAILS                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ buildingName            │ String?   │ Building/complex name                    │
│ unitNumber              │ String?   │ Unit/apartment number                    │
│ address                 │ String?   │ Full address                            │
│ streetAddress           │ String?   │ Street address                          │
│ postalCode              │ String?   │ Postal/ZIP code                         │
│ gpsLatitude             │ Float?    │ GPS coordinates - latitude              │
│ gpsLongitude            │ Float?    │ GPS coordinates - longitude             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                           PRICING INFORMATION                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│ salePrice               │ Float?    │ Sale price                              │
│ rentalPriceMonthly      │ Float?    │ Monthly rental price                    │
│ rentalPriceYearly       │ Float?    │ Yearly rental price                     │
│ pricePerSqm             │ Float?    │ Price per square meter                  │
│ depositAmount           │ Float?    │ Security deposit                        │
│ serviceCharges          │ Float?    │ Monthly service charges                 │
│ maintenanceFee          │ Float?    │ Maintenance fees                        │
│ propertyTaxes           │ Float?    │ Property tax amount                     │
│ currencyId              │ String?   │ FK → Currency                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│                           PROPERTY FEATURES                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│ elevatorAvailable       │ Boolean?  │ Has elevator access                     │
│ gardenAvailable         │ Boolean?  │ Has garden/yard                         │
│ garageAvailable         │ Boolean?  │ Has garage                              │
│ swimmingPoolAccess      │ Boolean?  │ Swimming pool access                    │
│ electricityConnection   │ Boolean?  │ Electricity connected                   │
│ waterConnection         │ Boolean?  │ Water supply connected                  │
│ gasConnection           │ Boolean?  │ Gas connection available                │
│ internetConnection      │ Boolean?  │ Internet connectivity                   │
│ landlineConnection      │ Boolean?  │ Landline phone available               │
│ satelliteCableTV        │ Boolean?  │ Cable/satellite TV                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                          OWNERSHIP & LEGAL                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ titleDeedNumber         │ String?   │ Property title deed number              │
│ registrationNumber      │ String?   │ Government registration number          │
│ propertyTaxID           │ String?   │ Tax identification number               │
│ legalIssues             │ Boolean?  │ Has legal complications                 │
│ ownerName               │ String?   │ Property owner name                     │
│ ownerMobile             │ String?   │ Owner mobile number                     │
│ ownerTelephone          │ String?   │ Owner landline number                   │
│ ownerEmail              │ String?   │ Owner email address                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                          MANAGEMENT & ASSIGNMENT                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│ assignedHandlerId       │ String?   │ FK → users.id (assigned handler)        │
│ salesRepresentativeId   │ String?   │ FK → users.id (sales representative)    │
│ propertyManagerId       │ String?   │ FK → users.id (property manager)        │
│ emergencyContact        │ String?   │ Emergency contact information           │
│ maintenanceContact      │ String?   │ Maintenance contact details             │
├─────────────────────────────────────────────────────────────────────────────────┤
│                          MARKETING & MEDIA                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ description             │ String?   │ Property description                    │
│ specialInstructions     │ String?   │ Special viewing instructions            │
│ internalNotes           │ String?   │ Internal staff notes                    │
│ virtualTourUrl          │ String?   │ Virtual tour link                       │
│ videoUrl                │ String?   │ Property video link                     │
│ featuredProperty        │ Boolean?  │ Featured in listings                    │
│ websiteListing          │ Boolean?  │ Listed on website                       │
│ socialMediaPosted       │ Boolean?  │ Posted on social media                  │
│ virtualTourAvailable    │ Boolean?  │ Virtual tour available                  │
│ videoAvailable          │ Boolean?  │ Video available                         │
│ brochureAvailable       │ Boolean?  │ Brochure created                        │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Related Tables and Relationships

### 1. Property Type Classification

```
┌─────────────────────────────────────┐    ┌──────────────────────────────────────┐
│        PropertyTypeLookup           │    │      PropertyCategoryLookup         │
├─────────────────────────────────────┤    ├──────────────────────────────────────┤
│ id          │ String (PK)           │    │ id          │ String (PK)            │
│ name        │ String (APARTMENT)    │    │ name        │ String (RESIDENTIAL)   │
│ displayName │ String (Apartment)    │    │ displayName │ String (Residential)   │
│ description │ String?               │    │ description │ String?                │
│ isActive    │ Boolean               │    │ isActive    │ Boolean                │
│ createdAt   │ DateTime              │    │ createdAt   │ DateTime               │
│ updatedAt   │ DateTime              │    │ updatedAt   │ DateTime               │
└─────────────────────────────────────┘    └──────────────────────────────────────┘
              │                                         │
              └─────────┐           ┌─────────────────┘
                        │           │
                        ▼           ▼
              ┌─────────────────────────────────────┐
              │         PROPERTIES                  │
              │ propertyTypeId → PropertyTypeLookup │
              │ propertyCategoryId → PropertyCat... │
              └─────────────────────────────────────┘
```

### 2. Location Hierarchy

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Region    │    │  District   │    │Neighborhood │    │  Compound   │
├─────────────┤    ├─────────────┤    ├─────────────┤    ├─────────────┤
│ id (PK)     │    │ id (PK)     │    │ id (PK)     │    │ id (PK)     │
│ name        │    │ name        │    │ name        │    │ name        │
│ displayName │    │ displayName │    │ displayName │    │ displayName │
│ isActive    │    │ regionId FK │    │ districtId FK│   │ neighborhoodId│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │                  │
       └──────────────────┼──────────────────┼──────────────────┘
                          │                  │
                          ▼                  ▼
              ┌─────────────────────────────────────┐
              │         PROPERTIES                  │
              │ regionId → Region                   │
              │ districtId → District               │
              │ neighborhoodId → Neighborhood       │
              │ compoundId → Compound               │
              └─────────────────────────────────────┘
```

### 3. Property Status Management

```
┌─────────────────────────────────────┐
│          PropertyStatus             │
├─────────────────────────────────────┤
│ id          │ String (PK)           │
│ name        │ String (AVAILABLE)    │
│ displayName │ String (Available)    │
│ description │ String?               │
│ color       │ String (#22c55e)      │
│ isActive    │ Boolean               │
│ sortOrder   │ Int                   │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│         PROPERTIES                  │
│ propertyStatusId → PropertyStatus   │
└─────────────────────────────────────┘
```

### 4. User Management & Assignment

```
┌─────────────────────────────────────┐
│             Users                   │
├─────────────────────────────────────┤
│ id          │ String (PK)           │
│ name        │ String                │
│ email       │ String                │
│ roleId      │ String (FK)           │
│ companyId   │ String (FK)           │
└─────────────────────────────────────┘
              │
              ▼ (Multiple Relationships)
┌─────────────────────────────────────┐
│         PROPERTIES                  │
│ assignedHandlerId → Users           │
│ salesRepresentativeId → Users       │
│ propertyManagerId → Users           │
│ createdById → Users                 │
│ updatedById → Users                 │
└─────────────────────────────────────┘
```

### 5. Company Isolation

```
┌─────────────────────────────────────┐
│           Companies                 │
├─────────────────────────────────────┤
│ id          │ String (PK)           │
│ name        │ String                │
│ companyCode │ String (Unique)       │
│ ownerId     │ String (FK → Users)   │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│         PROPERTIES                  │
│ companyId → Companies               │
│ (Ensures data isolation)            │
└─────────────────────────────────────┘
```

## Data Flow and Relationships

### Property Creation Flow
```
1. User logs in → Authentication
2. Check company permissions → RBAC
3. Create property record → Properties table
4. Link to lookup tables → Foreign Keys
5. Log creation → Audit trail
6. Return property with relationships
```

### Property Retrieval Flow
```
1. GET /api/properties request
2. Extract user context → Company ID
3. Query properties table → Filter by companyId
4. Join with related tables → Get lookup data
5. Format response → Frontend display
6. Log access → Audit trail
```

## Current Issues and Solutions

### Issue 1: Model vs Table Mismatch
**Problem**: The Prisma model `Property` maps to table `properties` using `@@map("properties")`
**Solution**: Use consistent naming or proper mapping

### Issue 2: Required vs Optional Fields
**Problem**: Some lookup fields were required but data wasn't available
**Solution**: Made lookup fields optional (`String?`) to allow imports without complete data

### Issue 3: Import Process
**Problem**: 3000+ properties needed bulk import
**Solution**: Batch processing with raw SQL for performance

## Database Schema Relationships

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            COMPLETE RELATIONSHIP MAP                            │
└─────────────────────────────────────────────────────────────────────────────────┘

    Companies ──┐
                │
                ▼
    Users ────► Properties ◄──── PropertyTypeLookup
       │            │
       │            ├────────── PropertyCategoryLookup
       │            │
       │            ├────────── PropertyStatus
       │            │
       │            ├────────── Region
       │            │              │
       │            ├────────── District
       │            │              │
       │            ├────────── Neighborhood
       │            │              │
       │            ├────────── Compound
       │            │
       │            ├────────── Currency
       │            │
       │            └────────── (50+ other lookup tables)
       │
       └────────── PropertyAuditLog
                      │
                      ├────────── PropertyActivity
                      │
                      ├────────── PropertyCallLog
                      │
                      ├────────── PropertyImage
                      │
                      └────────── PropertyFeature
```

## Performance Considerations

### Indexing Strategy
- Primary keys on all tables (id)
- Unique constraints on propertyNumber, companyCode
- Composite indexes on (companyId, propertyStatusId)
- Foreign key indexes for joins

### Query Optimization
- Use raw SQL for complex queries
- Batch operations for bulk imports
- Limit result sets with pagination
- Cache lookup table data

## Security Model

### Data Isolation
- All queries filtered by `companyId`
- Users can only access their company's properties
- Role-based permissions for operations

### Audit Trail
- All property changes logged
- User actions tracked
- IP address and timestamp recorded
- Soft deletes for data recovery

## API Endpoints

```
GET    /api/properties          - List properties (paginated)
POST   /api/properties          - Create new property
GET    /api/properties/[id]     - Get single property
PUT    /api/properties/[id]     - Update property
DELETE /api/properties/[id]     - Delete property
POST   /api/properties/import   - Bulk import properties
GET    /api/properties/export   - Export properties to CSV
GET    /api/properties/lookups  - Get all lookup data
```

This comprehensive model supports:
- ✅ Multi-company tenancy
- ✅ Complex property relationships
- ✅ Bulk import/export
- ✅ Audit trails
- ✅ Role-based access
- ✅ Flexible lookups
- ✅ Performance optimization
# Property Database Visual Model

## Entity Relationship Diagram

```
                                    PROPERTY DATABASE MODEL
                                 ═══════════════════════════════
                                            
┌─────────────────┐                  ┌─────────────────────────────────────┐
│    Companies    │                  │             PROPERTIES              │
├─────────────────┤                  │          (Main Entity)              │
│ • id (PK)       │◄─────────────────┤ • id (PK)                          │
│ • name          │                  │ • propertyNumber (Unique)          │
│ • companyCode   │                  │ • propertyName                     │
│ • ownerId       │                  │ • companyId (FK → Companies)       │
└─────────────────┘                  │ • createdById (FK → Users)         │
                                     │ • updatedById (FK → Users)         │
┌─────────────────┐                  │ • createdAt                        │
│      Users      │                  │ • updatedAt                        │
├─────────────────┤                  │                                    │
│ • id (PK)       │◄─────────────────┤ PHYSICAL SPECS:                    │
│ • name          │                  │ • totalArea                        │
│ • email         │                  │ • builtArea                        │
│ • roleId        │                  │ • roomsCount                       │
│ • companyId     │                  │ • bedroomsCount                    │
└─────────────────┘                  │ • bathroomsCount                   │
                                     │ • floorNumber                      │
                                     │ • parkingSpotsCount                │
                                     │                                    │
                                     │ LOCATION:                          │
                                     │ • address                          │
                                     │ • streetAddress                    │
                                     │ • gpsLatitude                      │
                                     │ • gpsLongitude                     │
                                     │                                    │
                                     │ PRICING:                           │
                                     │ • salePrice                        │
                                     │ • rentalPriceMonthly              │
                                     │ • depositAmount                    │
                                     │ • serviceCharges                   │
                                     │                                    │
                                     │ FEATURES:                          │
                                     │ • elevatorAvailable               │
                                     │ • gardenAvailable                 │
                                     │ • swimmingPoolAccess              │
                                     │ • electricityConnection           │
                                     │ • internetConnection              │
                                     │                                    │
                                     │ OWNERSHIP:                         │
                                     │ • titleDeedNumber                 │
                                     │ • ownerName                       │
                                     │ • ownerMobile                     │
                                     │ • legalIssues                     │
                                     └─────────────────────────────────────┘
                                                         │
                                                         │
                                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              LOOKUP TABLES                                         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  │
│  │PropertyTypeLookup│  │PropertyCategory  │  │  PropertyStatus  │                  │
│  ├──────────────────┤  │     Lookup       │  ├──────────────────┤                  │
│  │• id (PK)         │  ├──────────────────┤  │• id (PK)         │                  │
│  │• name            │  │• id (PK)         │  │• name            │                  │
│  │• displayName     │  │• name            │  │• displayName     │                  │
│  │• description     │  │• displayName     │  │• color           │                  │
│  │• isActive        │  │• description     │  │• isActive        │                  │
│  └──────────────────┘  │• isActive        │  └──────────────────┘                  │
│           ▲             └──────────────────┘           ▲                           │
│           │                        ▲                   │                           │
│           │                        │                   │                           │
│           │                        │                   │                           │
│  ┌────────┼────────────────────────┼───────────────────┼────────┐                  │
│  │        │                        │                   │        │                  │
│  │  ┌─────▼──────┐  ┌──────────────▼──┐  ┌─────────────▼──┐     │                  │
│  │  │   Region   │  │    District     │  │  Neighborhood  │     │                  │
│  │  ├────────────┤  ├─────────────────┤  ├────────────────┤     │                  │
│  │  │• id (PK)   │  │• id (PK)        │  │• id (PK)       │     │                  │
│  │  │• name      │  │• name           │  │• name          │     │                  │
│  │  │• isActive  │  │• regionId (FK)  │  │• districtId(FK)│     │                  │
│  │  └────────────┘  └─────────────────┘  └────────────────┘     │                  │
│  │                                                              │                  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │                  │
│  │  │   Compound   │  │   Currency   │  │   PaymentType│       │                  │
│  │  ├──────────────┤  ├──────────────┤  ├──────────────┤       │                  │
│  │  │• id (PK)     │  │• id (PK)     │  │• id (PK)     │       │                  │
│  │  │• name        │  │• code        │  │• name        │       │                  │
│  │  │• neighborId  │  │• symbol      │  │• description │       │                  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘       │                  │
│  └─────────────────────────────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              RELATED ENTITIES                                      │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  │
│  │ PropertyImage    │  │ PropertyFeature  │  │ PropertyAmenity  │                  │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤                  │
│  │• id (PK)         │  │• id (PK)         │  │• id (PK)         │                  │
│  │• propertyId (FK) │  │• propertyId (FK) │  │• propertyId (FK) │                  │
│  │• imageUrl        │  │• featureName     │  │• amenityName     │                  │
│  │• caption         │  │• description     │  │• description     │                  │
│  │• sortOrder       │  │• isHighlight     │  │• isIncluded      │                  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘                  │
│                                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                  │
│  │PropertyCallLog   │  │PropertyActivity  │  │PropertyAuditLog  │                  │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤                  │
│  │• id (PK)         │  │• id (PK)         │  │• id (PK)         │                  │
│  │• propertyId (FK) │  │• propertyId (FK) │  │• propertyId (FK) │                  │
│  │• userId (FK)     │  │• userId (FK)     │  │• userId (FK)     │                  │
│  │• contactName     │  │• activityType    │  │• action          │                  │
│  │• phoneNumber     │  │• description     │  │• oldValue        │                  │
│  │• notes           │  │• scheduledDate   │  │• newValue        │                  │
│  │• callDuration    │  │• completedDate   │  │• ipAddress       │                  │
│  │• callResult      │  │• status          │  │• userAgent       │                  │
│  │• createdAt       │  │• createdAt       │  │• createdAt       │                  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Data Import Flow

```
CSV File (3000+ Properties)
         │
         ▼
┌─────────────────────────────────────┐
│      Import Process                 │
├─────────────────────────────────────┤
│ 1. Parse CSV data                   │
│ 2. Validate required fields        │
│ 3. Process in batches (50 records) │
│ 4. Generate propertyNumber         │
│ 5. Set default lookup values       │
│ 6. Create records in batches       │
│ 7. Log import results              │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      Properties Table               │
├─────────────────────────────────────┤
│ • 3000+ imported properties         │
│ • Linked to user's company          │
│ • Default lookup values assigned    │
│ • Audit trail created              │
└─────────────────────────────────────┘
```

## API Data Flow

```
Frontend Request
       │
       ▼
┌─────────────────────────────────────┐
│     Middleware Layer                │
├─────────────────────────────────────┤
│ • Authentication check              │
│ • Company isolation                 │
│ • Permission validation             │
│ • Rate limiting                     │
└─────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│     Database Query                  │
├─────────────────────────────────────┤
│ • Raw SQL for performance          │
│ • Company filter applied           │
│ • JOIN with lookup tables          │
│ • Pagination applied               │
└─────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│     Data Formatting                 │
├─────────────────────────────────────┤
│ • Format for frontend display      │
│ • Add default values               │
│ • Calculate derived fields         │
│ • Apply business logic             │
└─────────────────────────────────────┘
       │
       ▼
Frontend Display
```

## The Problem We Solved

### Before Fix:
```
Import API → Creates records in "properties" table
    ↓
Properties API → Tries to read from Prisma "Property" model
    ↓
Prisma model → Can't find the correct table mapping
    ↓
Frontend → Shows empty results (no properties found)
```

### After Fix:
```
Import API → Creates records in "properties" table
    ↓
Properties API → Uses raw SQL to read from "properties" table
    ↓
Database → Returns actual imported data
    ↓
Frontend → Shows 3000+ imported properties correctly
```

## Performance Optimizations

### Database Level:
- Indexes on frequently queried fields
- Composite indexes for multi-column searches
- Pagination to limit result sets
- Batch operations for bulk imports

### Application Level:
- Raw SQL for complex queries
- Caching of lookup table data
- Lazy loading of related entities
- Connection pooling

### Frontend Level:
- Virtual scrolling for large lists
- Search debouncing
- Optimistic updates
- Progressive loading

This model successfully handles:
✅ Your 3000+ imported properties
✅ Complex relationships and lookups
✅ Multi-company data isolation
✅ Performance at scale
✅ Comprehensive audit trails
# Property Database Visual Mapping & Architecture

## Overview
This document provides a comprehensive visual mapping of ALL 45 property-related tables in the Glomart CRM real estate management system, presented in drawing and diagram format for easy understanding of relationships and data flow.

## **Complete Database Architecture: 45 Property Tables**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      PROPERTY DATABASE ECOSYSTEM (45 TABLES)                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 1. Core Property Table Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                PROPERTIES TABLE                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│ Field Name              │ Type      │ Maps To                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id                      │ String    │ Primary Key (cuid)                        │
│ propertyNumber          │ String    │ PROP-2025-001 (Auto-generated)           │
│ companyId               │ String    │ FK → companies.id (Multi-tenant)          │
│ propertyTypeId          │ String?   │ FK → property_types                       │
│ propertyCategoryId      │ String?   │ FK → property_categories                  │
│ propertyStatusId        │ String?   │ FK → property_status                      │
│ regionId                │ String?   │ FK → regions                              │
│ districtId              │ String?   │ FK → districts                            │
│ createdById             │ String    │ FK → users.id                             │
│ assignedHandlerId       │ String?   │ FK → users.id                             │
│ salesRepresentativeId   │ String?   │ FK → users.id                             │
│ [50+ more fields...]    │ Various   │ Complete property specifications          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                        ┌─────────────────────────────────┐
                        │    @@map("properties")          │
                        └─────────────────────────────────┘
```

## 2. Property Type & Category Ecosystem (5 Tables)

```
┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│  PropertyTypeLookup  │    │PropertyCategoryLookup│    │ PropertySubCategory  │
├──────────────────────┤    ├──────────────────────┤    ├──────────────────────┤
│ id (PK)              │    │ id (PK)              │    │ id (PK)              │
│ name                 │    │ name                 │    │ name                 │
│ displayName          │    │ displayName          │    │ displayName          │
│ description          │    │ description          │    │ description          │
│ isActive             │    │ isActive             │    │ isActive             │
│ timestamps           │    │ timestamps           │    │ timestamps           │
└──────────────────────┘    └──────────────────────┘    └──────────────────────┘
         │                           │                           │
         ▼                           ▼                           ▼
    @@map("property_types")   @@map("property_categories") @@map("property_sub_categories")
         │                           │                           │
         └───────────────┐           │           ┌───────────────┘
                         │           │           │
                         ▼           ▼           ▼
                    ┌─────────────────────────────────┐
                    │         PROPERTIES              │
                    │ propertyTypeId ────────────────┐│
                    │ propertyCategoryId ────────────┼│
                    │ propertySubCategoryId ─────────┘│
                    └─────────────────────────────────┘

┌──────────────────────┐    ┌──────────────────────┐
│    CompoundType      │    │    PaymentType       │
├──────────────────────┤    ├──────────────────────┤
│ id (PK)              │    │ id (PK)              │
│ name                 │    │ name                 │
│ displayName          │    │ displayName          │
│ description          │    │ description          │
│ isActive             │    │ isActive             │
│ timestamps           │    │ timestamps           │
└──────────────────────┘    └──────────────────────┘
         │                           │
         ▼                           ▼
   @@map("compound_types")     @@map("payment_types")
         │                           │
         └───────┐           ┌───────┘
                 │           │
                 ▼           ▼
            ┌─────────────────────────────────┐
            │         PROPERTIES              │
            │ compoundId ─────────────────────│
            │ paymentTypeId ──────────────────│
            └─────────────────────────────────┘
```

## 3. Location Hierarchy System (2 Tables)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           GEOGRAPHIC HIERARCHY                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐                    ┌─────────────┐
│   Region    │                    │  District   │
├─────────────┤                    ├─────────────┤
│ id (PK)     │ ────────────────── │ id (PK)     │
│ name        │                    │ name        │
│ displayName │                    │ displayName │
│ description │                    │ regionId FK │ ◄─┐
│ isActive    │                    │ description │   │
│ timestamps  │                    │ isActive    │   │
└─────────────┘                    │ timestamps  │   │
      │                            └─────────────┘   │
      ▼                                   │          │
@@map("regions")                          ▼          │
      │                            @@map("districts") │
      │                                   │          │
      └─────────┐                 ┌───────┘          │
                │                 │                  │
                ▼                 ▼                  │
           ┌─────────────────────────────────┐       │
           │         PROPERTIES              │       │
           │ regionId ───────────────────────┼───────┘
           │ districtId ─────────────────────┤
           └─────────────────────────────────┘

                    Relationship Flow:
                Region (1) ──── (Many) District
                   │                    │
                   └──── (Many) Properties ◄────┘
```

## 4. Property Status & Condition Matrix (10 Tables)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        STATUS & CONDITION ECOSYSTEM                            │
└─────────────────────────────────────────────────────────────────────────────────┘

ROW 1: Core Status Tables
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ PropertyStatus   │ │ FinishedStatus   │ │PropertyCondition │ │ConstructionStatus│
├──────────────────┤ ├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)          │ │ id (PK)          │ │ id (PK)          │
│ name             │ │ name             │ │ name             │ │ name             │
│ displayName      │ │ displayName      │ │ displayName      │ │ displayName      │
│ description      │ │ description      │ │ description      │ │ description      │
│ color            │ │ isActive         │ │ isActive         │ │ isActive         │
│ isActive         │ │ timestamps       │ │ timestamps       │ │ timestamps       │
│ timestamps       │ └──────────────────┘ └──────────────────┘ └──────────────────┘
└──────────────────┘           │                   │                   │
         │                     ▼                   ▼                   ▼
         ▼              @@map("finished_status") @@map("property_conditions") @@map("construction_status")
@@map("property_status")       │                   │                   │
         │                     │                   │                   │
         └─────────────────────┼───────────────────┼───────────────────┘
                               │                   │
                               ▼                   ▼
                          ┌─────────────────────────────────┐
                          │         PROPERTIES              │
                          │ propertyStatusId ───────────────│
                          │ finishedStatusId ───────────────│
                          │ propertyConditionId ────────────│
                          │ constructionStatusId ───────────│
                          └─────────────────────────────────┘

ROW 2: Advanced Status Tables
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ FurnishingStatus │ │AvailabilityStatus│ │VerificationStatus│
├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)          │ │ id (PK)          │
│ name             │ │ name             │ │ name             │
│ displayName      │ │ displayName      │ │ displayName      │
│ description      │ │ description      │ │ description      │
│ isActive         │ │ color            │ │ isActive         │
│ timestamps       │ │ isActive         │ │ timestamps       │
└──────────────────┘ │ timestamps       │ └──────────────────┘
         │            └──────────────────┘           │
         ▼                     │                     ▼
@@map("furnishing_status")     ▼              @@map("verification_status")
         │            @@map("availability_status")    │
         └─────────────────────┼───────────────────────┘
                               │
                               ▼
                          ┌─────────────────────────────────┐
                          │         PROPERTIES              │
                          │ furnishingStatusId ─────────────│
                          │ availabilityStatusId ───────────│
                          │ verificationStatusId ───────────│
                          └─────────────────────────────────┘

ROW 3: Ownership & Record Status
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  RecordStatus    │ │ OwnershipStatus  │ │ MortgageStatus   │
├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)          │ │ id (PK)          │
│ name             │ │ name             │ │ name             │
│ displayName      │ │ displayName      │ │ displayName      │
│ description      │ │ description      │ │ description      │
│ isActive         │ │ isActive         │ │ isActive         │
│ timestamps       │ │ timestamps       │ │ timestamps       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
         │                     │                     │
         ▼                     ▼                     ▼
@@map("record_status") @@map("ownership_status") @@map("mortgage_status")
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                               ▼
                          ┌─────────────────────────────────┐
                          │         PROPERTIES              │
                          │ recordStatusId ─────────────────│
                          │ ownershipStatusId ──────────────│
                          │ mortgageStatusId ───────────────│
                          └─────────────────────────────────┘
```

## 5. Property Features & Specifications Network (11 Tables)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    FEATURES & SPECIFICATIONS ECOSYSTEM                         │
└─────────────────────────────────────────────────────────────────────────────────┘

VISUAL FEATURES GROUP:
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│    ViewType      │ │   Orientation    │ │ AirConditioningType│
├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)          │ │ id (PK)          │
│ name             │ │ name             │ │ name             │
│ displayName      │ │ displayName      │ │ displayName      │
│ description      │ │ description      │ │ description      │
│ isActive         │ │ isActive         │ │ isActive         │
│ timestamps       │ │ timestamps       │ │ timestamps       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
         │                     │                     │
         ▼                     ▼                     ▼
  @@map("view_types")   @@map("orientations")  @@map("air_conditioning_types")

SYSTEMS GROUP:
┌──────────────────┐ ┌──────────────────┐
│  HeatingSystem   │ │ SecuritySystem   │
├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)          │
│ name             │ │ name             │
│ displayName      │ │ displayName      │
│ description      │ │ description      │
│ isActive         │ │ isActive         │
│ timestamps       │ │ timestamps       │
└──────────────────┘ └──────────────────┘
         │                     │
         ▼                     ▼
@@map("heating_systems") @@map("security_systems")

POLICIES GROUP:
┌──────────────────┐ ┌──────────────────┐
│   PetPolicy      │ │ SmokingPolicy    │
├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)          │
│ name             │ │ name             │
│ displayName      │ │ displayName      │
│ description      │ │ description      │
│ isActive         │ │ isActive         │
│ timestamps       │ │ timestamps       │
└──────────────────┘ └──────────────────┘
         │                     │
         ▼                     ▼
  @@map("pet_policies")  @@map("smoking_policies")

OWNERSHIP & DATA GROUP:
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   OwnerType      │ │ InvestmentType   │ │  TargetMarket    │
├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)          │ │ id (PK)          │
│ name             │ │ name             │ │ name             │
│ displayName      │ │ displayName      │ │ displayName      │
│ description      │ │ description      │ │ description      │
│ isActive         │ │ isActive         │ │ isActive         │
│ timestamps       │ │ timestamps       │ │ timestamps       │
└──────────────────┘ └──────────────────┘ └──────────────────┘
         │                     │                     │
         ▼                     ▼                     ▼
  @@map("owner_types")  @@map("investment_types") @@map("target_markets")

┌──────────────────┐
│   DataSource     │
├──────────────────┤
│ id (PK)          │
│ name             │
│ displayName      │
│ description      │
│ isActive         │
│ timestamps       │
└──────────────────┘
         │
         ▼
 @@map("data_sources")

            ALL FEATURES CONNECT TO PROPERTIES:
                               │
                               ▼
                    ┌─────────────────────────────────┐
                    │         PROPERTIES              │
                    │ viewTypeId ─────────────────────│
                    │ orientationId ──────────────────│
                    │ airConditioningTypeId ──────────│
                    │ heatingSystemId ────────────────│
                    │ securitySystemId ───────────────│
                    │ petPolicyId ────────────────────│
                    │ smokingPolicyId ────────────────│
                    │ ownerTypeId ────────────────────│
                    │ investmentTypeId ───────────────│
                    │ targetMarketId ─────────────────│
                    │ dataSourceId ───────────────────│
                    └─────────────────────────────────┘
```

## 6. Business Management Tables (5 Tables)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        BUSINESS MANAGEMENT ECOSYSTEM                           │
└─────────────────────────────────────────────────────────────────────────────────┘

PRIORITY & MARKETING:
┌──────────────────┐ ┌──────────────────┐
│  PriorityLevel   │ │ MarketingPhase   │
├──────────────────┤ ├──────────────────┤
│ id (PK)          │ │ id (PK)          │
│ name             │ │ name             │
│ displayName      │ │ displayName      │
│ description      │ │ description      │
│ level (Int)      │ │ isActive         │
│ color            │ │ timestamps       │
│ isActive         │ └──────────────────┘
│ timestamps       │          │
└──────────────────┘          ▼
         │              @@map("marketing_phases")
         ▼                     │
@@map("priority_levels")       │
         │                     │
         └─────────────────────┘

RENTAL & PAYMENT TERMS:
┌─────────────────────┐ ┌──────────────────┐
│MinimumRentalPeriod  │ │ PaymentSchedule  │
├─────────────────────┤ ├──────────────────┤
│ id (PK)             │ │ id (PK)          │
│ name                │ │ name             │
│ displayName         │ │ displayName      │
│ periodInDays (Int)  │ │ description      │
│ description         │ │ isActive         │
│ isActive            │ │ timestamps       │
│ timestamps          │ └──────────────────┘
└─────────────────────┘          │
         │                       ▼
         ▼               @@map("payment_schedules")
@@map("minimum_rental_periods")   │
         │                       │
         └───────────────────────┘

LISTING PURPOSE:
┌──────────────────┐
│ ListingPurpose   │
├──────────────────┤
│ id (PK)          │
│ name             │
│ displayName      │
│ description      │
│ isActive         │
│ timestamps       │
└──────────────────┘
         │
         ▼
@@map("listing_purposes")

            ALL CONNECT TO PROPERTIES:
                               │
                               ▼
                    ┌─────────────────────────────────┐
                    │         PROPERTIES              │
                    │ priorityLevelId ────────────────│
                    │ marketingPhaseId ───────────────│
                    │ minimumRentalPeriodId ──────────│
                    │ paymentScheduleId ──────────────│
                    │ listingPurposeId ───────────────│
                    └─────────────────────────────────┘
```

## 7. Property Detail & Relationship Tables (6 Tables)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     PROPERTY DETAILS & RELATIONSHIPS                           │
└─────────────────────────────────────────────────────────────────────────────────┘

VISUAL CONTENT:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            PropertyImage                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ imageUrl              │              │
│ altText             │ displayOrder       │ isActive              │              │
│ timestamps          │                                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                            @@map("property_images")
                                      │
                                      ▼
                            ┌─────────────────────┐
                            │     PROPERTIES      │ ◄──── One-to-Many
                            │ id (PK)             │
                            └─────────────────────┘

FEATURES & AMENITIES:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PropertyFeature                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ featureType           │              │
│ value               │ description        │ isActive              │              │
│ timestamps          │                                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                            @@map("property_features")

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PropertyAmenity                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ amenityType           │              │
│ available           │ description        │ isActive              │              │
│ timestamps          │                                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                            @@map("property_amenities")

UTILITIES & SERVICES:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PropertyUtility                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ utilityType           │              │
│ available           │ connectionStatus   │ provider              │              │
│ accountNumber       │ monthlyFee         │ notes                 │              │
│ timestamps          │                                                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│ Utility Types: ELECTRICITY, WATER, GAS, INTERNET, LANDLINE, SATELLITE_TV       │
│ Connection Status: CONNECTED, AVAILABLE, NOT_AVAILABLE                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                            @@map("property_utilities")

LOCATION DISTANCES:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          PropertyDistance                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ locationType          │              │
│ distance (Float KM) │ travelTime (Int)   │ transportMode         │              │
│ notes               │ timestamps                                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│ Location Types: METRO, AIRPORT, HOSPITAL, SCHOOL, MALL, MOSQUE, BANK, RESTAURANT│
│ Transport Modes: WALKING, DRIVING, PUBLIC_TRANSPORT                            │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                            @@map("property_distances")

CALL LOGS & COMMUNICATION:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PropertyCallLog                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ callType              │              │
│ notes               │ duration           │ createdBy (FK)        │              │
│ timestamps          │                                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                            @@map("property_call_logs")

            ALL DETAIL TABLES RELATIONSHIP FLOW:
                                      │
                                      ▼
                            ┌─────────────────────┐
                            │     PROPERTIES      │
                            │ id (PK)             │ ◄──── One-to-Many with:
                            │                     │       • PropertyImage
                            │                     │       • PropertyFeature
                            │                     │       • PropertyAmenity
                            │                     │       • PropertyUtility
                            │                     │       • PropertyDistance
                            │                     │       • PropertyCallLog
                            └─────────────────────┘
```

## 8. Activity & Management Tables (5 Tables)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                       ACTIVITY & MANAGEMENT ECOSYSTEM                          │
└─────────────────────────────────────────────────────────────────────────────────┘

MARKETING & ADVERTISING:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        PropertyAdvertisement                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ platform              │              │
│ adType              │ startDate          │ endDate               │              │
│ cost                │ status             │ createdBy (FK)        │              │
│ timestamps          │                                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                          @@map("property_advertisements")

ACTIVITY TRACKING:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          PropertyActivity                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ activityType          │              │
│ description         │ createdBy (FK)     │ timestamps            │              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                          @@map("property_activities")

AUDIT SYSTEM:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          PropertyAuditLog                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ action                │              │
│ changedFields       │ oldValues          │ newValues             │              │
│ userId (FK)         │ timestamps                                               │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                          @@map("property_audit_logs")

PERSONNEL MANAGEMENT:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          PropertyManager                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ managerId (FK)        │              │
│ assignedDate        │ isActive           │ notes                 │              │
│ timestamps          │                                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                          @@map("property_managers")

┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PropertyAgent                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│ id (PK)             │ propertyId (FK)    │ agentId (FK)          │              │
│ assignedDate        │ commission         │ isActive              │              │
│ notes               │ timestamps                                               │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                          @@map("property_agents")

            MANAGEMENT RELATIONSHIP FLOW:
                                      │
                                      ▼
                            ┌─────────────────────┐
                            │     PROPERTIES      │
                            │ id (PK)             │ ◄──── One-to-Many with:
                            │                     │       • PropertyAdvertisement
                            │                     │       • PropertyActivity
                            │                     │       • PropertyAuditLog
                            │                     │       • PropertyManager
                            │                     │       • PropertyAgent
                            └─────────────────────┘
```

## 9. Complete Database Relationship Map

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    COMPLETE PROPERTY DATABASE ECOSYSTEM                        │
│                              (45 TABLES TOTAL)                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    USERS
                                      │
                                      ▼
                 ┌────────────────────────────────────────────────────────┐
                 │                                                        │
                 ▼                    COMPANIES                           ▼
    ┌─────────────────────┐              │                   ┌─────────────────────┐
    │   PROPERTY TYPES    │              ▼                   │   PROPERTY STATUS   │
    │ (5 TABLES)          │    ┌─────────────────────┐       │ (10 TABLES)         │
    │ • PropertyType      │    │                     │       │ • PropertyStatus    │
    │ • PropertyCategory  │    │     PROPERTIES      │       │ • FinishedStatus    │
    │ • PropertySubCat    │────│    (CORE TABLE)     │◄──────│ • PropertyCondition │
    │ • CompoundType      │    │                     │       │ • ConstructionStat  │
    │ • PaymentType       │    │   @@map("properties")│      │ • FurnishingStatus  │
    └─────────────────────┘    │                     │       │ • AvailabilityStatus│
                               └─────────────────────┘       │ • VerificationStatus│
                                         │                   │ • RecordStatus      │
                                         │                   │ • OwnershipStatus   │
                  ┌──────────────────────┼──────────────────────────────────────── │ • MortgageStatus    │
                  │                      │                   └─────────────────────┘
                  ▼                      │
    ┌─────────────────────┐              │                   ┌─────────────────────┐
    │   LOCATION TABLES   │              │                   │ FEATURES & SPECS    │
    │ (2 TABLES)          │              │                   │ (11 TABLES)         │
    │ • Region            │──────────────┤                   │ • ViewType          │
    │ • District          │              │                   │ • Orientation       │
    └─────────────────────┘              │                   │ • AirConditioningType│
                                         │                   │ • HeatingSystem     │
                                         │                   │ • SecuritySystem    │
                  ┌──────────────────────┼──────────────────────────────────────── │ • PetPolicy         │
                  │                      │                   │ • SmokingPolicy     │
                  ▼                      │                   │ • OwnerType         │
    ┌─────────────────────┐              │                   │ • InvestmentType    │
    │ BUSINESS MANAGEMENT │              │                   │ • TargetMarket      │
    │ (5 TABLES)          │              │                   │ • DataSource        │
    │ • PriorityLevel     │──────────────┤                   └─────────────────────┘
    │ • MarketingPhase    │              │
    │ • MinRentalPeriod   │              │
    │ • PaymentSchedule   │              │                   ┌─────────────────────┐
    │ • ListingPurpose    │              │                   │ PROPERTY DETAILS    │
    └─────────────────────┘              │                   │ (6 TABLES)          │
                                         │                   │ • PropertyImage     │
                                         │                   │ • PropertyFeature   │
                                         ▼                   │ • PropertyAmenity   │
                            ┌─────────────────────┐          │ • PropertyUtility   │
                            │  DETAIL RELATIONS   │◄─────────│ • PropertyDistance  │
                            │   (One-to-Many)     │          │ • PropertyCallLog   │
                            └─────────────────────┘          └─────────────────────┘
                                         │
                                         ▼
                            ┌─────────────────────┐
                            │ ACTIVITY & MGMT     │
                            │ (5 TABLES)          │
                            │ • PropertyAds       │
                            │ • PropertyActivity  │
                            │ • PropertyAuditLog  │
                            │ • PropertyManager   │
                            │ • PropertyAgent     │
                            └─────────────────────┘

                        DATA FLOW DIRECTION:
                      Lookups → Properties ← Details
                         ▲          │           ▲
                         │          ▼           │
                    Relationships  Activities  Management
```

## 10. Database Performance & Architecture Summary

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         PERFORMANCE ARCHITECTURE                               │
└─────────────────────────────────────────────────────────────────────────────────┘

INDEXING STRATEGY:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  PRIMARY KEYS   │    │ FOREIGN KEYS    │    │ COMPOSITE INDEX │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ All tables have │    │ propertyId in   │    │ (companyId,     │
│ CUID primary    │    │ detail tables   │    │  propertyStatus)│
│ keys for fast   │    │ companyId in    │    │ for filtered    │
│ lookups         │    │ main table      │    │ queries         │
└─────────────────┘    └─────────────────┘    └─────────────────┘

QUERY OPTIMIZATION:
┌─────────────────────────────────────────────────────────────────────────────────┐
│ • Raw SQL for complex joins (35+ table relationships)                          │
│ • Batch processing for bulk imports (50 properties per batch)                  │
│ • Pagination for large result sets                                             │
│ • Lookup table caching (isActive filtering)                                    │
│ • Cascade deletes for data integrity                                           │
└─────────────────────────────────────────────────────────────────────────────────┘

SECURITY MODEL:
┌─────────────────────────────────────────────────────────────────────────────────┐
│ • Multi-tenant isolation via companyId filtering                               │
│ • Role-based access control (RBAC)                                             │
│ • Audit trail for all property changes                                         │
│ • Soft deletes with isActive flags                                             │
│ • User action tracking in audit logs                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Summary: 45-Table Property Management System

This visual mapping shows the complete architecture of your property management database with **45 interconnected tables** providing:

✅ **Complete Property Lifecycle Management**
✅ **29 Lookup Tables for Detailed Classification**  
✅ **6 Detail Tables for Property Information**
✅ **5 Activity Tables for Tracking & Management**
✅ **Multi-Company Tenant Isolation**
✅ **Comprehensive Audit Trail**
✅ **Advanced Search & Filtering Capabilities**
✅ **Business Intelligence Support**
✅ **Scalable Architecture for Large Portfolios**

The database supports everything from basic property listings to advanced enterprise features like marketing campaign tracking, utility management, distance mapping, and complete audit trails - making it a comprehensive real estate management solution.
