/**
 * CSV Import Service with Intelligent Field Mapping
 * Automatically detects and maps CSV columns to application fields
 */

interface FieldMapping {
  csvColumn: string;
  appField: string;
  confidence: number;
}

interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: Array<{ row: number; error: string }>;
  data: any[];
}

class CSVImportService {
  // Field patterns for intelligent mapping
  private fieldPatterns = {
    // Name patterns
    fullName: [
      'full name', 'fullname', 'name', 'client name', 'customer name',
      'lead name', 'contact name', 'person name', 'الاسم', 'اسم العميل'
    ],
    firstName: [
      'first name', 'firstname', 'fname', 'given name', 'forename',
      'الاسم الأول', 'الاسم'
    ],
    lastName: [
      'last name', 'lastname', 'lname', 'surname', 'family name',
      'الاسم الأخير', 'اسم العائلة'
    ],
    
    // Contact patterns
    mobile: [
      'mobile', 'phone', 'cell', 'mobile number', 'phone number',
      'telephone', 'contact', 'mobile no', 'phone no', 'tel',
      'رقم الجوال', 'رقم الهاتف', 'جوال', 'هاتف'
    ],
    email: [
      'email', 'e-mail', 'email address', 'mail', 'البريد الإلكتروني',
      'ايميل', 'بريد'
    ],
    
    // Lead-specific patterns
    source: [
      'source', 'lead source', 'origin', 'channel', 'referral',
      'came from', 'how did you hear', 'المصدر', 'مصدر العميل'
    ],
    status: [
      'status', 'lead status', 'state', 'stage', 'الحالة', 'حالة العميل'
    ],
    type: [
      'type', 'lead type', 'category', 'classification', 'النوع',
      'نوع العميل', 'التصنيف'
    ],
    
    // Additional fields
    notes: [
      'notes', 'note', 'comments', 'comment', 'description', 'remarks',
      'details', 'info', 'information', 'ملاحظات', 'تعليقات', 'وصف'
    ],
    address: [
      'address', 'location', 'street', 'city', 'area', 'district',
      'العنوان', 'الموقع', 'المنطقة'
    ],
    company: [
      'company', 'organization', 'business', 'firm', 'الشركة', 'المؤسسة'
    ],
    budget: [
      'budget', 'price range', 'budget range', 'max price', 'الميزانية',
      'السعر', 'نطاق السعر'
    ],
    propertyType: [
      'property type', 'type of property', 'property category',
      'نوع العقار', 'تصنيف العقار'
    ],
    assignedTo: [
      'assigned to', 'agent', 'assigned agent', 'owner', 'responsible',
      'المسؤول', 'الوكيل'
    ],
    priority: [
      'priority', 'importance', 'urgency', 'الأولوية', 'الأهمية'
    ],
    createdDate: [
      'created', 'date', 'created date', 'date created', 'registration date',
      'التاريخ', 'تاريخ الإنشاء'
    ],
    
    // Property-specific patterns
    title: [
      'title', 'property title', 'name', 'property name', 'heading', 
      'compound', 'compound name', 'project', 'project name',
      'properties name', 'properties compound', 'property compound',
      'العنوان', 'عنوان العقار', 'المجمع', 'اسم المجمع', 'اسم العقار'
    ],
    description: [
      'description', 'details', 'info', 'property description', 'الوصف',
      'تفاصيل', 'معلومات', 'property details'
    ],
    price: [
      'price', 'cost', 'amount', 'value', 'السعر', 'القيمة', 'التكلفة'
    ],
    currency: [
      'currency', 'money type', 'العملة'
    ],
    area: [
      'area', 'size', 'sqm', 'square meters', 'sqft', 'square feet',
      'المساحة', 'الحجم'
    ],
    bedrooms: [
      'bedrooms', 'beds', 'bed', 'bedroom', 'br', 'غرف النوم', 'غرف'
    ],
    bathrooms: [
      'bathrooms', 'baths', 'bath', 'bathroom', 'الحمامات', 'دورات مياه'
    ],
    location: [
      'location', 'place', 'where', 'الموقع', 'المكان'
    ],
    city: [
      'city', 'المدينة'
    ],
    region: [
      'region', 'area', 'district', 'neighborhood', 'المنطقة', 'الحي'
    ],
    listingType: [
      'listing type', 'for', 'sale or rent', 'category', 'نوع العرض',
      'للبيع أو الإيجار'
    ],
    propertyStatus: [
      'status', 'property status', 'available', 'availability', 'حالة العقار'
    ],
    amenities: [
      'amenities', 'features', 'facilities', 'المرافق', 'المزايا', 'الخدمات'
    ],
    imageUrl: [
      'image', 'photo', 'picture', 'image url', 'photo url', 'الصورة',
      'رابط الصورة'
    ],
    latitude: [
      'latitude', 'lat', 'خط العرض'
    ],
    longitude: [
      'longitude', 'lng', 'long', 'خط الطول'
    ]
  };

  /**
   * Parse CSV content to array of objects
   */
  parseCSV(csvContent: string): any[] {
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) return [];

    // Get headers
    const headers = this.parseCSVLine(lines[0]);
    
    // Parse data rows
    const data: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = this.parseCSVLine(lines[i]);
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim() || '';
      });
      
      data.push(row);
    }
    
    return data;
  }

  /**
   * Parse a single CSV line handling quoted values
   */
  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  /**
   * Detect and map CSV columns to application fields
   */
  detectFieldMapping(csvHeaders: string[]): Map<string, FieldMapping> {
    const mappings = new Map<string, FieldMapping>();
    
    csvHeaders.forEach(header => {
      const normalizedHeader = header.toLowerCase().trim();
      
      // Check each field pattern
      for (const [appField, patterns] of Object.entries(this.fieldPatterns)) {
        for (const pattern of patterns) {
          if (normalizedHeader.includes(pattern.toLowerCase())) {
            const existingMapping = mappings.get(appField);
            const confidence = normalizedHeader === pattern.toLowerCase() ? 1.0 : 0.8;
            
            // Use this mapping if it's more confident or doesn't exist
            if (!existingMapping || confidence > existingMapping.confidence) {
              mappings.set(appField, {
                csvColumn: header,
                appField,
                confidence
              });
            }
            break;
          }
        }
      }
    });
    
    return mappings;
  }

  /**
   * Combine first and last name into full name
   */
  private combineNames(firstName?: string, lastName?: string, fullName?: string): string {
    if (fullName && fullName.trim()) return fullName.trim();
    
    const first = firstName?.trim() || '';
    const last = lastName?.trim() || '';
    
    const combined = `${first} ${last}`.trim();
    
    // Return combined name or placeholder if empty
    return combined || 'No Name';
  }

  /**
   * Clean and validate phone number
   */
  private cleanPhoneNumber(phone?: string): string {
    if (!phone) return '';
    
    // Remove all non-numeric characters except +
    let cleaned = phone.replace(/[^\d+]/g, '');
    
    // If it starts with 00, replace with +
    if (cleaned.startsWith('00')) {
      cleaned = '+' + cleaned.substring(2);
    }
    
    // If no country code and looks like Egyptian number, add +20
    if (!cleaned.startsWith('+') && cleaned.length === 11 && cleaned.startsWith('0')) {
      cleaned = '+20' + cleaned.substring(1);
    }
    
    return cleaned;
  }

  /**
   * Predict lead source from various indicators
   */
  private predictSource(data: any, mapping: Map<string, FieldMapping>): string {
    const sourceMapping = mapping.get('source');
    if (sourceMapping && data[sourceMapping.csvColumn]) {
      return data[sourceMapping.csvColumn];
    }
    
    // Check if source can be inferred from other fields
    const allValues = Object.values(data).join(' ').toLowerCase();
    
    if (allValues.includes('facebook') || allValues.includes('fb')) return 'Facebook';
    if (allValues.includes('instagram') || allValues.includes('ig')) return 'Instagram';
    if (allValues.includes('website') || allValues.includes('web')) return 'Website';
    if (allValues.includes('referral') || allValues.includes('reference')) return 'Referral';
    if (allValues.includes('call') || allValues.includes('phone')) return 'Phone Call';
    if (allValues.includes('email') || allValues.includes('mail')) return 'Email';
    if (allValues.includes('walk in') || allValues.includes('walkin')) return 'Walk-in';
    
    return 'Other';
  }

  /**
   * Predict lead status from various indicators
   */
  private predictStatus(data: any, mapping: Map<string, FieldMapping>): string {
    const statusMapping = mapping.get('status');
    if (statusMapping && data[statusMapping.csvColumn]) {
      const status = data[statusMapping.csvColumn].toLowerCase();
      
      if (status.includes('new') || status.includes('fresh')) return 'new';
      if (status.includes('contact') || status.includes('reach')) return 'contacted';
      if (status.includes('qualif')) return 'qualified';
      if (status.includes('negot')) return 'negotiating';
      if (status.includes('convert') || status.includes('won') || status.includes('success')) return 'converted';
      if (status.includes('lost') || status.includes('reject') || status.includes('cancel')) return 'lost';
    }
    
    return 'new';
  }

  /**
   * Predict lead type
   */
  private predictType(data: any, mapping: Map<string, FieldMapping>): string {
    const typeMapping = mapping.get('type');
    if (typeMapping && data[typeMapping.csvColumn]) {
      const type = data[typeMapping.csvColumn].toLowerCase();
      
      if (type.includes('buy')) return 'buyer';
      if (type.includes('sell')) return 'seller';
      if (type.includes('rent')) return 'renter';
      if (type.includes('invest')) return 'investor';
    }
    
    // Try to predict from notes or other fields
    const allValues = Object.values(data).join(' ').toLowerCase();
    
    if (allValues.includes('buy') || allValues.includes('purchase')) return 'buyer';
    if (allValues.includes('sell') || allValues.includes('sale')) return 'seller';
    if (allValues.includes('rent') || allValues.includes('lease')) return 'renter';
    if (allValues.includes('invest')) return 'investor';
    
    return 'buyer';
  }

  /**
   * Map CSV row to Lead object
   */
  mapToLead(row: any, mapping: Map<string, FieldMapping>): any {
    const firstNameMapping = mapping.get('firstName');
    const lastNameMapping = mapping.get('lastName');
    const fullNameMapping = mapping.get('fullName');
    const mobileMapping = mapping.get('mobile');
    const emailMapping = mapping.get('email');
    const notesMapping = mapping.get('notes');
    const addressMapping = mapping.get('address');
    const companyMapping = mapping.get('company');
    const budgetMapping = mapping.get('budget');
    const propertyTypeMapping = mapping.get('propertyType');
    const priorityMapping = mapping.get('priority');

    // Combine name fields
    const fullName = this.combineNames(
      firstNameMapping ? row[firstNameMapping.csvColumn] : undefined,
      lastNameMapping ? row[lastNameMapping.csvColumn] : undefined,
      fullNameMapping ? row[fullNameMapping.csvColumn] : undefined
    );

    // Clean phone number
    const mobile = this.cleanPhoneNumber(
      mobileMapping ? row[mobileMapping.csvColumn] : undefined
    );

    // Build notes from multiple sources
    let notes = notesMapping ? row[notesMapping.csvColumn] : '';
    if (addressMapping && row[addressMapping.csvColumn]) {
      notes += (notes ? '\n' : '') + `Address: ${row[addressMapping.csvColumn]}`;
    }
    if (companyMapping && row[companyMapping.csvColumn]) {
      notes += (notes ? '\n' : '') + `Company: ${row[companyMapping.csvColumn]}`;
    }
    if (budgetMapping && row[budgetMapping.csvColumn]) {
      notes += (notes ? '\n' : '') + `Budget: ${row[budgetMapping.csvColumn]}`;
    }
    if (propertyTypeMapping && row[propertyTypeMapping.csvColumn]) {
      notes += (notes ? '\n' : '') + `Property Type: ${row[propertyTypeMapping.csvColumn]}`;
    }

    return {
      name: fullName,
      phone: mobile,
      email: emailMapping ? row[emailMapping.csvColumn] : '',
      source: this.predictSource(row, mapping),
      status: this.predictStatus(row, mapping),
      type: this.predictType(row, mapping),
      notes: notes.trim(),
      priority: priorityMapping ? row[priorityMapping.csvColumn] : 'medium',
    };
  }

  /**
   * Import leads from CSV
   */
  async importLeads(csvContent: string): Promise<ImportResult> {
    const result: ImportResult = {
      success: true,
      imported: 0,
      failed: 0,
      errors: [],
      data: []
    };

    try {
      // Parse CSV
      const rows = this.parseCSV(csvContent);
      if (rows.length === 0) {
        throw new Error('No data found in CSV file');
      }

      // Detect field mapping
      const headers = Object.keys(rows[0]);
      const mapping = this.detectFieldMapping(headers);

      console.log('Detected mappings:', Array.from(mapping.entries()));

      // Process each row
      rows.forEach((row, index) => {
        try {
          const lead = this.mapToLead(row, mapping);
          
          // No validation - accept all data
          // Users can have leads with missing phone numbers or names
          
          result.data.push(lead);
          result.imported++;
        } catch (error: any) {
          result.failed++;
          result.errors.push({
            row: index + 2, // +2 because of 0-index and header row
            error: error.message
          });
        }
      });

      result.success = result.failed === 0;
    } catch (error: any) {
      result.success = false;
      result.errors.push({
        row: 0,
        error: error.message
      });
    }

    return result;
  }

  /**
   * Generate sample CSV template for leads
   */
  generateLeadsTemplate(): string {
    const headers = [
      'Full Name',
      'Mobile Number',
      'Email',
      'Source',
      'Status',
      'Type',
      'Notes',
      'Budget',
      'Property Type',
      'Priority'
    ];

    const sampleData = [
      [
        'Ahmed Hassan',
        '01001234567',
        'ahmed@example.com',
        'Website',
        'new',
        'buyer',
        'Looking for 3BR apartment',
        '2,000,000 EGP',
        'Apartment',
        'high'
      ],
      [
        'Sara Mohamed',
        '01112345678',
        'sara@example.com',
        'Facebook',
        'contacted',
        'renter',
        'Needs villa in New Cairo',
        '15,000 EGP/month',
        'Villa',
        'medium'
      ]
    ];

    let csv = headers.join(',') + '\n';
    sampleData.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    return csv;
  }

  /**
   * Map CSV row to Property object
   */
  private mapToProperty(
    row: any,
    mapping: Map<string, FieldMapping>
  ): any | null {
    try {
      const property: any = {};

      // Title (check multiple possible fields)
      const titleMapping = mapping.get('title');
      if (titleMapping && row[titleMapping.csvColumn]) {
        property.title = row[titleMapping.csvColumn];
      } else {
        // Try to find title in raw data with common column names
        const possibleTitles = [
          'property name', 'properties name', 'compound', 'compound name',
          'properties compound', 'property compound', 'project', 'name', 'title'
        ];
        
        for (const key of Object.keys(row)) {
          const lowerKey = key.toLowerCase().trim();
          if (possibleTitles.some(pt => lowerKey.includes(pt)) && row[key]) {
            property.title = row[key];
            break;
          }
        }
        
        // If still no title, use a placeholder
        if (!property.title) {
          property.title = 'Untitled Property';
        }
      }

      // Description
      const descMapping = mapping.get('description');
      if (descMapping) {
        property.description = row[descMapping.csvColumn] || '';
      }

      // Price (optional - default to 0)
      const priceMapping = mapping.get('price');
      if (priceMapping) {
        const priceStr = row[priceMapping.csvColumn]?.replace(/[^0-9.]/g, '');
        property.price = parseFloat(priceStr) || 0;
      } else {
        property.price = 0;
      }

      // Location/Address
      const locationMapping = mapping.get('location') || mapping.get('address');
      if (locationMapping) {
        property.location = row[locationMapping.csvColumn] || '';
      }

      // City & Region
      const cityMapping = mapping.get('city');
      if (cityMapping) {
        property.city = row[cityMapping.csvColumn] || '';
      }

      const regionMapping = mapping.get('region');
      if (regionMapping) {
        property.region = row[regionMapping.csvColumn] || '';
      }

      // If no location but have city/region, combine them
      if (!property.location && (property.city || property.region)) {
        property.location = [property.region, property.city]
          .filter(Boolean)
          .join(', ');
      }

      // Area
      const areaMapping = mapping.get('area');
      if (areaMapping) {
        const areaStr = row[areaMapping.csvColumn]?.replace(/[^0-9.]/g, '');
        property.area = parseFloat(areaStr) || undefined;
      }

      // Bedrooms
      const bedroomsMapping = mapping.get('bedrooms');
      if (bedroomsMapping) {
        const bedStr = row[bedroomsMapping.csvColumn]?.replace(/[^0-9]/g, '');
        property.bedrooms = parseInt(bedStr) || undefined;
      }

      // Bathrooms
      const bathroomsMapping = mapping.get('bathrooms');
      if (bathroomsMapping) {
        const bathStr = row[bathroomsMapping.csvColumn]?.replace(/[^0-9]/g, '');
        property.bathrooms = parseInt(bathStr) || undefined;
      }

      // Property Type
      const propertyTypeMapping = mapping.get('propertyType');
      if (propertyTypeMapping) {
        property.propertyType = row[propertyTypeMapping.csvColumn] || 'Apartment';
      } else {
        // Predict property type from title/description
        property.propertyType = this.predictPropertyType(property.title + ' ' + property.description);
      }

      // Listing Type (For Sale, For Rent)
      const listingTypeMapping = mapping.get('listingType') || mapping.get('category');
      if (listingTypeMapping) {
        property.category = row[listingTypeMapping.csvColumn] || 'For Sale';
      } else {
        // Predict from data
        property.category = this.predictListingType(
          property.title + ' ' + property.description + ' ' + property.price
        );
      }

      // Status
      const statusMapping = mapping.get('propertyStatus') || mapping.get('status');
      if (statusMapping) {
        property.status = row[statusMapping.csvColumn] || 'available';
      } else {
        property.status = 'available';
      }

      // Image URL
      const imageMapping = mapping.get('imageUrl');
      if (imageMapping) {
        property.imageUrl = row[imageMapping.csvColumn] || undefined;
      }

      // Coordinates
      const latMapping = mapping.get('latitude');
      const lngMapping = mapping.get('longitude');
      if (latMapping && lngMapping) {
        property.latitude = parseFloat(row[latMapping.csvColumn]) || undefined;
        property.longitude = parseFloat(row[lngMapping.csvColumn]) || undefined;
      }

      // Amenities/Features
      const amenitiesMapping = mapping.get('amenities');
      if (amenitiesMapping) {
        property.amenities = row[amenitiesMapping.csvColumn] || undefined;
      }

      // Set public flag
      property.isPublic = property.status === 'available';

      return property;
    } catch (error: any) {
      throw new Error(error.message || 'Invalid property data');
    }
  }

  /**
   * Predict property type from text
   */
  private predictPropertyType(text: string): string {
    const lower = text.toLowerCase();

    if (lower.includes('villa') || lower.includes('فيلا')) return 'Villa';
    if (lower.includes('apartment') || lower.includes('شقة')) return 'Apartment';
    if (lower.includes('penthouse') || lower.includes('بنتهاوس')) return 'Penthouse';
    if (lower.includes('studio') || lower.includes('ستوديو')) return 'Studio';
    if (lower.includes('townhouse') || lower.includes('تاون هاوس')) return 'Townhouse';
    if (lower.includes('duplex') || lower.includes('دوبلكس')) return 'Duplex';
    if (lower.includes('chalet') || lower.includes('شاليه')) return 'Chalet';
    if (lower.includes('office') || lower.includes('مكتب')) return 'Commercial';
    if (lower.includes('shop') || lower.includes('محل')) return 'Commercial';
    if (lower.includes('land') || lower.includes('أرض')) return 'Land';

    return 'Apartment'; // Default
  }

  /**
   * Predict listing type (For Sale vs For Rent)
   */
  private predictListingType(text: string): string {
    const lower = text.toLowerCase();

    // Check for rent keywords
    if (
      lower.includes('rent') ||
      lower.includes('lease') ||
      lower.includes('للإيجار') ||
      lower.includes('ايجار') ||
      lower.includes('monthly') ||
      lower.includes('شهري')
    ) {
      return 'For Rent';
    }

    // Check for sale keywords
    if (
      lower.includes('sale') ||
      lower.includes('buy') ||
      lower.includes('للبيع') ||
      lower.includes('بيع') ||
      lower.includes('purchase')
    ) {
      return 'For Sale';
    }

    // Default based on price (high price = sale, low = rent)
    const priceMatch = text.match(/\d+/);
    if (priceMatch) {
      const price = parseInt(priceMatch[0]);
      return price > 100000 ? 'For Sale' : 'For Rent';
    }

    return 'For Sale'; // Default
  }

  /**
   * Import properties from CSV content
   */
  async importProperties(csvContent: string): Promise<ImportResult> {
    try {
      console.log('🎯 Starting CSV property import...');
      
      // Parse CSV
      const rows = this.parseCSV(csvContent);
      console.log('📄 Parsed', rows.length, 'rows from CSV');
      
      if (rows.length === 0) {
        return {
          success: false,
          imported: 0,
          failed: 0,
          errors: [{ row: 0, error: 'CSV file is empty or invalid' }],
          data: []
        };
      }

      // Detect field mapping
      const headers = Object.keys(rows[0]);
      console.log('📋 CSV Headers:', headers);
      
      const mapping = this.detectFieldMapping(headers);
      console.log('🔍 Detected field mappings:', Array.from(mapping.entries()));

      // Import properties
      const properties: any[] = [];
      const errors: Array<{ row: number; error: string }> = [];

      for (let i = 0; i < rows.length; i++) {
        try {
          const property = this.mapToProperty(rows[i], mapping);
          if (property) {
            if (i === 0) {
              console.log('✅ First property mapped:', property);
            }
            properties.push(property);
          }
        } catch (error: any) {
          console.error(`❌ Error mapping row ${i + 2}:`, error.message);
          errors.push({
            row: i + 2, // +2 because row 1 is headers, arrays are 0-indexed
            error: error.message || 'Failed to import property'
          });
        }
      }

      console.log('✅ Successfully mapped', properties.length, 'properties');
      console.log('❌ Failed to map', errors.length, 'properties');

      return {
        success: properties.length > 0,
        imported: properties.length,
        failed: errors.length,
        errors,
        data: properties
      };
    } catch (error: any) {
      console.error('❌ Property import failed:', error);
      return {
        success: false,
        imported: 0,
        failed: 0,
        errors: [{ row: 0, error: error.message || 'Import failed' }],
        data: []
      };
    }
  }

  /**
   * Generate sample CSV template for properties
   */
  generatePropertiesTemplate(): string {
    const headers = [
      'Title',
      'Description',
      'Price',
      'Location',
      'City',
      'Region',
      'Property Type',
      'Listing Type',
      'Area (sqm)',
      'Bedrooms',
      'Bathrooms',
      'Status',
      'Image URL'
    ];

    const sampleData = [
      [
        'Luxury Villa - New Cairo',
        'Modern 5-bedroom villa with pool and garden',
        '12000000',
        'Fifth Settlement, New Cairo',
        'Cairo',
        'New Cairo',
        'Villa',
        'For Sale',
        '500',
        '5',
        '4',
        'available',
        'https://example.com/villa.jpg'
      ],
      [
        'Apartment in Zamalek',
        'Spacious 3BR apartment with Nile view',
        '15000',
        'Zamalek, Cairo',
        'Cairo',
        'Zamalek',
        'Apartment',
        'For Rent',
        '200',
        '3',
        '2',
        'available',
        'https://example.com/apartment.jpg'
      ],
      [
        'Beachfront Chalet - North Coast',
        'Beautiful chalet with private beach access',
        '8000000',
        'Hacienda Bay, North Coast',
        'Matrouh',
        'North Coast',
        'Chalet',
        'For Sale',
        '150',
        '3',
        '2',
        'available',
        'https://example.com/chalet.jpg'
      ]
    ];

    let csv = headers.join(',') + '\n';
    sampleData.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    return csv;
  }
}

export default new CSVImportService();
