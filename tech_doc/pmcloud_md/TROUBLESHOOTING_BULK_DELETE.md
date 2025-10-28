# Troubleshooting Guide: Bulk Delete "Failed to delete files" Error

## Current Status
✅ Styled modal created and working
❌ Error: "Failed to delete files" appears
❓ Need to identify the root cause

## Debugging Steps

### Step 1: Check Browser Console
1. Open browser Developer Tools (F12)
2. Go to **Console** tab
3. Click the Delete button
4. Look for these log messages:
   - `Frontend: Sending bulk delete request for X files`
   - `Frontend: Response status: XXX`
   - `Frontend: Response data: {...}`

**Expected:** Status 200 with success message
**If you see:** Status 4XX or 5XX, note the error details

### Step 2: Check Network Tab
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Filter by **Fetch/XHR**
4. Click Delete button
5. Look for request to `/api/files/bulk`
6. Click on it and check:
   - **Status Code**: Should be 200
   - **Request Payload**: Should show array of fileIds
   - **Response**: Check for error message

### Step 3: Check Server Logs
The server should now show detailed logs. Look in your terminal where `npm run dev` is running for:

```
DELETE: Received request body: { fileIds: [...] }
DELETE: Attempting to delete X files
DELETE: Found X files in database
DELETE: User authorized, proceeding with deletion
DELETE: Deleting file from disk: /path/to/file
DELETE: Filesystem deletion complete
DELETE: Database deletion complete
DELETE: Successfully deleted X files
```

**If you see an error at any step, that's where the problem is.**

### Step 4: Common Issues & Solutions

#### Issue 1: "Unauthorized - no session"
**Cause:** User session expired
**Solution:** Refresh page and log in again

#### Issue 2: "Invalid file IDs"
**Cause:** Frontend not sending fileIds correctly
**Solution:** Check browser console for request payload

#### Issue 3: "No files found in database"
**Cause:** File IDs don't exist in database
**Solution:** 
- Check if files were already deleted
- Refresh the page
- Try selecting different files

#### Issue 4: "Unauthorized to delete X files"
**Cause:** User doesn't own some files and isn't admin
**Solution:** Only select your own files or log in as admin

#### Issue 5: File path errors
**Cause:** Path issues with file.path
**Solution:** Already fixed in code - should show path in logs

#### Issue 6: "Failed to delete files" with no specific error
**Cause:** Exception in try/catch block
**Solution:** Check server logs for the error stack trace

## Testing Procedure

### Option A: Test with Manual API Call (Recommended)
1. Open browser console (F12)
2. Select a few files (2-3 files)
3. Copy and paste this code:

```javascript
// Get selected file IDs from the page
const rows = document.querySelectorAll('tr');
const fileIds = [];
rows.forEach(row => {
  const checkbox = row.querySelector('input[type="checkbox"]:checked');
  if (checkbox) {
    // Try to find file ID from the row's data or buttons
    const buttons = row.querySelectorAll('button');
    buttons.forEach(btn => {
      const onclick = btn.getAttribute('onclick') || '';
      const match = onclick.match(/'([a-z0-9]{25})'/);
      if (match) fileIds.push(match[1]);
    });
  }
});

console.log('Found file IDs:', fileIds.slice(0, 3));

// Test the API
fetch('/api/files/bulk', {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fileIds: fileIds.slice(0, 3) })
})
.then(r => r.json())
.then(data => console.log('Result:', data))
.catch(err => console.error('Error:', err));
```

### Option B: Check Server Response Manually
1. Open Network tab (F12)
2. Click Delete button
3. Find the `/api/files/bulk` request
4. Right-click → Copy → Copy as cURL
5. Share the cURL command (remove sensitive tokens)

### Option C: Enable Maximum Logging
The code is now updated with extensive logging. When you click Delete:

1. Watch the **browser console** for frontend logs
2. Watch the **server terminal** for backend logs
3. Note exactly where the process stops

## Expected vs Actual

### Expected Flow:
```
Frontend: User clicks Delete All
         ↓
Frontend: Show confirmation modal
         ↓
Frontend: User confirms
         ↓
Frontend: Send DELETE request to /api/files/bulk
         ↓
Backend:  Verify session ✓
Backend:  Validate fileIds ✓
Backend:  Check permissions ✓
Backend:  Delete from disk ✓
Backend:  Delete from database ✓
Backend:  Log activity ✓
Backend:  Return success ✓
         ↓
Frontend: Refresh file list ✓
Frontend: Clear selection ✓
Frontend: Close modal ✓
```

### Where Does It Fail?
Once you run the tests above, note where the ❌ appears in the flow.

## Quick Fixes to Try

### Fix 1: Hard Refresh
Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac) to force reload without cache

### Fix 2: Check File Permissions
Make sure the uploads directory is writable:
```bash
ls -la uploads/
chmod -R 755 uploads/
```

### Fix 3: Check Database Connection
```bash
# In WSL terminal
cd /home/xinreal/pmcloud
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.file.count().then(c => console.log('Files in DB:', c)).catch(e => console.error('DB Error:', e));"
```

### Fix 4: Restart Dev Server
```bash
# In WSL terminal
cd /home/xinreal/pmcloud
# Kill the server (Ctrl+C)
npm run dev
```

## What to Share for Help

If none of the above works, please provide:

1. ✅ Browser console logs (screenshot or text)
2. ✅ Network tab response (screenshot)
3. ✅ Server terminal logs (text)
4. ✅ The exact error message shown in the alert

This will help identify the exact issue!

---

## Most Likely Causes (in order)

1. **Session/Authentication Issue** - Most common
2. **File path resolution** - Already fixed in code
3. **Database connection** - Check logs
4. **Network/CORS issue** - OPTIONS handler added
5. **File permissions** - Check uploads folder

## Files Modified

- ✅ `src/app/api/files/bulk/route.ts` - Added extensive logging
- ✅ `src/components/FileList.tsx` - Added detailed error reporting
- ✅ Added OPTIONS handler for CORS
- ✅ Added route config for Next.js

**Next Step:** Follow Step 1-3 above and share the console/network logs!
