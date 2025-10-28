# 🏢 Real Estate CRM - Middle East & Egypt Edition

<div align="center">

![Real Estate CRM](https://img.shields.io/badge/Real%20Estate-CRM-blue?style=for-the-badge&logo=building)
![Django](https://img.shields.io/badge/Django-5.2.6-green?style=for-the-badge&logo=django)
![Python](https://img.shields.io/badge/Python-3.13.7-blue?style=for-the-badge&logo=python)
![MariaDB](https://img.shields.io/badge/MariaDB-Database-orange?style=for-the-badge&logo=mariadb)

**A Comprehensive Customer Relationship Management System Built for Real Estate Businesses in the Middle East & Egypt Market**

[🚀 Quick Start](#-quick-start) • [📚 Features](#-key-features) • [🏗️ Architecture](#️-business-logic) • [🎨 Screenshots](#-screenshots) • [📖 Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Business Logic](#️-business-logic)
- [🚀 Quick Start](#-quick-start)
- [🔐 Authentication & RBAC](#-authentication--rbac)
- [📊 Core Modules](#-core-modules)
- [🌍 Localization](#-localization)
- [🛠️ Technology Stack](#️-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📖 Documentation](#-documentation)
- [🤖 AI Integration](#-ai-integration)
- [🎨 Screenshots](#-screenshots)

---

## 🎯 Overview

**Real Estate CRM** is a powerful, enterprise-grade Customer Relationship Management system specifically designed for real estate businesses operating in the Middle East and Egyptian markets. Built with Django 5.2.6, this system provides comprehensive tools for managing leads, properties, projects, and customer relationships with advanced role-based access control and multi-language support.

### 🌟 Why This CRM?

- 🇪🇬 **Built for MENA Region**: Tailored for Egyptian and Middle Eastern real estate market requirements
- 🌐 **Bilingual Support**: Full Arabic (RTL) and English interfaces
- 🏗️ **Complete Pipeline**: From lead capture to project delivery
- 🔒 **Enterprise Security**: Advanced RBAC with field-level permissions
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🤖 **AI-Powered**: MCP integration for AI-assisted development and operations

---

## 🎨 Screenshots

### 📊 Dashboard
*Main dashboard with key metrics, recent activities, and performance overview*

![Dashboard](public/github-photo/dashboard.png)

---

### 🎯 Lead Management
*Lead listing with advanced filters, status pipeline, temperature tracking, and bulk actions*

![Leads List](public/github-photo/leads-list.png)

---

### 📋 Lead Details
*Comprehensive lead view with activity timeline, documents, and interaction history*

![Lead Detail](public/github-photo/lead-detail.png)

---

### 🔐 RBAC Configuration
*Profile management with granular permissions, field-level security, and data scope setup*

![RBAC Configuration](public/github-photo/rbac-config.png)

---

## ✨ Key Features

### 🎯 Lead Management
- 📥 **Multi-channel Lead Capture**: Website, referrals, social media, advertisements
- 🌡️ **Lead Temperature Tracking**: Hot, Warm, Cold classification
- 🎨 **Priority Levels**: Critical, High, Normal, Low with color coding
- 📊 **Status Pipeline**: New → Contacted → Qualified → Proposal → Negotiation → Won/Lost
- 📝 **Activity Timeline**: Complete audit trail of all lead interactions
- 📎 **Document Management**: Attach contracts, IDs, and supporting documents
- 🔄 **Lead Conversion**: Convert qualified leads to contacts
- 📤 **Bulk Operations**: Import/export leads via Excel
- 🔔 **Smart Notifications**: Automated reminders for follow-ups

### 🏘️ Property Management
- 🏢 **Property Types**: Apartments, Villas, Commercial, Land, Mixed-use
- 📍 **Location Management**: Regions, compounds, neighborhoods
- 💰 **Flexible Pricing**: Multiple currencies (EGP, USD, AED, SAR, EUR)
- 🎨 **Finishing Types**: Finished, Semi-finished, Core & Shell, Luxury
- 📐 **Detailed Specs**: Area, rooms, bathrooms, parking, floors
- 🖼️ **Media Gallery**: Multiple images with primary image selection
- 📋 **Unit Purposes**: Sale, Rent, Investment
- 🔖 **Property Status**: Available, Reserved, Sold, Rented, Under Maintenance
- 🏷️ **Reference System**: Internal tracking codes
- 📊 **Property Categories**: Residential, Commercial, Mixed, Industrial

### 📈 Project Management
- 🏗️ **Project Types**: Residential, Commercial, Mixed-Use, Infrastructure
- 📊 **Status Tracking**: Planning → Design → Construction → Delivery → Completed
- 🎯 **Priority Levels**: Low, Medium, Normal, High, Critical
- 📅 **Timeline Management**: Start date, end date, milestones
- 💵 **Budget Tracking**: Multi-currency budget management
- 👥 **Team Assignment**: Assign project managers and team members
- 📝 **Progress Updates**: Track completion percentage
- 📎 **Documentation**: Store project files, plans, and contracts
- 🏢 **Developer Management**: Track developer information and contacts

### 👥 Contact Management
- 📇 **Centralized Database**: All customer information in one place
- 🔄 **Lead Conversion**: Automatically convert qualified leads to contacts
- 💎 **VIP Tracking**: Mark and manage high-value clients
- 💰 **Lifetime Value**: Track total business value per contact
- 📊 **Deal History**: Complete transaction history
- 📝 **Notes & Activities**: Comprehensive interaction tracking
- 📞 **Communication History**: Email, phone, WhatsApp integration
- 🎂 **Important Dates**: Birthdays, anniversaries, renewal dates

### 🔐 Advanced RBAC (Role-Based Access Control)
- 👤 **User Profiles**: Administrator, Manager, Sales Agent, Property Manager
- 🎯 **Granular Permissions**: Module-level and action-level access control
- 🔍 **Field-Level Security**: Control visibility of sensitive fields
- 📊 **Data Filtering**: Users see only relevant data based on their role
- 🎨 **Dynamic Dropdowns**: Customized options per user profile
- 🔒 **Data Scopes**: Own, Assigned, Team, or All data access
- 📝 **Audit Logging**: Complete activity tracking for compliance
- 🚫 **Permission Inheritance**: Hierarchical permission structure

---

## 🏗️ Business Logic

### 🔄 Lead-to-Deal Workflow

```
📱 Lead Generation
    ↓
🔍 Lead Qualification
    ↓
📋 Property Matching
    ↓
🤝 Site Visits & Proposals
    ↓
💬 Negotiation
    ↓
✅ Deal Closure
    ↓
👥 Contact Conversion
    ↓
📊 Project Assignment
    ↓
🎉 Project Delivery
    ↓
🔁 After-Sales & Retention
```

### 📊 Lead Lifecycle Management

#### 1️⃣ **Lead Sources**
- 🌐 Website (Landing pages, contact forms)
- 📱 Social Media (Facebook, Instagram, LinkedIn)
- 📞 Phone Calls (Inbound inquiries)
- 👥 Referrals (Existing customers)
- 📰 Advertisements (Online & offline campaigns)
- 🏢 Walk-ins (Office visits)
- 📧 Email Marketing campaigns
- 🤝 Events & Exhibitions

#### 2️⃣ **Lead Types**
- 🏠 **Buyer**: Looking to purchase property
- 💼 **Seller**: Want to sell their property
- 💰 **Investor**: Investment opportunities
- 🏢 **Tenant**: Looking to rent
- 🏘️ **Landlord**: Have property for rent
- 🔄 **Both**: Buyer and seller simultaneously

#### 3️⃣ **Lead Temperature Classification**
- 🔥 **Hot Lead** (Red): Ready to buy, high intent, immediate action needed
- 🌡️ **Warm Lead** (Orange): Interested, needs nurturing, potential buyer
- ❄️ **Cold Lead** (Blue): Low interest, long-term prospect, minimal engagement

#### 4️⃣ **Lead Status Pipeline**
1. 🆕 **New**: Just entered the system
2. 📞 **Contacted**: First contact made
3. ✅ **Qualified**: Meets buying criteria
4. 📋 **Proposal Sent**: Offer presented
5. 💬 **Negotiation**: Discussing terms
6. 🏘️ **Site Visit Scheduled**: Property viewing arranged
7. 📝 **Contract Prepared**: Legal documents ready
8. ✅ **Won**: Deal closed successfully
9. ❌ **Lost**: Deal didn't close
10. 🔁 **Follow-up Required**: Needs attention

### 🏘️ Property Management Logic

#### Property Classification
```
Property Type
    ├─ 🏢 Residential
    │   ├─ 🏠 Apartment
    │   ├─ 🏡 Villa
    │   ├─ 🏘️ Duplex
    │   ├─ 🏛️ Penthouse
    │   └─ 🏕️ Chalet
    │
    ├─ 💼 Commercial
    │   ├─ 🏪 Shop
    │   ├─ 🏢 Office
    │   ├─ 🏭 Warehouse
    │   └─ 🏨 Hotel
    │
    ├─ 🔄 Mixed-Use
    │   └─ 🏙️ Residential + Commercial
    │
    └─ 🌾 Land
        ├─ 🏗️ Residential Land
        └─ 🏭 Commercial Land
```

#### Property Status Flow
```
Available → Reserved → Contract Signed → Sold/Rented → Delivered
     ↓
Under Maintenance → Available (for resale/re-rent)
     ↓
Off Market (temporary removal)
```

### 📈 Project Management Workflow

#### Project Lifecycle
```
📋 Planning Phase
    ├─ Feasibility Study
    ├─ Budget Approval
    └─ Timeline Definition
         ↓
🎨 Design Phase
    ├─ Architectural Design
    ├─ Engineering Plans
    └─ Permits & Approvals
         ↓
🏗️ Construction Phase
    ├─ Foundation
    ├─ Structure
    ├─ Finishing
    └─ Quality Inspections
         ↓
🚚 Delivery Phase
    ├─ Final Inspections
    ├─ Documentation
    └─ Handover to Clients
         ↓
✅ Completed
    └─ After-sales Support
```

### 👥 User Role Structure

```
🔴 Super Administrator
    ├─ Full system access
    ├─ User management
    ├─ Company settings
    └─ System configuration
         ↓
🟠 Administrator
    ├─ All modules access
    ├─ User creation
    ├─ Reports & analytics
    └─ Audit logs
         ↓
🟡 Manager
    ├─ Team oversight
    ├─ Assign leads/projects
    ├─ View team performance
    └─ Edit team data
         ↓
🟢 Sales Agent
    ├─ Own leads only
    ├─ Assigned properties
    ├─ Create activities
    └─ Limited edit access
         ↓
🔵 Property Manager
    ├─ All properties
    ├─ Property media
    ├─ Status updates
    └─ Limited lead access
         ↓
⚪ Viewer
    ├─ Read-only access
    ├─ Reports viewing
    └─ No editing
```

### 🔒 Data Access Control Logic

#### Field-Level Permissions Example
```python
# Sales Agent Profile
Visible Fields:
    ✅ Lead: name, phone, email, status, temperature
    ❌ Lead: budget_max, commission, internal_notes
    ✅ Property: title, location, price, area
    ❌ Property: cost_price, profit_margin, owner_commission

# Property Manager Profile
Visible Fields:
    ✅ Property: ALL fields including cost and margins
    ❌ Lead: budget fields hidden
    ✅ Project: property assignments only
```

#### Data Scope Filtering
```python
# Sales Representative sees:
- Own created leads
- Leads assigned to them
- Properties in their assigned areas

# Team Leader sees:
- All team members' leads
- Team's assigned properties
- Team performance metrics

# Manager sees:
- All company data
- Cross-team analytics
- Regional performance
```

---

## 🚀 Quick Start

### Prerequisites

- 🐍 Python 3.13.7 or higher
- 🗄️ MariaDB 10.5+ or MySQL 8.0+
- 📦 pip (Python package manager)
- 🔧 Virtual Environment (venv)

### Installation Steps

#### 1️⃣ Clone the Repository
```bash
cd ~/Downloads
# Project is already at /Users/ahmedgomaa/Downloads/real_crm
```

#### 2️⃣ Activate Virtual Environment
```bash
cd real_crm
source venv/bin/activate
```

#### 3️⃣ Install Dependencies
```bash
# Local development dependencies
pip install -r requirements-local.txt

# MCP Server dependencies (for AI integration)
pip install -r requirements-mcp.txt
```

#### 4️⃣ Configure Database
```bash
# Edit database settings
nano real_estate_crm/settings_local.py

# Update these settings:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_database_name',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

#### 5️⃣ Run Migrations
```bash
python manage.py migrate
```

#### 6️⃣ Create Admin User
```bash
python manage.py createsuperuser
```

#### 7️⃣ Initialize System Data
```bash
# Create modules and permissions
python scripts/initialize_modules.py

# Create admin profile
python scripts/create_admin_profile.py

# Create property currencies
python scripts/create_property_currencies.py
```

#### 8️⃣ Start Development Server
```bash
python manage.py runserver
```

#### 9️⃣ Access the Application
- 🌐 **Main URL**: http://127.0.0.1:8000
- 🔐 **Admin Panel**: http://127.0.0.1:8000/admin
- 👤 **Login**: Use your superuser credentials

---

## 🔐 Authentication & RBAC

### 🎯 Enhanced Role-Based Access Control System

Our RBAC system provides **enterprise-grade security** with **granular control** over user permissions.

#### 🔑 Core Components

##### 1. **Modules** 🧩
System functionality organized into logical modules:
- 👥 **Leads Management**: Lead tracking and conversion
- 🏘️ **Properties Management**: Property inventory control
- 📊 **Projects Management**: Project lifecycle management
- 👤 **Contacts Management**: Customer relationship database
- ⚙️ **Administration**: System configuration and user management

##### 2. **Permissions** 🎫
Fine-grained access control for each module:
- 👁️ **View**: Read-only access (Level 1)
- ➕ **Create**: Add new records (Level 2)
- ✏️ **Edit**: Modify existing records (Level 3)
- 🗑️ **Delete**: Remove records (Level 4)
- 📤 **Export**: Download data (Level 2)
- 🔧 **Manage**: Advanced operations (Level 3-5)

##### 3. **Profiles** 👤
Pre-configured permission sets for different roles:
- 🔴 **Super Administrator**: God-mode access
- 🟠 **Administrator**: Full operational access
- 🟡 **Manager**: Team and data management
- 🟢 **Sales Agent**: Sales-focused access
- 🔵 **Property Manager**: Property-centric access
- ⚪ **Viewer**: Read-only reporter

##### 4. **Field Permissions** 🔍
Control field visibility at granular level:
```python
Example: Sales Agent Profile
✅ Can see: customer_name, phone, email
❌ Cannot see: budget_max, commission_rate, cost_price
```

##### 5. **Data Filters** 🎯
Automatic data filtering based on user profile:
```python
Example: Commercial Specialist
- Sees only: Commercial & Mixed-Use properties
- Hidden: Residential properties

Example: Residential Agent
- Sees only: Residential properties
- Hidden: Commercial properties
```

##### 6. **Dynamic Dropdowns** 📋
Customized dropdown options per profile:
```python
Example: Commercial Agent
Property Type Dropdown:
✅ Office, Shop, Warehouse, Hotel
❌ Apartment, Villa, Chalet (hidden)
```

##### 7. **Data Scopes** 🎚️
Define what data users can access:
- 📌 **Own**: Only records created by the user
- 📎 **Assigned**: Records assigned to the user
- 👥 **Team**: All team members' records
- 🏢 **Department**: Department-wide access
- 🌍 **All**: Complete database access

#### 🛡️ Security Features

- ✅ **SQL Injection Prevention**: Parameterized queries
- ✅ **XSS Protection**: Django's built-in escaping
- ✅ **CSRF Protection**: Token-based security
- ✅ **Password Hashing**: Bcrypt algorithm
- ✅ **Session Security**: Secure cookie handling
- ✅ **Audit Logging**: Complete activity tracking
- ✅ **Permission Caching**: Optimized performance
- ✅ **Secure by Default**: Restrictive permissions

#### 📝 Audit Trail System

Every action is logged with:
- 👤 **Who**: User who performed the action
- 📅 **When**: Timestamp of the action
- 📝 **What**: Type of action (create, edit, delete, view)
- 📊 **Where**: Module and record affected
- 💻 **How**: IP address and user agent
- 🔄 **Changes**: Before and after values (for edits)

---

## 📊 Core Modules

### 1️⃣ Leads Management Module 🎯

**Purpose**: Track potential customers from first contact to conversion

#### Features:
- 📥 **Multi-channel Capture**: Website forms, phone, email, social media
- 🏷️ **Lead Classification**: 
  - Types: Buyer, Seller, Investor, Tenant, Landlord
  - Temperature: Hot (🔥), Warm (🌡️), Cold (❄️)
  - Priority: Critical, High, Normal, Low
- 📊 **Status Pipeline**: 10 customizable stages
- 📝 **Activity Tracking**: 
  - 📞 Calls
  - 📧 Emails
  - 🏢 Meetings
  - 🏘️ Site Visits
  - 📄 Proposals
- 📎 **Document Management**: ID copies, contracts, agreements
- 🔔 **Smart Reminders**: Automated follow-up notifications
- 📤 **Bulk Import/Export**: Excel integration
- 🔄 **Lead Conversion**: Convert to Contact when qualified
- 📊 **Analytics Dashboard**: Conversion rates, pipeline health

#### Lead Model Fields:
```python
- Personal Info: name, phone, email, address
- Classification: source, type, status, temperature, priority
- Budget: budget_min, budget_max, currency
- Preferences: preferred_location, preferred_property_type
- Assignment: assigned_to, created_by
- Tracking: created_at, updated_at, last_contacted
- Conversion: is_converted, converted_at, converted_by
```

### 2️⃣ Properties Management Module 🏘️

**Purpose**: Manage property inventory and listings

#### Features:
- 🏢 **Property Types**: 
  - Residential: Apartment, Villa, Duplex, Penthouse, Chalet
  - Commercial: Office, Shop, Warehouse, Hotel
  - Land: Residential, Commercial
  - Mixed-Use
- 📍 **Location Management**:
  - Regions (Governorates)
  - Compounds/Communities
  - Neighborhoods
  - GPS Coordinates
- 💰 **Pricing System**:
  - Multiple currencies (EGP, USD, AED, SAR, EUR)
  - Price per meter
  - Total price
  - Payment plans
- 📐 **Property Specs**:
  - Area (total, built, garden)
  - Rooms (bedrooms, bathrooms, reception)
  - Floors (floor number, total floors)
  - Parking spaces
  - View type
- 🎨 **Finishing Types**:
  - Core & Shell
  - Semi-finished
  - Finished
  - Luxury/Premium
- 🖼️ **Media Gallery**:
  - Multiple images
  - Primary image selection
  - Video tours
  - 360° virtual tours
- 🏷️ **Reference System**: Internal tracking codes
- 📊 **Status Management**: Available, Reserved, Sold, Rented
- 🔖 **Features & Amenities**: Pool, gym, security, etc.

#### Property Model Fields:
```python
- Basic Info: title, reference_number, property_type
- Location: region, compound, address, coordinates
- Specifications: area, rooms, bathrooms, floors, parking
- Pricing: price, currency, price_per_meter
- Status: status, purpose (sale/rent)
- Details: finishing_type, delivery_date, features
- Media: images, videos, primary_image
- Ownership: owner_name, owner_contact
- Tracking: created_by, updated_at, views_count
```

### 3️⃣ Projects Management Module 📈

**Purpose**: Track real estate development projects from planning to completion

#### Features:
- 🏗️ **Project Types**:
  - Residential Development
  - Commercial Complex
  - Mixed-Use Development
  - Infrastructure
  - Renovation
- 📊 **Status Tracking**:
  - Planning
  - Design
  - Permits & Approvals
  - Construction
  - Finishing
  - Delivery
  - Completed
- 💵 **Financial Management**:
  - Budget planning
  - Multi-currency support
  - Cost tracking
  - Revenue projections
- 📅 **Timeline Management**:
  - Start date, End date
  - Milestones
  - Phase tracking
  - Progress percentage
- 👥 **Team Management**:
  - Project Manager assignment
  - Team members
  - Contractor management
  - Stakeholders
- 📎 **Documentation**:
  - Contracts
  - Permits
  - Engineering plans
  - Progress reports
- 🏘️ **Property Linking**: Associate properties with projects
- 📊 **Progress Reports**: Visual tracking dashboards

#### Project Model Fields:
```python
- Basic Info: name, project_number, project_type, category
- Status: status, priority, progress_percentage
- Timeline: start_date, end_date, delivery_date
- Financial: budget, currency, actual_cost
- Location: region, address, coordinates
- Team: project_manager, team_members
- Details: description, total_units, sold_units
- Developer: developer_name, developer_contact
- Tracking: created_by, updated_at
```

### 4️⃣ Contacts Management Module 👥

**Purpose**: Manage customer relationships and track deal history

#### Features:
- 📇 **Centralized Database**: All customer information
- 🔄 **Lead Conversion**: Automatic data migration from leads
- 💎 **VIP Classification**: High-value customer tracking
- 💰 **Lifetime Value**: Total business value calculation
- 📊 **Deal History**: 
  - Purchase history
  - Rental history
  - Total transactions
  - Revenue generated
- 📝 **Comprehensive Notes**: 
  - Interaction history
  - Preferences
  - Special requirements
- 📞 **Communication Tracking**:
  - Email history
  - Call logs
  - WhatsApp messages
  - Meeting notes
- 🎂 **Important Dates**:
  - Birthday
  - Anniversary
  - Contract renewals
  - Payment schedules
- 🏘️ **Property Relationships**: Owned, rented, interested properties
- 📈 **Customer Segmentation**: By value, activity, preferences

#### Contact Model Fields:
```python
- Personal Info: name, phone, email, date_of_birth
- Classification: contact_type, contact_status, is_vip
- Financial: lifetime_value, total_deals, average_deal_size
- Preferences: preferred_areas, preferred_types, budget_range
- Relationships: properties_owned, properties_rented
- Conversion: converted_from_lead, conversion_date
- Tracking: last_contact_date, next_follow_up
```

### 5️⃣ Administration Module ⚙️

**Purpose**: System configuration and user management

#### Features:
- 👥 **User Management**:
  - Create/Edit/Delete users
  - Assign profiles
  - Manage permissions
  - Reset passwords
- 🎯 **Profile Management**:
  - Create custom profiles
  - Configure permissions
  - Set data filters
  - Manage field visibility
- 📊 **Audit Logs**:
  - User activity tracking
  - Change history
  - Security monitoring
  - Compliance reports
- 🎨 **Company Settings**:
  - Branding (logo, colors)
  - Company information
  - Business rules
  - Email templates
- 🌐 **System Configuration**:
  - Language settings
  - Currency settings
  - Timezone configuration
  - Feature toggles
- 📈 **Analytics**:
  - User activity reports
  - Module usage statistics
  - Performance metrics
  - Custom reports

---

## 🌍 Localization

### Bilingual Support (Arabic & English)

#### 🇸🇦 Arabic (Right-to-Left)
- ✅ Complete RTL layout support
- ✅ Arabic translations for all UI elements
- ✅ Arabic date and number formatting
- ✅ RTL-optimized forms and tables
- ✅ Arabic typography and fonts

#### 🇬🇧 English (Left-to-Right)
- ✅ Default language
- ✅ Professional business terminology
- ✅ Standard date and number formatting
- ✅ LTR-optimized layouts

#### 🔄 Language Switching
- 🎯 User preference saved in profile
- 🔄 Instant language switching without reload
- 📱 Persistent across sessions
- 🌐 URL-based language detection

### 💰 Multi-Currency Support

Supported currencies for the MENA region:
- 🇪🇬 **EGP** - Egyptian Pound (Primary)
- 🇺🇸 **USD** - US Dollar
- 🇦🇪 **AED** - UAE Dirham
- 🇸🇦 **SAR** - Saudi Riyal
- 🇪🇺 **EUR** - Euro
- 🇬🇧 **GBP** - British Pound

#### Currency Features:
- ✅ Automatic currency conversion
- ✅ Real-time exchange rates
- ✅ Currency-specific formatting
- ✅ Default currency per user
- ✅ Multi-currency reports

### 📍 Regional Customization

#### Egypt-Specific Features:
- 🏛️ **Governorates**: Cairo, Giza, Alexandria, etc.
- 🏘️ **New Cities**: New Cairo, 6th October, New Administrative Capital
- 📜 **Legal Compliance**: Egyptian real estate laws
- 💳 **Payment Methods**: Egyptian banking systems
- 📞 **Phone Formats**: +20 Egyptian numbers
- 🏢 **Property Types**: Egyptian market classifications

#### Middle East Features:
- 🕌 **Islamic Calendar**: Hijri date support
- 🌙 **Work Week**: Sunday-Thursday configuration
- 💰 **Islamic Finance**: Sharia-compliant options
- 🏛️ **Regional Areas**: GCC countries support
- 📝 **Arabic Contracts**: Template support

---

## 🛠️ Technology Stack

### Backend Technologies
- 🐍 **Python 3.13.7**: Core programming language
- 🎯 **Django 5.2.6**: Web framework
- 🗄️ **MariaDB/MySQL**: Relational database
- 🔥 **Django ORM**: Database abstraction
- 🔐 **Django Auth**: Authentication system
- 📡 **Django REST Framework**: API endpoints

### Frontend Technologies
- 🎨 **Bootstrap 5.3**: UI framework
- ✨ **jQuery 3.6**: JavaScript library
- 📊 **Chart.js**: Data visualization
- 🎯 **Bootstrap Icons**: Icon library
- 📱 **Responsive Design**: Mobile-first approach
- 🌈 **Custom CSS**: Branded styling

### Development Tools
- 🤖 **MCP Server**: AI integration (FastMCP 2.12.4)
- 🔧 **VS Code**: Recommended IDE
- 🐛 **Django Debug Toolbar**: Development debugging
- 📝 **Django Extensions**: Enhanced management commands
- 🧪 **pytest**: Testing framework
- 📊 **Coverage.py**: Code coverage

### Deployment Tools
- 🚀 **Gunicorn**: WSGI HTTP Server
- 🌐 **Nginx**: Reverse proxy (production)
- 🐳 **Docker**: Containerization (optional)
- 📦 **pip**: Package management
- 🔄 **Git**: Version control

### Python Packages
```
Django==5.2.6                 # Web framework
mysqlclient==2.2.6           # MySQL driver
django-crispy-forms==2.3     # Form rendering
Pillow==11.1.0               # Image processing
openpyxl==3.1.5              # Excel import/export
python-dateutil==2.9.0       # Date utilities
django-filter==25.1          # Advanced filtering
django-widget-tweaks==1.5.0  # Form widgets
fastmcp==2.12.4              # MCP server
```

---

## 📂 Project Structure

```
real_crm/
│
├── 🔐 authentication/                # User authentication & RBAC
│   ├── models.py                    # User, Profile, Permission models
│   ├── enhanced_rbac_models.py      # Field permissions, data filters
│   ├── views.py                     # Login, logout, profile views
│   ├── decorators.py                # Permission decorators
│   ├── mixins.py                    # RBAC mixins for views
│   ├── context_processors.py        # Template context
│   ├── company_settings_model.py    # Company configuration
│   └── templates/                   # Authentication templates
│       ├── login.html
│       ├── profile.html
│       └── partials/
│           ├── sidebar.html         # Navigation menu
│           └── navbar.html          # Top bar
│
├── 🎯 leads/                        # Lead management module
│   ├── models.py                    # Lead, LeadStatus, LeadActivity
│   ├── views.py                     # Lead CRUD operations
│   ├── urls.py                      # URL routing
│   ├── signals.py                   # Automated triggers
│   ├── audit_views.py               # Audit trail
│   ├── import_views.py              # Excel import
│   ├── document_views.py            # File management
│   └── templates/leads/             # Lead templates
│       ├── leads_list.html          # Lead listing
│       ├── lead_detail.html         # Lead details
│       ├── create_lead.html         # Create form
│       └── edit_lead.html           # Edit form
│
├── 🏘️ properties/                   # Property management module
│   ├── models.py                    # Property, PropertyType, Region
│   ├── views.py                     # Property CRUD operations
│   ├── forms.py                     # Property forms
│   ├── urls.py                      # URL routing
│   └── templates/properties/        # Property templates
│       ├── properties_list.html     # Property listing
│       ├── property_detail.html     # Property details
│       ├── create_property.html     # Create form
│       └── edit_property.html       # Edit form
│
├── 📊 projects/                     # Project management module
│   ├── models.py                    # Project, ProjectStatus
│   ├── views.py                     # Project CRUD operations
│   ├── urls.py                      # URL routing
│   └── templates/projects/          # Project templates
│       ├── projects_list.html       # Project listing
│       ├── project_detail.html      # Project details
│       ├── create_project.html      # Create form
│       └── edit_project.html        # Edit form
│
├── 👥 contacts/                     # Contact management module
│   ├── models.py                    # Contact, ContactActivity
│   ├── views.py                     # Contact CRUD operations
│   ├── urls.py                      # URL routing
│   └── templates/contacts/          # Contact templates
│       ├── contacts_list.html       # Contact listing
│       └── contact_detail.html      # Contact details
│
├── ⚙️ real_estate_crm/              # Project settings
│   ├── settings.py                  # Production settings
│   ├── settings_local.py            # Development settings
│   ├── urls.py                      # Main URL configuration
│   ├── middleware.py                # Custom middleware
│   └── wsgi.py                      # WSGI configuration
│
├── 🎨 static/                       # Static files (CSS, JS, images)
│   ├── css/
│   │   ├── style.css                # Main styles
│   │   └── rtl.css                  # RTL styles
│   ├── js/
│   │   ├── main.js                  # Main JavaScript
│   │   └── dashboard.js             # Dashboard charts
│   └── img/
│       ├── logo.png                 # Company logo
│       └── favicon.ico              # Site icon
│
├── 📄 templates/                    # Global templates
│   ├── base.html                    # Base template
│   ├── dashboard.html               # Main dashboard
│   └── errors/
│       ├── 404.html                 # Not found
│       └── 500.html                 # Server error
│
├── 📜 scripts/                      # Utility scripts
│   ├── initialize_modules.py       # Setup modules
│   ├── create_admin_profile.py     # Create admin
│   ├── create_property_currencies.py # Setup currencies
│   ├── mcp_server.py                # MCP server
│   ├── setup_mariadb_database.sh    # Database setup
│   └── start_mcp_server.sh          # Start MCP
│
├── 📚 technical_documentations/     # Documentation
│   ├── START_HERE.md                # Getting started
│   ├── ENHANCED_RBAC_SUMMARY.md     # RBAC guide
│   ├── MODULES_SETUP_COMPLETE.md    # Module setup
│   ├── MCP_SERVER_README.md         # MCP guide
│   └── [100+ technical docs]        # Detailed guides
│
├── 💾 backups/                      # Database backups
│   ├── db.sqlite3.CRITICAL_BACKUP   # SQLite backup
│   └── production_databases.txt     # DB info
│
├── 📦 locale/                       # Translations
│   └── ar/                          # Arabic translations
│       └── LC_MESSAGES/
│           ├── django.po            # Translation file
│           └── django.mo            # Compiled
│
├── 🔧 .vscode/                      # VS Code settings
│   └── tasks.json                   # Build tasks
│
├── 📄 manage.py                     # Django CLI
├── 📋 requirements-local.txt        # Dev dependencies
├── 📋 requirements-mcp.txt          # MCP dependencies
└── 📖 README.md                     # This file
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file in the project root:

```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DB_ENGINE=django.db.backends.mysql
DB_NAME=real_crm_db
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

# Email Configuration (Optional)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Static & Media Files
STATIC_URL=/static/
MEDIA_URL=/media/
STATIC_ROOT=/var/www/real_crm/staticfiles/
MEDIA_ROOT=/var/www/real_crm/media/

# Language & Timezone
LANGUAGE_CODE=en-us
TIME_ZONE=Africa/Cairo
USE_I18N=True
USE_TZ=True

# Security Settings (Production)
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_BROWSER_XSS_FILTER=True
```

### Database Setup

#### MariaDB/MySQL Setup
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE real_crm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create user
CREATE USER 'crm_user'@'localhost' IDENTIFIED BY 'secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON real_crm_db.* TO 'crm_user'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

### Static Files Configuration

```bash
# Collect static files
python manage.py collectstatic --noinput

# Set proper permissions (Linux/Mac)
chmod -R 755 staticfiles/
chmod -R 755 media/
```

### Company Branding

Access Admin Panel → Company Settings:
- 🎨 Upload company logo
- 🌈 Set brand colors (primary, secondary)
- 🏢 Configure company information
- 📧 Set up email templates
- 🔧 Configure business rules

---

## 📖 Documentation

### 📚 Available Documentation

All documentation is located in [`technical_documentations/`](technical_documentations/) folder:

#### 🚀 Getting Started
- **[START_HERE.md](technical_documentations/START_HERE.md)** - Quick start guide
- **[QUICK_START.md](technical_documentations/QUICK_START.md)** - Installation steps
- **[SETUP_COMPLETE.md](technical_documentations/SETUP_COMPLETE.md)** - Setup verification

#### 🏗️ Architecture & Design
- **[ENHANCED_RBAC_SUMMARY.md](technical_documentations/ENHANCED_RBAC_SUMMARY.md)** - RBAC system
- **[MODULES_SETUP_COMPLETE.md](technical_documentations/MODULES_SETUP_COMPLETE.md)** - Module structure
- **[PROJECT_ORGANIZATION_SUMMARY.md](technical_documentations/PROJECT_ORGANIZATION_SUMMARY.md)** - Code organization

#### 🔧 Implementation Guides
- **[CONTACTS_MODULE_IMPLEMENTATION_GUIDE.md](technical_documentations/CONTACTS_MODULE_IMPLEMENTATION_GUIDE.md)** - Contact module
- **[DOCUMENT_MANAGEMENT_IMPLEMENTATION.md](technical_documentations/DOCUMENT_MANAGEMENT_IMPLEMENTATION.md)** - File uploads
- **[IMPORT_MAPPING_SYSTEM_COMPLETE.md](technical_documentations/IMPORT_MAPPING_SYSTEM_COMPLETE.md)** - Excel import

#### 🎨 UI/UX Documentation
- **[VISUAL_GUIDE.md](technical_documentations/VISUAL_GUIDE.md)** - Design system
- **[RTL_VISUAL_GUIDE.md](technical_documentations/RTL_VISUAL_GUIDE.md)** - Arabic RTL
- **[BRANDING_USER_GUIDE.md](technical_documentations/BRANDING_USER_GUIDE.md)** - Customization

#### 🤖 AI Integration
- **[MCP_SERVER_README.md](technical_documentations/MCP_SERVER_README.md)** - MCP setup
- **[COPILOT_MCP_GUIDE.md](technical_documentations/COPILOT_MCP_GUIDE.md)** - GitHub Copilot
- **[MCP_TROUBLESHOOTING.md](technical_documentations/MCP_TROUBLESHOOTING.md)** - Debugging

#### 🗄️ Database
- **[DATABASE_SETUP_COMPLETE.md](technical_documentations/DATABASE_SETUP_COMPLETE.md)** - DB configuration
- **[CHECK_DATABASE_SETTINGS.md](technical_documentations/CHECK_DATABASE_SETTINGS.md)** - Verification
- **[FIELD_MAPPING_COMPREHENSIVE.md](technical_documentations/FIELD_MAPPING_COMPREHENSIVE.md)** - Schema

### 📝 Code Examples

#### Creating a Lead
```python
from leads.models import Lead, LeadSource, LeadStatus

# Create a new lead
lead = Lead.objects.create(
    name="Ahmed Mohamed",
    phone="+201234567890",
    email="ahmed@example.com",
    source=LeadSource.objects.get(name="Website"),
    status=LeadStatus.objects.get(name="New"),
    temperature=LeadTemperature.objects.get(name="Hot"),
    budget_min=1000000,
    budget_max=2000000,
    currency="EGP",
    assigned_to=request.user,
    created_by=request.user
)
```

#### Filtering Properties
```python
from properties.models import Property

# Get available apartments in New Cairo
properties = Property.objects.filter(
    property_type__name="Apartment",
    status__name="Available",
    region__name="New Cairo",
    price__gte=1000000,
    price__lte=2000000
).order_by('-created_at')
```

#### Checking Permissions
```python
from authentication.decorators import module_permission_required

@module_permission_required('leads', 'edit')
def edit_lead(request, lead_id):
    # User must have 'edit' permission for 'leads' module
    lead = get_object_or_404(Lead, id=lead_id)
    # ... edit logic
```

---

## 🤖 AI Integration

### Model Context Protocol (MCP) Server

This project includes an **AI-powered MCP server** that enables advanced development features with Claude Desktop and GitHub Copilot.

#### 🎯 What is MCP?

MCP (Model Context Protocol) allows AI assistants to interact directly with your Django project, enabling:
- 📖 **Code Understanding**: AI can read and analyze your codebase
- ✏️ **Code Generation**: Create models, views, templates automatically
- 🗄️ **Database Queries**: Execute SQL queries and analyze data
- 🔧 **Management Commands**: Run Django commands via AI
- 📊 **Data Analysis**: Generate reports and insights

#### 🚀 Starting MCP Server

```bash
# Start MCP server
./scripts/start_mcp_server.sh

# Or manually
source venv/bin/activate
python scripts/mcp_server.py
```

#### 🛠️ Available MCP Tools

1. **`read_file(path)`**
   - Read any project file
   - Example: "Show me the Lead model"

2. **`write_file(path, content)`**
   - Create or update files
   - Example: "Create a new view for property export"

3. **`run_manage(command)`**
   - Execute Django management commands
   - Example: "Run migrations"

4. **`db_query(sql, allow_modify=False)`**
   - Query the database
   - Example: "Show me all hot leads"

5. **`list_project_files(directory)`**
   - Browse project structure
   - Example: "List all templates"

6. **`get_project_info()`**
   - Get project metadata
   - Example: "Show project configuration"

#### 🔗 Claude Desktop Integration

1. Install Claude Desktop
2. Configure MCP in `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "django-real-crm": {
      "command": "/Users/ahmedgomaa/Downloads/real_crm/venv/bin/python",
      "args": [
        "/Users/ahmedgomaa/Downloads/real_crm/scripts/mcp_server.py"
      ]
    }
  }
}
```
3. Restart Claude Desktop
4. Look for 🔌 icon to confirm connection

#### 💬 Example AI Commands

Ask Claude:
- "Show me all leads created this month"
- "Create a new property type called 'Townhouse'"
- "Generate a report of top-performing sales agents"
- "Add a new field to the Property model"
- "Create a view to export leads to Excel"

### 🤖 GitHub Copilot Integration

This project is optimized for GitHub Copilot:
- ✅ Comprehensive docstrings
- ✅ Type hints throughout
- ✅ Well-commented code
- ✅ Consistent naming conventions
- ✅ Example patterns in code

---

## 🎯 Use Cases & Scenarios

### 🏢 Real Estate Agency
**Scenario**: Managing property sales and rentals
- ✅ Track incoming leads from multiple channels
- ✅ Manage property inventory with photos and specs
- ✅ Assign leads to sales agents based on expertise
- ✅ Monitor sales pipeline and conversion rates
- ✅ Generate monthly performance reports

### 🏗️ Property Developer
**Scenario**: Managing construction projects and sales
- ✅ Track project progress from planning to delivery
- ✅ Manage units within each project
- ✅ Pre-sales lead management
- ✅ Budget and timeline tracking
- ✅ Contractor and stakeholder management

### 💼 Investment Company
**Scenario**: Managing property portfolio
- ✅ Track multiple properties across regions
- ✅ Monitor investment returns
- ✅ Manage tenant relationships
- ✅ Track maintenance and expenses
- ✅ Generate investment reports

### 👥 Real Estate Brokerage
**Scenario**: Connecting buyers and sellers
- ✅ Manage buyer leads and requirements
- ✅ Match properties to buyer preferences
- ✅ Schedule and track property viewings
- ✅ Commission tracking
- ✅ Deal closure management

---

## 🚀 Roadmap

### Phase 1: Current Release ✅
- ✅ Lead Management
- ✅ Property Management
- ✅ Project Management
- ✅ Advanced RBAC
- ✅ Bilingual Support
- ✅ MCP Integration

### Phase 2: Upcoming Features 🔄
- 📧 Email Marketing Integration
- 📱 WhatsApp Business API
- 📊 Advanced Analytics Dashboard
- 📱 Mobile App (iOS/Android)
- 🤖 AI-Powered Lead Scoring
- 📞 VoIP Integration

### Phase 3: Future Enhancements 🔮
- 🏦 Payment Gateway Integration
- 📝 E-Signature Integration
- 🗺️ Map-based Property Search
- 📲 SMS Notifications
- 🔗 CRM Integration (Salesforce, HubSpot)
- 📊 Business Intelligence Dashboard

---

## 🤝 Support & Contributing

### 💬 Getting Help

- 📧 **Email**: support@realcrm.com
- 📚 **Documentation**: [`technical_documentations/`](technical_documentations/)
- 🐛 **Bug Reports**: Create an issue in the repository
- 💡 **Feature Requests**: Submit enhancement proposals

### 🛠️ Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📝 Coding Standards

- Follow **PEP 8** for Python code
- Use **Django best practices**
- Write **comprehensive docstrings**
- Add **type hints** where applicable
- Include **unit tests** for new features
- Update **documentation** for changes

---

## 📜 License

**Proprietary License** - All rights reserved

This software is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

For licensing inquiries, contact: **license@realcrm.com**

---

## 🙏 Acknowledgments

### Technologies Used
- 🐍 **Django** - Web framework
- 🎨 **Bootstrap** - UI framework
- 🗄️ **MariaDB** - Database system
- 🤖 **FastMCP** - AI integration
- 📊 **Chart.js** - Data visualization

### Inspiration
Built for the vibrant and growing real estate market in Egypt and the Middle East, this CRM aims to empower real estate professionals with modern tools to succeed in a competitive landscape.

---

## 📊 Project Statistics

- 📁 **Total Files**: 500+
- 💻 **Lines of Code**: 50,000+
- 🗄️ **Database Tables**: 58+
- 🌐 **Supported Languages**: 2 (Arabic, English)
- 💰 **Supported Currencies**: 6
- 🎯 **Modules**: 5 core modules
- 🔐 **Permission Levels**: 5 levels
- 📝 **Documentation Pages**: 100+

---

<div align="center">

## ⭐ Star This Repository

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ for the Middle East Real Estate Market**

**Version**: 1.0.0 | **Last Updated**: October 18, 2025

---

### 🔗 Quick Links

[📚 Documentation](technical_documentations/) • [🚀 Quick Start](#-quick-start) • [🤖 MCP Guide](technical_documentations/MCP_SERVER_README.md) • [🔐 RBAC Guide](technical_documentations/ENHANCED_RBAC_SUMMARY.md)

---

© 2025 Real Estate CRM. All Rights Reserved.

</div>
