import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import prisma from './config/database.js';
import { checkDatabaseConnection } from './config/database.js';

// Create MCP server instance
const server = new Server(
  {
    name: 'contaboo-mcp-server',
    version: '1.0.0',
    description: 'MCP Server for Contaboo Real Estate CRM - Connects to project database only',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools schema
const tools = {
  getProperties: {
    name: 'get_properties',
    description: 'Retrieve properties from the Contaboo database',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Maximum number of properties to return',
          default: 10,
        },
        offset: {
          type: 'number',
          description: 'Number of properties to skip for pagination',
          default: 0,
        },
        status: {
          type: 'string',
          description: 'Filter by property status',
          enum: ['ACTIVE', 'SOLD', 'RENTED', 'PENDING'],
        },
        type: {
          type: 'string',
          description: 'Filter by property type',
        },
        region: {
          type: 'string',
          description: 'Filter by property region',
        },
        minPrice: {
          type: 'number',
          description: 'Minimum price filter',
        },
        maxPrice: {
          type: 'number',
          description: 'Maximum price filter',
        },
      },
    },
  },
  getLeads: {
    name: 'get_leads',
    description: 'Retrieve leads from the Contaboo database',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Maximum number of leads to return',
          default: 10,
        },
        offset: {
          type: 'number',
          description: 'Number of leads to skip for pagination',
          default: 0,
        },
        status: {
          type: 'string',
          description: 'Filter by lead status',
          enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'NEGOTIATING', 'WON', 'LOST'],
        },
        source: {
          type: 'string',
          description: 'Filter by lead source',
          enum: ['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'DIRECT_CALL', 'WALK_IN', 'OTHER'],
        },
        assignedTo: {
          type: 'string',
          description: 'Filter by assigned user ID',
        },
      },
    },
  },
  getUsers: {
    name: 'get_users',
    description: 'Retrieve users from the Contaboo database',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Maximum number of users to return',
          default: 10,
        },
        offset: {
          type: 'number',
          description: 'Number of users to skip for pagination',
          default: 0,
        },
        role: {
          type: 'string',
          description: 'Filter by user role',
          enum: ['OWNER', 'MANAGER', 'SALES_AGENT', 'MARKETER', 'ADMIN_ASSISTANT', 'EMPLOYEE'],
        },
        status: {
          type: 'string',
          description: 'Filter by user status',
          enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
        },
      },
    },
  },
  getActivities: {
    name: 'get_activities',
    description: 'Retrieve activities from the Contaboo database',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Maximum number of activities to return',
          default: 10,
        },
        offset: {
          type: 'number',
          description: 'Number of activities to skip for pagination',
          default: 0,
        },
        type: {
          type: 'string',
          description: 'Filter by activity type',
          enum: ['TASK', 'NOTE', 'MEETING'],
        },
        status: {
          type: 'string',
          description: 'Filter by activity status',
          enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
        },
        priority: {
          type: 'string',
          description: 'Filter by activity priority',
          enum: ['LOW', 'MEDIUM', 'HIGH'],
        },
        assignedTo: {
          type: 'string',
          description: 'Filter by assigned user ID',
        },
      },
    },
  },
  getStats: {
    name: 'get_stats',
    description: 'Get comprehensive dashboard statistics from the Contaboo database including properties by type, status, region, leads analytics, team metrics, and recent activities',
    inputSchema: {
      type: 'object',
      properties: {
        tenantId: {
          type: 'string',
          description: 'Tenant ID to filter statistics (optional, returns global stats if not provided)',
        },
        includeRecent: {
          type: 'boolean',
          description: 'Include recent properties and activities in the response',
          default: true,
        },
      },
    },
  },
  getDashboardStats: {
    name: 'get_dashboard_stats',
    description: 'Get detailed dashboard statistics with property analytics, lead funnel, team metrics, and financial insights',
    inputSchema: {
      type: 'object',
      properties: {
        tenantId: {
          type: 'string',
          description: 'Tenant ID to filter statistics',
          required: false,
        },
      },
    },
  },
  getStaticData: {
    name: 'get_static_data',
    description: 'Get static data dropdown options from the Contaboo database',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'Type of static data to retrieve',
          enum: ['property_types', 'regions', 'categories', 'statuses', 'amenities'],
          required: true,
        },
      },
    },
  },
};

// Handle tool calls
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Object.values(tools),
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const { name, arguments: args } = request.params;

  try {
    // Validate arguments using Zod
    const validatedArgs = args ? JSON.parse(args) : {};

    switch (name) {
      case 'get_properties':
        return await handleGetProperties(validatedArgs);
      case 'get_leads':
        return await handleGetLeads(validatedArgs);
      case 'get_users':
        return await handleGetUsers(validatedArgs);
      case 'get_activities':
        return await handleGetActivities(validatedArgs);
      case 'get_stats':
        return await handleGetStats(validatedArgs);
      case 'get_dashboard_stats':
        return await handleGetDashboardStats(validatedArgs);
      case 'get_static_data':
        return await handleGetStaticData(validatedArgs);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    throw new Error(`Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

// Tool handler functions
async function handleGetProperties(args: any) {
  const { limit = 10, offset = 0, status, type, region, minPrice, maxPrice } = args;

  const where: any = {
    is_deleted: false,
  };

  if (status) where.status_id = { in: getStatusIds(status) };
  if (type) where.type_id = { in: await getTypeIds(type) };
  if (region) where.region_id = { in: await getRegionIds(region) };
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.OR = [
      { sale_price: { gte: minPrice || 0, lte: maxPrice || Infinity } },
      { rental_price_monthly: { gte: minPrice || 0, lte: maxPrice || Infinity } },
    ];
  }

  const properties = await prisma.property.findMany({
    where,
    include: {
      property_types: true,
      regions: true,
      property_statuses: true,
      users_properties_assigned_handler_idTousers: {
        select: { id: true, name: true, mobile: true },
      },
    },
    orderBy: { created_at: 'desc' },
    take: limit,
    skip: offset,
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(properties, null, 2),
      },
    ],
  };
}

async function handleGetLeads(args: any) {
  const { limit = 10, offset = 0, status, source, assignedTo } = args;

  const where: any = {};

  if (status) where.status = status;
  if (source) where.source = source;
  if (assignedTo) where.assignedToId = assignedTo;

  const leads = await prisma.lead.findMany({
    where,
    include: {
      assignedTo: {
        select: { id: true, name: true, mobile: true },
      },
      tenant: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(leads, null, 2),
      },
    ],
  };
}

async function handleGetUsers(args: any) {
  const { limit = 10, offset = 0, role, status } = args;

  const where: any = {};

  if (role) where.role = role;
  if (status) where.status = status;

  const users = await prisma.user.findMany({
    where,
    include: {
      tenant: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(users, null, 2),
      },
    ],
  };
}

async function handleGetActivities(args: any) {
  const { limit = 10, offset = 0, type, status, priority, assignedTo } = args;

  const where: any = {};

  if (type) where.type = type;
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (assignedTo) where.assignedToId = assignedTo;

  const activities = await prisma.activity.findMany({
    where,
    include: {
      assignedTo: {
        select: { id: true, name: true, mobile: true },
      },
      createdBy: {
        select: { id: true, name: true, mobile: true },
      },
      tenant: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(activities, null, 2),
      },
    ],
  };
}

async function handleGetStats(args: any) {
  const { tenantId, includeRecent = true } = args;
  
  const where: any = { is_deleted: false };
  if (tenantId) where.company_id = tenantId;

  const [
    totalProperties,
    totalLeads,
    totalUsers,
    recentActivities,
    publishedProperties,
    recentProperties
  ] = await Promise.all([
    prisma.property.count({ where }),
    tenantId ? prisma.lead.count({ where: { tenantId } }) : prisma.lead.count(),
    prisma.user.count({ where: { ...(tenantId && { tenantId }), status: 'ACTIVE' } }),
    prisma.activity.count({ 
      where: { 
        ...(tenantId && { tenantId }),
        dateTime: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
      } 
    }),
    prisma.property.count({ where: { ...where, is_published: true } }),
    includeRecent ? prisma.property.findMany({
      where,
      include: {
        property_types: { select: { name: true } },
        regions: { select: { name: true } },
        property_statuses: { select: { name: true } },
      },
      orderBy: { created_at: 'desc' },
      take: 5,
    }) : Promise.resolve([]),
  ]);

  const stats = {
    properties: {
      total: totalProperties,
      published: publishedProperties,
      private: totalProperties - publishedProperties,
    },
    leads: totalLeads,
    users: totalUsers,
    recentActivities,
    recentProperties: includeRecent ? recentProperties : [],
    timestamp: new Date().toISOString(),
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(stats, null, 2),
      },
    ],
  };
}

async function handleGetDashboardStats(args: any) {
  const { tenantId } = args;
  
  const where: any = { is_deleted: false };
  if (tenantId) where.company_id = tenantId;

  const leadWhere: any = {};
  if (tenantId) leadWhere.tenantId = tenantId;

  const userWhere: any = {};
  if (tenantId) userWhere.tenantId = tenantId;

  // Fetch all data in parallel
  const [
    propertiesCount,
    publishedCount,
    leads,
    users,
    propertyByType,
    propertyByStatus,
    propertyByRegion,
    valueStats,
    recentProperties,
    recentActivities
  ] = await Promise.all([
    prisma.property.count({ where }),
    prisma.property.count({ where: { ...where, is_published: true } }),
    prisma.lead.findMany({
      where: leadWhere,
      select: { status: true, source: true },
    }),
    prisma.user.findMany({
      where: userWhere,
      select: { role: true, status: true },
    }),
    // Properties by type with aggregation
    prisma.$queryRaw`
      SELECT 
        pt.id as type_id,
        pt.name as type,
        COUNT(p.id) as count
      FROM properties p
      LEFT JOIN property_types pt ON p.type_id = pt.id
      WHERE p.is_deleted = false ${tenantId ? prisma.$queryRaw`AND p.company_id = ${tenantId}` : prisma.$queryRaw``}
      GROUP BY pt.id, pt.name
      ORDER BY count DESC
      LIMIT 10
    ` as Promise<any[]>,
    // Properties by status
    prisma.$queryRaw`
      SELECT 
        ps.id as status_id,
        ps.name as status,
        COUNT(p.id) as count
      FROM properties p
      LEFT JOIN property_statuses ps ON p.status_id = ps.id
      WHERE p.is_deleted = false ${tenantId ? prisma.$queryRaw`AND p.company_id = ${tenantId}` : prisma.$queryRaw``}
      GROUP BY ps.id, ps.name
      ORDER BY count DESC
    ` as Promise<any[]>,
    // Properties by region
    prisma.$queryRaw`
      SELECT 
        r.id as region_id,
        r.name as region,
        COUNT(p.id) as count
      FROM properties p
      LEFT JOIN regions r ON p.region_id = r.id
      WHERE p.is_deleted = false ${tenantId ? prisma.$queryRaw`AND p.company_id = ${tenantId}` : prisma.$queryRaw``}
      GROUP BY r.id, r.name
      ORDER BY count DESC
      LIMIT 10
    ` as Promise<any[]>,
    // Value statistics
    prisma.$queryRaw`
      SELECT 
        COALESCE(SUM(COALESCE(sale_price, rental_price_monthly * 12, 0)), 0) as total_value,
        COALESCE(AVG(COALESCE(sale_price, rental_price_monthly * 12, 0)), 0) as avg_value,
        COALESCE(MIN(COALESCE(sale_price, rental_price_monthly * 12, 0)), 0) as min_value,
        COALESCE(MAX(COALESCE(sale_price, rental_price_monthly * 12, 0)), 0) as max_value
      FROM properties
      WHERE is_deleted = false ${tenantId ? prisma.$queryRaw`AND company_id = ${tenantId}` : prisma.$queryRaw``}
    ` as Promise<any[]>,
    // Recent properties
    prisma.property.findMany({
      where,
      include: {
        property_types: { select: { name: true } },
        regions: { select: { name: true } },
        property_statuses: { select: { name: true } },
        property_images: {
          orderBy: { display_order: 'asc' },
          take: 1,
        },
      },
      orderBy: { created_at: 'desc' },
      take: 5,
    }),
    // Recent activities
    prisma.activity.findMany({
      where: {
        ...(tenantId && { tenantId }),
        dateTime: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
      include: {
        assignedTo: { select: { name: true } },
        createdBy: { select: { name: true } },
      },
      orderBy: { dateTime: 'desc' },
      take: 10,
    }),
  ]);

  // Process value stats
  const valueStatsData = valueStats[0] || {
    total_value: 0,
    avg_value: 0,
    min_value: 0,
    max_value: 0,
  };

  // Lead statistics
  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'NEW').length,
    contacted: leads.filter(l => l.status === 'CONTACTED').length,
    qualified: leads.filter(l => l.status === 'QUALIFIED').length,
    negotiating: leads.filter(l => l.status === 'NEGOTIATING').length,
    won: leads.filter(l => l.status === 'WON').length,
    lost: leads.filter(l => l.status === 'LOST').length,
    bySource: leads.reduce((acc: any, lead) => {
      const source = lead.source || 'UNKNOWN';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {}),
  };

  // Team statistics
  const teamStats = {
    total: users.length,
    active: users.filter(u => u.status === 'ACTIVE').length,
    employees: users.filter(u => u.role === 'EMPLOYEE').length,
    managers: users.filter(u => u.role === 'MANAGER').length,
    owners: users.filter(u => u.role === 'OWNER').length,
  };

  const dashboardStats = {
    properties: {
      total: propertiesCount,
      public: publishedCount,
      private: propertiesCount - publishedCount,
      byType: propertyByType.map((item: any) => ({
        type_id: item.type_id,
        type: item.type || 'Unknown',
        count: Number(item.count),
      })),
      byStatus: propertyByStatus.map((item: any) => ({
        status_id: item.status_id,
        status: item.status || 'Unknown',
        count: Number(item.count),
      })),
      byRegion: propertyByRegion.map((item: any) => ({
        region_id: item.region_id,
        region: item.region || 'Unknown',
        count: Number(item.count),
      })),
      valueStats: {
        total_value: Number(valueStatsData.total_value),
        avg_value: Number(valueStatsData.avg_value),
        min_value: Number(valueStatsData.min_value),
        max_value: Number(valueStatsData.max_value),
      },
      recent: recentProperties.map(p => ({
        id: p.id,
        property_number: p.property_number,
        property_name: p.property_name,
        title: p.title,
        type: p.property_types?.name,
        region: p.regions?.name,
        status: p.property_statuses?.name,
        sale_price: p.sale_price ? Number(p.sale_price) : null,
        rental_price_monthly: p.rental_price_monthly ? Number(p.rental_price_monthly) : null,
        image: p.property_images[0]?.image_url || null,
        created_at: p.created_at,
      })),
    },
    leads: leadStats,
    team: teamStats,
    recentActivities: recentActivities.map(a => ({
      id: a.id,
      type: a.type,
      title: a.title,
      description: a.description,
      status: a.status,
      priority: a.priority,
      assignedTo: a.assignedTo?.name,
      createdBy: a.createdBy?.name,
      linkedType: a.linkedType,
      linkedId: a.linkedId,
      dateTime: a.dateTime,
    })),
    timestamp: new Date().toISOString(),
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(dashboardStats, null, 2),
      },
    ],
  };
}

async function handleGetStaticData(args: any) {
  const { type } = args;

  let result: any[] = [];

  switch (type) {
    case 'property_types':
      result = await prisma.propertyType.findMany({
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
      });
      break;
    case 'regions':
      result = await prisma.region.findMany({
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
      });
      break;
    case 'categories':
      result = await prisma.property_categories.findMany({
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
      });
      break;
    case 'statuses':
      result = await prisma.property_statuses.findMany({
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
      });
      break;
    case 'amenities':
      result = await prisma.amenities.findMany({
        where: { is_active: true },
        orderBy: { sort_order: 'asc' },
      });
      break;
    default:
      throw new Error(`Unknown static data type: ${type}`);
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

// Helper functions
async function getStatusIds(status: string) {
  const statusRecord = await prisma.property_statuses.findFirst({
    where: { name: status, is_active: true },
  });
  return statusRecord ? [statusRecord.id] : [];
}

async function getTypeIds(type: string) {
  const typeRecord = await prisma.propertyType.findFirst({
    where: { name: type, is_active: true },
  });
  return typeRecord ? [typeRecord.id] : [];
}

async function getRegionIds(region: string) {
  const regionRecord = await prisma.region.findFirst({
    where: { name: region, is_active: true },
  });
  return regionRecord ? [regionRecord.id] : [];
}

// Health check endpoint
server.setRequestHandler(ListToolsRequestSchema, async () => {
  const dbHealth = await checkDatabaseConnection();
  
  return {
    tools: Object.values(tools),
    metadata: {
      health: dbHealth,
      timestamp: new Date().toISOString(),
    },
  };
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  // Log to stderr only (MCP requires stdout to be JSON only)
  console.error('[MCP Server] Contaboo MCP Server started');
  
  // Initial health check
  const health = await checkDatabaseConnection();
  console.error('[MCP Server] Database health:', JSON.stringify(health));
}

main().catch((error) => {
  console.error('[MCP Server] Fatal error:', error);
  process.exit(1);
});