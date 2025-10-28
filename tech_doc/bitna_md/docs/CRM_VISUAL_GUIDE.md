# Contaboo CRM - Visual Interface Guide

## 🎨 Complete CRM Layout Overview

### Bottom Navigation Bar (Icon-Only)
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  🏡      📊      🏘️      👥      👨‍💼      ⚙️              │
│ Home   Dashboard Props   Leads    Team   Settings          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
           ↑ Active tab highlighted in blue
```

---

## 📊 Properties Module

### Main List View
```
┌──────────────────────────────────────────────────────┐
│ ← Back                Properties           [+ New]  │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │ 🔍  Search properties...                    │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [Public] [Private] [For Sale] [For Rent]          │
│                                                      │
│  4 properties • 2 selected                          │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │ ☑  Luxury Villa - New Cairo             🌐  │   │  ← Selected
│  │     Modern 5-bedroom villa with pool        │   │
│  │     12.0M EGP         [Villa]  [For Sale]   │   │
│  │     📍 Fifth Settlement, New Cairo          │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Penthouse Apartment - Zamalek        🌐  │   │
│  │     Exclusive penthouse with Nile view      │   │
│  │     15.0M EGP         [Apt.]  [For Sale]    │   │
│  │     📍 Zamalek, Cairo                        │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ ☑  Commercial Office - Downtown          🔒  │   │  ← Selected
│  │     Prime office space in business district │   │
│  │     25,000 EGP/mo     [Comm.] [For Rent]    │   │
│  │     📍 Downtown, Cairo                       │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Beachfront Villa - North Coast       🌐  │   │
│  │     Luxury villa with private beach access  │   │
│  │     18.0M EGP         [Villa]  [For Sale]    │   │
│  │     📍 Hacienda Bay, North Coast            │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│                    ↓ Scroll for more ↓              │
│                                                      │
├──────────────────────────────────────────────────────┤
│  [All] [Clear] [📢 Public] [🔒 Private] [🗑️ Delete] │  ← Bulk Actions
└──────────────────────────────────────────────────────┘
```

### Card States

#### Unselected Card:
```
┌────────────────────────────────────────┐
│ ☐  Property Title               🌐/🔒  │
│    Description text here...            │
│    12.0M EGP    [Type]  [Category]     │
│    📍 Location                         │
└────────────────────────────────────────┘
```

#### Selected Card (Blue Border + Light Blue Background):
```
┌════════════════════════════════════════┐
║ ☑  Property Title               🌐/🔒  ║
║    Description text here...            ║
║    12.0M EGP    [Type]  [Category]     ║
║    📍 Location                         ║
└════════════════════════════════════════┘
```

### Filter Chips

#### Inactive Filter:
```
┌─────────┐
│ Public  │  ← Gray background, dark text
└─────────┘
```

#### Active Filter:
```
┌─────────┐
│ Public  │  ← Blue background, white text
└─────────┘
```

---

## 👥 Leads Module

### Main List View
```
┌──────────────────────────────────────────────────────┐
│ ← Back                  Leads             [+ New]   │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │ 🔍  Search leads...                         │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [New] [Contacted] [Qualified] [Website]            │
│                                                      │
│  4 leads • 1 selected                               │
├──────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐   │
│  │ ☑  Ahmed Mohamed              ✨ New         │   │  ← Selected
│  │     📱 +20 100 123 4567                      │   │
│  │     📧 ahmed@example.com                     │   │
│  │     [Website]          👤 Sara Ali           │   │
│  │     💬 Interested in villas in New Cairo    │   │
│  │                                       Today  │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Fatma Hassan               📞 Contacted   │   │
│  │     📱 +20 101 234 5678                      │   │
│  │     📧 fatma@example.com                     │   │
│  │     [Phone Call]       👤 Ahmed Ibrahim      │   │
│  │     💬 Looking for apartment in Zamalek     │   │
│  │                                  Yesterday   │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Mohamed Khaled             ✅ Qualified   │   │
│  │     📱 +20 102 345 6789                      │   │
│  │     [Referral]         👤 Sara Ali           │   │
│  │     💬 Budget 5-7M EGP, North Coast area    │   │
│  │                                    3d ago    │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │ ☐  Nour Essam                 ✨ New         │   │
│  │     📱 +20 103 456 7890                      │   │
│  │     📧 nour@example.com                      │   │
│  │     [Social Media]                           │   │
│  │     💬 Commercial property inquiry           │   │
│  │                                    Oct 22    │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│                    ↓ Scroll for more ↓              │
│                                                      │
├──────────────────────────────────────────────────────┤
│  [All] [Clear] [📞 Contact] [✅ Qualify] [🗑️ Delete] │  ← Bulk Actions
└──────────────────────────────────────────────────────┘
```

### Status Color Coding

```
✨ New         → Blue (#3b82f6)
📞 Contacted   → Orange (#f59e0b)
✅ Qualified   → Green (#10b981)
❌ Lost        → Red (#ef4444)
```

### Lead Card Anatomy
```
┌────────────────────────────────────────────┐
│ ☐  Name                   Status Emoji     │  ← Header with checkbox
│     📱 Phone Number                        │  ← Contact info
│     📧 Email (if available)                │
│     [Source Badge]    👤 Assigned Employee │  ← Metadata row
│     💬 Notes preview text truncated...     │  ← Notes (optional)
│                              Timestamp →   │  ← Smart date
└────────────────────────────────────────────┘
```

---

## 🎯 Interaction Patterns

### Selection Methods
1. **Tap Card** → Toggle selection
2. **Long Press** → Toggle selection
3. **Tap Checkbox** → Toggle selection

### Bulk Actions Workflow
```
1. Select items (checkbox turns blue with ✓)
   ↓
2. Bulk actions bar appears at bottom
   ↓
3. Choose action (All, Clear, Public, Delete, etc.)
   ↓
4. Confirmation dialog (for destructive actions)
   ↓
5. Action executes → Selection clears → Success message
```

### Search & Filter Flow
```
Type in search box → Instant filter
       +
Click filter chip → Toggle on/off
       ↓
Results update in real-time
       ↓
"X properties" or "X leads" count updates
```

---

## 📱 Mobile Gestures

```
┌─────────────────────────────────────────┐
│  ↓ Pull Down = Refresh                  │
│  ↑ Swipe Up = Scroll                    │
│  👆 Tap = Select/Deselect               │
│  👆👆 Long Press = Select/Deselect       │
│  ← → Swipe = (Future: Quick actions)    │
└─────────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Primary Actions:
```
#2563eb  ████  Primary Blue (Buttons, selections, links)
#3b82f6  ████  Light Blue (Selected card background)
```

### Status Colors:
```
#10b981  ████  Success Green (Qualified, For Sale badge)
#f59e0b  ████  Warning Orange (Contacted status)
#ef4444  ████  Danger Red (Lost status, delete button)
#64748b  ████  Neutral Gray (Inactive elements)
```

### Background:
```
#ffffff  ████  White (Cards, surfaces)
#f8fafc  ████  Light Gray (Page background)
#e2e8f0  ████  Border Gray (Dividers, borders)
```

### Text:
```
#1e293b  ████  Primary Text (Headings, titles)
#64748b  ████  Secondary Text (Descriptions, metadata)
#94a3b8  ████  Tertiary Text (Placeholders, timestamps)
```

---

## 📐 Spacing & Sizing

### Card Dimensions:
```
Width: Screen width - 40px (20px margin each side)
Min Height: Auto (content-based)
Padding: 20px
Border Radius: 16px
Border: 2px (transparent → blue when selected)
```

### Typography Sizes:
```
Screen Title:    28px (3xl) Bold
Card Title:      18px (lg) Bold
Body Text:       16px (base) Regular
Small Text:      14px (sm) Regular
Micro Text:      12px (xs) Regular/Medium
```

### Touch Targets:
```
Checkbox:        24x24px (in 44x44px touch area)
Filter Chip:     Auto width × 32px
Button:          Auto width × 40px minimum
Card:            Full width × Auto height
```

---

## 🔄 State Indicators

### Loading State:
```
┌─────────────────────────────────┐
│                                  │
│           ⟳                      │
│    Loading properties...         │
│                                  │
└─────────────────────────────────┘
```

### Empty State:
```
┌─────────────────────────────────┐
│                                  │
│    🏢                            │
│    No properties found           │
│    Try adjusting your filters    │
│                                  │
└─────────────────────────────────┘
```

### Error State (Future):
```
┌─────────────────────────────────┐
│                                  │
│    ⚠️                            │
│    Failed to load data           │
│    [Retry]                       │
│                                  │
└─────────────────────────────────┘
```

---

## 💡 Pro Tips

### For Fast Selection:
1. Use **"Select All"** button for bulk operations
2. **Long press** to start multi-select mode
3. **Clear** button to deselect everything instantly

### For Efficient Filtering:
1. **Combine filters** - e.g., "Public" + "For Sale" = Public properties for sale
2. **Search first**, then filter for precision
3. Filter chips **toggle** - click again to remove filter

### For Better Organization:
1. Use **Public/Private** toggle to control visibility
2. **Bulk actions** save time vs. editing one-by-one
3. **Pull to refresh** to get latest data

---

## 📊 Information Hierarchy

### Properties Card Priority:
```
1. Title (Most Important)
2. Price
3. Type & Category
4. Description
5. Location & Region
6. Public/Private Status
```

### Leads Card Priority:
```
1. Name & Status (Most Important)
2. Contact Info (Phone, Email)
3. Source & Assigned To
4. Notes Preview
5. Timestamp
```

---

## ✨ Visual Polish Details

### Card Shadows:
```
shadowColor: #000
shadowOffset: { width: 0, height: 2 }
shadowOpacity: 0.1
shadowRadius: 4
elevation: 2 (Android)
```

### Selected Card Effect:
```
borderWidth: 2
borderColor: #2563eb (Primary blue)
backgroundColor: #eff6ff (Light blue tint)
```

### Bulk Actions Bar Shadow:
```
shadowColor: #000
shadowOffset: { width: 0, height: -2 }
shadowOpacity: 0.2
shadowRadius: 16
elevation: 8 (Android)
```

### Filter Chip Animation:
```
Active: backgroundColor transitions to primary
Text: color transitions to white
Border: borderColor matches background
```

---

## 🎯 Accessibility Features

✅ **Touch Targets**: All interactive elements ≥ 44x44px
✅ **Color Contrast**: Text meets WCAG AA standards
✅ **Text Sizing**: 14px minimum for body text
✅ **Visual Feedback**: Clear hover/active/selected states
✅ **Emoji + Text**: Emojis complement, don't replace text
✅ **Loading States**: Clear progress indicators
✅ **Error Handling**: User-friendly error messages

---

**Visual Guide Version**: 1.0  
**Last Updated**: October 28, 2024  
**Platform**: React Native + Expo  
**Design System**: Contaboo Theme (theme.ts)
