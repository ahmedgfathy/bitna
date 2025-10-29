#!/usr/bin/env python3
"""
Seed lookup tables for property import
"""
import mysql.connector
import uuid

# Database connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'zerocall',
    'database': 'contaboo',
    'charset': 'utf8mb4'
}

# Tenant and User IDs
TENANT_ID = 'demo-tenant-1'
USER_ID = '2d0e59cf-3c22-4280-8bae-34b0072c6d2d'

def get_db_connection():
    """Create database connection"""
    return mysql.connector.connect(**db_config)

def seed_property_categories(cursor):
    """Seed property categories"""
    print("📁 Seeding property categories...")
    categories = [
        ('RESIDENTIAL', 'Residential', 'Residential properties'),
        ('ADMIN', 'Administrative', 'Administrative properties'),
        ('COMMERCIAL', 'Commercial', 'Commercial properties'),
        ('CLINICS', 'Clinics', 'Medical clinics'),
        ('RESIDENTIAL_OFFICE', 'Residential + Office', 'Mixed residential and office'),
        ('MIXED_USE', 'Mixed Use', 'Mixed use properties')
    ]
    
    for code, name, desc in categories:
        cursor.execute("""
            INSERT INTO property_categories (id, company_id, name, description, is_active, sort_order, updated_at)
            VALUES (UUID(), %s, %s, %s, TRUE, 1, NOW())
            ON DUPLICATE KEY UPDATE name=name
        """, (TENANT_ID, name, desc))
    
    print(f"  ✅ Seeded {len(categories)} categories")

def seed_property_types(cursor):
    """Seed property types"""
    print("🏠 Seeding property types...")
    types = [
        'APARTMENT_COMPOUND', 'APARTMENT_OUT', 'STANDALONE_COMPOUND', 'VILLA_OUT',
        'TOWNHOUSE', 'TOWNHOUSE_CORNER', 'TWIN_HOUSE', 'DUPLEX_GB', 'DUPLEX_GF',
        'DUPLEX_ROOF', 'ROOF', 'STUDIO', 'OFFICE_SPACE', 'CLINIC', 'ADMIN_BUILDING',
        'ADMIN_RETAIL_BUILDING', 'RETAIL', 'RETAIL_BUILDING', 'BASEMENT', 'FACTORY',
        'PHARMACY', 'CHALET', 'I_VILLA_G', 'I_VILLA_R', 'LAND', 'GAS_STATION',
        'BUILDING', 'HOSPITAL'
    ]
    
    for type_code in types:
        name = type_code.replace('_', ' ').title()
        cursor.execute("""
            INSERT INTO PropertyType (id, company_id, name, is_active, sort_order, updated_at)
            VALUES (UUID(), %s, %s, TRUE, 1, NOW())
            ON DUPLICATE KEY UPDATE name=name
        """, (TENANT_ID, name))
    
    print(f"  ✅ Seeded {len(types)} property types")

def seed_property_statuses(cursor):
    """Seed property statuses"""
    print("📋 Seeding property statuses...")
    statuses = [
        ('FOR_SALE', 'For Sale', '#3b82f6'),
        ('FOR_RENT', 'For Rent', '#10b981'),
        ('SOLD_OUT', 'Sold Out', '#ef4444'),
        ('NOW_RENTED', 'Now Rented', '#8b5cf6'),
        ('HOLD', 'Hold', '#f59e0b'),
        ('RECYCLE', 'Recycle', '#6b7280'),
        ('UNKNOWN', 'Unknown', '#9ca3af')
    ]
    
    for code, name, color in statuses:
        cursor.execute("""
            INSERT INTO property_statuses (id, company_id, created_by_id, name, color, display_order, is_active)
            VALUES (UUID(), %s, %s, %s, %s, 1, TRUE)
            ON DUPLICATE KEY UPDATE name=name
        """, (TENANT_ID, USER_ID, name, color))
    
    print(f"  ✅ Seeded {len(statuses)} property statuses")

def seed_finishing_statuses(cursor):
    """Seed finishing statuses"""
    print("🎨 Seeding finishing statuses...")
    finishing = [
        ('FULLY_FINISHED', 'Fully Finished'),
        ('SEMI_FINISHED', 'Semi Finished'),
        ('FULLY_FURNISHED', 'Fully Furnished'),
        ('SKELETON', 'Skeleton'),
        ('SEMI_FURNITURE', 'Semi Furnished')
    ]
    
    for code, name in finishing:
        cursor.execute("""
            INSERT INTO finishing_statuses (id, company_id, created_by_id, name, display_order, is_active)
            VALUES (UUID(), %s, %s, %s, 1, TRUE)
            ON DUPLICATE KEY UPDATE name=name
        """, (TENANT_ID, USER_ID, name))
    
    print(f"  ✅ Seeded {len(finishing)} finishing statuses")

def seed_currencies(cursor):
    """Seed currencies"""
    print("💰 Seeding currencies...")
    currencies = [
        ('EGP', 'Egyptian Pound', 'E£'),
        ('USD', 'US Dollar', '$'),
        ('EUR', 'Euro', '€')
    ]
    
    for code, name, symbol in currencies:
        cursor.execute("""
            INSERT INTO currencies (id, code, name, symbol)
            VALUES (UUID(), %s, %s, %s)
            ON DUPLICATE KEY UPDATE name=name
        """, (code, name, symbol))
    
    print(f"  ✅ Seeded {len(currencies)} currencies")

def seed_regions(cursor):
    """Seed regions"""
    print("🗺️  Seeding regions...")
    regions = [
        ('NEW_CAIRO', 'New Cairo'),
        ('KATAMEYA', 'Katameya'),
        ('FIFTH_SETTLEMENT', '5th Settlement'),
        ('WEST_GOLF', 'West Golf'),
        ('HYDE_PARK', 'Hyde Park'),
        ('MIVIDA', 'Mivida'),
        ('UPTOWN_CAIRO', 'Uptown Cairo'),
        ('STELLA_HEIGHTS', 'Stella Heights'),
        ('MARASSI', 'Marassi'),
        ('NORTH_COAST', 'North Coast'),
        ('AIN_SOKHNA', 'Ain Sokhna'),
        ('OCTOBER', '6th of October'),
        ('MAADI', 'Maadi'),
        ('HELIOPOLIS', 'Heliopolis'),
        ('ZAMALEK', 'Zamalek'),
        ('NASR_CITY', 'Nasr City'),
        ('REHAB_CITY', 'Rehab City'),
        ('SHOROUK', 'Shorouk'),
        ('HELWAN', 'Helwan'),
        ('TAGAMOA', 'Tagamoa'),
        ('MOUNTAIN_VIEW', 'Mountain View'),
        ('PALM_HILLS', 'Palm Hills'),
        ('SODIC', 'Sodic'),
        ('EMAAR', 'Emaar'),
        ('COMPOUND_90', 'Compound 90'),
        ('EASTOWN', 'Eastown'),
        ('CAIRO_FESTIVAL_CITY', 'Cairo Festival City'),
        ('ALLEGRIA', 'Allegria'),
        ('ZAYED', 'Sheikh Zayed'),
        ('DOWNTOWN', 'Downtown'),
        ('GARDEN_CITY', 'Garden City'),
        ('MOHANDESSIN', 'Mohandessin'),
        ('DOKKI', 'Dokki'),
        ('AGOUZA', 'Agouza'),
        ('GIZA', 'Giza'),
        ('SMART_VILLAGE', 'Smart Village'),
        ('NEW_ZAYED', 'New Zayed')
    ]
    
    for code, name in regions:
        cursor.execute("""
            INSERT INTO regions (id, company_id, created_by_id, name, display_name, display_order, is_active)
            VALUES (UUID(), %s, %s, %s, %s, 1, TRUE)
            ON DUPLICATE KEY UPDATE name=name
        """, (TENANT_ID, USER_ID, name, name))
    
    print(f"  ✅ Seeded {len(regions)} regions")

def main():
    """Main seeding function"""
    print("="*60)
    print("🌱 SEEDING LOOKUP TABLES")
    print("="*60)
    print(f"Tenant: {TENANT_ID}")
    print(f"User: {USER_ID}")
    print("="*60)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        seed_property_categories(cursor)
        seed_property_types(cursor)
        seed_property_statuses(cursor)
        seed_finishing_statuses(cursor)
        seed_currencies(cursor)
        seed_regions(cursor)
        
        conn.commit()
        
        print("\n" + "="*60)
        print("✅ SEEDING COMPLETED SUCCESSFULLY!")
        print("="*60)
        
    except Exception as e:
        conn.rollback()
        print(f"\n❌ Error: {e}")
        raise
    
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    main()
