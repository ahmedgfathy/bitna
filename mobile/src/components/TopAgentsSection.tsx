import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../config/theme';

interface TopAgent {
  id: string;
  name: string;
  company: string;
  rating: number;
  propertiesCount: number;
  imageUrl: string;
}

interface TopAgentsSectionProps {
  agents: TopAgent[];
  onAgentPress: (id: string) => void;
  onViewAll: () => void;
}

export default function TopAgentsSection({ agents, onAgentPress, onViewAll }: TopAgentsSectionProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i < rating ? '⭐' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  const renderAgent = ({ item }: { item: TopAgent }) => (
    <TouchableOpacity style={styles.card} onPress={() => onAgentPress(item.id)} activeOpacity={0.8}>
      <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.agentName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.company} numberOfLines={1}>
          {item.company}
        </Text>
        <View style={styles.rating}>{renderStars(item.rating)}</View>
        <Text style={styles.propertiesCount}>{item.propertiesCount} listings</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>👨‍💼 Top Agents</Text>
          <Text style={styles.subtitle}>Connect with verified professionals</Text>
        </View>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={agents}
        renderItem={renderAgent}
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
    width: 160,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginRight: spacing.base,
    alignItems: 'center',
    ...shadows.base,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  agentName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  company: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  rating: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  star: {
    fontSize: typography.fontSize.sm,
    marginHorizontal: 1,
  },
  propertiesCount: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    fontWeight: typography.fontWeight.medium,
  },
});
