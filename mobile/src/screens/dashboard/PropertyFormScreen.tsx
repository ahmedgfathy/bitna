import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PropertiesStackParamList } from '../navigation/PropertiesStackNavigator';
import {
  MOCK_REGIONS,
  MOCK_PROPERTY_TYPES,
  MOCK_CATEGORIES,
} from '../../data/mockData';

type PropertyFormRouteProp = RouteProp<PropertiesStackParamList, 'PropertyForm'>;
type PropertyFormNavigationProp = NativeStackNavigationProp<PropertiesStackParamList>;

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

interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  location: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
  propertyType: string;
  category: string;
  region: string;
  isPublic: boolean;
}

export default function PropertyFormScreen() {
  const navigation = useNavigation<PropertyFormNavigationProp>();
  const route = useRoute<PropertyFormRouteProp>();
  const { propertyId, mode } = route.params;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: '',
    location: '',
    latitude: '',
    longitude: '',
    imageUrl: '',
    propertyType: 'Apartment',
    category: 'For Sale',
    region: 'Cairo',
    isPublic: true,
  });

  useEffect(() => {
    if (mode === 'edit' && propertyId) {
      loadProperty();
    }
  }, [propertyId, mode]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/properties/${propertyId}`);
      // const data = await response.json();
      
      // Mock data for now
      setFormData({
        title: 'Luxury Villa - New Cairo',
        description: 'Modern 5-bedroom villa with private pool and garden',
        price: '12000000',
        location: 'Fifth Settlement, New Cairo',
        latitude: '30.0444',
        longitude: '31.2357',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        propertyType: 'Villa',
        category: 'For Sale',
        region: 'New Cairo',
        isPublic: true,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to load property');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid price');
      return false;
    }
    if (!formData.location.trim()) {
      Alert.alert('Validation Error', 'Please enter a location');
      return false;
    }
    if (!formData.imageUrl.trim()) {
      Alert.alert('Validation Error', 'Please enter an image URL');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      // const url = mode === 'edit' ? `/api/properties/${propertyId}` : '/api/properties';
      // const method = mode === 'edit' ? 'PUT' : 'POST';
      // await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     price: parseFloat(formData.price),
      //     latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
      //     longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
      //   }),
      // });
      
      Alert.alert(
        'Success',
        `Property ${mode === 'edit' ? 'updated' : 'created'} successfully`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', `Failed to ${mode === 'edit' ? 'update' : 'create'} property`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && mode === 'edit') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading property...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={styles.field}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="e.g., Luxury Villa - New Cairo"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Detailed description of the property"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Price */}
        <View style={styles.field}>
          <Text style={styles.label}>Price (EGP) *</Text>
          <TextInput
            style={styles.input}
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            placeholder="e.g., 12000000"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="numeric"
          />
        </View>

        {/* Location */}
        <View style={styles.field}>
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
            placeholder="e.g., Fifth Settlement, New Cairo"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        {/* Region Picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Region *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.region}
              onValueChange={(value) => setFormData({ ...formData, region: value })}
              style={styles.picker}
            >
              {MOCK_REGIONS.map((region) => (
                <Picker.Item key={region.id} label={region.label} value={region.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Property Type Picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Property Type *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.propertyType}
              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              style={styles.picker}
            >
              {MOCK_PROPERTY_TYPES.map((type) => (
                <Picker.Item key={type.id} label={type.label} value={type.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Category Picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              style={styles.picker}
            >
              {MOCK_CATEGORIES.map((category) => (
                <Picker.Item key={category.id} label={category.label} value={category.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Image URL */}
        <View style={styles.field}>
          <Text style={styles.label}>Image URL *</Text>
          <TextInput
            style={styles.input}
            value={formData.imageUrl}
            onChangeText={(text) => setFormData({ ...formData, imageUrl: text })}
            placeholder="https://..."
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="none"
          />
        </View>

        {/* Coordinates (Optional) */}
        <View style={styles.row}>
          <View style={[styles.field, styles.halfField]}>
            <Text style={styles.label}>Latitude (Optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.latitude}
              onChangeText={(text) => setFormData({ ...formData, latitude: text })}
              placeholder="30.0444"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={[styles.field, styles.halfField]}>
            <Text style={styles.label}>Longitude (Optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.longitude}
              onChangeText={(text) => setFormData({ ...formData, longitude: text })}
              placeholder="31.2357"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Public Toggle */}
        <View style={styles.field}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.label}>Public Listing</Text>
              <Text style={styles.helperText}>
                Make this property visible on the public website
              </Text>
            </View>
            <Switch
              value={formData.isPublic}
              onValueChange={(value) => setFormData({ ...formData, isPublic: value })}
              trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
              thumbColor={formData.isPublic ? theme.colors.primary : '#f1f5f9'}
            />
          </View>
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
                {mode === 'edit' ? 'Update Property' : 'Create Property'}
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: 16,
  },
  helperText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
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
