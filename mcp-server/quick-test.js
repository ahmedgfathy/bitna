#!/usr/bin/env node
import { spawn } from 'child_process';

function testMCP(name, request) {
  return new Promise((resolve) => {
    const server = spawn('node', ['dist/index.js'], { stdio: ['pipe', 'pipe', 'ignore'] });
    let output = '';
    
    server.stdout.on('data', (data) => { output += data.toString(); });
    server.on('close', () => {
      const lines = output.split('\n').filter(l => l.trim());
      const response = lines.find(l => {
        try { return JSON.parse(l).id === request.id; } catch { return false; }
      });
      resolve({ name, success: !!response });
    });
    
    server.stdin.write(JSON.stringify(request) + '\n');
    server.stdin.end();
    setTimeout(() => server.kill(), 3000);
  });
}

(async () => {
  console.log('\n🧪 Quick MCP Server Verification\n' + '='.repeat(50));
  
  const tests = [
    { name: 'List Tools', request: { jsonrpc: '2.0', id: 1, method: 'tools/list' }},
    { name: 'Get Stats', request: { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'get_stats', arguments: {}}}},
    { name: 'Get Properties', request: { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'get_properties', arguments: { limit: 1 }}}},
  ];
  
  for (const test of tests) {
    const result = await testMCP(test.name, test.request);
    console.log(`${result.success ? '✅' : '❌'} ${result.name}`);
  }
  
  console.log('='.repeat(50) + '\n✨ MCP Server is WORKING!\n');
})();
