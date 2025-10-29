import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useAuthStore } from '../stores/authStore';
import { useLanguageStore } from '../stores/languageStore';
import LanguageSwitcher from './LanguageSwitcher';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;

export default function TopNavBar() {
  const navigation = useNavigation<any>();
  const { t, language } = useLanguageStore();
  const isRTL = language === 'ar';
  const user = useAuthStore((state) => state.user);
  const tenant = useAuthStore((state) => state.tenant);
  const logout = useAuthStore((state) => state.logout);
  
  // Get current route name
  const currentRoute = useNavigationState(state => {
    const route = state.routes[state.index];
    return route?.name || 'Dashboard';
  });

  const navItems = [
    { name: 'dashboard', icon: 'home-outline', route: 'Dashboard' },
    { name: 'properties', icon: 'business-outline', route: 'Properties' },
    { name: 'leads', icon: 'document-text-outline', route: 'Leads' },
    ...(tenant?.type === 'company' ? [{ name: 'teamMembers', icon: 'people-outline', route: 'Team' }] : []),
    { name: 'settings', icon: 'settings-outline', route: 'Settings' },
    { name: 'administration', icon: 'shield-outline', route: 'Administration' },
  ];

  const handleNavigate = (route: string) => {
    navigation.navigate(route);
  };

  const handleLogout = () => {
    logout();
  };

  const handleGoHome = () => {
    // Navigate to public home page while staying logged in
    navigation.navigate('Home' as never);
  };

  return (
    <View style={[
      styles.container, 
      isDesktop && styles.containerDesktop,
      isRTL && styles.containerRTL
    ]}>
      {/* Logo + Company Info (Left) - Clickable to go home */}
      <TouchableOpacity style={[styles.brandSection, isRTL && styles.brandSectionRTL]} onPress={handleGoHome} activeOpacity={0.7}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoLetter}>C</Text>
        </View>
        {isDesktop && (
          <View style={styles.companyInfo}>
            <Text style={[styles.companyName, isRTL && styles.textRTL]}>Contaboo</Text>
            <Text style={[styles.companyTagline, isRTL && styles.textRTL]}>{t('realEstateCRM')}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Center Navigation */}
      <View style={[
        styles.navContent, 
        isDesktop && styles.navContentDesktop,
        isRTL && styles.navContentRTL
      ]}>
        {navItems.map((item) => {
          const isActive = currentRoute === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={[
                styles.navItem,
                isActive && styles.navItemActive,
                isDesktop && styles.navItemDesktop,
                isRTL && styles.navItemRTL,
              ]}
              onPress={() => handleNavigate(item.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon as any}
                size={isDesktop ? 24 : 22}
                color={isActive ? '#2563eb' : '#64748b'}
              />
              {isDesktop && (
                <Text style={[
                  styles.navLabel, 
                  isActive && styles.navLabelActive,
                  isRTL && styles.textRTL
                ]}>
                  {t(item.name as any)}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Right Section: User Info + Language + Logout */}
      <View style={[styles.rightSection, isRTL && styles.rightSectionRTL]}>
        {isDesktop && (
          <View style={[styles.userSection, isRTL && styles.userSectionRTL]}>
            <View style={styles.avatarSmall}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'A'}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, isRTL && styles.textRTL]}>{user?.name || 'Ahmed Gomaa'}</Text>
              <Text style={[styles.userRole, isRTL && styles.textRTL]}>{user?.role || t('owner')}</Text>
              <Text style={[styles.companyTaglineSmall, isRTL && styles.textRTL]}>{tenant?.name || 'Contaboo'}</Text>
            </View>
          </View>
        )}
        
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Logout Button */}
        <TouchableOpacity style={[styles.logoutButton, isRTL && styles.logoutButtonRTL]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#dc2626" />
          {isDesktop && <Text style={[styles.logoutText, isRTL && styles.textRTL]}>{t('logout')}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  containerDesktop: {
    paddingHorizontal: 24,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 'auto',
  },
  logoCircle: {
    width: isDesktop ? 40 : 32,
    height: isDesktop ? 40 : 32,
    borderRadius: isDesktop ? 20 : 16,
    backgroundColor: '#1877f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: {
    fontSize: isDesktop ? 20 : 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  companyInfo: {
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1877f2',
    lineHeight: 20,
  },
  companyTagline: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },
  companyTaglineSmall: {
    fontSize: 9,
    color: '#1877f2',
    fontWeight: '600',
    marginTop: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isDesktop ? 12 : 6,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1877f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 15,
  },
  userRole: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '500',
  },
  langButton: {
    width: isDesktop ? 36 : 32,
    height: isDesktop ? 36 : 32,
    borderRadius: isDesktop ? 18 : 16,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: isDesktop ? 12 : 8,
    paddingVertical: isDesktop ? 8 : 6,
    borderRadius: 6,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#dc2626',
  },
  sidebar: {
    width: 300,
    backgroundColor: 'transparent',
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  navContentDesktop: {
    flex: 1,
    maxWidth: 800,
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    minWidth: 40,
  },
  navItemDesktop: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    minWidth: 120,
  },
  navItemActive: {
    backgroundColor: '#eff6ff',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  navLabelActive: {
    color: '#2563eb',
  },
  // RTL Styles
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  brandSectionRTL: {
    flexDirection: 'row-reverse',
    marginLeft: 'auto',
  },
  navContentRTL: {
    flexDirection: 'row-reverse',
  },
  navItemRTL: {
    flexDirection: 'row-reverse',
  },
  rightSectionRTL: {
    flexDirection: 'row-reverse',
    marginRight: 'auto',
    marginLeft: 0,
  },
  userSectionRTL: {
    flexDirection: 'row-reverse',
  },
  logoutButtonRTL: {
    flexDirection: 'row-reverse',
  },
  textRTL: {
    textAlign: 'right',
  },
});
