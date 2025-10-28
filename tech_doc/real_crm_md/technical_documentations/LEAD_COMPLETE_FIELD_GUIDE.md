# Complete Lead Fields Guide - Real Estate CRM

## 📋 ALL Lead Model Fields (After Adding Address Fields)

### 1. **Basic Information** (MANDATORY)
- ✅ `first_name` - First Name (CharField, max 100) **REQUIRED**
- ✅ `last_name` - Last Name (CharField, max 100) **REQUIRED**  
- ✅ `mobile` - Mobile Phone (CharField, max 20) **REQUIRED**

### 2. **Contact Information** (OPTIONAL)
- ✅ `email` - Email Address (EmailField)
- ✅ `phone` - Additional Phone (CharField, max 20)
- ✅ `company` - Company Name (CharField, max 200)
- ✅ `title` - Job Title (CharField, max 100)

### 3. **Address Information** (OPTIONAL) - **NEWLY ADDED**
- ✅ `address` - Street Address (CharField, max 500)
- ✅ `city` - City (CharField, max 100)
- ✅ `country` - Country (CharField, max 100)
- ✅ `postal_code` - Postal/ZIP Code (CharField, max 20)

### 4. **Lead Classification** (OPTIONAL - Foreign Keys)
- ✅ `lead_type` - Lead Type (ForeignKey to LeadType)
- ✅ `source` - Lead Source (ForeignKey to LeadSource)
- ✅ `status` - Lead Status (ForeignKey to LeadStatus)
- ✅ `priority` - Priority Level (ForeignKey to LeadPriority)
- ✅ `temperature` - Lead Temperature/Heat (ForeignKey to LeadTemperature)

### 5. **Property Interests** (OPTIONAL)
- ✅ `budget_min` - Minimum Budget (DecimalField, 15 digits, 2 decimals)
- ✅ `budget_max` - Maximum Budget (DecimalField, 15 digits, 2 decimals)
- ✅ `preferred_locations` - Preferred Locations (TextField - comma-separated)
- ✅ `property_type` - Property Type (CharField, max 100)
- ✅ `requirements` - Requirements/Notes (TextField)

### 6. **Lead Scoring & Tracking** (OPTIONAL)
- ✅ `score` - Lead Score 0-100 (IntegerField, default 0)
- ✅ `is_qualified` - Qualified Status (BooleanField, default False)

### 7. **Assignment & Ownership** (OPTIONAL)
- ✅ `assigned_to` - Assigned To User (ForeignKey to User)
- ✅ `created_by` - Created By User (ForeignKey to User)

### 8. **Communication Preferences** (OPTIONAL)
- ✅ `preferred_contact_method` - Preferred Method (CharField - email/mobile/phone/sms/whatsapp)
- ✅ `best_contact_time` - Best Time to Contact (CharField, max 100)

### 9. **Timestamps** (AUTOMATIC)
- ✅ `created_at` - Created Date/Time (DateTimeField, auto)
- ✅ `updated_at` - Last Updated Date/Time (DateTimeField, auto)
- ✅ `last_contacted` - Last Contact Date/Time (DateTimeField, nullable)
- ✅ `next_follow_up` - Next Follow-up Date/Time (DateTimeField, nullable)

### 10. **Conversion Tracking** (OPTIONAL)
- ✅ `converted_at` - Conversion Date/Time (DateTimeField, nullable)
- ✅ `conversion_value` - Conversion Value (DecimalField, 15 digits, 2 decimals)

### 11. **Additional Fields** (OPTIONAL)
- ✅ `notes` - General Notes (TextField)
- ✅ `tags` - Tags (CharField, max 500 - comma-separated)

---

## 🎨 How Fields Should Be Displayed in Detail Page

### **Section 1: Contact Information Card**
Display in a card with purple gradient icon:
- Full Name (first_name + last_name)
- Email (clickable mailto link)
- Mobile (clickable tel link)
- Phone (clickable tel link if exists)
- Company
- Job Title

### **Section 2: Address Information Card**
Display in a card with pink gradient icon:
- Street Address
- City
- Country
- Postal Code
- Show placeholder if all empty

### **Section 3: Property Interests Card**
Display in a card with blue gradient icon:
- Budget Range (computed from min/max)
- Minimum Budget
- Maximum Budget
- Property Type
- Preferred Locations
- Requirements

### **Section 4: Communication & Status Card**
Display in a card with green gradient icon:
- Preferred Contact Method
- Best Contact Time
- Status (with color badge)
- Source
- Priority (with badge)
- Temperature (with color badge)
- Lead Type
- Qualified Status (green badge if True)
- Last Contacted

### **Section 5: Lead Management Card**
Display in a card with yellow/pink gradient icon:
- Assigned To
- Created By
- Created Date
- Days Old (computed)
- Last Updated
- Lead Score (0-100)

### **Section 6: Conversion Tracking Card** (if converted)
Display only if converted_at is not null:
- Converted Date
- Conversion Value
- Days to Convert (computed)

### **Section 7: General Notes Card**
Display in a card with light pink gradient icon:
- Notes with line breaks
- Tags as badges

---

## 📝 Forms That Need These Fields

### **Create Lead Form** (add_lead.html)
Should include fields for:
- Basic: first_name, last_name, mobile
- Contact: email, phone, company, title
- Address: address, city, country, postal_code
- Classification: lead_type, source, status, priority, temperature
- Property: budget_min, budget_max, preferred_locations, property_type, requirements
- Communication: preferred_contact_method, best_contact_time
- Assignment: assigned_to
- Other: notes, tags

### **Edit Lead Form** (edit_lead.html)
Should include ALL fields from create form plus:
- is_qualified checkbox
- score field
- last_contacted
- next_follow_up

### **Import Lead Form** (import_leads.html)
Should map CSV columns to:
- All basic, contact, address fields
- All classification fields (with lookup by name)
- All property interest fields
- Communication preferences

---

## ✅ Migration Applied

Migration `0012_lead_address_lead_city_lead_country_lead_postal_code` has been applied.

The database now supports all these fields!

---

## 🚀 Next Steps

1. ✅ **Database Updated** - Address fields added
2. ⏳ **Update Detail Page** - Show all fields in organized cards
3. ⏳ **Update Create Form** - Include address fields
4. ⏳ **Update Edit Form** - Include all fields
5. ⏳ **Update Import System** - Now address fields will work!

All the fields are now available for use! 🎉
