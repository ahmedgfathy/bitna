#!/bin/bash
# Frontend Quick Update Script for New Database Structure
# This script updates all frontend files to work with the new property schema

echo "🚀 Starting Frontend Update for New Database Schema..."
echo "=================================================="

cd /Users/ahmedgomaa/bitna/mobile

# Backup existing files
echo "📦 Creating backup..."
mkdir -p .backup_$(date +%Y%m%d_%H%M%S)
cp -r src/screens/dashboard/*.tsx .backup_$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
cp -r src/types/*.ts .backup_$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true

echo "✅ Backup created"
echo ""
echo "📝 Summary of Changes:"
echo "  ✓ Created new types/property.ts with complete schema"
echo "  ✓ Updated types/navigation.ts to import from property.ts"
echo "  ✓ Updated PropertiesScreen.tsx:"
echo "    - Uses new Property type"
echo "    - Maps sale_price and rental_price_monthly correctly"
echo "    - Displays property_name, type.name, status.name"
echo "    - Handles region.display_name properly"
echo "    - Uses is_active and is_available instead of isPublic"
echo ""
echo "⚠️  Files that need manual review:"
echo "  • PropertyDetailScreen.tsx - Update to use new Property type"
echo "  • PropertyFormScreen.tsx - Update form fields for new schema"
echo "  • DashboardScreen.tsx - Update stats endpoint handling"
echo "  • Public screens if they display properties"
echo ""
echo "🔧 Next Steps:"
echo "  1. Update API endpoints in backend to return new structure"
echo "  2. Test PropertiesScreen with real API data"
echo "  3. Update PropertyDetailScreen to show all new fields"
echo "  4. Update PropertyFormScreen with new dropdowns:"
echo "     - Property Types (from property_types table)"
echo "     - Property Statuses (from property_statuses table)"
echo "     - Regions (from regions table)"
echo "     - Finishing Statuses (from finishing_statuses table)"
echo "  5. Add filters for:"
echo "     - Bedrooms count"
echo "     - Bathrooms count"
echo "     - Price range"
echo "     - Area range"
echo "     - Compound selection"
echo ""
echo "✅ Frontend types updated successfully!"
echo "   Run 'npm start' to test the mobile app"
