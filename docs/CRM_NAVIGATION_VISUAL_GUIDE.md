# Bitna CRM - Complete Navigation & CRUD Visual Guide

## 🧭 Bottom Navigation Bar (Redesigned)

### Icon-Only Navigation
```
┌─────────────────────────────────────────────────────────────┐
│                      Screen Content Here                     │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   🏠        🏢         📋         👥         ⚙️             │
│ Dashboard Properties  Leads    Team*     Settings          │
│  (active)                                                    │
│   Blue      Gray      Gray     Gray       Gray             │
└─────────────────────────────────────────────────────────────┘
           * Team tab only visible for company accounts
```

**Changes from Phase 5:**
- ❌ Removed: Home (public page) icon
- ✅ Replaced: Emoji icons → Ionicons (28px)
- ✅ Maintained: Icon-only display (no labels)

---

## 🏠 Dashboard Screen (Updated)

### Header with Homepage Access
```
┌──────────────────────────────────────────────────────┐
│  Welcome back,                    ┌──────────────┐   │
│  Ahmed Gomaa                      │ 🏠 Homepage  │   │  ← New!
│  Elite Properties                 └──────────────┘   │
├──────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │     24     │  │     12     │  │      8     │    │
│  │ Properties │  │   Leads    │  │ Employees  │    │
│  └────────────┘  └────────────┘  └────────────┘    │
└──────────────────────────────────────────────────────┘
```

**Homepage Button:**
- Opens external browser → https://bitna.com
- Allows CRM users to view public site
- Blue badge style with home icon
- Top-right corner placement

---

## 🏢 Properties Module - Complete Flow

### 1. Properties List (Main Screen)
```
┌──────────────────────────────────────────────────────┐
│ ← Back           Properties              [+ New]    │  ← Button removed
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │ 🔍  Search properties...                    │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [Public] [Private] [For Sale] [For Rent]          │
│                                                      │
│  4 properties                                        │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Luxury Villa - New Cairo             🌐  │   │
│  │     Modern 5-bedroom villa with pool        │   │  ← Tap to VIEW DETAIL
│  │     12.0M EGP         [Villa]  [For Sale]   │   │  ← Long-press to SELECT
│  │     📍 Fifth Settlement, New Cairo          │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Penthouse Apartment - Zamalek        🌐  │   │
│  │     Exclusive penthouse with Nile view      │   │
│  │     15.0M EGP         [Apt.]  [For Sale]    │   │
│  │     📍 Zamalek, Cairo                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│                       ┌────┐                         │
│                       │ +  │  ← FAB: Create new     │
│                       └────┘                         │
└──────────────────────────────────────────────────────┘
```

**New Features:**
- Smart tap: Opens detail when no selection active
- FAB button: Floating + icon for creating new property
- "+ New" header button removed (FAB replaces it)

---

### 2. Property Detail Screen (NEW)
```
┌──────────────────────────────────────────────────────┐
│ ← Back                                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│            [Large Property Image]                    │
│                                                      │
├──────────────────────────────────────────────────────┤
│  Luxury Villa - New Cairo          🌐 Public        │
│                                                      │
│  12.0M EGP                                          │
│  📍 Fifth Settlement, New Cairo                     │
│                                                      │
│  [Villa]  [For Sale]  [New Cairo]                   │
│                                                      │
│  ▼ Description                                       │
│  Modern 5-bedroom villa with private pool and       │
│  garden in a gated community. Features include      │
│  marble flooring, central AC, smart home system,    │
│  and stunning views.                                │
│                                                      │
│  ▼ Property Details                                 │
│  Type:         Villa                                │
│  Category:     For Sale                             │
│  Region:       New Cairo                            │
│  Location:     Fifth Settlement, New Cairo          │
│  Coordinates:  30.0444, 31.2357                     │
│                                                      │
│  ┌───────────────────┐  ┌────────────┐             │
│  │ ✏️ Edit Property  │  │ 🗑️ Delete │             │
│  └───────────────────┘  └────────────┘             │
└──────────────────────────────────────────────────────┘
```

**Features:**
- Full property information display
- Large hero image at top
- Status badge (Public 🌐 or Private 🔒)
- Formatted price (M EGP for millions)
- Location with icon
- Badges for type/category/region
- Complete description section
- Detailed specs table
- Edit button → Opens form in edit mode
- Delete button → Shows confirmation dialog

---

### 3. Property Form Screen (NEW)
```
┌──────────────────────────────────────────────────────┐
│ ← Back          New Property                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Title *                                            │
│  ┌──────────────────────────────────────────────┐   │
│  │ Luxury Villa - New Cairo                    │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Description *                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ Modern 5-bedroom villa with pool            │   │
│  │                                              │   │
│  │                                              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Price (EGP) *                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ 12000000                                     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Location *                                         │
│  ┌──────────────────────────────────────────────┐   │
│  │ Fifth Settlement, New Cairo                 │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Region *                                           │
│  ┌──────────────────────────────────────────────┐   │
│  │ New Cairo                            ▼      │   │  ← Picker
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Property Type *                                    │
│  ┌──────────────────────────────────────────────┐   │
│  │ Villa                                ▼      │   │  ← Picker
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Category *                                         │
│  ┌──────────────────────────────────────────────┐   │
│  │ For Sale                             ▼      │   │  ← Picker
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Image URL *                                        │
│  ┌──────────────────────────────────────────────┐   │
│  │ https://images.unsplash.com/...             │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Latitude (Optional)    Longitude (Optional)        │
│  ┌──────────────┐      ┌──────────────┐            │
│  │ 30.0444      │      │ 31.2357      │            │
│  └──────────────┘      └──────────────┘            │
│                                                      │
│  Public Listing                          [ON]  ← Switch
│  Make this property visible on the public website   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │     ✓ Create Property                       │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

**Form Features:**
- 11 fields total (7 required, 4 optional)
- Text inputs with proper keyboard types
- 3 pickers with dropdown options:
  - Region: 7 options (Cairo, New Cairo, North Coast, etc.)
  - Property Type: 7 options (Apartment, Villa, House, etc.)
  - Category: 3 options (For Sale, For Rent, For Lease)
- Switch toggle for public/private
- Validation on save
- Loading spinner during save
- Success alert → Navigate back
- Same form for create and edit (mode parameter)

---

## 📋 Leads Module - Complete Flow

### 1. Leads List (Main Screen)
```
┌──────────────────────────────────────────────────────┐
│ ← Back             Leads                 [+ New]    │  ← Button removed
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │ 🔍  Search leads...                         │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [New] [Contacted] [Qualified] [Website]            │
│                                                      │
│  4 leads                                            │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Ahmed Mohamed              ✨ New         │   │
│  │     📱 +20 100 123 4567                      │   │  ← Tap to VIEW DETAIL
│  │     📧 ahmed@example.com                     │   │  ← Long-press to SELECT
│  │     [Website]          👤 Sara Ali           │   │
│  │     💬 Interested in villas in New Cairo    │   │
│  │                                       Today  │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Fatma Hassan               📞 Contacted   │   │
│  │     📱 +20 101 234 5678                      │   │
│  │     📧 fatma@example.com                     │   │
│  │     [Phone Call]       👤 Ahmed Ibrahim      │   │
│  │     💬 Looking for apartment in Zamalek     │   │
│  │                                  Yesterday   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│                       ┌────┐                         │
│                       │ +  │  ← FAB: Create new     │
│                       └────┘                         │
└──────────────────────────────────────────────────────┘
```

**New Features:**
- Smart tap: Opens detail when no selection active
- FAB button: Floating + icon for creating new lead
- "+ New" header button removed (FAB replaces it)
- Color-coded status pills

---

### 2. Lead Detail Screen (NEW)
```
┌──────────────────────────────────────────────────────┐
│ ← Back                                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Ahmed Mohamed                                       │
│  ┌─────────────┐                                    │
│  │ ✨ New      │  ← Color-coded status badge       │
│  └─────────────┘                                    │
│                                                      │
│  ▼ Contact Information                              │
│  ┌──────────────────────────────────────────────┐   │
│  │ 📱  +20 100 123 4567                    →   │   │  ← Tap to call
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ 📧  ahmed@example.com                   →   │   │  ← Tap to email
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ▼ Lead Details                                     │
│  Source:          [Website]                         │
│  Status:          New (blue color)                  │
│  Assigned To:     👤 Sara Ali                       │
│  Created:         Oct 28, 2025                      │
│                                                      │
│  ▼ Notes                                            │
│  │ Interested in luxury villas in New Cairo area.  │
│  │ Budget around 10-15M EGP. Looking for           │
│  │ 5-bedroom with pool and garden.                 │
│                                                      │
│  ┌───────────────────┐  ┌────────────┐             │
│  │ ✏️ Edit Lead      │  │ 🗑️ Delete │             │
│  └───────────────────┘  └────────────┘             │
└──────────────────────────────────────────────────────┘
```

**Features:**
- Lead name with color-coded status badge
- Contact section with interactive rows:
  - Phone: Tap to call (uses `Linking.openURL('tel:...')`)
  - Email: Tap to compose (uses `Linking.openURL('mailto:...')`)
- Lead details table:
  - Source badge
  - Color-coded status
  - Assigned employee with person icon
  - Created date
- Notes section (if available) with blue left border
- Edit button → Opens form in edit mode
- Delete button → Shows confirmation dialog

---

### 3. Lead Form Screen (NEW)
```
┌──────────────────────────────────────────────────────┐
│ ← Back            New Lead                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Name *                                             │
│  ┌──────────────────────────────────────────────┐   │
│  │ Ahmed Mohamed                                │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Phone *                                            │
│  ┌──────────────────────────────────────────────┐   │
│  │ +20 100 123 4567                             │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Email (Optional)                                   │
│  ┌──────────────────────────────────────────────┐   │
│  │ ahmed@example.com                            │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Source *                                           │
│  ┌──────────────────────────────────────────────┐   │
│  │ Website                              ▼      │   │  ← Picker
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Status *                                           │
│  ┌──────────────────────────────────────────────┐   │
│  │ New                                  ▼      │   │  ← Picker
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Assign To (Optional)                               │
│  ┌──────────────────────────────────────────────┐   │
│  │ Sara Ali                             ▼      │   │  ← Picker
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Notes (Optional)                                   │
│  ┌──────────────────────────────────────────────┐   │
│  │ Interested in luxury villas in New Cairo    │   │
│  │ area...                                      │   │
│  │                                              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │     ✓ Create Lead                           │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

**Form Features:**
- 7 fields total (4 required, 3 optional)
- Text inputs with proper keyboard types
- 3 pickers with dropdown options:
  - Source: 6 options (Website, Phone Call, Referral, Social Media, Walk-in, Email)
  - Status: 4 options (New, Contacted, Qualified, Lost)
  - Assign To: Employee list + "Unassigned" option
- Multi-line notes field
- Validation on save (name and phone required)
- Loading spinner during save
- Success alert → Navigate back
- Same form for create and edit (mode parameter)

---

## 🔄 Navigation Patterns

### Pattern 1: View Details
```
List Screen
  ↓ Tap card (no items selected)
Detail Screen
```

### Pattern 2: Edit Existing
```
List Screen
  ↓ Tap card
Detail Screen
  ↓ Tap "Edit" button
Form Screen (edit mode)
  ↓ Save
← Navigate back to list
```

### Pattern 3: Create New
```
List Screen
  ↓ Tap FAB (+) button
Form Screen (create mode)
  ↓ Save
← Navigate back to list
```

### Pattern 4: Multi-Select & Bulk Action
```
List Screen
  ↓ Long press card OR tap checkbox
Selection Mode Active
  ↓ Bulk actions bar appears
Select multiple items
  ↓ Tap bulk action
Confirmation Dialog
  ↓ Confirm
Execute action → Clear selection
```

---

## 🎨 Status Color System

### Lead Status Colors
```
┌─────────────┐
│ ✨ New      │  Blue:   #3b82f6
└─────────────┘

┌─────────────┐
│ 📞 Contacted│  Orange: #f59e0b
└─────────────┘

┌─────────────┐
│ ✅ Qualified│  Green:  #10b981
└─────────────┘

┌─────────────┐
│ ❌ Lost     │  Red:    #ef4444
└─────────────┘
```

### Property Status
```
🌐 Public  = Globe icon + green color
🔒 Private = Lock icon + gray color
```

---

## 💡 User Interaction Guide

### How to View Details
1. **Open list** (Properties or Leads)
2. **Tap any card** → Opens detail screen
3. **View all information**
4. **Tap "Edit"** to modify
5. **Tap "Delete"** to remove (with confirmation)

### How to Create New Item
1. **Open list** (Properties or Leads)
2. **Tap FAB button** (+ icon in bottom-right)
3. **Fill out form** (required fields marked with *)
4. **Tap "Save"** button
5. **Success!** → Navigates back to list

### How to Edit Existing Item
1. **Open list** → **Tap card** → Detail screen
2. **Tap "Edit" button** → Form screen
3. **Modify fields** (all previous data pre-filled)
4. **Tap "Update"** button
5. **Success!** → Navigates back to list

### How to Delete Item
1. **Open list** → **Tap card** → Detail screen
2. **Tap "Delete" button**
3. **Confirmation dialog** appears
4. **Tap "Delete"** to confirm
5. **Success!** → Navigates back to list

### How to Use Bulk Actions
1. **Open list** (Properties or Leads)
2. **Long-press any card** OR **tap checkbox** to start selection
3. **Tap more cards** to select multiple items
4. **Bulk actions bar** appears at bottom
5. **Tap action button:**
   - **All** - Select all items
   - **Clear** - Deselect all items
   - **Public/Private** (Properties) - Change visibility
   - **Contacted/Qualified** (Leads) - Update status
   - **Delete** - Remove selected items
6. **Confirmation dialog** for destructive actions
7. **Confirm** → Action executes → Selection clears

---

## 🎯 Quick Reference

### Properties Module
- **List:** Search, filter (Public/Private/Sale/Rent), multi-select
- **Detail:** Full info, edit/delete buttons
- **Form:** 11 fields, 3 pickers, validation
- **FAB:** Bottom-right + icon to create

### Leads Module
- **List:** Search, filter (Status/Source), multi-select, color-coded
- **Detail:** Full info, call/email, edit/delete buttons
- **Form:** 7 fields, 3 pickers, validation
- **FAB:** Bottom-right + icon to create

### Navigation Bar
- **Dashboard** 🏠 - Overview + homepage button
- **Properties** 🏢 - Property management
- **Leads** 📋 - Lead tracking
- **Team** 👥 - Employee management (company only)
- **Settings** ⚙️ - App settings

---

**Visual Guide Version:** 2.0  
**Last Updated:** October 28, 2025  
**Platform:** React Native + Expo  
**Status:** Complete CRUD Implementation
