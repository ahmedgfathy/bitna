# Database Structure - WhatsApp Real Estate Analysis System

## 📊 Database Overview

The WhatsApp Real Estate Analysis System uses **MariaDB/MySQL** for production and **SQLite** for development. The database consists of **2 main tables** with no direct foreign key relationships, but logical connections through data flow.

---

## 🗄️ Database Schema

### Table Relationship Diagram

```
┌─────────────────────────────────────────────────┐
│                    DATABASE                     │
│              whatsapp_analysis                  │
└─────────────────────────────────────────────────┘
                           │
           ┌───────────────┴───────────────┐
           │                               │
           ▼                               ▼
┌─────────────────────┐           ┌─────────────────────┐
│      users          │           │      messages       │
│                     │           │                     │
│ • User Management   │           │ • Real Estate Data  │
│ • Authentication    │           │ • WhatsApp Messages │
│ • Admin Control     │           │ • Analysis Results  │
└─────────────────────┘           └─────────────────────┘
           │                               │
           │     Logical Relationship      │
           │    (no foreign key but        │
           │     users manage messages)    │
           └───────────────┬───────────────┘
                           ▼
            Users create, view, edit, and 
            delete messages through the
            web application interface
```

---

## 📋 Table Structures

### 1. `messages` Table - **Core Real Estate Data**

**Purpose**: Stores all WhatsApp messages with extracted real estate information

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique message identifier |
| `sender_name` | `VARCHAR(255)` | `NULL` | Name of the message sender |
| `phone_number` | `VARCHAR(50)` | `NULL` | Original phone number from WhatsApp |
| `message_date` | `VARCHAR(100)` | `NULL` | Original date string from WhatsApp export |
| `message_content` | `TEXT` | `NULL` | Full message text content |
| `file_source` | `VARCHAR(255)` | `NULL` | Source file name from upload |
| `area_number` | `INT/VARCHAR(50)` | `NULL` | Extracted area number (الحي) |
| `sector_number` | `INT/VARCHAR(50)` | `NULL` | Extracted sector number (مجاورة) |
| `extracted_mobile_number` | `VARCHAR(50)` | `NULL` | AI-extracted mobile number |
| `transaction_type` | `VARCHAR(50)` | `NULL` | Property type: للبيع/مطلوب/غير محدد |
| `datetime_parsed` | `DATETIME` | `NULL` | Parsed datetime for sorting |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Record creation time |

**Indexes**:
- `idx_sender` on `sender_name`
- `idx_phone` on `phone_number`  
- `idx_area` on `area_number`
- `idx_sector` on `sector_number`
- `idx_mobile` on `extracted_mobile_number`
- `idx_transaction` on `transaction_type`
- `idx_datetime` on `datetime_parsed`

### 2. `users` Table - **User Management & Authentication**

**Purpose**: Manages user accounts, authentication, and access control

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` | Unique user identifier |
| `mobile_number`/`phone` | `VARCHAR(20/50)` | `UNIQUE`, `NOT NULL` | User's phone number (login ID) |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Bcrypt hashed password |
| `full_name` | `VARCHAR(100)` | `NOT NULL` | User's full name |
| `email` | `VARCHAR(100)` | `NULL` | Optional email address |
| `is_admin` | `BOOLEAN` | `DEFAULT FALSE` | Admin privileges flag |
| `is_active` | `BOOLEAN` | `DEFAULT TRUE` | Account activation status |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Account creation time |
| `last_login` | `TIMESTAMP` | `NULL` | Last login timestamp |
| `login_attempts` | `INT` | `DEFAULT 0` | Failed login counter |
| `locked_until` | `TIMESTAMP` | `NULL` | Account lock expiration |

**Indexes**:
- `idx_mobile` on `mobile_number`
- `idx_email` on `email`

---

## 🔗 Relationships & Data Flow

### Logical Relationships (No Foreign Keys)

```
Users ──manages──> Messages
  │                   │
  ├─ View Messages    ├─ Search & Filter
  ├─ Edit Messages    ├─ Bulk Operations  
  ├─ Delete Messages  ├─ Extract Data
  └─ Upload Files     └─ Generate Stats
```

**Relationship Details**:

1. **Users → Messages Management**
   - Users can view all messages through search interface
   - Admin users can edit/delete individual messages
   - Admin users can perform bulk operations on messages
   - Users upload WhatsApp files that create new messages

2. **Data Processing Flow**:
   ```
   WhatsApp Export → File Upload → Message Parsing → Data Extraction → Database Storage
        ↓              ↓              ↓               ↓                ↓
   .zip/.txt files → temp files → raw text → structured data → messages table
   ```

3. **Access Control**:
   - Regular users: Read-only access to messages
   - Admin users: Full CRUD operations on messages and users
   - Authentication required for all operations

---

## 📊 Data Analysis Schema

### Message Data Extraction Process

```
┌─────────────────────────────────────────────────────────────────┐
│                     WhatsApp Message Processing                  │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Raw Message   │───▶│  Text Analysis  │───▶│ Structured Data │
│                 │    │                 │    │                 │
│ • Date & Time   │    │ • Mobile Regex  │    │ • Clean Fields  │
│ • Sender Name   │    │ • Area Patterns │    │ • Typed Values  │
│ • Message Text  │    │ • Sector Regex  │    │ • Indexes       │
│ • Source File   │    │ • Type Analysis │    │ • Relationships │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Extracted Data Categories

1. **Contact Information**
   - `sender_name`: Original sender name
   - `phone_number`: WhatsApp phone number
   - `extracted_mobile_number`: AI-extracted contact number

2. **Location Data**
   - `area_number`: Property area (الحي ١، الحي ٢، etc.)
   - `sector_number`: Property sector (مجاورة ١، مج ٢، etc.)

3. **Transaction Classification**
   - `transaction_type`: 
     - `للبيع` (For Sale)
     - `مطلوب` (Wanted/Looking to Buy)
     - `غير محدد` (Unspecified)

4. **Temporal Data**
   - `message_date`: Original WhatsApp date string
   - `datetime_parsed`: Standardized datetime for sorting
   - `created_at`: Database insertion timestamp

---

## 🔍 Query Patterns & Usage

### Common Query Operations

1. **Search Messages**
   ```sql
   SELECT * FROM messages 
   WHERE message_content LIKE '%شقة%'
   AND area_number = 15
   AND transaction_type = 'للبيع';
   ```

2. **User Authentication**
   ```sql
   SELECT id, mobile_number, password_hash, is_admin 
   FROM users 
   WHERE mobile_number = '01234567890' 
   AND is_active = 1;
   ```

3. **Statistics Generation**
   ```sql
   SELECT transaction_type, COUNT(*) as count
   FROM messages 
   GROUP BY transaction_type;
   ```

4. **Area Analysis**
   ```sql
   SELECT area_number, COUNT(*) as properties
   FROM messages 
   WHERE area_number IS NOT NULL
   GROUP BY area_number
   ORDER BY properties DESC;
   ```

---

## 🚀 Performance Considerations

### Database Optimization

1. **Indexes**
   - All frequently searched columns are indexed
   - Composite indexes for common filter combinations
   - Full-text search capability on message content

2. **Data Types**
   - `TEXT` for variable-length content
   - `VARCHAR` with appropriate lengths
   - `INT` for numeric area/sector data
   - `TIMESTAMP` for proper date handling

3. **Storage Engine**
   - `InnoDB` for ACID compliance and foreign key support
   - `utf8mb4` charset for full Unicode support (Arabic text)

### Scaling Strategy

1. **Horizontal Scaling**
   - Read replicas for search operations
   - Write master for data modifications
   - Connection pooling

2. **Data Archiving**
   - Periodic archiving of old messages
   - Retention policies for inactive users
   - Backup and recovery procedures

---

## 🔐 Security & Access Control

### Authentication Flow

```
User Login → Password Hash Verification → Session Creation → Role-Based Access
     ↓              ↓                         ↓                    ↓
Mobile Number → bcrypt.checkpw() → Flask-Login → Admin/User Routes
```

### Data Protection

1. **Password Security**
   - bcrypt hashing with salt
   - Login attempt limiting
   - Account locking mechanism

2. **Data Privacy**
   - No personal data exposure in logs
   - Secure file upload handling
   - Session management with Flask-Login

3. **Access Control**
   - Route-level authentication required
   - Admin-only operations protected
   - User session management

---

## 📈 Analytics & Reporting Schema

### Business Intelligence Queries

The database supports various analytics:

1. **Market Analysis**
   - Property distribution by area
   - Transaction type trends
   - Active agent rankings

2. **User Activity**
   - Login patterns
   - Admin action logs
   - System usage statistics

3. **Data Quality Metrics**
   - Extraction success rates
   - Missing field analysis
   - Source file coverage

This database design provides a robust foundation for real estate message analysis with proper indexing, security, and scalability considerations.

---

## 📝 UI Update: Register Page

- The `templates/register.html` page was translated to Arabic and improved for RTL layout and accessibility.
- The visual "Account Requirements" UI block (client-side live checklist) was removed from the registration page. The client-side JavaScript now safely guards against the absence of these elements so there are no runtime errors when the block is not present.

These UI changes are purely presentational and do not affect the database schema or data flow.