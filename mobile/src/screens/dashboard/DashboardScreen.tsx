import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import apiClient from '../../services/api';
import LanguageSwitcher from '../../components/LanguageSwitcher';

interface DashboardStats {
  properties: {
    total: number;
    public: number;
    private: number;
  };
  leads: {
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    negotiating: number;
    won: number;
    lost: number;
  };
  team: {
    total: number;
    employees: number;
    managers: number;
    owners: number;
  };
}

export default function DashboardScreen() {
  const user = useAuthStore((state) => state.user);
  const tenant = useAuthStore((state) => state.tenant);
  const { t, initLanguage } = useLanguageStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initLanguage();
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/stats/dashboard');
      if (response.data.status === 'success') {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      setError('Unable to connect to server. Please check your connection.');
      // Set default values on error
      setStats({
        properties: { total: 0, public: 0, private: 0 },
        leads: { total: 0, new: 0, contacted: 0, qualified: 0, negotiating: 0, won: 0, lost: 0 },
        team: { total: 0, employees: 0, managers: 0, owners: 0 },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with Language Switcher */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t('welcomeBack')}</Text>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.tenantName}>{tenant?.name}</Text>
          </View>
          <LanguageSwitcher />
        </View>

        {/* Stats Grid */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchDashboardStats}>
              <Text style={styles.retryButtonText}>Retry Connection</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        ) : (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats?.properties.total || 0}</Text>
              <Text style={styles.statLabel}>{t('properties')}</Text>
              <Text style={styles.statSubtext}>{stats?.properties.public || 0} {t('public')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats?.leads.total || 0}</Text>
              <Text style={styles.statLabel}>{t('leads')}</Text>
              <Text style={styles.statSubtext}>{stats?.leads.qualified || 0} {t('qualified')}</Text>
            </View>
            {tenant?.type === 'company' && (
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{stats?.team.total || 0}</Text>
                <Text style={styles.statLabel}>{t('teamMembers')}</Text>
                <Text style={styles.statSubtext}>{stats?.team.managers || 0} {t('managers')}</Text>
              </View>
            )}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🏠</Text>
            <Text style={styles.actionText}>{t('addNewProperty')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={styles.actionText}>{t('viewAllLeads')}</Text>
          </TouchableOpacity>
          {tenant?.type === 'company' && (
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>👨‍💼</Text>
              <Text style={styles.actionText}>{t('manageTeam')}</Text>
            </TouchableOpacity>
          )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  tenantName: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  statSubtext: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
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
  actionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
});
