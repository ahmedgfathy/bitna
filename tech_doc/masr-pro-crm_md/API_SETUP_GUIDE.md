# 🚀 UPDATED ARCHITECTURE - API SERVER REQUIRED

## ⚠️ Important Change

**You cannot connect to MySQL/MariaDB directly from the browser!**

We've created a Node.js Express API server that:
- Runs on port 3001
- Connects to MariaDB locally
- Exposes REST API endpoints
- Frontend calls the API instead of direct database connection

---

## 🎯 Quick Start

### 1. Start the API Server (Terminal 1)
```bash
cd /Users/ahmedgomaa/Downloads/masr-pro-crm
npm run server
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║         🚀 API Server Running on Port 3001              ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### 2. Start the Frontend (Terminal 2)
```bash
cd /Users/ahmedgomaa/Downloads/masr-pro-crm
pnpm dev
```

Frontend will run on: http://localhost:8080/

---

## 📡 API Endpoints

All endpoints are available at `http://localhost:3001/api/`

### Health Check
```
GET  /api/health
```

### Properties
```
GET  /api/properties?page=1&limit=10&search=villa&property_type_id=1&status_id=1&area_id=1
GET  /api/property-types
GET  /api/property-statuses
GET  /api/areas
GET  /api/compounds?area_id=1
```

### Leads
```
GET  /api/leads?page=1&limit=10&search=ahmed&status=new&source=website
GET  /api/leads/stats
```

### Events
```
GET  /api/events?start_date=2025-01-01&end_date=2025-12-31&event_type=viewing&status=completed
```

---

## 🔧 Test the API

```bash
# Health check
curl http://localhost:3001/api/health

# Get properties
curl http://localhost:3001/api/properties

# Get leads
curl http://localhost:3001/api/leads

# Get lead stats
curl http://localhost:3001/api/leads/stats
```

---

## 📁 New File Structure

```
/Users/ahmedgomaa/Downloads/masr-pro-crm/
├── server/
│   └── index.js                 ← Express API server (NEW!)
├── src/
│   └── integrations/
│       ├── api/                 ← API client (NEW!)
│       │   ├── client.ts
│       │   ├── index.ts
│       │   └── services/
│       │       ├── propertyService.ts
│       │       ├── leadService.ts
│       │       └── eventService.ts
│       └── mariadb/             ← Types only (no direct connection)
│           ├── types.ts
│           └── services/        ← (Old - not used anymore)
```

---

## ✅ What Changed

### Before (Broken)
```typescript
// ❌ Cannot work - browser can't connect to MySQL
import { propertyService } from "@/integrations/mariadb/services";
```

### After (Working)
```typescript
// ✅ Works - calls API server
import { propertyService } from "@/integrations/api";
```

---

## 🧪 Test It

1. **Start API Server**: `npm run server` (port 3001)
2. **Start Frontend**: `pnpm dev` (port 8080)
3. **Open Browser**: http://localhost:8080/
4. **Check Console**: Should see data loading from API

---

## 📊 Data Flow

```
Browser (http://localhost:8080)
    ↓ HTTP Request
API Server (http://localhost:3001/api)
    ↓ SQL Query
MariaDB (localhost:3306/masr_pro_crm)
    ↓ Results
API Server
    ↓ JSON Response
Browser (displays data)
```

---

## 🎊 All Pages Updated

✅ Dashboard → Uses `/api/leads/stats`, `/api/properties`, `/api/events`
✅ Properties → Uses `/api/properties`, `/api/property-types`, `/api/areas`
✅ Leads → Uses `/api/leads`
✅ Calendar → Uses `/api/events`

---

## 🔥 Start Both Together (Optional)

Install concurrently first:
```bash
npm install -g concurrently
```

Then run both together:
```bash
npm run dev:all
```

This starts both API server (3001) and frontend (8080) in one command!
