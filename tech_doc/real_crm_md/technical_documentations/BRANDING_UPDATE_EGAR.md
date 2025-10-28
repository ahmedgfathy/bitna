# 🎨 EGAR Branding Update Documentation

**Date:** October 21, 2025
**Project:** Real Estate CRM
**Update Type:** Company Branding

---

## 📋 Overview

This document outlines the complete branding update from "Glomart Real Estate / جلومارت للعقارات" to "EGAR / ايجار", including logo and favicon changes.

---

## 🎯 Changes Made

### 1. Company Name Updates

#### English Name
- **Old:** Glomart Real Estate
- **New:** EGAR

#### Arabic Name
- **Old:** جلومارت للعقارات
- **New:** ايجار

### 2. Logo & Favicon

#### Logo File
- **Source:** `/Users/ahmedgomaa/Desktop/egar.jpg`
- **Destination:** `public/company/logos/egar.jpg`
- **Used in:** 
  - Login page
  - Report headers
  - Print templates
  - Admin interface

#### Favicon
- **File:** `static/images/egar-favicon.jpg`
- **Type:** JPEG image
- **Reference:** Updated in `templates/base.html`

---

## 📁 Files Modified

### 1. Django Models
- `authentication/models.py`
  - Updated `CompanySettings.company_name_en` default: "Glomart Real Estate" → "EGAR"
  - Updated `CompanySettings.company_name_ar` default: "جلومارت للعقارات" → "ايجار"
  - Updated `get_settings()` method defaults

- `authentication/company_settings_model.py`
  - Same updates as above (duplicate definition)

### 2. Templates
- `templates/base.html`
  - Updated page title: "Glomart CRM" → "EGAR CRM"
  - Updated favicon links to use `egar-favicon.jpg`
  - Removed old SVG/ICO favicon references

### 3. Static Files
- Added: `public/company/logos/egar.jpg`
- Added: `static/images/egar-favicon.jpg`

### 4. Database Migrations
- Created: `authentication/migrations/0007_alter_companysettings_company_name_ar_and_more.py`
  - Alters `company_name_en` field
  - Alters `company_name_ar` field

---

## 🚀 Deployment Process

### Local Environment
```bash
# 1. Copy logo files
cp /Users/ahmedgomaa/Desktop/egar.jpg public/company/logos/
cp /Users/ahmedgomaa/Desktop/egar.jpg static/images/egar-favicon.jpg

# 2. Create and apply migrations
python manage.py makemigrations
python manage.py migrate

# 3. Update company settings in database
python manage.py shell
>>> from authentication.models import CompanySettings
>>> settings = CompanySettings.get_settings()
>>> settings.company_name_en = 'EGAR'
>>> settings.company_name_ar = 'ايجار'
>>> settings.logo = 'company/logos/egar.jpg'
>>> settings.save()
```

### Production Server (arafa.contaboo.com)
```bash
# Run the automated deployment script
./scripts/7_update_branding.sh
```

The script performs:
1. ✅ Uploads all modified files to server
2. ✅ Uploads migration file
3. ✅ Runs database migrations
4. ✅ Updates CompanySettings in production database
5. ✅ Collects static files
6. ✅ Restarts Apache web server

---

## 🧪 Testing Checklist

### ✅ Login Page
- [x] Company logo displays correctly
- [x] Arabic name shows "ايجار"
- [x] English name shows "EGAR"
- [x] Favicon displays in browser tab

### ✅ Reports
- [x] Print headers show EGAR logo
- [x] Company name in reports updated
- [x] Print preview displays correctly

### ✅ Base Template
- [x] Page title shows "EGAR CRM"
- [x] Favicon loads correctly
- [x] All pages inherit correct branding

### ✅ Admin Interface
- [x] Company Settings accessible
- [x] Logo field displays egar.jpg
- [x] Company names saved correctly

---

## 📊 Database Schema

### CompanySettings Model

```python
class CompanySettings(models.Model):
    # Company Branding
    company_name_en = CharField(
        max_length=255,
        default="EGAR"
    )
    company_name_ar = CharField(
        max_length=255,
        default="ايجار"
    )
    logo = ImageField(
        upload_to='company/logos/',
        null=True,
        blank=True
    )
    # ... other fields ...
```

### Database Record (ID=1)
- `company_name_en`: "EGAR"
- `company_name_ar`: "ايجار"
- `logo`: "company/logos/egar.jpg"

---

## 🔧 Maintenance Notes

### Changing Company Name/Logo

1. **Via Admin Interface:**
   - Navigate to `/admin/authentication/companysettings/`
   - Edit the single CompanySettings record
   - Update fields as needed
   - Save changes

2. **Via Django Shell:**
   ```python
   from authentication.models import CompanySettings
   settings = CompanySettings.get_settings()
   settings.company_name_en = 'New Name'
   settings.logo = 'path/to/new/logo.jpg'
   settings.save()
   ```

3. **Via Migration:**
   - Update defaults in `authentication/models.py`
   - Run `python manage.py makemigrations`
   - Run `python manage.py migrate`

### Logo Requirements
- **Format:** JPG, PNG, or SVG
- **Recommended Size:** 800x400px
- **Max File Size:** 2MB
- **Upload Path:** `public/company/logos/`

---

## 🌐 Production Details

- **Server IP:** 38.242.250.92
- **Domain:** https://arafa.contaboo.com
- **Deploy Path:** /var/www/real_estate_crm/app
- **Apache Config:** /etc/apache2/sites-available/arafa.contaboo.com-le-ssl.conf
- **Static Files:** /var/www/real_estate_crm/app/staticfiles/

---

## 📝 Deployment Script

**Script:** `scripts/7_update_branding.sh`

**Usage:**
```bash
cd /Users/ahmedgomaa/Downloads/real_crm
./scripts/7_update_branding.sh
```

**What it does:**
1. Uploads modified Python files to server
2. Uploads logo and favicon files
3. Uploads migration file
4. SSH into server and:
   - Runs migrations
   - Updates CompanySettings in database
   - Collects static files
   - Restarts Apache

---

## ✅ Verification

### Production Status
- ✅ Migration applied successfully
- ✅ Database updated with new company name
- ✅ Logo file uploaded and accessible
- ✅ Static files collected (131 new files)
- ✅ Apache restarted successfully

### Live Website
Visit: **https://arafa.contaboo.com**

Expected Results:
- Browser tab shows "EGAR CRM" title
- Favicon displays egar.jpg
- Login page shows "ايجار" and "EGAR"
- Company logo visible on all pages
- Print headers include EGAR branding

---

## 🎓 Context Processors

The company settings are made available to all templates via the context processor:

**File:** `authentication/context_processors.py`

```python
def company_settings(request):
    from authentication.models import CompanySettings
    settings = CompanySettings.get_settings()
    return {
        'company_settings': settings,
        'company_logo_url': settings.logo.url if settings.logo else None,
        'company_primary_color': settings.primary_color,
        'company_secondary_color': settings.secondary_color,
    }
```

This makes `company_settings` available in all templates automatically.

---

## 🔗 Related Files

### Templates Using Company Branding
- `authentication/templates/authentication/login.html`
- `reports/templates/reports/property_reports.html`
- `reports/templates/reports/lead_reports.html`
- `reports/templates/reports/opportunity_reports.html`
- `reports/templates/reports/reports_dashboard.html`
- `templates/base.html`

### CSS Files
- `static/css/print.css` - Print-specific styling with company branding

---

## 📚 References

- Django ImageField: https://docs.djangoproject.com/en/5.2/ref/models/fields/#imagefield
- Django Migrations: https://docs.djangoproject.com/en/5.2/topics/migrations/
- Context Processors: https://docs.djangoproject.com/en/5.2/ref/templates/api/#using-requestcontext

---

## 🎉 Summary

The branding update has been successfully completed on both local development and production environments. The CRM system now displays "EGAR / ايجار" as the company name with the new logo throughout all pages, reports, and print templates.

**Status:** ✅ Complete
**Production:** ✅ Live at https://arafa.contaboo.com
**Last Updated:** October 21, 2025
