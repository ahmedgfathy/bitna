import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList, PropertyType } from '../../types/navigation';

type PropertyDetailsProps = NativeStackScreenProps<PublicStackParamList, 'PropertyDetails'>;

// Mock property data (later fetch from API using propertyId)
const MOCK_PROPERTY: PropertyType = {
  id: '1',
  title: 'Modern Villa in New Cairo',
  description: 'Luxurious 4-bedroom villa with private pool and garden. This stunning property features modern architecture, spacious living areas, and high-end finishes throughout. Perfect for families seeking comfort and style in one of Cairo\'s most prestigious neighborhoods.\n\nFeatures:\n• 4 spacious bedrooms with en-suite bathrooms\n• Large living and dining areas\n• Modern kitchen with premium appliances\n• Private swimming pool\n• Landscaped garden\n• Covered parking for 2 cars\n• 24/7 security\n• Close to international schools and shopping centers',
  price: 8500000,
  location: 'New Cairo, Cairo',
  latitude: 30.0444,
  longitude: 31.2357,
  imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  propertyType: 'Villa',
  category: 'For Sale',
  region: 'Cairo',
  isPublic: true,
};

const { width } = Dimensions.get('window');

export default function PropertyDetailsScreen({ route, navigation }: PropertyDetailsProps) {
  const { propertyId } = route.params;
  
  // TODO: Fetch property from API using propertyId
  const property = MOCK_PROPERTY;

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M EGP`;
    }
    return `${price.toLocaleString()} EGP`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Property Image */}
        <Image
          source={{ uri: property.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Property Info */}
        <View style={styles.content}>
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{property.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{property.title}</Text>

          {/* Location */}
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>{property.location}</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>{formatPrice(property.price)}</Text>
          </View>

          {/* Property Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>{property.propertyType}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Region</Text>
              <Text style={styles.detailValue}>{property.region}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          {/* Contact Agent Section */}
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Interested in this property?</Text>
            <Text style={styles.contactSubtitle}>
              Join Bitna to connect with the agent and get more details
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => navigation.navigate('Subscribe')}
            >
              <Text style={styles.contactButtonText}>Join Now to Contact Agent</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Already have an account? Login</Text>
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
    backgroundColor: '#f8fafc',
  },
  image: {
    width: width,
    height: width * 0.75,
    backgroundColor: '#e2e8f0',
  },
  content: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    color: '#10b981',
    fontWeight: '700',
    fontSize: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    lineHeight: 32,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  locationText: {
    fontSize: 16,
    color: '#64748b',
  },
  priceContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2563eb',
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  detailItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  contactSection: {
    backgroundColor: '#eff6ff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 12,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  loginButton: {
    paddingVertical: 12,
  },
  loginButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
});
