import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../config/theme';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterBarProps {
  regions: FilterOption[];
  propertyTypes: FilterOption[];
  categories: FilterOption[];
  onFilterChange: (filters: { region?: string; propertyType?: string; category?: string }) => void;
}

export default function FilterBar({ regions, propertyTypes, categories, onFilterChange }: FilterBarProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [activeModal, setActiveModal] = useState<'region' | 'type' | 'category' | null>(null);

  const handleFilterSelect = (filterType: 'region' | 'type' | 'category', value: string) => {
    let newFilters: any = {
      region: selectedRegion,
      propertyType: selectedType,
      category: selectedCategory,
    };

    if (filterType === 'region') {
      const newValue = selectedRegion === value ? undefined : value;
      setSelectedRegion(newValue);
      newFilters.region = newValue;
    } else if (filterType === 'type') {
      const newValue = selectedType === value ? undefined : value;
      setSelectedType(newValue);
      newFilters.propertyType = newValue;
    } else {
      const newValue = selectedCategory === value ? undefined : value;
      setSelectedCategory(newValue);
      newFilters.category = newValue;
    }

    onFilterChange(newFilters);
    setActiveModal(null);
  };

  const renderFilterButton = (
    label: string,
    selectedValue: string | undefined,
    modalType: 'region' | 'type' | 'category'
  ) => (
    <TouchableOpacity
      style={[styles.filterButton, selectedValue && styles.filterButtonActive]}
      onPress={() => setActiveModal(modalType)}
    >
      <Text style={[styles.filterButtonText, selectedValue && styles.filterButtonTextActive]}>
        {selectedValue || label}
      </Text>
      <Text style={styles.filterButtonIcon}>▼</Text>
    </TouchableOpacity>
  );

  const renderFilterModal = (
    title: string,
    options: FilterOption[],
    selectedValue: string | undefined,
    filterType: 'region' | 'type' | 'category'
  ) => (
    <Modal
      visible={activeModal === filterType}
      transparent
      animationType="fade"
      onRequestClose={() => setActiveModal(null)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setActiveModal(null)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={() => setActiveModal(null)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.modalOption,
                  selectedValue === option.value && styles.modalOptionActive,
                ]}
                onPress={() => handleFilterSelect(filterType, option.value)}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedValue === option.value && styles.modalOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
                {selectedValue === option.value && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderFilterButton('Region', selectedRegion, 'region')}
        {renderFilterButton('Property Type', selectedType, 'type')}
        {renderFilterButton('Category', selectedCategory, 'category')}
        
        {(selectedRegion || selectedType || selectedCategory) && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSelectedRegion(undefined);
              setSelectedType(undefined);
              setSelectedCategory(undefined);
              onFilterChange({});
            }}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {renderFilterModal('Select Region', regions, selectedRegion, 'region')}
      {renderFilterModal('Select Property Type', propertyTypes, selectedType, 'type')}
      {renderFilterModal('Select Category', categories, selectedCategory, 'category')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  scrollContent: {
    gap: spacing.sm,
    paddingRight: spacing.base,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    ...shadows.sm,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  filterButtonIcon: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
  },
  clearButton: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  clearButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '70%',
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  modalClose: {
    fontSize: typography.fontSize['2xl'],
    color: colors.textTertiary,
  },
  modalScroll: {
    padding: spacing.base,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.base,
    marginBottom: spacing.sm,
  },
  modalOptionActive: {
    backgroundColor: colors.primaryLight + '15',
  },
  modalOptionText: {
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  modalOptionTextActive: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  checkmark: {
    fontSize: typography.fontSize.lg,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
});
