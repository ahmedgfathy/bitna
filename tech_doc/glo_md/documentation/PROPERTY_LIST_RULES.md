# Property List View Rules & Principles
## Project Standard Documentation - Rule #1

**Created:** September 8, 2025  
**Status:** Active Standard  
**Applies to:** All property listing functionality in the CRM system

---

## 1. AJAX FILTERING ARCHITECTURE

### 1.1 Backend Implementation Rules
- **MUST** use `@permission_required('view')` decorator for all filter endpoints
- **MUST** validate AJAX requests with `X-Requested-With: XMLHttpRequest` header
- **MUST** return `JsonResponse` with consistent structure:
  ```python
  {
      'success': True/False,
      'properties': [...],
      'count': integer,
      'total_count': integer,
      'total_pages': integer,
      'current_page': integer,
      'properties_per_page': integer
  }
  ```

### 1.2 Field Mapping Standards
- **MUST** use correct model field names in filters:
  - `bedrooms_count` (NOT `bedrooms`)
  - `total_price` (NOT `price`)
  - `location` (NOT `address`)
  - `built_area` OR `space_unit` for area calculations
- **MUST** use Q objects for complex search queries
- **MUST** include related fields via `select_related()` and `prefetch_related()`

### 1.3 Query Optimization Rules
```python
# REQUIRED query structure
properties = Property.objects.select_related(
    'category', 'status', 'property_type', 'region'
).prefetch_related('images').all()
```

---

## 2. IMAGE HANDLING STANDARDS

### 2.1 Image URL Generation
- **MUST** use `request.build_absolute_uri()` for complete image URLs
- **MUST** handle missing images gracefully with null checks
- **MUST** use primary image from PropertyImage model:
  ```python
  primary_image = property.images.first()
  image_url = request.build_absolute_uri(primary_image.image.url) if primary_image and primary_image.image else None
  ```

### 2.2 Frontend Image Display
- **MUST** provide fallback UI for missing images
- **MUST** use lazy loading for performance
- **MUST** maintain aspect ratio consistency

---

## 3. FRONTEND JAVASCRIPT RULES

### 3.1 Filter Parameter Handling
- **MUST** clean empty/null parameters before sending:
  ```javascript
  if (!searchValue || searchValue === 'None' || searchValue === null) {
      formData.delete('search');
  }
  ```
- **MUST** use debounced input for search (500ms delay)
- **MUST** use debounced filters for dropdowns (300ms delay)

### 3.2 AJAX Request Standards
```javascript
// REQUIRED request structure
fetch(url, {
    method: 'GET',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    }
})
```

### 3.3 UI Update Rules
- **MUST** show loading indicator during requests
- **MUST** update properties grid via `updatePropertiesGrid()`
- **MUST** update result count via `updateResultCount()`
- **MUST** update pagination via `updatePagination()`
- **MUST** update URL parameters for bookmarkability

---

## 4. PAGINATION PRINCIPLES

### 4.1 Filtered Results Display
- **MUST** show "Showing X of Y filtered results" instead of traditional pagination when filters are active
- **MUST** calculate total_count from filtered queryset
- **MUST** provide pagination metadata in all responses

### 4.2 URL State Management
- **MUST** update browser URL with current filter parameters
- **MUST** maintain filter state on page refresh
- **MUST** support deep linking to filtered views

---

## 5. ERROR HANDLING STANDARDS

### 5.1 Backend Error Management
- **MUST** catch and log all database errors
- **MUST** return user-friendly error messages
- **MUST** maintain system stability during errors
- **MUST** validate all input parameters

### 5.2 Frontend Error Display
- **MUST** show user-friendly error messages
- **MUST** provide retry mechanisms
- **MUST** log errors to console for debugging
- **MUST** gracefully degrade functionality

---

## 6. PERFORMANCE REQUIREMENTS

### 6.1 Database Optimization
- **MUST** use select_related() for ForeignKey relationships
- **MUST** use prefetch_related() for ManyToMany and reverse FK relationships
- **MUST** limit query results appropriately
- **MUST** use database indexes on filtered fields

### 6.2 Frontend Performance
- **MUST** implement request debouncing
- **MUST** show loading states for user feedback
- **MUST** cache filter options when possible
- **MUST** minimize DOM manipulations

---

## 7. SECURITY REQUIREMENTS

### 7.1 Authentication & Authorization
- **MUST** require user authentication for all endpoints
- **MUST** validate permissions with decorators
- **MUST** sanitize all user inputs
- **MUST** prevent SQL injection via parameterized queries

### 7.2 Data Protection
- **MUST** validate AJAX requests with proper headers
- **MUST** escape all user-generated content in templates
- **MUST** implement CSRF protection
- **MUST** validate file uploads for images

---

## 8. FILTER IMPLEMENTATION STANDARDS

### 8.1 Supported Filter Types
- **Text Search:** Name, description, location, property_number
- **Dropdown Filters:** Region, property_type, status, category
- **Numeric Filters:** Bedrooms, price ranges, area ranges
- **Advanced Filters:** Min/max price, min/max area

### 8.2 Filter Logic Rules
```python
# Search implementation
if search:
    properties = properties.filter(
        Q(name__icontains=search) |
        Q(description__icontains=search) |
        Q(location__icontains=search) |
        Q(property_number__icontains=search)
    )

# Bedrooms special case
if bedrooms == '5':
    properties = properties.filter(bedrooms_count__gte=5)
else:
    properties = properties.filter(bedrooms_count=bedrooms)
```

---

## 9. TESTING REQUIREMENTS

### 9.1 Backend Testing
- **MUST** test all filter combinations
- **MUST** test with empty/invalid parameters
- **MUST** test permission requirements
- **MUST** test database query efficiency

### 9.2 Frontend Testing
- **MUST** test all user interactions
- **MUST** test error scenarios
- **MUST** test performance with large datasets
- **MUST** test cross-browser compatibility

---

## 10. CODE QUALITY STANDARDS

### 10.1 Documentation Requirements
- **MUST** document all filter endpoints
- **MUST** provide clear variable names
- **MUST** include inline comments for complex logic
- **MUST** maintain this rules document

### 10.2 Code Structure
- **MUST** separate concerns (filtering, display, pagination)
- **MUST** use consistent naming conventions
- **MUST** follow DRY principles
- **MUST** implement proper error handling at each layer

---

## 11. DEPLOYMENT CONSIDERATIONS

### 11.1 Production Requirements
- **MUST** configure proper ALLOWED_HOSTS
- **MUST** use production-ready image serving
- **MUST** implement proper caching strategies
- **MUST** monitor performance metrics

### 11.2 Database Migrations
- **MUST** create indexes for filtered fields
- **MUST** ensure backward compatibility
- **MUST** test migrations on production-like data

---

## 12. MAINTENANCE GUIDELINES

### 12.1 Regular Reviews
- **MUST** review filter performance monthly
- **MUST** update documentation with changes
- **MUST** monitor user feedback on filtering
- **MUST** keep dependencies updated

### 12.2 Future Enhancements
- **SHOULD** consider implementing caching for static filters
- **SHOULD** add export functionality for filtered results
- **SHOULD** implement saved filter sets for users
- **SHOULD** add analytics for popular filter combinations

---

**This document establishes the foundational principles for all property listing functionality and serves as the primary reference for developers working on similar features in the CRM system.**

**Last Updated:** September 8, 2025  
**Next Review:** October 8, 2025  
**Approved By:** Development Team  
**Version:** 1.0
