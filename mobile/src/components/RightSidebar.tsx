import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../services/api';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthenticatedStackParamList } from '../types/navigation';
import CSVImportModal from './CSVImportModal';

interface Activity {
  id: string;
  type: string;
  description: string;
  created_at: string;
}

interface MonthlyStats {
  newLeads: number;
  closedDeals: number;
  revenue: number;
}

export default function RightSidebar() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthenticatedStackParamList>>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    newLeads: 0,
    closedDeals: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/stats/dashboard');
      
      if (response.data.status === 'success') {
        const data = response.data.data;
        
        // Set monthly stats
        setMonthlyStats({
          newLeads: data.leads?.new || 0,
          closedDeals: data.leads?.won || 0,
          revenue: 0, // Revenue tracking would need additional implementation
        });

        // Set recent activities (if available in response)
        if (data.recentActivities) {
          setActivities(data.recentActivities.slice(0, 3));
        }
      }
    } catch (error) {
      console.error('Failed to fetch sidebar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (amount: number): string => {
    if (amount === 0) return '-';
    return `${formatNumber(amount)} EGP`;
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Activity Feed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2563eb" />
          </View>
        ) : activities.length > 0 ? (
          activities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons 
                  name={
                    activity.type === 'lead' ? 'person-add-outline' : 
                    activity.type === 'property' ? 'home-outline' : 
                    'checkmark-circle-outline'
                  } 
                  size={16} 
                  color={
                    activity.type === 'lead' ? '#10b981' : 
                    activity.type === 'property' ? '#2563eb' : 
                    '#8b5cf6'
                  } 
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>{activity.description}</Text>
                <Text style={styles.activityTime}>{getTimeAgo(activity.created_at)}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No recent activity</Text>
        )}
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>0</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.notificationItem}
          onPress={() => navigation.navigate('Leads')}
        >
          <Ionicons name="mail-outline" size={20} color="#2563eb" />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>View all leads</Text>
            <Text style={styles.notificationTime}>Click to open</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.notificationItem}
          onPress={() => navigation.navigate('Properties')}
        >
          <Ionicons name="home-outline" size={20} color="#f59e0b" />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>Manage properties</Text>
            <Text style={styles.notificationTime}>Click to open</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.notificationItem}
          onPress={() => navigation.navigate('Team')}
        >
          <Ionicons name="people-outline" size={20} color="#10b981" />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>View team members</Text>
            <Text style={styles.notificationTime}>Click to open</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Special Tasks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Tasks</Text>
        <TouchableOpacity 
          style={styles.specialTaskItem}
          onPress={() => setShowImportModal(true)}
        >
          <View style={styles.specialTaskIcon}>
            <Ionicons name="cloud-upload-outline" size={20} color="#42b72a" />
          </View>
          <View style={styles.specialTaskContent}>
            <Text style={styles.specialTaskText}>Import Properties CSV</Text>
            <Text style={styles.specialTaskSubtext}>Bulk add properties from file</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats Widget */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Month</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2563eb" />
          </View>
        ) : (
          <View style={styles.statsWidget}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Revenue</Text>
              <Text style={styles.statValue}>{formatCurrency(monthlyStats.revenue)}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>New Leads</Text>
              <Text style={styles.statValue}>{formatNumber(monthlyStats.newLeads)}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Closed Deals</Text>
              <Text style={styles.statValue}>{formatNumber(monthlyStats.closedDeals)}</Text>
            </View>
          </View>
        )}
      </View>

      {/* CSV Import Modal */}
      <CSVImportModal
        visible={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportSuccess={() => {
          setShowImportModal(false);
          // Optionally refresh data or show success message
        }}
        type="properties"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationText: {
    fontSize: 13,
    color: '#1e293b',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 11,
    color: '#94a3b8',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  taskText: {
    fontSize: 14,
    color: '#1e293b',
    flex: 1,
  },
  taskTextCompleted: {
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  specialTaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#42b72a',
    borderStyle: 'dashed',
  },
  specialTaskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  specialTaskContent: {
    flex: 1,
  },
  specialTaskText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 2,
  },
  specialTaskSubtext: {
    fontSize: 11,
    color: '#15803d',
  },
  statsWidget: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748b',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
});
