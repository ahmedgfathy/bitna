# Contaboo - Multi-Tenant Real Estate CRM

A comprehensive Real Estate CRM system built with React Native (Expo) for mobile/web and Node.js (Express + Prisma) for the backend.

## 📂 Project Structure

```
contaboo/
├── api/                    # Backend API (Node.js + Express + Prisma)
│   ├── src/
│   │   ├── config/        # Database & app configuration
│   │   ├── middleware/    # Auth, tenant isolation, error handling
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic & database operations
│   │   └── index.ts       # Server entry point
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── package.json
│
└── mobile/                 # Frontend (React Native + Expo)
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── screens/       # App screens (Dashboard, Properties, Leads, etc.)
    │   ├── navigation/    # Navigation configuration
    │   ├── services/      # API client & services
    │   ├── stores/        # Zustand state management
    │   ├── types/         # TypeScript types
    │   ├── i18n/          # Translations (English/Arabic)
    │   └── config/        # App configuration
    └── package.json
```

## ✨ Features

### 🏢 Company Management
- **Company Profile**: Logo, name, address, contact info, description
- **Team Management**: Create, edit, deactivate employees
- **Role-Based Access Control**: Owner, Manager, Sales Agent, Marketer, Admin Assistant, Employee
- **Employee PIN System**: Auto-generated PINs for first login

### 🏘️ Property Management
- Add, edit, delete properties
- Public/private property listings
- Location-based search (nearby properties)
- Property types, regions, categories, listing statuses
- Image galleries and detailed descriptions

### 👥 Lead Management
- Track leads with status (New, Contacted, Qualified, Negotiating, Won, Lost)
- Lead sources tracking (Website, Referral, Social Media, etc.)
- Assign leads to team members
- Lead notes and history

### 📊 Dashboard & Analytics
- Property statistics (total, public listings)
- Lead statistics (total, qualified, conversion rates)
- Team member overview
- Quick actions (Add Property, View Leads, Manage Team)

### 📅 Activities & Tasks System
- Tasks, Notes, and Meetings
- Link activities to Leads or Properties
- Priority levels (Low, Medium, High)
- Status tracking (Pending, Completed, Cancelled)
- Calendar view
- Upcoming and overdue activities
- Reminder notifications

### 🌍 Internationalization
- Full English and Arabic support
- RTL (Right-to-Left) layout for Arabic
- Flag-based language switcher
- Persistent language preferences

### 🔐 Multi-Tenant Architecture
- Complete data isolation between tenants
- Tenant-scoped API endpoints
- Subscription management (Active, Trial, Suspended)
- Owner/Manager/Employee roles

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MariaDB/MySQL database
- Expo CLI (for mobile development)

### Backend Setup (API)

1. **Navigate to API folder:**
```bash
cd api
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create `.env` file in `api/` folder:
```env
DATABASE_URL="mysql://user:password@localhost:3306/contaboo"
PORT=3000
NODE_ENV=development
```

4. **Setup database:**
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations
npx prisma migrate dev --name init
```

5. **Start development server:**
```bash
npm run dev
```

API will be available at: `http://localhost:3000`

### Frontend Setup (Mobile)

1. **Navigate to mobile folder:**
```bash
cd mobile
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API URL:**
Edit `mobile/src/config/constants.ts` to point to your API server:
```typescript
export const API_BASE_URL = 
  Platform.OS === 'web' 
    ? 'http://localhost:3000/api'
    : 'http://YOUR_LOCAL_IP:3000/api'; // e.g., 'http://192.168.0.104:3000/api'
```

4. **Start Expo:**
```bash
npm expo start
```

5. **Run on device/emulator:**
- Press `w` for web
- Press `a` for Android
- Press `i` for iOS
- Scan QR code with Expo Go app on your phone

## 📱 API Endpoints

### Company Management
- `GET /api/company/profile` - Get company profile
- `PUT /api/company/profile` - Update company profile

### Employee Management
- `GET /api/employees` - List all employees (with filters)
- `POST /api/employees` - Create employee (returns temporary PIN)
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Deactivate employee
- `POST /api/employees/:id/reset-pin` - Reset employee PIN

### Properties
- `GET /api/properties` - Get tenant's properties
- `POST /api/properties` - Create property
- `GET /api/properties/public` - Get public listings
- `GET /api/properties/nearby` - Get nearby properties

### Leads
- `GET /api/leads` - Get tenant's leads
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Activities
- `GET /api/activities` - Get activities (with filters)
- `POST /api/activities` - Create activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity
- `GET /api/activities/upcoming` - Get upcoming activities
- `GET /api/activities/overdue` - Get overdue activities

### Dashboard
- `GET /api/stats/dashboard` - Get dashboard statistics

### Static Data
- `GET /api/static/property-types` - Get property types
- `GET /api/static/regions` - Get regions
- `GET /api/static/categories` - Get categories
- `GET /api/static/listing-statuses` - Get listing statuses

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: MariaDB/MySQL
- **Language**: TypeScript

### Frontend
- **Framework**: React Native
- **Platform**: Expo (~54.0.20)
- **Navigation**: React Navigation v7
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Maps**: react-native-maps
- **Storage**: AsyncStorage
- **Language**: TypeScript

## 🎨 Design System

- **Colors**: 
  - Primary: `#3b82f6` (Blue)
  - Success: `#10b981` (Green)
  - Warning: `#f59e0b` (Amber)
  - Danger: `#ef4444` (Red)
  - Background: `#f8fafc` (Gray)
  
- **Typography**: System fonts with fallback
- **Spacing**: 4px base unit
- **Border Radius**: 8px, 12px, 16px

## 🔒 Authentication & Authorization

- Multi-tenant architecture with complete data isolation
- Role-based access control (RBAC)
- OTP-based authentication (mobile number + PIN)
- Tenant isolation middleware for all API endpoints
- Owner, Manager, and Employee permission levels

## 📦 Database Schema

### Main Models
- **Tenant**: Company/freelancer account
- **User**: Team members with roles
- **Property**: Real estate listings
- **Lead**: Potential customers
- **Activity**: Tasks, notes, meetings
- **PropertyType, Region, Category, ListingStatus**: Tenant-scoped static data

### Relationships
- One tenant has many users, properties, leads, activities
- Activities can be linked to either leads or properties (polymorphic)
- Users can be assigned to leads and activities

## 🌐 Localization

Currently supports:
- **English** (Default)
- **Arabic** (with RTL support)

To add a new language:
1. Add translations to `mobile/src/i18n/translations.ts`
2. Update `Language` type in the same file
3. Add language option to LanguageSwitcher component

## 🧪 Development

### Running Tests
```bash
# Backend
cd api
npm test

# Frontend
cd mobile
npm test
```

### Database Management
```bash
# Open Prisma Studio (Visual database editor)
cd api
npx prisma studio

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset
```

## 📝 Environment Variables

### API (.env)
```env
DATABASE_URL="mysql://user:password@localhost:3306/contaboo"
PORT=3000
NODE_ENV=development
JWT_SECRET="your-secret-key"
```

### Mobile (embedded in code)
- `API_BASE_URL`: API server address
- `API_TIMEOUT`: Request timeout (default: 10000ms)

## 🚧 Roadmap

- [ ] Complete Edit Profile, Change Password, Notification Settings modals
- [ ] Image upload for company logo and property photos
- [ ] Push notifications for activity reminders
- [ ] Advanced property search and filters
- [ ] Reports and analytics dashboard
- [ ] Email integration for lead communication
- [ ] Document management
- [ ] Contract and deal management
- [ ] Calendar integration
- [ ] Mobile app native builds (iOS/Android)

## 📄 License

Proprietary - All rights reserved

## 👥 Team

Developed for multi-tenant real estate management.

---

**Version**: 1.0.0  
**Last Updated**: October 28, 2025
