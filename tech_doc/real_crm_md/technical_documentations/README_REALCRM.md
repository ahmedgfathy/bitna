# Real CRM - Fresh Empty Copy

## Overview
This is a complete copy of the Glomart CRM project with an **empty database** ready for fresh start.

## Project Details
- **Location**: `/var/www/real_crm`
- **Size**: 5.1 GB (without media files and videos)
- **Database**: `django_db_real_crm` (Empty with structure only)
- **Python Environment**: Fresh virtual environment in `venv/`

## What's Included

### ✅ Copied Files:
- All Python code (authentication, leads, properties, projects modules)
- All templates and static files
- Configuration files (.env.production, settings, etc.)
- Deployment scripts
- Technical documentation
- Requirements file
- Empty logs and media directories

### ❌ Excluded (Clean Copy):
- `.git` repository and `.gitignore`
- Media files (images, videos)
- Database data (only structure is present)
- Old log files
- Python cache files (`__pycache__`, `.pyc`)
- Original virtual environment

## Database Information

**Database Name**: `django_db_real_crm`
**Status**: Empty structure with 58 tables
**Tables Include**:
- Django core tables (auth, admin, sessions, contenttypes)
- Authentication module (users, profiles, permissions, RBAC)
- Leads module (leads, events, sources, statuses)
- Properties module (properties, references, preferences)
- Projects module (projects, related tables)

**Superuser Created**:
- Username: `admin`
- Email: `admin@realcrm.com`
- Password: `Admin@123`

**⚠️ Change the default password immediately!**

## Environment Configuration

The `.env.production` file is configured with:
- Database: `django_db_real_crm`
- Static files: `/var/www/real_crm/staticfiles`
- Media files: `/var/www/real_crm/media`
- DEBUG: False
- Secret Key: `django-production-secret-key-real-crm-2025`

**⚠️ Update the SECRET_KEY before deploying!**

## Virtual Environment

A fresh Python 3.12 virtual environment has been created with all production dependencies installed:
- Django 5.2.6
- DRF, Gunicorn, Celery, Redis
- MySQL client, Pillow, PDF generators
- All other production requirements

## How to Use

### 1. Activate Virtual Environment
```bash
cd /var/www/real_crm
source venv/bin/activate
```

### 2. Run Development Server (Testing)
```bash
python manage.py runserver 0.0.0.0:8080 --settings=real_estate_crm.settings_production
```

### 3. Create Additional Users
```bash
python manage.py createsuperuser --settings=real_estate_crm.settings_production
```

### 4. Import Data (if needed)
```bash
python manage.py loaddata your_data.json --settings=real_estate_crm.settings_production
```

### 5. Collect Static Files (if modified)
```bash
python manage.py collectstatic --noinput --settings=real_estate_crm.settings_production
```

## Production Deployment

To deploy this to production:

1. **Update Configuration**:
   - Change SECRET_KEY in `.env.production`
   - Update ALLOWED_HOSTS
   - Set proper domain names

2. **Configure Web Server**:
   - Copy nginx configuration from `deployment/` folder
   - Update paths to point to `/var/www/real_crm`
   - Create systemd service for gunicorn

3. **Set Permissions**:
```bash
sudo chown -R www-data:www-data /var/www/real_crm
sudo chmod -R 755 /var/www/real_crm
```

4. **Start Services**:
```bash
sudo systemctl start your-crm-service
sudo systemctl enable your-crm-service
sudo systemctl restart nginx
```

## Database Backup and Restore

### Backup Empty Structure:
```bash
mysqldump -u root -p django_db_real_crm > /var/www/real_crm/backups/empty_structure.sql
```

### Restore:
```bash
mysql -u root -p django_db_real_crm < /var/www/real_crm/backups/empty_structure.sql
```

## Differences from Original (glomart-crm)

| Feature | Original | Real CRM |
|---------|----------|----------|
| Database | django_db_glomart_rs (with data) | django_db_real_crm (empty) |
| Location | /var/www/glomart-crm | /var/www/real_crm |
| Size | 9.3 GB | 5.1 GB |
| Media Files | Included | Empty |
| Git Repository | Included | Removed |
| Users | 62 users | 1 admin user |
| Properties | 3229 properties | 0 |
| Leads | With data | Empty |

## Next Steps

1. **Security**:
   - Change admin password
   - Update SECRET_KEY
   - Configure SSL certificates

2. **Customization**:
   - Update branding (logo, name)
   - Configure email settings
   - Set up backup scripts

3. **Data Import**:
   - Import initial reference data
   - Create user profiles
   - Set up RBAC permissions

## Support

For technical documentation, check:
- `/var/www/real_crm/technical_documentations/`
- Original README files
- Django documentation

## Created
Date: October 15, 2025
By: Automated copy from glomart-crm project
Purpose: Clean starting point for new CRM implementation

---

**⚠️ Important Reminders**:
1. This is a development/staging copy - do NOT use in production without proper security configuration
2. Change all default passwords immediately
3. Update SECRET_KEY before any production use
4. Set up proper backups
5. Configure monitoring and logging
