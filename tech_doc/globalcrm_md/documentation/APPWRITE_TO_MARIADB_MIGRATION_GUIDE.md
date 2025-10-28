# GlobalCRM: Complete Appwrite to MariaDB Migration Guide

## Problem Analysis

The GlobalCRM project has **multiple critical issues** causing dashboard cards to not display properly and excessive API calls:

### 🚨 Critical Issues Identified:

1. **Infinite API Loop**: The `getLeadsBySource()` function is making hundreds of API calls
2. **Multiple Inefficient API Calls**: Dashboard makes separate API calls for each data type
3. **Mixed API Usage**: Components still use direct Appwrite API calls instead of MariaDB
4. **Import Path Issues**: Some files import Appwrite directly instead of going through the adapter

## 🔍 Regex Patterns for Sonnet 4 Agent

Use these regex patterns to identify and fix problematic code:

### 1. Direct Appwrite Imports (HIGH PRIORITY)
```regex
import\s+\{[^}]*(?:databases|account|storage|ID|Query)[^}]*\}\s+from\s+["']@?/?services/appwrite/client(?:\.js)?["']
```

### 2. Direct Database Calls (HIGH PRIORITY)
```regex
(?:databases|account|storage)\.(?:listDocuments|createDocument|updateDocument|deleteDocument|getDocument|get|createSession|deleteSession)
```

### 3. Infinite Loop Patterns (CRITICAL)
```regex
do\s*\{[^}]*databases\.listDocuments[^}]*\}\s*while\s*\([^)]*response\.documents\.length[^)]*\)
```

### 4. Multiple API Calls in Components (HIGH PRIORITY)
```regex
(?:await\s+)?(?:fetch|axios).*(?:\n.*){0,10}(?:await\s+)?(?:fetch|axios)
```

### 5. Inefficient Data Fetching (MEDIUM PRIORITY)
```regex
Promise\.all\(\s*\[\s*(?:get\w+|fetch\w+).*(?:\n.*){0,20}\]\s*\)
```

## 🛠️ Solution Implementation

### Step 1: Create Single Dashboard API Endpoint ✅
- Created `/src/app/api/dashboard/route.js`
- Fetches all dashboard data in one call
- Uses MariaDB adapter exclusively

### Step 2: Update Dashboard Component ✅
- Modified `/src/app/(pages)/dashboard/page.jsx`
- Replaced multiple API calls with single endpoint call
- Updated state management for unified data structure

### Step 3: Action Files Migration (IN PROGRESS)
The following action files still need migration from Appwrite to MariaDB:

#### Files to Fix:
```
src/actions/auth.js - ❌ Still uses databases directly
src/actions/leadsAction.js - ⚠️ Partially fixed (infinite loop resolved)
src/actions/propertiesAction.js - ⚠️ Partially working
src/actions/projectAction.js - ❌ Still uses databases directly
src/actions/sheetSetting.js - ❌ Still uses databases directly
src/actions/report.js - ❌ Still uses databases directly
src/actions/filterSettings.js - ⚠️ Working but needs optimization
```

## 🎯 Immediate Action Required

### For Sonnet 4 Agent - Replace these patterns:

1. **Replace Direct Imports:**
   ```javascript
   // OLD (REMOVE):
   import { databases, account, storage, ID, Query } from "@/services/appwrite/client";
   
   // NEW (USE):
   // For client-side components, use fetch() calls to API routes
   // For server-side, use MariaDBAdapter
   ```

2. **Replace Direct Database Calls:**
   ```javascript
   // OLD (REMOVE):
   const response = await databases.listDocuments(COLLECTIONS.LEADS, queries);
   
   // NEW (USE):
   const response = await fetch('/api/database/leads', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ action: 'list', queries })
   });
   const data = await response.json();
   ```

3. **Replace Infinite Loops:**
   ```javascript
   // OLD (REMOVE):
   do {
     const response = await databases.listDocuments(COLLECTIONS.LEADS, queries);
     // ... processing
   } while (response.documents.length > 0);
   
   // NEW (USE):
   const response = await fetch('/api/database/leads', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ 
       action: 'list', 
       queries: [{ type: 'limit', value: 1000 }] 
     })
   });
   ```

## 📁 Components Analysis

### Dashboard Components ✅
- MainCard - Uses props, no direct API calls
- SecondaryCards - Uses props, no direct API calls  
- ActionsCard - Uses props, no direct API calls

### Form Components (Need Check)
- FormComponent - ✅ No Appwrite imports
- Select-Filed - ✅ No Appwrite imports
- administration/UpdateUser - ⚠️ Uses auth actions (needs migration)

### Critical Paths:
1. **Login/Register Flow**: Uses `auth.js` actions
2. **User Management**: Uses `auth.js` actions
3. **Lead Management**: Uses `leadsAction.js`
4. **Property Management**: Uses `propertiesAction.js`
5. **Project Management**: Uses `projectAction.js`

## 🚀 Next Steps for Sonnet 4

1. **High Priority**: Migrate all action files to use MariaDB adapter or API routes
2. **Medium Priority**: Optimize all list/fetch operations to use pagination
3. **Low Priority**: Add caching mechanisms for frequently accessed data

## 📊 Performance Impact

**Before Migration:**
- Dashboard: 5+ separate API calls
- Lead source data: Infinite loop through all records
- Property data: Separate calls for each type

**After Migration:**
- Dashboard: 1 optimized API call
- All data: Paginated with reasonable limits
- Unified error handling and loading states

## 🔧 Testing Checklist

- [ ] Dashboard loads without infinite API calls
- [ ] All cards display correct data
- [ ] Lead creation/editing works
- [ ] Property management works
- [ ] User authentication works
- [ ] Form submissions work
- [ ] Dropdowns populate correctly
- [ ] Search/filter functionality works

## 🎯 Success Criteria

1. **No Appwrite imports** in any component or action file
2. **All API calls** go through MariaDB adapter or unified API routes
3. **Dashboard loads efficiently** with single API call
4. **No infinite loops** in data fetching
5. **All UI elements work** (forms, dropdowns, selects)
