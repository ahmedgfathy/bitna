# Contaboo Real Estate CRM

A comprehensive real estate Customer Relationship Management (CRM) system built with modern web technologies. This platform enables real estate companies to manage properties, clients, agents, and business operations efficiently.

## 🏗️ Architecture Overview

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for responsive UI
- **Lucide React** for icons
- **React Hook Form** with Zod validation

### Backend
- **Appwrite Cloud** (Backend as a Service)
- **Database**: NoSQL document-based
- **Authentication**: Built-in user management
- **File Storage**: Media and document management
- **Real-time**: WebSocket support

## 🗄️ Database Schema

The system uses **26 collections** organized into logical groups:

### Core Reference Tables
- `property_types` - Property classifications (apartment, villa, office)
- `categories` - Property categories (residential, commercial, industrial)  
- `currencies` - Supported currencies (USD, EUR, EGP)
- `compounds` - Real estate developments
- `compound_locations` - Geographic data for compounds

### Property Management
- `properties` - Core property information
- `locations` - Detailed address and location data
- `features` - Property features and amenities
- `facilities` - Available facilities (gym, security, etc.)
- `media` - Images, videos, documents, virtual tours

### Financial Management
- `financials` - Pricing, payments, and financial tracking
- `status_activity` - Property status and sales activity
- `crm_tracking` - Sales notes and agent assignments

### User Management & RBAC
- `users` - System users (agents, managers, admins)
- `roles` - Role definitions with hierarchy levels
- `permissions` - Granular permission system
- `groups` - Teams and departments organization
- Junction tables for many-to-many relationships

### Security & Audit
- `audit_logs` - Complete audit trail of all actions
- `audit_event_types` - Event type reference

## 🎯 Key Features

### 🏠 Property Management
- **Complete Property Lifecycle**: From listing to sale/rental
- **Advanced Search & Filtering**: Multi-criteria property search
- **Media Management**: Images, videos, virtual tours, documents
- **Location Tracking**: GPS coordinates, compound management
- **Feature Management**: Detailed amenities and facility tracking

### 💰 Financial Management
- **Comprehensive Pricing**: Base price, asking price, sold price
- **Payment Tracking**: Installments, down payments, maintenance fees
- **Multi-Currency Support**: Handle different currencies
- **Financial Reporting**: Revenue and sales analytics

### 👥 User & Permission Management
- **Role-Based Access Control (RBAC)**: 4-level hierarchy
  - CEO (Level 1): Full system access
  - Manager (Level 2): Department management
  - Team Lead (Level 3): Team operations
  - Sales/Agent (Level 4): Property operations
- **Group Management**: Teams and departments
- **Permission Matrix**: Granular access control
- **User Activity Tracking**: Complete audit trail

### 📊 CRM Features
- **Lead Management**: Track prospects and follow-ups
- **Agent Assignment**: Property ownership and responsibility
- **Sales Notes**: Detailed activity and communication logs
- **Status Tracking**: Property availability and sales pipeline
- **Activity Management**: Viewings, follow-ups, appointments

### 🔒 Security Features
- **Document-Level Security**: Row-level access control
- **Audit Logging**: All actions tracked with user, IP, timestamp
- **Authentication**: Secure login with session management
- **Data Validation**: Type safety and business rule enforcement

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Appwrite Cloud account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ahmedgomaa/contaboo.git
cd contaboo
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=real_estate
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🗄️ Database Setup

The database schema has been designed and documented. See `DATABASE_SCHEMA.md` for complete details.

### Appwrite Configuration
- **Project ID**: `68bf5a2cd78f0a617a92`
- **Database ID**: `real_estate`
- **Endpoint**: `https://fra.cloud.appwrite.io/v1`

### Collections Summary
- **26 Total Collections**
- **Complete RBAC Implementation**
- **Full Audit Trail**
- **Optimized Indexes**
- **Document-Level Security**

## 📱 User Interface

### Public Website
- **Homepage**: Property showcase and search
- **Property Listings**: Advanced filtering and search
- **Property Details**: Comprehensive property information
- **Contact Forms**: Lead generation and inquiries

### CRM Dashboard (Access via `/crm/login`)
- **Property Management**: CRUD operations for properties
- **User Management**: Agent and client management
- **Financial Tracking**: Revenue and payment monitoring
- **Reports & Analytics**: Business intelligence dashboard
- **Audit Logs**: Security and compliance monitoring

## 🔐 Authentication & Authorization

### User Roles
1. **CEO**: Complete system access
2. **Manager**: Department and team management
3. **Team Lead**: Team operations and property assignment
4. **Sales Agent**: Property management and client interaction

### Demo Credentials
```
Manager: manager@contaboo.com / password123
Agent: agent@contaboo.com / password123
```

### Permissions System
- **Property CRUD**: Create, read, update, delete properties
- **User Management**: Manage team members and assignments
- **Financial Access**: View and manage financial data
- **Audit Access**: Security and compliance monitoring
- **Report Generation**: Business analytics and reporting

## 🛠️ Development

### Project Structure
```
contaboo/
├── src/                     # Source code
│   ├── app/                # Next.js App Router pages
│   │   ├── crm/           # CRM dashboard pages
│   │   ├── properties/    # Property listing pages
│   │   ├── contact/       # Contact page
│   │   └── layout.tsx     # Root layout
│   ├── components/        # Reusable UI components
│   │   ├── Header.tsx     # Site navigation
│   │   ├── Footer.tsx     # Site footer
│   │   ├── PropertySearch.tsx
│   │   └── FeaturedProperties.tsx
│   └── lib/               # Utility libraries
│       └── appwrite.ts    # Appwrite configuration
├── documentation/         # Project documentation
│   ├── DATABASE_SCHEMA.md
│   ├── DATABASE_VERIFICATION.md
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT.md
│   └── README.md
├── sh_scripts/           # Database setup scripts
│   ├── add_attributes.sh
│   ├── create_indexes.sh
│   ├── properties_attributes.sh
│   └── [other setup scripts]
├── json_files/           # Appwrite configuration
│   ├── appwrite.json
│   ├── appwrite.config.json
│   └── appwrite-schema.json
├── public/               # Static assets
└── README.md            # Main project documentation
```

### Key Technologies
- **Frontend Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS with custom design system
- **State Management**: React hooks and context
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library
- **Backend**: Appwrite Cloud BaaS

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

## 📊 API Integration

### Appwrite Services Used
- **Database**: Document storage and querying
- **Authentication**: User management and sessions
- **Storage**: File uploads for property media
- **Functions**: Server-side business logic (future)
- **Realtime**: Live updates for CRM dashboard (future)

### Collection Access Patterns
```typescript
// Example: Fetch properties with filters
const properties = await databases.listDocuments(
  DATABASE_ID,
  COLLECTIONS.PROPERTIES,
  [
    Query.equal('status', 'available'),
    Query.equal('category_id', categoryId),
    Query.greaterThan('price', minPrice),
    Query.lessThan('price', maxPrice)
  ]
);
```

## 🔍 Schema Verification

The database schema has been thoroughly verified against the original MySQL design:

✅ **26/26 Collections Implemented**  
✅ **All Relationships Preserved**  
✅ **RBAC System Complete**  
✅ **Audit Trail Functional**  
✅ **Performance Optimized**  

See `DATABASE_VERIFICATION.md` for detailed verification report.

## 🚀 Deployment

### Production Deployment
1. **Build the application**
```bash
npm run build
```

2. **Deploy to Vercel** (recommended)
```bash
npx vercel --prod
```

3. **Configure environment variables** in your deployment platform

### Environment Variables
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=68bf5a2cd78f0a617a92
NEXT_PUBLIC_APPWRITE_DATABASE_ID=real_estate
```

## 📈 Performance & Optimization

### Database Optimization
- **Indexes**: Created on frequently queried fields
- **Query Optimization**: Efficient filtering and pagination
- **Document Structure**: Optimized for read/write patterns

### Frontend Optimization
- **Next.js App Router**: Optimized routing and rendering
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic bundle optimization
- **Caching**: Static generation where appropriate

## 🔒 Security Features

### Data Security
- **Document-Level Security**: Appwrite security rules
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: NoSQL document queries
- **XSS Protection**: React's built-in protections

### User Security
- **Password Hashing**: Appwrite built-in security
- **Session Management**: Secure authentication tokens
- **Role-Based Access**: Granular permission system
- **Audit Logging**: Complete action tracking

## 📚 Documentation

### Main Documentation
- `README.md` - This file (project overview and getting started)

### Detailed Documentation (in `/documentation/` folder)
- `DATABASE_SCHEMA.md` - Complete database schema documentation
- `DATABASE_VERIFICATION.md` - Schema verification and validation report
- `API_DOCUMENTATION.md` - Comprehensive API reference and examples
- `DEPLOYMENT.md` - Deployment guides for multiple platforms

### Configuration Files (in `/json_files/` folder)
- `appwrite.json` - Main Appwrite project configuration
- `appwrite.config.json` - Appwrite CLI configuration
- `appwrite-schema.json` - Complete database schema export

### Setup Scripts (in `/sh_scripts/` folder)
- Database initialization and setup scripts
- Collection attribute configuration scripts
- Index creation scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Development**: Ahmed Gomaa
- **Database Design**: Comprehensive RBAC system
- **UI/UX**: Modern responsive design
- **Architecture**: Scalable cloud-native solution

## 📞 Support

For support and questions:
- **Email**: info@contaboo.com
- **CRM Access**: `/crm/login`
- **Documentation**: See docs folder
- **Issues**: GitHub Issues

---

**Built with ❤️ for the real estate industry**
# contaboo
# contaboo
