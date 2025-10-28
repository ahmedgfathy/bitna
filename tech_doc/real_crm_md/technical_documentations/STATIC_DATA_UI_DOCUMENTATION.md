# Static Data Management - UI/UX Documentation

## Overview
This document provides a comprehensive guide to the Static Data Management interface, including layout structure, navigation, and CRUD operations.

---

## 📐 Layout Structure

### Base Layout Components

#### 1. **Sidebar Navigation** (Left Fixed Panel)
Located in: `authentication/templates/authentication/partials/sidebar.html`

**Structure:**
```
┌─────────────────────────────────┐
│ USER PROFILE SECTION            │
│ ├─ Avatar Circle with Initials  │
│ ├─ Full Name                    │
│ └─ Role (Profile/Admin)         │
├─────────────────────────────────┤
│ NAVIGATION LINKS                │
│ ├─ Dashboard                    │
│ ├─ CRM MODULES (Section)        │
│ │  ├─ Leads (with badge)        │
│ │  ├─ Properties (with badge)   │
│ │  └─ Projects (with badge)     │
│ ├─ ADMINISTRATION (Section)     │
│ │  ├─ Manage Profiles           │
│ │  ├─ Static Data ⭐            │
│ │  └─ Audit Logs                │
├─────────────────────────────────┤
│ FOOTER SECTION                  │
│ ├─ Version: Glomart CRM v1.0    │
│ └─ Action Buttons:              │
│    ├─ Settings                  │
│    ├─ Help                      │
│    └─ Logout                    │
└─────────────────────────────────┘
```

**Key Features:**
- Fixed position on the left
- Material Icons for all menu items
- Active state highlighting (blue background)
- Badge counters for item counts
- Collapsible sections (CRM MODULES, ADMINISTRATION)
- Responsive mobile overlay

**Static Data Link:**
```html
<li class="nav-item">
    <a class="nav-link {% if 'static_data' in request.resolver_match.url_name %}active{% endif %}" 
       href="{% url 'authentication:static_data_dashboard' %}">
        <span class="material-symbols-outlined me-3">database</span>
        <span>Static Data</span>
    </a>
</li>
```

---

## 🎨 Static Data Management Interface

### Navigation Flow
```
Dashboard
    ↓
Static Data Dashboard (3 Modules Overview)
    ↓
Module Page (Shows all models in module)
    ↓
Model Page (CRUD interface for specific model)
```

---

## 1️⃣ Dashboard Level
**URL:** `/static-data/`
**Template:** `authentication/templates/authentication/static_data/dashboard.html`

### Layout Structure:
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (Blue Gradient)                                       │
│ ├─ Icon: Database                                            │
│ ├─ Title: Static Data Management                            │
│ └─ Subtitle: Manage dropdown lists and reference data       │
├──────────────────────────────────────────────────────────────┤
│ STATISTICS OVERVIEW (3 Cards)                                │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│ │  Icon    │  │  Icon    │  │  Icon    │                   │
│ │  [3]     │  │  [13]    │  │  [30+]   │                   │
│ │  Active  │  │  Data    │  │  Total   │                   │
│ │  Modules │  │  Models  │  │  Items   │                   │
│ └──────────┘  └──────────┘  └──────────┘                   │
├──────────────────────────────────────────────────────────────┤
│ DATA MODULES                                                 │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ 🔵 LEADS MODULE                      [5 Models Badge]  │  │
│ │ Manage leads reference data                            │  │
│ │ ┌────────┬────────┬────────┬────────┬────────┐        │  │
│ │ │Lead    │Lead    │Lead    │Lead    │Lead    │        │  │
│ │ │Source  │Type    │Priority│Temp    │Status  │        │  │
│ │ │[7]T[7]A│[5]T[5]A│[3]T[3]A│[3]T[3]A│[5]T[5]A│        │  │
│ │ └────────┴────────┴────────┴────────┴────────┘        │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ 🔵 PROPERTIES MODULE                [9 Models Badge]   │  │
│ │ Manage properties reference data                       │  │
│ │ ┌────────┬────────┬────────┬────────┬────────┐        │  │
│ │ │Property│Property│Property│Property│Region  │        │  │
│ │ │Type    │Sub-Type│Status  │View    │        │        │  │
│ │ └────────┴────────┴────────┴────────┴────────┘        │  │
│ │ ┌────────┬────────┬────────┬────────┐                 │  │
│ │ │Currency│Compound│Finishing│Payment │                 │  │
│ │ │        │        │Type     │Method  │                 │  │
│ │ └────────┴────────┴────────┴────────┘                 │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ 🔵 PROJECTS MODULE                  [4 Models Badge]   │  │
│ │ Manage projects reference data                         │  │
│ │ ┌────────┬────────┬────────┬────────┐                 │  │
│ │ │Project │Project │Project │Project │                 │  │
│ │ │Type    │Status  │Priority│Phase   │                 │  │
│ │ └────────┴────────┴────────┴────────┘                 │  │
│ └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Design Features:
- **Color Scheme:** Facebook Blue (#1877f2)
- **Card Style:** White cards with left blue border
- **Grid Layout:** Responsive auto-fill grid (min 280px per item)
- **Statistics:** Total/Active/Inactive counts per model
- **Status Badges:** Green (Active) / Red (Inactive)

---

## 2️⃣ Module Level
**URL:** `/static-data/{module}/` (e.g., `/static-data/leads/`)
**Template:** `authentication/templates/authentication/static_data/module.html`

### Layout Structure:
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (Purple Gradient)                                     │
│ ├─ Breadcrumb: Static Data > Leads                          │
│ ├─ Title: Leads Module                                       │
│ └─ Badge: 5 Data Models                                      │
├──────────────────────────────────────────────────────────────┤
│ MODEL CARDS GRID                                             │
│                                                              │
│ ┌─────────────────────┐  ┌─────────────────────┐           │
│ │ 📋 LeadSource       │  │ 🏷️  LeadType        │           │
│ │ Source of leads     │  │ Type classification │           │
│ │                     │  │                     │           │
│ │ Total: [7]          │  │ Total: [5]          │           │
│ │ Active: [7]         │  │ Active: [5]         │           │
│ │                     │  │                     │           │
│ │ Recent Items:       │  │ Recent Items:       │           │
│ │ • Advertisement ✓   │  │ • Buyer ✓           │           │
│ │ • Referral ✓        │  │ • Seller ✓          │           │
│ │ • Social Media ✓    │  │ • Investor ✓        │           │
│ │                     │  │                     │           │
│ │ [Manage →]          │  │ [Manage →]          │           │
│ └─────────────────────┘  └─────────────────────┘           │
│                                                              │
│ ┌─────────────────────┐  ┌─────────────────────┐           │
│ │ 🚩 LeadPriority     │  │ 🌡️  LeadTemperature │           │
│ │ Priority levels     │  │ Lead temperature    │           │
│ └─────────────────────┘  └─────────────────────┘           │
└──────────────────────────────────────────────────────────────┘
```

### Features:
- **Module Icon:** Dynamic icon based on module type
- **Statistics:** Total and Active counts prominently displayed
- **Sample Data Preview:** Shows first 5 items with status indicators
- **Quick Access:** "Manage" button to navigate to model detail

---

## 3️⃣ Model Level (CRUD Interface)
**URL:** `/static-data/{module}/{model}/` (e.g., `/static-data/leads/LeadSource/`)
**Template:** `authentication/templates/authentication/static_data/model.html`

### Layout Structure:
```
┌──────────────────────────────────────────────────────────────┐
│ HEADER (Purple Gradient)                                     │
│ ├─ Breadcrumb: Static Data > Leads > LeadSource             │
│ ├─ Title: Lead Source                                        │
│ ├─ Description: Source of leads                              │
│ └─ Button: [+ Add New Item]                                  │
├──────────────────────────────────────────────────────────────┤
│ STATISTICS BAR                                               │
│ ┌──────────┬──────────┬──────────┬──────────┐              │
│ │ Total: 7 │Active: 7 │Inactive:0│ In Use:N/A│              │
│ └──────────┴──────────┴──────────┴──────────┘              │
├──────────────────────────────────────────────────────────────┤
│ DATA TABLE                                                   │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Color │ Name         │ Order │ Status  │ Actions      │  │
│ ├────────────────────────────────────────────────────────┤  │
│ │  🔵   │ Advertisement│  1    │ Active  │ ✏️  ⏸️  🗑️    │  │
│ │  🟢   │ Referral     │  2    │ Active  │ ✏️  ⏸️  🗑️    │  │
│ │  🟡   │ Social Media │  3    │ Active  │ ✏️  ⏸️  🗑️    │  │
│ │  🔴   │ Cold Call    │  4    │ Active  │ ✏️  ⏸️  🗑️    │  │
│ │  🟣   │ Website      │  5    │ Active  │ ✏️  ⏸️  🗑️    │  │
│ │  🟠   │ Email        │  6    │ Active  │ ✏️  ⏸️  🗑️    │  │
│ │  ⚫   │ Other        │  7    │ Active  │ ✏️  ⏸️  🗑️    │  │
│ └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔧 CRUD Operations

### 1. CREATE (Add New Item)

**Trigger:** Click "Add New Item" button in header

**Modal Form:**
```
┌────────────────────────────────────┐
│ 🔵 Add New Item              [X]   │
├────────────────────────────────────┤
│                                    │
│ Name: *                            │
│ ┌────────────────────────────────┐ │
│ │ [Enter name...]                │ │
│ └────────────────────────────────┘ │
│                                    │
│ Description:                       │
│ ┌────────────────────────────────┐ │
│ │ [Enter description...]         │ │
│ │                                │ │
│ │                                │ │
│ └────────────────────────────────┘ │
│                                    │
│ Color: (if applicable)             │
│ ┌──────┐                          │
│ │ 🎨   │                          │
│ └──────┘                          │
│                                    │
│ Display Order: (if applicable)     │
│ ┌────────────────────────────────┐ │
│ │ [0]                            │ │
│ └────────────────────────────────┘ │
│                                    │
│ ☑️ Active                          │
│                                    │
├────────────────────────────────────┤
│        [Cancel]  [💾 Save Item]   │
└────────────────────────────────────┘
```

**Form Fields:**
- **Name** (Required): Text input
- **Description** (Optional): Textarea
- **Color** (Conditional): Color picker (for models with color support)
- **Display Order** (Conditional): Number input (for models with ordering)
- **Active** (Checkbox): Default checked

**Backend Processing:**
- URL: `POST /static-data/{module}/{model}/create/`
- View: `static_data_create()` in `authentication/static_data_views.py`
- Validation: Name required, unique check
- Success: Redirect to model page with success message

---

### 2. READ/VIEW (List & Details)

**List View:**
- Displays all items in a responsive table
- Shows: Color (if applicable), Name, Order (if applicable), Status, Actions
- Hover effect on rows
- Empty state if no items exist

**Field Display Logic:**
```python
# Columns shown based on model configuration:
if model_config.has_color:
    - Show color column (24px color circle)
    
if model_config.has_order:
    - Show order column (badge with number)
    
# Always shown:
- Name (with description if available)
- Status (Active/Inactive badge)
- Actions (Edit, Toggle, Delete buttons)
```

**Empty State:**
```
┌────────────────────────────────────┐
│                                    │
│          📭                        │
│     No Items Found                 │
│                                    │
│  Start by adding your first        │
│  lead source item.                 │
│                                    │
│    [+ Add First Item]              │
│                                    │
└────────────────────────────────────┘
```

---

### 3. UPDATE/EDIT

**Trigger:** Click ✏️ (Edit) button on any row

**Process:**
1. JavaScript function `editItem()` called with current values
2. Same modal as CREATE, but pre-populated with data
3. Modal title changes to "Edit Item"
4. Form action changes to update endpoint

**JavaScript Logic:**
```javascript
function editItem(id, name, description, color, order) {
    currentItemId = id;
    document.getElementById('itemId').value = id;
    document.getElementById('itemName').value = name;
    document.getElementById('itemDescription').value = description || '';
    
    if (color) {
        document.getElementById('itemColor').value = color;
    }
    
    if (order !== null) {
        document.getElementById('itemOrder').value = order;
    }
    
    document.getElementById('modalTitle').textContent = 'Edit Item';
    document.getElementById('itemForm').action = '/update-url/';
    
    new bootstrap.Modal(document.getElementById('addItemModal')).show();
}
```

**Backend Processing:**
- URL: `POST /static-data/{module}/{model}/update/`
- View: `static_data_update()` in `authentication/static_data_views.py`
- Updates existing record
- Success: Redirect with success message

---

### 4. TOGGLE STATUS (Activate/Deactivate)

**Trigger:** Click ⏸️ (Pause) or ▶️ (Play) button

**Process:**
1. JavaScript creates hidden form
2. Submits POST request with item ID
3. Backend toggles `is_active` field
4. Page reloads with updated status

**Visual Feedback:**
- Active items show ⏸️ (pause icon) in yellow button
- Inactive items show ▶️ (play icon) in green button
- Status badge updates (Active = blue, Inactive = red)

**JavaScript Logic:**
```javascript
function toggleStatus(itemId, currentStatus) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/toggle-url/';
    
    // Add CSRF token
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    // Add item ID
    // Submit form
}
```

**Backend Processing:**
- URL: `POST /static-data/{module}/{model}/toggle/`
- View: `static_data_toggle()` in `authentication/static_data_views.py`
- Toggles `is_active` boolean
- Success: Redirect with status message

---

### 5. DELETE

**Trigger:** Click 🗑️ (Delete) button

**Confirmation Modal:**
```
┌────────────────────────────────────┐
│ ⚠️  Confirm Delete            [X]  │
├────────────────────────────────────┤
│                                    │
│ Are you sure you want to delete    │
│ "Advertisement"?                   │
│                                    │
│ ⚠️ This action cannot be undone.   │
│ Any references to this item may    │
│ be affected.                       │
│                                    │
├────────────────────────────────────┤
│      [Cancel]  [🗑️ Delete Item]   │
└────────────────────────────────────┘
```

**Two-Step Process:**
1. **Confirmation:** `confirmDelete()` shows modal with item name
2. **Execution:** `executeDelete()` submits form after confirmation

**JavaScript Logic:**
```javascript
let currentItemId = null;

function confirmDelete(itemId, itemName) {
    currentItemId = itemId;
    document.getElementById('deleteItemName').textContent = itemName;
    new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
}

function executeDelete() {
    if (currentItemId) {
        // Create and submit form with CSRF token and item ID
    }
}
```

**Backend Processing:**
- URL: `POST /static-data/{module}/{model}/delete/`
- View: `static_data_delete()` in `authentication/static_data_views.py`
- Soft delete or hard delete based on configuration
- Success: Redirect with deletion confirmation

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-color: #1877f2;      /* Facebook Blue */
--primary-dark: #0c63d4;       /* Darker Blue */

/* Text Colors */
--text-dark: #1e293b;          /* Dark Gray */
--text-light: #64748b;         /* Light Gray */

/* Background Colors */
--bg-light: #f8fafc;           /* Very Light Gray */
--border-color: #e2e8f0;       /* Border Gray */

/* Status Colors */
--success-bg: #dcfce7;         /* Light Green */
--success-text: #166534;       /* Dark Green */
--danger-bg: #fee2e2;          /* Light Red */
--danger-text: #991b1b;        /* Dark Red */
```

### Typography
```css
/* Font Family */
font-family: 'Inter', sans-serif;

/* Sizes */
.page-title: 1.75rem (28px), weight: 600
.section-title: 1.25rem (20px), weight: 600
.card-title: 1rem (16px), weight: 600
.body-text: 0.95rem (15.2px), weight: 400
.small-text: 0.875rem (14px), weight: 400
```

### Spacing System
```css
/* Padding */
Card padding: 1.5rem (24px)
Section margin: 2rem (32px)
Item gap: 1rem (16px)

/* Border Radius */
Cards: 10px
Buttons: 8px
Badges: 12px
Inputs: 6px
```

### Shadows
```css
/* Card Shadows */
Default: 0 4px 12px rgba(0, 0, 0, 0.08)
Hover: 0 6px 16px rgba(0, 0, 0, 0.1)

/* Button Shadows */
Hover: 0 4px 8px rgba(24, 119, 242, 0.2)
```

---

## 🔄 User Flow Examples

### Example 1: Adding a New Lead Source

1. **Navigate:** Sidebar > Static Data
2. **View Dashboard:** See 3 modules overview
3. **Select Module:** Click on "Leads" module card
4. **Choose Model:** Click on "Lead Source" card
5. **Open Form:** Click "Add New Item" button
6. **Fill Form:**
   - Name: "LinkedIn"
   - Description: "Leads from LinkedIn connections"
   - Color: #0077B5 (LinkedIn blue)
   - Order: 8
   - Active: ✓ Checked
7. **Submit:** Click "Save Item"
8. **Confirmation:** See success message and new item in table

### Example 2: Editing a Property Type

1. **Navigate:** Static Data > Properties > Property Type
2. **Find Item:** Locate "Apartment" in table
3. **Edit:** Click ✏️ button
4. **Modify:**
   - Change description to "Residential apartment units"
   - Update order to 1
5. **Save:** Click "Save Item"
6. **Verify:** See updated information in table

### Example 3: Deactivating an Unused Status

1. **Navigate:** Static Data > Leads > Lead Status
2. **Find Item:** Locate "Archived" status
3. **Toggle:** Click ⏸️ (pause) button
4. **Confirm:** Page reloads, status shows "Inactive" (red badge)
5. **Verify:** Button changes to ▶️ (play) for reactivation

---

## 📱 Responsive Design

### Desktop (≥1024px)
- Sidebar: Fixed left panel (260px width)
- Content: Full width with padding
- Grid: 3-4 columns for model cards

### Tablet (768px - 1023px)
- Sidebar: Collapsible overlay
- Content: Full width
- Grid: 2 columns for model cards

### Mobile (≤767px)
- Sidebar: Hidden by default, toggle button shown
- Content: Single column
- Grid: 1 column for model cards
- Table: Horizontal scroll

---

## 🛠️ Technical Implementation

### URL Routing
```python
# authentication/urls.py
path('static-data/', views.static_data_dashboard, name='static_data_dashboard'),
path('static-data/<str:module_key>/', views.static_data_module, name='static_data_module'),
path('static-data/<str:module_key>/<str:model_key>/', views.static_data_model, name='static_data_model'),
path('static-data/<str:module_key>/<str:model_key>/create/', views.static_data_create, name='static_data_create'),
path('static-data/<str:module_key>/<str:model_key>/update/', views.static_data_update, name='static_data_update'),
path('static-data/<str:module_key>/<str:model_key>/toggle/', views.static_data_toggle, name='static_data_toggle'),
path('static-data/<str:module_key>/<str:model_key>/delete/', views.static_data_delete, name='static_data_delete'),
```

### Model Configuration
```python
# Static Data Configuration Dictionary
STATIC_DATA_CONFIG = {
    'leads': {
        'module_name': 'Leads',
        'icon': 'fas fa-users',
        'models': {
            'LeadSource': {
                'model': LeadSource,
                'name': 'Lead Source',
                'description': 'Source of leads',
                'has_color': True,
                'has_order': True,
                'icon': 'fas fa-stream'
            },
            # ... more models
        }
    }
}
```

### Template Inheritance
```
base.html (Main layout)
    ↓
dashboard.html (Overview)
module.html (Module view)
model.html (CRUD interface)
```

---

## 🔐 Security & Permissions

### Access Control
- **Required:** User must be authenticated
- **Admin Only:** `@login_required` decorator
- **Superuser Check:** Sidebar only shows link if `user.is_superuser`

### CSRF Protection
- All forms include `{% csrf_token %}`
- JavaScript operations include CSRF token in requests

### Validation
- Server-side validation for all inputs
- Required fields enforced
- Unique name constraints per model

---

## 📊 Data Flow

```
User Action (Browser)
    ↓
JavaScript Handler
    ↓
Form Submission (POST)
    ↓
Django View (authentication/static_data_views.py)
    ↓
Model Operation (Create/Update/Delete)
    ↓
Database (MariaDB)
    ↓
Redirect with Message
    ↓
Render Template with Updated Data
    ↓
Display to User
```

---

## 🎯 Key Features Summary

✅ **Centralized Management** - All dropdown data in one place
✅ **Modular Organization** - Grouped by module (Leads, Properties, Projects)
✅ **Visual Design** - Clean, modern UI matching main theme
✅ **CRUD Operations** - Complete create, read, update, delete functionality
✅ **Status Management** - Toggle active/inactive states
✅ **Color Support** - Visual indicators for categorization
✅ **Ordering** - Custom display order for dropdown lists
✅ **Statistics** - Real-time counts and usage data
✅ **Responsive** - Works on all device sizes
✅ **Confirmation** - Delete confirmation prevents accidents
✅ **Breadcrumbs** - Clear navigation hierarchy

---

## 🚀 Future Enhancements (Suggestions)

1. **Bulk Operations** - Select multiple items for bulk activate/deactivate/delete
2. **Import/Export** - CSV import/export functionality
3. **Drag & Drop Ordering** - Visual reordering of items
4. **Usage Analytics** - Show which items are used and where
5. **Audit Trail** - Track who changed what and when
6. **Search & Filter** - Quick search within tables
7. **Inline Editing** - Click to edit directly in table
8. **Custom Fields** - Add additional fields per model
9. **Relationships** - Manage dependencies between models
10. **API Access** - REST API for external integrations

---

## 📝 Notes

- All templates use Bootstrap 5.3.2 for styling
- Icons from Material Symbols and Font Awesome
- JavaScript uses vanilla JS (no jQuery)
- Database operations are transaction-safe
- Page reloads after operations (no AJAX currently)
- Modal forms use Bootstrap modal component

---

**Last Updated:** October 16, 2025
**Version:** 1.0
**Author:** Ahmed Gomaa - Glomart CRM Development Team
