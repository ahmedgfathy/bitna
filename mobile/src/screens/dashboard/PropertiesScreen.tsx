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
import { PropertyType } from '../../types/navigation';
import { useAuthStore } from '../../stores/authStore';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width > 768;
const numColumns = isDesktop ? (width > 1200 ? 3 : 2) : 1;

export default function PropertiesScreen({ navigation }: any) {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    filterPropertiesList();
  }, [searchQuery, filterCategory, filterStatus, properties]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData: PropertyType[] = [
        {
          id: '1',
          title: 'Luxury Villa - New Cairo',
          description: 'Modern 5-bedroom villa with pool',
          price: 12000000,
          location: 'Fifth Settlement, New Cairo',
          latitude: 30.0444,
          longitude: 31.2357,
          imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
          propertyType: 'Villa',
          category: 'For Sale',
          region: 'New Cairo',
          isPublic: true,
        },
        {
          id: '2',
          title: 'Penthouse Apartment - Zamalek',
          description: 'Exclusive penthouse with Nile view',
          price: 15000000,
          location: 'Zamalek, Cairo',
          latitude: 30.0626,
          longitude: 31.2217,
          imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
          propertyType: 'Apartment',
          category: 'For Sale',
          region: 'Cairo',
          isPublic: true,
        },
        {
          id: '3',
          title: 'Commercial Office - Downtown',
          description: 'Prime office space in business district',
          price: 25000,
          location: 'Downtown, Cairo',
          latitude: 30.0626,
          longitude: 31.2497,
          imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
          propertyType: 'Commercial',
          category: 'For Rent',
          region: 'Cairo',
          isPublic: false,
        },
        {
          id: '4',
          title: 'Beachfront Villa - North Coast',
          description: 'Luxury villa with private beach access',
          price: 18000000,
          location: 'Hacienda Bay, North Coast',
          latitude: 30.8800,
          longitude: 29.0833,
          imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
          propertyType: 'Villa',
          category: 'For Sale',
          region: 'North Coast',
          isPublic: true,
        },
      ];
      setProperties(mockData);
    } catch (error) {
      console.error('Failed to load properties:', error);
      Alert.alert('Error', 'Failed to load properties');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterPropertiesList = () => {
    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }

    if (filterStatus === 'public') {
      filtered = filtered.filter((p) => p.isPublic);
    } else if (filterStatus === 'private') {
      filtered = filtered.filter((p) => !p.isPublic);
    }

    setFilteredProperties(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProperties();
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
    setSelectedIds(new Set(filteredProperties.map(p => p.id)));
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
              selectedIds.has(p.id) ? { ...p, isPublic: makePublic } : p
            );
            setProperties(updatedProperties);
            clearSelection();
            Alert.alert('Success', 'Properties updated');
          },
        },
      ]
    );
  };

  const formatPrice = (price: number, category: string) => {
    if (category === 'For Rent') {
      return `${price.toLocaleString()} EGP/mo`;
    }
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M EGP`;
    }
    return `${price.toLocaleString()} EGP`;
  };

  const renderPropertyCard = ({ item }: { item: PropertyType }) => {
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
            <Text style={styles.propertyTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {item.isPublic ? '🌐' : '🔒'}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.propertyDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.propertyDetails}>
          <Text style={styles.propertyPrice}>{formatPrice(item.price, item.category)}</Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.propertyType}</Text>
            </View>
            <View style={[styles.badge, styles.categoryBadge]}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Text style={styles.propertyLocation}>📍 {item.location}</Text>
          <Text style={styles.propertyRegion}>{item.region}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text style={styles.screenTitle}>Properties</Text>
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
        {filteredProperties.length} propert{filteredProperties.length === 1 ? 'y' : 'ies'}
        {selectedIds.size > 0 && ` • ${selectedIds.size} selected`}
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
          data={filteredProperties}
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
});
