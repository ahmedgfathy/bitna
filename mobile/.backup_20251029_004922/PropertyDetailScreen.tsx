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
              // TODO: API call to delete
              // await fetch(`/api/properties/${propertyId}`, { method: 'DELETE' });
              Alert.alert('Success', 'Property deleted successfully');
              navigation.goBack();
            } catch (error) {
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image */}
        {property.images && property.images[0] ? (
          <Image source={{ uri: property.images[0].image_url }} style={styles.image} />
        ) : (
          <View style={[styles.image, { backgroundColor: theme.colors.secondary, justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="home-outline" size={64} color={theme.colors.textSecondary} />
          </View>
        )}

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Status */}
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{property.property_name || property.title || 'Property'}</Text>
              <View style={styles.statusBadge}>
                <Ionicons
                  name={property.is_active ? 'globe-outline' : 'lock-closed-outline'}
                  size={14}
                  color={property.is_active ? theme.colors.success : theme.colors.textSecondary}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: property.is_active ? theme.colors.success : theme.colors.textSecondary },
                  ]}
                >
                  {property.is_active ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
          </View>

          {/* Price */}
          <Text style={styles.price}>
            {formatPrice(property.sale_price, property.rental_price_monthly, property.status?.name)}
          </Text>

          {/* Location */}
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.location}>
              {property.address || property.region?.display_name || property.region?.name || 'No location'}
            </Text>
          </View>

          {/* Type & Category Badges */}
          <View style={styles.badgeRow}>
            {property.type?.name && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{property.type.name}</Text>
              </View>
            )}
            {property.status?.name && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{property.status.name}</Text>
              </View>
            )}
            {property.region?.display_name && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{property.region.display_name}</Text>
              </View>
            )}
          </View>

          {/* Description */}
          {property.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{property.description}</Text>
            </View>
          )}

          {/* Property Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property Details</Text>
            
            {property.property_number && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Property Number:</Text>
                <Text style={styles.detailValue}>{property.property_number}</Text>
              </View>
            )}
            
            {property.type?.name && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{property.type.name}</Text>
              </View>
            )}
            
            {property.status?.name && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={styles.detailValue}>{property.status.name}</Text>
              </View>
            )}
            
            {property.category?.name && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category:</Text>
                <Text style={styles.detailValue}>{property.category.name}</Text>
              </View>
            )}
            
            {property.finishing_status?.name && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Finishing:</Text>
                <Text style={styles.detailValue}>{property.finishing_status.name}</Text>
              </View>
            )}
            
            {property.bedrooms_count != null && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Bedrooms:</Text>
                <Text style={styles.detailValue}>{property.bedrooms_count}</Text>
              </View>
            )}
            
            {property.bathrooms_count != null && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Bathrooms:</Text>
                <Text style={styles.detailValue}>{property.bathrooms_count}</Text>
              </View>
            )}
            
            {property.total_area != null && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Area:</Text>
                <Text style={styles.detailValue}>{property.total_area} m²</Text>
              </View>
            )}
            
            {property.land_area != null && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Land Area:</Text>
                <Text style={styles.detailValue}>{property.land_area} m²</Text>
              </View>
            )}
            
            {property.region?.display_name && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Region:</Text>
                <Text style={styles.detailValue}>{property.region.display_name}</Text>
              </View>
            )}
            
            {property.district?.name && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>District:</Text>
                <Text style={styles.detailValue}>{property.district.name}</Text>
              </View>
            )}
            
            {property.compound?.name && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Compound:</Text>
                <Text style={styles.detailValue}>{property.compound.name}</Text>
              </View>
            )}
            
            {property.floor_number && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Floor:</Text>
                <Text style={styles.detailValue}>{property.floor_number}</Text>
              </View>
            )}
            
            {property.latitude && property.longitude && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Coordinates:</Text>
                <Text style={styles.detailValue}>
                  {property.latitude.toFixed(4)}, {property.longitude.toFixed(4)}
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons name="create-outline" size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Edit Property</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color="#ffffff" />
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
  image: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.border,
  },
  content: {
    padding: theme.spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  price: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: theme.spacing.md,
  },
  location: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: theme.spacing.lg,
  },
  badge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
