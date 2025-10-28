# Property List Implementation Template
## Quick Reference for Developers

This file provides ready-to-use code templates based on the Property List Rules (Rule #1).

## Backend Implementation Template

### views.py - Filter Endpoint
```python
from django.http import JsonResponse
from django.contrib.auth.decorators import permission_required
from django.db.models import Q
from .models import Property

@permission_required('view')
def filter_properties(request):
    """AJAX endpoint for filtering properties"""
    if not request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({'error': 'Invalid request'}, status=400)
    
    # Get filter parameters
    search = request.GET.get('search', '')
    category_id = request.GET.get('category', '')
    status_id = request.GET.get('status', '')
    property_type_id = request.GET.get('property_type', '')
    region_id = request.GET.get('region', '')
    bedrooms = request.GET.get('bedrooms', '')
    min_price = request.GET.get('min_price', '')
    max_price = request.GET.get('max_price', '')
    min_area = request.GET.get('min_area', '')
    max_area = request.GET.get('max_area', '')
    
    # Start with optimized queryset
    properties = Property.objects.select_related(
        'category', 'status', 'property_type', 'region'
    ).prefetch_related('images').all()
    
    # Apply filters (using correct field names)
    if search:
        properties = properties.filter(
            Q(name__icontains=search) |
            Q(description__icontains=search) |
            Q(location__icontains=search) |
            Q(property_number__icontains=search)
        )
    
    if category_id:
        properties = properties.filter(category_id=category_id)
    
    if status_id:
        properties = properties.filter(status_id=status_id)
    
    if property_type_id:
        properties = properties.filter(property_type_id=property_type_id)
    
    if region_id:
        properties = properties.filter(region_id=region_id)
    
    if bedrooms:
        if bedrooms == '5':
            properties = properties.filter(bedrooms_count__gte=5)
        else:
            properties = properties.filter(bedrooms_count=bedrooms)
    
    if min_price:
        properties = properties.filter(total_price__gte=min_price)
    
    if max_price:
        properties = properties.filter(total_price__lte=max_price)
    
    if min_area:
        properties = properties.filter(
            Q(built_area__gte=min_area) |
            Q(space_unit__gte=min_area)
        )
    
    if max_area:
        properties = properties.filter(
            Q(built_area__lte=max_area) |
            Q(space_unit__lte=max_area)
        )
    
    # Calculate pagination info
    total_count = properties.count()
    properties_per_page = 50
    total_pages = (total_count + properties_per_page - 1) // properties_per_page if total_count > 0 else 1
    
    # Serialize properties with proper image URLs
    properties_data = []
    for property in properties:
        primary_image = property.images.first()
        
        # Generate complete image URL
        image_url = None
        if primary_image and primary_image.image:
            image_url = request.build_absolute_uri(primary_image.image.url)
        
        properties_data.append({
            'id': property.property_id,
            'name': property.name,
            'property_number': property.property_number,
            'description': property.description,
            'location': property.location,
            'price': str(property.total_price) if property.total_price else None,
            'area': property.built_area or property.space_unit,
            'bedrooms': property.bedrooms_count,
            'bathrooms': property.rooms,
            'category': property.category.name if property.category else None,
            'status': property.status.name if property.status else None,
            'property_type': property.property_type.name if property.property_type else None,
            'region': property.region.name if property.region else None,
            'image': image_url,
        })
    
    return JsonResponse({
        'success': True,
        'properties': properties_data,
        'count': len(properties_data),
        'total_count': total_count,
        'total_pages': total_pages,
        'current_page': 1,
        'properties_per_page': properties_per_page
    })
```

## Frontend JavaScript Template

### Basic Setup
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const filterForm = document.getElementById('filterForm');
    const dynamicFilters = document.querySelectorAll('.dynamic-filter');
    const searchInput = document.getElementById('searchInput');
    const propertiesContainer = document.getElementById('propertiesContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultCount = document.getElementById('resultCount');
    const paginationContainer = document.getElementById('paginationContainer');
    
    let filterTimeout;
    
    // Dynamic filtering with debounce
    dynamicFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(applyFilters, 300);
        });
    });
    
    // Search input with debounce
    searchInput.addEventListener('input', function() {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(applyFilters, 500);
    });
});
```

### Filter Application Function
```javascript
function applyFilters() {
    console.log('Applying filters...');
    showLoading();
    
    const formData = new FormData(filterForm);
    
    // Add advanced filters
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minArea = document.getElementById('minArea').value;
    const maxArea = document.getElementById('maxArea').value;
    
    if (minPrice) formData.append('min_price', minPrice);
    if (maxPrice) formData.append('max_price', maxPrice);
    if (minArea) formData.append('min_area', minArea);
    if (maxArea) formData.append('max_area', maxArea);
    
    // Clean empty parameters
    const searchValue = formData.get('search');
    if (!searchValue || searchValue === 'None' || searchValue === null) {
        formData.delete('search');
    }
    
    const params = new URLSearchParams(formData);
    console.log('Filter parameters:', params.toString());
    
    fetch(`/properties/ajax/filter/?${params.toString()}`, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Filter response:', data);
        if (data.success) {
            updatePropertiesGrid(data.properties);
            updateResultCount(data.count);
            updatePagination(data);
            updateURL(params);
        } else {
            showError('Error filtering properties');
        }
    })
    .catch(error => {
        console.error('Filter error:', error);
        showError('Error filtering properties');
    })
    .finally(() => {
        hideLoading();
    });
}
```

### Property Grid Update Function
```javascript
function updatePropertiesGrid(properties) {
    if (properties.length === 0) {
        propertiesContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-home text-6xl text-gray-600 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-400 mb-2">No Properties Found</h3>
                <p class="text-gray-500">Try adjusting your filters or add a new property.</p>
            </div>
        `;
        return;
    }
    
    propertiesContainer.innerHTML = properties.map(property => `
        <div class="property-card bg-slate-800/90 backdrop-blur-lg rounded-xl border border-slate-600/50 shadow-2xl overflow-hidden hover:bg-slate-800 transition-all duration-300 transform hover:scale-105">
            <!-- Property Image -->
            <div class="h-40 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
                ${property.image ? `
                    <img src="${property.image}" alt="${property.name}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                ` : `
                    <div class="text-center">
                        <i class="fas fa-image text-gray-500 text-2xl mb-1"></i>
                        <span class="text-gray-400 text-xs">No Image</span>
                    </div>
                `}
                
                <!-- Status Badge -->
                <div class="absolute top-2 right-2">
                    <span class="inline-block px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${getStatusClass(property.status)}">
                        ${property.status || 'No Status'}
                    </span>
                </div>
            </div>
            
            <!-- Property Info -->
            <div class="p-3">
                <h3 class="text-sm font-semibold text-white mb-2 truncate">${property.name || property.property_number}</h3>
                
                <div class="flex items-center justify-between mb-2 text-xs">
                    <span class="text-gray-400 truncate">${property.property_type || ''}</span>
                    <span class="text-cyan-400">${property.region || ''}</span>
                </div>
                
                <div class="flex items-center justify-between mb-2 text-xs">
                    <div class="flex items-center space-x-2 text-gray-400">
                        ${property.bedrooms ? `<span><i class="fas fa-bed"></i> ${property.bedrooms}</span>` : ''}
                        ${property.bathrooms ? `<span><i class="fas fa-bath"></i> ${property.bathrooms}</span>` : ''}
                    </div>
                    ${property.area ? `<span class="text-cyan-400">${property.area}m²</span>` : ''}
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="text-sm font-bold text-emerald-400">
                        ${property.price ? `${parseFloat(property.price).toLocaleString()} EGP` : 'Price on request'}
                    </div>
                    <div class="flex space-x-1">
                        <a href="/properties/${property.id}/edit/" class="p-1 text-cyan-400 hover:text-cyan-300 rounded">
                            <i class="fas fa-edit text-xs"></i>
                        </a>
                        <a href="/properties/${property.id}/" class="p-1 text-emerald-400 hover:text-emerald-300 rounded">
                            <i class="fas fa-eye text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
```

### Pagination Update Function
```javascript
function updatePagination(data) {
    if (data.total_count === 0) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    paginationContainer.innerHTML = `
        <div class="bg-slate-800/90 backdrop-blur-lg rounded-xl border border-slate-600/50 shadow-2xl p-6">
            <div class="flex justify-center items-center space-x-2">
                <span class="px-4 py-2 bg-cyan-600/30 text-cyan-300 rounded-lg border border-cyan-500/40">
                    Showing ${data.count} of ${data.total_count} filtered results
                </span>
            </div>
        </div>
    `;
}
```

### Utility Functions
```javascript
function updateResultCount(count) {
    resultCount.textContent = count;
}

function updateURL(params) {
    const newURL = new URL(window.location);
    newURL.search = params.toString();
    window.history.replaceState({}, '', newURL);
}

function showLoading() {
    loadingIndicator.classList.remove('hidden');
    propertiesContainer.style.opacity = '0.6';
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
    propertiesContainer.style.opacity = '1';
}

function showError(message) {
    console.error(message);
    // Implement user-friendly error display
}

function getStatusClass(status) {
    if (!status) return 'bg-gray-500/30 text-gray-300 border border-gray-500/40';
    
    switch(status.toLowerCase()) {
        case 'available':
            return 'bg-green-500/30 text-green-300 border border-green-500/40';
        case 'sold':
            return 'bg-red-500/30 text-red-300 border border-red-500/40';
        case 'rented':
            return 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/40';
        default:
            return 'bg-gray-500/30 text-gray-300 border border-gray-500/40';
    }
}
```

## URL Configuration Template

### urls.py
```python
from django.urls import path
from . import views

app_name = 'property'

urlpatterns = [
    path('', views.property_list, name='property_list'),
    path('ajax/filter/', views.filter_properties, name='filter_properties'),
    # ... other URLs
]
```

## HTML Template Structure

### Required DOM Elements
```html
<!-- Filter Form -->
<form id="filterForm">
    <input type="text" id="searchInput" name="search" value="{{ search|default:'' }}">
    <select name="region" class="dynamic-filter">...</select>
    <select name="property_type" class="dynamic-filter">...</select>
    <select name="status" class="dynamic-filter">...</select>
    <select name="category" class="dynamic-filter">...</select>
    <select name="bedrooms" class="dynamic-filter">...</select>
    
    <!-- Advanced Filters -->
    <input type="number" id="minPrice" placeholder="Min Price">
    <input type="number" id="maxPrice" placeholder="Max Price">
    <input type="number" id="minArea" placeholder="Min Area">
    <input type="number" id="maxArea" placeholder="Max Area">
</form>

<!-- Results Info -->
<div>Results: <span id="resultCount">{{ properties|length }}</span></div>

<!-- Loading Indicator -->
<div id="loadingIndicator" class="hidden">Loading...</div>

<!-- Properties Container -->
<div id="propertiesContainer" class="grid grid-cols-5 gap-6">
    <!-- Properties will be inserted here -->
</div>

<!-- Pagination Container -->
<div id="paginationContainer">
    <!-- Pagination will be inserted here -->
</div>
```

---

**Use this template as a starting point for implementing property listing functionality that follows the established rules and principles.**
