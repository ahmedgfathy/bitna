# Lead Table Structure Documentation

## Overview
This document describes the structure of the `leads` table in the Contaboo Real Estate CRM database.

## Database Information
- **Database**: Supabase PostgreSQL
- **Table Name**: `leads`
- **Purpose**: Store potential customer information and track lead progression through the sales funnel

## Table Structure

### Primary Fields

| Field Name | Data Type | Description | Required | Notes |
|------------|-----------|-------------|----------|-------|
| `id` | UUID | Primary key, unique identifier | ✅ | Auto-generated |
| `company_id` | UUID | Foreign key to companies table | ✅ | Multi-tenant support |
| `created_by` | UUID | Foreign key to users table (lead creator) | ✅ | Tracks who created the lead |
| `assigned_to` | UUID | Foreign key to users table (assigned agent) | ❌ | Current agent handling the lead |

### Personal Information

| Field Name | Data Type | Description | Required | Notes |
|------------|-----------|-------------|----------|-------|
| `first_name` | VARCHAR | Lead's first name | ❌ | Required in app validation |
| `last_name` | VARCHAR | Lead's last name | ❌ | Optional in current implementation |
| `email` | VARCHAR | Email address | ❌ | Must be valid email format if provided |
| `phone` | VARCHAR | Primary phone number | ❌ | Alternative to mobile |
| `mobile` | VARCHAR | Mobile phone number | ❌ | Preferred contact method |

### Location Information

| Field Name | Data Type | Description | Required | Notes |
|------------|-----------|-------------|----------|-------|
| `address` | TEXT | Full address | ❌ | Property address or contact address |
| `city` | VARCHAR | City name | ❌ | Geographic targeting |
| `country` | VARCHAR | Country name | ❌ | International support |

### Lead Classification

| Field Name | Data Type | Description | Required | Notes |
|------------|-----------|-------------|----------|-------|
| `source_id` | UUID | Foreign key to lead_sources table | ❌ | How lead was acquired |
| `type_id` | UUID | Foreign key to lead_types table | ❌ | Property type interested in |
| `status_id` | UUID | Foreign key to lead_statuses table | ❌ | Current lead status |
| `status` | VARCHAR | Legacy status field | ❌ | Being phased out in favor of status_id |

### Lead Quality & Scoring

| Field Name | Data Type | Description | Required | Notes |
|------------|-----------|-------------|----------|-------|
| `priority` | VARCHAR | Priority level (high/medium/low) | ❌ | Agent prioritization |
| `score` | INTEGER | Lead quality score | ❌ | Algorithmic scoring (0-100) |
| `budget` | DECIMAL | Budget range | ❌ | Financial qualification |

### Notes & Communication

| Field Name | Data Type | Description | Required | Notes |
|------------|-----------|-------------|----------|-------|
| `notes` | TEXT | General notes about the lead | ❌ | Agent observations |
| `description` | TEXT | Detailed description | ❌ | Extended lead information |

### System Fields

| Field Name | Data Type | Description | Required | Notes |
|------------|-----------|-------------|----------|-------|
| `created_at` | TIMESTAMP | Record creation time | ✅ | Auto-generated |
| `updated_at` | TIMESTAMP | Last modification time | ✅ | Auto-updated |
| `last_contact_at` | TIMESTAMP | Last contact attempt | ❌ | Communication tracking |

### Legacy Fields (Deprecated)

| Field Name | Data Type | Description | Status | Migration Notes |
|------------|-----------|-------------|---------|-----------------|
| `assigned_to_id` | UUID | Old assignment field | 🚫 Deprecated | Use `assigned_to` instead |

## Foreign Key Relationships

### Related Tables

1. **companies** (`company_id`)
   - Multi-tenant support
   - Each lead belongs to a specific company

2. **users** (`created_by`, `assigned_to`)
   - Lead ownership and assignment
   - Tracks who created and who's handling the lead

3. **lead_sources** (`source_id`)
   - Lead acquisition channels
   - Examples: Website, Social Media, Phone Call, Referral

4. **lead_types** (`type_id`)
   - Property types the lead is interested in
   - Examples: Apartment, Villa, Office, Shop

5. **lead_statuses** (`status_id`)
   - Lead progression through sales funnel
   - Examples: NEW, CONTACTED, QUALIFIED, FOLLOW_UP

## Current Implementation Issues

### 1. UUID Format Mismatch
- **Problem**: App sends string IDs (e.g., "3") but database expects UUIDs
- **Error**: `invalid input syntax for type uuid: "3"`
- **Solution**: Need to map fallback data IDs to proper UUIDs or update lookup system

### 2. Required Fields
- **Database**: `company_id`, `created_by` are required
- **App**: Only validates `first_name` and `mobile` 
- **Gap**: App needs to set system fields properly

### 3. Search Query Issues
- **Problem**: Malformed PostgREST queries in lead search
- **Error**: Logic tree parsing errors with newlines
- **Solution**: Fix query formatting in `leadsService.ts`

## Sample Data

```json
{
  "id": "dda843cd-a41b-4a84-83a5-e0d384cecdbe",
  "company_id": "d3875954-6276-4079-aea8-e3f35391f057",
  "created_by": "90b2349c-e34d-4e7f-a5e9-857465e63d67",
  "assigned_to": "9612db56-b9a0-4c32-afdd-c97524882788",
  "first_name": "Mohammed",
  "last_name": "Al-Rahman", 
  "email": "mohammed@email.com",
  "mobile": "+971501234567",
  "city": "Dubai",
  "country": "UAE",
  "source_id": "7653a7df-50d0-4311-a42b-2237b06449f4",
  "type_id": "4e23b465-1e3d-453b-bbac-92fbbb374a7d",
  "status_id": "7128e5cc-1df6-4475-801c-e4327823fb76",
  "priority": "high",
  "score": 85,
  "budget": 750000,
  "notes": "Interested in 2-bedroom apartment in Dubai Marina",
  "status": "NEW",
  "created_at": "2025-10-03T22:26:36.314+00:00",
  "updated_at": "2025-10-03T22:26:36.314+00:00"
}
```

## TypeScript Interface vs Database Mismatch

### Database Fields Present But Missing in Types
- `company_id` (database) ↔ `tenantId` (types) - Different naming
- `created_by` (database) ↔ Missing in Lead interface
- `assigned_to` (database) ↔ `assigned_to_id` (types) - Inconsistent naming
- `first_name`/`last_name` (database) ↔ `name` (types) - Different structure
- `phone` (database) ↔ Missing in types (only mobile present)
- `address`, `city`, `country` (database) ↔ `location` (types) - Different structure
- `priority`, `score` (database) ↔ Missing in types
- `last_contact_at` (database) ↔ Missing in types

### Type Fields Missing in Database  
- `mobile2` (types) ↔ Not in database
- `propertyId` (types) ↔ Not in database  
- `lastFollowUpDate`, `nextFollowUpDate` (types) ↔ Not in database

## Recommendations

### 1. Fix UUID Mapping
- Create proper UUID lookup tables with fallback data
- Or modify app to use proper UUID references

### 2. Complete Required Fields
- Ensure `company_id` and `created_by` are set from authentication context
- Add proper error handling for missing system fields

### 3. Clean Up Legacy Fields
- Remove deprecated `assigned_to_id` field
- Migrate all references to use `assigned_to`
- Eventually remove legacy `status` field

### 4. Improve Validation
- Add database-level constraints for email format
- Add check constraints for priority values
- Ensure foreign key integrity

### 5. Align TypeScript Interfaces
- Update Lead interface to match actual database fields
- Add missing fields: `priority`, `score`, `last_contact_at`
- Rename fields for consistency: `tenantId` → `company_id`
- Split `name` into `first_name`/`last_name` or combine in database

### 6. Add Indexes
- Index on `company_id` for multi-tenant queries
- Index on `assigned_to` for agent workload queries
- Index on `status_id` and `source_id` for filtering
- Composite index on `company_id, status_id` for dashboard queries

## API Integration Notes

### Current Working Fields
- ✅ Basic lead fetching by ID works
- ✅ Personal information (name, email, mobile) works  
- ✅ System timestamps are handled correctly

### Issues to Resolve
- 🚫 UUID format mismatch in status/source updates
- 🚫 Search functionality broken (PostgREST query format)
- 🚫 Missing required fields in lead creation
- 🚫 Foreign key constraint violations

### Fallback System Status
- ✅ Lookup service provides fallback data when database is empty
- ✅ Status and source dropdowns show values  
- 🚫 Need UUID mapping for database updates to work