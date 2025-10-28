# WhatsApp Real Estate Analysis System

A comprehensive web-based system for analyzing WhatsApp group messages to extract and organize real estate information including property listings, contact details, and location data.

## 📋 Project Overview

This system processes WhatsApp chat exports to extract valuable real estate information including:
- 📱 Mobile phone numbers
- 🏘️ Area and sector numbers
- 🏠 Property transaction types (للبيع/مطلوب)
- 👥 Contact information and message analysis

## 🏗️ System Architecture

### Core Components

1. **Web Applications**
   - `web_app_production.py` - Production Flask app (MariaDB backend)
   - `web_app_original.py` - Development Flask app (SQLite backend)

2. **Data Processing Modules**
   - `main.py` - WhatsApp message extractor and parser
   - `extract_mobile_numbers.py` - Mobile number extraction from Arabic/English text
   - `extract_areas_sectors.py` - Area/sector number extraction
   - `property_type_analyzer.py` - Property transaction classification

3. **Web Interface**
   - HTML templates in `/templates/` folder
   - Modern responsive dashboard
   - Advanced search and filtering
   - User authentication and admin panel

## 🚀 Quick Start

### Prerequisites

```bash
# Required Python packages
pip install flask flask-login pymysql bcrypt
```

### Database Setup

**For Production (MariaDB):**
```sql
CREATE DATABASE whatsapp_analysis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'whatsapp_user'@'localhost' IDENTIFIED BY 'WhatsApp2025#Secure!';
GRANT ALL PRIVILEGES ON whatsapp_analysis.* TO 'whatsapp_user'@'localhost';
FLUSH PRIVILEGES;
```

**For Development (SQLite):**
Database file `messages.db` will be created automatically.

### Running the Application

**Production Mode:**
```bash
python web_app_production.py
# Access: http://localhost:5000
```

**Development Mode:**
```bash
python web_app_original.py
# Access: http://localhost:9000
```

## 📊 Features

### Dashboard
- 📈 Real-time statistics and metrics
- 📱 Mobile number extraction analytics
- 🗺️ Area/sector distribution analysis
- 📋 Recent messages overview

### Search & Filtering
- 🔍 Full-text search across messages
- 👤 Filter by sender name
- 📍 Filter by area/sector numbers
- 📱 Mobile number presence filtering
- 🏠 Property transaction type filtering

### Admin Features
- 👥 User management and approval system
- 📁 WhatsApp chat file upload (.zip/.rar)
- 🗑️ Message deletion and bulk operations
- 📊 Advanced analytics and reporting

### Data Processing
- 🔄 Automatic extraction of mobile numbers
- 🏘️ Area and sector number identification
- 🏠 Property type classification (للبيع/مطلوب)
- 📱 Arabic numerals support (٠١٢٣٤٥٦٧٨٩)

## 💾 Database Architecture

The system uses a **2-table design** optimized for real estate message analysis:

### 🗄️ Core Tables

```
┌─────────────────┐         ┌─────────────────┐
│     users       │ manages │    messages     │
│  (Authentication)│ ═══════▶│ (Real Estate)   │
└─────────────────┘         └─────────────────┘
```

### 📊 Messages Table - Real Estate Data
```sql
messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_name VARCHAR(255),           -- WhatsApp sender name
    phone_number VARCHAR(50),           -- Original phone from WhatsApp  
    message_date VARCHAR(100),          -- Raw date string
    message_content TEXT,               -- Full message content
    file_source VARCHAR(255),           -- Source file name
    area_number INT,                    -- Extracted area (الحي)
    sector_number INT,                  -- Extracted sector (مجاورة) 
    extracted_mobile_number VARCHAR(50), -- AI-extracted contact
    transaction_type VARCHAR(50),       -- للبيع/مطلوب/غير محدد
    datetime_parsed DATETIME,           -- Standardized datetime
    created_at TIMESTAMP DEFAULT NOW   -- Record creation
    
    -- Indexes for performance
    INDEX idx_sender (sender_name),
    INDEX idx_area (area_number),
    INDEX idx_sector (sector_number),
    INDEX idx_mobile (extracted_mobile_number),
    INDEX idx_transaction (transaction_type)
)
```

### 👥 Users Table - Authentication & Access Control  
```sql
users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mobile_number VARCHAR(20) UNIQUE,   -- Login identifier
    password_hash VARCHAR(255),         -- Bcrypt secured password
    full_name VARCHAR(100),             -- Display name
    email VARCHAR(100),                 -- Optional email
    is_admin BOOLEAN DEFAULT FALSE,     -- Admin privileges
    is_active BOOLEAN DEFAULT TRUE,     -- Account status
    created_at TIMESTAMP DEFAULT NOW,   -- Registration date
    last_login TIMESTAMP NULL,          -- Activity tracking
    login_attempts INT DEFAULT 0,       -- Security counter
    locked_until TIMESTAMP NULL        -- Account lock
    
    -- Security indexes
    INDEX idx_mobile (mobile_number),
    INDEX idx_email (email)
)
```

### 🔗 Relationships & Data Flow

- **No Foreign Keys**: Tables are logically related through application layer
- **User → Message Management**: Users view/edit messages through web interface  
- **Admin Controls**: Full CRUD operations on both tables
- **Data Processing**: WhatsApp files → parsing → extraction → database storage

**📈 For detailed database documentation, see:**
- [`/documentation/DATABASE_STRUCTURE.md`](documentation/DATABASE_STRUCTURE.md) - Complete schema details
- [`/documentation/DATABASE_ERD.md`](documentation/DATABASE_ERD.md) - Visual diagrams & relationships

## 🔧 Configuration

### Production Settings (web_app_production.py)
```python
DB_CONFIG = {
    "host": "localhost",
    "user": "whatsapp_user", 
    "password": "WhatsApp2025#Secure!",
    "database": "whatsapp_analysis",
    "charset": "utf8mb4"
}
```

### Development Settings (web_app_original.py)
```python
# Uses SQLite database: messages.db
```

## 📁 File Structure

```
whatsapp-analysis/
├── web_app_production.py      # Production Flask app (MariaDB)
├── web_app_original.py        # Development Flask app (SQLite)
├── main.py                    # WhatsApp message extractor
├── extract_mobile_numbers.py  # Mobile number extraction
├── extract_areas_sectors.py   # Area/sector extraction  
├── property_type_analyzer.py  # Property type classification
├── requirements.txt           # Python dependencies
├── templates/                 # HTML templates
│   ├── index.html            # Dashboard
│   ├── search.html           # Search interface
│   ├── login.html            # User login
│   ├── register.html         # User registration
│   ├── admin_panel.html      # Admin interface
│   └── stats.html            # Statistics page
├── uploads/                   # File upload storage
├── logs/                      # Application logs
└── deploy/                    # Deployment scripts
```

## 🛠️ Data Processing Workflow

1. **Upload WhatsApp Export**
   - Admin uploads .zip/.rar file containing chat export
   - System extracts .txt files (ignores media)

2. **Message Parsing** 
   - Regex patterns extract date, sender, and content
   - Unicode characters cleaned and normalized

3. **Data Extraction**
   - Mobile numbers extracted with Arabic numeral support
   - Area/sector numbers identified from patterns
   - Transaction types classified using keyword analysis

4. **Database Storage**
   - All extracted data stored in structured format
   - Duplicate detection and removal
   - Indexed for fast searching

## 🔐 Security Features

- 🔒 Password hashing with bcrypt
- 👤 User authentication and session management  
- 🛡️ Admin-only access controls
- 🚫 SQL injection protection
- 📁 Secure file upload handling

## 🌍 Multilingual Support

- 🇸🇦 Arabic text processing and analysis
- 🇺🇸 English keyword recognition
- 🔢 Arabic numeral conversion (٠١٢٣٤٥٦٧٨٩ → 0123456789)
- 📱 Egyptian mobile number formats

## 📈 Analytics & Reporting

- 📊 Message volume trends
- 📱 Mobile number extraction rates  
- 🏘️ Area/sector distribution
- 🏠 Property type breakdown
- 👥 Active users and senders

## 🚀 Deployment

See `/deploy/` folder for deployment scripts:
- `deploy_production.sh` - Production deployment
- `configure_webserver.sh` - Web server setup
- Database migration scripts

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)  
5. Create Pull Request

## 📞 Support

For technical support or questions:
- 📧 Email: admin@contaboo-realestate.com
- 📱 WhatsApp: 01002778090

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ for Contaboo Real Estate Analysis**