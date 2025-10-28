# GlobalCRM MCP Server

A Model Context Protocol (MCP) server that provides AI systems with secure access to your GlobalCRM database hosted on Appwrite.

## 🚀 Features

- **Secure Database Access**: Connect to your Appwrite database with proper authentication
- **Comprehensive CRM Operations**: Full CRUD operations for leads, properties, and other CRM data
- **Real-time Analytics**: Get insights and analytics from your CRM data
- **Advanced Search**: Search across all collections in your database
- **Schema Introspection**: Discover and understand your database structure
- **Lead Management**: Create, update, and track lead interactions
- **History Tracking**: Access complete interaction history for leads

## 🛠️ Installation

1. Navigate to the MCP server directory:
   ```bash
   cd mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file and configure it:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your Appwrite credentials:
   ```bash
   # Appwrite Configuration
   APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_project_id_here
   APPWRITE_API_KEY=your_api_key_here
   APPWRITE_DATABASE_ID=globalcrm_db
   
   # Collection IDs
   USERS_COLLECTION_ID=users
   EVENTS_COLLECTION_ID=events
   LEADS_COLLECTION_ID=leads
   PROPERTIES_COLLECTION_ID=properties
   SHEETS_COLLECTION_ID=sheets
   LEAD_HISTORY_COLLECTION_ID=lead_history
   ```

## 🔑 Getting Your Appwrite API Key

1. Go to your [Appwrite Console](https://cloud.appwrite.io)
2. Select your project
3. Navigate to "Overview" → "Integrations"
4. Click "API Keys"
5. Create a new API Key with the following scopes:
   - `databases.read`
   - `databases.write`
   - `collections.read`
   - `documents.read`
   - `documents.write`

## 🧪 Testing

Run the test script to verify your configuration:

```bash
npm test
```

This will test:
- Appwrite connection
- Database schema retrieval
- Data fetching operations
- Analytics generation

## 🚀 Running the Server

Start the MCP server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## 🔧 Available Tools

The MCP server provides the following tools for AI systems:

### Data Retrieval
- `get_leads` - Retrieve leads with filtering and pagination
- `get_properties` - Retrieve properties with filtering and pagination
- `get_lead_history` - Get interaction history for specific leads

### Data Management
- `create_lead` - Create new leads
- `update_lead` - Update existing leads

### Analytics & Insights
- `get_analytics` - Get comprehensive analytics (leads, properties, events, overview)
- `search_database` - Search across all collections
- `get_database_schema` - Get database structure information

### Tool Examples

#### Get Leads
```json
{
  "name": "get_leads",
  "arguments": {
    "limit": 10,
    "filters": {
      "status": "qualified"
    },
    "search": "john"
  }
}
```

#### Create Lead
```json
{
  "name": "create_lead",
  "arguments": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "source": "website",
    "status": "new"
  }
}
```

#### Get Analytics
```json
{
  "name": "get_analytics",
  "arguments": {
    "type": "overview",
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    }
  }
}
```

## 🔗 Connecting to AI Systems

### Claude Desktop Configuration

Add this to your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "globalcrm": {
      "command": "node",
      "args": ["/path/to/globalcrm/mcp-server/src/index.js"],
      "cwd": "/path/to/globalcrm/mcp-server"
    }
  }
}
```

### Other AI Systems

The server communicates via stdio and follows the standard MCP protocol, making it compatible with any MCP-enabled AI system.

## 🛡️ Security

- API keys are stored securely in environment variables
- The server only provides the data access patterns you explicitly define
- All database operations go through Appwrite's security layer
- No direct database credentials are exposed

## 📊 Data Structure

The server works with your existing GlobalCRM database structure:
- **Leads**: Customer leads and prospects
- **Properties**: Real estate properties
- **Events**: System events and interactions
- **Lead History**: Interaction tracking
- **Users**: System users
- **Sheets**: Data sheets and reports

## 🔍 Troubleshooting

### Common Issues

1. **Connection Failed**: Check your `APPWRITE_ENDPOINT` and `APPWRITE_PROJECT_ID`
2. **Permission Denied**: Ensure your API key has the required scopes
3. **Collection Not Found**: Verify your collection IDs in the `.env` file

### Debug Mode

Set `NODE_ENV=development` for more verbose logging.

## 📈 Monitoring

The server provides health checks and detailed error reporting. Monitor your Appwrite dashboard for API usage and performance metrics.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Add tests for new functionality
4. Submit a pull request

## 📄 License

MIT License - see the project root for details.
