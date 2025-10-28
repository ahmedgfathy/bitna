// Property types based on new unified database schema

export interface Property {
  id: string;
  company_id: string;
  property_number?: string;
  
  // Basic Info
  property_name?: string;
  title?: string;
  description?: string;
  
  // Classification
  category_id?: string;
  type_id?: string;
  status_id?: string;
  sub_category_id?: string;
  
  // Nested objects (from database joins)
  category?: PropertyCategory;
  type?: PropertyType;
  status?: PropertyStatus;
  sub_category?: PropertySubCategory;
  
  // Location
  region_id?: string;
  district_id?: string;
  neighborhood_id?: string;
  compound_id?: string;
  address?: string;
  street?: string;
  building_name?: string;
  unit_number?: string;
  floor_number?: string;
  postal_code?: string;
  
  // Nested location objects
  region?: Region;
  district?: District;
  neighborhood?: Neighborhood;
  compound?: Compound;
  
  // Coordinates
  latitude?: number;
  longitude?: number;
  
  // Size & Layout
  land_area?: number;
  built_area?: number;
  total_area?: number;
  garden_area?: number;
  roof_area?: number;
  
  // Rooms
  rooms_count?: number;
  bedrooms_count?: number;
  bathrooms_count?: number;
  living_rooms_count?: number;
  kitchen_count?: number;
  maid_rooms_count?: number;
  storage_rooms_count?: number;
  
  // Floors & Parking
  total_floors_in_building?: number;
  parking_spaces?: number;
  
  // Status & Condition
  furnishing_status_id?: string;
  construction_status_id?: string;
  finishing_status_id?: string;
  condition_id?: string;
  ownership_status_id?: string;
  
  // Nested status objects
  furnishing_status?: FurnishingStatus;
  construction_status?: ConstructionStatus;
  finishing_status?: FinishingStatus;
  condition?: PropertyCondition;
  ownership_status?: OwnershipStatus;
  
  // Features
  has_garden?: boolean;
  has_pool?: boolean;
  has_gym?: boolean;
  has_parking?: boolean;
  has_elevator?: boolean;
  has_balcony?: boolean;
  has_terrace?: boolean;
  has_security?: boolean;
  has_central_ac?: boolean;
  has_kitchen_appliances?: boolean;
  
  // View & Orientation
  view_type_id?: string;
  orientation_id?: string;
  view_type?: ViewType;
  orientation?: Orientation;
  
  // Pricing
  sale_price?: number;
  rental_price_monthly?: number;
  rental_price_yearly?: number;
  price_per_meter?: number;
  currency_id?: string;
  currency?: Currency;
  
  // Payment
  payment_plan?: string;
  down_payment_percentage?: number;
  installment_years?: number;
  
  // Listing
  listing_purpose_id?: string;
  listing_purpose?: ListingPurpose;
  priority_level_id?: string;
  priority_level?: PriorityLevel;
  is_featured?: boolean;
  is_verified?: boolean;
  is_active?: boolean;
  is_available?: boolean;
  is_negotiable?: boolean;
  
  // External
  ref_number?: string;
  owner_name?: string;
  owner_phone?: string;
  owner_email?: string;
  
  // User & Tenant
  created_by_id?: string;
  updated_by_id?: string;
  assigned_to_id?: string;
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  available_from?: string;
  expires_at?: string;
  
  // Metadata
  views_count?: number;
  inquiries_count?: number;
  notes?: string;
  tags?: string;
  
  // Relations
  images?: PropertyImage[];
  documents?: PropertyDocument[];
  amenities?: Amenity[];
  features?: Feature[];
  utilities?: PropertyUtility[];
  distances?: PropertyDistance[];
}

// Lookup Tables
export interface PropertyCategory {
  id: string;
  name: string;
  name_ar?: string;
  description?: string;
  icon?: string;
  color?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface PropertyType {
  id: string;
  name: string;
  name_ar?: string;
  description?: string;
  category_id?: string;
  icon?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface PropertyStatus {
  id: string;
  name: string;
  name_ar?: string;
  description?: string;
  color?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface PropertySubCategory {
  id: string;
  name: string;
  name_ar?: string;
  description?: string;
  category_id?: string;
  is_active?: boolean;
}

export interface FurnishingStatus {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface ConstructionStatus {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface FinishingStatus {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface PropertyCondition {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface OwnershipStatus {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}

// Location Types
export interface Region {
  id: string;
  name: string;
  display_name?: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface District {
  id: string;
  name: string;
  display_name?: string;
  description?: string;
  region_id?: string;
  is_active?: boolean;
}

export interface Neighborhood {
  id: string;
  name: string;
  display_name?: string;
  description?: string;
  district_id?: string;
  is_active?: boolean;
}

export interface Compound {
  id: string;
  name: string;
  display_name?: string;
  description?: string;
  developer?: string;
  neighborhood_id?: string;
  is_active?: boolean;
}

// Other Lookups
export interface ViewType {
  id: string;
  name: string;
  description?: string;
}

export interface Orientation {
  id: string;
  name: string;
  description?: string;
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol?: string;
  exchange_rate?: number;
}

export interface ListingPurpose {
  id: string;
  name: string;
  description?: string;
}

export interface PriorityLevel {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

// Related Data
export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  title?: string;
  description?: string;
  display_order?: number;
  is_primary?: boolean;
}

export interface PropertyDocument {
  id: string;
  property_id: string;
  document_url: string;
  document_type?: string;
  title?: string;
  description?: string;
}

export interface Amenity {
  id: string;
  name: string;
  name_ar?: string;
  icon?: string;
  category?: string;
}

export interface Feature {
  id: string;
  name: string;
  name_ar?: string;
  icon?: string;
  category?: string;
}

export interface PropertyUtility {
  id: string;
  property_id: string;
  utility_name: string;
  has_connection?: boolean;
  notes?: string;
}

export interface PropertyDistance {
  id: string;
  property_id: string;
  landmark_name: string;
  distance_km?: number;
  travel_time_minutes?: number;
}

// Filter & Search Types
export interface PropertyFilters {
  search?: string;
  category_id?: string;
  type_id?: string;
  status_id?: string;
  region_id?: string;
  district_id?: string;
  compound_id?: string;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  bedrooms?: number;
  bathrooms?: number;
  listing_purpose?: string;
  is_featured?: boolean;
  is_active?: boolean;
}

// API Response Types
export interface PropertiesResponse {
  status: 'success' | 'error';
  data: Property[];
  count: number;
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
}

export interface PropertyResponse {
  status: 'success' | 'error';
  data: Property;
  message?: string;
}

// Legacy compatibility (for gradual migration)
export type PropertyType_Legacy = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  propertyType: string;
  category: string;
  region: string;
  isPublic: boolean;
};
