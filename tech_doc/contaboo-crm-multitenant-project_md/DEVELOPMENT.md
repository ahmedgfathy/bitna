# 🚀 Contaboo CRM - Development Setup Guide

This guide helps you set up the Contaboo CRM development environment on any machine.

## 📋 Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **MySQL 8+** - [Download](https://dev.mysql.com/downloads/mysql/) or use Docker
- **Git** - [Download](https://git-scm.com/)

## ⚡ Quick Setup Options

### Option 1: Automated Setup (Recommended)

```bash
git clone https://github.com/ahmedgfathy/contaboo.git
cd contaboo
npm run setup
```

### Option 2: Docker Setup

```bash
git clone https://github.com/ahmedgfathy/contaboo.git
cd contaboo
npm run setup:docker
```

## 🔧 Environment Configuration

### Required Environment Variables

Copy `.env.example` to `.env` and update:

```env
# Database - Update with your MySQL credentials
DATABASE_URL="mysql://username:password@localhost:3306/contaboo_crm"

# NextAuth - Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret-key"

# Application URL
NEXTAUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

### Docker Environment

For Docker setup, use these credentials:
```env
DATABASE_URL="mysql://contaboo_user:contaboo_password@localhost:3306/contaboo_crm"
```

## 🗄️ Database Setup

### Manual Database Setup

1. **Create MySQL Database**:
   ```sql
   CREATE DATABASE contaboo_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Generate Prisma Client & Push Schema**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed Initial Data**:
   ```bash
   npm run db:seed
   ```

### Docker Database Setup

```bash
npm run docker:up    # Start MySQL, Redis, PhpMyAdmin
npm run docker:down  # Stop all services
```

## 👤 Default Admin User

After setup, you can login with:
- **Email**: `admin@contaboo.com`
- **Password**: `admin123`

⚠️ **Important**: Change this password after first login!

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Database operations
npm run db:studio     # Open Prisma Studio
npm run db:reset      # Reset database and reseed
npm run db:seed       # Seed database only

# Docker operations  
npm run docker:up     # Start services
npm run docker:down   # Stop services

# Setup commands
npm run setup         # Full automated setup
npm run setup:docker  # Docker-based setup
```

## 🌐 Application Access

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/dashboard
- **Database Studio**: http://localhost:5555 (when running)
- **PhpMyAdmin**: http://localhost:8080 (Docker only)

## 🔍 Troubleshooting

### Database Connection Issues

1. **Check MySQL is running**:
   ```bash
   brew services start mysql  # macOS
   sudo service mysql start  # Linux
   ```

2. **Verify credentials in .env**:
   ```env
   DATABASE_URL="mysql://correct_username:correct_password@localhost:3306/contaboo_crm"
   ```

3. **Test connection**:
   ```bash
   npx prisma db push --preview-feature
   ```

### Authentication Issues

1. **Regenerate NextAuth secret**:
   ```bash
   openssl rand -base64 32
   ```

2. **Update .env file** with new secret

3. **Clear browser cache** and try again

### Port Conflicts

If port 3000 is busy:
```bash
npm run dev -- --port 3001
```

## 📦 What Gets Set Up

- ✅ Next.js 15 application with TypeScript
- ✅ MySQL database with complete schema
- ✅ Prisma ORM with migrations
- ✅ NextAuth.js authentication
- ✅ Admin user and company
- ✅ Subscription plans and features
- ✅ Property reference data (categories, types, etc.)
- ✅ Permission system and roles
- ✅ Sample data for testing

## 🔄 Reset Everything

To completely reset your development environment:

```bash
# Stop all services
npm run docker:down

# Remove Docker volumes (if using Docker)
docker volume prune -f

# Reset database
npm run db:reset

# Restart
npm run dev
```

## 📖 Next Steps

1. **Login** to http://localhost:3000
2. **Change default password**
3. **Explore the dashboard**
4. **Create test properties**
5. **Invite team members**

For more information, see the [main README](../README.md) and [documentation](../documentation/).