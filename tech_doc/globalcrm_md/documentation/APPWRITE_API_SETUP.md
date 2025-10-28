# Getting Your Appwrite API Key - Step by Step Guide

## 🔐 Creating an API Key for Your MCP Server

Follow these steps to create an API key that will allow your MCP server to access your Appwrite database:

### Step 1: Access Your Appwrite Console
1. Go to [Appwrite Cloud Console](https://cloud.appwrite.io)
2. Sign in to your account
3. Select your GlobalCRM project (Project ID: `68bf2df6afeeebc2f4ea`)

### Step 2: Navigate to API Keys
1. In the left sidebar, click on **"Overview"**
2. Look for the **"Integrations"** section
3. Click on **"API Keys"**

### Step 3: Create a New API Key
1. Click the **"Create API Key"** button
2. Fill in the details:
   - **Name**: `GlobalCRM MCP Server`
   - **Description**: `API key for Model Context Protocol server access`

### Step 4: Set Required Scopes
Your MCP server needs the following permissions. Make sure to enable these scopes:

#### Database Permissions:
- ✅ `databases.read` - Read database information
- ✅ `databases.write` - Write to databases (for updates)

#### Collection Permissions:
- ✅ `collections.read` - Read collection metadata

#### Document Permissions:
- ✅ `documents.read` - Read documents from collections
- ✅ `documents.write` - Create and update documents

#### Optional but Recommended:
- ✅ `documents.delete` - Delete documents (if you want delete functionality)

### Step 5: Generate and Copy the Key
1. Click **"Create"**
2. **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!
3. Store it securely

### Step 6: Configure Your MCP Server
1. Navigate to your MCP server directory:
   ```bash
   cd /Users/ahmedgomaa/Downloads/globalcrm/mcp-server
   ```

2. Edit the `.env` file:
   ```bash
   nano .env
   ```

3. Update the following values:
   ```bash
   APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=68bf2df6afeeebc2f4ea
   APPWRITE_API_KEY=your_api_key_here  # ← Paste your key here
   APPWRITE_DATABASE_ID=globalcrm_db
   ```

### Step 7: Test Your Configuration
Run the test script to verify everything works:

```bash
cd /Users/ahmedgomaa/Downloads/globalcrm/mcp-server
npm test
```

If the test passes, you're ready to use your MCP server!

## 🛡️ Security Best Practices

1. **Never commit API keys to version control**
2. **Use environment variables for all sensitive data**
3. **Regularly rotate your API keys**
4. **Monitor API usage in your Appwrite dashboard**
5. **Use minimal required permissions**

## 🔍 Troubleshooting

### Common Issues:

**"Invalid API key" error:**
- Double-check that you copied the API key correctly
- Ensure there are no extra spaces or characters
- Verify the key hasn't expired

**"Permission denied" error:**
- Check that you enabled all required scopes
- Verify your project ID is correct

**"Project not found" error:**
- Confirm your project ID: `68bf2df6afeeebc2f4ea`
- Check your endpoint URL: `https://fra.cloud.appwrite.io/v1`

### Getting Help:
- Check the Appwrite documentation: https://appwrite.io/docs
- Review the MCP server logs for detailed error messages
- Use the test script to isolate configuration issues

## 📊 Monitoring Your API Usage

1. Go to your Appwrite console
2. Navigate to **"Overview"** → **"Usage"**
3. Monitor your API calls and database operations
4. Set up alerts for unusual activity

Your MCP server is now ready to provide AI systems with secure access to your GlobalCRM database!
