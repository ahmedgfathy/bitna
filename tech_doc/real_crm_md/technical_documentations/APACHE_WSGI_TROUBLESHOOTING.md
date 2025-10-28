# Apache mod_wsgi Troubleshooting Guide

## 🔴 Error: Invalid command 'WSGIDaemonProcess'

### Error Message
```
AH00526: Syntax error on line 9 of /etc/apache2/sites-enabled/real-estate-crm.conf:
Invalid command 'WSGIDaemonProcess', perhaps misspelled or defined by a module not included in the server configuration
```

---

## 🎯 Root Cause

The **mod_wsgi** module is not installed or not enabled in Apache. This module is required to run Django (Python) applications with Apache.

---

## ✅ Quick Fix (Choose One)

### Option 1: Automated Fix from Local Machine

```bash
cd /Users/ahmedgomaa/Downloads/real_crm
./scripts/quick_fix_wsgi.sh
```

This script will remotely:
- Install libapache2-mod-wsgi-py3
- Enable required Apache modules
- Restart Apache

---

### Option 2: Manual Fix on Server

If you're already SSH'd to the server:

```bash
# Install mod_wsgi for Python 3
apt-get update
apt-get install -y libapache2-mod-wsgi-py3

# Enable Apache modules
a2enmod wsgi
a2enmod headers
a2enmod rewrite
a2enmod ssl

# Test Apache configuration
apache2ctl configtest

# Restart Apache
systemctl restart apache2

# Check status
systemctl status apache2
```

---

## 🔍 Verify Installation

### Check if mod_wsgi is Installed

```bash
# Check installed packages
dpkg -l | grep wsgi

# Expected output:
# libapache2-mod-wsgi-py3
```

### Check if mod_wsgi is Enabled

```bash
# List enabled Apache modules
apache2ctl -M | grep wsgi

# Expected output:
# wsgi_module (shared)
```

### Test Apache Configuration

```bash
apache2ctl configtest

# Expected output:
# Syntax OK
```

---

## 📋 Step-by-Step Verification

### 1. Check Python Version
```bash
python3 --version
# Should be Python 3.x
```

### 2. Check Virtual Environment
```bash
ls -la /var/www/real_estate_crm/app/venv/
# Should contain bin/, lib/, etc.
```

### 3. Check Apache Configuration
```bash
cat /etc/apache2/sites-enabled/real-estate-crm.conf
# Should contain WSGIDaemonProcess, WSGIProcessGroup, WSGIScriptAlias
```

### 4. Check WSGI File
```bash
ls -la /var/www/real_estate_crm/app/real_estate_crm/wsgi_production.py
# File should exist
```

### 5. Test Django Application
```bash
cd /var/www/real_estate_crm/app
source venv/bin/activate
python manage.py check --settings=real_estate_crm.settings_production
# Should show: System check identified no issues
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Wrong mod_wsgi Package

**Problem:** Installed mod_wsgi for Python 2 instead of Python 3

**Solution:**
```bash
# Remove Python 2 version
apt-get remove libapache2-mod-wsgi

# Install Python 3 version
apt-get install -y libapache2-mod-wsgi-py3

# Restart Apache
systemctl restart apache2
```

---

### Issue 2: Module Not Enabled

**Problem:** mod_wsgi installed but not enabled

**Solution:**
```bash
# Enable module
a2enmod wsgi

# Restart Apache
systemctl restart apache2
```

---

### Issue 3: Apache Fails to Start

**Problem:** Apache won't start after enabling mod_wsgi

**Solution:**
```bash
# Check Apache error logs
tail -50 /var/log/apache2/error.log

# Check systemd logs
journalctl -u apache2 -n 50

# Test configuration
apache2ctl configtest

# Common fixes:
# - Fix file permissions
chown -R www-data:www-data /var/www/real_estate_crm

# - Check Python path in WSGI config
ls -la /var/www/real_estate_crm/app/venv/bin/python3
```

---

### Issue 4: Wrong Python Version

**Problem:** mod_wsgi compiled for different Python version

**Solution:**
```bash
# Check Python version
python3 --version

# Check mod_wsgi Python version
python3 -c "import sys; print(sys.version)"

# Reinstall mod_wsgi
apt-get remove libapache2-mod-wsgi-py3
apt-get install -y libapache2-mod-wsgi-py3

# Restart Apache
systemctl restart apache2
```

---

## 📝 Complete Apache Configuration Example

File: `/etc/apache2/sites-available/real-estate-crm.conf`

```apache
<VirtualHost *:80>
    ServerName arafa.contaboo.com
    ServerAlias www.arafa.contaboo.com 38.242.250.92
    ServerAdmin admin@contaboo.com

    DocumentRoot /var/www/real_estate_crm/app

    # Python/Django configuration
    WSGIDaemonProcess real_estate_crm python-home=/var/www/real_estate_crm/app/venv python-path=/var/www/real_estate_crm/app
    WSGIProcessGroup real_estate_crm
    WSGIScriptAlias / /var/www/real_estate_crm/app/real_estate_crm/wsgi_production.py

    <Directory /var/www/real_estate_crm/app/real_estate_crm>
        <Files wsgi_production.py>
            Require all granted
        </Files>
    </Directory>

    # Static files
    Alias /static /var/www/real_estate_crm/app/staticfiles
    <Directory /var/www/real_estate_crm/app/staticfiles>
        Require all granted
    </Directory>

    # Media files
    Alias /media /var/www/real_estate_crm/app/media
    <Directory /var/www/real_estate_crm/app/media>
        Require all granted
    </Directory>

    # Logging
    ErrorLog ${APACHE_LOG_DIR}/real-estate-crm-error.log
    CustomLog ${APACHE_LOG_DIR}/real-estate-crm-access.log combined
</VirtualHost>
```

---

## 🔄 After Fixing mod_wsgi

### 1. Verify Apache is Running
```bash
systemctl status apache2
# Should show: active (running)
```

### 2. Test Web Access
```bash
curl -I http://localhost
# Should return HTTP 200 or 302
```

### 3. Install SSL Certificate
```bash
certbot --apache -d arafa.contaboo.com -d www.arafa.contaboo.com
```

### 4. Verify HTTPS
```bash
curl -I https://arafa.contaboo.com
# Should return HTTP 200 or 302
```

---

## 🚀 Prevention for Future Deployments

The deployment script has been updated to automatically install mod_wsgi. Future deployments will:

1. ✅ Check if mod_wsgi is installed
2. ✅ Install it if missing
3. ✅ Enable all required modules
4. ✅ Test configuration before proceeding

---

## 📞 Still Having Issues?

### Check Logs
```bash
# Apache error log
tail -f /var/log/apache2/error.log

# Apache access log
tail -f /var/log/apache2/access.log

# Application-specific log
tail -f /var/log/apache2/real-estate-crm-error.log

# Django logs
tail -f /var/www/real_estate_crm/app/logs/django_error.log
```

### Get System Info
```bash
# Apache version
apache2 -v

# Python version
python3 --version

# Installed Python packages
pip3 list

# Apache modules
apache2ctl -M

# Service status
systemctl status apache2
systemctl status mariadb
```

### Test Django Directly
```bash
cd /var/www/real_estate_crm/app
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000 --settings=real_estate_crm.settings_production
# Then visit: http://38.242.250.92:8000
```

---

## ✅ Success Checklist

After applying the fix, verify:

- [ ] mod_wsgi package installed: `dpkg -l | grep wsgi`
- [ ] mod_wsgi module enabled: `apache2ctl -M | grep wsgi`
- [ ] Apache config valid: `apache2ctl configtest` shows "Syntax OK"
- [ ] Apache running: `systemctl is-active apache2` shows "active"
- [ ] Web accessible: `curl -I http://localhost` returns 200/302
- [ ] SSL installable: `certbot --apache -d arafa.contaboo.com` works

---

**Last Updated:** October 21, 2025  
**Issue:** Invalid command 'WSGIDaemonProcess'  
**Solution:** Install and enable libapache2-mod-wsgi-py3
