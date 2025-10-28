# Contaboo Real Estate CRM - Database Schema

This document outlines the comprehensive database schema for the Contaboo Real Estate CRM system built on Appwrite.

## Overview

The database consists of 26 collections organized into logical groups for managing all aspects of a real estate business.

## Database Structure

### Core Reference Tables

#### `property_types`
- **Purpose**: Defines different types of properties (apartment, villa, office, etc.)
- **Attributes**:
  - `name` (string, required) - Type name

#### `categories` 
- **Purpose**: Property categories (residential, commercial, industrial)
- **Attributes**:
  - `name` (string, required) - Category name

#### `currencies`
- **Purpose**: Supported currencies for pricing
- **Attributes**:
  - `code` (string, required) - Currency code (USD, EUR, etc.)
  - `name` (string, required) - Currency full name

#### `compounds`
- **Purpose**: Real estate developments/complexes
- **Attributes**:
  - `name` (string, required) - Compound name
  - `description` (string) - Detailed description
  - `developer` (string) - Developer company name

#### `compound_locations`
- **Purpose**: Geographic information for compounds
- **Attributes**:
  - `compound_id` (string, required) - Reference to compound
  - `city` (string) - City name
  - `district` (string) - District/area name
  - `latitude` (float) - GPS latitude
  - `longitude` (float) - GPS longitude

### Property Management

#### `properties`
- **Purpose**: Core property information
- **Attributes**:
  - `property_number` (string, required, unique) - Unique identifier
  - `name` (string, required) - Property title
  - `description` (string) - Detailed description
  - `type_id` (string) - Reference to property_types
  - `category_id` (string) - Reference to categories
  - `unit_for` (enum, required) - "sale" or "rent"
  - `area` (float) - Property area in sq ft/m
  - `land_area` (float) - Land area
  - `land_garden_area` (float) - Garden area
  - `total_space` (float) - Total space
  - `rooms` (integer) - Number of rooms
  - `living_rooms` (integer) - Number of living rooms
  - `bathrooms` (integer) - Number of bathrooms
  - `year_built` (integer) - Construction year
  - `created_by` (string) - User who created record
  - `updated_by` (string) - User who last updated
  - `assigned_to` (string) - Assigned agent/employee

#### `locations`
- **Purpose**: Detailed location information for properties
- **Attributes**:
  - `property_id` (string, required) - Reference to properties
  - `building` (string) - Building name/number
  - `unit_no` (string) - Unit number
  - `apartment_number` (string) - Apartment number
  - `plot_number` (string) - Plot number
  - `floor_number` (integer) - Floor number
  - `total_floors` (integer) - Total floors in building
  - `compound_id` (string) - Reference to compounds
  - `compound_location_id` (string) - Reference to compound_locations

### Features & Facilities

#### Feature Type Tables
- `finishing_levels` - Quality of finishing
- `garage_types` - Types of garages available
- `garden_types` - Types of gardens
- `pool_types` - Types of swimming pools
- `terrace_types` - Types of terraces

#### `features`
- **Purpose**: Property features and amenities
- **Attributes**:
  - `property_id` (string, required) - Reference to properties
  - `finishing_level_id` (string) - Reference to finishing_levels
  - `has_garage` (boolean) - Has garage
  - `garage_type_id` (string) - Reference to garage_types
  - `has_garden` (boolean) - Has garden
  - `garden_type_id` (string) - Reference to garden_types
  - `has_pool` (boolean) - Has swimming pool
  - `pool_type_id` (string) - Reference to pool_types
  - `has_terraces` (boolean) - Has terraces
  - `terrace_type_id` (string) - Reference to terrace_types

#### `facilities`
- **Purpose**: Available facilities (gym, security, etc.)
- **Attributes**:
  - `name` (string, required) - Facility name

#### Junction Tables
- `property_facilities` - Many-to-many: properties ↔ facilities
- `property_features` - Property-specific features (free text)
- `property_security_features` - Security features (free text)

### Financial Management

#### `financials`
- **Purpose**: All financial information for properties
- **Attributes**:
  - `property_id` (string, required) - Reference to properties
  - `base_price` (float) - Base/original price
  - `asking_price` (float) - Current asking price
  - `sold_price` (float) - Final sold price
  - `total_price` (float) - Total transaction price
  - `price_per_meter` (float) - Price per square meter
  - `currency_id` (string) - Reference to currencies
  - `transfer_fees` (float) - Legal/transfer fees
  - `maintenance_fees` (float) - Monthly maintenance
  - `installment` (float) - Installment amount
  - `down_payment` (float) - Down payment amount
  - `payed_every` (enum) - "monthly", "quarterly", "annually"
  - `monthly` (float) - Monthly payment amount

### Status & Activity Tracking

#### `status_activity`
- **Purpose**: Current status and activity tracking
- **Attributes**:
  - `property_id` (string, required) - Reference to properties
  - `status` (enum) - "available", "sold", "rented", "pending"
  - `activity` (enum) - "lead", "follow-up", "viewing scheduled"
  - `sold_date` (datetime) - Date property was sold
  - `rental_start_date` (datetime) - Rental start date
  - `rental_end_date` (datetime) - Rental end date
  - `last_follow_in` (datetime) - Last follow-up date
  - `update_required` (boolean) - Needs update flag

### Media Management

#### `media`
- **Purpose**: Property media and documents
- **Attributes**:
  - `property_id` (string, required) - Reference to properties
  - `primary_image` (string) - Main property image URL
  - `thumbnail_path` (string) - Thumbnail image path
  - `images` (string) - JSON array of image URLs
  - `videos` (string) - JSON array of video URLs
  - `virtual_tour_url` (string) - Virtual tour link
  - `brochure_url` (string) - Property brochure URL
  - `documents` (string) - JSON array of document URLs

### CRM & Tracking

#### `crm_tracking`
- **Purpose**: Sales notes and activity tracking
- **Attributes**:
  - `property_id` (string, required) - Reference to properties
  - `sales_notes` (string) - Sales team notes
  - `general_notes` (string) - General notes
  - `activity_notes` (string) - Activity-specific notes
  - `handler_id` (string) - Current handler/agent
  - `last_modified_by` (string) - Last modifier

### User Management & RBAC

#### `users`
- **Purpose**: System users (agents, managers, etc.)
- **Attributes**:
  - `username` (string, required, unique) - Login username
  - `email` (email, required, unique) - Email address
  - `password_hash` (string, required) - Hashed password
  - `full_name` (string) - Full name
  - `phone` (string) - Phone number
  - `status` (enum) - "active", "inactive"

#### `roles`
- **Purpose**: User roles definition
- **Attributes**:
  - `name` (string, required, unique) - Role name
  - `description` (string) - Role description
  - `hierarchy_level` (integer, required) - 1=CEO, 2=Manager, 3=Team Lead, 4=Sales

#### `permissions`
- **Purpose**: System permissions
- **Attributes**:
  - `name` (string, required, unique) - Permission name
  - `description` (string) - Permission description

#### RBAC Junction Tables
- `role_permissions` - Many-to-many: roles ↔ permissions
- `user_roles` - Many-to-many: users ↔ roles
- `user_permissions` - Direct user permissions (overrides)

#### `groups`
- **Purpose**: Teams/departments organization
- **Attributes**:
  - `name` (string, required) - Group name
  - `description` (string) - Group description
  - `parent_group_id` (string) - Parent group reference
  - `manager_id` (string) - Group manager reference

#### `group_users`
- **Purpose**: Group membership
- **Attributes**:
  - `group_id` (string, required) - Reference to groups
  - `user_id` (string, required) - Reference to users
  - `role_id` (string) - Role within group

### Audit & Security

#### `audit_logs`
- **Purpose**: Complete audit trail of all actions
- **Attributes**:
  - `user_id` (string) - User who performed action
  - `action` (enum, required) - "CREATE", "READ", "UPDATE", "DELETE", "LOGIN", "LOGOUT", "ASSIGN", "OTHER"
  - `entity_type` (string, required) - Table/module name
  - `entity_id` (string) - Record ID that was affected
  - `property_id` (string) - Related property (if applicable)
  - `changes` (string) - JSON of before/after changes
  - `ip_address` (string) - User's IP address
  - `user_agent` (string) - User's browser/client info

#### `audit_event_types`
- **Purpose**: Reference table for audit event types
- **Attributes**:
  - `name` (string, required, unique) - Event type name
  - `description` (string) - Event description

## Key Features

### 1. **Comprehensive Property Management**
- Complete property lifecycle tracking
- Detailed location and feature management
- Media and document management
- Financial tracking and reporting

### 2. **Advanced User Management**
- Role-based access control (RBAC)
- Hierarchical permissions
- Group/team management
- Fine-grained permission system

### 3. **Complete Audit Trail**
- All actions logged with details
- User activity tracking
- Change history for all records
- Security monitoring

### 4. **Flexible Architecture**
- Extensible schema design
- Many-to-many relationships supported
- JSON fields for complex data
- Scalable collection structure

### 5. **Real Estate Specific Features**
- Property type and category management
- Compound and location tracking
- Feature and facility management
- Financial and pricing flexibility
- Status and activity workflows

## Database Connection

The database is hosted on **Appwrite Cloud** with the following configuration:
- **Database ID**: `real_estate`
- **Project ID**: `68bf5a2cd78f0a617a92`
- **Endpoint**: `https://fra.cloud.appwrite.io/v1`

## Security & Permissions

Each collection has document-level security enabled, allowing for fine-grained access control based on user roles and permissions.

## Performance Optimizations

Key indexes have been created on:
- `properties.property_number` (unique)
- `users.username` (unique)
- `users.email` (unique)
- `permissions.name` (unique)
- `roles.name` (unique)
- Financial and status tracking fields

This schema provides a robust foundation for building a comprehensive real estate CRM system with all necessary features for managing properties, users, finances, and business operations.
