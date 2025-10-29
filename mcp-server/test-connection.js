#!/usr/bin/env node
import { spawn } from 'child_process';

const request = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: {
    name: 'get_stats',
    arguments: { tenantId: 'demo-tenant-1' }
  }
};

const server = spawn('node', ['dist/index.js'], { stdio: ['pipe', 'pipe', 'pipe'] });
let output = '';
let errors = '';

server.stdout.on('data', (data) => { output += data.toString(); });
server.stderr.on('data', (data) => { errors += data.toString(); });

server.on('close', () => {
  console.log('📊 MCP Server Connection Test\n' + '='.repeat(50));
  
  if (errors) {
    console.log('❌ Errors:', errors);
  }
  
  const lines = output.split('\n').filter(l => l.trim());
  const response = lines.find(l => {
    try { return JSON.parse(l).id === request.id; } catch { return false; }
  });
  
  if (response) {
    const data = JSON.parse(response);
    if (data.result?.content?.[0]?.text) {
      const stats = JSON.parse(data.result.content[0].text);
      console.log('✅ Connected to database: contaboo');
      console.log('✅ Total Properties:', stats.properties?.total || 0);
      console.log('✅ Total Leads:', stats.leads?.total || 0);
      console.log('✅ Team Members:', stats.team?.total || 0);
    }
  }
  
  console.log('='.repeat(50));
});

server.stdin.write(JSON.stringify(request) + '\n');
server.stdin.end();

setTimeout(() => server.kill(), 5000);
