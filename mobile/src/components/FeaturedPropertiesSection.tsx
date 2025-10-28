import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../config/theme';

interface FeaturedProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
  category: string;
}

interface FeaturedPropertiesSectionProps {
  properties: FeaturedProperty[];
  onPropertyPress: (id: string) => void;
  onViewAll: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export default function FeaturedPropertiesSection({
  properties,
  onPropertyPress,
  onViewAll,
}: FeaturedPropertiesSectionProps) {
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M EGP`;
    }
    return `${price.toLocaleString()} EGP`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>✨ Featured Properties</Text>
          <Text style={styles.subtitle}>Handpicked listings just for you</Text>
        </View>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_WIDTH + spacing.base}
        decelerationRate="fast"
      >
        {properties.map((property, index) => (
          <TouchableOpacity
            key={property.id}
            style={[styles.card, index === 0 && styles.firstCard]}
            onPress={() => onPropertyPress(property.id)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: property.imageUrl }} style={styles.image} resizeMode="cover" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>FEATURED</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.propertyTitle} numberOfLines={1}>
                {property.title}
              </Text>
              <Text style={styles.location} numberOfLines={1}>
                📍 {property.location}
              </Text>
              <View style={styles.footer}>
                <Text style={styles.price}>{formatPrice(property.price)}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{property.category}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.base,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  viewAll: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  scrollContent: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.base,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginRight: spacing.base,
    overflow: 'hidden',
    ...shadows.md,
  },
  firstCard: {
    marginLeft: 0,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  badge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  cardContent: {
    padding: spacing.base,
  },
  propertyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  location: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  categoryBadge: {
    backgroundColor: colors.secondary + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.secondary,
  },
});
