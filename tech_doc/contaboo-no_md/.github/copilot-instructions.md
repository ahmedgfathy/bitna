# Laravel Real Estate CRM - Project Instructions

## Project Overview
This is a Laravel 12 Real Estate SaaS CRM application with multi-tenant architecture, role-based access control (RBAC), MariaDB database, and Tailwind CSS styling with multi-language support.

## Completed Setup
- [x] Laravel project scaffolded with all dependencies
- [x] Database migrations and models configured
- [x] RBAC system implemented with Spatie Laravel Permission
- [x] Multi-tenant architecture setup
- [x] Real estate property management system
- [x] Unit listing with 4x10 grid layout (40 units per page)
- [x] Comprehensive unit details view with all data fields
- [x] Currency system with EGP, USD, EUR support
- [x] Reference tables populated (regions, property types, currencies, etc.)
- [x] Image management system with unit_images table
- [x] Development server running on http://127.0.0.1:8001

## Key Features
- Property/Unit management with comprehensive details
- Advanced filtering and pagination
- Multi-currency support (Egyptian Pound primary)
- Image gallery with slider functionality
- Reference data management
- Professional responsive UI with Tailwind CSS

## Database Structure
- Main database: `real_estate_crm`
- Key tables: units, unit_images, regions, currencies, property_types, etc.
- Relationships properly established
- Foreign keys configured

## Development
- Server: `php artisan serve` (running on port 8001)
- Database: MariaDB with credentials configured
- Assets: Built with Vite
- Cache: Cleared and optimized
