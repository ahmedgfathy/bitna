# Laravel Real Estate CRM

A comprehensive multi-tenant Real Estate Customer Relationship Management system built with Laravel 11, featuring advanced property management, multi-currency support, and role-based access control.

## ✨ Features

### 🏠 Property Management
- **Comprehensive Unit Listings**: Detailed property information with 40+ data fields
- **Advanced Filtering**: Filter by location, property type, price range, area, and more
- **Multi-Currency Support**: EGP, USD, EUR with automatic conversion
- **Image Galleries**: Multiple images per property with primary image selection
- **Property Types**: Apartments, Villas, Offices, Retail spaces, etc.

### 🎯 CRM Features
- **Multi-Tenant Architecture**: Support for multiple real estate companies
- **Role-Based Access Control**: Different permission levels for users
- **Lead Management**: Track and manage potential customers
- **Agent Assignment**: Assign properties to specific agents
- **Owner Management**: Comprehensive owner contact information

### 💰 Financial Management
- **Multiple Pricing Models**: Cash, installment, rental pricing
- **Payment Terms**: Flexible payment frequency and terms
- **Commission Tracking**: Agent commission management
- **Maintenance Fees**: Track ongoing property costs

### 🌍 Localization & Regional Support
- **Egyptian Market Focus**: Pre-configured for Egyptian real estate
- **Arabic Support**: Bilingual interface (English/Arabic)
- **Regional Data**: Egyptian governorates and cities
- **Local Currency**: EGP as primary currency

### 📊 Advanced Features
- **Comprehensive Search**: Multi-field search across properties
- **Export Capabilities**: Data export functionality
- **Responsive Design**: Mobile-friendly interface
- **Image Management**: Optimized image handling and display
- **Database Optimization**: Efficient queries with proper indexing

## 🛠️ Technology Stack

- **Backend**: Laravel 11 (PHP 8.2+)
- **Database**: MySQL 8.0 / MariaDB 10.6+
- **Frontend**: Blade Templates with Tailwind CSS
- **Build Tools**: Vite
- **Authentication**: Laravel Breeze
- **Permissions**: Spatie Laravel Permission

## 📋 Requirements

- PHP 8.2 or higher
- MySQL 8.0 or MariaDB 10.6+
- Composer
- Node.js & NPM
- Web server (Apache/Nginx)

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/real-estate-crm.git
cd real-estate-crm
composer install
npm install && npm run build
```

### 2. Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Database Setup
```bash
# Create database
mysql -u root -p
CREATE DATABASE real_estate_crm;

# Import the provided database
mysql -u root -p real_estate_crm < database_backup.sql
```

### 4. Final Steps
```bash
php artisan storage:link
php artisan migrate --seed (if not using backup)
php artisan serve
```

Visit `http://localhost:8000`

## 📁 Project Structure

```
real-estate-crm/
├── app/
│   ├── Models/           # Eloquent models
│   ├── Http/Controllers/ # Application controllers
│   └── Console/Commands/ # Artisan commands
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/         # Database seeders
├── resources/
│   ├── views/           # Blade templates
│   └── js/css/          # Frontend assets
└── storage/
    └── app/public/      # File storage
```

## 🎯 Key Models & Relationships

### Core Models
- **Unit**: Main property model with 40+ fields
- **Company**: Multi-tenant company management
- **User**: Authentication and role management
- **Lead**: Customer relationship management

### Reference Tables
- **Regions**: Geographic locations
- **PropertyTypes**: Property classifications
- **Currencies**: Multi-currency support
- **FinishingLevels**: Property completion status

## 🔧 Configuration

### Database
The system includes comprehensive reference data for:
- Egyptian regions and cities
- Property types and categories
- Currencies (EGP, USD, EUR)
- Finishing levels and development phases

### Images
- Stored in `storage/app/public/property-images/`
- Supports multiple images per property
- Automatic thumbnail generation
- Fallback handling for missing images

## 📊 Database Schema

The system uses a normalized database structure with:
- **Units table**: Core property data (40+ fields)
- **Reference tables**: Lookups for consistent data
- **Relationship tables**: Many-to-many associations
- **Media tables**: Image and document management

## 🎨 UI/UX Features

- **Responsive Grid Layout**: 4x10 property grid (40 per page)
- **Advanced Filters**: 4-row organized filter system
- **Modern Design**: Tailwind CSS components
- **Loading States**: Smooth user interactions
- **Error Handling**: Graceful fallbacks

## 📱 Responsive Design

Optimized for:
- Desktop browsers
- Tablets
- Mobile devices
- Various screen resolutions

## 🔒 Security Features

- **Authentication**: Laravel Breeze
- **Authorization**: Role-based permissions
- **Data Validation**: Comprehensive input validation
- **SQL Injection Protection**: Eloquent ORM
- **CSRF Protection**: Laravel built-in

## 🌟 Recent Updates

- ✅ Removed redundant categories system
- ✅ Enhanced property type classification
- ✅ Improved image display logic
- ✅ Optimized database queries
- ✅ Updated filter system

## 📈 Performance

- **Optimized Queries**: Eager loading relationships
- **Database Indexes**: Proper indexing strategy
- **Caching**: Laravel cache implementation
- **Asset Optimization**: Vite build process

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the [Deployment Guide](DEPLOYMENT_GUIDE.md)
- Review the [Categories Removal Summary](CATEGORIES_REMOVAL_SUMMARY.md)

## 🙏 Acknowledgments

- Laravel Framework
- Tailwind CSS
- Spatie Laravel Permission
- Egyptian Real Estate Market Requirements

---

**Built with ❤️ for the Egyptian Real Estate Market**

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
