# GLO CRM Template Structure Organization

## Overview
This document outlines the standardized template structure for the GLO CRM system. The organization ensures consistency across all pages while maintaining flexibility for specific use cases.

## Template Layout Hierarchy

### 1. Base Template (`templates/base.html`)
The foundation template that provides:
- HTML document structure
- CSS/JS dependencies
- Global styles for navbar, dropdowns, and layout
- Fixed navbar positioning with proper z-index
- Global spacing rules to prevent navbar overlap
- RTL/LTR support
- Dark theme support

### 2. Layout Templates (`templates/layouts/`)

#### Standard Page Layout (`layouts/standard_page.html`)
**Purpose**: General pages like dashboard, reports, settings
**Features**:
- Background decorative elements
- Automatic navbar inclusion
- Breadcrumb navigation
- Page header with icon and title
- Standardized spacing (pt-24 for navbar clearance)
- Content wrapper with proper z-index

**Usage**:
```django
{% extends "layouts/standard_page.html" %}
{% block page_title %}Dashboard{% endblock %}
{% block active_nav %}dashboard{% endblock %}
{% block icon_name %}tachometer-alt{% endblock %}
{% block main_content %}
    <!-- Your content here -->
{% endblock %}
```

#### Form Page Layout (`layouts/form_page.html`)
**Purpose**: Create/edit forms for properties, users, leads, etc.
**Features**:
- Form-specific background styling
- Two-column layout (sidebar + main form)
- Form validation and error handling
- Standardized form field styling
- Action buttons (save/cancel)
- Progress indicators

**Usage**:
```django
{% extends "layouts/form_page.html" %}
{% block page_title %}Add Property{% endblock %}
{% block active_nav %}properties{% endblock %}
{% block icon_name %}building{% endblock %}
{% block form_content %}
    <!-- Your form fields here -->
{% endblock %}
```

#### List Page Layout (`layouts/list_page.html`)
**Purpose**: Data tables and lists (properties, users, leads, etc.)
**Features**:
- Search and filter section
- Data table with sorting
- Pagination controls
- Action buttons (add, export, etc.)
- Status badges and action buttons
- Responsive table design

**Usage**:
```django
{% extends "layouts/list_page.html" %}
{% block page_title %}Properties{% endblock %}
{% block active_nav %}properties{% endblock %}
{% block icon_name %}building{% endblock %}
{% block table_content %}
    <!-- Your table rows here -->
{% endblock %}
```

#### Detail Page Layout (`layouts/detail_page.html`)
**Purpose**: View individual records (property details, user profile, etc.)
**Features**:
- Detail header with key information
- Tabbed content sections
- Action buttons (edit, delete, etc.)
- Related items sections
- Print-friendly styling

**Usage**:
```django
{% extends "layouts/detail_page.html" %}
{% block page_title %}Property Details{% endblock %}
{% block active_nav %}properties{% endblock %}
{% block icon_name %}building{% endblock %}
{% block detail_content %}
    <!-- Your detail content here -->
{% endblock %}
```

## Design System Components

### 1. Navigation Structure
- **Fixed Navbar**: Always at top with z-index 1000
- **Dropdown Menus**: Ultra-high z-index (99999) to stay above all content
- **Mobile Menu**: Responsive design with backdrop blur
- **Active State**: Visual indication of current section

### 2. Spacing System
- **Navbar Height**: 4rem (h-16)
- **Content Top Padding**: 6rem (pt-24) to clear fixed navbar
- **Container Margins**: Consistent 4rem spacing
- **Card Padding**: 1.5rem standard, 2rem for headers

### 3. Color Scheme
- **Primary**: Cyan to Blue gradient (#06b6d4 to #3b82f6)
- **Background**: Slate variations with transparency
- **Text**: White for headings, gray-300 for body
- **Borders**: Slate-600 with 50% opacity
- **Status Colors**: Green (success), Red (danger), Yellow (warning)

### 4. Typography
- **Headers**: 3xl font-bold for page titles
- **Subheaders**: xl font-semibold for section titles
- **Body**: Base size with gray-300 color
- **Labels**: sm font-medium with uppercase transformation

### 5. Components

#### Buttons
```css
.btn-primary: Gradient background, hover effects
.btn-secondary: Gray background, subtle styling
.btn-danger: Red background for destructive actions
.action-btn: Small buttons for table actions
```

#### Cards
```css
.content-card: Transparent background with backdrop blur
.detail-card: White background for detail pages
.info-card: Light gray background for information sections
```

#### Tables
```css
.data-table: Dark theme with hover effects
.pagination-btn: Consistent pagination styling
.status-badge: Color-coded status indicators
```

#### Forms
```css
.form-input: Dark background with focus states
.form-label: Consistent labeling with required indicators
.form-error: Red error text styling
```

## Implementation Guidelines

### 1. Page Structure
All pages should follow this structure:
1. Background decorative elements
2. Navigation bar (automatic inclusion)
3. Main content with proper spacing
4. Breadcrumb navigation
5. Page header with icon and title
6. Content sections

### 2. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sections on mobile
- Touch-friendly button sizes

### 3. Accessibility
- Proper semantic HTML
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color ratios
- Focus indicators

### 4. Performance
- Optimized CSS with minimal specificity
- Efficient JavaScript with event delegation
- Lazy loading for large datasets
- Minimal DOM manipulation

## Migration Plan

### Phase 1: Update Core Templates
1. ✅ Update base.html with standardized navbar spacing
2. ✅ Create layout templates (standard, form, list, detail)
3. ✅ Fix navbar overlap issues across all pages

### Phase 2: Template Conversion
1. 🔄 Convert dashboard templates to use standard_page.html
2. 🔄 Convert property templates to use appropriate layouts
3. 🔄 Convert management templates to use appropriate layouts
4. 🔄 Convert account templates to use appropriate layouts

### Phase 3: Component Standardization
1. Standardize all form field styling
2. Implement consistent button styles
3. Unify table and card designs
4. Optimize mobile responsiveness

### Phase 4: Testing and Refinement
1. Cross-browser testing
2. Mobile device testing
3. Accessibility audit
4. Performance optimization

## File Organization

```
templates/
├── base.html                 # Foundation template
├── layouts/                  # Layout templates
│   ├── standard_page.html    # General pages
│   ├── form_page.html        # Create/edit forms
│   ├── list_page.html        # Data tables/lists
│   └── detail_page.html      # Detail/view pages
├── includes/                 # Reusable components
│   ├── navbar.html           # Navigation bar
│   ├── language_switcher.html
│   └── other_components.html
├── core/                     # Core app templates
├── property/                 # Property app templates
├── management/               # Management app templates
├── accounts/                 # Account app templates
├── leads/                    # Leads app templates
├── opportunities/            # Opportunities app templates
└── errors/                   # Error pages
```

## Benefits of This Structure

1. **Consistency**: All pages follow the same layout patterns
2. **Maintainability**: Changes to layouts affect all related pages
3. **Developer Experience**: Clear patterns reduce development time
4. **User Experience**: Familiar navigation and interactions
5. **Accessibility**: Built-in accessibility features
6. **Responsive**: Mobile-first design approach
7. **Performance**: Optimized CSS and JavaScript
8. **Scalability**: Easy to add new pages following existing patterns

## Next Steps

1. Continue converting existing templates to use the new layouts
2. Implement component library for common UI elements
3. Add animation and transition effects
4. Integrate with frontend build tools for optimization
5. Create comprehensive style guide documentation
