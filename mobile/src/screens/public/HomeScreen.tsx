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
import apiService from '../../services/api';
import { useAuthStore } from '../../stores/authStore';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<PublicStackParamList, 'Home'>;
};

type TabType = 'home' | 'featured' | 'chat';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width >= theme.breakpoints.desktop;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = !!user;
  
  const [activeTab, setActiveTab] = useState<TabType>('home');
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

  // Temporary empty data until API endpoints are implemented
  const MOCK_REGIONS: any[] = [];
  const MOCK_PROPERTY_TYPES: any[] = [];
  const MOCK_CATEGORIES: any[] = [];
  const MOCK_FEATURED_PROPERTIES: any[] = [];
  const MOCK_TOP_COMPOUNDS: any[] = [];
  const MOCK_TOP_REGIONS: any[] = [];
  const MOCK_TOP_AGENTS: any[] = [];

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [searchQuery, filters, properties]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/properties/public');
      setProperties(response.data || []);
    } catch (error) {
      console.error('Failed to load properties:', error);
      setProperties([]);
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
          <View style={styles.headerRow}>
            {/* Logo - Clickable to stay on home */}
            <TouchableOpacity 
              style={styles.logoContainer}
              activeOpacity={0.8}
            >
              <View style={styles.logoCircle}>
                <Text style={styles.logoLetter}>C</Text>
              </View>
              <Text style={styles.logoTextMain}>Contaboo</Text>
            </TouchableOpacity>

            {/* Search Bar - Desktop Only */}
            {isDesktop && (
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#8e8e93"
                />
              </View>
            )}

            {/* Auth Buttons - Desktop - Only show when not logged in */}
            {isDesktop && !isLoggedIn && (
              <View style={styles.headerButtons}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => navigation.navigate('Subscribe')}
                >
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
            )}
            
            {/* Mobile Auth Icon Buttons - Only show when not logged in */}
            {!isDesktop && !isLoggedIn && (
              <View style={styles.mobileAuthButtons}>
                <TouchableOpacity 
                  style={styles.mobileIconButton}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.mobileIconText}>👤</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.mobileIconButtonGreen}
                  onPress={() => navigation.navigate('Subscribe')}
                >
                  <Text style={styles.mobileIconText}>➕</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Mobile Search Bar - Below header row */}
          {!isDesktop && (
            <View style={styles.mobileSearchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search properties..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#8e8e93"
              />
            </View>
          )}

          {/* Tabs - Icons Only */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'home' && styles.tabActive]}
              onPress={() => setActiveTab('home')}
            >
              <Text style={[styles.tabIcon, activeTab === 'home' && styles.tabIconActive]}>
                🏠
              </Text>
              {activeTab === 'home' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'featured' && styles.tabActive]}
              onPress={() => setActiveTab('featured')}
            >
              <Text style={[styles.tabIcon, activeTab === 'featured' && styles.tabIconActive]}>
                ⭐
              </Text>
              {activeTab === 'featured' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'chat' && styles.tabActive]}
              onPress={() => setActiveTab('chat')}
            >
              <Text style={[styles.tabIcon, activeTab === 'chat' && styles.tabIconActive]}>
                💬
              </Text>
              {activeTab === 'chat' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content Container (centered on desktop) */}
        <View style={[styles.contentContainer, isDesktop && styles.contentContainerDesktop]}>
          {activeTab === 'home' && (
            <>
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
            </>
          )}

          {activeTab === 'featured' && (
            <View style={styles.tabContent}>
              <View style={styles.comingSoon}>
                <Text style={styles.comingSoonEmoji}>⭐</Text>
                <Text style={styles.comingSoonTitle}>Featured Ads Unit</Text>
                <Text style={styles.comingSoonText}>
                  Premium property listings and sponsored ads will appear here
                </Text>
              </View>
            </View>
          )}

          {activeTab === 'chat' && (
            <View style={styles.tabContent}>
              <View style={styles.comingSoon}>
                <Text style={styles.comingSoonEmoji}>💬</Text>
                <Text style={styles.comingSoonTitle}>Community Chat</Text>
                <Text style={styles.comingSoonText}>
                  Connect with other users, share announcements, and chat about properties
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {isDesktop ? (
        <View style={styles.desktopLayout}>
          {/* Left Sidebar - Reserved for future features */}
          <View style={styles.sidebar}>
            <View style={styles.sidebarPlaceholder}>
              <Text style={styles.sidebarText}>📌 Reserved</Text>
              <Text style={styles.sidebarSubtext}>Left sidebar content coming soon</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {renderContent()}
          </View>

          {/* Right Sidebar - Reserved for future features */}
          <View style={styles.sidebar}>
            <View style={styles.sidebarPlaceholder}>
              <Text style={styles.sidebarText}>📌 Reserved</Text>
              <Text style={styles.sidebarSubtext}>Right sidebar content coming soon</Text>
            </View>
          </View>
        </View>
      ) : (
        renderContent()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 300,
    backgroundColor: theme.colors.white,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    padding: theme.spacing.lg,
  },
  sidebarPlaceholder: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  sidebarText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  sidebarSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e6eb',
    ...theme.shadows.sm,
  },
  headerDesktop: {
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1877f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoTextMain: {
    fontSize: isDesktop ? 32 : 24,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  loginButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#e7f3ff',
  },
  loginButtonText: {
    color: '#1877f2',
    fontWeight: '600',
    fontSize: 15,
  },
  joinButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#42b72a',
  },
  joinButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  mobileAuthButtons: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 'auto',
  },
  mobileIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e7f3ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileIconButtonGreen: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#42b72a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileIconText: {
    fontSize: 18,
  },
  mobileSearchContainer: {
    marginTop: theme.spacing.md,
    width: '100%',
  },
  logoTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: isDesktop ? theme.typography.fontSize['2xl'] : theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    lineHeight: isDesktop ? 28 : 24,
  },
  logoTagline: {
    fontSize: isDesktop ? theme.typography.fontSize.xs : 10,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginTop: -2,
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
  headerSubtitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    maxWidth: isDesktop ? 1200 : '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    maxWidth: isDesktop ? 1200 : '100%',
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    alignItems: 'center',
    position: 'relative',
  },
  tabActive: {
    // Active tab styling handled by indicator
  },
  tabText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
  tabTextActive: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  tabIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  searchContainer: {
    flex: isDesktop ? 1 : 0,
    minWidth: isDesktop ? 300 : '100%',
    maxWidth: isDesktop ? 500 : '100%',
    marginBottom: isDesktop ? 0 : theme.spacing.md,
  },
  searchInput: {
    backgroundColor: '#f5f6f7',
    borderRadius: 20,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1c1e21',
    borderWidth: 1,
    borderColor: '#dddfe2',
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
  tabContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  comingSoon: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing['3xl'],
    alignItems: 'center',
    ...theme.shadows.base,
  },
  comingSoonEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
  },
  comingSoonTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
