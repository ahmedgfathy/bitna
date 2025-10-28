"""
CONTACTS MODULE - COMPREHENSIVE IMPLEMENTATION GUIDE
=====================================================

This document provides a complete implementation plan for the Contacts module.

## Overview
The Contacts module is designed to be identical to the Leads module with one key difference:
- Contacts can be created directly OR converted from Leads
- A "Convert to Contact" button appears on Lead detail pages
- Once converted, the Contact retains a reference to the original Lead

## Files to Create (Total: 18 files)

### 1. Models (DONE ✅)
- /contacts/models.py (403 lines)
  - Contact, ContactSource, ContactType, ContactPriority, ContactStatus
  - ContactActivity, ContactNote, ContactDocument
  - Key field: `converted_from_lead` (ForeignKey to Lead)

### 2. Admin (DONE ✅)
- /contacts/admin.py (91 lines)

### 3. Apps Configuration (DONE ✅)
- /contacts/apps.py

### 4. Views (TODO - 1800+ lines)
- /contacts/views.py
  Main views:
  - contacts_list_view() - List all contacts with filters
  - contact_detail_view() - Show single contact details
  - contact_create_view() - Create new contact manually
  - contact_edit_view() - Edit existing contact
  - contact_delete_view() - Delete contact
  - convert_lead_to_contact_view() - THE KEY FEATURE!
  
  Additional views:
  - add_contact_note_view()
  - add_contact_activity_view()
  - contact_notes_view()
  - contact_activities_view()
  - bulk_assign_contacts_view()
  - export_contacts_view()
  - update_contact_status_api()
  - contacts_search_api()

### 5. URLs (TODO - 60 lines)
- /contacts/urls.py
  URL patterns for all views above

### 6. Context Processors (TODO - 30 lines)
- /contacts/context_processors.py
  Provide contact count to sidebar

### 7. Templates (TODO - 12 files, 6000+ lines total)

#### List & Dashboard:
- /contacts/templates/contacts/contacts_list.html (similar to leads_list.html)
- /contacts/templates/contacts/dashboard.html (stats for contacts)

#### CRUD Operations:
- /contacts/templates/contacts/contact_detail.html (1600 lines - detailed view)
- /contacts/templates/contacts/create_contact.html (300 lines)
- /contacts/templates/contacts/edit_contact.html (400 lines)
- /contacts/templates/contacts/delete_contact.html (simple confirmation)

#### Activities & Notes:
- /contacts/templates/contacts/contact_notes.html
- /contacts/templates/contacts/contact_activities.html  
- /contacts/templates/contacts/add_activity.html

#### Management:
- /contacts/templates/contacts/sources.html
- /contacts/templates/contacts/statuses.html
- /contacts/templates/contacts/create_source.html
- /contacts/templates/contacts/create_status.html

### 8. Migrations (AUTO-GENERATED)
Will be created when running makemigrations

### 9. Static Files (Optional - can reuse leads)
- Can share CSS/JS with leads module

### 10. Permissions Setup
Add to authentication/static_data_views.py:
- Module: "contacts"
- Permissions: view, create, edit, delete, assign

### 11. Sidebar Integration
Update /authentication/templates/authentication/partials/sidebar.html:
Add Contacts menu item below Leads

### 12. Lead Detail Page Update (CRITICAL!)
Update /leads/templates/leads/lead_detail.html:
Add "Convert to Contact" button in header

## Implementation Steps

### Step 1: Register App (5 minutes)
```python
# In real_estate_crm/settings.py
INSTALLED_APPS = [
    ...
    'contacts',  # Add this line
]
```

### Step 2: Run Migrations (2 minutes)
```bash
python manage.py makemigrations contacts
python manage.py migrate contacts
```

### Step 3: Create Conversion View (15 minutes)
Key function in leads/views.py or contacts/views.py

### Step 4: Add Convert Button to Lead Detail (10 minutes)
Add button in lead header section

### Step 5: Create Basic Views (60 minutes)
Copy from leads and adapt for contacts

### Step 6: Create URLs (10 minutes)
Map all views to URLs

### Step 7: Create Templates (120 minutes)
Copy from leads templates and modify:
- Change "Lead" to "Contact"
- Change color scheme (blue → green)
- Update URLs
- Add "Converted from Lead" indicator

### Step 8: Add Sidebar Menu (5 minutes)
```html
<!-- In sidebar.html -->
<li class="nav-item">
    <a class="nav-link {% if 'contacts' in request.resolver_match.namespace %}active{% endif %}" 
       href="{% url 'contacts:contacts_list' %}">
        <i class="bi bi-person-check me-3"></i>
        <span>{% trans "Contacts" %}</span>
        <span class="badge bg-success ms-auto">{{ user_contacts_count|default:"0" }}</span>
    </a>
</li>
```

### Step 9: Add Context Processor (10 minutes)
Provide contact count to templates

### Step 10: Create Sample Data (5 minutes)
Run script to create contact statuses, sources, types, priorities

## Key Differences from Leads

1. **Conversion Field**:
   - `converted_from_lead` - Links to original lead
   - Shows "Converted from Lead" badge in detail page

2. **Color Scheme**:
   - Leads: Blue (#3b82f6)
   - Contacts: Green (#10b981)

3. **Icon**:
   - Leads: bi-people
   - Contacts: bi-person-check

4. **Business Logic**:
   - Contacts can track `lifetime_value`
   - Contacts can track `total_deals`
   - Contacts have `is_vip` flag

## Time Estimate
- Core functionality (Views + URLs): 2 hours
- Templates: 3 hours
- Testing & debugging: 1 hour
- **Total: 6 hours**

## Quick Start (Minimum Viable Product)
For fastest implementation, create these files only:
1. ✅ models.py (DONE)
2. ✅ admin.py (DONE)
3. views.py (basic CRUD only - 400 lines)
4. urls.py
5. contacts_list.html
6. contact_detail.html
7. create_contact.html
8. Add to settings.py INSTALLED_APPS
9. Run migrations
10. Add sidebar menu item

This gives you a working contacts system in ~2 hours.

## Next Steps
After basic implementation, add:
- Import/Export functionality
- Advanced filtering
- Activity tracking
- Document management
- Email integration
- WhatsApp integration

## Notes
- All code should follow Django best practices
- Use the same permission system as leads
- Reuse as much code from leads as possible
- Test conversion functionality thoroughly
- Add audit logging for compliance

"""
