import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthenticatedStackParamList } from '../../types/navigation';

type LeadFormRouteProp = RouteProp<AuthenticatedStackParamList, 'LeadForm'>;
type LeadFormNavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

const theme = {
  colors: {
    primary: '#2563eb',
    background: '#f8fafc',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    white: '#ffffff',
  },
  fontSize: {
    sm: 14,
    base: 16,
    lg: 18,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
    xl: 24,
  },
};

const SOURCES = ['Website', 'Phone Call', 'Referral', 'Social Media', 'Walk-in', 'Email'];
const STATUSES = ['New', 'Contacted', 'Qualified', 'Lost'];
const MOCK_EMPLOYEES = ['Sara Ali', 'Ahmed Ibrahim', 'Mohamed Hassan', 'Fatma Ahmed'];

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  source: string;
  status: string;
  assignedTo: string;
  notes: string;
}

export default function LeadFormScreen() {
  const navigation = useNavigation<LeadFormNavigationProp>();
  const route = useRoute<LeadFormRouteProp>();
  const { leadId, mode } = route.params;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    source: 'Website',
    status: 'New',
    assignedTo: '',
    notes: '',
  });

  useEffect(() => {
    if (mode === 'edit' && leadId) {
      loadLead();
    }
  }, [leadId, mode]);

  const loadLead = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      setFormData({
        name: 'Ahmed Mohamed',
        phone: '+20 100 123 4567',
        email: 'ahmed@example.com',
        source: 'Website',
        status: 'New',
        assignedTo: 'Sara Ali',
        notes: 'Interested in luxury villas in New Cairo area.',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to load lead');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Validation Error', 'Please enter a phone number');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      // TODO: Replace with actual API call
      Alert.alert(
        'Success',
        `Lead ${mode === 'edit' ? 'updated' : 'created'} successfully`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', `Failed to ${mode === 'edit' ? 'update' : 'create'} lead`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && mode === 'edit') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading lead...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="e.g., Ahmed Mohamed"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        {/* Phone */}
        <View style={styles.field}>
          <Text style={styles.label}>Phone *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="+20 100 123 4567"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        {/* Email */}
        <View style={styles.field}>
          <Text style={styles.label}>Email (Optional)</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="email@example.com"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Source Picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Source *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.source}
              onValueChange={(value: string) => setFormData({ ...formData, source: value })}
              style={styles.picker}
            >
              {SOURCES.map((source) => (
                <Picker.Item key={source} label={source} value={source} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Status Picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Status *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.status}
              onValueChange={(value: string) => setFormData({ ...formData, status: value })}
              style={styles.picker}
            >
              {STATUSES.map((status) => (
                <Picker.Item key={status} label={status} value={status} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Assigned To Picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Assign To (Optional)</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.assignedTo}
              onValueChange={(value: string) => setFormData({ ...formData, assignedTo: value })}
              style={styles.picker}
            >
              <Picker.Item label="Unassigned" value="" />
              {MOCK_EMPLOYEES.map((employee) => (
                <Picker.Item key={employee} label={employee} value={employee} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.field}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Add any additional notes about this lead..."
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" />
              <Text style={styles.saveButtonText}>
                {mode === 'edit' ? 'Update Lead' : 'Create Lead'}
              </Text>
            </>
          )}
        </TouchableOpacity>
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
  scrollContent: {
    padding: theme.spacing.lg,
  },
  field: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: theme.fontSize.base,
    color: theme.colors.textPrimary,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  pickerContainer: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: theme.spacing.md,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: theme.fontSize.base,
    fontWeight: '600',
    color: '#ffffff',
  },
});
