#!/usr/bin/env python3
"""
Property CSV Importer
Imports property data from CSV files into the database
"""
import csv
import json
import re
import mysql.connector
from pathlib import Path
from datetime import datetime
from decimal import Decimal

# Database connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'zerocall',
    'database': 'contaboo',
    'charset': 'utf8mb4'
}

# Configuration
TENANT_ID = 'demo-tenant-1'
USER_ID = 'super-admin-1'  # Super Admin from seed
SKIP_FILE_3 = True  # Skip property_data_3.csv due to duplicates

def get_db_connection():
    """Create database connection"""
    return mysql.connector.connect(**db_config)

def load_lookup_mappings(conn):
    """Load all lookup table mappings"""
    cursor = conn.cursor(dictionary=True)
    
    mappings = {
        'categories': {},
        'types': {},
        'statuses': {},
        'finishing': {},
        'regions': {},
        'currencies': {}
    }
    
    # Property categories
    cursor.execute("SELECT id, name FROM property_categories WHERE company_id = %s", (TENANT_ID,))
    for row in cursor.fetchall():
        mappings['categories'][row['name'].upper()] = row['id']
    
    # Property types
    cursor.execute("SELECT id, name FROM property_types WHERE company_id = %s", (TENANT_ID,))
    for row in cursor.fetchall():
        name_key = row['name'].upper().replace(' ', '_')
        mappings['types'][name_key] = row['id']
    
    # Property statuses
    cursor.execute("SELECT id, name FROM property_statuses WHERE company_id = %s", (TENANT_ID,))
    for row in cursor.fetchall():
        name_key = row['name'].upper().replace(' ', '_')
        mappings['statuses'][name_key] = row['id']
    
    # Finishing statuses
    cursor.execute("SELECT id, name FROM finishing_statuses WHERE company_id = %s", (TENANT_ID,))
    for row in cursor.fetchall():
        name_key = row['name'].upper().replace(' ', '_')
        mappings['finishing'][name_key] = row['id']
    
    # Regions
    cursor.execute("SELECT id, name, display_name FROM regions WHERE company_id = %s", (TENANT_ID,))
    for row in cursor.fetchall():
        mappings['regions'][row['name']] = row['id']
        if row['display_name']:
            mappings['regions'][row['display_name']] = row['id']
    
    # Currencies
    cursor.execute("SELECT id, code FROM currencies")
    for row in cursor.fetchall():
        mappings['currencies'][row['code']] = row['id']
    
    cursor.close()
    return mappings

def parse_price(price_str):
    """Parse price from various formats"""
    if not price_str or price_str == '????':
        return None
    
    # Remove currency symbols and spaces
    price_str = str(price_str).strip()
    price_str = re.sub(r'[^\d.]', '', price_str)
    
    try:
        return Decimal(price_str) if price_str else None
    except:
        return None

def detect_currency(price_str, total_price):
    """Detect currency from price string"""
    if not price_str or price_str == '????':
        return 'EGP'
    
    price_str = str(price_str).upper()
    
    if 'DOLLAR' in price_str or '$' in price_str or 'USD' in price_str:
        return 'USD'
    elif total_price and total_price < 1000000:  # Likely USD
        return 'USD'
    else:
        return 'EGP'

def parse_date(date_str):
    """Parse date from various formats"""
    if not date_str or date_str == '????':
        return None
    
    date_formats = [
        '%d-%m-%Y %H:%M:%S',
        '%Y-%m-%d %H:%M:%S',
        '%d/%m/%Y %H:%M:%S',
        '%d-%m-%Y',
        '%Y-%m-%d'
    ]
    
    for fmt in date_formats:
        try:
            return datetime.strptime(date_str, fmt)
        except:
            continue
    
    return None

def map_property_type(type_str, mappings):
    """Map CSV type to database type_id"""
    if not type_str or type_str == '????':
        return None
    
    # Mapping dictionary
    type_mapping = {
        'Stand alone Compound': 'STANDALONE_COMPOUND',
        'APARTMENT COMPOUND': 'APARTMENT_COMPOUND',
        'APARTMENT OUT': 'APARTMENT_OUT',
        'ViLLA OUT': 'VILLA_OUT',
        'Town House': 'TOWNHOUSE',
        'Town House CORNER': 'TOWNHOUSE_CORNER',
        'Town House . M': 'TOWNHOUSE',
        'Twin House': 'TWIN_HOUSE',
        'DUPLEX G+B': 'DUPLEX_GB',
        'DUPLEX G+F': 'DUPLEX_GF',
        'DUPLEX ROOF': 'DUPLEX_ROOF',
        'ROOF': 'ROOF',
        'STUDIO': 'STUDIO',
        'OFFICE SPACE': 'OFFICE_SPACE',
        'CLINIC': 'CLINIC',
        'ADMIN BUILDING': 'ADMIN_BUILDING',
        'ADMIN & RETAIL BUILDING': 'ADMIN_RETAIL_BUILDING',
        'RETAIL': 'RETAIL',
        'RETAIL BUILDING': 'RETAIL_BUILDING',
        'BESMENT': 'BASEMENT',
        'FACTORY': 'FACTORY',
        'FARMACY': 'PHARMACY',
        'شاليه': 'CHALET',
        'I VILLA G': 'I_VILLA_G',
        'I VILLA R': 'I_VILLA_R',
        'اراضي': 'LAND',
        'بنزينه': 'GAS_STATION',
        'عماره': 'BUILDING',
        'مستشفيات': 'HOSPITAL'
    }
    
    mapped = type_mapping.get(type_str)
    return mappings['types'].get(mapped) if mapped else None

def map_property_status(status_str, mappings):
    """Map CSV status to database status_id"""
    if not status_str or status_str == '????':
        return None
    
    # Mapping dictionary (handle combined statuses)
    status_mapping = {
        'For sale': 'FOR_SALE',
        'For Sale': 'FOR_SALE',
        'For Rent': 'FOR_RENT',
        'Sold Out': 'SOLD_OUT',
        'Naw rented': 'NOW_RENTED',
        'Hold Naw': 'HOLD',
        'HOLD NOW': 'HOLD',
        'Recycle': 'RECYCLE',
        'غير معروف': 'UNKNOWN'
    }
    
    # Handle combined statuses (take first one)
    if '|##|' in status_str:
        status_str = status_str.split('|##|')[0].strip()
    
    mapped = status_mapping.get(status_str)
    return mappings['statuses'].get(mapped) if mapped else None

def map_finishing_status(finishing_str, mappings):
    """Map CSV finishing to database finishing_status_id"""
    if not finishing_str or finishing_str == '????':
        return None
    
    finishing_mapping = {
        'FULLY FINISHED': 'FULLY_FINISHED',
        'SEMI FINISHED': 'SEMI_FINISHED',
        'fully finished & furnished': 'FULLY_FURNISHED',
        'Skeleton هيكل خرساني': 'SKELETON',
        'SEMI FURNITURE': 'SEMI_FURNITURE'
    }
    
    mapped = finishing_mapping.get(finishing_str)
    return mappings['finishing'].get(mapped) if mapped else None

def map_region(area_str, mappings):
    """Map CSV Area to database region_id"""
    if not area_str or area_str == '????':
        return None
    
    return mappings['regions'].get(area_str)

def parse_rooms(rooms_str):
    """Parse room count from various formats"""
    if not rooms_str or rooms_str == '????':
        return None
    
    try:
        # Extract first number found
        match = re.search(r'\d+', str(rooms_str))
        return int(match.group()) if match else None
    except:
        return None

def import_properties():
    """Main import function"""
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Load mappings
    print("Loading lookup table mappings...")
    mappings = load_lookup_mappings(conn)
    
    print(f"  Categories: {len(mappings['categories'])}")
    print(f"  Types: {len(mappings['types'])}")
    print(f"  Statuses: {len(mappings['statuses'])}")
    print(f"  Finishing: {len(mappings['finishing'])}")
    print(f"  Regions: {len(mappings['regions'])}")
    print(f"  Currencies: {len(mappings['currencies'])}")
    
    # CSV files to process
    csv_files = [
        'property_data_1.csv',
        'property_data_2.csv'
    ]
    
    if not SKIP_FILE_3:
        csv_files.append('property_data_3.csv')
    
    migrations_dir = Path(__file__).parent
    
    total_processed = 0
    total_imported = 0
    total_skipped = 0
    property_numbers_seen = set()
    
    for csv_file in csv_files:
        filepath = migrations_dir / csv_file
        
        if not filepath.exists():
            print(f"⚠️  File not found: {csv_file}")
            continue
        
        print(f"\n{'='*60}")
        print(f"Processing: {csv_file}")
        print(f"{'='*60}")
        
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            for row in reader:
                total_processed += 1
                
                # Get property number
                prop_number = row.get('Property Number', '').strip()
                
                if not prop_number:
                    total_skipped += 1
                    continue
                
                # Skip duplicates
                if prop_number in property_numbers_seen:
                    total_skipped += 1
                    continue
                
                property_numbers_seen.add(prop_number)
                
                # Parse data
                type_id = map_property_type(row.get('Type'), mappings)
                status_id = map_property_status(row.get('Unit For'), mappings)
                finishing_id = map_finishing_status(row.get('Finished'), mappings)
                region_id = map_region(row.get('Area'), mappings)
                
                total_price = parse_price(row.get('Total Price'))
                currency_code = detect_currency(row.get('Total Price'), total_price)
                currency_id = mappings['currencies'].get(currency_code)
                
                land_area = parse_price(row.get('Land area') or row.get('SPACE'))
                rooms_count = parse_rooms(row.get('ROOMS'))
                
                created_at = parse_date(row.get('Created Time')) or datetime.now()
                updated_at = parse_date(row.get('Modified Time')) or datetime.now()
                
                # Prepare property data
                property_data = {
                    'id': None,  # UUID will be generated by database
                    'company_id': TENANT_ID,
                    'created_by_id': USER_ID,
                    'property_number': prop_number,
                    'type_id': type_id,
                    'status_id': status_id,
                    'finishing_status_id': finishing_id,
                    'region_id': region_id,
                    'property_name': (row.get('Property Name - Compound Name') or '')[:500],
                    'title': f"Property {prop_number}",
                    'description': (row.get('Description') or '')[:2000],
                    'land_area': land_area,
                    'total_area': land_area,
                    'rooms_count': rooms_count,
                    'bedrooms_count': rooms_count,
                    'sale_price': total_price if status_id == mappings['statuses'].get('FOR_SALE') else None,
                    'rental_price_monthly': total_price if status_id == mappings['statuses'].get('FOR_RENT') else None,
                    'currency_id': currency_id,
                    'building_name': (row.get('Building') or row.get('BUILDING NAME') or '')[:255],
                    'unit_number': (row.get('Unit NO') or '')[:50],
                    'floor_number': (row.get('The Floors') or '')[:100],
                    'created_at': created_at,
                    'updated_at': updated_at
                }
                
                # Insert property
                try:
                    insert_sql = """
                        INSERT INTO properties (
                            id, company_id, created_by_id, property_number,
                            type_id, status_id, finishing_status_id, region_id,
                            property_name, title, description,
                            land_area, total_area, rooms_count, bedrooms_count,
                            sale_price, rental_price_monthly, currency_id,
                            building_name, unit_number, floor_number,
                            created_at, updated_at
                        ) VALUES (
                            UUID(), %(company_id)s, %(created_by_id)s, %(property_number)s,
                            %(type_id)s, %(status_id)s, %(finishing_status_id)s, %(region_id)s,
                            %(property_name)s, %(title)s, %(description)s,
                            %(land_area)s, %(total_area)s, %(rooms_count)s, %(bedrooms_count)s,
                            %(sale_price)s, %(rental_price_monthly)s, %(currency_id)s,
                            %(building_name)s, %(unit_number)s, %(floor_number)s,
                            %(created_at)s, %(updated_at)s
                        )
                    """
                    
                    cursor.execute(insert_sql, property_data)
                    total_imported += 1
                    
                    if total_imported % 100 == 0:
                        print(f"  Imported {total_imported} properties...")
                        conn.commit()
                    
                except Exception as e:
                    print(f"  ❌ Error importing {prop_number}: {e}")
                    total_skipped += 1
        
        conn.commit()
        print(f"✅ Completed {csv_file}")
    
    cursor.close()
    conn.close()
    
    # Print summary
    print(f"\n{'='*60}")
    print("📊 IMPORT SUMMARY")
    print(f"{'='*60}")
    print(f"Total rows processed: {total_processed}")
    print(f"✅ Successfully imported: {total_imported}")
    print(f"⚠️  Skipped (duplicates/errors): {total_skipped}")
    print(f"Unique properties: {len(property_numbers_seen)}")

if __name__ == '__main__':
    print("="*60)
    print("🚀 PROPERTY CSV IMPORTER")
    print("="*60)
    print(f"Tenant: {TENANT_ID}")
    print(f"User: {USER_ID}")
    print(f"Skip File 3: {SKIP_FILE_3}")
    print("="*60)
    
    import_properties()
