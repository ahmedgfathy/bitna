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
