# EGAR Real Estate CRM Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Technical Stack](#technical-stack)
3. [Core Features](#core-features)
4. [Theme System](#theme-system)
5. [Authentication & Authorization](#authentication--authorization)
6. [Internationalization](#internationalization)
7. [Components Structure](#components-structure)

## System Overview ##
EGAR Real Estate CRM is a comprehensive customer relationship management system designed specifically for real estate agencies. It provides tools for managing properties, leads, and user interactions in a multi-language, theme-customizable interface.

## Technical Stack
- **Frontend Framework**: Next.js (React)
- **UI Library**: Material-UI (MUI) v5
- **State Management**: React Context API
- **Authentication**: JWT-based authentication
- **Internationalization**: next-i18next
- **Styling**: MUI Theme System & CSS-in-JS

## Core Features

### Dashboard Layout
- Responsive sidebar with collapsible functionality
- Dynamic navigation based on user roles
- Theme switcher with multiple color schemes
- Language switcher (English/Arabic)
- RTL support for Arabic language

### User Management
- Role-based access control (Admin/Agent)
- User authentication
- Profile management
- Session handling

### Properties Management
- Property listing
- Property details
- Add/Edit properties
- Property search and filtering

### Leads Management
- Lead tracking
- Lead details
- Add/Edit leads
- Lead status management

## Theme System
Currently supports five themes:
- Blue (Default)
- White
- Black
- Green
- Orange

### Theme Structure
```javascript
themeColors = {
  primary: String,    // Main color
  secondary: String,  // Secondary color
  gradient: String    // Background gradient
}
```

### Theme Components
- AppBar customization
- Drawer/Sidebar styling
- Typography system
- Button variants
- Paper components
- List items
- Breadcrumbs

## Authentication & Authorization

### User Roles
- **Admin**: Full system access
- **Agent**: Limited access to properties and leads

### Protected Routes
- Dashboard
- Properties
- Leads
- Settings (Admin only)
- User Management (Admin only)

## Internationalization

### Supported Languages
- English (default)
- Arabic (with RTL support)

### Translation Structure
- Common translations
- Dashboard-specific translations
- Form labels
- Error messages

## Components Structure

### Layout Components
- DashboardLayout
  - AppBar
  - Drawer
  - Main Content Area
  - Theme Switcher
  - Language Switcher

### Core Components
1. **Navigation**
   - Breadcrumbs
   - Menu Items
   - Collapsible Sidebar

2. **User Interface**
   - ThemeSwitcher
   - LanguageSwitcher
   - UserAvatar
   - ResponsiveDrawer

3. **Forms**
   - Property Forms
   - Lead Forms
   - User Forms

### Styling Guidelines
- Consistent spacing using theme.spacing
- Responsive breakpoints
- Color palette usage
- Typography scale

## Project Structure
```
EGAR-Real-Estates-CRM/
├── components/
│   ├── DashboardLayout.js
│   ├── ThemeSwitcher.js
│   └── [other components]
├── styles/
│   └── theme.js
├── contexts/
│   └── ThemeContext.js
├── pages/
│   ├── dashboard/
│   ├── properties/
│   ├── leads/
│   └── settings/
├── public/
│   ├── locales/
│   └── images/
└── lib/
    └── auth.js
```

## Configuration
- Theme customization via `styles/theme.js`
- Language configuration in `next-i18next.config.js`
- Authentication setup in `lib/auth.js`

## Best Practices
1. Component-based architecture
2. Responsive design principles
3. Theme consistency
4. Accessibility considerations
5. Performance optimization
6. Security measures

## Future Enhancements
- [ ] Advanced property search
- [ ] Reporting system
- [ ] Email integration
- [ ] Calendar integration
- [ ] Document management
- [ ] Mobile application