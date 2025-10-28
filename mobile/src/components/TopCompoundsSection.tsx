import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../config/theme';

interface TopCompound {
  id: string;
  name: string;
  location: string;
  propertiesCount: number;
  imageUrl: string;
  priceRange: string;
}

interface TopCompoundsSectionProps {
  compounds: TopCompound[];
  onCompoundPress: (id: string) => void;
  onViewAll: () => void;
}

export default function TopCompoundsSection({ compounds, onCompoundPress, onViewAll }: TopCompoundsSectionProps) {
  const renderCompound = ({ item }: { item: TopCompound }) => (
    <TouchableOpacity style={styles.card} onPress={() => onCompoundPress(item.id)} activeOpacity={0.8}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.compoundName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          📍 {item.location}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.propertiesCount}>{item.propertiesCount} units</Text>
          <Text style={styles.priceRange}>{item.priceRange}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>🏘️ Top Compounds</Text>
          <Text style={styles.subtitle}>Most popular residential communities</Text>
        </View>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={compounds}
        renderItem={renderCompound}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
  listContent: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.base,
  },
  card: {
    width: 240,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginRight: spacing.base,
    ...shadows.base,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: colors.border,
  },
  content: {
    padding: spacing.base,
  },
  compoundName: {
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
  propertiesCount: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  priceRange: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
});
