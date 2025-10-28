# MCP Server Integration

This project includes a Model Context Protocol (MCP) server that provides access to GitHub repository files and MariaDB database operations through a standardized interface.

## Features

### GitHub Integration
- Repository information and metadata
- File listing and browsing
- File content reading, creation, updating, and deletion
- File search capabilities
- Branch management
- Commit history

### MariaDB Database Integration
- Table listing and schema inspection
- SQL query execution
- CRUD operations (Create, Read, Update, Delete)
- Prepared statement support
- Connection management

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_OWNER=ahmedgfathy
GITHUB_REPO=global-website

# MariaDB Configuration
DB_HOST=5.180.148.92
DB_USER=root
DB_PASSWORD=ZeroCall20!@HH##1655&&
DB_NAME=global_website
DB_PORT=3306

# MCP Server Configuration
MCP_SERVER_PORT=3001
```

### 2. GitHub Token Setup

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Click "Generate new token (classic)"
3. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership)
4. Copy the generated token and add it to your `.env.local` file

### 3. Database Setup

Ensure your MariaDB server at `5.180.148.92` is accessible and the database `global_website` exists. The MCP server will connect using the provided credentials.

### 4. Installation

Dependencies are already installed. If you need to reinstall:

```bash
pnpm install
```

## Usage

### Running the MCP Server

#### As a Standalone Server
```bash
# Development mode with auto-restart
pnpm run mcp:dev

# Production mode
pnpm run mcp:start
```

#### Through Next.js API Routes
The MCP server is also exposed through Next.js API routes and can be accessed via HTTP requests.

Start the Next.js development server:
```bash
pnpm run dev
```

### API Endpoints

#### Status Check
```
GET /api/mcp/status
```

#### GitHub Operations
```
GET /api/mcp?tool=github&action=repo-info
GET /api/mcp?tool=github&action=list-files&path=app&ref=master
GET /api/mcp?tool=github&action=list-branches
GET /api/mcp?tool=github&action=get-commits

POST /api/mcp
{
  "tool": "github",
  "action": "get-file",
  "data": {
    "path": "package.json",
    "ref": "master"
  }
}
```

#### Database Operations
```
GET /api/mcp?tool=database&action=tables
GET /api/mcp?tool=database&action=table-schema&table=users

POST /api/mcp
{
  "tool": "database",
  "action": "execute-query",
  "data": {
    "sql": "SELECT * FROM users LIMIT 10",
    "params": []
  }
}
```

### MCP Dashboard

Access the web-based dashboard at:
```
http://localhost:3000/mcp-dashboard
```

The dashboard provides:
- Service status monitoring
- GitHub repository browsing
- Database table exploration
- Interactive tool testing

## Available MCP Tools

### GitHub Tools
- `github_get_repo_info` - Get repository information
- `github_list_files` - List files in a directory
- `github_get_file_content` - Get file content
- `github_create_file` - Create a new file
- `github_update_file` - Update existing file
- `github_delete_file` - Delete a file
- `github_search_files` - Search files in repository
- `github_list_branches` - List all branches
- `github_get_commits` - Get commit history

### Database Tools
- `db_execute_query` - Execute SQL queries
- `db_get_tables` - List all tables
- `db_get_table_schema` - Get table schema
- `db_insert_data` - Insert new records
- `db_update_data` - Update existing records
- `db_delete_data` - Delete records

## Production Deployment

### Vercel Configuration

1. Add environment variables in Vercel dashboard:
   - All variables from `.env.local`
   - Ensure `GITHUB_TOKEN` is properly set

2. The MCP server API routes will be automatically deployed with your Next.js application.

### Standalone MCP Server

For deploying the standalone MCP server:

1. Build the project:
```bash
pnpm run build
```

2. Start the MCP server:
```bash
NODE_ENV=production pnpm run mcp:start
```

## Security Considerations

1. **GitHub Token**: Keep your GitHub token secure and use the minimum required permissions
2. **Database Credentials**: Use environment variables and never commit credentials to version control
3. **Network Security**: Ensure your MariaDB server has proper firewall rules
4. **API Access**: Consider implementing authentication for the MCP API endpoints in production

## Troubleshooting

### Common Issues

1. **GitHub API Rate Limits**: 
   - Authenticated requests have higher rate limits
   - Consider implementing caching for frequently accessed data

2. **Database Connection Issues**:
   - Verify network connectivity to the MariaDB server
   - Check firewall rules and security groups
   - Ensure credentials are correct

3. **CORS Issues**:
   - The API routes handle CORS automatically
   - For external access, configure CORS headers as needed

### Logging

The MCP server provides detailed logging for debugging:
- Connection status for GitHub and database
- Error messages with stack traces
- Request/response information

## Contributing

When adding new MCP tools:

1. Add the tool definition in `lib/mcp/server.js`
2. Implement the corresponding handler
3. Add API route support in `app/api/mcp/route.js`
4. Update the dashboard if needed
5. Document the new tool in this README

## License

This MCP server integration is part of the global-website project.