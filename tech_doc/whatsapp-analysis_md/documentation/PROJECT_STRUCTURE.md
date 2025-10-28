# Project Structure

```
whatsapp-analysis/                    # Main project directory
├── README.md                        # Main project documentation
├── requirements.txt                 # Python dependencies (Flask==2.3.3)
├── requirements-production.txt      # Production dependencies
├── 
├── ## Core Application Files
├── web_app_production.py           # Production Flask app (MariaDB)
├── web_app_original.py             # Development Flask app (SQLite)
├── main.py                         # WhatsApp message extractor
├── 
├── ## Data Processing Modules
├── extract_mobile_numbers.py       # Extract mobile numbers from text
├── extract_areas_sectors.py        # Extract area/sector information
├── property_type_analyzer.py       # Classify property transaction types
├── 
├── ## Frontend Templates
├── templates/                      # HTML templates
│   ├── base.html                  # Base template with navigation
│   ├── index.html                 # Dashboard homepage
│   ├── search.html                # Advanced search interface
│   ├── login.html                 # User login page
│   ├── register.html              # User registration
│   ├── profile.html               # User profile management
│   ├── admin_panel.html           # Admin panel interface
│   └── stats.html                 # Statistics and analytics
├── 
├── ## Storage & Logs
├── uploads/                        # File upload storage
├── logs/                          # Application logs
├── 
├── ## Documentation
├── documentation/                  # Project documentation
│   ├── API.md                     # API endpoints documentation
│   └── INSTALLATION.md            # Installation guide
├── 
└── ## Deployment
    └── deploy/                     # Deployment scripts
        ├── deploy.sh              # Main deployment script
        ├── deploy_contaboo.sh     # Contaboo-specific deployment
        ├── configure_webserver.sh # Web server configuration
        ├── migrate_database.py    # Database migration utility
        ├── migrate_data.sh        # Data migration script
        ├── migrate_data_contaboo.sh # Contaboo data migration
        └── production_config.py   # Production configuration
```

## File Descriptions

### Core Application
- **`web_app_production.py`** - Main production Flask application using MariaDB
- **`web_app_original.py`** - Development version using SQLite database
- **`main.py`** - Standalone WhatsApp chat parser and extractor

### Data Processing
- **`extract_mobile_numbers.py`** - Extracts Egyptian mobile numbers (01X XXXXXXXX)
- **`extract_areas_sectors.py`** - Finds area numbers (الحي) and sectors (مج/مجاورة)
- **`property_type_analyzer.py`** - Classifies messages as للبيع/مطلوب/غير محدد

### Frontend
- **`templates/`** - Jinja2 HTML templates for the web interface
- **`base.html`** - Common layout with Bootstrap 5 styling
- **`index.html`** - Main dashboard with statistics and recent messages
- **`search.html`** - Advanced filtering and search interface

### Storage
- **`uploads/`** - Temporary storage for uploaded WhatsApp export files
- **`logs/`** - Application logs and error tracking

### Deployment
- **`deploy/`** - Production deployment automation scripts
- Server configuration and database setup utilities
- Migration tools for moving between environments

## Removed Files

The following files were removed during cleanup:
- `web_app_auth.py` (duplicate of web_app_original.py)
- `templates_backup_20251011_022913/` (old backup folder)
- `__pycache__/` (Python cache files)
- `._*` files (macOS resource forks)
- `venv/` (virtual environment - should be recreated)
- `messages.db` (SQLite database - generated at runtime)
- Multiple duplicate deployment scripts

## Next Steps

1. **Environment Setup:** Create new virtual environment and install dependencies
2. **Database Setup:** Configure MariaDB for production or use SQLite for development  
3. **Template Enhancement:** Improve UI/UX of existing templates
4. **Testing:** Verify all functionality works with cleaned codebase