import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import CompanyProfileCard from '../../components/settings/CompanyProfileCard';
import EmployeeManagement from '../../components/settings/EmployeeManagement';

type TabType = 'account' | 'company' | 'team' | 'preferences';

export default function SettingsScreen() {
  const { user, tenant, logout } = useAuthStore();
  const { t, language } = useLanguageStore();
  const isRTL = language === 'ar';
  const [activeTab, setActiveTab] = useState<TabType>('account');
  
  // Modal states
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  
  // Edit profile form state
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editMobile, setEditMobile] = useState(user?.mobile || '');
  
  // Change password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleEditProfile = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setEditMobile(user?.mobile || '');
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = () => {
    // TODO: Implement API call to update profile
    Alert.alert('Success', 'Profile updated successfully (API integration pending)');
    setShowEditProfileModal(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    // TODO: Implement API call to change password
    Alert.alert('Success', 'Password changed successfully (API integration pending)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePasswordModal(false);
  };

  const tabs = [
    { id: 'account' as TabType, label: t('accountSettings'), icon: '👤' },
    ...(canManageCompany ? [{ id: 'company' as TabType, label: t('companyProfile'), icon: '🏢' }] : []),
    ...(canManageEmployees ? [{ id: 'team' as TabType, label: t('teamManagement'), icon: '👥' }] : []),
    { id: 'preferences' as TabType, label: t('preferences'), icon: '⚙️' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <View style={styles.tabContent}>
            {/* Profile Header with Avatar */}
            <View style={[styles.profileHeader, isRTL && styles.profileHeaderRTL]}>
              <View style={[styles.avatarContainer, isRTL && styles.avatarContainerRTL]}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.name?.charAt(0).toUpperCase() || '?'}
                  </Text>
                </View>
              </View>
              <View style={styles.profileHeaderInfo}>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileRole}>{user?.role}</Text>
                <Text style={styles.profileCompany}>{tenant?.companyName || tenant?.name}</Text>
              </View>
            </View>

            {/* Account Information Card */}
            <View style={styles.card}>
              <View style={[styles.cardHeader, isRTL && styles.cardHeaderRTL]}>
                <Text style={styles.cardTitle}>{t('personalInfo')}</Text>
                <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                  <Text style={styles.editButtonText}>✏️ {t('edit')}</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.infoGrid}>
                <View style={[styles.infoItem, isRTL && styles.infoItemRTL]}>
                  <Text style={styles.infoIcon}>👤</Text>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>{t('name')}</Text>
                    <Text style={styles.infoValue}>{user?.name}</Text>
                  </View>
                </View>

                <View style={[styles.infoItem, isRTL && styles.infoItemRTL]}>
                  <Text style={styles.infoIcon}>📱</Text>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>{t('mobileNumber')}</Text>
                    <Text style={styles.infoValue}>{user?.mobile}</Text>
                  </View>
                </View>

                {user?.email && (
                  <View style={[styles.infoItem, isRTL && styles.infoItemRTL]}>
                    <Text style={styles.infoIcon}>📧</Text>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>{t('email')}</Text>
                      <Text style={styles.infoValue}>{user.email}</Text>
                    </View>
                  </View>
                )}

                <View style={[styles.infoItem, isRTL && styles.infoItemRTL]}>
                  <Text style={styles.infoIcon}>💼</Text>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>{t('employeeRole')}</Text>
                    <View style={styles.roleBadge}>
                      <Text style={styles.roleBadgeText}>{user?.role}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Security Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>🔐 Security</Text>
              <TouchableOpacity 
                style={[styles.primaryActionButton, isRTL && styles.primaryActionButtonRTL]}
                onPress={() => setShowChangePasswordModal(true)}
              >
                <View style={[styles.actionButtonContent, isRTL && styles.actionButtonContentRTL]}>
                  <Text style={[styles.actionButtonIcon, isRTL && styles.actionButtonIconRTL]}>🔑</Text>
                  <View style={styles.actionButtonText}>
                    <Text style={styles.actionButtonTitle}>{t('changePassword')}</Text>
                    <Text style={styles.actionButtonSubtitle}>Update your password</Text>
                  </View>
                </View>
                <Text style={styles.actionButtonArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'company':
        return (
          <View style={styles.tabContent}>
            <CompanyProfileCard />
          </View>
        );

      case 'team':
        return (
          <View style={styles.tabContent}>
            <EmployeeManagement />
          </View>
        );

      case 'preferences':
        return (
          <View style={styles.tabContent}>
            {/* Notification Settings */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>🔔 {t('notificationSettings')}</Text>
              <View style={styles.preferenceSection}>
                <TouchableOpacity style={styles.primaryActionButton} disabled>
                  <View style={styles.actionButtonContent}>
                    <Text style={styles.actionButtonIcon}>📧</Text>
                    <View style={styles.actionButtonText}>
                      <Text style={styles.actionButtonTitle}>{t('emailNotifications')}</Text>
                      <Text style={styles.actionButtonSubtitle}>Get updates via email</Text>
                    </View>
                  </View>
                  <Text style={styles.comingSoonBadge}>Soon</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryActionButton} disabled>
                  <View style={styles.actionButtonContent}>
                    <Text style={styles.actionButtonIcon}>📲</Text>
                    <View style={styles.actionButtonText}>
                      <Text style={styles.actionButtonTitle}>{t('pushNotifications')}</Text>
                      <Text style={styles.actionButtonSubtitle}>Receive push alerts</Text>
                    </View>
                  </View>
                  <Text style={styles.comingSoonBadge}>Soon</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* App Information */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>ℹ️ App Information</Text>
              <View style={styles.infoGrid}>
                <View style={[styles.infoItem, isRTL && styles.infoItemRTL]}>
                  <Text style={styles.infoIcon}>📦</Text>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Version</Text>
                    <Text style={styles.infoValue}>1.0.0</Text>
                  </View>
                </View>

                <View style={[styles.infoItem, isRTL && styles.infoItemRTL]}>
                  <Text style={styles.infoIcon}>🔧</Text>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Environment</Text>
                    <Text style={styles.infoValue}>Development</Text>
                  </View>
                </View>

                <View style={[styles.infoItem, isRTL && styles.infoItemRTL]}>
                  <Text style={styles.infoIcon}>🏢</Text>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Tenant ID</Text>
                    <Text style={styles.infoValueSmall}>{tenant?.id}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings')}</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab,
                isRTL && styles.tabRTL,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderTabContent()}
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfileModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEditProfileModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={[styles.modalHeader, isRTL && styles.modalHeaderRTL]}>
            <TouchableOpacity onPress={() => setShowEditProfileModal(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{t('editProfile')}</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>{t('name')}</Text>
              <TextInput
                style={styles.formInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>{t('mobileNumber')}</Text>
              <TextInput
                style={[styles.formInput, styles.formInputDisabled]}
                value={editMobile}
                editable={false}
                placeholder="Mobile number (cannot be changed)"
              />
              <Text style={styles.formHelper}>Mobile number cannot be changed</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>{t('email')} ({t('optional')})</Text>
              <TextInput
                style={styles.formInput}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </ScrollView>

          <View style={[styles.modalFooter, isRTL && styles.modalFooterRTL]}>
            <TouchableOpacity 
              style={styles.modalButtonSecondary}
              onPress={() => setShowEditProfileModal(false)}
            >
              <Text style={styles.modalButtonSecondaryText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalButtonPrimary}
              onPress={handleSaveProfile}
            >
              <Text style={styles.modalButtonPrimaryText}>{t('save')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        visible={showChangePasswordModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowChangePasswordModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={[styles.modalHeader, isRTL && styles.modalHeaderRTL]}>
            <TouchableOpacity onPress={() => setShowChangePasswordModal(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{t('changePassword')}</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>{t('currentPassword')}</Text>
              <TextInput
                style={styles.formInput}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                secureTextEntry
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>{t('newPassword')}</Text>
              <TextInput
                style={styles.formInput}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password (min 6 characters)"
                secureTextEntry
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>{t('confirmPassword')}</Text>
              <TextInput
                style={styles.formInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry
              />
            </View>
          </ScrollView>

          <View style={[styles.modalFooter, isRTL && styles.modalFooterRTL]}>
            <TouchableOpacity 
              style={styles.modalButtonSecondary}
              onPress={() => setShowChangePasswordModal(false)}
            >
              <Text style={styles.modalButtonSecondaryText}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalButtonPrimary}
              onPress={handleChangePassword}
            >
              <Text style={styles.modalButtonPrimaryText}>{t('updatePassword')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  // Tab Bar Styles
  tabBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabBarContent: {
    paddingHorizontal: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3b82f6',
  },
  tabIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '600',
  },
  activeTabLabel: {
    color: '#3b82f6',
  },
  // Content Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  tabContent: {
    gap: 16,
  },
  // Profile Header Styles
  profileHeader: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileHeaderInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#64748b',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  profileCompany: {
    fontSize: 13,
    color: '#94a3b8',
  },
  // Card Styles
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  // Info Grid Styles
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
    width: 32,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  infoValueSmall: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1e293b',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    textTransform: 'capitalize',
  },
  // Action Button Styles
  primaryActionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionButtonText: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  actionButtonSubtitle: {
    fontSize: 13,
    color: '#64748b',
  },
  actionButtonArrow: {
    fontSize: 24,
    color: '#cbd5e1',
    fontWeight: '300',
  },
  comingSoonBadge: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  // Preferences Styles
  preferenceSection: {
    gap: 12,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalCloseButton: {
    fontSize: 28,
    color: '#64748b',
    width: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  modalButtonSecondary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  modalButtonSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  modalButtonPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  // Form Styles
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  formInputDisabled: {
    backgroundColor: '#f1f5f9',
    color: '#94a3b8',
  },
  formHelper: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 6,
  },
  // RTL Styles
  tabRTL: {
    flexDirection: 'row-reverse',
  },
  profileHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  avatarContainerRTL: {
    marginRight: 0,
    marginLeft: 16,
  },
  cardHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  infoItemRTL: {
    flexDirection: 'row-reverse',
  },
  primaryActionButtonRTL: {
    flexDirection: 'row-reverse',
  },
  actionButtonContentRTL: {
    flexDirection: 'row-reverse',
  },
  actionButtonIconRTL: {
    marginRight: 0,
    marginLeft: 12,
  },
  modalHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  modalFooterRTL: {
    flexDirection: 'row-reverse',
  },
});
