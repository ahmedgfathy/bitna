## 🚨 CRITICAL ISSUES AND SOLUTIONS

After analyzing the terminal output, I've identified the exact problems causing the dashboard cards to not display and the massive API call spam:

### 🔥 **ROOT CAUSE ANALYSIS**

1. **Infinite API Loop**: The `getLeadsBySource()` function is making hundreds of API calls because it's paginating through ALL leads in the database. Each API call is trying to fetch more data, creating an endless loop.

2. **Next.js 15 Compatibility**: There are parameter handling issues with Next.js 15.

3. **Missing Collections Import**: Auth route missing proper collections import.

4. **MariaDB Connection Pool**: Connection pool needs optimization.

### 🛠️ **IMMEDIATE FIXES NEEDED**

#### 1. Fix Infinite Loop in getLeadsBySource()
The function at `src/actions/leadsAction.js` line 250-272 is causing the problem:

```javascript
// PROBLEMATIC CODE:
do {
  const response = await databases.listDocuments(COLLECTIONS.LEADS,
    [Query.limit(limit), Query.offset(offset)]
  );
  allLeads = [...allLeads, ...response.documents];
  lastBatchSize = response.documents.length;
  offset += lastBatchSize;
} while (lastBatchSize > 0); // This continues forever if data keeps coming
```

**SOLUTION**: Limit the maximum number of documents processed and add safety checks.

#### 2. Dashboard Making Too Many Simultaneous Requests
The dashboard page is calling multiple functions that each make their own API calls:
- `getLastMonthLeadsCount()`
- `getLeadsBySource()` (the problematic one)
- `getPropertiesActivity()`
- `getAllSettings()`

**SOLUTION**: Create a single dashboard API endpoint that fetches all required data in one call.

#### 3. MariaDB Query Optimization
The current setup is making individual API calls through the REST interface instead of direct database queries.

**SOLUTION**: Create optimized database queries that fetch aggregate data directly.

### 🎯 **STEP-BY-STEP FIX IMPLEMENTATION**

1. **First**: Fix the infinite loop in `getLeadsBySource()`
2. **Second**: Create a dashboard summary API endpoint
3. **Third**: Update dashboard page to use the new efficient endpoint
4. **Fourth**: Optimize MariaDB queries for better performance

### 🚦 **PRIORITY ORDER**

**🔴 URGENT (Do Now)**:
- Fix `getLeadsBySource()` infinite loop
- Add maximum limit safeguards

**🟡 HIGH (Do Next)**:
- Create efficient dashboard API
- Update dashboard to use single API call

**🟢 MEDIUM (Do Later)**:
- Optimize all other data fetching functions
- Add caching layer

### 📊 **EXPECTED RESULTS AFTER FIX**

✅ Dashboard cards will display properly
✅ No more API call spam (from hundreds to 1-3 calls)
✅ Faster page load times
✅ Reduced database load
✅ All form dropdowns and selects will work

### 🔧 **REGEX PATTERN FOR SONNET 4**

Here's the regular expression pattern to identify all problematic functions:

```regex
(getLeadsBySource|getLastMonthLeadsCount|getPropertiesActivity|getAllSettings).*?do\s*{.*?}.*?while\s*\(.*?\)
```

This pattern will help identify:
- Functions with infinite loops
- Do-while patterns that might cause issues
- Functions that need pagination limits

The main culprit is `getLeadsBySource()` in `/src/actions/leadsAction.js` which creates an infinite pagination loop, causing the dashboard to make hundreds of API calls per second.

**IMMEDIATE ACTION**: Replace the do-while loop with a limited query that fetches a reasonable amount of data (e.g., max 1000 leads) and processes them for source statistics.
