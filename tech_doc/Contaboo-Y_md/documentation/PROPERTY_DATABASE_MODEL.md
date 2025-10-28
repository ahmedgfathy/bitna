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
