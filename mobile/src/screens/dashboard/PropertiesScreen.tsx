import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../config/theme';
import { Property } from '../../types/property';
import { useAuthStore } from '../../stores/authStore';
import CSVImportModal from '../../components/CSVImportModal';
import apiClient from '../../services/api';
import { AuthenticatedStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width > 768;
const numColumns = isDesktop ? (width > 1200 ? 3 : 2) : 1;

type PropertiesScreenNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export default function PropertiesScreen() {
  const navigation = useNavigation<PropertiesScreenNavigationProp>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    loadProperties();
  }, []);

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
            // Pricing
            sale_price: salePrice,
            rental_price_monthly: rentalPrice,
            price: salePrice || rentalPrice || 0, // Fallback for display
            
            // Coordinates
            latitude: typeof prop.latitude === 'string' ? parseFloat(prop.latitude) : prop.latitude,
            longitude: typeof prop.longitude === 'string' ? parseFloat(prop.longitude) : prop.longitude,
            
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
          onPress: () => {
            const remainingProperties = properties.filter(p => !selectedIds.has(p.id));
            setProperties(remainingProperties);
            clearSelection();
            Alert.alert('Success', 'Properties deleted');
          },
        },
      ]
    );
  };

  const handleBulkTogglePublic = (makePublic: boolean) => {
    Alert.alert(
      makePublic ? 'Make Public' : 'Make Private',
      `Change ${selectedIds.size} propert${selectedIds.size === 1 ? 'y' : 'ies'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            const updatedProperties = properties.map(p =>
              selectedIds.has(p.id) ? { ...p, is_active: makePublic, is_available: makePublic } : p
            );
            setProperties(updatedProperties);
            clearSelection();
            Alert.alert('Success', 'Properties updated');
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
        <View style={styles.cardContent}>
          {/* Title & Price */}
          <View style={styles.cardTitleSection}>
            <Text style={styles.propertyTitle} numberOfLines={2}>
              {propertyTitle}
            </Text>
            <Text style={styles.propertyPrice}>
              {propertyPrice}
            </Text>
          </View>

          {/* Location */}
          {(propertyCompound || propertyAddress || propertyRegion !== 'Unknown') && (
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.propertyLocation} numberOfLines={1}>
                {propertyCompound || propertyAddress || propertyRegion}
                {propertyDistrict && `, ${propertyDistrict}`}
              </Text>
            </View>
          )}

          {/* Property Features */}
          <View style={styles.featuresContainer}>
            {propertyBedrooms > 0 && (
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🛏️</Text>
                <Text style={styles.featureText}>{propertyBedrooms}</Text>
              </View>
            )}
            {propertyBathrooms > 0 && (
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🚿</Text>
                <Text style={styles.featureText}>{propertyBathrooms}</Text>
              </View>
            )}
            {propertyTotalArea > 0 && (
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>�</Text>
                <Text style={styles.featureText}>{propertyTotalArea}m²</Text>
              </View>
            )}
            {item.parking_spots_count && item.parking_spots_count > 0 && (
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🚗</Text>
                <Text style={styles.featureText}>{item.parking_spots_count}</Text>
              </View>
            )}
          </View>

          {/* Badges Row */}
          <View style={styles.badgesRow}>
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
              <Text style={styles.viewDetailsText}>View Details</Text>
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
        <Text style={styles.screenTitle}>Properties</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('PropertyForm', { mode: 'create' })}
          >
            <Text style={styles.addButtonText}>➕ Add Property</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.importButton}
            onPress={() => setShowImportModal(true)}
          >
            <Text style={styles.importButtonText}>📥 Import CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search properties..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={theme.colors.textSecondary}
      />

      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'public' && styles.filterChipActive]}
          onPress={() => setFilterStatus(filterStatus === 'public' ? '' : 'public')}
        >
          <Text style={[styles.filterChipText, filterStatus === 'public' && styles.filterChipTextActive]}>
            Public
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'private' && styles.filterChipActive]}
          onPress={() => setFilterStatus(filterStatus === 'private' ? '' : 'private')}
        >
          <Text style={[styles.filterChipText, filterStatus === 'private' && styles.filterChipTextActive]}>
            Private
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterCategory === 'For Sale' && styles.filterChipActive]}
          onPress={() => setFilterCategory(filterCategory === 'For Sale' ? '' : 'For Sale')}
        >
          <Text style={[styles.filterChipText, filterCategory === 'For Sale' && styles.filterChipTextActive]}>
            For Sale
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterCategory === 'For Rent' && styles.filterChipActive]}
          onPress={() => setFilterCategory(filterCategory === 'For Rent' ? '' : 'For Rent')}
        >
          <Text style={[styles.filterChipText, filterCategory === 'For Rent' && styles.filterChipTextActive]}>
            For Rent
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultsCount}>
        {totalCount} propert{totalCount === 1 ? 'y' : 'ies'}
        {selectedIds.size > 0 && ` • ${selectedIds.size} selected`}
        {currentPage > 1 && ` • Page ${currentPage} of ${totalPages}`}
      </Text>
    </View>
  );

  const renderBulkActions = () => {
    if (selectedIds.size === 0) return null;

    return (
      <View style={styles.bulkActionsBar}>
        <TouchableOpacity onPress={selectAll} style={styles.bulkAction}>
          <Text style={styles.bulkActionText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearSelection} style={styles.bulkAction}>
          <Text style={styles.bulkActionText}>Clear</Text>
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
          <Text style={styles.loadingText}>Loading properties...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={isDesktop ? styles.desktopWrapper : undefined}>
        <FlatList
          data={properties}
          renderItem={renderPropertyCard}
          keyExtractor={(item) => item.id}
          key={numColumns} // Force re-render when columns change
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={[styles.listContent, isDesktop && styles.listContentDesktop]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
          }
          onEndReached={loadMoreProperties}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.loadMoreContainer}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
                <Text style={styles.loadMoreText}>Loading more...</Text>
              </View>
            ) : !hasMore && properties.length > 0 ? (
              <View style={styles.loadMoreContainer}>
                <Text style={styles.endOfListText}>✓ All {totalCount} properties loaded</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No properties found</Text>
              <Text style={styles.emptyStateSubtext}>
                {searchQuery || filterCategory || filterStatus
                  ? 'Try adjusting filters'
                  : 'Create your first property'}
              </Text>
            </View>
          }
        />
        {renderBulkActions()}
        
        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('PropertyForm', { mode: 'create' })}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>

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
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1400,
    paddingHorizontal: 24,
  },
  listContent: {
    paddingBottom: 80,
  },
  listContentDesktop: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 16,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
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
  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  filterChipTextActive: {
    color: theme.colors.white,
  },
  resultsCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: 32,
    fontWeight: '300',
    color: '#ffffff',
  },
  importButton: {
    backgroundColor: '#42b72a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  importButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
});
