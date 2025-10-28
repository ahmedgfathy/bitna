# 📊 Complete Multi-Tenant Database Structure

## 🏢 **CORE TABLES**

### **companies** (Multi-tenant root)
```
id                  UUID PRIMARY KEY
name                VARCHAR(255)     -- Company name
email               VARCHAR(255)     -- Company email
phone               VARCHAR(50)      -- Company phone
address             TEXT             -- Company address
website             VARCHAR(255)     -- Company website
logo_url            TEXT             -- Company logo
subscription_plan   VARCHAR(50)      -- 'basic', 'premium', 'enterprise'
is_active          BOOLEAN          -- Company status
created_at         TIMESTAMPTZ
updated_at         TIMESTAMPTZ
```

### **users** (Enhanced with company association)
```
id              UUID PRIMARY KEY
company_id      UUID REFERENCES companies(id)  -- TENANT ISOLATION
email           VARCHAR(255) UNIQUE
first_name      VARCHAR(100)
last_name       VARCHAR(100)
phone           VARCHAR(50)
avatar_url      TEXT
profile_id      UUID REFERENCES user_profiles(id)  -- User's role/permissions
is_active       BOOLEAN
last_login_at   TIMESTAMPTZ
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

## 🛡️ **PERMISSION SYSTEM**

### **user_profiles** (Roles with granular permissions)
```
id           UUID PRIMARY KEY
company_id   UUID REFERENCES companies(id)  -- Company-specific profiles
name         VARCHAR(100)                   -- 'Administrator', 'Sales Agent'
description  TEXT                           -- Profile description
color        VARCHAR(7)                     -- Profile color (#007AFF)
is_default   BOOLEAN                        -- Default profile for new users
is_system    BOOLEAN                        -- Cannot be deleted
created_at   TIMESTAMPTZ
updated_at   TIMESTAMPTZ
```

### **modules** (System modules: Leads, Properties, Contacts, Reports)
```
id           UUID PRIMARY KEY
name         VARCHAR(50) UNIQUE     -- 'leads', 'properties', 'contacts'
display_name VARCHAR(100)           -- 'Leads', 'Properties', 'Contacts'
icon         VARCHAR(50)            -- 'people', 'home', 'person'
color        VARCHAR(7)             -- Module color
is_active    BOOLEAN
created_at   TIMESTAMPTZ
```

### **module_fields** (Fields within each module for granular control)
```
id           UUID PRIMARY KEY
module_id    UUID REFERENCES modules(id)
field_name   VARCHAR(50)            -- 'name', 'email', 'phone', 'mobile'
display_name VARCHAR(100)           -- 'First Name', 'Email Address'
field_type   VARCHAR(50)            -- 'text', 'email', 'phone', 'number'
is_required  BOOLEAN                -- Required field
is_sensitive BOOLEAN                -- Sensitive field (needs permission)
sort_order   INTEGER                -- Display order
created_at   TIMESTAMPTZ
```

### **profile_module_permissions** (Module-level access: View, Edit/Add, Full Control)
```
id                UUID PRIMARY KEY
profile_id        UUID REFERENCES user_profiles(id)
module_id         UUID REFERENCES modules(id)
can_view          BOOLEAN            -- Can view module data
can_edit_add      BOOLEAN            -- Can edit/add records
can_full_control  BOOLEAN            -- Full management access
created_at        TIMESTAMPTZ
```

### **profile_field_permissions** (Field-level access: Hide mobile numbers, emails, etc.)
```
id               UUID PRIMARY KEY
profile_id       UUID REFERENCES user_profiles(id)
module_field_id  UUID REFERENCES module_fields(id)
can_view         BOOLEAN            -- Can view this field
can_edit         BOOLEAN            -- Can edit this field
created_at       TIMESTAMPTZ
```

### **administrative_permissions** (System-wide capabilities)
```
id           UUID PRIMARY KEY
name         VARCHAR(100) UNIQUE    -- 'user_management', 'company_settings'
display_name VARCHAR(100)           -- 'User Management'
description  TEXT                   -- Permission description
category     VARCHAR(50)            -- 'Administration', 'Reports'
created_at   TIMESTAMPTZ
```

### **profile_admin_permissions** (Which profiles have admin capabilities)
```
id                   UUID PRIMARY KEY
profile_id           UUID REFERENCES user_profiles(id)
admin_permission_id  UUID REFERENCES administrative_permissions(id)
created_at           TIMESTAMPTZ
```

### **data_access_rules** (Who can see whose data)
```
id               UUID PRIMARY KEY
company_id       UUID REFERENCES companies(id)
profile_id       UUID REFERENCES user_profiles(id)
module_id        UUID REFERENCES modules(id)
access_type      VARCHAR(50)        -- 'own_only', 'team_only', 'all_company'
can_view_others  BOOLEAN            -- Can view others' records
can_edit_others  BOOLEAN            -- Can edit others' records
can_delete_others BOOLEAN           -- Can delete others' records
created_at       TIMESTAMPTZ
```

## 📊 **DATA TABLES (With Ownership & Multi-tenant)**

### **leads** (Enhanced with ownership and company isolation)
```
id             UUID PRIMARY KEY
company_id     UUID REFERENCES companies(id)    -- TENANT ISOLATION
created_by     UUID REFERENCES users(id)        -- OWNERSHIP
assigned_to    UUID REFERENCES users(id)        -- ASSIGNMENT

-- Lead Data Fields
first_name     VARCHAR(100)
last_name      VARCHAR(100)
email          VARCHAR(255)         -- SENSITIVE: Can be hidden per profile
phone          VARCHAR(50)          -- SENSITIVE: Can be hidden per profile
mobile         VARCHAR(50)          -- SENSITIVE: Can be hidden per profile
address        TEXT
city           VARCHAR(100)
country        VARCHAR(100)

-- Lead Management
source_id      UUID REFERENCES lead_sources(id)
type_id        UUID REFERENCES lead_types(id)
status_id      UUID REFERENCES lead_statuses(id)
priority       VARCHAR(20)
score          INTEGER
budget         DECIMAL(15,2)        -- SENSITIVE: Can be hidden per profile
notes          TEXT

-- Timestamps
created_at     TIMESTAMPTZ
updated_at     TIMESTAMPTZ
last_contact_at TIMESTAMPTZ
```

### **properties** (Enhanced with ownership and company isolation)
```
id             UUID PRIMARY KEY
company_id     UUID REFERENCES companies(id)    -- TENANT ISOLATION
created_by     UUID REFERENCES users(id)        -- OWNERSHIP
assigned_to    UUID REFERENCES users(id)        -- ASSIGNMENT

-- Property Data Fields
title          VARCHAR(255)
description    TEXT
property_type  VARCHAR(50)
listing_type   VARCHAR(50)          -- 'sale', 'rent'
price          DECIMAL(15,2)        -- SENSITIVE: Can be hidden per profile
area           DECIMAL(10,2)
bedrooms       INTEGER
bathrooms      INTEGER
address        TEXT
city           VARCHAR(100)
country        VARCHAR(100)
latitude       DECIMAL(10,8)
longitude      DECIMAL(11,8)

-- Property Management
status         VARCHAR(50)
is_featured    BOOLEAN
images_urls    TEXT[]               -- Array of image URLs

-- Timestamps
created_at     TIMESTAMPTZ
updated_at     TIMESTAMPTZ
```

### **contacts** (Enhanced with ownership and company isolation)
```
id               UUID PRIMARY KEY
company_id       UUID REFERENCES companies(id)    -- TENANT ISOLATION
created_by       UUID REFERENCES users(id)        -- OWNERSHIP

-- Contact Data Fields
first_name       VARCHAR(100)
last_name        VARCHAR(100)
email            VARCHAR(255)       -- SENSITIVE: Can be hidden per profile
phone            VARCHAR(50)        -- SENSITIVE: Can be hidden per profile
mobile           VARCHAR(50)        -- SENSITIVE: Can be hidden per profile
company_name     VARCHAR(255)
job_title        VARCHAR(100)
address          TEXT
city             VARCHAR(100)
country          VARCHAR(100)

-- Contact Management
contact_type     VARCHAR(50)        -- 'client', 'prospect', 'vendor'
source           VARCHAR(100)
notes            TEXT

-- Timestamps
created_at       TIMESTAMPTZ
updated_at       TIMESTAMPTZ
last_contact_at  TIMESTAMPTZ
```

## 📋 **AUDIT & LOGGING**

### **user_login_history** (Track all login sessions)
```
id               UUID PRIMARY KEY
user_id          UUID REFERENCES users(id)
company_id       UUID REFERENCES companies(id)
ip_address       INET
user_agent       TEXT
device_type      VARCHAR(50)
location         VARCHAR(100)
login_at         TIMESTAMPTZ
logout_at        TIMESTAMPTZ
session_duration INTEGER            -- in minutes
is_successful    BOOLEAN
failure_reason   TEXT
```

### **audit_logs** (Complete activity tracking)
```
id             UUID PRIMARY KEY
company_id     UUID REFERENCES companies(id)
user_id        UUID REFERENCES users(id)

-- Action Details
action         VARCHAR(50)          -- 'CREATE', 'UPDATE', 'DELETE', 'VIEW'
resource_type  VARCHAR(50)          -- 'lead', 'property', 'contact', 'user'
resource_id    UUID                 -- ID of the affected record

-- Change Tracking
old_values     JSONB               -- Previous values
new_values     JSONB               -- New values
changed_fields TEXT[]              -- List of changed fields

-- Context
ip_address     INET
user_agent     TEXT
endpoint       VARCHAR(255)
created_at     TIMESTAMPTZ
```

### **field_access_logs** (Track sensitive field access)
```
id             UUID PRIMARY KEY
company_id     UUID REFERENCES companies(id)
user_id        UUID REFERENCES users(id)
resource_type  VARCHAR(50)          -- 'lead', 'property', 'contact'
resource_id    UUID                 -- Record ID
field_name     VARCHAR(50)          -- 'mobile', 'email', 'budget'
access_type    VARCHAR(20)          -- 'view', 'edit'
ip_address     INET
created_at     TIMESTAMPTZ
```

## 🔧 **BUILT-IN FUNCTIONS**

### **check_module_permission(user_id, module_name, permission_type)**
- Checks if user has 'view', 'edit_add', or 'full_control' access to a module

### **check_field_permission(user_id, module_name, field_name, permission_type)**  
- Checks if user can 'view' or 'edit' specific fields (mobile, email, etc.)

## 🔒 **ROW LEVEL SECURITY (RLS)**

- **Company Isolation**: Users can only access their company's data
- **Automatic Enforcement**: Built into database level, cannot be bypassed
- **JWT Integration**: Uses Supabase auth tokens for user context

## 📈 **PERFORMANCE INDEXES**

- **Multi-tenant queries**: Optimized for company_id filtering
- **User ownership**: Fast lookups by created_by and assigned_to
- **Permission checks**: Indexed for rapid access control
- **Audit queries**: Optimized for date range and user filtering

## 🎯 **KEY BENEFITS**

✅ **Complete Data Isolation**: Company A cannot see Company B's data  
✅ **User Ownership**: Track who created/owns each record  
✅ **Granular Permissions**: Hide mobile numbers, emails, budget per profile  
✅ **Full Audit Trail**: Every action logged with user, IP, changes  
✅ **Scalable Architecture**: Supports unlimited companies and users  
✅ **Security by Design**: RLS enforced at database level