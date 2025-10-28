# Bitna - Quick Command Reference

## Backend API Commands

```bash
# Navigate to API folder
cd /Users/ahmedgomaa/bitna/api

# Development
npm run dev                    # Start dev server with hot reload

# Prisma Commands
npm run prisma:generate        # Generate Prisma Client
npm run prisma:migrate         # Create and run migrations
npm run prisma:studio          # Open Prisma Studio (DB GUI)
npm run prisma:push            # Push schema to DB without migration

# Build & Run
npm run build                  # Compile TypeScript
npm start                      # Run production build
```

## Mobile App Commands

```bash
# Navigate to mobile folder
cd /Users/ahmedgomaa/bitna/mobile

# Development
npm start                      # Start Metro bundler
npx react-native run-ios       # Run on iOS
npx react-native run-android   # Run on Android

# iOS Pod Management
cd ios
bundle exec pod install        # Install/update CocoaPods
cd ..

# Utilities
npm test                       # Run tests
npx react-native log-ios       # View iOS logs
npx react-native log-android   # View Android logs
```

## Database Commands

```bash
# Access MariaDB
mysql -u root -p

# Inside MySQL shell
USE bitna;                     # Switch to bitna database
SHOW TABLES;                   # List all tables
DESCRIBE table_name;           # Show table structure
```

## Common Workflows

### Start Development
```bash
# Terminal 1 - Backend
cd /Users/ahmedgomaa/bitna/api
npm run dev

# Terminal 2 - Mobile
cd /Users/ahmedgomaa/bitna/mobile
npm start

# Terminal 3 - Run App
cd /Users/ahmedgomaa/bitna/mobile
npx react-native run-ios
```

### After Schema Changes
```bash
cd /Users/ahmedgomaa/bitna/api
# Edit prisma/schema.prisma
npm run prisma:migrate         # Create migration
npm run prisma:generate        # Update Prisma Client
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:3000/health

# Database connection test
curl http://localhost:3000/db-test
```
