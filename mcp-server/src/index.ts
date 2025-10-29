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
    description: 'Get dashboard statistics from the Contaboo database',
    inputSchema: {
      type: 'object',
      properties: {},
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
  const [totalProperties, totalLeads, totalUsers, recentActivities] = await Promise.all([
    prisma.property.count({ where: { is_deleted: false } }),
    prisma.lead.count(),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.activity.count({ where: { dateTime: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
  ]);

  const stats = {
    properties: totalProperties,
    leads: totalLeads,
    users: totalUsers,
    recentActivities,
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