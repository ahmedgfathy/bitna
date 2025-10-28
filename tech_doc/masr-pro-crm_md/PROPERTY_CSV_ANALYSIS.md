# Property CSV Data Analysis Report

**Date:** October 13, 2025  
**Total Records:** 129,417 properties  
**Total Fields:** 50 columns

---

## 📊 Field Type Recommendations

### ✅ **DROPDOWN FIELDS** (Fixed Options)

#### 1. **Unit For** (Property Status) - Column 3
**Type:** SELECT (Single or Multi-select)  
**Options:**
- ✅ For Sale (2,653 records)
- ✅ For Rent (5,375 records)
- ✅ Sold Out (827 records)
- ✅ Now Rented (1,857 records) - *Fix typo from "Naw rented"*
- ✅ Hold Now (175 records) - *Fix typo from "Hold Naw"*
- ✅ Recycle (612 records)

**Note:** Some records have multiple statuses separated by `|##|` (e.g., "For Rent |##| For sale")  
**Recommendation:** Use **Multi-select dropdown** or **Checkbox group**

---

#### 2. **Finished** (Finishing Status) - Column 6
**Type:** SELECT (Single choice)  
**Options:**
- ✅ Fully Finished (7,065 records)
- ✅ Semi Finished (2,186 records)
- ✅ Fully Finished & Furnished (1,797 records)
- ✅ Semi Furniture (201 records)
- ✅ Skeleton/Core & Shell (117 records) - *From "Skeleton هيكل خرساني"*

---

#### 3. **Type** (Property Type) - Column 9
**Type:** SELECT (Single choice)  
**Top Options:**
- ✅ Apartment - Compound (2,936 records)
- ✅ Apartment - Outside (2,259 records)
- ✅ Stand Alone Villa - Compound (1,462 records)
- ✅ Office Space (1,027 records)
- ✅ Villa - Outside (725 records)
- ✅ Twin House (552 records)
- ✅ Retail (526 records)
- ✅ Duplex - Ground + Basement (452 records)
- ✅ Duplex - Ground + First (341 records)
- ✅ Duplex - Roof (232 records)
- ✅ Clinic (196 records)
- ✅ Studio (174 records)
- ✅ Chalet/شاليه (160 records)
- ✅ Townhouse - Mid (155 records)
- ✅ Townhouse - Corner (131 records)
- ✅ Roof (101 records)
- ✅ Basement (100 records)
- ✅ Admin Building (91 records)
- ✅ I Villa (65 records)
- ✅ Admin & Retail Building (56 records)

**Note:** Many numeric values and junk data exist - clean on import

---

#### 4. **STATUS** (Usage Type) - Column 38
**Type:** SELECT (Multi-select)  
**Options:**
- ✅ Residential (6,992 records)
- ✅ Administrative (1,052 records)
- ✅ Commercial (611 records)
- ✅ Residential Office (434 records)
- ✅ Clinics (181 records)

**Note:** Can have multiple types (e.g., "REIDENTIAL |##| ADMIN")  
**Recommendation:** Multi-select or Checkbox group

---

#### 5. **Currency** - Column 48
**Type:** SELECT (Single choice)  
**Options:**
- ✅ EGP (1,399 records) - Default
- ✅ USD (154 records)

---

#### 6. **Compound Type** (داخل كمبوند / خارج كمبوند) - Column 36
**Type:** RADIO BUTTONS  
**Options:**
- ✅ Inside Compound (6,806 records) - "داخل كمبوند"
- ✅ Outside Compound (3,988 records) - "خارج كمبوند"
- ✅ Commercial Area (1,140 records) - "مناطق تجاريه"

---

#### 7. **Property Offered By** - Column 12
**Type:** SELECT (Single choice)  
**Options:**
- ✅ Owner (5,772 records) - "المالك"
- ✅ Property Guard (125 records) - "حارس العقار"
- ✅ Owner Representative (113 records) - "مسؤل طرف المالك"
- ✅ Real Estate Office (47 records) - "مكتب عقاري"

---

### 📝 **TEXT INPUT FIELDS**

#### 8. **Property Number** - Column 1
**Type:** TEXT (Unique identifier)  
**Required:** ⭐ YES  
**Pattern:** "PRO" + number (e.g., PRO4, PRO5, PRO6)  
**Recommendation:** Auto-generate with prefix "PRO" + incrementing number

---

#### 9. **Building** (Building Size/Area) - Column 2
**Type:** TEXT or NUMBER  
**Format:** Number + "m" (e.g., "1700m", "600m", "200")  
**Common Values:** 200, 220, 250, 300, 350, 400, etc.  
**Recommendation:** Store as NUMBER (square meters), display with "m" suffix

---

#### 10. **Total Price** - Column 8
**Type:** NUMBER (Decimal)  
**Required:** ⭐ YES  
**Format:** Numeric value (e.g., 25000000, 25000)  
**Note:** Some have commas "25,000" - strip on import

---

#### 11. **SPACE PER METER** (Price per m²) - Column 4
**Type:** NUMBER (Decimal)  
**Recommendation:** Auto-calculate from Total Price ÷ Building Size

---

#### 12. **Land Area** - Column 35
**Type:** TEXT  
**Format:** Number + "m" (e.g., "720m", "450m")  
**Recommendation:** Store as NUMBER

---

#### 13. **Phase** - Column 7
**Type:** TEXT (Optional)  
**Usually Empty** - Can be removed or kept for future use

---

#### 14. **Unit NO** - Column 13
**Type:** TEXT  
**Examples:** "B33", "A12", "101"

---

#### 15. **BUILDING NAME** - Column 15
**Type:** TEXT  
**Examples:** Building numbers, compound sections

---

### 🗺️ **LOCATION FIELDS**

#### 16. **Area** (Location/Region) - Column 5
**Type:** SELECT or AUTOCOMPLETE  
**Total Unique:** 215 areas  
**Top Areas:**
- Mivida Emaar (1,048)
- سكني (944)
- Dar Masr (641)
- Eastown Sodic (571)
- Sector 2 (489)
- CFC (451)
- جنوب الاكاديمية (451)
- EL A7YAA (410)
- البنفسج فيلات (398)
- الياسمين فيلات (345)
- NARGS VILLAS (334)
- Uptown Cairo Emaar (313)
- Hyde Park (259)
- التجمع الاول (251)

**Recommendation:** AUTOCOMPLETE dropdown with search (too many to list)

---

#### 17. **Property Name - Compound Name** - Column 46
**Type:** TEXT or AUTOCOMPLETE  
**Total Unique:** 5,366 compound names  
**Recommendation:** AUTOCOMPLETE with suggestions based on Area selected

---

#### 18. **LOCATION MAP** - Column 17
**Type:** TEXT (URL)  
**Format:** Google Maps link or coordinates  
**UI:** Map picker or text input

---

### 📞 **CONTACT FIELDS**

#### 19. **Name** (Owner Name) - Column 14
**Type:** TEXT  
**Examples:** "D.Ramy", "madam nada", "مدام نادا"

---

#### 20. **Mobile No.** - Column 16
**Type:** TEXT (Phone)  
**Format:** Egyptian phone (010, 011, 012, 015, etc.)  
**Recommendation:** Phone input with validation

---

#### 21. **Tel** (Telephone) - Column 18
**Type:** TEXT (Phone)  
**Secondary phone number**

---

#### 22. **WHATSAPP LINK** - Column 19
**Type:** TEXT (URL)  
**Format:** WhatsApp link or phone number  
**UI:** Generate WhatsApp link button

---

### 📝 **DESCRIPTION FIELDS** (Textarea)

#### 23. **Description** - Column 11
**Type:** TEXTAREA (Rich text)  
**Primary Arabic description** of the property  
**Required:** Recommended ⭐

---

#### 24. **DESCRIPTION UNIT** - Column 45
**Type:** TEXTAREA  
**Additional description/notes**

---

#### 25. **Unit Features** (ممبزات الوحده) - Column 47
**Type:** TEXTAREA or TAGS  
**Examples:** "حمام سباحه", "جيم", "جاردن", "باركينج"  
**Recommendation:** Tag input for structured features OR simple textarea

---

#### 26. **UNIT FACILITIES** - Column 31
**Type:** TEXTAREA or TAGS  
**Features/amenities of the unit**

---

#### 27. **NOTE** - Column 29
**Type:** TEXTAREA  
**Internal notes** (e.g., "اتباعت من زمان اوى محدش يكلمه تانى")

---

### 🏗️ **PROPERTY DETAILS**

#### 28. **ROOMS** - Column 37
**Type:** NUMBER (Integer)  
**Common Values:** 1, 2, 3, 4, 5, 6, 7, 8, 9, 10  
**Most Common:** 3 bedrooms (3,722 records)  
**Note:** Some have "LIVING", "NANY" mixed in - clean on import  
**Recommendation:** Simple number input 0-20

---

#### 29. **The Floors** (Floor Level) - Column 34
**Type:** TEXT or MULTI-SELECT  
**Common Values:**
- اول (First Floor) - 2,020
- أرضي (Ground Floor) - 1,843
- ثاني (Second Floor) - 1,667
- ثالث (Third Floor) - 755
- ارضي + اول (Ground + First) - 668
- رابع (Fourth Floor) - 316
- بيزمنت (Basement) - 197
- رووف (Roof) - 153

**Note:** Multi-floor format: "بيزمنت |##| أرضي |##| اول |##| رووف"  
**Recommendation:** Multi-select checkboxes:
- [ ] Basement
- [ ] Ground Floor
- [ ] 1st Floor
- [ ] 2nd Floor
- [ ] 3rd Floor
- [ ] 4th Floor
- [ ] 5th Floor
- [ ] Roof

---

#### 30. **UNIT LICENSE** - Column 32
**Type:** TEXT  
**License information**

---

#### 31. **Activity** (النشاط) - Column 33
**Type:** TEXT  
**Business activity type**

---

### 📅 **ACTIVITY TRACKING FIELDS**

#### 32. **Created Time** - Column 23
**Type:** TIMESTAMP  
**Format:** "08-05-2017 22:56:14"  
**Recommendation:** Auto-generated on creation

---

#### 33. **Modified Time** - Column 25
**Type:** TIMESTAMP  
**Format:** "19-11-2024 09:50:43"  
**Recommendation:** Auto-updated on save

---

#### 34. **Last Follow in** - Column 26
**Type:** DATE  
**Format:** "19-07-2023"  
**Recommendation:** Manual date picker for last follow-up

---

#### 35. **RIMINDER DATE** - Column 28
**Type:** DATE  
**Follow-up reminder date**

---

#### 36. **RIMINDER TIME** - Column 27
**Type:** TIME  
**Follow-up reminder time**

---

#### 37. **Call Updates** (ابديت المكالمات) - Column 20
**Type:** TEXTAREA  
**Call history/notes**

---

#### 38. **URGENT UBDATE** - Column 21
**Type:** TEXTAREA  
**Urgent updates/notes**

---

#### 39. **4 UBDATE** - Column 22
**Type:** TEXTAREA  
**Additional updates**

---

#### 40. **UBDATE BY** - Column 24
**Type:** TEXT (User)  
**Who made the update**

---

#### 41. **Last Modified By** - Column 50
**Type:** TEXT (User)  
**Link to users table**

---

### 🖼️ **MEDIA FIELDS**

#### 42. **Property Image** - Column 41
**Type:** FILE UPLOAD (Multiple)  
**Format:** Comma-separated image filenames  
**Example:** "WhatsApp_Image_2017-05-09_at_12.51.31_AM.jpeg,WhatsApp_Image_2017-05-09_at_12.51.28_AM.jpeg"  
**Recommendation:** Array field `TEXT[]` in database, image gallery UI

---

#### 43. **Links PDF Details and Photos** - Column 49
**Type:** TEXT (URLs)  
**PDF documents and photo links**

---

### 👤 **ASSIGNMENT FIELDS**

#### 44. **Sales** - Column 42
**Type:** SELECT (User)  
**Examples:** "arafa hamzawy", "admin"  
**Recommendation:** Dropdown linked to users table

---

#### 45. **Handler** - Column 43
**Type:** SELECT (User)  
**Examples:** "admin"  
**Recommendation:** Dropdown linked to users table

---

#### 46. **Category** - Column 44
**Type:** TEXT or SELECT  
**Property category/classification**

---

### ❓ **UNCLEAR/OPTIONAL FIELDS**

#### 47. **Rent To** - Column 10
**Type:** TEXT  
**Usually "--" (empty)**  
**Recommendation:** Remove or keep as optional text field

---

#### 48. **OFFER TYPE** - Column 30
**Type:** TEXT  
**Only 1 record has "RENT"**  
**Recommendation:** Remove (use "Unit For" instead)

---

#### 49. **RIGHT SRES** - Column 39
**Type:** TEXT  
**Unknown purpose - mostly empty**

---

#### 50. **SEND A MESSAGE** - Column 40
**Type:** TEXT  
**Unknown purpose - mostly empty**

---

## 🎯 **FINAL RECOMMENDATIONS**

### **Required Fields (5):**
1. ⭐ Property Number (auto-generated)
2. ⭐ Property Type (dropdown)
3. ⭐ Area/Location (autocomplete)
4. ⭐ Total Price (number)
5. ⭐ Unit For/Status (multi-select: For Sale, For Rent, etc.)

### **High Priority Fields (15):**
- Building Size (number)
- Land Area (number)
- Finished Status (dropdown)
- Compound Type (radio: Inside/Outside)
- Rooms (number)
- Floors (multi-select checkboxes)
- Description (textarea)
- Owner Name (text)
- Mobile Number (phone)
- Property Images (file upload)
- Sales Person (user select)
- Handler (user select)
- Created/Modified timestamps
- Currency (dropdown: EGP/USD)
- Usage Type/STATUS (multi-select: Residential, Admin, etc.)

### **Medium Priority (10):**
- Unit NO
- Building Name
- Compound Name
- Unit Features
- Unit Facilities
- Property Offered By
- WhatsApp Link
- Location Map
- Last Follow Date
- Reminder Date/Time

### **Low Priority (Keep for data migration, hide in UI):**
- Phase
- Space Per Meter (calculate)
- License
- Activity
- Call Updates
- Urgent Updates
- Notes
- PDF Links
- Category

### **Fields to Remove:**
- Rent To (always empty)
- OFFER TYPE (use Unit For instead)
- RIGHT SRES (unknown)
- SEND A MESSAGE (unknown)
- 4 UBDATE (unclear)
- UBDATE BY (use system user tracking)

---

## 🗄️ **Database Schema Suggestion**

```sql
CREATE TABLE properties (
  -- Core Fields (Required)
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_number TEXT UNIQUE NOT NULL,
  property_type TEXT NOT NULL,
  area_location TEXT NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT[] NOT NULL DEFAULT '{}', -- Array for multi-status
  
  -- Pricing
  currency TEXT DEFAULT 'EGP',
  space_per_meter NUMERIC,
  
  -- Property Details
  building_size NUMERIC, -- in square meters
  land_area NUMERIC, -- in square meters
  rooms INTEGER,
  floors TEXT[], -- Array: basement, ground, first, etc.
  finished_status TEXT,
  compound_type TEXT, -- inside/outside/commercial
  unit_no TEXT,
  building_name TEXT,
  phase TEXT,
  
  -- Location
  compound_name TEXT,
  location_map TEXT, -- Google Maps URL
  
  -- Descriptions
  description TEXT,
  description_unit TEXT,
  unit_features TEXT, -- or JSONB for structured
  unit_facilities TEXT,
  
  -- Owner/Contact
  offered_by TEXT,
  owner_name TEXT,
  mobile_no TEXT,
  telephone TEXT,
  whatsapp_link TEXT,
  
  -- Usage Type
  usage_type TEXT[], -- Residential, Admin, Commercial, etc.
  
  -- Media
  property_images TEXT[] DEFAULT '{}',
  pdf_links TEXT,
  
  -- Assignment
  sales_person UUID REFERENCES auth.users(id),
  handler UUID REFERENCES auth.users(id),
  category TEXT,
  
  -- Activity Tracking
  last_follow_date DATE,
  reminder_date DATE,
  reminder_time TIME,
  notes TEXT,
  call_updates TEXT,
  urgent_updates TEXT,
  
  -- License/Compliance
  unit_license TEXT,
  activity TEXT,
  
  -- System Fields
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  last_modified_by UUID REFERENCES auth.users(id)
);

-- Indexes for performance
CREATE INDEX idx_properties_area ON properties(area_location);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_status ON properties USING GIN(status);
CREATE INDEX idx_properties_sales ON properties(sales_person);
CREATE INDEX idx_properties_price ON properties(total_price);
```

---

## 📋 **UI Layout Suggestion**

### **Tab 1: Overview** (Default - Most Important)
- Left Column: Property Number, Type, Area, Building Size, Unit NO
- Right Column: Price, Currency, Status, Rooms, Floors

### **Tab 2: Details**
- Finished Status, Compound Type, Land Area, Unit Facilities, Unit Features

### **Tab 3: Description**
- Description (main), Description Unit, Location Map

### **Tab 4: Owner/Contact**
- Offered By, Owner Name, Mobile, Tel, WhatsApp

### **Tab 5: Media**
- Image Gallery, PDF Links

### **Tab 6: Assignment & Activity**
- Sales Person, Handler, Category, Last Follow Date, Reminders, Notes

### **Tab 7: Related Leads** (Future)
- List of leads interested in this property

---

## ✅ **Next Steps**

1. **Create database migration** with fields above
2. **Build Properties page** (list view with filters)
3. **Create PropertyDetails component** (tabs layout)
4. **Build CSV import** with column mapping (reuse leads import logic)
5. **Add image upload** functionality
6. **Create property-lead relationship** table (many-to-many)

Would you like me to proceed with implementation?
