import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../config/theme';
import CSVImportModal from '../../components/CSVImportModal';
import apiClient from '../../services/api';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width > 768;
const numColumns = isDesktop ? (width > 1200 ? 3 : 2) : 1;

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  status: string;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
}

export default function LeadsScreen({ navigation }: any) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterSource, setFilterSource] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeadsList();
  }, [searchQuery, filterSource, filterStatus, leads]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      
      // Fetch from real API
      const response = await apiClient.get('/leads');
      
      if (response.data.status === 'success') {
        setLeads(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to load leads');
      }
    } catch (error: any) {
      console.error('Failed to load leads:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to load leads');
      // Set empty array on error
      setLeads([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterLeadsList = () => {
    let filtered = leads;

    if (searchQuery) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filterSource) {
      filtered = filtered.filter((lead) => lead.source === filterSource);
    }

    if (filterStatus) {
      filtered = filtered.filter((lead) => lead.status === filterStatus);
    }

    setFilteredLeads(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadLeads();
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    setSelectedIds(new Set(filteredLeads.map(l => l.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    Alert.alert(
      'Delete Leads',
      `Delete ${selectedIds.size} lead${selectedIds.size === 1 ? '' : 's'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const remainingLeads = leads.filter(l => !selectedIds.has(l.id));
            setLeads(remainingLeads);
            clearSelection();
            Alert.alert('Success', 'Leads deleted');
          },
        },
      ]
    );
  };

  const handleImportSuccess = async (importedLeads: any[]) => {
    try {
      // Show loading
      Alert.alert('Saving...', 'Importing leads to database...');
      
      // Map to database format
      const leadsToImport = importedLeads.map(lead => ({
        name: lead.name || 'No Name',
        mobile: lead.phone || '',
        email: lead.email || null,
        source: mapSource(lead.source),
        status: mapStatus(lead.status),
        notes: lead.notes || null,
      }));

      // Send to API
      const response = await apiClient.post('/leads/bulk', {
        leads: leadsToImport
      });

      if (response.data.status === 'success') {
        // Reload leads from database
        await loadLeads();
        
        Alert.alert(
          'Import Successful! 🎉',
          `${response.data.count} leads have been saved to database!`
        );
      } else {
        throw new Error(response.data.message || 'Failed to import leads');
      }
    } catch (error: any) {
      console.error('Failed to import leads:', error);
      Alert.alert(
        'Import Failed',
        error.response?.data?.message || error.message || 'Failed to save leads to database'
      );
    }
  };

  // Map lead source to enum values
  const mapSource = (source: string): string => {
    const sourceMap: Record<string, string> = {
      'Facebook': 'SOCIAL_MEDIA',
      'Instagram': 'SOCIAL_MEDIA',
      'Website': 'WEBSITE',
      'Referral': 'REFERRAL',
      'Phone Call': 'DIRECT_CALL',
      'Walk-in': 'WALK_IN',
      'Email': 'OTHER',
    };
    return sourceMap[source] || 'OTHER';
  };

  // Map lead status to enum values
  const mapStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'new': 'NEW',
      'contacted': 'CONTACTED',
      'qualified': 'QUALIFIED',
      'negotiating': 'NEGOTIATING',
      'converted': 'WON',
      'lost': 'LOST',
    };
    return statusMap[status.toLowerCase()] || 'NEW';
  };

  const handleBulkChangeStatus = (newStatus: string) => {
    Alert.alert(
      'Change Status',
      `Change ${selectedIds.size} lead${selectedIds.size === 1 ? '' : 's'} to ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            const updatedLeads = leads.map(l =>
              selectedIds.has(l.id) ? { ...l, status: newStatus } : l
            );
            setLeads(updatedLeads);
            clearSelection();
            Alert.alert('Success', 'Status updated');
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return '#3b82f6';
      case 'Contacted':
        return '#f59e0b';
      case 'Qualified':
        return '#10b981';
      case 'Lost':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'New':
        return '✨';
      case 'Contacted':
        return '📞';
      case 'Qualified':
        return '✅';
      case 'Lost':
        return '❌';
      default:
        return '📋';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderLeadCard = ({ item }: { item: Lead }) => {
    const isSelected = selectedIds.has(item.id);
    const hasSelections = selectedIds.size > 0;

    const handleCardPress = () => {
      if (hasSelections) {
        // If in selection mode, toggle selection
        toggleSelection(item.id);
      } else {
        // Otherwise navigate to detail
        navigation.navigate('LeadDetail', { leadId: item.id });
      }
    };

    return (
      <TouchableOpacity
        style={[styles.leadCard, isSelected && styles.leadCardSelected]}
        onPress={handleCardPress}
        onLongPress={() => toggleSelection(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.checkbox}>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.leadName}>{item.name}</Text>
            <View style={[styles.statusPill, { backgroundColor: getStatusColor(item.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {getStatusEmoji(item.status)} {item.status}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>📱 {item.phone}</Text>
          {item.email && <Text style={styles.contactText}>📧 {item.email}</Text>}
        </View>

        <View style={styles.metaRow}>
          <View style={styles.sourceBadge}>
            <Text style={styles.sourceBadgeText}>{item.source}</Text>
          </View>
          {item.assignedTo && (
            <Text style={styles.assignedText}>👤 {item.assignedTo}</Text>
          )}
        </View>

        {item.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            💬 {item.notes}
          </Text>
        )}

        <Text style={styles.timestamp}>{formatDate(item.createdAt)}</Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text style={styles.screenTitle}>Leads</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('LeadForm')}
          >
            <Text style={styles.addButtonText}>➕ Add Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.importButton}
            onPress={() => setShowImportModal(true)}
          >
            <Text style={styles.importButtonText}>📥 Import CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search leads..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={theme.colors.textSecondary}
      />

      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'New' && styles.filterChipActive]}
          onPress={() => setFilterStatus(filterStatus === 'New' ? '' : 'New')}
        >
          <Text style={[styles.filterChipText, filterStatus === 'New' && styles.filterChipTextActive]}>
            New
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'Contacted' && styles.filterChipActive]}
          onPress={() => setFilterStatus(filterStatus === 'Contacted' ? '' : 'Contacted')}
        >
          <Text style={[styles.filterChipText, filterStatus === 'Contacted' && styles.filterChipTextActive]}>
            Contacted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterStatus === 'Qualified' && styles.filterChipActive]}
          onPress={() => setFilterStatus(filterStatus === 'Qualified' ? '' : 'Qualified')}
        >
          <Text style={[styles.filterChipText, filterStatus === 'Qualified' && styles.filterChipTextActive]}>
            Qualified
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, filterSource === 'Website' && styles.filterChipActive]}
          onPress={() => setFilterSource(filterSource === 'Website' ? '' : 'Website')}
        >
          <Text style={[styles.filterChipText, filterSource === 'Website' && styles.filterChipTextActive]}>
            Website
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultsCount}>
        {filteredLeads.length} lead{filteredLeads.length === 1 ? '' : 's'}
        {selectedIds.size > 0 && ` • ${selectedIds.size} selected`}
      </Text>
    </View>
  );

  const renderBulkActions = () => {
    if (selectedIds.size === 0) return null;

    return (
      <View style={styles.bulkActionsBar}>
        <TouchableOpacity onPress={selectAll} style={styles.bulkAction}>
          <Text style={styles.bulkActionText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearSelection} style={styles.bulkAction}>
          <Text style={styles.bulkActionText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleBulkChangeStatus('Contacted')} style={styles.bulkAction}>
          <Text style={styles.bulkActionText}>📞</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleBulkChangeStatus('Qualified')} style={styles.bulkAction}>
          <Text style={styles.bulkActionText}>✅</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBulkDelete} style={[styles.bulkAction, styles.bulkActionDanger]}>
          <Text style={[styles.bulkActionText, styles.bulkActionDangerText]}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading leads...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={isDesktop ? styles.desktopWrapper : undefined}>
        <FlatList
          data={filteredLeads}
          renderItem={renderLeadCard}
          keyExtractor={(item) => item.id}
          key={numColumns} // Force re-render when columns change
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={[styles.listContent, isDesktop && styles.listContentDesktop]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No leads found</Text>
              <Text style={styles.emptyStateSubtext}>
                {searchQuery || filterSource || filterStatus
                  ? 'Try adjusting filters'
                  : 'Create your first lead'}
              </Text>
            </View>
          }
        />
        {renderBulkActions()}
        
        {/* CSV Import Modal */}
        <CSVImportModal
          visible={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImportSuccess={handleImportSuccess}
          type="leads"
        />

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('LeadForm', { mode: 'create' })}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  desktopWrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  listContent: {
    paddingBottom: 80,
  },
  listContentDesktop: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: 16,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  screenTitle: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },
  importButton: {
    backgroundColor: '#42b72a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  importButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: theme.spacing.md,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  filterChipTextActive: {
    color: theme.colors.white,
  },
  resultsCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  leadCard: {
    backgroundColor: theme.colors.white,
    marginHorizontal: isDesktop ? 0 : theme.spacing.lg,
    marginTop: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.base,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: isDesktop ? 1 : undefined,
    maxWidth: isDesktop ? (width > 1200 ? '32%' : '48%') : undefined,
  },
  leadCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#eff6ff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  checkmark: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leadName: {
    flex: 1,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
  },
  statusPill: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  contactInfo: {
    marginBottom: theme.spacing.sm,
    gap: 4,
  },
  contactText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sourceBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background,
  },
  sourceBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  assignedText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  notes: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: theme.spacing.xs,
  },
  timestamp: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    textAlign: 'right',
  },
  bulkActionsBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  bulkAction: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  bulkActionDanger: {
    backgroundColor: '#fee2e2',
  },
  bulkActionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  bulkActionDangerText: {
    color: '#dc2626',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  emptyState: {
    padding: theme.spacing['3xl'],
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  emptyStateSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: 32,
    fontWeight: '300',
    color: '#ffffff',
  },
});
