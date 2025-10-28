# Complete Property Database Tables Documentation

## Overview
This document provides a comprehensive listing of ALL property-related tables in the Prisma schema. After thorough analysis, I found **45 property-related tables** that work together to manage all aspects of property listings, from basic information to detailed tracking and management.

## **Total Property-Related Tables: 45**

## 1. Core Property Table (1 table)

### 1. `properties` (Property Model) 
**Table Mapping**: `@@map("properties")`
Main property table containing all property listings with comprehensive fields for property management.

## 2. Property Type and Category Tables (5 tables)

### 2. `property_types` (PropertyTypeLookup)
**Table Mapping**: `@@map("property_types")`
Defines property types (apartment, villa, office, warehouse, etc.)

### 3. `property_categories` (PropertyCategoryLookup)  
**Table Mapping**: `@@map("property_categories")`
Defines main property categories (residential, commercial, industrial)

### 4. `property_sub_categories` (PropertySubCategory)
**Table Mapping**: `@@map("property_sub_categories")`
Property sub-categories for more detailed classification

### 5. `compound_types` (CompoundType)
**Table Mapping**: `@@map("compound_types")`
Types of compounds/complexes where properties are located

### 6. `payment_types` (PaymentType)
**Table Mapping**: `@@map("payment_types")`
Payment method types for property transactions

## 3. Location and Geographic Tables (2 tables)

### 7. `regions` (Region)
**Table Mapping**: `@@map("regions")`
Geographic regions for property location

### 8. `districts` (District)  
**Table Mapping**: `@@map("districts")`
Districts within regions for detailed location mapping

## 4. Property Status and Condition Tables (10 tables)

### 9. `property_status` (PropertyStatus)
**Table Mapping**: `@@map("property_status")`
Current status of properties (available, sold, rented, under_maintenance, etc.)

### 10. `finished_status` (FinishedStatus)
**Table Mapping**: `@@map("finished_status")`
Property finishing status and completion level

### 11. `property_conditions` (PropertyCondition)
**Table Mapping**: `@@map("property_conditions")`
Physical condition of the property (excellent, good, fair, poor)

### 12. `construction_status` (ConstructionStatus)
**Table Mapping**: `@@map("construction_status")`
Construction completion status (completed, under_construction, planned)

### 13. `furnishing_status` (FurnishingStatus)
**Table Mapping**: `@@map("furnishing_status")`
Level of furnishing (furnished, semi_furnished, unfurnished)

### 14. `availability_status` (AvailabilityStatus)
**Table Mapping**: `@@map("availability_status")`
Current availability status with visual indicators and colors

### 15. `verification_status` (VerificationStatus)
**Table Mapping**: `@@map("verification_status")`
Property verification and validation status

### 16. `record_status` (RecordStatus)
**Table Mapping**: `@@map("record_status")`
Status of the property record itself (active, inactive, pending)

### 17. `ownership_status` (OwnershipStatus)
**Table Mapping**: `@@map("ownership_status")`
Property ownership status and type (owned, leased, managed)

### 18. `mortgage_status` (MortgageStatus)
**Table Mapping**: `@@map("mortgage_status")`
Mortgage and financing status

## 5. Property Features and Specifications Tables (11 tables)

### 19. `view_types` (ViewType)
**Table Mapping**: `@@map("view_types")`
Types of views available from the property (sea_view, city_view, garden_view)

### 20. `orientations` (Orientation)
**Table Mapping**: `@@map("orientations")`
Property orientation (north, south, east, west facing)

### 21. `air_conditioning_types` (AirConditioningType)
**Table Mapping**: `@@map("air_conditioning_types")`
Types of air conditioning systems

### 22. `heating_systems` (HeatingSystem)
**Table Mapping**: `@@map("heating_systems")`
Types of heating systems available

### 23. `security_systems` (SecuritySystem)
**Table Mapping**: `@@map("security_systems")`
Security system types and features

### 24. `pet_policies` (PetPolicy)
**Table Mapping**: `@@map("pet_policies")`
Pet policies for rental properties

### 25. `smoking_policies` (SmokingPolicy)
**Table Mapping**: `@@map("smoking_policies")`
Smoking policies for properties

### 26. `owner_types` (OwnerType)
**Table Mapping**: `@@map("owner_types")`
Types of property owners (individual, corporate, government)

### 27. `investment_types` (InvestmentType)
**Table Mapping**: `@@map("investment_types")`
Types of property investments

### 28. `target_markets` (TargetMarket)
**Table Mapping**: `@@map("target_markets")`
Target market segments for properties

### 29. `data_sources` (DataSource)
**Table Mapping**: `@@map("data_sources")`
Sources of property data and listings

## 6. Property Management and Business Tables (4 tables)

### 30. `priority_levels` (PriorityLevel)
**Table Mapping**: `@@map("priority_levels")`
Priority levels for property handling with level numbers and colors

### 31. `marketing_phases` (MarketingPhase)
**Table Mapping**: `@@map("marketing_phases")`
Marketing phases and strategies

### 32. `minimum_rental_periods` (MinimumRentalPeriod)
**Table Mapping**: `@@map("minimum_rental_periods")`
Minimum rental period requirements with period in days

### 33. `payment_schedules` (PaymentSchedule)
**Table Mapping**: `@@map("payment_schedules")`
Payment schedule options

### 34. `listing_purposes` (ListingPurpose)
**Table Mapping**: `@@map("listing_purposes")`
Purpose of property listings (sale, rent, investment)

## 7. Property Detail and Relationship Tables (6 tables)

### 35. `property_images` (PropertyImage)
**Table Mapping**: `@@map("property_images")`
Property photos and images with metadata, display order, and alt text

### 36. `property_features` (PropertyFeature)
**Table Mapping**: `@@map("property_features")`
Specific features and characteristics of properties

### 37. `property_amenities` (PropertyAmenity)
**Table Mapping**: `@@map("property_amenities")`
Amenities available with the property

### 38. `property_utilities` (PropertyUtility)
**Table Mapping**: `@@map("property_utilities")`
Utility connections including electricity, water, gas, internet, landline, satellite TV with connection status, provider, account numbers, and monthly fees

### 39. `property_distances` (PropertyDistance)
**Table Mapping**: `@@map("property_distances")`
Distances to important locations including metro, airport, hospital, school, mall, mosque, bank, restaurant with distance in KM, travel time, and transport mode

### 40. `property_call_logs` (PropertyCallLog)
**Table Mapping**: `@@map("property_call_logs")`
Call logs and communication records for properties

## 8. Property Activity and Management Tables (5 tables)

### 41. `property_advertisements` (PropertyAdvertisement)
**Table Mapping**: `@@map("property_advertisements")`
Advertisement records and marketing campaigns

### 42. `property_activities` (PropertyActivity)
**Table Mapping**: `@@map("property_activities")`
General activity logs for property interactions

### 43. `property_audit_logs` (PropertyAuditLog)
**Table Mapping**: `@@map("property_audit_logs")`
Complete audit trail for property changes

### 44. `property_managers` (PropertyManager)
**Table Mapping**: `@@map("property_managers")`
Property management assignments and responsibilities

### 45. `property_agents` (PropertyAgent)
**Table Mapping**: `@@map("property_agents")`
Property agent assignments for sales and rentals

## Database Schema Architecture Summary

### **Total Property-Related Tables: 45**

**Breakdown by Category:**
- **Core Property Table**: 1 table (`properties`)
- **Property Types & Categories**: 5 tables
- **Location & Geographic**: 2 tables  
- **Status & Conditions**: 10 tables
- **Features & Specifications**: 11 tables
- **Management & Business**: 5 tables (corrected count)
- **Detail & Relationships**: 6 tables
- **Activity & Management**: 5 tables

## Key Features of the Database Design

### 1. Comprehensive Lookup System
- 29 lookup tables for detailed property categorization
- All lookup tables follow consistent pattern with id, name, displayName, description, isActive
- Soft delete capability with `isActive` boolean flags

### 2. Multi-Tenant Architecture
- All property data segregated by `companyId`
- Company-based data isolation for security
- User access controlled through company associations

### 3. Complex Relationship Network
- **Property → Company**: Each property belongs to one company
- **Property → Users**: Multiple user relationships (handler, sales rep, creator, modifier)
- **Property → Lookups**: 29+ lookup table relationships for detailed categorization
- **Property → Details**: One-to-many relationships with images, features, amenities, utilities, distances
- **Property → Activities**: One-to-many relationships with call logs, advertisements, activities, audit logs

### 4. Advanced Features
- **Geographic Hierarchy**: Region → District relationships
- **Utility Management**: Complete utility tracking with provider details
- **Distance Mapping**: Distances to important locations with travel modes
- **Priority System**: Color-coded priority levels with numeric ordering
- **Audit System**: Complete change tracking and user activity logs
- **Image Management**: Multiple images per property with display ordering

### 5. Business Intelligence Support
- **Marketing Phases**: Track property through marketing lifecycle
- **Investment Types**: Support for different investment strategies
- **Target Markets**: Market segmentation capabilities
- **Data Sources**: Track origin of property listings
- **Payment Schedules**: Flexible payment term management

### 6. Performance Optimizations
- Indexed foreign keys for fast joins
- JSON fields for flexible feature/amenity storage in main Property table
- Proper table mapping with `@@map()` directives
- Cascade deletes for proper data cleanup
- Batch processing support for bulk imports

### 7. Data Integrity Features
- Cascade deletes for property-related detail tables
- Soft deletes using `isActive` flags on lookup tables
- Audit trail preservation with `PropertyAuditLog`
- Timestamp tracking on all tables for data lifecycle management
- Foreign key constraints for referential integrity

This comprehensive 45-table database model supports a full-featured enterprise property management system with:
- ✅ Complete property lifecycle management
- ✅ Detailed tracking and audit capabilities
- ✅ Flexible categorization and lookup systems
- ✅ Multi-company tenant isolation
- ✅ Advanced search and filtering capabilities
- ✅ Business intelligence and reporting support
- ✅ Scalable architecture for large property portfolios
