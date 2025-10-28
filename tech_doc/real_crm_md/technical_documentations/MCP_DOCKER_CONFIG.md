# MCP Server Configuration for Docker Deployment

## Option 1: Direct WSL (Current Setup)
```json
{
  "mcpServers": {
    "real-estate-crm": {
      "command": "wsl.exe",
      "args": ["-e", "/home/xinreal/real_crm/run_mcp.sh"],
      "env": {}
    }
  }
}
```

## Option 2: Docker-based MCP Server
```json
{
  "mcpServers": {
    "real-estate-crm-docker": {
      "command": "docker",
      "args": [
        "exec", 
        "-i", 
        "glomart_web", 
        "python", 
        "scripts/mcp_server.py"
      ],
      "env": {}
    }
  }
}
```

## Option 3: Docker Compose Integration
```json
{
  "mcpServers": {
    "real-estate-crm-compose": {
      "command": "docker-compose",
      "args": [
        "exec", 
        "-T", 
        "web", 
        "python", 
        "scripts/mcp_server.py"
      ],
      "env": {
        "COMPOSE_FILE": "C:\\path\\to\\your\\project\\docker-compose.yml"
      }
    }
  }
}
```

## Usage Instructions

1. **For Development (WSL)**: Use Option 1
2. **For Docker Deployment**: Use Option 2 after running `./deploy.sh`
3. **For Docker Compose**: Use Option 3 with proper path to docker-compose.yml

## Testing MCP Connection

```bash
# Test Docker-based MCP server
docker exec -i glomart_web python scripts/mcp_server.py

# Test Docker Compose-based MCP server  
docker-compose exec web python scripts/mcp_server.py
```