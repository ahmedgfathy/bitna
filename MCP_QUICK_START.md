# 🚀 Quick Start: Using Bitna MCP Server

## In Claude Desktop

### Basic Queries

```
Show me all properties in the database
```

```
Get the first 10 leads with status NEW
```

```
Show me dashboard statistics
```

```
List all property types available
```

### Advanced Queries

```
Show me properties with sale price between 1000000 and 5000000 EGP
```

```
Get all leads from WEBSITE source that are in QUALIFIED status
```

```
Show me all SALES_AGENT users who are ACTIVE
```

```
Get all high priority tasks that are pending
```

---

## Using Claude Code CLI

### Interactive Mode

```bash
# Start interactive session
claude

# Then ask questions:
> Show me properties in my database
> Get lead statistics
> List all users
```

### Print Mode (for scripts)

```bash
# Get output directly
claude --print "Show me all properties"

# With JSON output
claude --print --output-format json "Get dashboard stats"

# Continue previous conversation
claude --continue
```

---

## Example Conversations

### Property Management

**You**: "Show me all properties"
**Claude**: *Uses get_properties tool and displays your properties*

**You**: "Filter properties in Cairo region"
**Claude**: *Uses get_properties with region filter*

**You**: "How many properties do I have?"
**Claude**: *Uses get_stats tool*

### Lead Management

**You**: "Show me new leads from today"
**Claude**: *Uses get_leads with NEW status*

**You**: "Which leads are assigned to user X?"
**Claude**: *Uses get_leads with assignedTo filter*

### Team Management

**You**: "List all sales agents"
**Claude**: *Uses get_users with SALES_AGENT role*

**You**: "Show me active users"
**Claude**: *Uses get_users with ACTIVE status*

---

## MCP Server Commands

### Development
```bash
cd /Users/ahmedgomaa/bitna/mcp-server
npm run dev  # Start with hot-reload
```

### Production
```bash
cd /Users/ahmedgomaa/bitna/mcp-server
npm run build  # Compile
npm start      # Run
```

### Testing
```bash
# Test database connection
cd /Users/ahmedgomaa/bitna/mcp-server
node dist/index.js
# Should see: "Contaboo MCP Server started" and "Database health: connected"
```

---

## Restart Claude Desktop

**Important**: After any changes to the MCP server or config:

1. Quit Claude Desktop (Cmd+Q)
2. Restart it
3. Look for 🔌 icon showing "bitna-crm" connected

---

## Need Help?

1. Check `/Users/ahmedgomaa/bitna/MCP_SETUP_COMPLETE.md`
2. Review `/Users/ahmedgomaa/bitna/mcp-server/README.md`
3. Run `claude doctor` to check health
4. Test MCP server: `cd /Users/ahmedgomaa/bitna/mcp-server && npm run dev`

---

**Ready to use!** Just restart Claude Desktop and start asking questions about your Bitna CRM data! 🎉
