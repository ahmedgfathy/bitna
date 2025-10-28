# AI-Powered Real Estate CRM - Project Setup Guide

## 🎯 Project Overview
This is an AI-powered real estate CRM with a public listing website and private dashboard for agents, brokers, and property managers.

## 📁 Project Structure
```
contaboo/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI components (Button, Input, Card)
│   │   ├── layout/        # Layout components (Header, Footer, Sidebar)
│   │   └── forms/         # Form components
│   ├── pages/             # Page components
│   │   ├── public/        # Public website pages
│   │   └── dashboard/     # CRM dashboard pages
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── services/          # API services
│   ├── store/             # State management
│   └── constants/         # Constants and configurations
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🛠️ Tech Stack Implemented
- ✅ React 19 with Vite
- ✅ Tailwind CSS v4 for styling
- ✅ React Router DOM for routing
- ✅ React Hook Form for form handling
- ✅ Axios for API calls
- ✅ Lucide React for icons
- ✅ React Toastify for notifications

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 📋 Next Steps After Opening in VS Code

### 1. Project Structure Setup
Create the following directories and files:

```bash
# Create directory structure
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/forms
mkdir -p src/pages/public
mkdir -p src/pages/dashboard
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/services
mkdir -p src/store
mkdir -p src/constants

# Create essential files
touch src/components/ui/Button.jsx
touch src/components/ui/Input.jsx
touch src/components/ui/Card.jsx
touch src/components/layout/Header.jsx
touch src/components/layout/Footer.jsx
touch src/pages/public/HomePage.jsx
touch src/pages/dashboard/DashboardPage.jsx
touch src/utils/cn.js
touch src/constants/routes.js
```

### 2. Key Features to Implement

#### Public Website
- **Homepage** with hero section, property search, featured listings
- **Property Listings** with filters (type, region, price, bedrooms)
- **Property Details** pages
- **Contact Forms** (no phone numbers visible to public)

#### CRM Dashboard
- **Authentication** via mobile number + OTP
- **Dashboard** with property statistics
- **Add Property** with AI text parsing
- **Manage Listings** (CRUD operations)
- **Leads Management** from contact forms

#### AI Text Parser
- **OpenAI Integration** for parsing free-text property descriptions
- **Structured Data Extraction** (bedrooms, bathrooms, price, location, etc.)
- **Auto-categorization** of property types and features

### 3. Database Schema (Supabase)

#### Tables to Create:
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) DEFAULT 'agent', -- agent, broker, owner, developer
  company_name VARCHAR(100),
  profile_image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Property types
CREATE TABLE property_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL -- Apartment, Villa, Duplex, etc.
);

-- Regions
CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL -- Cairo, Giza, Alexandria
);

-- Sub-regions
CREATE TABLE subregions (
  id SERIAL PRIMARY KEY,
  region_id INTEGER REFERENCES regions(id),
  name VARCHAR(100) NOT NULL -- New Cairo, 6th of October, etc.
);

-- Properties
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  user_id UUID REFERENCES users(id),
  property_type_id INTEGER REFERENCES property_types(id),
  region_id INTEGER REFERENCES regions(id),
  subregion_id INTEGER REFERENCES subregions(id),
  status VARCHAR(20) DEFAULT 'for_sale', -- for_sale, for_rent, sold, rented
  price DECIMAL(15,2),
  currency VARCHAR(10) DEFAULT 'EGP',
  size_m2 DECIMAL(10,2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  floor_number INTEGER,
  features JSONB, -- elevator, balcony, parking, etc.
  images JSONB, -- array of image URLs
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact leads
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  mobile VARCHAR(20),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Environment Variables
Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_TWILIO_ACCOUNT_SID=your_twilio_sid
VITE_TWILIO_AUTH_TOKEN=your_twilio_token
```

### 5. Essential Utilities to Create

#### `src/utils/cn.js` (Tailwind class merging)
```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

#### `src/constants/routes.js`
```javascript
export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/property/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADD_PROPERTY: '/dashboard/add-property',
  MY_LISTINGS: '/dashboard/my-listings',
  LEADS: '/dashboard/leads',
  PROFILE: '/dashboard/profile'
}
```

## 🔄 Development Workflow

1. **Start with Public Website**
   - Create homepage with hero section
   - Implement property search and filters
   - Build property listing and detail pages

2. **Add Authentication**
   - Mobile number + OTP registration/login
   - Protected routes for dashboard

3. **Build CRM Dashboard**
   - Dashboard overview with statistics
   - Add property form with AI text parsing
   - Property management (CRUD)
   - Leads management

4. **Integrate AI Features**
   - OpenAI API for text parsing
   - Property data extraction and structuring

5. **Add Advanced Features**
   - Image upload and management
   - Advanced search and filters
   - Email notifications
   - SMS integration

## 📞 Support
This setup guide contains everything needed to continue development. When you open the project in VS Code, you'll have a complete foundation to build upon.

---
**Last Updated**: June 23, 2025
**Project**: AI-Powered Real Estate CRM
**Location**: /Users/ahmedgomaa/Downloads/contaboo
