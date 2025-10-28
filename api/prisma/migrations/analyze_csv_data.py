#!/usr/bin/env python3
"""
CSV Property Data Analyzer
Extracts unique dropdown values from property CSV files
"""
import csv
import json
from collections import defaultdict
from pathlib import Path

def analyze_csv_files():
    """Analyze all CSV files and extract unique values for dropdown fields"""
    
    csv_files = [
        'property_data_1.csv',
        'property_data_2.csv',
        'property_data_3.csv'
    ]
    
    # Fields that should be extracted as dropdown values
    dropdown_fields = {
        'Type': 'property_types',
        'Unit For': 'property_statuses',
        'Finished': 'finishing_statuses',
        'Area': 'regions',
        'The Floors': 'floor_levels',
        'STATUS': 'property_categories',
        'داخل كمبوند / خارج كمبوند': 'compound_status',
        'COMPOUND': 'compound_status_alt',
        'Phase': 'development_phases'
    }
    
    # Store unique values for each field
    unique_values = defaultdict(set)
    
    # Track all properties (for duplicate detection)
    all_properties = []
    property_numbers_seen = set()
    
    # Store column names from each file
    file_columns = {}
    
    for csv_file in csv_files:
        filepath = Path(__file__).parent / csv_file
        
        if not filepath.exists():
            print(f"⚠️  File not found: {csv_file}")
            continue
            
        print(f"\n📄 Analyzing {csv_file}...")
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                
                # Store column names
                file_columns[csv_file] = reader.fieldnames
                print(f"   Columns found: {len(reader.fieldnames)}")
                
                row_count = 0
                duplicate_count = 0
                
                for row in reader:
                    row_count += 1
                    
                    # Track property number for duplicate detection
                    prop_number = row.get('Property Number', '')
                    if prop_number:
                        if prop_number in property_numbers_seen:
                            duplicate_count += 1
                        else:
                            property_numbers_seen.add(prop_number)
                            all_properties.append({
                                'file': csv_file,
                                'property_number': prop_number,
                                'row': row
                            })
                    
                    # Extract dropdown values
                    for field_name, table_name in dropdown_fields.items():
                        value = row.get(field_name, '').strip()
                        if value and value != '????' and value != '':
                            unique_values[table_name].add(value)
                
                print(f"   ✅ Processed {row_count} rows ({duplicate_count} duplicates detected)")
                
        except Exception as e:
            print(f"   ❌ Error reading {csv_file}: {e}")
    
    # Print summary
    print("\n" + "="*60)
    print("📊 DROPDOWN VALUES SUMMARY")
    print("="*60)
    
    for table_name, values in sorted(unique_values.items()):
        print(f"\n{table_name.upper()}: {len(values)} unique values")
        for value in sorted(values):
            print(f"  • {value}")
    
    print("\n" + "="*60)
    print(f"📈 TOTAL STATISTICS")
    print("="*60)
    print(f"Unique properties: {len(all_properties)}")
    print(f"Total property numbers: {len(property_numbers_seen)}")
    print(f"Duplicates detected: {sum(1 for p in all_properties if all_properties.count(p) > 1)}")
    
    # Save analysis to JSON
    output = {
        'dropdown_values': {k: sorted(list(v)) for k, v in unique_values.items()},
        'statistics': {
            'unique_properties': len(all_properties),
            'total_property_numbers': len(property_numbers_seen),
            'files_analyzed': len(csv_files)
        },
        'file_columns': file_columns
    }
    
    output_path = Path(__file__).parent / 'csv_analysis.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Analysis saved to: {output_path}")
    
    return output

if __name__ == '__main__':
    analyze_csv_files()
