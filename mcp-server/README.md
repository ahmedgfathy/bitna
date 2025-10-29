# Contaboo MCP Server

A custom MCP (Model Context Protocol) server specifically designed to connect to your Contaboo Real Estate CRM project and database only.

## Features

- **Project-Specific Integration**: Connects exclusively to your Contaboo database
- **Real Estate CRM Tools**: Provides tools for managing properties, leads, users, and activities
- **Secure Access**: Built-in authentication and authorization
- **Type-Safe**: Full TypeScript support with Prisma ORM
- **Multi-Tenant Support**: Works with your multi-tenant architecture

## MCP Tools Available

### 1. `get_properties`
Retrieve properties from the Contaboo database with optional filtering.

**Parameters:**
- `limit` (number, default: 10): Maximum number of properties to return
- `offset` (number, default: 0): Number of properties to skip for pagination
- `status` (string): Filter by property status (ACTIVE, SOLD, RENTED, PENDING)
- `type` (string): Filter by property type
- `region` (string): Filter by property region
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter

### 2. `get_leads`
Retrieve leads from the Contaboo database with optional filtering.

**Parameters:**
- `limit` (number, default: 10): Maximum number of leads to return
- `offset` (number, default: 0): Number of leads to skip for pagination
- `status` (string): Filter by lead status (NEW, CONTACTED, QUALIFIED, NEGOTIATING, WON, LOST)
- `source` (string): Filter by lead source (WEBSITE, REFERRAL, SOCIAL_MEDIA, DIRECT_CALL, WALK_IN, OTHER)
- `assignedTo` (string): Filter by assigned user ID

### 3. `get_users`
Retrieve users from the Contaboo database with optional filtering.

**Parameters:**
- `limit` (number, default: 10): Maximum number of users to return
- `offset` (number, default: 0): Number of users to skip for pagination
- `role` (string): Filter by user role (OWNER, MANAGER, SALES_AGENT, MARKETER, ADMIN_ASSISTANT, EMPLOYEE)
- `status` (string): Filter by user status (ACTIVE, INACTIVE, SUSPENDED)

### 4. `get_activities`
Retrieve activities from the Contaboo database with optional filtering.

**Parameters:**
- `limit` (number, default: 10): Maximum number of activities to return
- `offset` (number, default: 0): Number of activities to skip for pagination
- `type` (string): Filter by activity type (TASK, NOTE, MEETING)
- `status` (string): Filter by activity status (PENDING, COMPLETED, CANCELLED)
- `priority` (string): Filter by activity priority (LOW, MEDIUM, HIGH)
- `assignedTo` (string): Filter by assigned user ID

### 5. `get_stats`
Get dashboard statistics from the Contaboo database.

**Parameters:** None

Returns:
- `properties`: Total number of properties
- `leads`: Total number of leads
- `users`: Total number of active users
- `recentActivities`: Number of recent activities (last 7 days)
- `timestamp`: When the stats were generated

### 6. `get_static_data`
Get static data dropdown options from the Contaboo database.

**Parameters:**
- `type` (string, required): Type of static data to retrieve
  - `property_types`: Property types
  - `regions`: Regions
  - `categories`: Property categories
  - `statuses`: Property statuses
  - `amenities`: Amenities

## Setup Instructions

### 1. Install Dependencies

```bash
cd mcp-server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your database configuration:

```env
# Database Configuration - Use your existing Contaboo database
DATABASE_URL="mysql://root:your-password@localhost:3306/contaboo"

# MCP Server Configuration
PORT=3001
NODE_ENV=development

# Authentication Configuration
MCP_API_KEY="your-mcp-api-key-change-in-production"
JWT_SECRET="your-jwt-secret-key-change-in-production"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Build the Project

```bash
npm run build
```

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## Integration with Claude Desktop

To use this MCP server with Claude Desktop:

1. Add the following to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "contaboo": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "mysql://user:password@localhost:3306/contaboo",
        "MCP_API_KEY": "your-api-key"
      }
    }
  }
}
```

2. Restart Claude Desktop

## Security Features

- **Database Connection**: Uses your existing Contaboo database connection
- **API Key Authentication**: Requires API key for access
- **Tenant Isolation**: Respects your multi-tenant architecture
- **Input Validation**: All inputs are validated using Zod schemas

## Database Schema

The MCP server uses the same Prisma schema as your main Contaboo API:

- **Property**: Real estate listings with comprehensive details
- **Lead**: Potential customers with tracking and status management
- **User**: Team members with roles and permissions
- **Activity**: Tasks, notes, and meetings with assignment
- **Static Data**: Property types, regions, categories, statuses, amenities

## Troubleshooting

### Database Connection Issues

1. Verify your `DATABASE_URL` in the `.env` file
2. Ensure your database is running and accessible
3. Check Prisma client generation: `npx prisma generate`

### TypeScript Errors

1. Run `npm run build` to check for compilation errors
2. Ensure all dependencies are installed: `npm install`
3. Verify Prisma client is generated: `npx prisma generate`

### MCP Connection Issues

1. Check that the server is running: `npm run dev`
2. Verify the API key is correctly configured
3. Check Claude Desktop configuration

## License

This MCP server is specifically designed for your Contaboo Real Estate CRM project and is not intended for use with other projects.

## Support

For support or issues specific to this MCP server integration, please contact the development team.