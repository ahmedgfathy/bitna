#!/usr/bin/env node

/**
 * MCP Server Test Script
 * Tests all available MCP tools to confirm functionality
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test data
const tests = [
  {
    name: 'List Tools',
    request: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
    },
  },
  {
    name: 'Get Properties',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'get_properties',
        arguments: {
          limit: 5,
          offset: 0,
        },
      },
    },
  },
  {
    name: 'Get Property Statistics',
    request: {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'get_property_statistics',
        arguments: {},
      },
    },
  },
  {
    name: 'Get Leads',
    request: {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'get_leads',
        arguments: {
          limit: 3,
        },
      },
    },
  },
];

async function testMCPServer() {
  console.log('🚀 Starting MCP Server Tests\n');
  console.log('=' .repeat(60));

  for (const test of tests) {
    console.log(`\n📋 Test: ${test.name}`);
    console.log('-'.repeat(60));

    try {
      const result = await sendMCPRequest(test.request);
      console.log('✅ Status: SUCCESS');
      
      if (test.name === 'List Tools' && result.result?.tools) {
        console.log(`📊 Available Tools: ${result.result.tools.length}`);
        result.result.tools.forEach((tool, idx) => {
          console.log(`   ${idx + 1}. ${tool.name} - ${tool.description}`);
        });
      } else if (result.result?.content) {
        const content = result.result.content[0];
        if (content.type === 'text') {
          const data = JSON.parse(content.text);
          console.log('📊 Result:', JSON.stringify(data, null, 2).substring(0, 500));
        }
      }
    } catch (error) {
      console.log('❌ Status: FAILED');
      console.log('Error:', error.message);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ MCP Server Testing Complete!');
}

function sendMCPRequest(request) {
  return new Promise((resolve, reject) => {
    const serverPath = join(__dirname, 'dist', 'index.js');
    const mcpServer = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let output = '';
    let errorOutput = '';

    mcpServer.stdout.on('data', (data) => {
      output += data.toString();
    });

    mcpServer.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    mcpServer.on('close', (code) => {
      if (errorOutput && !output) {
        reject(new Error(errorOutput));
      } else {
        try {
          // Parse the JSON-RPC response
          const lines = output.split('\n').filter(line => line.trim());
          const jsonResponse = lines.find(line => {
            try {
              const parsed = JSON.parse(line);
              return parsed.jsonrpc === '2.0' && parsed.id === request.id;
            } catch {
              return false;
            }
          });

          if (jsonResponse) {
            resolve(JSON.parse(jsonResponse));
          } else {
            reject(new Error('No valid JSON-RPC response found'));
          }
        } catch (err) {
          reject(err);
        }
      }
    });

    // Send the request
    mcpServer.stdin.write(JSON.stringify(request) + '\n');
    mcpServer.stdin.end();

    // Timeout after 10 seconds
    setTimeout(() => {
      mcpServer.kill();
      reject(new Error('Request timeout'));
    }, 10000);
  });
}

// Run tests
testMCPServer().catch(console.error);
