-- ============================================================================
-- UNIFIED PROPERTY DATABASE SCHEMA
-- Professional Real Estate CRM Database Structure
-- Compiled from multiple project implementations
-- Version: 1.0
-- Date: October 28, 2025
-- ============================================================================

-- ============================================================================
-- SECTION 1: MULTI-TENANT & USER MANAGEMENT
-- ============================================================================

-- Companies Table (Multi-tenant Root)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    company_code VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    website VARCHAR(255),
    logo_url TEXT,
    subscription_plan VARCHAR(50) DEFAULT 'basic', -- basic, premium, enterprise
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_code ON companies(company_code);
CREATE INDEX idx_companies_active ON companies(is_active);

-- User Profiles (Roles & Permissions)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- Administrator, Sales Manager, Agent
    description TEXT,
    color VARCHAR(7) DEFAULT '#007AFF',
    is_default BOOLEAN DEFAULT false,
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_profiles_company ON user_profiles(company_id);

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES user_profiles(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    mobile VARCHAR(50),
    avatar_url TEXT,
    department VARCHAR(100),
    position VARCHAR(100),
    employee_id VARCHAR(50),
    manager_id UUID REFERENCES users(id),
    property_access VARCHAR(20) DEFAULT 'all', -- all, commercial, residential, none
    is_active BOOLEAN DEFAULT true,
    is_superuser BOOLEAN DEFAULT false,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_profile ON users(profile_id);
CREATE INDEX idx_users_manager ON users(manager_id);

-- ============================================================================
-- SECTION 2: LOCATION HIERARCHY
-- ============================================================================

-- Regions
CREATE TABLE regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_regions_company ON regions(company_id);
CREATE INDEX idx_regions_active ON regions(is_active);

-- Districts
CREATE TABLE districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_districts_company ON districts(company_id);
CREATE INDEX idx_districts_region ON districts(region_id);
CREATE INDEX idx_districts_active ON districts(is_active);

-- Neighborhoods
CREATE TABLE neighborhoods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_neighborhoods_company ON neighborhoods(company_id);
CREATE INDEX idx_neighborhoods_district ON neighborhoods(district_id);
CREATE INDEX idx_neighborhoods_active ON neighborhoods(is_active);

-- Compounds
CREATE TABLE compounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    description TEXT,
    compound_type_id UUID,
    address TEXT,
    gps_latitude DECIMAL(10, 8),
    gps_longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_compounds_company ON compounds(company_id);
CREATE INDEX idx_compounds_neighborhood ON compounds(neighborhood_id);
CREATE INDEX idx_compounds_active ON compounds(is_active);

-- ============================================================================
-- SECTION 3: PROPERTY LOOKUP TABLES
-- ============================================================================

-- Property Categories (Residential, Commercial, Industrial)
CREATE TABLE property_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7),
    is_active BOOLEAN DEFAULT true,
    is_system BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_categories_company ON property_categories(company_id);
CREATE INDEX idx_property_categories_active ON property_categories(is_active);

-- Property Types (Apartment, Villa, Office, Shop, etc.)
CREATE TABLE property_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    category_id UUID REFERENCES property_categories(id),
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7),
    is_active BOOLEAN DEFAULT true,
    is_system BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_types_company ON property_types(company_id);
CREATE INDEX idx_property_types_category ON property_types(category_id);
CREATE INDEX idx_property_types_active ON property_types(is_active);

-- Property Sub-Categories
CREATE TABLE property_sub_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    type_id UUID REFERENCES property_types(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_sub_categories_type ON property_sub_categories(type_id);

-- Property Status (Available, Sold, Rented, etc.)
CREATE TABLE property_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    color VARCHAR(7) DEFAULT '#22c55e',
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    is_system BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_statuses_company ON property_statuses(company_id);
CREATE INDEX idx_property_statuses_active ON property_statuses(is_active);

-- Furnishing Status
CREATE TABLE furnishing_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Construction Status
CREATE TABLE construction_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Finishing Status
CREATE TABLE finishing_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property Conditions
CREATE TABLE property_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ownership Status
CREATE TABLE ownership_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- View Types
CREATE TABLE view_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orientations
CREATE TABLE orientations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Currencies
CREATE TABLE currencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) NOT NULL UNIQUE,
    symbol VARCHAR(10),
    name VARCHAR(100),
    display_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Listing Purposes
CREATE TABLE listing_purposes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Priority Levels
CREATE TABLE priority_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    level INTEGER NOT NULL,
    color VARCHAR(7),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 4: MAIN PROPERTIES TABLE
-- ============================================================================

CREATE TABLE properties (
    -- Primary Identification
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_number VARCHAR(100) UNIQUE NOT NULL, -- Auto-generated: PROP-2025-001
    property_name VARCHAR(255),
    
    -- Multi-tenant & Ownership
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    created_by_id UUID NOT NULL REFERENCES users(id),
    updated_by_id UUID REFERENCES users(id),
    
    -- Property Classification
    category_id UUID REFERENCES property_categories(id),
    type_id UUID REFERENCES property_types(id),
    sub_category_id UUID REFERENCES property_sub_categories(id),
    
    -- Status & Condition
    status_id UUID REFERENCES property_statuses(id),
    furnishing_status_id UUID REFERENCES furnishing_statuses(id),
    construction_status_id UUID REFERENCES construction_statuses(id),
    finishing_status_id UUID REFERENCES finishing_statuses(id),
    condition_id UUID REFERENCES property_conditions(id),
    ownership_status_id UUID REFERENCES ownership_statuses(id),
    
    -- Location (Hierarchy)
    region_id UUID REFERENCES regions(id),
    district_id UUID REFERENCES districts(id),
    neighborhood_id UUID REFERENCES neighborhoods(id),
    compound_id UUID REFERENCES compounds(id),
    
    -- Location Details
    building_name VARCHAR(255),
    unit_number VARCHAR(100),
    floor_number INTEGER,
    address TEXT,
    street_address VARCHAR(255),
    postal_code VARCHAR(50),
    gps_latitude DECIMAL(10, 8),
    gps_longitude DECIMAL(11, 8),
    
    -- Physical Specifications - Areas
    total_area DECIMAL(12, 2), -- Total area in sqm
    built_area DECIMAL(12, 2), -- Built-up area
    usable_area DECIMAL(12, 2), -- Usable living area
    land_area DECIMAL(12, 2), -- Land plot area
    balcony_area DECIMAL(12, 2), -- Balcony/terrace area
    garden_area DECIMAL(12, 2), -- Garden area
    
    -- Physical Specifications - Rooms & Facilities
    rooms_count INTEGER,
    bedrooms_count INTEGER,
    bathrooms_count INTEGER,
    living_rooms_count INTEGER,
    kitchens_count INTEGER DEFAULT 1,
    parking_spots_count INTEGER,
    
    -- Building Information
    total_floors_in_building INTEGER,
    built_year INTEGER,
    property_age INTEGER,
    last_renovation_year INTEGER,
    
    -- Pricing Information
    sale_price DECIMAL(15, 2),
    rental_price_monthly DECIMAL(15, 2),
    rental_price_yearly DECIMAL(15, 2),
    price_per_sqm DECIMAL(15, 2),
    deposit_amount DECIMAL(15, 2),
    service_charges DECIMAL(12, 2),
    maintenance_fee DECIMAL(12, 2),
    property_taxes DECIMAL(12, 2),
    currency_id UUID REFERENCES currencies(id),
    
    -- Payment Terms
    installment_available BOOLEAN DEFAULT false,
    down_payment DECIMAL(15, 2),
    installment_amount DECIMAL(15, 2),
    payment_frequency VARCHAR(50), -- monthly, quarterly, semi-annual, annual
    installment_period_months INTEGER,
    
    -- Features - Utilities (Boolean)
    has_elevator BOOLEAN DEFAULT false,
    has_garden BOOLEAN DEFAULT false,
    has_garage BOOLEAN DEFAULT false,
    has_swimming_pool BOOLEAN DEFAULT false,
    has_gym BOOLEAN DEFAULT false,
    has_security BOOLEAN DEFAULT false,
    has_electricity BOOLEAN DEFAULT true,
    has_water BOOLEAN DEFAULT true,
    has_gas BOOLEAN DEFAULT false,
    has_internet BOOLEAN DEFAULT false,
    has_landline BOOLEAN DEFAULT false,
    has_satellite_tv BOOLEAN DEFAULT false,
    has_air_conditioning BOOLEAN DEFAULT false,
    has_heating BOOLEAN DEFAULT false,
    has_balcony BOOLEAN DEFAULT false,
    has_terrace BOOLEAN DEFAULT false,
    has_storage BOOLEAN DEFAULT false,
    
    -- Property Characteristics
    view_type_id UUID REFERENCES view_types(id),
    orientation_id UUID REFERENCES orientations(id),
    is_corner_unit BOOLEAN DEFAULT false,
    is_penthouse BOOLEAN DEFAULT false,
    is_duplex BOOLEAN DEFAULT false,
    is_furnished BOOLEAN DEFAULT false,
    pet_friendly BOOLEAN DEFAULT false,
    smoking_allowed BOOLEAN DEFAULT false,
    
    -- Legal & Documentation
    title_deed_number VARCHAR(255),
    registration_number VARCHAR(255),
    property_tax_id VARCHAR(255),
    has_legal_issues BOOLEAN DEFAULT false,
    legal_notes TEXT,
    
    -- Owner Information
    owner_name VARCHAR(255),
    owner_mobile VARCHAR(50),
    owner_telephone VARCHAR(50),
    owner_email VARCHAR(255),
    owner_type VARCHAR(100), -- individual, corporate, government
    
    -- Management & Assignment
    assigned_handler_id UUID REFERENCES users(id),
    sales_representative_id UUID REFERENCES users(id),
    property_manager_id UUID REFERENCES users(id),
    
    -- Contact Information
    emergency_contact VARCHAR(255),
    maintenance_contact VARCHAR(255),
    
    -- Marketing & Media
    title VARCHAR(500), -- SEO-friendly title
    description TEXT,
    short_description TEXT,
    special_instructions TEXT,
    internal_notes TEXT,
    virtual_tour_url TEXT,
    video_url TEXT,
    brochure_url TEXT,
    
    -- Marketing Flags
    is_featured BOOLEAN DEFAULT false,
    is_hot_deal BOOLEAN DEFAULT false,
    is_new_listing BOOLEAN DEFAULT true,
    is_exclusive BOOLEAN DEFAULT false,
    show_on_website BOOLEAN DEFAULT true,
    show_on_social_media BOOLEAN DEFAULT false,
    
    -- Listing Information
    listing_purpose_id UUID REFERENCES listing_purposes(id),
    priority_level_id UUID REFERENCES priority_levels(id),
    listing_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    available_from DATE,
    
    -- Activity Tracking
    last_contact_date DATE,
    next_follow_up_date DATE,
    last_viewed_at TIMESTAMPTZ,
    view_count INTEGER DEFAULT 0,
    inquiry_count INTEGER DEFAULT 0,
    
    -- Status Flags
    is_verified BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    sold_at TIMESTAMPTZ,
    rented_at TIMESTAMPTZ,
    
    -- Metadata (JSONB for flexible data)
    custom_fields JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}'
);

-- Properties Indexes
CREATE INDEX idx_properties_company ON properties(company_id);
CREATE INDEX idx_properties_number ON properties(property_number);
CREATE INDEX idx_properties_status ON properties(status_id);
CREATE INDEX idx_properties_type ON properties(type_id);
CREATE INDEX idx_properties_category ON properties(category_id);
CREATE INDEX idx_properties_region ON properties(region_id);
CREATE INDEX idx_properties_district ON properties(district_id);
CREATE INDEX idx_properties_compound ON properties(compound_id);
CREATE INDEX idx_properties_assigned_handler ON properties(assigned_handler_id);
CREATE INDEX idx_properties_sales_rep ON properties(sales_representative_id);
CREATE INDEX idx_properties_created_by ON properties(created_by_id);
CREATE INDEX idx_properties_featured ON properties(is_featured);
CREATE INDEX idx_properties_published ON properties(is_published);
CREATE INDEX idx_properties_deleted ON properties(is_deleted);
CREATE INDEX idx_properties_price_range ON properties(sale_price, rental_price_monthly);
CREATE INDEX idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX idx_properties_listing_date ON properties(listing_date DESC);

-- Full-text search index
CREATE INDEX idx_properties_search ON properties USING gin(
    to_tsvector('english', 
        COALESCE(property_name, '') || ' ' || 
        COALESCE(title, '') || ' ' || 
        COALESCE(description, '') || ' ' ||
        COALESCE(address, '')
    )
);

-- ============================================================================
-- SECTION 5: PROPERTY RELATED TABLES
-- ============================================================================

-- Property Images
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    title VARCHAR(255),
    caption TEXT,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    width INTEGER,
    height INTEGER,
    file_size INTEGER, -- in bytes
    file_format VARCHAR(20),
    uploaded_by_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_images_property ON property_images(property_id);
CREATE INDEX idx_property_images_primary ON property_images(is_primary);
CREATE INDEX idx_property_images_order ON property_images(display_order);

-- Property Documents
CREATE TABLE property_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- deed, license, map, inspection, contract, other
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    file_size INTEGER,
    file_format VARCHAR(20),
    is_confidential BOOLEAN DEFAULT false,
    uploaded_by_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_documents_property ON property_documents(property_id);
CREATE INDEX idx_property_documents_type ON property_documents(document_type);

-- Property Amenities
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    icon VARCHAR(50),
    category VARCHAR(100), -- interior, exterior, community, security
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_amenities_company ON amenities(company_id);
CREATE INDEX idx_amenities_category ON amenities(category);

-- Property Amenities Junction Table
CREATE TABLE property_amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(property_id, amenity_id)
);

CREATE INDEX idx_property_amenities_property ON property_amenities(property_id);
CREATE INDEX idx_property_amenities_amenity ON property_amenities(amenity_id);

-- Property Features
CREATE TABLE features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    icon VARCHAR(50),
    category VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_features_company ON features(company_id);

-- Property Features Junction Table
CREATE TABLE property_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
    value TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(property_id, feature_id)
);

CREATE INDEX idx_property_features_property ON property_features(property_id);
CREATE INDEX idx_property_features_feature ON property_features(feature_id);

-- Property Utilities
CREATE TABLE property_utilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    utility_type VARCHAR(50) NOT NULL, -- electricity, water, gas, internet, landline, satellite_tv
    is_connected BOOLEAN DEFAULT false,
    provider_name VARCHAR(255),
    account_number VARCHAR(255),
    monthly_fee DECIMAL(10, 2),
    connection_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_utilities_property ON property_utilities(property_id);
CREATE INDEX idx_property_utilities_type ON property_utilities(utility_type);

-- Property Distances (to nearby locations)
CREATE TABLE property_distances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    location_type VARCHAR(100) NOT NULL, -- metro, airport, hospital, school, mall, mosque, bank, restaurant
    location_name VARCHAR(255),
    distance_km DECIMAL(8, 2),
    travel_time_minutes INTEGER,
    transport_mode VARCHAR(50), -- walking, car, public_transport
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_distances_property ON property_distances(property_id);
CREATE INDEX idx_property_distances_type ON property_distances(location_type);

-- ============================================================================
-- SECTION 6: ACTIVITY & TRACKING TABLES
-- ============================================================================

-- Property Activities
CREATE TABLE property_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    activity_type VARCHAR(50) NOT NULL, -- view, inquiry, call, email, meeting, visit, offer, update
    title VARCHAR(255),
    description TEXT,
    activity_date TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_activities_property ON property_activities(property_id);
CREATE INDEX idx_property_activities_company ON property_activities(company_id);
CREATE INDEX idx_property_activities_user ON property_activities(user_id);
CREATE INDEX idx_property_activities_type ON property_activities(activity_type);
CREATE INDEX idx_property_activities_date ON property_activities(activity_date DESC);

-- Property Call Logs
CREATE TABLE property_call_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    contact_name VARCHAR(255),
    contact_phone VARCHAR(50),
    call_type VARCHAR(50), -- inbound, outbound
    call_purpose VARCHAR(100), -- inquiry, follow_up, viewing_request, negotiation
    call_duration_seconds INTEGER,
    call_outcome VARCHAR(100), -- interested, not_interested, callback_requested, viewing_scheduled
    notes TEXT,
    next_follow_up_date DATE,
    call_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_call_logs_property ON property_call_logs(property_id);
CREATE INDEX idx_property_call_logs_company ON property_call_logs(company_id);
CREATE INDEX idx_property_call_logs_user ON property_call_logs(user_id);
CREATE INDEX idx_property_call_logs_date ON property_call_logs(call_date DESC);

-- Property Advertisements
CREATE TABLE property_advertisements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    platform VARCHAR(100), -- facebook, instagram, website, olx, dubizzle
    campaign_name VARCHAR(255),
    ad_url TEXT,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12, 2),
    currency_id UUID REFERENCES currencies(id),
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    inquiries INTEGER DEFAULT 0,
    cost_per_click DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_by_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_advertisements_property ON property_advertisements(property_id);
CREATE INDEX idx_property_advertisements_company ON property_advertisements(company_id);
CREATE INDEX idx_property_advertisements_platform ON property_advertisements(platform);
CREATE INDEX idx_property_advertisements_active ON property_advertisements(is_active);

-- Property Audit Logs
CREATE TABLE property_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL, -- CREATE, UPDATE, DELETE, PUBLISH, UNPUBLISH, ARCHIVE
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    changed_fields TEXT[],
    ip_address INET,
    user_agent TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_audit_logs_property ON property_audit_logs(property_id);
CREATE INDEX idx_property_audit_logs_company ON property_audit_logs(company_id);
CREATE INDEX idx_property_audit_logs_user ON property_audit_logs(user_id);
CREATE INDEX idx_property_audit_logs_action ON property_audit_logs(action);
CREATE INDEX idx_property_audit_logs_date ON property_audit_logs(created_at DESC);

-- ============================================================================
-- SECTION 7: TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate property number
CREATE OR REPLACE FUNCTION generate_property_number()
RETURNS TRIGGER AS $$
DECLARE
    year_prefix VARCHAR(4);
    next_number INTEGER;
    new_prop_number VARCHAR(100);
BEGIN
    IF NEW.property_number IS NULL OR NEW.property_number = '' THEN
        year_prefix := TO_CHAR(CURRENT_DATE, 'YYYY');
        
        SELECT COALESCE(MAX(CAST(SUBSTRING(property_number FROM 'PROP-' || year_prefix || '-([0-9]+)') AS INTEGER)), 0) + 1
        INTO next_number
        FROM properties
        WHERE property_number LIKE 'PROP-' || year_prefix || '-%'
        AND company_id = NEW.company_id;
        
        new_prop_number := 'PROP-' || year_prefix || '-' || LPAD(next_number::TEXT, 6, '0');
        NEW.property_number := new_prop_number;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate property number
CREATE TRIGGER generate_property_number_trigger
    BEFORE INSERT ON properties
    FOR EACH ROW
    EXECUTE FUNCTION generate_property_number();

-- Function to calculate property age
CREATE OR REPLACE FUNCTION calculate_property_age()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.built_year IS NOT NULL THEN
        NEW.property_age := EXTRACT(YEAR FROM CURRENT_DATE) - NEW.built_year;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate property age
CREATE TRIGGER calculate_property_age_trigger
    BEFORE INSERT OR UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION calculate_property_age();

-- ============================================================================
-- SECTION 8: ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tenant-isolated tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_advertisements ENABLE ROW LEVEL SECURITY;

-- RLS Policy for properties (company isolation)
CREATE POLICY properties_company_isolation ON properties
    USING (company_id = current_setting('app.current_company_id')::UUID);

CREATE POLICY properties_insert_policy ON properties
    FOR INSERT
    WITH CHECK (company_id = current_setting('app.current_company_id')::UUID);

-- Similar policies for other tables...

-- ============================================================================
-- SECTION 9: VIEWS
-- ============================================================================

-- View for property summary with all relationships
CREATE OR REPLACE VIEW v_property_summary AS
SELECT 
    p.id,
    p.property_number,
    p.property_name,
    p.title,
    p.description,
    
    -- Company
    c.name as company_name,
    
    -- Classification
    pc.display_name as category_name,
    pt.display_name as type_name,
    psc.display_name as sub_category_name,
    
    -- Status
    ps.display_name as status_name,
    ps.color as status_color,
    
    -- Location
    r.display_name as region_name,
    d.display_name as district_name,
    n.display_name as neighborhood_name,
    co.display_name as compound_name,
    p.address,
    
    -- Specifications
    p.total_area,
    p.bedrooms_count,
    p.bathrooms_count,
    
    -- Pricing
    p.sale_price,
    p.rental_price_monthly,
    cur.code as currency_code,
    cur.symbol as currency_symbol,
    
    -- Assignment
    CONCAT(u1.first_name, ' ', u1.last_name) as handler_name,
    CONCAT(u2.first_name, ' ', u2.last_name) as sales_rep_name,
    
    -- Status flags
    p.is_featured,
    p.is_published,
    p.is_verified,
    
    -- Dates
    p.listing_date,
    p.created_at,
    p.updated_at
    
FROM properties p
LEFT JOIN companies c ON p.company_id = c.id
LEFT JOIN property_categories pc ON p.category_id = pc.id
LEFT JOIN property_types pt ON p.type_id = pt.id
LEFT JOIN property_sub_categories psc ON p.sub_category_id = psc.id
LEFT JOIN property_statuses ps ON p.status_id = ps.id
LEFT JOIN regions r ON p.region_id = r.id
LEFT JOIN districts d ON p.district_id = d.id
LEFT JOIN neighborhoods n ON p.neighborhood_id = n.id
LEFT JOIN compounds co ON p.compound_id = co.id
LEFT JOIN currencies cur ON p.currency_id = cur.id
LEFT JOIN users u1 ON p.assigned_handler_id = u1.id
LEFT JOIN users u2 ON p.sales_representative_id = u2.id
WHERE p.is_deleted = false;

-- ============================================================================
-- SECTION 10: SAMPLE DATA SEEDS (Optional)
-- ============================================================================

-- Insert default currencies
INSERT INTO currencies (code, symbol, name, display_name) VALUES
('USD', '$', 'US Dollar', 'US Dollar'),
('EUR', '€', 'Euro', 'Euro'),
('GBP', '£', 'British Pound', 'British Pound'),
('EGP', 'E£', 'Egyptian Pound', 'Egyptian Pound'),
('AED', 'AED', 'UAE Dirham', 'UAE Dirham'),
('SAR', 'SAR', 'Saudi Riyal', 'Saudi Riyal')
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- END OF UNIFIED PROPERTY DATABASE SCHEMA
-- ============================================================================

-- Notes:
-- 1. All tables support multi-tenancy via company_id
-- 2. Comprehensive audit trail with property_audit_logs
-- 3. Flexible custom fields using JSONB
-- 4. Full-text search enabled on properties
-- 5. Auto-generated property numbers (PROP-2025-000001)
-- 6. Row Level Security enabled for data isolation
-- 7. Proper indexing for performance
-- 8. Trigger-based automation (timestamps, calculations)
-- 9. Extensive lookup tables for flexibility
-- 10. Support for images, documents, utilities, distances, amenities, features
