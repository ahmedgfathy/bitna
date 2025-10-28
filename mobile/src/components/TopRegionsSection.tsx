import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../config/theme';

interface TopRegion {
  id: string;
  name: string;
  propertyCount: number;
  imageUrl: string;
}

interface TopRegionsSectionProps {
  regions: TopRegion[];
  onRegionPress: (id: string) => void;
  onViewAll: () => void;
}

export default function TopRegionsSection({ regions, onRegionPress, onViewAll }: TopRegionsSectionProps) {
  const renderRegion = ({ item }: { item: TopRegion }) => (
    <TouchableOpacity style={styles.card} onPress={() => onRegionPress(item.id)} activeOpacity={0.8}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.regionName}>{item.name}</Text>
        <Text style={styles.propertyCount}>{item.propertyCount} Properties</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>📍 Top Regions</Text>
          <Text style={styles.subtitle}>Popular areas with most properties</Text>
        </View>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={regions}
        renderItem={renderRegion}
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
    width: 200,
    height: 140,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginRight: spacing.base,
    ...shadows.base,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.base,
  },
  regionName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  propertyCount: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
});
