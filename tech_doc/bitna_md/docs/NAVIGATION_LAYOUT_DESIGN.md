# Navigation Layout Design - Facebook-Style

## Overview
The application now features a responsive navigation system that adapts between mobile and web layouts, with a Facebook-inspired design for desktop views.

## Mobile Layout (< 1024px)

```
┌─────────────────────────────────┐
│  Top Navigation Bar             │
│  [🏠] [🏢] [📄] [👥] [⚙️]      │
├─────────────────────────────────┤
│                                 │
│                                 │
│     Main Content Area           │
│     (Full Width)                │
│                                 │
│                                 │
└─────────────────────────────────┘
```

### Features:
- **Top Nav Bar**: Module icons displayed horizontally
- **Full Width Content**: Main content uses entire screen width
- **Touch Optimized**: Large tap targets for mobile interaction
- **Icons Only**: Space-efficient icon-only navigation

## Web/Desktop Layout (≥ 1024px)

```
┌──────────────────────────────────────────────────────────────┐
│              Top Navigation Bar (Centered Modules)            │
│    [Sidebar]  [🏠 Dashboard] [🏢 Properties] [📄 Leads]     │
│               [👥 Team] [⚙️ Settings]         [Sidebar]       │
├──────────────────────────────────────────────────────────────┤
│           │                            │                      │
│   Left    │                            │      Right          │
│  Sidebar  │    Main Content Area       │     Sidebar         │
│  (300px)  │    (Centered, Max 1200px)  │     (300px)         │
│           │                            │                      │
│  Profile  │                            │   Activity Feed     │
│  Stats    │                            │   Notifications     │
│  Links    │                            │   Tasks             │
│  Saved    │                            │   Quick Stats       │
│           │                            │                      │
└───────────┴────────────────────────────┴─────────────────────┘
```

### Features:
- **Centered Navigation**: Module icons centered at top with labels
- **Left Sidebar (300px)**:
  - User profile card with avatar
  - Quick stats (Properties, Leads, Deals)
  - Quick action links
  - Saved searches
  
- **Center Content (Max 1200px)**:
  - Main application content
  - Responsive and centered
  - Optimal reading width
  
- **Right Sidebar (300px)**:
  - Recent activity feed
  - Notifications with badge counter
  - Today's tasks with checkboxes
  - Monthly statistics widget

## Component Structure

### Files Created:
1. **`TopNavBar.tsx`** - Top navigation with module icons
2. **`LeftSidebar.tsx`** - Left sidebar with profile & stats
3. **`RightSidebar.tsx`** - Right sidebar with activity & notifications
4. **`AuthenticatedNavigator.tsx`** - Main layout orchestrator

### Layout Logic:
```typescript
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;

// Conditional rendering:
{isDesktop && <LeftSidebar />}   // Only on desktop
{isDesktop && <RightSidebar />}  // Only on desktop
```

## Navigation Modules

### Available Routes:
1. **🏠 Dashboard** - Overview & statistics
2. **🏢 Properties** - Property management
3. **📄 Leads** - Lead tracking
4. **👥 Team** - Employee management (company only)
5. **⚙️ Settings** - App settings & profile

### Active State:
- **Mobile**: Blue icon with light blue background
- **Web**: Blue icon/text with light blue background pill

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 1024px | Top nav, no sidebars |
| Desktop | ≥ 1024px | Top nav + both sidebars |

## Color Scheme

### Primary Colors:
- **Active**: `#2563eb` (Blue)
- **Inactive**: `#64748b` (Gray)
- **Background**: `#f8fafc` (Light Gray)
- **Sidebar BG**: `#ffffff` (White)

### Borders:
- **Sidebar**: `#e2e8f0` (Light border)
- **Nav Bar**: `#e2e8f0` (Bottom border)

## Future Enhancements

### Left Sidebar:
- [ ] Real-time stats from API
- [ ] User profile image upload
- [ ] Quick action functionality
- [ ] Saved search management
- [ ] Recently viewed items

### Right Sidebar:
- [ ] Live activity feed from backend
- [ ] Real notification system
- [ ] Task management with CRUD
- [ ] Chat/messaging widget
- [ ] Calendar integration

### Navigation:
- [ ] Badge counters for notifications
- [ ] Keyboard shortcuts
- [ ] Search bar in top nav
- [ ] User menu dropdown
- [ ] Dark mode toggle

## Usage Example

The layout automatically adapts based on screen size:

```tsx
// Mobile (automatically uses top nav only)
<TopNavBar currentRoute="Dashboard" onNavigate={handleNav} />
<MainContent />

// Desktop (automatically adds sidebars)
<TopNavBar currentRoute="Dashboard" onNavigate={handleNav} />
<LeftSidebar />
<MainContent />
<RightSidebar />
```

## Benefits

### Mobile:
✅ Clean, icon-based navigation
✅ Maximum content space
✅ Fast module switching
✅ Familiar mobile UX

### Desktop:
✅ Facebook-inspired familiar layout
✅ Quick access to profile & stats
✅ Activity monitoring without switching pages
✅ Multi-tasking friendly
✅ Professional appearance
✅ Space for future features

## Design Philosophy

The layout follows Facebook's proven design pattern:
- **Left**: Personal & shortcuts (user-centric)
- **Center**: Main content (focus area)
- **Right**: Updates & engagement (ambient awareness)

This creates a balanced, scannable interface that users already understand from social media platforms.
