# 🏠 House Hub CRM Suite

<div align="center">

![House Hub CRM](public/placeholder.svg)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Modern, Efficient Real Estate CRM Solution
</div>

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Authentication](#-authentication)
- [Database Schema](#-database-schema)
- [Role-Based Access Control](#-role-based-access-control)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🏢 Property Management
- Complete property lifecycle management
- Detailed property cards with images
- Status tracking (For Sale, For Rent, Pending, Sold)
- Advanced property search and filtering

### 👥 Client Management
- Comprehensive client profiles
- Contact history tracking
- Client status management (Lead, Active, Inactive)
- Notes and interaction logging

### 👥 Team Management
- Role-based access control
- Team hierarchy management
- Performance tracking
- Task assignment and monitoring

### 📊 Dashboard & Analytics
- Real-time performance metrics
- Property status overview
- Team activity monitoring
- Sales pipeline visualization

## 🛠 Technology Stack

- **Frontend:**
  - React 18+ with TypeScript
  - Vite for blazing-fast development
  - TailwindCSS for styling
  - Shadcn/ui for beautiful components
  - Lucide icons for consistent iconography

- **Backend:**
  - Supabase for backend services
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions

- **Authentication:**
  - Supabase Auth
  - JWT token management
  - Role-based access control
  - Custom auth hooks

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/house-hub-crm-suite.git
cd house-hub-crm-suite
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn UI components
│   └── layout/          # Layout components
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
├── pages/              # Route pages
└── lib/                # Utility functions
```

## 🔐 Authentication

### User Roles
- **Manager**: Full system access
- **Team Leader**: Team management & oversight
- **Salesman**: Client & property management
- **Marketer**: Marketing & lead generation

### Auth Flow
1. User signs up/logs in
2. Profile created automatically
3. Role assigned based on registration
4. Access control enforced via RLS

## 📊 Database Schema

### Core Tables
- **profiles**: User profiles & roles
- **teams**: Team organization
- **clients**: Client management
- **properties**: Property listings
- **notes**: Client/Property notes
- **tasks**: Team tasks

## 🛡 Role-Based Access Control

### Managers
- Create/manage teams
- Access all properties
- View all clients
- Assign roles

### Team Leaders
- Manage team members
- View team properties
- Access team clients
- Assign tasks

### Salesmen
- Manage assigned properties
- Handle client interactions
- Update property status
- Create notes

## 📡 API Documentation

### Client APIs
```typescript
// Create new client
createClient(data: ClientData): Promise<Client>

// Update client
updateClient(id: string, data: Partial<Client>): Promise<Client>

// Delete client
deleteClient(id: string): Promise<void>
```

### Property APIs
```typescript
// List properties
listProperties(filters?: PropertyFilters): Promise<Property[]>

// Create property
createProperty(data: PropertyData): Promise<Property>

// Update property
updateProperty(id: string, data: Partial<Property>): Promise<Property>
```

## 🚀 Deployment

1. **Build the application**
```bash
npm run build
```

2. **Deploy to hosting service**
```bash
# Example for Vercel
vercel --prod
```

3. **Database Migrations**
```bash
# Apply all migrations
./apply_migrations.sh
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Shadcn/ui for the beautiful component library
- Supabase team for the amazing backend service
- All contributors who helped shape this project

---

<div align="center">
Made with ❤️ for real estate professionals
</div>
