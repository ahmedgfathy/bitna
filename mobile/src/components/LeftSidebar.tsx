import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../stores/authStore';
import apiClient from '../services/api';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthenticatedStackParamList } from '../types/navigation';

interface QuickStats {
  totalProperties: number;
  activeLeads: number;
  closedDeals: number;
}

export default function LeftSidebar() {
  const user = useAuthStore((state) => state.user);
  const tenant = useAuthStore((state) => state.tenant);
  const navigation = useNavigation<NativeStackNavigationProp<AuthenticatedStackParamList>>();
  const [stats, setStats] = useState<QuickStats>({
    totalProperties: 0,
    activeLeads: 0,
    closedDeals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuickStats();
  }, []);

  const fetchQuickStats = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/stats/dashboard');
      
      if (response.data.status === 'success') {
        const data = response.data.data;
        setStats({
          totalProperties: data.properties?.total || 0,
          activeLeads: (data.leads?.new || 0) + (data.leads?.contacted || 0) + (data.leads?.qualified || 0) + (data.leads?.negotiating || 0),
          closedDeals: data.leads?.won || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch quick stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2563eb" />
          </View>
        ) : (
          <>
            <View style={styles.statItem}>
              <Ionicons name="business-outline" size={20} color="#2563eb" />
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Properties</Text>
                <Text style={styles.statValue}>{formatNumber(stats.totalProperties)}</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="document-text-outline" size={20} color="#10b981" />
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Active Leads</Text>
                <Text style={styles.statValue}>{formatNumber(stats.activeLeads)}</Text>
              </View>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#8b5cf6" />
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Closed Deals</Text>
                <Text style={styles.statValue}>{formatNumber(stats.closedDeals)}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Quick Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => navigation.navigate('PropertyForm', { mode: 'create' })}
        >
          <Ionicons name="add-circle-outline" size={18} color="#2563eb" />
          <Text style={styles.linkText}>Add Property</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => navigation.navigate('LeadForm', { mode: 'create' })}
        >
          <Ionicons name="person-add-outline" size={18} color="#10b981" />
          <Text style={styles.linkText}>Add Lead</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => navigation.navigate('Leads')}
        >
          <Ionicons name="calendar-outline" size={18} color="#f59e0b" />
          <Text style={styles.linkText}>View Leads</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => navigation.navigate('Team')}
        >
          <Ionicons name="people-outline" size={18} color="#8b5cf6" />
          <Text style={styles.linkText}>Team Members</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Searches</Text>
        <Text style={styles.emptyText}>No saved searches yet</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 16,
    gap: 10,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1877f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerInfo: {
    flex: 1,
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
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1877f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTextSmall: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  userInfo: {
    flex: 0,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 16,
  },
  userRole: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'capitalize',
  },
  companySection: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  tenantName: {
    fontSize: 11,
    color: '#1877f2',
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 8,
  },
  statContent: {
    marginLeft: 12,
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#f8fafc',
  },
  linkText: {
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 12,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 13,
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
