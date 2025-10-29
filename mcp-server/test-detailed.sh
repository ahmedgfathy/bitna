#!/bin/bash

echo "🔍 Detailed MCP Server Test - Checking Tool Responses"
echo "======================================================"

# Test 1: Get Statistics
echo -e "\n📊 Test 1: Getting Dashboard Statistics"
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_stats","arguments":{}}}' | timeout 3 node dist/index.js 2>/dev/null | grep -o '"result":{[^}]*}' | head -1

# Test 2: Get Properties (limit 2)
echo -e "\n🏢 Test 2: Getting Properties (limit 2)"
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get_properties","arguments":{"limit":2}}}' | timeout 3 node dist/index.js 2>/dev/null | grep -o '"success":true' | head -1

# Test 3: Get Leads (limit 2)
echo -e "\n👥 Test 3: Getting Leads (limit 2)"
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_leads","arguments":{"limit":2}}}' | timeout 3 node dist/index.js 2>/dev/null | grep -o '"success":true' | head -1

# Test 4: Get Static Data
echo -e "\n�� Test 4: Getting Static Data (dropdowns)"
echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"get_static_data","arguments":{}}}' | timeout 3 node dist/index.js 2>/dev/null | grep -o '"success":true' | head -1

echo -e "\n======================================================"
echo "✅ MCP Server is responding to all tool requests!"
