# ============================================================================
# Real Estate CRM - Production Deployment Guide
# ============================================================================
# Created: October 21, 2025
# Purpose: Complete guide for deploying Real Estate CRM to production server
# ============================================================================

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Deployment](#quick-deployment)
3. [Manual Deployment Steps](#manual-deployment-steps)
4. [Database Migration](#database-migration)
5. [Apache Configuration](#apache-configuration)
6. [Systemd Service](#systemd-service)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

---

## 🎯 Prerequisites

### Local Machine Requirements
- ✅ macOS with Homebrew
- ✅ Python 3.13+ with virtual environment
- ✅ MariaDB/MySQL client tools
- ✅ sshpass (install: `brew install hudochenkov/sshpass/sshpass`)
- ✅ rsync

### Production Server Details
```
IP Address: 38.242.250.92
SSH User: root
SSH Password: ZeroCall20!@HH##1655&&
Deploy Path: /var/www/real_estate_crm
Domain: arafa.contaboo.com (with SSL/HTTPS)
SSL: Enabled with Let's Encrypt (Certbot)
```

### Production Server Configuration
- ✅ Ubuntu/Debian Linux
- ✅ Python 3.8+
- ✅ MariaDB 10.5+ (root / zEROcALL20)
- ✅ Apache2 with mod_wsgi
- ✅ systemd

---

## 🚀 Quick Deployment (Automated)

### Step 1: Prepare Deployment Package
```bash
cd /Users/ahmedgomaa/Downloads/real_crm
chmod +x scripts/1_prepare_deployment.sh
./scripts/1_prepare_deployment.sh
```

**What this does:**
- ✅ Exports MariaDB database
- ✅ Collects Django static files
- ✅ Creates production requirements.txt
- ✅ Generates production settings
- ✅ Packages everything into tarball
- ✅ Creates deployment summary

**Output:** `deployment_package/real_estate_crm_YYYYMMDD_HHMMSS.tar.gz`

---

### Step 2: Deploy to Production Server
```bash
chmod +x scripts/2_deploy_to_server.sh
./scripts/2_deploy_to_server.sh
```

**What this does:**
- ✅ Uploads package to production server
- ✅ Extracts files to /var/www/real_estate_crm
- ✅ Creates Python virtual environment
- ✅ Installs dependencies
- ✅ Imports database to MariaDB
- ✅ Runs Django migrations
- ✅ Collects static files
- ✅ Configures Apache VirtualHost
- ✅ Creates systemd service
- ✅ Enables and starts services

**Access Application:**
- https://arafa.contaboo.com (with SSL)
- http://38.242.250.92 (redirects to HTTPS)

---

## 📦 Manual Deployment Steps

If you prefer manual deployment or need to troubleshoot:

### 1. Export Local Database
```bash
mysqldump -u root -pzerocall django_db_real_crm > database_export.sql
```

### 2. Package Application Files
```bash
cd /Users/ahmedgomaa/Downloads/real_crm
tar -czf real_estate_crm.tar.gz \
  --exclude='venv' \
  --exclude='__pycache__' \
  --exclude='*.pyc' \
  --exclude='.git' \
  --exclude='deployment_package' \
  --exclude='backups' \
  --exclude='*.sqlite3' \
  .
```

### 3. Upload to Production Server
```bash
scp real_estate_crm.tar.gz root@38.242.250.92:/tmp/
scp database_export.sql root@38.242.250.92:/tmp/
```

### 4. SSH to Production Server
```bash
ssh root@38.242.250.92
# Password: ZeroCall20!@HH##1655&&
```

### 5. Extract and Setup on Server
```bash
# Create deployment directory
mkdir -p /var/www/real_estate_crm
cd /var/www/real_estate_crm

# Extract application
tar -xzf /tmp/real_estate_crm.tar.gz

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install Django>=5.2.6 djangorestframework django-cors-headers \
  PyMySQL mysqlclient python-dotenv Pillow pytz openpyxl \
  django-import-export reportlab html5lib gunicorn whitenoise
```

### 6. Import Database
```bash
# Create database
mysql -u root -p'zEROcALL20' -e "CREATE DATABASE IF NOT EXISTS django_db_real_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import data
mysql -u root -p'zEROcALL20' django_db_real_crm < /tmp/database_export.sql
```

### 7. Configure Django
```bash
cd /var/www/real_estate_crm

# Copy production settings (created by prepare script)
# Or manually update settings.py with production values

# Run migrations
python manage.py migrate --settings=real_estate_crm.settings_production

# Collect static files
python manage.py collectstatic --noinput --settings=real_estate_crm.settings_production

# Set permissions
chown -R www-data:www-data /var/www/real_estate_crm
chmod -R 755 /var/www/real_estate_crm
```

---

## 🗄️ Database-Only Migration

If you only need to update the database without redeploying the entire app:

```bash
cd /Users/ahmedgomaa/Downloads/real_crm
chmod +x scripts/3_migrate_database_only.sh
./scripts/3_migrate_database_only.sh
```

This script:
- Exports local database
- Creates backup on production server
- Imports new database to production
- Preserves previous version as backup

---

## 🌐 Apache Configuration

### VirtualHost Configuration
File: `/etc/apache2/sites-available/real-estate-crm.conf`

```apache
<VirtualHost *:80>
    ServerName sys.glomartrealestates.com
    ServerAlias 38.242.250.92
    ServerAdmin admin@glomartrealestates.com

    DocumentRoot /var/www/real_estate_crm

    WSGIDaemonProcess real_estate_crm python-home=/var/www/real_estate_crm/venv python-path=/var/www/real_estate_crm
    WSGIProcessGroup real_estate_crm
    WSGIScriptAlias / /var/www/real_estate_crm/real_estate_crm/wsgi_production.py

    <Directory /var/www/real_estate_crm/real_estate_crm>
        <Files wsgi_production.py>
            Require all granted
        </Files>
    </Directory>

    Alias /static /var/www/real_estate_crm/staticfiles
    <Directory /var/www/real_estate_crm/staticfiles>
        Require all granted
    </Directory>

    Alias /media /var/www/real_estate_crm/media
    <Directory /var/www/real_estate_crm/media>
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/real-estate-crm-error.log
    CustomLog ${APACHE_LOG_DIR}/real-estate-crm-access.log combined

    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
</VirtualHost>
```

### Enable Site
```bash
# Enable required Apache modules
a2enmod wsgi
a2enmod headers
a2enmod rewrite

# Disable default site
a2dissite 000-default.conf

# Enable CRM site
a2ensite real-estate-crm.conf

# Test configuration
apache2ctl configtest

# Reload Apache
systemctl reload apache2
```

---

## ⚙️ Systemd Service Configuration

File: `/etc/systemd/system/real-estate-crm.service`

```ini
[Unit]
Description=Real Estate CRM Django Application
After=network.target mariadb.service

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/real_estate_crm
Environment="DJANGO_SETTINGS_MODULE=real_estate_crm.settings_production"
ExecStart=/var/www/real_estate_crm/venv/bin/gunicorn \
  --workers 3 \
  --bind unix:/var/www/real_estate_crm/real_estate_crm.sock \
  real_estate_crm.wsgi:application
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

### Service Management
```bash
# Reload systemd
systemctl daemon-reload

# Enable service (start on boot)
systemctl enable real-estate-crm.service

# Start service
systemctl start real-estate-crm.service

# Check status
systemctl status real-estate-crm.service

# View logs
journalctl -u real-estate-crm.service -f
```

---

## � SSL Certificate Management

The deployment automatically installs and configures SSL certificates using Let's Encrypt and Certbot.

### Automatic SSL Setup

During deployment (Step 11), the script:
1. ✅ Installs Certbot and Apache plugin
2. ✅ Obtains SSL certificates for arafa.contaboo.com and www.arafa.contaboo.com
3. ✅ Configures Apache for HTTPS
4. ✅ Enables HTTP to HTTPS redirect
5. ✅ Enables HSTS (HTTP Strict Transport Security)
6. ✅ Configures OCSP stapling
7. ✅ Sets up automatic renewal (every 60 days)

### SSL Management Script

Use the provided script to manage SSL certificates:

```bash
./scripts/5_manage_ssl.sh
```

**Menu Options:**
1. Check SSL certificate status
2. Install/Renew SSL certificate
3. Test SSL certificate renewal
4. View certificate details
5. Check auto-renewal status
6. Force certificate renewal
7. Revoke SSL certificate

### Manual SSL Commands

**On Production Server:**

```bash
# Check certificate status
certbot certificates

# Test renewal (dry run)
certbot renew --dry-run

# Force renewal
certbot renew --force-renewal

# Check auto-renewal timer
systemctl status certbot.timer
systemctl list-timers certbot.timer

# View certificate files
ls -l /etc/letsencrypt/live/arafa.contaboo.com/

# Reload Apache after manual changes
systemctl reload apache2
```

### SSL Certificate Locations

```
/etc/letsencrypt/live/arafa.contaboo.com/
├── fullchain.pem    # Complete certificate chain
├── privkey.pem      # Private key
├── cert.pem         # Domain certificate
└── chain.pem        # CA chain
```

### Verify SSL Installation

**From Local Machine:**
```bash
# Test HTTPS connection
curl -I https://arafa.contaboo.com

# Check certificate details
openssl s_client -connect arafa.contaboo.com:443 -servername arafa.contaboo.com

# Test SSL with ssllabs.com
open https://www.ssllabs.com/ssltest/analyze.html?d=arafa.contaboo.com
```

**On Production Server:**
```bash
# Check Apache SSL configuration
cat /etc/apache2/sites-enabled/000-default-le-ssl.conf

# Test Apache configuration
apache2ctl configtest

# Check SSL virtual host
apache2ctl -S | grep arafa
```

### SSL Renewal Process

Certificates are automatically renewed by Certbot:

- **Renewal Check:** Twice daily
- **Renewal Threshold:** 30 days before expiration
- **Certificate Validity:** 90 days
- **Auto-renewal:** Enabled via systemd timer

**Check next renewal:**
```bash
ssh root@38.242.250.92
systemctl list-timers certbot.timer
```

### SSL Troubleshooting

#### Certificate Not Working
```bash
# Check Certbot logs
tail -f /var/log/letsencrypt/letsencrypt.log

# Verify DNS points to server
dig arafa.contaboo.com +short

# Check port 80 and 443 are open
netstat -tlnp | grep -E ':80|:443'

# Test from server
curl -I http://localhost
curl -I https://localhost
```

#### Renewal Fails
```bash
# Check Certbot timer is running
systemctl status certbot.timer

# Manually renew with verbose output
certbot renew --dry-run --verbose

# Check Apache configuration
apache2ctl configtest

# Restart Apache
systemctl restart apache2
```

#### Mixed Content Warnings
Update your Django settings to force HTTPS:
```python
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

---

## �🔧 Troubleshooting

### Check Apache Logs
```bash
# Error log
tail -f /var/log/apache2/real-estate-crm-error.log

# Access log
tail -f /var/log/apache2/real-estate-crm-access.log
```

### Check Django Application
```bash
cd /var/www/real_estate_crm
source venv/bin/activate

# Test Django
python manage.py check --settings=real_estate_crm.settings_production

# Check database connection
python manage.py dbshell --settings=real_estate_crm.settings_production
```

### Common Issues

#### 1. **500 Internal Server Error**
**Solution:**
```bash
# Check Apache error log
tail -f /var/log/apache2/real-estate-crm-error.log

# Verify permissions
chown -R www-data:www-data /var/www/real_estate_crm
chmod -R 755 /var/www/real_estate_crm

# Restart Apache
systemctl restart apache2
```

#### 2. **Static Files Not Loading**
**Solution:**
```bash
cd /var/www/real_estate_crm
source venv/bin/activate
python manage.py collectstatic --clear --noinput --settings=real_estate_crm.settings_production
systemctl reload apache2
```

#### 3. **Database Connection Error**
**Solution:**
```bash
# Test MariaDB connection
mysql -u root -p'zEROcALL20' -e "SHOW DATABASES;"

# Verify database exists
mysql -u root -p'zEROcALL20' -e "USE django_db_real_crm; SHOW TABLES;"

# Check Django settings
grep -A 10 "DATABASES" /var/www/real_estate_crm/real_estate_crm/settings_production.py
```

#### 4. **Module Not Found Error**
**Solution:**
```bash
cd /var/www/real_estate_crm
source venv/bin/activate
pip install --upgrade -r requirements.txt
systemctl restart apache2
```

---

## 🔄 Maintenance

### Update Application Code Only
```bash
# On local machine
cd /Users/ahmedgomaa/Downloads/real_crm
tar -czf update.tar.gz \
  --exclude='venv' --exclude='__pycache__' --exclude='*.pyc' \
  authentication/ leads/ contacts/ properties/ projects/ opportunities/ reports/ \
  real_estate_crm/ templates/ static/

scp update.tar.gz root@38.242.250.92:/tmp/

# On production server
ssh root@38.242.250.92
cd /var/www/real_estate_crm
tar -xzf /tmp/update.tar.gz
chown -R www-data:www-data /var/www/real_estate_crm
python manage.py collectstatic --noinput --settings=real_estate_crm.settings_production
systemctl restart apache2
```

### Update Database Only
```bash
# Use the quick script
./scripts/3_migrate_database_only.sh
```

### Restart Services
```bash
# Restart Apache
systemctl restart apache2

# Restart Gunicorn (if using)
systemctl restart real-estate-crm.service

# Restart MariaDB (if needed)
systemctl restart mariadb
```

### Backup Production Database
```bash
ssh root@38.242.250.92
mysqldump -u root -p'zEROcALL20' django_db_real_crm > /root/backups/crm_$(date +%Y%m%d_%H%M%S).sql
```

---

## 📊 Monitoring

### Check Service Status
```bash
# Apache status
systemctl status apache2

# Application service status
systemctl status real-estate-crm.service

# MariaDB status
systemctl status mariadb

# Disk space
df -h

# Memory usage
free -h
```

### View Live Logs
```bash
# Apache error log
tail -f /var/log/apache2/real-estate-crm-error.log

# Apache access log
tail -f /var/log/apache2/real-estate-crm-access.log

# Application service log
journalctl -u real-estate-crm.service -f

# MariaDB log
tail -f /var/log/mysql/error.log
```

---

## 🔐 Security Checklist

- [x] Set `DEBUG = False` in production settings
- [x] Use strong `SECRET_KEY` (consider using environment variable)
- [x] Configure `ALLOWED_HOSTS` properly
- [x] Enable HTTPS/SSL (use Let's Encrypt)
- [x] Set secure cookie flags (`SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`)
- [x] Configure security headers (X-Frame-Options, etc.)
- [x] Use environment variables for sensitive data
- [x] Regular database backups
- [x] Keep software updated (Django, Python, Apache, MariaDB)
- [x] Monitor logs for suspicious activity

---

## 📞 Support

For issues or questions:
1. Check logs: `/var/log/apache2/real-estate-crm-error.log`
2. Review Django settings: `real_estate_crm/settings_production.py`
3. Test database connection: `python manage.py dbshell`
4. Verify file permissions: `ls -la /var/www/real_estate_crm`

---

## 📝 Deployment Checklist

Before deployment:
- [ ] Run `python manage.py check` locally
- [ ] Test all features in development
- [ ] Backup local database
- [ ] Update requirements.txt
- [ ] Review production settings

During deployment:
- [ ] Run preparation script
- [ ] Upload files to server
- [ ] Import database
- [ ] Run migrations
- [ ] Collect static files
- [ ] Configure Apache
- [ ] Test application access

After deployment:
- [ ] Verify homepage loads at https://arafa.contaboo.com
- [ ] Test login functionality
- [ ] Check admin panel
- [ ] Verify SSL certificate is active (look for padlock icon)
- [ ] Test HTTP to HTTPS redirect
- [ ] Test all major features
- [ ] Monitor error logs
- [ ] Run SSL test: https://www.ssllabs.com/ssltest/
- [ ] Set up monitoring/alerts

---

**Last Updated:** October 21, 2025
**Deployment Path:** `/var/www/real_estate_crm`
**Server IP:** `38.242.250.92`
**Domain:** `arafa.contaboo.com`
**SSL:** Enabled with Let's Encrypt (auto-renewal)
