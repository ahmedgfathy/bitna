# Installation Instructions

## 📦 Repository Contents

- `database_structure.sql` - Database schema (61KB - included in repo)
- `database_backup.sql.gz` - Full database with sample data (789KB - download separately)
- `.env.production` - Production environment template
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions

## 🚀 Quick Installation

### Option 1: Fresh Installation (Recommended for Development)
```bash
# 1. Clone repository
git clone https://github.com/yourusername/real-estate-crm.git
cd real-estate-crm

# 2. Install dependencies
composer install
npm install && npm run build

# 3. Environment setup
cp .env.production .env
# Edit .env with your database credentials

# 4. Generate application key
php artisan key:generate

# 5. Create database and run migrations
mysql -u root -p
CREATE DATABASE real_estate_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit

# Import structure
mysql -u root -p real_estate_crm < database_structure.sql

# Run seeders to populate reference data
php artisan db:seed

# 6. Setup storage and permissions
php artisan storage:link
chmod -R 755 storage bootstrap/cache

# 7. Start development server
php artisan serve
```

### Option 2: With Sample Data
```bash
# Follow steps 1-4 from Option 1, then:

# 5. Download and import full database
# Download database_backup.sql.gz from releases
gunzip database_backup.sql.gz
mysql -u root -p real_estate_crm < database_backup.sql

# 6. Continue with steps 6-7 from Option 1
```

## 🌐 Production Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete production setup instructions.

## 🔑 Default Login
- Email: admin@example.com
- Password: password
- **⚠️ Change immediately after first login!**

## 📁 Important Files

### For Development:
- `database_structure.sql` - Clean database schema
- `.env.production` - Environment template

### For Production:
- `database_backup.sql.gz` - Full data backup (download from releases)
- `DEPLOYMENT_GUIDE.md` - Production deployment guide

## 🎯 System Features

✅ Multi-tenant Real Estate CRM
✅ 3,200+ sample properties
✅ Advanced filtering system  
✅ Multi-currency support (EGP, USD, EUR)
✅ Image galleries
✅ Egyptian market data
✅ Mobile responsive design

## 📞 Need Help?

1. Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Review [Categories Removal Summary](CATEGORIES_REMOVAL_SUMMARY.md)
3. Create an issue in this repository
