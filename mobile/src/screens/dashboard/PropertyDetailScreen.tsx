import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthenticatedStackParamList } from '../../types/navigation';
import { Property } from '../../types/property';
import apiClient from '../../services/api';

const theme = {
  colors: {
    primary: '#2563eb',
    background: '#f8fafc',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    success: '#10b981',
    danger: '#ef4444',
    border: '#e2e8f0',
    secondary: '#f1f5f9',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    '2xl': 24,
    '3xl': 28,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
    xl: 24,
  },
};

type PropertyDetailRouteProp = RouteProp<AuthenticatedStackParamList, 'PropertyDetail'>;
type PropertyDetailNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export default function PropertyDetailScreen() {
  const navigation = useNavigation<PropertyDetailNavigationProp>();
  const route = useRoute<PropertyDetailRouteProp>();
  const { propertyId } = route.params;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperty();
  }, [propertyId]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/properties/${propertyId}`);
      
      if (response.data.status === 'success') {
        setProperty(response.data.data);
      } else {
        throw new Error('Failed to load property');
      }
    } catch (error) {
      console.error('Error loading property:', error);
      Alert.alert('Error', 'Failed to load property details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate('PropertyForm', { propertyId, mode: 'edit' });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Property',
      'Are you sure you want to delete this property? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await apiClient.delete(`/properties/${propertyId}`);
              
              if (response.data.status === 'success') {
                Alert.alert('Success', 'Property deleted successfully');
                navigation.goBack();
              } else {
                throw new Error('Failed to delete property');
              }
            } catch (error) {
              console.error('Error deleting property:', error);
              Alert.alert('Error', 'Failed to delete property');
            }
          },
        },
      ]
    );
  };

  const formatPrice = (salePrice?: number | null, rentalPrice?: number | null, statusName?: string) => {
    const price = salePrice || rentalPrice || 0;
    if (!price) return 'Price not set';
    
    if (statusName?.toLowerCase().includes('rent') || rentalPrice) {
      return price >= 1000000 
        ? `${(price / 1000000).toFixed(1)}M EGP/mo`
        : `${price.toLocaleString()} EGP/mo`;
    }
    
    return price >= 1000000 
      ? `${(price / 1000000).toFixed(1)}M EGP`
      : `${price.toLocaleString()} EGP`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading property...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={theme.colors.textSecondary} />
          <Text style={styles.errorText}>Property not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          {property.images && property.images.length > 0 ? (
            <Image source={{ uri: property.images[0].image_url }} style={styles.imageContainer} resizeMode="cover" />
          ) : (
            <View style={[styles.imageContainer, styles.placeholderImage]}>
              <Ionicons name="image-outline" size={64} color={theme.colors.textSecondary} />
              <Text style={styles.placeholderText}>No Image Available</Text>
            </View>
          )}
          
          {/* Status Badge on Image */}
          <View style={[styles.statusBadgeOverlay, property.is_active ? styles.activeOverlay : styles.inactiveOverlay]}>
            <Ionicons
              name={property.is_active ? 'globe-outline' : 'lock-closed-outline'}
              size={16}
              color="#ffffff"
            />
            <Text style={styles.statusOverlayText}>
              {property.is_active ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Title & Price Card */}
          <View style={styles.card}>
            <Text style={styles.title}>{property.property_name || property.title || 'Property'}</Text>
            <Text style={styles.price}>
              {formatPrice(property.sale_price, property.rental_price_monthly, property.status?.name)}
            </Text>
            
            {/* Location */}
            <View style={styles.locationRow}>
              <Ionicons name="location" size={18} color={theme.colors.primary} />
              <Text style={styles.location}>
                {property.address || property.region?.display_name || property.region?.name || 'No location'}
              </Text>
            </View>

            {/* Quick Info Badges */}
            <View style={styles.badgeRow}>
              {property.type?.name && (
                <View style={[styles.badge, styles.typeBadge]}>
                  <Ionicons name="home" size={12} color="#2563eb" />
                  <Text style={styles.badgeText}>{property.type.name}</Text>
                </View>
              )}
              {property.status?.name && (
                <View style={[styles.badge, styles.statusBadge]}>
                  <Ionicons name="information-circle" size={12} color="#f59e0b" />
                  <Text style={styles.badgeText}>{property.status.name}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Key Features Card */}
          {(property.bedrooms_count || property.bathrooms_count || property.total_area) && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Ionicons name="grid" size={20} color={theme.colors.primary} /> Key Features
              </Text>
              <View style={styles.featuresGrid}>
                {property.bedrooms_count != null && (
                  <View style={styles.featureBox}>
                    <Ionicons name="bed" size={28} color={theme.colors.primary} />
                    <Text style={styles.featureValue}>{property.bedrooms_count}</Text>
                    <Text style={styles.featureLabel}>Bedrooms</Text>
                  </View>
                )}
                {property.bathrooms_count != null && (
                  <View style={styles.featureBox}>
                    <Ionicons name="water" size={28} color={theme.colors.primary} />
                    <Text style={styles.featureValue}>{property.bathrooms_count}</Text>
                    <Text style={styles.featureLabel}>Bathrooms</Text>
                  </View>
                )}
                {property.total_area != null && (
                  <View style={styles.featureBox}>
                    <Ionicons name="resize" size={28} color={theme.colors.primary} />
                    <Text style={styles.featureValue}>{property.total_area}</Text>
                    <Text style={styles.featureLabel}>m² Total</Text>
                  </View>
                )}
                {property.living_rooms_count != null && (
                  <View style={styles.featureBox}>
                    <Ionicons name="tv" size={28} color={theme.colors.primary} />
                    <Text style={styles.featureValue}>{property.living_rooms_count}</Text>
                    <Text style={styles.featureLabel}>Living Rooms</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Description Card */}
          {property.description && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Ionicons name="document-text" size={20} color={theme.colors.primary} /> Description
              </Text>
              <Text style={styles.description}>{property.description}</Text>
            </View>
          )}

          {/* Property Details Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              <Ionicons name="information-circle" size={20} color={theme.colors.primary} /> Property Details
            </Text>
            <View style={styles.detailsGrid}>
              {property.property_number && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Property #</Text>
                  <Text style={styles.detailValue}>{property.property_number}</Text>
                </View>
              )}
              {property.category?.name && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Category</Text>
                  <Text style={styles.detailValue}>{property.category.name}</Text>
                </View>
              )}
              {property.sub_category?.name && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Sub Category</Text>
                  <Text style={styles.detailValue}>{property.sub_category.name}</Text>
                </View>
              )}
              {property.finishing_status?.name && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Finishing</Text>
                  <Text style={styles.detailValue}>{property.finishing_status.name}</Text>
                </View>
              )}
              {property.furnishing_status?.name && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Furnishing</Text>
                  <Text style={styles.detailValue}>{property.furnishing_status.name}</Text>
                </View>
              )}
              {property.construction_status?.name && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Construction</Text>
                  <Text style={styles.detailValue}>{property.construction_status.name}</Text>
                </View>
              )}
              {property.condition?.name && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Condition</Text>
                  <Text style={styles.detailValue}>{property.condition.name}</Text>
                </View>
              )}
              {property.ownership_status?.name && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Ownership</Text>
                  <Text style={styles.detailValue}>{property.ownership_status.name}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Dimensions Card */}
          {(property.built_area || property.land_area || property.floor_number) && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Ionicons name="cube" size={20} color={theme.colors.primary} /> Dimensions & Layout
              </Text>
              <View style={styles.detailsGrid}>
                {property.built_area != null && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Built Area</Text>
                    <Text style={styles.detailValue}>{property.built_area} m²</Text>
                  </View>
                )}
                {property.land_area != null && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Land Area</Text>
                    <Text style={styles.detailValue}>{property.land_area} m²</Text>
                  </View>
                )}
                {property.garden_area != null && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Garden</Text>
                    <Text style={styles.detailValue}>{property.garden_area} m²</Text>
                  </View>
                )}
                {property.roof_area != null && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Roof</Text>
                    <Text style={styles.detailValue}>{property.roof_area} m²</Text>
                  </View>
                )}
                {property.floor_number && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Floor</Text>
                    <Text style={styles.detailValue}>{property.floor_number}</Text>
                  </View>
                )}
                {property.total_floors_in_building != null && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Total Floors</Text>
                    <Text style={styles.detailValue}>{property.total_floors_in_building}</Text>
                  </View>
                )}
                {property.kitchen_count != null && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Kitchens</Text>
                    <Text style={styles.detailValue}>{property.kitchen_count}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Location Details Card */}
          {(property.compound?.name || property.district?.name || property.street) && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Ionicons name="map" size={20} color={theme.colors.primary} /> Location Details
              </Text>
              <View style={styles.detailsGrid}>
                {property.compound?.name && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Compound</Text>
                    <Text style={styles.detailValue}>{property.compound.name}</Text>
                  </View>
                )}
                {property.district?.name && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>District</Text>
                    <Text style={styles.detailValue}>{property.district.name}</Text>
                  </View>
                )}
                {property.street && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Street</Text>
                    <Text style={styles.detailValue}>{property.street}</Text>
                  </View>
                )}
                {property.building_name && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Building:</Text>
                    <Text style={styles.detailValue}>{property.building_name}</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
              <Ionicons name="pencil" size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Edit Property</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
              <Ionicons name="trash" size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.border,
    position: 'relative',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.border,
  },
  placeholderText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    marginTop: 8,
  },
  statusBadgeOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeOverlay: {
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
  },
  inactiveOverlay: {
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
  },
  statusOverlayText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: '#ffffff',
  },
  mainContent: {
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.textPrimary,
    flex: 1,
  },
  price: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.primary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: theme.spacing.sm,
  },
  location: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeBadge: {
    backgroundColor: theme.colors.primary + '20',
  },
  statusBadge: {
    backgroundColor: theme.colors.success + '20',
  },
  badgeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  featureBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: theme.spacing.md,
  },
  featureValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: 8,
  },
  featureLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  description: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  detailsGrid: {
    gap: theme.spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  detailLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  detailValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: theme.spacing.lg,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.danger,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: '#ffffff',
  },
});

