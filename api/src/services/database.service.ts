import prisma from '../config/database';
import { TenantType, SubscriptionStatus } from '@prisma/client';

/**
 * TENANT OPERATIONS
 * 
 * These functions handle tenant creation and management
 */

// Create a new tenant (on subscription/registration)
export const createTenant = async (data: {
  name: string;
  mobile: string;
  type: TenantType;
}) => {
  return await prisma.tenant.create({
    data: {
      name: data.name,
      mobile: data.mobile,
      type: data.type,
      subscriptionStatus: SubscriptionStatus.TRIAL,
    },
  });
};

// Get tenant by ID
export const getTenantById = async (tenantId: string) => {
  return await prisma.tenant.findUnique({
    where: { id: tenantId },
    include: {
      users: true,
      _count: {
        select: {
          properties: true,
          leads: true,
          users: true,
        },
      },
    },
  });
};

// Update tenant subscription status
export const updateTenantSubscription = async (
  tenantId: string,
  status: SubscriptionStatus,
  subscriptionEnd?: Date
) => {
  return await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      subscriptionStatus: status,
      subscriptionEnd,
    },
  });
};

/**
 * USER OPERATIONS
 * 
 * These functions handle user creation and management within a tenant
 */

// Create owner user (when tenant is created)
export const createOwnerUser = async (data: {
  name: string;
  mobile: string;
  tenantId: string;
}) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      mobile: data.mobile,
      role: 'OWNER',
      tenantId: data.tenantId,
    },
  });
};

// Add employee to a tenant (by owner/manager)
export const addEmployeeToTenant = async (data: {
  name: string;
  mobile: string;
  role: 'MANAGER' | 'EMPLOYEE';
  tenantId: string;
}) => {
  // Check if mobile already exists
  const existingUser = await prisma.user.findUnique({
    where: { mobile: data.mobile },
  });

  if (existingUser) {
    throw new Error('Mobile number already registered');
  }

  return await prisma.user.create({
    data: {
      name: data.name,
      mobile: data.mobile,
      role: data.role,
      tenantId: data.tenantId,
    },
  });
};

// Get user by mobile (for authentication)
export const getUserByMobile = async (mobile: string) => {
  return await prisma.user.findUnique({
    where: { mobile },
    include: {
      tenant: true,
    },
  });
};

// Get all users in a tenant
export const getUsersByTenant = async (tenantId: string) => {
  return await prisma.user.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * PROPERTY OPERATIONS
 * 
 * These functions handle property CRUD with tenant isolation
 */

// Create a property (tenant-scoped)
export const createProperty = async (data: {
  property_name?: string;
  title?: string;
  description?: string;
  sale_price?: number;
  rental_price_monthly?: number;
  gps_latitude?: number;
  gps_longitude?: number;
  address?: string;
  bedrooms_count?: number;
  bathrooms_count?: number;
  total_area?: number;
  type_id?: string;
  region_id?: string;
  category_id?: string;
  status_id?: string;
  finishing_status_id?: string;
  company_id: string;
  created_by_id: string;
}) => {
  return await prisma.property.create({
    data: {
      ...data,
      property_number: `PROP-${Date.now()}`, // Generate property number
      updated_at: new Date()
    },
    include: {
      property_types: true,
      regions: true,
      property_categories: true,
      property_statuses: true,
      finishing_statuses: true,
      users_properties_created_by_idTousers: {
        select: {
          id: true,
          name: true,
          mobile: true,
        },
      },
    },
  });
};

// Get all properties for a tenant (company)
export const getPropertiesByTenant = async (tenantId: string, skip: number = 0, take: number = 20) => {
  return await prisma.property.findMany({
    where: { company_id: tenantId },
    skip,
    take,
    include: {
      property_types: true,
      property_statuses: true,
      property_categories: true,
      regions: true,
      districts: true,
      finishing_statuses: true,
      property_images: {
        orderBy: { display_order: 'asc' },
        take: 5
      },
      users_properties_created_by_idTousers: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { created_at: 'desc' },
  });
};

// Count total properties for a tenant
export const countPropertiesByTenant = async (tenantId: string) => {
  return await prisma.property.count({
    where: { company_id: tenantId },
  });
};

// Count published properties for a tenant
export const countPublishedPropertiesByTenant = async (tenantId: string) => {
  return await prisma.property.count({
    where: {
      company_id: tenantId,
      is_published: true,
      show_on_website: true,
    },
  });
};

// Get recent properties with details for dashboard
export const getRecentProperties = async (tenantId: string, limit: number = 5) => {
  return await prisma.property.findMany({
    where: { company_id: tenantId },
    take: limit,
    orderBy: { created_at: 'desc' },
    include: {
      property_types: {
        select: {
          name: true,
          display_name: true,
        },
      },
      property_statuses: {
        select: {
          name: true,
          display_name: true,
        },
      },
      regions: {
        select: {
          name: true,
          display_name: true,
        },
      },
      currencies: {
        select: {
          code: true,
          symbol: true,
        },
      },
    },
  });
};

// Get public properties (for anonymous users)
export const getPublicProperties = async (filters?: {
  propertyTypeId?: string;
  regionId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return await prisma.property.findMany({
    where: {
      is_published: true,
      show_on_website: true,
      is_deleted: false,
      ...(filters?.propertyTypeId && { type_id: filters.propertyTypeId }),
      ...(filters?.regionId && { region_id: filters.regionId }),
      ...(filters?.categoryId && { category_id: filters.categoryId }),
      ...(filters?.minPrice && {
        OR: [
          { sale_price: { gte: filters.minPrice } },
          { rental_price_monthly: { gte: filters.minPrice } }
        ]
      }),
      ...(filters?.maxPrice && {
        OR: [
          { sale_price: { lte: filters.maxPrice } },
          { rental_price_monthly: { lte: filters.maxPrice } }
        ]
      }),
    },
    include: {
      property_types: true,
      property_statuses: true,
      property_categories: true,
      regions: true,
      finishing_statuses: true,
      property_images: {
        orderBy: { display_order: 'asc' },
        take: 1
      }
    },
    orderBy: { created_at: 'desc' },
  });
};

// Get nearest properties by coordinates (Haversine formula approximation)
export const getNearestProperties = async (
  latitude: number,
  longitude: number,
  radiusKm: number = 10
) => {
  // Simple bounding box filter (for performance)
  // 1 degree latitude ≈ 111 km, 1 degree longitude ≈ 111 km * cos(latitude)
  const latDelta = radiusKm / 111;
  const lonDelta = radiusKm / (111 * Math.cos((latitude * Math.PI) / 180));

  return await prisma.property.findMany({
    where: {
      is_published: true,
      show_on_website: true,
      is_deleted: false,
      gps_latitude: {
        gte: latitude - latDelta,
        lte: latitude + latDelta,
      },
      gps_longitude: {
        gte: longitude - lonDelta,
        lte: longitude + lonDelta,
      },
    },
    include: {
      property_types: true,
      regions: true,
      property_categories: true,
      property_statuses: true,
    },
    take: 50,
  });
};

// Toggle property public visibility
export const togglePropertyVisibility = async (
  propertyId: string,
  _tenantId: string, // Kept for backwards compatibility but not used
  isPublished: boolean
) => {
  return await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: { 
      is_published: isPublished,
      show_on_website: isPublished
    },
  });
};

/**
 * LEAD OPERATIONS
 * 
 * These functions handle lead CRUD with tenant isolation
 */

// Create a lead
export const createLead = async (data: {
  name: string;
  mobile: string;
  email?: string;
  source: string;
  status?: string;
  notes?: string;
  tenantId: string;
  assignedToId?: string;
}) => {
  return await prisma.lead.create({
    data: data as any,
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
          mobile: true,
        },
      },
    },
  });
};

// Get all leads for a tenant
export const getLeadsByTenant = async (tenantId: string) => {
  return await prisma.lead.findMany({
    where: { tenantId },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

// Get leads assigned to a specific user
export const getLeadsByUser = async (userId: string, tenantId: string) => {
  return await prisma.lead.findMany({
    where: {
      assignedToId: userId,
      tenantId,
    },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * STATIC DATA OPERATIONS (Tenant-Scoped Dropdowns)
 * 
 * These functions manage tenant-specific dropdown values
 */

// Property Types
export const createPropertyType = async (name: string, tenantId: string) => {
  return await prisma.propertyType.create({
    data: { name, company_id: tenantId, updated_at: new Date() },
  });
};

export const getPropertyTypes = async (tenantId: string) => {
  return await prisma.propertyType.findMany({
    where: { company_id: tenantId, is_active: true },
    orderBy: { name: 'asc' },
  });
};

// Regions
export const createRegion = async (name: string, tenantId: string) => {
  return await prisma.region.create({
    data: { name, company_id: tenantId, updated_at: new Date() },
  });
};

export const getRegions = async (tenantId: string) => {
  return await prisma.region.findMany({
    where: { company_id: tenantId, is_active: true },
    orderBy: { display_name: 'asc' },
  });
};

// Categories
export const createCategory = async (name: string, tenantId: string) => {
  const { randomUUID } = require('crypto');
  return await prisma.property_categories.create({
    data: { 
      id: randomUUID(),
      name, 
      company_id: tenantId,
      updated_at: new Date()
    },
  });
};

export const getCategories = async (tenantId: string) => {
  return await prisma.property_categories.findMany({
    where: { company_id: tenantId, is_active: true },
    orderBy: { name: 'asc' },
  });
};

// Property Statuses (was Listing Statuses)
export const createPropertyStatus = async (name: string, tenantId: string) => {
  const { randomUUID } = require('crypto');
  return await prisma.property_statuses.create({
    data: { 
      id: randomUUID(),
      name, 
      company_id: tenantId,
      updated_at: new Date()
    },
  });
};

export const getPropertyStatuses = async (tenantId: string) => {
  return await prisma.property_statuses.findMany({
    where: { company_id: tenantId, is_active: true },
    orderBy: { name: 'asc' },
  });
};

// Finishing Statuses (NEW)
export const getFinishingStatuses = async (tenantId: string) => {
  return await prisma.finishing_statuses.findMany({
    where: { company_id: tenantId, is_active: true },
    orderBy: { name: 'asc' },
  });
};

// Districts (NEW)
export const getDistricts = async (tenantId: string, regionId?: string) => {
  return await prisma.districts.findMany({
    where: { 
      company_id: tenantId, 
      is_active: true,
      ...(regionId && { region_id: regionId })
    },
    orderBy: { name: 'asc' },
  });
};

// Compounds (NEW)
export const getCompounds = async (tenantId: string, districtId?: string) => {
  return await prisma.compounds.findMany({
    where: { 
      company_id: tenantId, 
      is_active: true,
      ...(districtId && { district_id: districtId })
    },
    orderBy: { name: 'asc' },
  });
};

/**
 * ACTIVITY OPERATIONS
 * 
 * These functions handle activities (tasks, notes, meetings) linked to leads or properties
 */

// Create a new activity
export const createActivity = async (data: {
  type: 'TASK' | 'NOTE' | 'MEETING';
  title: string;
  description?: string;
  status?: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dateTime?: Date;
  reminderTime?: Date;
  linkedType: 'LEAD' | 'PROPERTY';
  linkedId: string;
  tenantId: string;
  assignedToId?: string;
  createdById: string;
}) => {
  return await prisma.activity.create({
    data,
    include: {
      assignedTo: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });
};

// Get activities by tenant (with optional filters)
export const getActivitiesByTenant = async (
  tenantId: string,
  filters?: {
    linkedType?: 'LEAD' | 'PROPERTY';
    linkedId?: string;
    assignedToId?: string;
    status?: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    type?: 'TASK' | 'NOTE' | 'MEETING';
  }
) => {
  return await prisma.activity.findMany({
    where: {
      tenantId,
      ...filters,
    },
    include: {
      assignedTo: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
    orderBy: [
      { dateTime: 'asc' },
      { createdAt: 'desc' },
    ],
  });
};

// Get activity by ID
export const getActivityById = async (activityId: string, tenantId: string) => {
  return await prisma.activity.findFirst({
    where: { id: activityId, tenantId },
    include: {
      assignedTo: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });
};

// Update activity
export const updateActivity = async (
  activityId: string,
  tenantId: string,
  data: {
    type?: 'TASK' | 'NOTE' | 'MEETING';
    title?: string;
    description?: string;
    status?: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    dateTime?: Date;
    reminderTime?: Date;
    assignedToId?: string;
  }
) => {
  return await prisma.activity.update({
    where: { id: activityId, tenantId },
    data,
    include: {
      assignedTo: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });
};

// Delete activity
export const deleteActivity = async (activityId: string, tenantId: string) => {
  return await prisma.activity.delete({
    where: { id: activityId, tenantId },
  });
};

// Get upcoming activities (for notifications)
export const getUpcomingActivities = async (
  tenantId: string,
  assignedToId?: string,
  hoursAhead: number = 24
) => {
  const now = new Date();
  const future = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);
  
  return await prisma.activity.findMany({
    where: {
      tenantId,
      ...(assignedToId && { assignedToId }),
      status: 'PENDING',
      dateTime: {
        gte: now,
        lte: future,
      },
    },
    include: {
      assignedTo: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
    orderBy: { dateTime: 'asc' },
  });
};

// Get overdue activities
export const getOverdueActivities = async (
  tenantId: string,
  assignedToId?: string
) => {
  const now = new Date();
  
  return await prisma.activity.findMany({
    where: {
      tenantId,
      ...(assignedToId && { assignedToId }),
      status: 'PENDING',
      dateTime: {
        lt: now,
      },
    },
    include: {
      assignedTo: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
    orderBy: { dateTime: 'desc' },
  });
};

/**
 * COMPANY PROFILE OPERATIONS
 * 
 * Functions for managing company/tenant profile information
 */

// Get tenant profile
export const getTenantProfile = async (tenantId: string) => {
  return await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: {
      id: true,
      name: true,
      companyName: true,
      logoUrl: true,
      address: true,
      city: true,
      region: true,
      country: true,
      phone: true,
      email: true,
      website: true,
      description: true,
      mobile: true,
      type: true,
      subscriptionStatus: true,
    },
  });
};

// Update tenant profile
export const updateTenantProfile = async (
  tenantId: string,
  data: {
    companyName?: string;
    logoUrl?: string;
    address?: string;
    city?: string;
    region?: string;
    country?: string;
    phone?: string;
    email?: string;
    website?: string;
    description?: string;
  }
) => {
  return await prisma.tenant.update({
    where: { id: tenantId },
    data,
  });
};

/**
 * EMPLOYEE MANAGEMENT OPERATIONS
 * 
 * Functions for creating and managing employees within a tenant
 */

// Create employee
export const createEmployee = async (data: {
  name: string;
  mobile: string;
  email?: string;
  role: string;
  status: string;
  tenantId: string;
  temporaryPin: string;
  pinResetRequired: boolean;
}) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      role: data.role as any,
      status: data.status as any,
      tenantId: data.tenantId,
      temporaryPin: data.temporaryPin,
      pinResetRequired: data.pinResetRequired,
    },
    select: {
      id: true,
      name: true,
      mobile: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

// Update employee
export const updateEmployee = async (
  userId: string,
  tenantId: string,
  data: {
    name?: string;
    mobile?: string;
    email?: string;
    role?: string;
    status?: string;
  }
) => {
  // Verify employee belongs to tenant
  const employee = await prisma.user.findFirst({
    where: { id: userId, tenantId },
  });

  if (!employee) {
    return null;
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.mobile && { mobile: data.mobile }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.role && { role: data.role as any }),
      ...(data.status && { status: data.status as any }),
    },
    select: {
      id: true,
      name: true,
      mobile: true,
      email: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });
};

// Deactivate employee
export const deactivateEmployee = async (userId: string, tenantId: string) => {
  // Verify employee belongs to tenant
  const employee = await prisma.user.findFirst({
    where: { id: userId, tenantId },
  });

  if (!employee) {
    return null;
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      status: 'INACTIVE',
      isActive: false,
    },
  });
};

// Reset employee PIN
export const resetEmployeePin = async (
  userId: string,
  tenantId: string,
  newPin: string
) => {
  // Verify employee belongs to tenant
  const employee = await prisma.user.findFirst({
    where: { id: userId, tenantId },
  });

  if (!employee) {
    return null;
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      temporaryPin: newPin,
      pinResetRequired: true,
    },
  });
};
