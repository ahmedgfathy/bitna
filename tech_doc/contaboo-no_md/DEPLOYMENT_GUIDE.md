# Laravel Real Estate CRM - Deployment Guide

## 📋 Prerequisites

- PHP 8.2 or higher
- MySQL 8.0 or MariaDB 10.6+
- Composer
- Node.js & NPM
- Web server (Apache/Nginx)

## 🚀 Server Deployment Steps

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/real-estate-crm.git
cd real-estate-crm
```

### 2. Install Dependencies
```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build
```

### 3. Environment Configuration
```bash
cp .env.production .env
# Edit .env with your server settings:
# - Database credentials
# - APP_URL
# - Mail settings
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Database Setup
```bash
# Create database
mysql -u root -p
CREATE DATABASE real_estate_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Import database
mysql -u root -p real_estate_crm < database_backup.sql
```

### 6. Storage & Permissions
```bash
php artisan storage:link
chmod -R 755 storage
chmod -R 755 bootstrap/cache
chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache
```

### 7. Cache & Optimize
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

## 🌐 Web Server Configuration

### Apache (.htaccess already included)
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/real-estate-crm/public
    
    <Directory /path/to/real-estate-crm/public>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/real-estate-crm/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## 📁 Directory Structure
```
real-estate-crm/
├── app/                    # Application code
├── database/               # Migrations & seeders
├── public/                 # Web root (point Apache/Nginx here)
├── storage/                # File storage (needs write permissions)
├── .env                    # Environment configuration
├── database_backup.sql     # Database backup file
└── README.md
```

## 🔧 Important Notes

1. **Storage Symlink**: Run `php artisan storage:link` to link public storage
2. **File Permissions**: Ensure web server can write to `storage/` and `bootstrap/cache/`
3. **Database**: Import the provided `database_backup.sql` file
4. **Images**: Copy any existing property images to `storage/app/public/property-images/`
5. **SSL**: Configure SSL certificate for production use

## 🎯 Default Login
- Email: admin@example.com
- Password: password
- **Change immediately after first login!**

## 📱 Features Included
- Multi-tenant Real Estate CRM
- Property/Unit management
- Advanced filtering system
- Image gallery
- Multi-currency support
- Role-based permissions
- Responsive design

## 🐛 Troubleshooting

### Permission Issues
```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Database Connection
- Check DB credentials in `.env`
- Ensure MySQL is running
- Verify user has proper permissions

### Images Not Showing
```bash
php artisan storage:link
```

### Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## 📞 Support
For technical support, refer to the project documentation or create an issue in the repository.
