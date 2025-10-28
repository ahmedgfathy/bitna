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
