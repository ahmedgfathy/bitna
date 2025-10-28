# MariaDB Database Structure Summary

**Generated on:** 2025-10-02 13:24:56  
**Server:** MariaDB (localhost:3306) with root user  
**Total Databases:** 67 (63 user databases, 4 system databases)  
**Total Database Objects:** 1,149 (Tables, Views, Procedures, Functions, Triggers)

## Database Overview

### Major CRM/Business Databases:
1. **contaboo_crm** - 32 tables (Main CRM system)
2. **contaboo_crm_app** - 25 tables (CRM application)
3. **contaboo_local** - 68 tables (Local CRM instance)
4. **crm_1** - 524 tables (Large CRM system)
5. **globalcrm_production** - 43 tables, 3 views, 3 procedures (Production CRM)
6. **real_estate_crm** - 44 tables (Real Estate CRM)
7. **pycrm** - 3 tables (Python CRM - current project)

### Django/Web Applications:
1. **django_db_glomart_rs** - 58 tables (Django app)
2. **glomart** - 35 tables
3. **glomart_crm** - 22 tables
4. **glomart_crm_local** - 70 tables
5. **laravel** - 11 tables (Laravel app)

### Real Estate/Property Databases (Excel Import Systems):
- Multiple `rs_*` databases (45+ databases) containing property/customer data
- Examples: rs_marassi_3693_xlsx, rs_mivida_3795_xlsx, rs_palm_hills_3965_eg_xlsx
- Each typically contains 1-2 tables with customer/property information

### Other Applications:
1. **whatsapp_viewer** - 6 tables (WhatsApp integration)
2. **whatscrm** - 5 tables (WhatsApp CRM)
3. **pms_cloud** - 8 tables (Property Management System)
4. **pmsonedrive** - 16 tables (OneDrive integration)

## Key Database Structures

### CRM Common Tables (found across multiple databases):
- `users` - User management
- `companies` - Multi-tenant company structure
- `clients`/`customers` - Customer management
- `properties` - Property listings
- `leads` - Lead management
- `deals`/`opportunities` - Sales pipeline
- `activities` - Activity tracking
- `audit_logs` - System auditing
- `subscriptions` - Billing management
- `departments` - Organization structure
- `roles`/`permissions` - Access control

### Advanced Features (in production systems):
- Multi-tenancy support
- Subscription billing
- Audit logging
- Role-based permissions
- Geographic/region management
- Currency support
- File attachments
- Communication tracking
- Pipeline management
- Reporting systems

## Database Relationships

### Multi-Tenant Architecture:
Most CRM systems use a company-based multi-tenant model:
```
companies (tenant) → users → clients/properties/leads
```

### Real Estate Specific:
```
regions → compound_locations → properties
properties → property_images/documents
clients → property_interests → properties
```

### CRM Pipeline:
```
leads → opportunities → deals
users → activities → clients/properties
```

## File Location
Complete SQL structure dump: `/Users/ahmedgomaa/Desktop/pycrm/mariadb_structure_dump.sql`

## Usage Notes
- Structure-only dump (no data included)
- All CREATE statements included
- Views, procedures, functions, and triggers preserved
- Foreign key relationships maintained
- Can be used for database migration or analysis