# 🏗️ CRM Architecture - Hybrid Approach

## Overview
Your CRM uses a **hybrid architecture** combining Supabase and MariaDB:

---

## 📊 Data Sources

### **Supabase** (Cloud - Lovable.dev)
Used for CRM operational data:
- ✅ **Leads** - Customer leads and contacts
- ✅ **Events** - Calendar events, meetings, viewings
- ✅ **Notes** - Lead notes and interactions
- ✅ **Documents** - File attachments
- ✅ **Authentication** - User auth & sessions

**Why Supabase?**
- Real-time updates
- Built-in auth
- File storage
- Already has your data

### **MariaDB** (Local - Port 3306)
Used for property catalog data:
- ✅ **Properties** - All 129K properties
- ✅ **Property Types** - Apartment, Villa, etc.
- ✅ **Areas** - 215 areas
- ✅ **Compounds** - 5,366 compounds
- ✅ **Lookups** - All property-related dropdowns

**Why MariaDB?**
- High performance for large datasets
- Full control & ownership
- No cloud limits
- Works offline

---

## 🔄 API Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                   │
│                  Port: 8080 (Vite)                   │
└─────────────────┬───────────────────┬───────────────┘
                  │                   │
                  │                   │
         ┌────────▼────────┐  ┌──────▼───────────┐
         │  Supabase API   │  │  Express.js API  │
         │   (Cloud)       │  │   Port: 3000     │
         └────────┬────────┘  └──────┬───────────┘
                  │                   │
         ┌────────▼────────┐  ┌──────▼───────────┐
         │ Supabase        │  │  MariaDB         │
         │ PostgreSQL      │  │  localhost:3306  │
         │ (Cloud)         │  │  masr_pro_crm    │
         └─────────────────┘  └──────────────────┘
```

---

## 🚀 Running the Application

### 1. Start MariaDB (if not running)
```bash
# Already running as system service
mysql -u root -pzerocall
```

### 2. Start API Server (Port 3000)
```bash
npm run server
# or
node server/index.js
```

### 3. Start Frontend (Port 8080)
```bash
pnpm dev
```

### 4. Open Browser
```
http://localhost:8080
```

---

## 📁 File Structure

```
src/
├── integrations/
│   ├── supabase/
│   │   ├── client.ts              # Supabase connection
│   │   ├── types.ts               # Supabase types
│   │   └── services/
│   │       └── leadService.ts     # Leads from Supabase ✅
│   │
│   ├── api/                       # API Client for MariaDB
│   │   ├── client.ts              # Fetch wrapper
│   │   ├── index.ts               # Exports
│   │   └── services/
│   │       ├── propertyService.ts # Properties via API ✅
│   │       ├── eventService.ts    # Events from Supabase
│   │       └── leadService.ts     # (Not used - using Supabase direct)
│   │
│   └── mariadb/
│       ├── client.ts              # (Backend only)
│       └── types.ts               # TypeScript types
│
├── pages/
│   ├── Dashboard.tsx              # Uses Supabase + API
│   ├── Leads.tsx                  # Uses Supabase ✅
│   ├── Properties.tsx             # Uses API → MariaDB ✅
│   └── Calendar.tsx               # Uses Supabase
│
server/
└── index.js                       # Express API (Port 3000)
```

---

## 🎯 Service Usage by Page

| Page | Data Source | Service |
|------|-------------|---------|
| **Dashboard** | Supabase + MariaDB | `leadService` (Supabase) + `propertyService` (API) |
| **Leads** | Supabase | `leadService` (Supabase) |
| **Properties** | MariaDB | `propertyService` (API) |
| **Calendar** | Supabase | `eventService` (Supabase) |

---

## 🔧 Configuration

### Environment Variables (`.env`)
```bash
# Supabase (Leads, Events, Auth)
VITE_SUPABASE_URL="https://qudyodtaqwnehbqgzdma.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="..."

# MariaDB (Properties)
VITE_DB_HOST="localhost"
VITE_DB_USER="root"
VITE_DB_PASSWORD="zerocall"
VITE_DB_NAME="masr_pro_crm"

# API
VITE_API_URL="http://localhost:3000/api"
```

---

## 📊 Current Data Status

### Supabase
```
✅ Leads: Real data from Lovable
✅ Events: Real data
✅ Users: Real auth
```

### MariaDB
```
✅ Properties: 2 test records (ready for 129K import)
✅ Property Types: 17 types
✅ Areas: Seed data (ready for 215 import)
✅ Compounds: Empty (ready for 5,366 import)
```

---

## 🎊 Next Steps

1. ✅ **API Running** on port 3000
2. ✅ **Frontend Running** on port 8080
3. ⏳ **Import Properties** from CSV (129K records)
4. ⏳ **Import Areas** (215 unique)
5. ⏳ **Import Compounds** (5,366 unique)

---

## 🧪 Testing Endpoints

### Check API Health
```bash
curl http://localhost:3000/api/health
```

### Get Properties
```bash
curl http://localhost:3000/api/properties
```

### Get Leads (from Supabase)
```bash
# Open browser console on http://localhost:8080
# Check Network tab - should see calls to supabase.co
```

---

## 💡 Key Benefits

✅ **Best of Both Worlds**
- Supabase: Real-time, auth, cloud
- MariaDB: Performance, ownership, offline

✅ **Scalable**
- 129K properties won't slow down Supabase
- Leads stay in real-time cloud

✅ **Flexible**
- Can move any data source easily
- Clear separation of concerns

---

**Status**: ✅ Architecture Complete & Working!
