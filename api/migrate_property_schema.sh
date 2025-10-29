#!/bin/bash

# ============================================================================
# Property Schema Migration Script
# This script will backup your database and apply the new property schema
# ============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Database configuration from .env
DB_HOST="localhost"
DB_PORT="3306"
DB_NAME="bitna"
DB_USER="root"
DB_PASSWORD="zerocall"

# Backup directory
BACKUP_DIR="./backups"
BACKUP_FILE="$BACKUP_DIR/bitna_backup_$(date +%Y%m%d_%H%M%S).sql"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Property Schema Migration${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Step 1: Backup current database
echo -e "${YELLOW}Step 1: Creating database backup...${NC}"
mysqldump -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backup created: $BACKUP_FILE${NC}"
else
    echo -e "${RED}✗ Backup failed!${NC}"
    exit 1
fi

echo ""

# Step 2: Show what will be affected
echo -e "${YELLOW}Step 2: This migration will:${NC}"
echo "  - DROP existing property-related tables:"
echo "    • properties"
echo "    • property_types"
echo "    • regions"
echo "    • categories"
echo "    • listing_statuses"
echo ""
echo "  - CREATE new comprehensive property schema with:"
echo "    • 35+ lookup tables"
echo "    • Enhanced properties table with 100+ fields"
echo "    • Property images, documents, amenities, features"
echo "    • Activity tracking tables"
echo "    • Audit logs"
echo ""
echo "  - KEEP all other tables:"
echo "    • tenants"
echo "    • users"
echo "    • leads"
echo "    • activities"
echo ""
echo -e "${RED}⚠️  WARNING: All existing property data will be deleted!${NC}"
echo ""

# Step 3: Confirmation
read -p "Do you want to proceed with the migration? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Migration cancelled.${NC}"
    exit 0
fi

echo ""

# Step 4: Apply migration
echo -e "${YELLOW}Step 3: Applying migration...${NC}"
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < ./prisma/migrations/replace_property_schema.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Migration applied successfully!${NC}"
else
    echo -e "${RED}✗ Migration failed!${NC}"
    echo -e "${YELLOW}You can restore from backup: $BACKUP_FILE${NC}"
    exit 1
fi

echo ""

# Step 5: Verify migration
echo -e "${YELLOW}Step 4: Verifying migration...${NC}"
TABLE_COUNT=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -sse "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB_NAME' AND table_name LIKE '%propert%';")

echo -e "${GREEN}✓ Found $TABLE_COUNT property-related tables${NC}"
echo ""

# Summary
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Migration Completed Successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Import your property data using the new schema"
echo "  2. Test the application thoroughly"
echo "  3. Keep the backup safe: $BACKUP_FILE"
echo ""
echo -e "${YELLOW}Backup location: $BACKUP_FILE${NC}"
echo ""
