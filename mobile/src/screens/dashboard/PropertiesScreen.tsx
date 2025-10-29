import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Dimensions,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../config/theme';
import { Property } from '../../types/property';
import { useAuthStore } from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import CSVImportModal from '../../components/CSVImportModal';
import apiClient from '../../services/api';
import { AuthenticatedStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width > 768;
const numColumns = isDesktop ? 4 : 1; // 4 columns for desktop

type PropertiesScreenNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export default function PropertiesScreen() {
  const { t, language } = useLanguageStore();
  const isRTL = language === 'ar';
  const navigation = useNavigation<PropertiesScreenNavigationProp>();
  const searchInputRef = useRef<TextInput>(null);
  const flatListRef = useRef<FlatList>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeFilters, setActiveFilters] = useState<{
    forSale?: boolean;
    forRent?: boolean;
    propertyTypes?: string[];
    bedrooms?: number[];
    priceRange?: { min?: number; max?: number };
    featured?: boolean;
  }>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 50; // Changed to 50 items per page

  useEffect(() => {
    loadProperties();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isWeb) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in search or other input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'Home':
          e.preventDefault();
          if (currentPage !== 1) {
            setCurrentPage(1);
            loadProperties(1, false);
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          }
          break;
        case 'End':
          e.preventDefault();
          if (currentPage !== totalPages) {
            setCurrentPage(totalPages);
            loadProperties(totalPages, false);
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          }
          break;
        case 'PageUp':
          e.preventDefault();
          if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            loadProperties(newPage, false);
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          }
          break;
        case 'PageDown':
          e.preventDefault();
          if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            loadProperties(newPage, false);
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  // Debounce search input to prevent interrupting typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Prevent losing focus by using a stable key for FlatList
  const flatListKey = useMemo(() => `flatlist-${numColumns}`, [numColumns]);

  const loadProperties = async (page: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      // Fetch from real API with pagination
      const response = await apiClient.get(`/properties?page=${page}&limit=${ITEMS_PER_PAGE}`);
      
      console.log('🏠 API Response:', response.data);
      console.log('🏠 Page:', page, 'Total:', response.data.total, 'Has more:', response.data.hasMore);
      
      if (response.data.status === 'success') {
        // Map database fields to frontend display
        const mappedProperties = response.data.data.map((prop: any) => {
          // Convert Prisma Decimal to number
          const salePrice = prop.sale_price ? (typeof prop.sale_price === 'string' ? parseFloat(prop.sale_price) : prop.sale_price) : null;
          const rentalPrice = prop.rental_price_monthly ? (typeof prop.rental_price_monthly === 'string' ? parseFloat(prop.rental_price_monthly) : prop.rental_price_monthly) : null;
          
          return {
            ...prop,
            // Map API field names to frontend expected names
            type: prop.property_types || prop.type,
            status: prop.property_statuses || prop.status,
            category: prop.property_categories || prop.category,
            region: prop.regions || prop.region,
            district: prop.districts || prop.district,
            compound: prop.compounds || prop.compound,
            finishing_status: prop.finishing_statuses || prop.finishing_status,
            images: prop.property_images || prop.images || [],
            
            // Pricing
            sale_price: salePrice,
            rental_price_monthly: rentalPrice,
            price: salePrice || rentalPrice || 0, // Fallback for display
            
            // Coordinates
            latitude: typeof prop.gps_latitude === 'string' ? parseFloat(prop.gps_latitude) : prop.gps_latitude,
            longitude: typeof prop.gps_longitude === 'string' ? parseFloat(prop.gps_longitude) : prop.gps_longitude,
            
            // Areas
            land_area: prop.land_area ? (typeof prop.land_area === 'string' ? parseFloat(prop.land_area) : prop.land_area) : null,
            total_area: prop.total_area ? (typeof prop.total_area === 'string' ? parseFloat(prop.total_area) : prop.total_area) : null,
            built_area: prop.built_area ? (typeof prop.built_area === 'string' ? parseFloat(prop.built_area) : prop.built_area) : null,
          };
        });
        
        if (append) {
          // Append to existing properties
          setProperties(prev => [...prev, ...mappedProperties]);
        } else {
          // Replace properties
          setProperties(mappedProperties);
        }
        
        console.log('🏠 Properties loaded:', mappedProperties.length);
        console.log('🏠 First property:', mappedProperties[0]?.id, mappedProperties[0]?.property_name);
        
        // Update pagination state
        setCurrentPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.total);
        setHasMore(response.data.hasMore);
      } else {
        throw new Error(response.data.message || 'Failed to load properties');
      }
    } catch (error: any) {
      console.error('Failed to load properties:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to load properties');
      // Set empty array on error
      if (!append) {
        setProperties([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const loadMoreProperties = () => {
    if (!loadingMore && hasMore && currentPage < totalPages) {
      loadProperties(currentPage + 1, true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    loadProperties(1, false);
  };

  // Helper function to check if a name looks like a code (e.g., SH-CD2-002-B-G1)
  const isCodeLikeName = (name: string): boolean => {
    if (!name) return false;
    // Check if name has multiple hyphens or numbers with letters pattern
    const codePattern = /^[A-Z]{1,3}-[A-Z0-9]+-\d+/i; // e.g., SH-CD2-002
    const hasMultipleHyphens = (name.match(/-/g) || []).length >= 2;
    return codePattern.test(name) || hasMultipleHyphens;
  };

  // Filter and search properties - using debouncedSearch instead of searchQuery
  const filteredProperties = useMemo(() => {
    let filtered = properties;

    // Search query filter - using debounced value
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(property => {
        // Cast to any to access API response fields
        const prop = property as any;
        const searchableFields = [
          prop.property_name,
          prop.title,
          prop.description,
          prop.property_number,
          prop.type?.name,
          prop.type?.display_name,
          prop.status?.name,
          prop.status?.display_name,
          prop.category?.name,
          prop.category?.display_name,
          prop.region?.name,
          prop.region?.display_name,
          prop.district?.name,
          prop.compound?.name,
          prop.compound?.display_name,
          prop.address,
          prop.building_name,
        ];
        
        return searchableFields.some(field => 
          field && typeof field === 'string' && field.toLowerCase().includes(query)
        );
      });
    }

    // For Sale filter
    if (activeFilters.forSale) {
      filtered = filtered.filter(p => p.sale_price && p.sale_price > 0);
    }

    // For Rent filter
    if (activeFilters.forRent) {
      filtered = filtered.filter(p => 
        (p.rental_price_monthly && p.rental_price_monthly > 0) ||
        (p.rental_price_yearly && p.rental_price_yearly > 0)
      );
    }

    // Property types filter
    if (activeFilters.propertyTypes && activeFilters.propertyTypes.length > 0) {
      filtered = filtered.filter(p => 
        p.type?.name && activeFilters.propertyTypes?.includes(p.type.name)
      );
    }

    // Bedrooms filter
    if (activeFilters.bedrooms && activeFilters.bedrooms.length > 0) {
      filtered = filtered.filter(p => 
        p.bedrooms_count && activeFilters.bedrooms?.includes(p.bedrooms_count)
      );
    }

    // Price range filter
    if (activeFilters.priceRange) {
      filtered = filtered.filter(p => {
        const price = p.sale_price || p.rental_price_monthly || 0;
        const { min, max } = activeFilters.priceRange || {};
        return (!min || price >= min) && (!max || price <= max);
      });
    }

    // Featured filter
    if (activeFilters.featured) {
      filtered = filtered.filter(p => p.is_featured);
    }

    // Sort: Real names first, code-like names at the end
    filtered.sort((a, b) => {
      const aIsCode = isCodeLikeName(a.property_name || a.title || '');
      const bIsCode = isCodeLikeName(b.property_name || b.title || '');
      
      // If one is code and other is not, non-code comes first
      if (aIsCode && !bIsCode) return 1;
      if (!aIsCode && bIsCode) return -1;
      
      // Otherwise maintain original order
      return 0;
    });

    return filtered;
  }, [properties, debouncedSearch, activeFilters]);

  const toggleFilter = (filterType: string, value?: any) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      switch (filterType) {
        case 'forSale':
          newFilters.forSale = !prev.forSale;
          if (newFilters.forSale) newFilters.forRent = false;
          break;
        case 'forRent':
          newFilters.forRent = !prev.forRent;
          if (newFilters.forRent) newFilters.forSale = false;
          break;
        case 'featured':
          newFilters.featured = !prev.featured;
          break;
        case 'bedrooms':
          if (!newFilters.bedrooms) newFilters.bedrooms = [];
          const bedroomIndex = newFilters.bedrooms.indexOf(value);
          if (bedroomIndex > -1) {
            newFilters.bedrooms.splice(bedroomIndex, 1);
          } else {
            newFilters.bedrooms.push(value);
          }
          break;
        case 'propertyType':
          if (!newFilters.propertyTypes) newFilters.propertyTypes = [];
          const typeIndex = newFilters.propertyTypes.indexOf(value);
          if (typeIndex > -1) {
            newFilters.propertyTypes.splice(typeIndex, 1);
          } else {
            newFilters.propertyTypes.push(value);
          }
          break;
        case 'clearAll':
          return {};
      }
      
      return newFilters;
    });
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(activeFilters).some(v => 
      Array.isArray(v) ? v.length > 0 : Boolean(v)
    );
  }, [activeFilters]);

  // Optimize search input handler - prevent re-renders
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  // Clear search handler
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedSearch('');
  }, []);

  const toggleSelection = (id: string) => {
    console.log('🟢 Toggle selection called for:', id);
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      console.log('🟢 Removing from selection');
      newSelected.delete(id);
    } else {
      console.log('🟢 Adding to selection');
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
    console.log('🟢 New selection size:', newSelected.size);
  };

  const selectAll = () => {
    setSelectedIds(new Set(properties.map((p: Property) => p.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    Alert.alert(
      'Delete Properties',
      `Delete ${selectedIds.size} propert${selectedIds.size === 1 ? 'y' : 'ies'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const idsToDelete = Array.from(selectedIds);
              console.log('🗑️ Deleting properties:', idsToDelete);
              
              // Delete each property from the database
              const deletePromises = idsToDelete.map(id => 
                apiClient.delete(`/properties/${id}`)
              );
              
              await Promise.all(deletePromises);
              
              // Update local state
              const remainingProperties = properties.filter(p => !selectedIds.has(p.id));
              setProperties(remainingProperties);
              setTotalCount(prev => prev - selectedIds.size);
              clearSelection();
              
              Alert.alert('Success', `${idsToDelete.length} propert${idsToDelete.length === 1 ? 'y' : 'ies'} deleted`);
            } catch (error: any) {
              console.error('❌ Failed to delete properties:', error);
              Alert.alert('Error', error.response?.data?.message || 'Failed to delete properties');
            }
          },
        },
      ]
    );
  };

  const handleBulkTogglePublic = (makePublic: boolean) => {
    Alert.alert(
      makePublic ? 'Publish to Homepage' : 'Make Private',
      `Change ${selectedIds.size} propert${selectedIds.size === 1 ? 'y' : 'ies'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const idsToUpdate = Array.from(selectedIds);
              console.log(`${makePublic ? '📢' : '🔒'} Updating properties:`, idsToUpdate);
              
              // Update each property in the database
              const updatePromises = idsToUpdate.map(id => 
                apiClient.put(`/properties/${id}`, {
                  is_active: makePublic,
                  is_available: makePublic
                })
              );
              
              await Promise.all(updatePromises);
              
              // Update local state
              const updatedProperties = properties.map(p =>
                selectedIds.has(p.id) ? { ...p, is_active: makePublic, is_available: makePublic } : p
              );
              setProperties(updatedProperties);
              clearSelection();
              
              Alert.alert('Success', `${idsToUpdate.length} propert${idsToUpdate.length === 1 ? 'y' : 'ies'} ${makePublic ? 'published' : 'made private'}`);
            } catch (error: any) {
              console.error('❌ Failed to update properties:', error);
              Alert.alert('Error', error.response?.data?.message || 'Failed to update properties');
            }
          },
        },
      ]
    );
  };

  const handleImportSuccess = async (importedProperties: any[]) => {
    try {
      console.log('🎯 Starting property import...', importedProperties.length, 'properties');
      console.log('📋 First property sample:', importedProperties[0]);
      
      // Show loading
      Alert.alert('Saving...', 'Importing properties to database...');
      
      // Map to database format
      const propertiesToImport = importedProperties.map((property, index) => {
        const propertyName = property.title || property.name || property.compound || property.description || '';
        
        const mapped = {
          property_name: propertyName,
          title: property.title || 'Property',
          description: property.description || propertyName,
          sale_price: property.price || null,
          rental_price_monthly: property.rental_price || null,
          latitude: property.latitude || null,
          longitude: property.longitude || null,
          address: property.location || property.address || null,
          bedrooms_count: property.bedrooms || null,
          bathrooms_count: property.bathrooms || null,
          total_area: property.area || null,
          is_active: property.isPublic !== undefined ? property.isPublic : true,
          is_available: true,
        };
        
        if (index === 0) {
          console.log('📤 Mapped first property:', mapped);
        }
        
        return mapped;
      });

      console.log('📤 Sending to API:', propertiesToImport.length, 'properties');

      // Send to API
      const response = await apiClient.post('/properties/bulk', {
        properties: propertiesToImport
      });

      console.log('✅ API Response:', response.data);

      if (response.data.status === 'success') {
        // Reload properties from database
        await loadProperties();
        
        Alert.alert(
          'Import Successful! 🎉',
          `${response.data.count} properties have been saved to database!`
        );
      } else {
        throw new Error(response.data.message || 'Failed to import properties');
      }
    } catch (error: any) {
      console.error('❌ Failed to import properties:', error);
      console.error('❌ Error details:', error.response?.data);
      Alert.alert(
        'Import Failed',
        error.response?.data?.message || error.message || 'Failed to save properties to database'
      );
    }
  };

  const formatPrice = (price: number, status?: string) => {
    if (!price) return 'Price not set';
    
    if (status?.toLowerCase().includes('rent')) {
      return `${price.toLocaleString()} EGP/mo`;
    }
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M EGP`;
    }
    return `${price.toLocaleString()} EGP`;
  };

  const renderPropertyCard = ({ item }: { item: Property }) => {
    const isSelected = selectedIds.has(item.id);
    const hasSelections = selectedIds.size > 0;

    const handleCardPress = () => {
      if (hasSelections) {
        // If in selection mode, toggle selection
        toggleSelection(item.id);
      } else {
        // Navigate to detail screen
        navigation.navigate('PropertyDetail', { propertyId: item.id });
      }
    };

    const handleCardLongPress = () => {
      toggleSelection(item.id);
    };

    // Enhanced property data processing
    const propertyTitle = item.property_name || item.title || item.description || 'No Name';
    const propertyPrice = formatPrice(item.sale_price || item.rental_price_monthly || 0, item.status?.name);
    const propertyType = item.type?.name || 'Unknown';
    const propertyStatus = item.status?.name || 'Unknown';
    const propertyRegion = item.region?.display_name || item.region?.name || 'Unknown';
    const propertyCompound = item.compound?.name || '';
    const propertyAddress = item.address || '';
    const propertyDistrict = item.district?.name || '';
    const propertyBedrooms = item.bedrooms_count || 0;
    const propertyBathrooms = item.bathrooms_count || 0;
    const propertyTotalArea = item.total_area || 0;
    const propertyBuiltArea = item.built_area || 0;
    const propertyLandArea = item.land_area || 0;

    // Get first property image or use placeholder
    const propertyImage = item.images && item.images[0] ? item.images[0].image_url : null;

    return (
      <TouchableOpacity
        style={[
          styles.propertyCard,
          isSelected && styles.propertyCardSelected,
        ]}
        onPress={handleCardPress}
        onLongPress={handleCardLongPress}
        activeOpacity={0.7}
      >
        {/* Property Image */}
        <View style={styles.imageContainer}>
          {propertyImage ? (
            <Image source={{ uri: propertyImage }} style={styles.propertyImage} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderIcon}>🏠</Text>
            </View>
          )}
          
          {/* Status Badge Overlay */}
          <View style={[
            styles.statusOverlay,
            item.is_active && item.is_available ? styles.statusOverlayActive : styles.statusOverlayInactive
          ]}>
            <Text style={styles.statusOverlayText}>
              {item.is_active && item.is_available ? 'Active' : 'Inactive'}
            </Text>
          </View>

          {/* Selection Checkbox Overlay */}
          {hasSelections && (
            <View style={styles.checkboxOverlay}>
              <View style={[
                styles.checkbox,
                isSelected && styles.checkboxSelected
              ]}>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </View>
          )}
        </View>

        {/* Card Content */}
        <View style={[styles.cardContent, isRTL && styles.cardContentRTL]}>
          {/* Title & Price */}
          <View style={[styles.cardTitleSection, isRTL && styles.cardTitleSectionRTL]}>
            <Text style={[styles.propertyTitle, isRTL && styles.textRTL]} numberOfLines={2}>
              {propertyTitle}
            </Text>
            <Text style={[styles.propertyPrice, isRTL && styles.textRTL]}>
              {propertyPrice}
            </Text>
          </View>

          {/* Location */}
          {(propertyCompound || propertyAddress || propertyRegion !== 'Unknown') && (
            <View style={[styles.locationRow, isRTL && styles.locationRowRTL]}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={[styles.propertyLocation, isRTL && styles.textRTL]} numberOfLines={1}>
                {propertyCompound || propertyAddress || propertyRegion}
                {propertyDistrict && `, ${propertyDistrict}`}
              </Text>
            </View>
          )}

          {/* Property Features */}
          <View style={[styles.featuresContainer, isRTL && styles.featuresContainerRTL]}>
            {propertyBedrooms > 0 && (
              <View style={[styles.featureItem, isRTL && styles.featureItemRTL]}>
                <Text style={styles.featureIcon}>🛏️</Text>
                <Text style={styles.featureText}>{propertyBedrooms}</Text>
              </View>
            )}
            {propertyBathrooms > 0 && (
              <View style={[styles.featureItem, isRTL && styles.featureItemRTL]}>
                <Text style={styles.featureIcon}>🚿</Text>
                <Text style={styles.featureText}>{propertyBathrooms}</Text>
              </View>
            )}
            {propertyTotalArea > 0 && (
              <View style={[styles.featureItem, isRTL && styles.featureItemRTL]}>
                <Text style={styles.featureIcon}>📏</Text>
                <Text style={styles.featureText}>{propertyTotalArea}m²</Text>
              </View>
            )}
            {item.parking_spots_count && item.parking_spots_count > 0 && (
              <View style={[styles.featureItem, isRTL && styles.featureItemRTL]}>
                <Text style={styles.featureIcon}>🚗</Text>
                <Text style={styles.featureText}>{item.parking_spots_count}</Text>
              </View>
            )}
          </View>

          {/* Badges Row */}
          <View style={[styles.badgesRow, isRTL && styles.badgesRowRTL]}>
            {propertyType !== 'Unknown' && (
              <View style={[styles.badge, styles.typeBadge]}>
                <Text style={styles.badgeText}>{propertyType}</Text>
              </View>
            )}
            {propertyStatus !== 'Unknown' && (
              <View style={[styles.badge, styles.statusBadgeChip]}>
                <Text style={styles.badgeText}>{propertyStatus}</Text>
              </View>
            )}
          </View>

          {/* View Details Button */}
          {!hasSelections && (
            <TouchableOpacity 
              style={styles.viewDetailsButton}
              onPress={handleCardPress}
            >
              <Text style={[styles.viewDetailsText, { textAlign: isRTL ? 'right' : 'left' }]}>{t('viewDetails')}</Text>
              <Text style={styles.viewDetailsArrow}>→</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text style={[styles.screenTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{t('properties')}</Text>
        <TouchableOpacity
          style={styles.headerFab}
          onPress={() => navigation.navigate('PropertyForm', { mode: 'create' })}
          activeOpacity={0.8}
        >
          <Text style={styles.headerFabIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        ref={searchInputRef}
        style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
        placeholder={t('searchPropertiesPlaceholder')}
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholderTextColor={theme.colors.textSecondary}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        blurOnSubmit={false}
        selectTextOnFocus={false}
      />

      {/* Enhanced Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersRow}
        contentContainerStyle={styles.filtersContent}
      >
        {/* For Sale / For Rent */}
        <TouchableOpacity
          style={[styles.filterChip, activeFilters.forSale && styles.filterChipActive]}
          onPress={() => toggleFilter('forSale')}
        >
          <Text style={[styles.filterChipText, activeFilters.forSale && styles.filterChipTextActive, { textAlign: isRTL ? 'right' : 'left' }]}>
            🏷️ {t('forSale')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterChip, activeFilters.forRent && styles.filterChipActive]}
          onPress={() => toggleFilter('forRent')}
        >
          <Text style={[styles.filterChipText, activeFilters.forRent && styles.filterChipTextActive, { textAlign: isRTL ? 'right' : 'left' }]}>
            🏠 {t('forRent')}
          </Text>
        </TouchableOpacity>

        {/* Bedrooms */}
        {[1, 2, 3, 4, 5].map(num => (
          <TouchableOpacity
            key={`bed-${num}`}
            style={[
              styles.filterChip, 
              activeFilters.bedrooms?.includes(num) && styles.filterChipActive
            ]}
            onPress={() => toggleFilter('bedrooms', num)}
          >
            <Text style={[
              styles.filterChipText, 
              activeFilters.bedrooms?.includes(num) && styles.filterChipTextActive,
              { textAlign: isRTL ? 'right' : 'left' }
            ]}>
              🛏️ {num} {num > 1 ? t('beds') : t('bed')}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Featured */}
        <TouchableOpacity
          style={[styles.filterChip, activeFilters.featured && styles.filterChipActive]}
          onPress={() => toggleFilter('featured')}
        >
          <Text style={[styles.filterChipText, activeFilters.featured && styles.filterChipTextActive, { textAlign: isRTL ? 'right' : 'left' }]}>
            ⭐ {t('featured')}
          </Text>
        </TouchableOpacity>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <TouchableOpacity
            style={[styles.filterChip, styles.filterChipClear]}
            onPress={() => toggleFilter('clearAll')}
          >
            <Text style={[styles.filterChipText, styles.filterChipTextClear, { textAlign: isRTL ? 'right' : 'left' }]}>
              ✕ {t('clearAllFilters')}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Text style={[styles.resultsCount, { textAlign: isRTL ? 'right' : 'left' }]}>
        {filteredProperties.length} {t('of')} {totalCount} {totalCount === 1 ? t('property') : t('propertiesPlural')}
        {selectedIds.size > 0 && ` • ${selectedIds.size} ${t('selected')}`}
        {hasActiveFilters && ` • ${t('filtered')}`}
      </Text>
    </View>
  );

  const renderBulkActions = () => {
    if (selectedIds.size === 0) return null;

    return (
      <View style={styles.bulkActionsBar}>
        <TouchableOpacity onPress={selectAll} style={styles.bulkAction}>
          <Text style={[styles.bulkActionText, { textAlign: isRTL ? 'right' : 'left' }]}>{t('all')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearSelection} style={styles.bulkAction}>
          <Text style={[styles.bulkActionText, { textAlign: isRTL ? 'right' : 'left' }]}>{t('clear')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleBulkTogglePublic(true)} style={styles.bulkAction}>
          <Text style={styles.bulkActionText}>📢</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleBulkTogglePublic(false)} style={styles.bulkAction}>
          <Text style={styles.bulkActionText}>🔒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBulkDelete} style={[styles.bulkAction, styles.bulkActionDanger]}>
          <Text style={[styles.bulkActionText, styles.bulkActionDangerText]}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { textAlign: isRTL ? 'right' : 'left' }]}>{t('loadingProperties')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={isDesktop ? styles.desktopWrapper : undefined}>
        <FlatList
          ref={flatListRef}
          data={filteredProperties}
          renderItem={renderPropertyCard}
          keyExtractor={(item) => item.id}
          key={flatListKey}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={[styles.listContent, isDesktop && styles.listContentDesktop]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
          }
          ListFooterComponent={
            <View>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                    onPress={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                        loadProperties(currentPage - 1, false);
                      }
                    }}
                    disabled={currentPage === 1}
                  >
                    <Text style={[styles.paginationButtonText, currentPage === 1 && styles.paginationButtonTextDisabled, { textAlign: isRTL ? 'right' : 'left' }]}>
                      ← {t('previous')}
                    </Text>
                  </TouchableOpacity>
                  
                  <View style={styles.paginationInfo}>
                    <Text style={[styles.paginationText, { textAlign: isRTL ? 'right' : 'left' }]}>
                      {t('page')} {currentPage} {t('of')} {totalPages}
                    </Text>
                    <Text style={[styles.paginationSubtext, { textAlign: isRTL ? 'right' : 'left' }]}>
                      {totalCount} {t('totalPropertiesCount')}
                    </Text>
                    {isWeb && (
                      <Text style={[styles.keyboardHint, { textAlign: isRTL ? 'right' : 'left' }]}>
                        ⌨️ {t('keyboardHints')}
                      </Text>
                    )}
                  </View>
                  
                  <TouchableOpacity
                    style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                    onPress={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                        loadProperties(currentPage + 1, false);
                      }
                    }}
                    disabled={currentPage === totalPages}
                  >
                    <Text style={[styles.paginationButtonText, currentPage === totalPages && styles.paginationButtonTextDisabled, { textAlign: isRTL ? 'right' : 'left' }]}>
                      {t('next')} →
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { textAlign: isRTL ? 'right' : 'left' }]}>{t('noPropertiesMessage')}</Text>
              <Text style={[styles.emptyStateSubtext, { textAlign: isRTL ? 'right' : 'left' }]}>
                {searchQuery || hasActiveFilters
                  ? t('adjustFilters')
                  : t('createFirstPropertyMessage')}
              </Text>
            </View>
          }
        />
        {renderBulkActions()}

        {/* CSV Import Modal */}
        <CSVImportModal
          visible={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImportSuccess={handleImportSuccess}
          type="properties"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  desktopWrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0, // Remove padding to make content full width
  },
  listContent: {
    paddingBottom: 80,
  },
  listContentDesktop: {
    paddingHorizontal: 0,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 12,
    paddingHorizontal: 12,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  screenTitle: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  searchInput: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  filtersContent: {
    paddingRight: theme.spacing.lg,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipClear: {
    backgroundColor: '#fee2e2',
    borderColor: '#f87171',
  },
  filterChipText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  filterChipTextActive: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  filterChipTextClear: {
    color: '#dc2626',
    fontWeight: theme.typography.fontWeight.semibold,
  },
  resultsCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
    marginTop: theme.spacing.sm,
  },
  
  // Modern Card Styles
  propertyCard: {
    backgroundColor: theme.colors.white,
    marginHorizontal: isDesktop ? 0 : theme.spacing.lg,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: isDesktop ? 1 : undefined,
    maxWidth: isDesktop ? (width > 1200 ? '32%' : '48%') : undefined,
  },
  propertyCardSelected: {
    borderColor: theme.colors.primary,
    ...theme.shadows.lg,
  },
  
  // Image Container
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    backgroundColor: theme.colors.border,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 64,
  },
  
  // Status Overlay
  statusOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.sm,
  },
  statusOverlayActive: {
    backgroundColor: '#10b981',
  },
  statusOverlayInactive: {
    backgroundColor: '#ef4444',
  },
  statusOverlayText: {
    color: '#ffffff',
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
  },
  
  // Checkbox Overlay
  checkboxOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  checkboxSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
  },
  
  // Card Content
  cardContent: {
    padding: theme.spacing.lg,
  },
  cardTitleSection: {
    marginBottom: theme.spacing.sm,
  },
  propertyTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: 6,
    lineHeight: 24,
  },
  propertyPrice: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  
  // Location
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: 6,
  },
  locationIcon: {
    fontSize: 14,
  },
  propertyLocation: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  
  // Features
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureIcon: {
    fontSize: 16,
  },
  featureText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  
  // Badges
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  typeBadge: {
    backgroundColor: '#dbeafe',
  },
  statusBadgeChip: {
    backgroundColor: '#fef3c7',
  },
  badgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  
  // View Details Button
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xs,
  },
  viewDetailsText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#ffffff',
    marginRight: 6,
  },
  viewDetailsArrow: {
    fontSize: theme.typography.fontSize.base,
    color: '#ffffff',
    fontWeight: theme.typography.fontWeight.bold,
  },
  
  bulkActionsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  bulkAction: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  bulkActionDanger: {
    backgroundColor: '#fee2e2',
  },
  bulkActionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  bulkActionDangerText: {
    color: '#dc2626',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  emptyState: {
    padding: theme.spacing['3xl'],
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  emptyStateSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  headerFab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerFabIcon: {
    fontSize: 28,
    fontWeight: '300',
    color: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadMoreContainer: {
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  },
  loadMoreText: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  endOfListText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textTertiary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginTop: 20,
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  paginationButtonDisabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  paginationButtonTextDisabled: {
    color: theme.colors.textTertiary,
  },
  paginationInfo: {
    alignItems: 'center',
  },
  paginationText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  paginationSubtext: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  keyboardHint: {
    fontSize: 10,
    color: theme.colors.textTertiary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  // RTL Styles
  cardContentRTL: {
    flexDirection: 'column',
  },
  cardTitleSectionRTL: {
    flexDirection: 'row-reverse',
  },
  locationRowRTL: {
    flexDirection: 'row-reverse',
  },
  featuresContainerRTL: {
    flexDirection: 'row-reverse',
  },
  featureItemRTL: {
    flexDirection: 'row-reverse',
  },
  badgesRowRTL: {
    flexDirection: 'row-reverse',
  },
  textRTL: {
    textAlign: 'right',
  },
});
