import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LeadsStackParamList } from '../navigation/LeadsStackNavigator';

type LeadDetailRouteProp = RouteProp<LeadsStackParamList, 'LeadDetail'>;
type LeadDetailNavigationProp = NativeStackNavigationProp<LeadsStackParamList>;

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
    white: '#ffffff',
  },
  fontSize: {
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
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

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  status: string;
  assignedTo?: string;
  notes?: string;
  createdAt: Date;
}

export default function LeadDetailScreen() {
  const navigation = useNavigation<LeadDetailNavigationProp>();
  const route = useRoute<LeadDetailRouteProp>();
  const { leadId } = route.params;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLead();
  }, [leadId]);

  const loadLead = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockLead: Lead = {
        id: leadId,
        name: 'Ahmed Mohamed',
        phone: '+20 100 123 4567',
        email: 'ahmed@example.com',
        source: 'Website',
        status: 'New',
        assignedTo: 'Sara Ali',
        notes: 'Interested in luxury villas in New Cairo area. Budget around 10-15M EGP. Looking for 5-bedroom with pool and garden.',
        createdAt: new Date(),
      };
      
      setLead(mockLead);
    } catch (error) {
      Alert.alert('Error', 'Failed to load lead details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate('LeadForm', { leadId, mode: 'edit' });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Lead',
      'Are you sure you want to delete this lead? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: API call to delete
              Alert.alert('Success', 'Lead deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete lead');
            }
          },
        },
      ]
    );
  };

  const handleCall = () => {
    if (lead?.phone) {
      const phoneNumber = lead.phone.replace(/\s/g, '');
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleEmail = () => {
    if (lead?.email) {
      Linking.openURL(`mailto:${lead.email}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return '#3b82f6';
      case 'Contacted': return '#f59e0b';
      case 'Qualified': return '#10b981';
      case 'Lost': return '#ef4444';
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'New': return '✨';
      case 'Contacted': return '📞';
      case 'Qualified': return '✅';
      case 'Lost': return '❌';
      default: return '•';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading lead...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!lead) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={theme.colors.textSecondary} />
          <Text style={styles.errorText}>Lead not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = getStatusColor(lead.status);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Name & Status */}
          <View style={styles.header}>
            <Text style={styles.name}>{lead.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
              <Text style={styles.statusEmoji}>{getStatusEmoji(lead.status)}</Text>
              <Text style={[styles.statusText, { color: statusColor }]}>{lead.status}</Text>
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <TouchableOpacity style={styles.contactRow} onPress={handleCall}>
              <Ionicons name="call-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.contactText}>{lead.phone}</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            {lead.email && (
              <TouchableOpacity style={styles.contactRow} onPress={handleEmail}>
                <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
                <Text style={styles.contactText}>{lead.email}</Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Lead Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lead Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Source:</Text>
              <View style={styles.sourceBadge}>
                <Text style={styles.sourceBadgeText}>{lead.source}</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <Text style={[styles.detailValue, { color: statusColor }]}>{lead.status}</Text>
            </View>
            {lead.assignedTo && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Assigned To:</Text>
                <View style={styles.assignedBadge}>
                  <Ionicons name="person-outline" size={14} color={theme.colors.textPrimary} />
                  <Text style={styles.detailValue}>{lead.assignedTo}</Text>
                </View>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Created:</Text>
              <Text style={styles.detailValue}>{lead.createdAt.toLocaleDateString()}</Text>
            </View>
          </View>

          {/* Notes */}
          {lead.notes && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <View style={styles.notesContainer}>
                <Text style={styles.notesText}>{lead.notes}</Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons name="create-outline" size={20} color="#ffffff" />
              <Text style={styles.buttonText}>Edit Lead</Text>
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
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  name: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusEmoji: {
    fontSize: 16,
  },
  statusText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
    gap: 12,
  },
  contactText: {
    flex: 1,
    fontSize: theme.fontSize.base,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
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
  sourceBadge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sourceBadgeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  assignedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notesContainer: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  notesText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.textSecondary,
    lineHeight: 24,
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
