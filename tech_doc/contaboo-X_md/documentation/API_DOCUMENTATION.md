# API Documentation - Contaboo Real Estate CRM

This document provides comprehensive API documentation for the Contaboo Real Estate CRM system built on Appwrite.

## 🔗 Base Configuration

### Appwrite Setup
```typescript
import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68bf5a2cd78f0a617a92');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = 'real_estate';
```

## 🏠 Properties API

### Fetch Properties
```typescript
// Get all properties with filters
const getProperties = async (filters = []) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      'properties',
      filters
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// Example usage with filters
const availableProperties = await getProperties([
  Query.equal('status', 'available'),
  Query.equal('unit_for', 'sale'),
  Query.greaterThan('asking_price', 100000),
  Query.lessThan('asking_price', 500000)
]);
```

### Create Property
```typescript
const createProperty = async (propertyData) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      'properties',
      ID.unique(),
      {
        property_number: propertyData.property_number,
        name: propertyData.name,
        description: propertyData.description,
        type_id: propertyData.type_id,
        category_id: propertyData.category_id,
        unit_for: propertyData.unit_for,
        area: propertyData.area,
        rooms: propertyData.rooms,
        bathrooms: propertyData.bathrooms,
        created_by: propertyData.created_by,
        assigned_to: propertyData.assigned_to
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};
```

### Update Property
```typescript
const updateProperty = async (propertyId, updateData) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      'properties',
      propertyId,
      {
        ...updateData,
        updated_by: updateData.updated_by
      }
    );
    return response;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};
```

### Delete Property
```typescript
const deleteProperty = async (propertyId) => {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      'properties',
      propertyId
    );
    return { success: true };
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};
```

## 🔍 Property Search API

### Advanced Property Search
```typescript
const searchProperties = async (searchCriteria) => {
  const filters = [];
  
  // Property type filter
  if (searchCriteria.type_id) {
    filters.push(Query.equal('type_id', searchCriteria.type_id));
  }
  
  // Category filter
  if (searchCriteria.category_id) {
    filters.push(Query.equal('category_id', searchCriteria.category_id));
  }
  
  // Price range filter
  if (searchCriteria.min_price) {
    filters.push(Query.greaterThanEqual('asking_price', searchCriteria.min_price));
  }
  if (searchCriteria.max_price) {
    filters.push(Query.lessThanEqual('asking_price', searchCriteria.max_price));
  }
  
  // Bedrooms filter
  if (searchCriteria.min_bedrooms) {
    filters.push(Query.greaterThanEqual('rooms', searchCriteria.min_bedrooms));
  }
  
  // Bathrooms filter
  if (searchCriteria.min_bathrooms) {
    filters.push(Query.greaterThanEqual('bathrooms', searchCriteria.min_bathrooms));
  }
  
  // Area filter
  if (searchCriteria.min_area) {
    filters.push(Query.greaterThanEqual('area', searchCriteria.min_area));
  }
  
  // Purpose filter (sale/rent)
  if (searchCriteria.unit_for) {
    filters.push(Query.equal('unit_for', searchCriteria.unit_for));
  }
  
  // Status filter
  if (searchCriteria.status) {
    filters.push(Query.equal('status', searchCriteria.status));
  }
  
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      'properties',
      filters
    );
    return response.documents;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
};
```

## 👥 User Management API

### User Authentication
```typescript
// Login
const login = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout
const logout = async () => {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
};
```

### User CRUD Operations
```typescript
// Create user (admin only)
const createUser = async (userData) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      'users',
      ID.unique(),
      {
        username: userData.username,
        email: userData.email,
        full_name: userData.full_name,
        phone: userData.phone,
        status: userData.status || 'active'
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      'users',
      userId
    );
    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Update user
const updateUser = async (userId, updateData) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      'users',
      userId,
      updateData
    );
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
```

## 🔐 Role & Permission Management

### Assign Role to User
```typescript
const assignUserRole = async (userId, roleId) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      'user_roles',
      ID.unique(),
      {
        user_id: userId,
        role_id: roleId
      }
    );
    return response;
  } catch (error) {
    console.error('Error assigning role:', error);
    throw error;
  }
};

// Get user roles
const getUserRoles = async (userId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      'user_roles',
      [Query.equal('user_id', userId)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching user roles:', error);
    throw error;
  }
};

// Check user permission
const checkUserPermission = async (userId, permissionName) => {
  try {
    // Get user roles
    const userRoles = await getUserRoles(userId);
    
    // Get role permissions
    const roleIds = userRoles.map(ur => ur.role_id);
    const rolePermissions = await databases.listDocuments(
      DATABASE_ID,
      'role_permissions',
      [Query.equal('role_id', roleIds)]
    );
    
    // Get permission details
    const permissionIds = rolePermissions.map(rp => rp.permission_id);
    const permissions = await databases.listDocuments(
      DATABASE_ID,
      'permissions',
      [
        Query.equal('$id', permissionIds),
        Query.equal('name', permissionName)
      ]
    );
    
    return permissions.documents.length > 0;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
};
```

## 💰 Financial Management API

### Property Financial Data
```typescript
// Get property financials
const getPropertyFinancials = async (propertyId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      'financials',
      [Query.equal('property_id', propertyId)]
    );
    return response.documents[0] || null;
  } catch (error) {
    console.error('Error fetching financials:', error);
    throw error;
  }
};

// Update property financials
const updatePropertyFinancials = async (propertyId, financialData) => {
  try {
    // Check if financials exist
    const existing = await getPropertyFinancials(propertyId);
    
    if (existing) {
      // Update existing
      const response = await databases.updateDocument(
        DATABASE_ID,
        'financials',
        existing.$id,
        financialData
      );
      return response;
    } else {
      // Create new
      const response = await databases.createDocument(
        DATABASE_ID,
        'financials',
        ID.unique(),
        {
          property_id: propertyId,
          ...financialData
        }
      );
      return response;
    }
  } catch (error) {
    console.error('Error updating financials:', error);
    throw error;
  }
};
```

## 📊 Status & Activity Tracking

### Property Status Management
```typescript
// Update property status
const updatePropertyStatus = async (propertyId, statusData) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      'status_activity',
      propertyId,
      {
        status: statusData.status,
        activity: statusData.activity,
        sold_date: statusData.sold_date,
        rental_start_date: statusData.rental_start_date,
        rental_end_date: statusData.rental_end_date,
        last_follow_in: statusData.last_follow_in,
        update_required: statusData.update_required
      }
    );
    return response;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

// Get properties by status
const getPropertiesByStatus = async (status) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      'status_activity',
      [Query.equal('status', status)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching properties by status:', error);
    throw error;
  }
};
```

## 📁 Media Management API

### Upload Property Images
```typescript
const uploadPropertyImage = async (file, propertyId) => {
  try {
    // Upload file to storage
    const fileResponse = await storage.createFile(
      'property_images', // bucket ID
      ID.unique(),
      file
    );
    
    // Get file URL
    const fileUrl = storage.getFileView('property_images', fileResponse.$id);
    
    // Update property media record
    const mediaResponse = await databases.listDocuments(
      DATABASE_ID,
      'media',
      [Query.equal('property_id', propertyId)]
    );
    
    if (mediaResponse.documents.length > 0) {
      // Update existing media record
      const mediaDoc = mediaResponse.documents[0];
      const existingImages = mediaDoc.images ? JSON.parse(mediaDoc.images) : [];
      existingImages.push(fileUrl);
      
      await databases.updateDocument(
        DATABASE_ID,
        'media',
        mediaDoc.$id,
        {
          images: JSON.stringify(existingImages)
        }
      );
    } else {
      // Create new media record
      await databases.createDocument(
        DATABASE_ID,
        'media',
        ID.unique(),
        {
          property_id: propertyId,
          images: JSON.stringify([fileUrl])
        }
      );
    }
    
    return fileUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
```

## 📝 CRM Tracking API

### Sales Notes Management
```typescript
// Add sales note
const addSalesNote = async (propertyId, noteData) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      'crm_tracking',
      ID.unique(),
      {
        property_id: propertyId,
        sales_notes: noteData.sales_notes,
        general_notes: noteData.general_notes,
        activity_notes: noteData.activity_notes,
        handler_id: noteData.handler_id,
        last_modified_by: noteData.last_modified_by
      }
    );
    return response;
  } catch (error) {
    console.error('Error adding sales note:', error);
    throw error;
  }
};

// Get property tracking history
const getPropertyTracking = async (propertyId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      'crm_tracking',
      [Query.equal('property_id', propertyId)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching tracking:', error);
    throw error;
  }
};
```

## 🔍 Audit Logging API

### Log User Action
```typescript
const logUserAction = async (actionData) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      'audit_logs',
      ID.unique(),
      {
        user_id: actionData.user_id,
        action: actionData.action,
        entity_type: actionData.entity_type,
        entity_id: actionData.entity_id,
        property_id: actionData.property_id,
        changes: actionData.changes ? JSON.stringify(actionData.changes) : null,
        ip_address: actionData.ip_address,
        user_agent: actionData.user_agent
      }
    );
    return response;
  } catch (error) {
    console.error('Error logging action:', error);
    throw error;
  }
};

// Get audit logs
const getAuditLogs = async (filters = []) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      'audit_logs',
      filters
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
};
```

## 📊 Analytics & Reporting API

### Property Statistics
```typescript
const getPropertyStatistics = async () => {
  try {
    // Get total properties
    const totalProperties = await databases.listDocuments(
      DATABASE_ID,
      'properties'
    );
    
    // Get available properties
    const availableProperties = await databases.listDocuments(
      DATABASE_ID,
      'status_activity',
      [Query.equal('status', 'available')]
    );
    
    // Get sold properties
    const soldProperties = await databases.listDocuments(
      DATABASE_ID,
      'status_activity',
      [Query.equal('status', 'sold')]
    );
    
    // Get rented properties
    const rentedProperties = await databases.listDocuments(
      DATABASE_ID,
      'status_activity',
      [Query.equal('status', 'rented')]
    );
    
    return {
      total: totalProperties.total,
      available: availableProperties.total,
      sold: soldProperties.total,
      rented: rentedProperties.total
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};
```

## 🔧 Utility Functions

### Error Handling Wrapper
```typescript
const apiWrapper = async (apiFunction) => {
  try {
    const result = await apiFunction();
    return { success: true, data: result };
  } catch (error) {
    console.error('API Error:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    };
  }
};

// Usage
const result = await apiWrapper(() => getProperties());
if (result.success) {
  console.log('Properties:', result.data);
} else {
  console.error('Error:', result.error);
}
```

### Pagination Helper
```typescript
const getPaginatedResults = async (collection, filters = [], limit = 25, offset = 0) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      collection,
      [
        ...filters,
        Query.limit(limit),
        Query.offset(offset)
      ]
    );
    
    return {
      documents: response.documents,
      total: response.total,
      hasMore: (offset + limit) < response.total,
      nextOffset: offset + limit
    };
  } catch (error) {
    console.error('Error fetching paginated results:', error);
    throw error;
  }
};
```

## 🔒 Security Considerations

### Permission Checking Middleware
```typescript
const requirePermission = (permission) => {
  return async (userId) => {
    const hasPermission = await checkUserPermission(userId, permission);
    if (!hasPermission) {
      throw new Error(`Permission denied: ${permission}`);
    }
    return true;
  };
};

// Usage
const canCreateProperty = requirePermission('property.create');
await canCreateProperty(userId);
```

### Input Validation
```typescript
import { z } from 'zod';

const PropertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  property_number: z.string().min(1, 'Property number is required'),
  type_id: z.string().min(1, 'Property type is required'),
  category_id: z.string().min(1, 'Category is required'),
  unit_for: z.enum(['sale', 'rent']),
  area: z.number().positive('Area must be positive'),
  rooms: z.number().min(0, 'Rooms cannot be negative'),
  bathrooms: z.number().min(0, 'Bathrooms cannot be negative')
});

const validatePropertyData = (data) => {
  return PropertySchema.parse(data);
};
```

---

**Complete API reference for your real estate CRM! 🚀**
