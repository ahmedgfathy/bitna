# Quick Start Guide: Bulk File Operations

## 📋 Overview
This guide will help you quickly learn how to use the new bulk file operations in the "My Files" section.

## 🎯 Key Features

### 1. Selecting Files

#### Select Individual Files
- Click the checkbox on any file (appears on hover or always visible in list view)
- The file will be highlighted and added to your selection
- A blue toolbar will appear at the top showing your selection count

#### Select All Files
- In **List View**: Click the checkbox in the table header (top-left corner)
- This selects all files currently visible (filtered files if you're using search)
- Click again to deselect all

#### Clear Selection
- Click the "Clear selection" link in the blue toolbar
- Or click the "Select All" checkbox twice

---

## 🗑️ Bulk Delete

### How to Delete Multiple Files:

1. **Select Files**
   - Use checkboxes to select the files you want to delete
   - You can select as many as you need

2. **Click Delete Button**
   - Look for the red "Delete" button in the blue toolbar
   - It appears only when files are selected

3. **Confirm Deletion**
   - A confirmation dialog will appear
   - Shows the number of files to be deleted
   - Click "OK" to proceed or "Cancel" to abort

4. **Success!**
   - Files are deleted from the system
   - Success message appears
   - File list automatically refreshes
   - Selection is cleared

### ⚠️ Important Notes:
- **Cannot be undone** - Deleted files are permanently removed
- **Permission required** - You can only delete your own files (unless you're an admin)
- **Activity logged** - All deletions are tracked in the system

---

## 🔗 Bulk Share

### How to Share Multiple Files with Another User:

1. **Select Files**
   - Use checkboxes to select files you want to share
   - Can be documents, images, or any file type

2. **Click Share Button**
   - Click the blue "Share" button in the toolbar
   - A share modal will open

3. **Find the User**
   - **Search Option**: Type in the search box to find users by:
     - Name (e.g., "John")
     - Email (e.g., "john@company.com")
     - Employee ID (e.g., "EMP123")
   - **Results Update**: User list filters in real-time as you type

4. **Select User**
   - Choose the user from the dropdown
   - User format: Name (Email) - EMP: ID

5. **Set Permission**
   - **View Only**: User can only view the files
   - **View & Download**: User can view and download

6. **Share Files**
   - Click the "Share" button at the bottom
   - Progress indicator shows during sharing
   - Success message appears

7. **Done!**
   - Modal closes automatically
   - Selection is cleared
   - User will now see shared files in their "Shared with Me" section

### 💡 Pro Tips:
- **Search by Email**: Most accurate when searching
- **Multiple Shares**: Share same files with multiple users by repeating the process
- **Update Permissions**: Sharing again with same user updates their permissions
- **Activity Logged**: All shares are tracked for audit purposes

---

## ⬇️ Bulk Download

### How to Download Multiple Files:

1. **Select Files**
   - Use checkboxes to select files to download
   - Note: Folders will be skipped (only files are downloaded)

2. **Click Download Button**
   - Click the green "Download" button in the toolbar

3. **Downloads Start**
   - Files download one by one automatically
   - Each opens in a new browser tab
   - Small delay between downloads (100ms)

4. **Save Files**
   - Browser will prompt you to save each file
   - Or files go to your default downloads folder

### 📝 Notes:
- **Browser Pop-ups**: You may need to allow pop-ups for multiple downloads
- **Folders Skipped**: Only actual files are downloaded, not folders
- **Sequential**: Downloads happen one at a time to avoid browser blocking
- **Selection Remains**: You can clear selection manually after downloading

---

## 🎨 Visual Guide

### List View:
```
┌─────────────────────────────────────────────────────────┐
│ [✓] Name          Size      Modified      Actions       │ ← Select All
├─────────────────────────────────────────────────────────┤
│ [✓] Document.pdf  2.5 MB    2 days ago    👁️ ⬇️ 🔗 🗑️   │
│ [✓] Image.jpg     1.2 MB    1 week ago    👁️ ⬇️ 🔗 🗑️   │
│ [ ] Report.docx   890 KB    3 days ago    👁️ ⬇️ 🔗 🗑️   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 2 files selected    Clear selection                      │ ← Bulk Actions Toolbar
│                     [🔗 Share] [⬇️ Download] [🗑️ Delete] │
└─────────────────────────────────────────────────────────┘
```

### Grid View:
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  [✓] PDF │  │  [ ] IMG │  │  [✓] DOC │
│    📄    │  │    🖼️    │  │    📄    │
│ Document │  │  Photo   │  │  Report  │
│  2.5 MB  │  │  1.2 MB  │  │  890 KB  │
└──────────┘  └──────────┘  └──────────┘
```

---

## 🎯 Common Use Cases

### Scenario 1: Clean Up Old Files
1. Use search/filter to find old files
2. Select all unwanted files
3. Bulk delete them all at once
4. Much faster than deleting one by one!

### Scenario 2: Share Project Files
1. Select all files related to a project
2. Use bulk share to share with team member
3. Set appropriate permissions
4. Everyone has access immediately!

### Scenario 3: Download Portfolio
1. Select all your work samples
2. Bulk download to your computer
3. Create backup or portfolio
4. Easy and quick!

### Scenario 4: Organize by Type
1. Use file type filter (e.g., "Documents")
2. Select all filtered files
3. Share with specific team
4. Or download for offline work

---

## ⌨️ Keyboard Tips

While full keyboard shortcuts aren't implemented yet, here are some tips:

- **Tab Key**: Navigate between checkboxes
- **Space Bar**: Toggle checkbox when focused
- **Enter**: Confirm dialogs
- **Esc**: Close modals (planned)

---

## 🔍 Troubleshooting

### Files Won't Delete
- ✅ Check you own the files
- ✅ Check you're not trying to delete shared files
- ✅ Admins can delete any files

### Can't Find User to Share With
- ✅ User must be registered in system
- ✅ Try searching by email
- ✅ Check spelling
- ✅ User must be active

### Downloads Not Working
- ✅ Allow pop-ups in browser
- ✅ Check downloads folder
- ✅ Ensure files aren't corrupted
- ✅ Try one file at a time first

### Selection Disappeared
- ✅ Refreshing page clears selection
- ✅ Navigating away clears selection
- ✅ Re-select files as needed

---

## 📞 Need Help?

- **Admin Panel**: Admins can manage all files and users
- **Activity Log**: Check what happened with your files
- **Support**: Contact your system administrator

---

## 🎓 Video Tutorials (Coming Soon)

1. **Basic File Selection** - 2 min
2. **Bulk Delete Walkthrough** - 3 min
3. **Advanced Sharing Techniques** - 5 min
4. **Power User Tips** - 7 min

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Feature Status:** ✅ Live and Operational
