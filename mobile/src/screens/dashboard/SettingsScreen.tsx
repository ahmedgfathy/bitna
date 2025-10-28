import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import CompanyProfileCard from '../../components/settings/CompanyProfileCard';
import EmployeeManagement from '../../components/settings/EmployeeManagement';

export default function SettingsScreen() {
  const { user, tenant, logout } = useAuthStore();
  const { t } = useLanguageStore();

  const isOwner = user?.role === 'owner';
  const isManager = user?.role === 'manager';
  const canManageCompany = isOwner;
  const canManageEmployees = isOwner || isManager;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{t('settings')}</Text>

        {/* Company Profile Section - Owners only */}
        {canManageCompany && <CompanyProfileCard />}

        {/* Employee Management Section - Owners and Managers */}
        {canManageEmployees && <EmployeeManagement />}

        {/* Account Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('accountSettings')}</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('name')}</Text>
              <Text style={styles.infoValue}>{user?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('mobileNumber')}</Text>
              <Text style={styles.infoValue}>{user?.mobile}</Text>
            </View>
            {user?.email && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t('email')}</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('employeeRole')}</Text>
              <Text style={styles.infoValue}>{user?.role}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tenant</Text>
              <Text style={styles.infoValue}>{tenant?.name}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton} disabled>
            <Text style={styles.actionText}>{t('editProfile')}</Text>
            <Text style={styles.comingSoonBadge}>Soon</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} disabled>
            <Text style={styles.actionText}>{t('changePassword')}</Text>
            <Text style={styles.comingSoonBadge}>Soon</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} disabled>
            <Text style={styles.actionText}>{t('notificationSettings')}</Text>
            <Text style={styles.comingSoonBadge}>Soon</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Bitna CRM v1.0.0</Text>
          <Text style={styles.footerText}>Development Mode</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionText: {
    fontSize: 16,
    color: '#64748b',
  },
  comingSoonBadge: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
});
