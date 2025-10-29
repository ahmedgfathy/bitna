# 🚀 Claude Code CLI Explained

## What is `@anthropic-ai/claude-code`?

**Claude Code** (installed via `npm install -g @anthropic-ai/claude-code`) is Anthropic's official command-line interface (CLI) tool that brings Claude AI directly to your terminal.

---

## 📊 Key Features

### 1. **Terminal-Based AI Assistant**
```bash
claude
# Opens an interactive chat session with Claude in your terminal
```

### 2. **Direct Code Interaction**
- Claude can read, write, and edit files in your project
- Execute commands
- Run tests
- Debug code
- Review changes

### 3. **MCP Server Integration**
- Connects to your MCP servers (like your Bitna CRM)
- Access your database through natural language
- Query data without writing SQL

### 4. **Print Mode for Automation**
```bash
# Get quick answers
claude --print "How many properties are in my database?"

# Use in scripts
result=$(claude --print "Get lead count")
echo $result
```

### 5. **Conversation Continuity**
```bash
# Continue previous conversation
claude --continue

# Resume specific session
claude --resume SESSION_ID
```

---

## 🎯 How It Helps You Specifically

### For Your Bitna CRM Project

#### 1. **Database Queries Without SQL**
Instead of:
```bash
mysql -u root -pzerocall -e "SELECT COUNT(*) FROM properties WHERE status='ACTIVE';"
```

You can:
```bash
claude --print "How many active properties do I have?"
```

#### 2. **Code Generation & Refactoring**
```bash
# Ask Claude to create code
claude "Create a React component for displaying property cards"

# Refactor existing code
claude "Refactor PropertiesScreen.tsx to use TypeScript generics"
```

#### 3. **Debugging Assistant**
```bash
# Get help with errors
claude "Why am I getting 'Cannot read property id' error in PropertiesScreen?"

# Analyze logs
cat error.log | claude --print "What's causing these errors?"
```

#### 4. **Project Management**
```bash
# Get project insights
claude "Show me a summary of my CRM project structure"

# Plan features
claude "Help me plan the property detail page enhancement"
```

#### 5. **Documentation**
```bash
# Generate docs
claude "Create API documentation for my properties endpoint"

# Explain code
claude "Explain how the MCP server handles property queries"
```

---

## 🔧 Installation Benefits

### What You Get:

1. **Command: `claude`**
   - Available globally in any terminal
   - No need to open Claude Desktop

2. **MCP Access**
   - Automatically connects to your configured MCP servers
   - Reads from `~/Library/Application Support/Claude/claude_desktop_config.json`

3. **Project Context**
   - Understands your project structure
   - Can read/write files with permission
   - Maintains conversation history

4. **Script Integration**
   - Use in bash scripts
   - Automate workflows
   - CI/CD integration possible

---

## 💡 Real-World Usage Examples

### Example 1: Quick Data Check
```bash
cd /Users/ahmedgomaa/bitna
claude --print "How many leads were created this week?"
```

### Example 2: Code Review
```bash
claude "Review the changes in PropertiesScreen.tsx and suggest improvements"
```

### Example 3: Database Analysis
```bash
claude "Analyze my property data and tell me:
- Average price per region
- Most popular property types
- Conversion rate from leads to sales"
```

### Example 4: Interactive Development
```bash
claude
> I need to add a filter for property price range
> Create the FilterComponent for me
> Now add it to PropertiesScreen
> Test if it works with my database
```

### Example 5: Automated Reports
```bash
#!/bin/bash
# daily_report.sh

echo "Generating daily CRM report..."
claude --print "Generate a report with:
- New leads today
- Properties sold today  
- Pending activities
- Team performance summary" > daily_report.txt

cat daily_report.txt
```

---

## 🔄 Workflow Integration

### Before Claude Code:
1. Write SQL queries manually
2. Copy-paste results
3. Open multiple tools
4. Context switching
5. Manual data analysis

### With Claude Code:
1. Ask in natural language
2. Get instant answers
3. Everything in terminal
4. Seamless workflow
5. AI-powered insights

---

## ⚡ Performance Features

### 1. **Streaming Responses**
```bash
# Real-time streaming output
claude --print --output-format stream-json "Query large dataset"
```

### 2. **Batch Processing**
```bash
# Process multiple files
for file in src/components/*.tsx; do
  claude --print "Add TypeScript types to $file"
done
```

### 3. **Background Tasks**
```bash
# Run analysis in background
claude "Analyze all my leads data and create report" &
```

---

## 🛡️ Security & Permissions

### Permission System:
- **File Access**: Asks before reading/writing files
- **Command Execution**: Requires approval
- **Database Access**: Through MCP only
- **API Calls**: Controlled access

### Bypass for Trusted Environments:
```bash
# Skip permissions (use carefully!)
claude --dangerously-skip-permissions
```

---

## 📁 Configuration

### Your Setup:
```bash
# MCP Config Location
~/Library/Application Support/Claude/claude_desktop_config.json

# Your MCP Servers:
- bitna-crm (Your Contaboo database)

# Commands:
claude               # Interactive
claude --continue    # Resume last chat
claude --print       # Non-interactive output
```

---

## 🎓 Learning Curve

### Easy Start:
```bash
# Just chat
claude
> Hey Claude, show me my properties
```

### Advanced Usage:
```bash
# Complex workflows with MCP
claude --mcp-config custom.json \
       --system-prompt "You are a CRM specialist" \
       --model sonnet \
       "Analyze Q4 sales data"
```

---

## 📊 Comparison

### Claude Desktop vs Claude Code CLI

| Feature | Claude Desktop | Claude Code CLI |
|---------|---------------|----------------|
| **Interface** | GUI | Terminal |
| **Use Case** | General chat | Development |
| **File Access** | Limited | Full project |
| **Automation** | No | Yes (scripts) |
| **MCP Support** | Yes | Yes |
| **Multitasking** | Single window | Multiple sessions |

**Best Practice**: Use both!
- Claude Desktop: Planning, documentation, learning
- Claude Code CLI: Coding, debugging, automation

---

## 🚨 Why Your MCP Failed (Now Fixed!)

### The Problem:
Your MCP server was printing to `stdout`:
```javascript
console.log('Contaboo MCP Server started');  // ❌ This breaks MCP
```

### Why It Matters:
- MCP uses `stdout` for JSON messages only
- Any non-JSON output causes parsing errors
- Claude Desktop sees: `"Contaboo M"...` and fails

### The Fix (Applied):
```javascript
console.error('[MCP Server] Started');  // ✅ Logs to stderr
// stdout is kept clean for JSON only
```

Also silenced Prisma logs:
```javascript
const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' }  // Only errors to stderr
  ]
});
```

---

## ✅ What's Fixed Now

1. ✅ **MCP Server**: No more stdout pollution
2. ✅ **Prisma Logs**: Silenced query/info logs
3. ✅ **Error Logs**: Go to stderr (visible in logs folder)
4. ✅ **JSON Communication**: Clean stdout for Claude Desktop

---

## 🎯 Next Steps After Restart

### 1. Restart Claude Desktop
```bash
# Quit completely
Cmd+Q

# Reopen
# Check Settings → Developer → Connectors
# "bitna-crm" should show as connected (no errors)
```

### 2. Test MCP Connection
In Claude Desktop:
```
Show me all properties in my database
```

### 3. Try Claude Code CLI
```bash
cd /Users/ahmedgomaa/bitna
claude
> Show me dashboard statistics
> How many leads do I have?
> List active properties
```

---

## 🎉 Summary

### Claude Code CLI gives you:
- ✨ Terminal-based AI assistant
- 🗄️ Direct database access via MCP
- 📝 Code generation & editing
- 🔍 Instant data analysis
- 🤖 Workflow automation
- 🚀 Developer productivity boost

### Your MCP server now:
- ✅ Works with Claude Desktop
- ✅ Clean JSON communication
- ✅ Proper error logging
- ✅ Database connected
- ✅ All 6 tools available

**You're ready to supercharge your development workflow!** 🚀

---

*Last Updated: October 29, 2025*
*MCP Server: v1.0.0*
*Claude Code: v2.0.28*
