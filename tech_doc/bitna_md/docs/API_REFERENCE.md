# Contaboo API Reference

## Base URL
```
http://localhost:3000
```

---

## Authentication

**Note:** Authentication endpoints will be implemented in the next phase (OTP-based login).

For now, routes requiring authentication will need the following in the request:
- Mock user object with `tenantId`, `id`, `role`

---

## Public Endpoints (No Authentication)

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Contaboo API is running",
  "timestamp": "2025-10-28T12:00:00.000Z"
}
```

---

### Database Connection Test
```http
GET /db-test
```

**Response:**
```json
{
  "status": "connected",
  "message": "Database connection successful",
  "database": "contaboo"
}
```

---

### Get Public Properties
```http
GET /api/properties/public
```

**Query Parameters:**
- `propertyTypeId` (optional) - Filter by property type
- `regionId` (optional) - Filter by region
- `categoryId` (optional) - Filter by category
- `minPrice` (optional) - Minimum price
- `maxPrice` (optional) - Maximum price

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "Modern Villa in New Cairo",
      "description": "5-bedroom villa with pool",
      "price": "8000000.00",
      "latitude": "30.0264",
      "longitude": "31.4949",
      "bedrooms": 5,
      "bathrooms": 4,
      "area": "450.00",
      "isPublic": true,
      "propertyType": { "name": "Villa" },
      "region": { "name": "New Cairo" },
      "category": { "name": "For Sale" }
    }
  ],
  "count": 1
}
```

---

### Get Nearby Properties
```http
GET /api/properties/nearby
```

**Query Parameters:**
- `latitude` (required) - User's latitude
- `longitude` (required) - User's longitude
- `radius` (optional) - Search radius in km (default: 10)

**Response:**
```json
{
  "status": "success",
  "data": [...],
  "count": 5
}
```

---

## Protected Endpoints (Require Authentication)

### Properties

#### Get Tenant's Properties
```http
GET /api/properties
Headers: Authorization: Bearer {token}
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "Luxury Downtown Apartment",
      "price": "2500000.00",
      "isPublic": false,
      "createdBy": { "name": "Fatima Ahmed" },
      "propertyType": { "name": "Apartment" },
      "region": { "name": "Downtown" }
    }
  ],
  "count": 10
}
```

---

#### Create Property
```http
POST /api/properties
Headers: Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Beautiful Apartment",
  "description": "3-bedroom apartment",
  "price": 2500000,
  "latitude": 30.0444,
  "longitude": 31.2357,
  "address": "123 Street, Cairo",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 180,
  "propertyTypeId": "uuid",
  "regionId": "uuid",
  "categoryId": "uuid"
}
```

**Response:**
```json
{
  "status": "success",
  "data": { /* property object */ }
}
```

---

#### Toggle Property Visibility
```http
PATCH /api/properties/:id/visibility
Headers: Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "isPublic": true
}
```

**Response:**
```json
{
  "status": "success",
  "data": { /* updated property */ },
  "message": "Property is now public"
}
```

---

### Leads

#### Get Tenant's Leads
```http
GET /api/leads
Headers: Authorization: Bearer {token}
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "John Smith",
      "mobile": "+201111111111",
      "email": "john@example.com",
      "source": "WEBSITE",
      "status": "NEW",
      "assignedTo": { "name": "Fatima Ahmed" }
    }
  ],
  "count": 5
}
```

---

#### Get My Assigned Leads
```http
GET /api/leads/my-leads
Headers: Authorization: Bearer {token}
```

Returns only leads assigned to the authenticated user.

---

#### Create Lead
```http
POST /api/leads
Headers: Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "John Smith",
  "mobile": "+201111111111",
  "email": "john@example.com",
  "source": "WEBSITE",
  "status": "NEW",
  "notes": "Interested in apartments",
  "assignedToId": "user-uuid"
}
```

---

### Users

#### Get Tenant's Users
```http
GET /api/users
Headers: Authorization: Bearer {token}
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "name": "Sarah Johnson",
      "mobile": "+201098765432",
      "role": "OWNER",
      "isActive": true
    }
  ],
  "count": 4
}
```

---

#### Add Employee (Owner Only)
```http
POST /api/users/employee
Headers: Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Omar Hassan",
  "mobile": "+201234567893",
  "role": "EMPLOYEE"
}
```

**Roles:** `MANAGER` or `EMPLOYEE`

---

### Static Data (Dropdowns)

#### Get Property Types
```http
GET /api/static/property-types
Headers: Authorization: Bearer {token}
```

**Response:**
```json
{
  "status": "success",
  "data": [
    { "id": "uuid", "name": "Apartment", "isActive": true },
    { "id": "uuid", "name": "Villa", "isActive": true }
  ]
}
```

---

#### Create Property Type (Owner/Manager Only)
```http
POST /api/static/property-types
Headers: Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Penthouse"
}
```

---

#### Get Regions
```http
GET /api/static/regions
```

#### Create Region (Owner/Manager Only)
```http
POST /api/static/regions
```

#### Get Categories
```http
GET /api/static/categories
```

#### Create Category (Owner/Manager Only)
```http
POST /api/static/categories
```

#### Get Listing Statuses
```http
GET /api/static/listing-statuses
```

#### Create Listing Status (Owner/Manager Only)
```http
POST /api/static/listing-statuses
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "status": "error",
  "message": "Insufficient permissions",
  "requiredRole": ["OWNER"],
  "yourRole": "EMPLOYEE"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Enums

### TenantType
- `FREELANCER`
- `COMPANY`

### UserRole
- `OWNER`
- `MANAGER`
- `EMPLOYEE`

### SubscriptionStatus
- `TRIAL`
- `ACTIVE`
- `SUSPENDED`
- `CANCELLED`

### LeadStatus
- `NEW`
- `CONTACTED`
- `QUALIFIED`
- `NEGOTIATING`
- `WON`
- `LOST`

### LeadSource
- `WEBSITE`
- `REFERRAL`
- `SOCIAL_MEDIA`
- `DIRECT_CALL`
- `WALK_IN`
- `OTHER`

---

## Next Phase: OTP Authentication

The next development phase will add:
- `POST /api/auth/request-otp` - Request OTP via SMS
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token
- `POST /api/auth/register` - Register new tenant + owner
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Invalidate token
