# Database Backup

This directory contains the MariaDB database backup for the WhatsApp Real Estate Analyzer application.

## Files

- `whatsapp_viewer_backup.sql.gz` - Compressed SQL dump of the complete database

## Database Structure

The database contains the following main tables:

### Core Tables
- **whatsapp_messages** - All WhatsApp messages (71,996+ messages)
  - Columns: id, name, mobile, time, message_text, created_at, updated_at

- **real_estate_listings** - Analyzed real estate listings (2,000+ listings)
  - Columns: id, message_id, region, area_size, area_unit, unit_type, price_mentioned, price_numeric, description, contact_phone, contact_name, extracted_date, raw_message, confidence_score

- **regions_analysis** - Regional analytics and statistics
  - Columns: region_name, total_listings, avg_price, avg_area, common_unit_types, last_updated

- **extracted_features** - Detailed feature analysis with confidence scoring
  - Columns: listing_id, feature_type, feature_value, confidence_score, extraction_method

## Restore Instructions

To restore this database on a new system:

1. **Extract the backup:**
   ```bash
   gunzip whatsapp_viewer_backup.sql.gz
   ```

2. **Create the database:**
   ```bash
   mysql -u root -p -e "CREATE DATABASE whatsapp_viewer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```

3. **Restore the data:**
   ```bash
   mysql -u root -p whatsapp_viewer < whatsapp_viewer_backup.sql
   ```

4. **Update your `.env` file:**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=whatsapp_viewer
   DB_PORT=3306
   ```

## Database Statistics

- **Total WhatsApp Messages:** 71,996+
- **Real Estate Listings Found:** 2,000+
- **Analysis Coverage:** ~2.86% of messages contain real estate content
- **Top Regions:** حي/مجاورة, العاشر من رمضان, اتجاه
- **Common Property Types:** أرض, شقة, دور, مصنع, مكتب

## Analysis Features

The Python analyzer (`whatsapp_analyzer.py`) extracts:
- **Regions/Locations** - Egyptian governorates, cities, and neighborhoods
- **Property Types** - Apartments, villas, land, commercial properties
- **Prices** - In Egyptian pounds with various formats
- **Areas** - Property sizes in square meters
- **Contact Information** - Phone numbers and names
- **Confidence Scoring** - AI confidence in extracted data

## Notes

- Database created: September 2025
- MariaDB Version: 12.0.2
- Character Set: utf8mb4 (supports Arabic text)
- Contains real WhatsApp message data for real estate analysis