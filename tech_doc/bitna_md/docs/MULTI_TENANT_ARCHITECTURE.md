# Contaboo Multi-Tenant Architecture Documentation

## 🏗️ Database Schema Overview

### Core Principle: Single Database, Tenant Isolation via `tenantId`

Every table that contains tenant-specific data includes a `tenantId` column. All queries must filter by `tenantId` to ensure complete data isolation between tenants.

---

## 📊 Schema Models

### 1. **Tenant**
Represents a subscriber (freelancer or company).

**Fields:**
- `id` - UUID primary key
- `name` - Tenant name (company or freelancer name)
- `mobile` - Primary contact number (unique globally)
- `type` - FREELANCER | COMPANY
- `subscriptionStatus` - TRIAL | ACTIVE | SUSPENDED | CANCELLED
- `subscriptionStart/End` - Subscription period
- `isActive` - Soft delete flag

**Relations:**
- One tenant → Many users, properties, leads, and static data

---

### 2. **User**
Represents owners, managers, and employees within a tenant.

**Fields:**
- `id` - UUID primary key
- `name` - User name
- `mobile` - Phone number for OTP login (unique globally)
- `role` - OWNER | MANAGER | EMPLOYEE
- `tenantId` - Foreign key to tenant
- `isActive` - Account status

**Roles:**
- **OWNER**: Full control, can manage subscription and employees
- **MANAGER**: Can manage static data (dropdowns) and properties
- **EMPLOYEE**: Can manage assigned properties and leads only

**Authentication:**
- Users authenticate via mobile number + OTP only
- No email/password authentication

---

### 3. **Property**
Represents real estate listings.

**Fields:**
- `id` - UUID primary key
- `title`, `description`, `price`
- `latitude`, `longitude`, `address` - Location data
- `bedrooms`, `bathrooms`, `area` - Property details
- `isPublic` - Boolean (controls public visibility)
- `tenantId` - Foreign key to tenant
- `createdById` - Foreign key to user who created it
- Foreign keys to static data: `propertyTypeId`, `regionId`, `categoryId`, `listingStatusId`

**Public Visibility:**
- When `isPublic = true`, the property appears on public listings
- Controlled by the ❤️ toggle in the UI
- Only owner/manager can toggle public visibility

**Location Queries:**
- Use `latitude` and `longitude` for proximity searches
- Implement bounding box filtering for performance

---

### 4. **Lead**
Represents potential customers.

**Fields:**
- `id` - UUID primary key
- `name`, `mobile`, `email`
- `source` - WEBSITE | REFERRAL | SOCIAL_MEDIA | etc.
- `status` - NEW | CONTACTED | QUALIFIED | NEGOTIATING | WON | LOST
- `notes` - Text notes
- `tenantId` - Foreign key to tenant
- `assignedToId` - Foreign key to user (optional)

**Assignment:**
- Leads can be assigned to specific employees
- Employees can only see their own assigned leads (unless owner/manager)

---

## 🎯 Tenant-Scoped Static Data (Dropdowns)

These tables provide customizable dropdown values **per tenant**.

### Why Tenant-Scoped?
- Each company defines their own property types, regions, categories
- Prevents conflicts between tenants
- Enables better filtering and statistics
- Owner/Manager can customize to their business needs

### Models:

#### **PropertyType**
Examples: Apartment, Villa, Office, Land
- Each tenant has their own list
- Used in property forms and filters

#### **Region**
Examples: Downtown, New Cairo, 6th October
- Geographical areas defined by tenant
- Can be neighborhoods, districts, or cities

#### **Category**
Examples: For Sale, For Rent, Commercial
- Business categories defined by tenant
- Can be "Residential", "Commercial", "Industrial", etc.

#### **ListingStatus**
Examples: Available, Under Offer, Sold, Rented
- Current status of the property
- Customizable per tenant's workflow

### Common Pattern:
```prisma
model PropertyType {
  id       String   @id @default(uuid())
  name     String
  tenantId String   // Isolates data per tenant
  tenant   Tenant   @relation(...)
  isActive Boolean  @default(true)
  
  @@unique([tenantId, name]) // Prevent duplicates within tenant
}
```

---

## 🔒 Access Control

### Middleware: `tenantIsolation`

**Purpose:** Ensures all queries are automatically scoped to the authenticated user's tenant.

**How it works:**
1. Extracts `tenantId` from authenticated user
2. Attaches it to `req.tenantId`
3. All database queries must include `where: { tenantId }`

**Example:**
```typescript
router.get('/properties', tenantIsolation, async (req, res) => {
  const properties = await prisma.property.findMany({
    where: { tenantId: req.tenantId } // CRITICAL!
  });
});
```

### Role-Based Access Control

**Middleware:** `requireRole()`, `requireOwner`, `requireOwnerOrManager`

**Usage:**
```typescript
// Only owners can add employees
router.post('/users/employee', tenantIsolation, requireOwner, handler);

// Only owners/managers can create static data
router.post('/static/regions', tenantIsolation, requireOwnerOrManager, handler);
```

---

## 📍 Location-Based Queries

### Finding Nearby Properties

**Use Case:** Public users want to see properties near them.

**Implementation:**
```typescript
// Bounding box approach (fast)
const latDelta = radiusKm / 111; // 1 degree ≈ 111km
const lonDelta = radiusKm / (111 * Math.cos(lat * Math.PI / 180));

await prisma.property.findMany({
  where: {
    isPublic: true,
    latitude: { gte: lat - latDelta, lte: lat + latDelta },
    longitude: { gte: lon - lonDelta, lte: lon + lonDelta },
  }
});
```

**For Production:**
Consider using PostGIS or MySQL spatial extensions for precise distance calculations.

---

## 🎨 Public vs Private Properties

### Private Properties (`isPublic = false`)
- Only visible to users within the same tenant
- Used for internal listings not yet ready for public

### Public Properties (`isPublic = true`)
- Visible to everyone (anonymous users)
- Appear on the public website/app
- Toggled via the ❤️ icon in UI

### Toggle Visibility:
```typescript
await prisma.property.update({
  where: { 
    id: propertyId,
    tenantId: userTenantId // Ensure tenant owns the property
  },
  data: { isPublic: true }
});
```

---

## 🔑 Key Security Principles

1. **Always filter by `tenantId`** in queries
2. **Never trust client-provided `tenantId`** - always use authenticated user's tenant
3. **Validate ownership** before updates/deletes
4. **Mobile numbers must be unique globally**
5. **Use middleware consistently** on all protected routes

---

## 📈 Common Query Patterns

### Get tenant's properties
```typescript
await prisma.property.findMany({
  where: { tenantId },
  include: { propertyType: true, region: true }
});
```

### Get public properties only
```typescript
await prisma.property.findMany({
  where: { isPublic: true },
  include: { propertyType: true, region: true }
});
```

### Get user's assigned leads
```typescript
await prisma.lead.findMany({
  where: { 
    assignedToId: userId,
    tenantId // CRITICAL for isolation
  }
});
```

### Get tenant's dropdown data
```typescript
await prisma.propertyType.findMany({
  where: { tenantId, isActive: true },
  orderBy: { name: 'asc' }
});
```

---

## 🚀 Next Steps

After this schema is deployed, the next phase will include:

1. **OTP Authentication System**
   - Mobile-based login
   - OTP generation and verification
   - JWT token management

2. **Tenant Registration Flow**
   - Subscribe as freelancer or company
   - Create initial owner user
   - Set up default static data

3. **Subscription Management**
   - Payment integration
   - Trial period handling
   - Subscription renewal/cancellation

4. **Mobile App Integration**
   - Connect React Native app to API
   - Implement authentication flow
   - Build property browsing screens

---

## 📝 Summary

This architecture provides:
✅ Complete tenant isolation
✅ Flexible role-based access control
✅ Customizable dropdown data per tenant
✅ Public/private property visibility control
✅ Location-based property discovery
✅ Scalable foundation for a multi-tenant SaaS

The schema is designed to handle thousands of tenants in a single database while maintaining security and performance.
