# Contaboo Homepage - Visual Structure Guide

## 📱 Mobile Layout (Default View)

```
┌─────────────────────────────────────┐
│  🎯 HEADER (White Background)       │
│  ┌───────────────────────────────┐  │
│  │ Contaboo          [Login] [Join] │  │ ← Logo (32px) + Auth Buttons
│  └───────────────────────────────┘  │
│                                     │
│  Find Your Dream Property           │ ← Subtitle (24px)
│                                     │
│  ┌──────────────────────────────┐  │
│  │  🔍  Search properties...    │  │ ← Search Input
│  └──────────────────────────────┘  │
│                                     │
│  [Region ▼] [Type ▼] [Category ▼]  │ ← Filter Bar (Modal)
│  ─────────────────────────────────  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ✨ FEATURED PROPERTIES             │
│  ┌────────────┐                     │
│  │   [FEAT]   │   Luxury Penthouse  │
│  │   Image    │   15.0M EGP        │
│  │            │   Zamalek, Cairo   │
│  └────────────┘                     │
│  ← Swipe →                          │ ← Horizontal Scroll
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🏘️ TOP COMPOUNDS                   │
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │Madinaty │Hacienda│Allegria│      │
│  │New Cairo│N. Coast│Sh.Zayed│      │
│  │245 units│189 units│156 units│    │
│  └──────┘  └──────┘  └──────┘      │
│  ← Swipe →                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📍 TOP REGIONS                     │
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │ Image  │ Image  │ Image  │      │
│  │New Cairo│N. Coast│Sh.Zayed│      │
│  │487 Props│356 Props│312 Props│    │
│  └──────┘  └──────┘  └──────┘      │
│  ← Swipe →                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  👨‍💼 TOP AGENTS/BROKERS              │
│  ┌────┐    ┌────┐    ┌────┐        │
│  │ 👤 │    │ 👤 │    │ 👤 │        │
│  │Ahmed│    │Sara│    │Khaled│      │
│  │⭐⭐⭐⭐⭐│    │⭐⭐⭐⭐⭐│    │⭐⭐⭐⭐ │      │
│  │47 list│    │39 list│    │35 list│    │
│  └────┘    └────┘    └────┘        │
│  ← Swipe →                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🏢 ALL PROPERTIES (4)              │
│  ┌──────────────────────────────┐  │
│  │  ┌─────────────────────┐     │  │
│  │  │   Property Image    │     │  │
│  │  └─────────────────────┘     │  │
│  │  Modern Villa in New Cairo   │  │
│  │  Luxurious 4-bedroom villa   │  │
│  │  8.5M EGP        [For Sale]  │  │
│  │  📍 New Cairo, Cairo          │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  [ Property Card 2 ]         │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  [ Property Card 3 ]         │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  [ Property Card 4 ]         │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  📣 FOOTER CTA                      │
│  ┌──────────────────────────────┐  │
│  │ Are you a real estate        │  │
│  │ professional?                │  │
│  │                              │  │
│  │ Join Contaboo to manage your    │  │
│  │ properties and connect with  │  │
│  │ clients                      │  │
│  │                              │  │
│  │     [Join as Agent 🚀]       │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 💻 Desktop Layout (Width ≥ 1024px)

```
┌───────────────────────────────────────────────────────────────────────┐
│                           🎯 HEADER (Centered)                        │
│       ┌───────────────────────────────────────────────────┐          │
│       │  Contaboo                    [Login]     [Join]     │          │
│       │                                                    │          │
│       │  Find Your Dream Property                         │          │
│       │                                                    │          │
│       │  ┌────────────────────────────────────────────┐  │          │
│       │  │  🔍  Search properties...                  │  │          │
│       │  └────────────────────────────────────────────┘  │          │
│       │                                                    │          │
│       │  [Region ▼]  [Property Type ▼]  [Category ▼]    │          │
│       └───────────────────────────────────────────────────┘          │
│                          Max-width: 1200px                            │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                   ✨ FEATURED PROPERTIES (Carousel)                   │
│       ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│       │   [FEATURED]   │  │   [FEATURED]   │  │   [FEATURED]   │   │
│       │   Image        │  │   Image        │  │   Image        │   │
│       │ Luxury Penthouse│  │ Beachfront Villa│  │Modern Apartment│   │
│       │   15.0M EGP    │  │   18.0M EGP    │  │    3.5M EGP    │   │
│       └────────────────┘  └────────────────┘  └────────────────┘   │
│       ← Swipe Horizontally →                                         │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                    🏘️ TOP COMPOUNDS (Horizontal)                      │
│       ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│       │ Madinaty │  │ Hacienda │  │ Allegria │                      │
│       │New Cairo │  │N. Coast  │  │Sh. Zayed │                      │
│       │245 units │  │189 units │  │156 units │                      │
│       └──────────┘  └──────────┘  └──────────┘                      │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                    📍 TOP REGIONS (Horizontal)                        │
│       ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                       │
│       │Image │  │Image │  │Image │  │Image │                       │
│       │New   │  │North │  │Sheikh│  │Zamal │                       │
│       │Cairo │  │Coast │  │Zayed │  │lek   │                       │
│       │487 P │  │356 P │  │312 P │  │198 P │                       │
│       └──────┘  └──────┘  └──────┘  └──────┘                       │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                  👨‍💼 TOP AGENTS/BROKERS (Horizontal)                   │
│       ┌────┐   ┌────┐   ┌────┐   ┌────┐                            │
│       │ 👤 │   │ 👤 │   │ 👤 │   │ 👤 │                            │
│       │Ahmed│   │Sara│   │Khaled│  │Mona│                            │
│       │⭐⭐⭐⭐⭐│   │⭐⭐⭐⭐⭐│   │⭐⭐⭐⭐│   │⭐⭐⭐⭐⭐│                            │
│       │47 ls│   │39 ls│   │35 ls│   │42 ls│                            │
│       └────┘   └────┘   └────┘   └────┘                            │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                  🏢 ALL PROPERTIES (Grid: 2-3 columns)               │
│       ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│       │  ┌────────┐  │  │  ┌────────┐  │  │  ┌────────┐  │         │
│       │  │ Image  │  │  │  │ Image  │  │  │  │ Image  │  │         │
│       │  └────────┘  │  │  └────────┘  │  │  └────────┘  │         │
│       │ Villa NCairo │  │ Apt Marina  │  │Office Downtown│         │
│       │  8.5M EGP    │  │  4.2M EGP   │  │  15K EGP     │         │
│       │ [For Sale]   │  │ [For Sale]  │  │ [For Rent]   │         │
│       └──────────────┘  └──────────────┘  └──────────────┘         │
│       ┌──────────────┐                                               │
│       │  ┌────────┐  │    (3 columns if width > 1400px)            │
│       │  │ Image  │  │                                               │
│       │  └────────┘  │                                               │
│       │ House Zamalek│                                               │
│       │  12.0M EGP   │                                               │
│       │ [For Sale]   │                                               │
│       └──────────────┘                                               │
│                                                                       │
│                    Centered container (max-width: 1200px)            │
└───────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────┐
│                         📣 FOOTER CTA (Centered)                      │
│       ┌───────────────────────────────────────────────────┐          │
│       │  Are you a real estate professional?             │          │
│       │                                                    │          │
│       │  Join Contaboo to manage your properties and         │          │
│       │  connect with clients                             │          │
│       │                                                    │          │
│       │           [Join as Agent 🚀]                      │          │
│       └───────────────────────────────────────────────────┘          │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme

```
┌─────────────────────────────────────────┐
│  PRIMARY (Blue)       #2563eb  ████   │
│  Secondary (Green)    #10b981  ████   │
│  Accent (Orange)      #f59e0b  ████   │
│  Background (Gray)    #f8fafc  ████   │
│  Surface (White)      #ffffff  ████   │
│  Text Primary         #1e293b  ████   │
│  Text Secondary       #64748b  ████   │
│  Border               #e2e8f0  ████   │
│  Success              #10b981  ████   │
│  Error                #ef4444  ████   │
└─────────────────────────────────────────┘
```

---

## 🔧 Interactive Elements

### Filter Bar (Modal)
```
Before Selection:
┌────────┐  ┌─────────────┐  ┌──────────┐
│Region ▼│  │Prop. Type ▼ │  │Category ▼│
└────────┘  └─────────────┘  └──────────┘

After Selection (Cairo, Villa, For Sale):
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│Cairo (1)    ×│  │Villa (1)    ×│  │For Sale (2) ×│
└──────────────┘  └──────────────┘  └──────────────┘
              [Clear All Filters]

Modal View (Bottom Sheet):
┌─────────────────────────────────────┐
│  Select Region                   ×  │
│  ────────────────────────────────  │
│  □ Cairo                            │
│  □ New Cairo                        │
│  □ North Coast                      │
│  □ Sheikh Zayed                     │
│  □ Zamalek                          │
│  □ Maadi                            │
│  □ Heliopolis                       │
│                                     │
│  [ Apply ]                          │
└─────────────────────────────────────┘
```

### Property Card States
```
Default:              Hover/Press:
┌──────────────┐      ┌──────────────┐
│  Image       │      │  Image       │
│              │      │  (opacity70%)│
│  Title       │  →   │  Title       │
│  8.5M EGP    │      │  8.5M EGP    │
│  [For Sale]  │      │  [For Sale]  │
│  📍 Location  │      │  📍 Location  │
└──────────────┘      └──────────────┘
```

---

## 📏 Spacing Guide

```
Header Padding:           20px (lg)
Section Top Margin:       24px (xl)
Section Bottom Margin:    32px (2xl)
Card Padding:            20px (lg)
Card Gap:                20px (lg)
Button Padding:          H:32px V:14px
Input Padding:           H:20px V:12px
Between Sections:        40px (3xl)
```

---

## 🎯 Key Design Features

### ✅ Implemented
- ✨ Modern sans-serif typography (System font)
- 📱 Mobile-first responsive design
- 💻 Desktop grid layout (2-3 columns)
- 🎨 Consistent color palette from theme
- 🔍 Real-time search and filtering
- 📊 Horizontal scrolling sections
- 🎭 Shadow elevation for depth
- 🔘 Rounded corners (8-20px)
- 📍 Location-based sections
- 👨‍💼 Agent/broker showcase
- 🏘️ Compound listings
- ⭐ Star rating system (1-5)
- 🏷️ Featured property badges
- 📲 Pull-to-refresh
- 🔄 Loading states
- 🚫 Empty state messaging

### 🎨 Visual Hierarchy
1. **Primary Actions**: Blue buttons (#2563eb)
2. **Secondary Actions**: Outlined blue buttons
3. **Success/Status**: Green badges (#10b981)
4. **Highlights**: Orange featured badges (#f59e0b)
5. **Text**: Dark primary (#1e293b), Gray secondary (#64748b)

### 📐 Responsive Breakpoints
- Mobile: 0-767px (default, single column)
- Tablet: 768-1023px (same as mobile for now)
- Desktop: 1024-1399px (2 column grid, centered)
- Wide: 1400px+ (3 column grid, centered)

---

**Testing Instructions:**
1. **Mobile**: Scan QR code with Expo Go
2. **Web**: Visit http://localhost:8081
3. **Test Filters**: Select Region/Type/Category
4. **Test Search**: Type "Villa" or "Cairo"
5. **Test Scroll**: Swipe horizontal sections
6. **Test Navigation**: Tap property cards
7. **Test Responsive**: Resize browser window

**Expected Results:**
- Smooth 60fps scrolling
- Instant filter updates
- No layout shifts
- Consistent spacing
- Readable typography
- Touch-friendly targets (44px+)
