import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useLanguageStore } from '../../stores/languageStore';
import { companyService } from '../../services/companyService';
import { CompanyProfile, UpdateCompanyProfileData } from '../../types/company';

export default function CompanyProfileCard() {
  const { t } = useLanguageStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [formData, setFormData] = useState<UpdateCompanyProfileData>({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    const data = await companyService.getProfile();
    if (data) {
      setProfile(data);
      setFormData({
        companyName: data.companyName || '',
        address: data.address || '',
        city: data.city || '',
        region: data.region || '',
        country: data.country || '',
        phone: data.phone || '',
        email: data.email || '',
        website: data.website || '',
        description: data.description || '',
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await companyService.updateProfile(formData);
      if (updated) {
        setProfile(updated);
        setEditing(false);
        Alert.alert(t('success'), 'Profile updated successfully');
      }
    } catch (error) {
      Alert.alert(t('error'), 'Failed to update profile');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setFormData({
      companyName: profile?.companyName || '',
      address: profile?.address || '',
      city: profile?.city || '',
      region: profile?.region || '',
      country: profile?.country || '',
      phone: profile?.phone || '',
      email: profile?.email || '',
      website: profile?.website || '',
      description: profile?.description || '',
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('companyProfile')}</Text>
        {!editing && (
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.editButton}>
            <Text style={styles.editButtonText}>{t('edit')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          {profile?.logoUrl ? (
            <Image source={{ uri: profile.logoUrl }} style={styles.logo} />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoPlaceholderText}>
                {profile?.companyName?.charAt(0) || profile?.name.charAt(0) || 'C'}
              </Text>
            </View>
          )}
          {editing && (
            <TouchableOpacity style={styles.changeLogoButton}>
              <Text style={styles.changeLogoText}>{t('changeLogo')}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('companyName')}</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.companyName}
                onChangeText={(text) => setFormData({ ...formData, companyName: text })}
                placeholder={t('companyName')}
              />
            ) : (
              <Text style={styles.value}>{profile?.companyName || profile?.name || '-'}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('address')}</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                placeholder={t('address')}
                multiline
              />
            ) : (
              <Text style={styles.value}>{profile?.address || '-'}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={[styles.fieldGroup, styles.halfWidth]}>
              <Text style={styles.label}>{t('city')}</Text>
              {editing ? (
                <TextInput
                  style={styles.input}
                  value={formData.city}
                  onChangeText={(text) => setFormData({ ...formData, city: text })}
                  placeholder={t('city')}
                />
              ) : (
                <Text style={styles.value}>{profile?.city || '-'}</Text>
              )}
            </View>

            <View style={[styles.fieldGroup, styles.halfWidth]}>
              <Text style={styles.label}>{t('region')}</Text>
              {editing ? (
                <TextInput
                  style={styles.input}
                  value={formData.region}
                  onChangeText={(text) => setFormData({ ...formData, region: text })}
                  placeholder={t('region')}
                />
              ) : (
                <Text style={styles.value}>{profile?.region || '-'}</Text>
              )}
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('country')}</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.country}
                onChangeText={(text) => setFormData({ ...formData, country: text })}
                placeholder={t('country')}
              />
            ) : (
              <Text style={styles.value}>{profile?.country || 'Egypt'}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('phone')}</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder={t('phone')}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{profile?.phone || profile?.mobile || '-'}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('email')}</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder={t('email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.value}>{profile?.email || '-'}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('website')}</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={formData.website}
                onChangeText={(text) => setFormData({ ...formData, website: text })}
                placeholder={t('website')}
                keyboardType="url"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.value}>{profile?.website || '-'}</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{t('description')}</Text>
            {editing ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder={t('description')}
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.value}>{profile?.description || '-'}</Text>
            )}
          </View>
        </View>

        {editing && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={saving}
            >
              <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.saveButtonText}>{t('saveChanges')}</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    maxHeight: 600,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholderText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ffffff',
  },
  changeLogoButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  changeLogoText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  formSection: {
    gap: 16,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#1e293b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
