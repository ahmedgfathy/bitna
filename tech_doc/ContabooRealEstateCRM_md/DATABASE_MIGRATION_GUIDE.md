# Database Migration Setup Instructions

## Overview
This document explains how to execute the comprehensive database migration that includes user management system and normalized lead structure.

## Files Created
1. `sql/00_complete_migration.sql` - Complete database migration script
2. `src/services/userManagementService.ts` - User management backend service
3. `src/screens/settings/SettingsScreen.tsx` - Settings main screen
4. `src/screens/settings/UserManagementScreen.tsx` - User management interface

## Migration Steps

### Step 1: Execute Database Migration
1. Open your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `sql/00_complete_migration.sql`
4. Paste and execute the SQL script

This will create:
- **User Management Tables**: roles, profiles, permissions, profile_permissions, user_profiles, user_permissions
- **Normalized Lead Tables**: lead_sources, lead_types, lead_statuses, system_users
- **Enhanced Company Table**: Additional fields and constraints
- **RLS Policies**: Multi-tenant security policies
- **Indexes**: Performance optimization
- **Default Data**: Predefined roles, permissions, and lookup values

### Step 2: Verify Database Structure
After migration, your database should have these tables:
- `companies` (enhanced)
- `users` (existing)
- `leads` (enhanced with foreign keys)
- `properties` (existing)
- `roles` (new)
- `profiles` (new)
- `permissions` (new)
- `profile_permissions` (new)
- `user_profiles` (new)
- `user_permissions` (new)
- `lead_sources` (new)
- `lead_types` (new)
- `lead_statuses` (new)
- `system_users` (new)

### Step 3: Update Environment Configuration
Ensure your Supabase environment variables are configured:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 4: Test the Application
1. Run the React Native application
2. Navigate to the Settings tab (formerly Profile tab)
3. If you're an ADMIN user, you should see "User & Access Control" option
4. Test user management features

## User Management Features

### Roles System
- **ADMIN**: Full system access
- **MANAGER**: Team management capabilities
- **AGENT**: Basic lead and property management

### Profiles System
- Create custom permission profiles
- Assign multiple profiles to users
- Granular permission control

### Permissions System
- Module-based permissions (Leads, Properties, Users, Reports)
- Action-based permissions (Create, Read, Update, Delete, Export)
- Profile-level and user-level permission assignment

## Lead Management Enhancements

### Normalized Dropdown Data
- Lead sources stored in `lead_sources` table
- Lead types stored in `lead_types` table  
- Lead statuses stored in `lead_statuses` table
- System users stored in `system_users` table

### Enhanced Search
- Full-text search across name, mobile, notes, description
- GIN indexes for performance
- Case-insensitive search

### Data Integrity
- Foreign key constraints
- Proper relationships between entities
- Multi-tenant data isolation

## Troubleshooting

### Migration Errors
If you encounter errors during migration:
1. Check Supabase logs for specific error messages
2. Ensure you have proper permissions in Supabase
3. Verify no conflicting table names exist
4. Run migration in smaller chunks if needed

### Permission Issues
If users can't access certain features:
1. Verify user role is correctly set
2. Check profile assignments in `user_profiles` table
3. Ensure permissions are properly configured in `profile_permissions`

### Search Not Working
If lead search isn't functioning:
1. Verify GIN indexes were created successfully
2. Check if `tsvector` columns are populated
3. Test search queries directly in Supabase SQL editor

## Next Steps

### Immediate Actions Required
1. **Execute Migration**: Run the SQL migration script in Supabase
2. **Test User Management**: Verify user creation and role assignment
3. **Update Services**: Activate database-driven services for leads
4. **Email Configuration**: Set up email templates in Supabase Auth

### Future Enhancements
1. **Frontend Screens**: Complete user management UI screens
2. **Email Templates**: Custom email confirmation templates
3. **Audit Logging**: Track user actions and changes
4. **Advanced Permissions**: Context-based permissions (e.g., own leads only)
5. **Bulk Operations**: Import/export users and data
6. **Dashboard Analytics**: User activity and system metrics

## Security Considerations

### Row Level Security (RLS)
- All tables have RLS policies enabled
- Users can only access their company's data
- Admins have elevated access within their company

### Multi-Tenant Architecture
- Complete data isolation between companies
- Proper foreign key relationships
- Secure user authentication and authorization

### Data Protection
- Sensitive data properly encrypted
- Audit trails for user actions
- Secure password policies

## Support

For questions or issues with the migration:
1. Check Supabase documentation
2. Review error logs in Supabase Dashboard
3. Test individual SQL statements for troubleshooting
4. Verify table relationships and constraints

Remember: This is a significant database change. Consider backing up your data before executing the migration in a production environment.