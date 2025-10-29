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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../config/theme';
import { Property } from '../../types/property';
import { useAuthStore } from '../../stores/authStore';
import CSVImportModal from '../../components/CSVImportModal';
import apiClient from '../../services/api';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width > 768;
const numColumns = isDesktop ? (width > 1200 ? 3 : 2) : 1;

export default function PropertiesScreen({ navigation }: any) {
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
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
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
        // Otherwise navigate to detail
        navigation.navigate('PropertyDetail', { propertyId: item.id });
      }
    };

    return (
      <TouchableOpacity
        style={[styles.propertyCard, isSelected && styles.propertyCardSelected]}
        onPress={handleCardPress}
        onLongPress={() => toggleSelection(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.checkbox}>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.propertyTitle} numberOfLines={2}>
              {item.property_name || item.title || item.description || 'No Name'}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {item.is_active && item.is_available ? '🌐' : '🔒'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.propertyDetails}>
          <View style={styles.priceAreaRow}>
            <Text style={styles.propertyPrice}>
              {formatPrice(item.sale_price || item.rental_price_monthly || 0, item.status?.name)}
            </Text>
            {item.total_area && (
              <Text style={styles.propertyArea}>📐 {item.total_area} m²</Text>
            )}
          </View>
          <View style={styles.badges}>
            {item.type?.name && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.type.name}</Text>
              </View>
            )}
            {item.status?.name && (
              <View style={[styles.badge, styles.categoryBadge]}>
                <Text style={styles.badgeText}>{item.status.name}</Text>
              </View>
            )}
          </View>
        </View>

        {(item.address || item.region) && (
          <View style={styles.locationRow}>
            <Text style={styles.propertyLocation}>
              📍 {item.address || item.region?.display_name || item.region?.name || 'No location'}
            </Text>
            {item.district?.name && (
              <Text style={styles.propertyRegion}>{item.district.name}</Text>
            )}
          </View>
        )}
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
            onPress={() => navigation.navigate('PropertyForm')}
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
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
  propertyCard: {
    backgroundColor: theme.colors.white,
    marginHorizontal: isDesktop ? 0 : theme.spacing.lg,
    marginTop: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.base,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: isDesktop ? 1 : undefined,
    maxWidth: isDesktop ? (width > 1200 ? '32%' : '48%') : undefined,
  },
  propertyCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#eff6ff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  checkmark: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusBadge: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
  },
  propertyTitle: {
    flex: 1,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
  },
  propertySubtitle: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.sm,
    fontStyle: 'italic',
  },
  propertyDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  propertyPrice: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  priceAreaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  propertyArea: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  badges: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background,
  },
  categoryBadge: {
    backgroundColor: '#d1fae5',
  },
  badgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyLocation: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  propertyRegion: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    fontWeight: theme.typography.fontWeight.medium,
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
});
