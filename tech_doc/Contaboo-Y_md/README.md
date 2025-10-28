# Glomart CRM - Professional Business Management CRM

A modern, full-stack business management system built with Next.js 15, TypeScript, MariaDB, and NextAuth.

## Features

- **User Authentication**: Secure sign-in/sign-up with NextAuth.js
- **Role-Based Access Control**: Owner, Admin, Team Leader, Sales, and Marketer roles
- **Company Management**: Multi-company support with unique registration codes
- **Lead Management**: Create, read, update, and delete leads
- **Dashboard Analytics**: View key metrics and statistics
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Type-Safe**: Full TypeScript support throughout the application
- **Database**: MariaDB/MySQL with native drivers

## 🏢 **Company Hierarchy Structure**

Our CRM system follows standard industry practices with a comprehensive organizational hierarchy that supports real-world company structures:

### 🎯 **Organizational Hierarchy:**

```
👑 OWNER (CEO/Founder)
    ├── 👔 MANAGER (Department Head)
    │   ├── 🎖️ Team Leader 1
    │   │   ├── 💼 Sales Person 1
    │   │   ├── 💼 Sales Person 2
    │   │   └── 📢 Marketer 1
    │   ├── 🎖️ Team Leader 2
    │   │   ├── 💼 Sales Person 3
    │   │   ├── 💼 Sales Person 4
    │   │   └── 📢 Marketer 2
    │   └── 🎖️ Team Leader 3
    │       ├── 💼 Sales Person 5
    │       ├── 💼 Sales Person 6
    │       └── 📢 Marketer 3
    └── 👔 MANAGER 2 (Another Department)
        └── [More teams...]
```

### 🔐 **Permission Flow by Role:**

#### **OWNER Powers:**
- ✅ Grant permissions to all managers
- ✅ View entire company performance
- ✅ Access all leads across all departments
- ✅ Create and modify company-wide policies
- ✅ Complete system administration

#### **MANAGER Capabilities:**
- ✅ Oversee multiple team leaders (typically 3-5 teams)
- ✅ View department leads (all teams under them)
- ✅ Create leads for any team member in department
- ✅ Edit team leads within their department
- ✅ Assign leads within department
- ✅ Manage team leaders and their performance
- ✅ View department reports and analytics

#### **TEAM LEADER Responsibilities:**
- ✅ Manage groups of sales & marketing staff (5-10 people)
- ✅ View team leads only
- ✅ Create leads for team members
- ✅ Edit team leads
- ✅ Assign leads within team
- ✅ Coach and manage sales/marketing staff
- ✅ View team reports and individual performance

#### **SALES/MARKETER Access:**
- ✅ View own leads only
- ✅ Create own leads
- ✅ Edit own leads
- ✅ View personal reports
- ❌ Cannot access other team members' leads
- ❌ Cannot delete leads (security measure)

### 🏗️ **Real-World Example Structure:**

```
🏢 ABC Real Estate Company (OWNER)
    ├── 📍 Dubai Branch (MANAGER)
    │   ├── 🏠 Residential Team (TEAM LEADER)
    │   │   ├── Sales Agent 1 (Villas/Houses)
    │   │   ├── Sales Agent 2 (Apartments)
    │   │   └── Marketing Specialist (Social Media)
    │   ├── 🏢 Commercial Team (TEAM LEADER)
    │   │   ├── Sales Agent 3 (Office Spaces)
    │   │   ├── Sales Agent 4 (Retail Spaces)
    │   │   └── Marketing Specialist (B2B Marketing)
    │   └── 🏭 Industrial Team (TEAM LEADER)
    │       ├── Sales Agent 5 (Warehouses)
    │       └── Sales Agent 6 (Manufacturing)
    ├── 📍 Abu Dhabi Branch (MANAGER)
    │   └── [Similar team structure...]
    └── 📍 Sharjah Branch (MANAGER)
        └── [Similar team structure...]
```

### 🎯 **Lead Assignment Logic:**

1. **OWNER** → Can assign leads to anyone in the company
2. **MANAGER** → Can assign leads to anyone in their department (all teams)
3. **TEAM LEADER** → Can assign leads to anyone in their team
4. **SALES/MARKETER** → Leads are auto-assigned to themselves

### 🔍 **Data Visibility Rules:**

- **OWNER**: Sees ALL company data
- **MANAGER**: Sees all data from their department teams
- **TEAM LEADER**: Sees all data from their team members
- **SALES/MARKETER**: Sees only their own data

This structure ensures:
- **🔒 Data Security**: Users only see what they need
- **📊 Proper Reporting**: Each level gets appropriate analytics
- **⚡ Efficient Management**: Clear chain of command
- **🚀 Scalability**: Easy to add new teams and departments

### 💼 **Industry Applications:**

This hierarchy works perfectly for:
- **🏢 Real Estate Companies** (Century 21, RE/MAX)
- **💼 Sales Organizations** (Oracle, Salesforce teams)
- **📞 Call Centers** (Customer support structures)
- **🏪 Retail Chains** (Store → Regional → National)
- **🏭 Manufacturing** (Territory-based sales teams)
- **💰 Financial Services** (Branch-based structures)

## 🛠️ Technology Stack

### **Programming Languages**
- **TypeScript 5.x** - Primary language for all application code
- **JavaScript** - Compiled output and runtime environment

### **Frontend Framework**
- **Next.js 15.5.0** - React-based full-stack framework
- **React 19.1.0** - UI library
- **React DOM 19.1.0** - DOM rendering

### **Backend/API**
- **Next.js API Routes** - Serverless API endpoints
- **Node.js** - Runtime environment

### **Database & ORM**
- **MariaDB/MySQL** - Local database with mysql2 driver
- **Native SQL queries** - Direct database access

### **Styling & UI**
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Radix UI** - Headless UI components library
- **Lucide React** - Modern icon library
- **Class Variance Authority** - Component variant management

### **Authentication & Security**
- **NextAuth.js 4.24.11** - Authentication library
- **bcryptjs 3.0.2** - Password hashing and encryption
- **Zod 4.0.17** - Runtime schema validation

### **Form Handling & Validation**
- **React Hook Form 7.62.0** - Performant form management
- **Hookform Resolvers 5.2.1** - Form validation integration

### **Development Tools**
- **ESLint 9.x** - Code linting and quality
- **TypeScript 5.x** - Static type checking
- **PostCSS** - CSS processing and optimization

### **File Extensions Used**
- `.ts` - TypeScript files
- `.tsx` - TypeScript React components  
- `.json` - Configuration files
- `.css` - Stylesheets
- `.prisma` - Database schema definitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- MariaDB/MySQL database server
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ahmedgfathy/glomart-crm.git
cd glomart-crm
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URLs and NextAuth secret:
```
# MariaDB/MySQL Database Configuration
DATABASE_URL="mysql://root:password@localhost:3306/glomart_crm_local"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. Set up the database:
```bash
# Create database tables (if needed)
# Database schema is handled automatically by the application
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The application uses a comprehensive role-based access control system with the following main entities:

### Core Models
- **User**: Authentication and user management with role assignments
- **Company**: Multi-tenant company management with unique codes
- **Role**: Hierarchical role system (Owner, Admin, Team Leader, Sales, Marketer)
- **Permission**: Granular permission system for access control
- **RolePermission**: Junction table for role-permission relationships

### Business Models
- **Lead**: Lead information and tracking with assignments
- **Activity**: Lead activity history and interactions
- **Department**: Organizational structure management
- **Team**: Team-based lead assignment and management

### System Models
- **Account/Session**: NextAuth.js authentication tables
- **AuditLog**: Comprehensive audit trail for all system actions

## API Routes

### Authentication
- `POST /api/auth/register` - User registration (Owner/Employee)
- `GET /api/auth/check-first-user` - Check if first user exists
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signout` - User sign out

### Role Management
- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create a new role
- `GET /api/roles/[id]` - Get a specific role
- `PUT /api/roles/[id]` - Update a role
- `DELETE /api/roles/[id]` - Delete a role

### Lead Management
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `GET /api/leads/[id]` - Get a specific lead
- `PUT /api/leads/[id]` - Update a lead
- `DELETE /api/leads/[id]` - Delete a lead

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── roles/         # Role management endpoints
│   │   └── leads/         # Lead management endpoints
│   ├── auth/              # Authentication pages (signin/signup)
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utility functions and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── permissions.ts    # Permission management utilities
│   ├── audit.ts          # Audit logging service
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
```

## Deployment

The application is optimized for deployment on Vercel with the following requirements:

### Environment Variables Required
```bash
# Database Configuration
DATABASE_URL="mysql://username:password@host:3306/database"

# NextAuth Configuration  
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret"

# Optional OAuth Providers
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### Deployment Steps
1. Set up a MySQL/MariaDB database (PlanetScale or similar recommended)
2. Configure environment variables in Vercel
3. Connect your GitHub repository to Vercel
4. Deploy automatically on git push

### Database Setup
```bash
# Create database manually in MariaDB/MySQL
# Tables are created automatically by the application
# Default data is seeded on first run
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
