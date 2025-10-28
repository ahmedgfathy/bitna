# Real Estate CRM System

A comprehensive Customer Relationship Management system specifically designed for real estate companies, supporting both English and Arabic languages.

## 🏢 Core Features

- **Property Management**
  - Property listings with detailed information
  - Multiple property types (apartments, villas, offices, etc.)
  - Price and area management
  - Media attachments support
  - Import/Export capabilities

- **Lead Management**
  - Lead tracking and qualification
  - Source tracking
  - Follow-up scheduling
  - Conversion tracking

- **Sales Pipeline**
  - Deal tracking
  - Sales forecasting
  - Commission management
  - Performance analytics

- **Multilingual Support**
  - Full Arabic (RTL) support
  - English interface
  - Easy language switching

## 🛠 Technology Stack

### Frontend
- React 18
- Material-UI v5
- TailwindCSS
- Recharts for analytics
- RTL support with custom styling
- Axios for API communication

### Backend
- Node.js
- Express.js
- MySQL/MariaDB
- JWT Authentication
- RESTful API architecture

### Key Libraries
- `@mui/material` - UI components
- `@fontsource/cairo` - Arabic font
- `@fontsource/roboto` - English font
- `recharts` - Charts and analytics
- `axios` - HTTP client
- `jsonwebtoken` - Authentication
- `mysql2` - Database connectivity

## 📦 Modules

### 1. Authentication & Authorization
- User registration and login
- Role-based access control
- Company-based data isolation
- JWT token management

### 2. Property Management
- Property listings
- Property details
- Media management
- Location tracking
- Price history
- Unit specifications

### 3. Lead Management
- Lead capture
- Lead qualification
- Follow-up scheduling
- Activity tracking
- Source analytics

### 4. Opportunity Management
- Deal pipeline
- Stage tracking
- Probability assessment
- Value forecasting

### 5. Calendar & Tasks
- Appointment scheduling
- Task management
- Reminder system
- Team calendar

### 6. Documents
- Document storage
- Version control
- Access permissions
- Template management

### 7. Analytics & Reporting
- Sales performance
- Lead conversion rates
- Property statistics
- Agent performance
- Custom reports

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/estates-crm.git
cd estates-crm
```

2. Install dependencies:
```bash
npm run install-all
```

3. Configure environment:
```bash
cp backend/.env.example backend/.env
# Edit .env with your database credentials
```

4. Initialize database:
```bash
cd backend
npm run init-db
```

5. Start development servers:
```bash
cd ..
npm start
```

## 🌐 Environment Configuration

### Backend (.env)
