import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicStackParamList, PropertyType } from '../../types/navigation';
import theme from '../../config/theme';
import FilterBar from '../../components/FilterBar';
import FeaturedPropertiesSection from '../../components/FeaturedPropertiesSection';
import TopCompoundsSection from '../../components/TopCompoundsSection';
import TopRegionsSection from '../../components/TopRegionsSection';
import TopAgentsSection from '../../components/TopAgentsSection';
import {
  MOCK_PROPERTIES,
  MOCK_FEATURED_PROPERTIES,
  MOCK_TOP_COMPOUNDS,
  MOCK_TOP_REGIONS,
  MOCK_TOP_AGENTS,
  MOCK_REGIONS,
  MOCK_PROPERTY_TYPES,
  MOCK_CATEGORIES,
} from '../../data/mockData';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<PublicStackParamList, 'Home'>;
};

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width >= theme.breakpoints.desktop;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    region?: string;
    propertyType?: string;
    category?: string;
  }>({});

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [searchQuery, filters, properties]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(MOCK_PROPERTIES);
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterProperties = () => {
    let filtered = properties;

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply region filter
    if (filters.region) {
      filtered = filtered.filter((p) => p.region === filters.region);
    }

    // Apply property type filter
    if (filters.propertyType) {
      filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    setFilteredProperties(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadProperties();
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M EGP`;
    }
    return `${price.toLocaleString()} EGP`;
  };

  const renderPropertyCard = (item: PropertyType) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.propertyCard,
        isDesktop && { width: width > 1400 ? '31%' : '47%' },
      ]}
      onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.propertyImage}
        resizeMode="cover"
      />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.propertyDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyPrice}>{formatPrice(item.price)}</Text>
          <Text style={styles.propertyCategory}>{item.category}</Text>
        </View>
        <Text style={styles.propertyLocation}>📍 {item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading properties...</Text>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={[styles.header, isDesktop && styles.headerDesktop]}>
          <View style={styles.headerTop}>
            <Text style={styles.logo}>Bitna</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.headerButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerButton, styles.subscribeButton]}
                onPress={() => navigation.navigate('Subscribe')}
              >
                <Text style={styles.subscribeButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.headerSubtitle}>Find Your Dream Property</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search properties..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          {/* Filter Bar */}
          <FilterBar
            regions={MOCK_REGIONS}
            propertyTypes={MOCK_PROPERTY_TYPES}
            categories={MOCK_CATEGORIES}
            onFilterChange={setFilters}
          />
        </View>

        {/* Main Content Container (centered on desktop) */}
        <View style={[styles.contentContainer, isDesktop && styles.contentContainerDesktop]}>
          {/* Featured Properties */}
          <FeaturedPropertiesSection
            properties={MOCK_FEATURED_PROPERTIES}
            onPropertyPress={(propertyId) =>
              navigation.navigate('PropertyDetails', { propertyId })
            }
            onViewAll={() => {}}
          />

          {/* Top Compounds */}
          <TopCompoundsSection
            compounds={MOCK_TOP_COMPOUNDS}
            onCompoundPress={(compoundId) => console.log('Compound:', compoundId)}
            onViewAll={() => {}}
          />

          {/* Top Regions */}
          <TopRegionsSection
            regions={MOCK_TOP_REGIONS}
            onRegionPress={(regionId) => console.log('Region:', regionId)}
            onViewAll={() => {}}
          />

          {/* Top Agents */}
          <TopAgentsSection
            agents={MOCK_TOP_AGENTS}
            onAgentPress={(agentId) => console.log('Agent:', agentId)}
            onViewAll={() => {}}
          />

          {/* All Properties Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                🏢 All Properties
                {filteredProperties.length > 0 && (
                  <Text style={styles.propertyCount}> ({filteredProperties.length})</Text>
                )}
              </Text>
            </View>

            {filteredProperties.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No properties found matching your criteria
                </Text>
              </View>
            ) : (
              <View style={[styles.propertiesGrid, isDesktop && styles.propertiesGridDesktop]}>
                {filteredProperties.map(renderPropertyCard)}
              </View>
            )}
          </View>

          {/* Footer CTA */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Are you a real estate professional?</Text>
            <Text style={styles.footerText}>
              Join Bitna to manage your properties and connect with clients
            </Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate('Subscribe')}
            >
              <Text style={styles.joinButtonText}>Join as Agent 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerDesktop: {
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    maxWidth: isDesktop ? 1200 : '100%',
    width: '100%',
  },
  logo: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.extrabold,
    color: theme.colors.primary,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }),
  },
  headerButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  headerButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  headerButtonText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: theme.typography.fontSize.sm,
  },
  subscribeButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  subscribeButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.semibold,
    fontSize: theme.typography.fontSize.sm,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    maxWidth: isDesktop ? 1200 : '100%',
  },
  searchContainer: {
    marginBottom: theme.spacing.md,
    maxWidth: isDesktop ? 1200 : '100%',
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
  },
  contentContainer: {
    paddingBottom: theme.spacing.xl,
  },
  contentContainerDesktop: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  section: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  propertyCount: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.regular,
  },
  propertiesGrid: {
    gap: theme.spacing.lg,
  },
  propertiesGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  propertyCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.base,
    marginBottom: theme.spacing.lg,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.border,
  },
  propertyInfo: {
    padding: theme.spacing.lg,
  },
  propertyTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
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
  propertyCategory: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.success,
    fontWeight: theme.typography.fontWeight.semibold,
    backgroundColor: '#d1fae5',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  propertyLocation: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  emptyState: {
    paddingVertical: theme.spacing['3xl'],
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  footer: {
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing['3xl'],
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    ...theme.shadows.base,
  },
  footerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  joinButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  joinButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
