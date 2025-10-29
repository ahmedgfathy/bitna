import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Image,
  Animated,
} from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import { useRTLStyle } from '../../components/RTLText';
import apiClient from '../../services/api';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

interface PropertyStats {
  type_id: string;
  type: string;
  count: number;
}

interface StatusStats {
  status_id: string;
  status: string;
  count: number;
}

interface RegionStats {
  region_id: string;
  region: string;
  count: number;
}

interface ValueStats {
  total_value: number;
  avg_value: number;
  min_value: number;
  max_value: number;
}

interface DashboardStats {
  properties: {
    total: number;
    public: number;
    private: number;
    byType: PropertyStats[];
    byStatus: StatusStats[];
    byRegion: RegionStats[];
    valueStats: ValueStats;
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

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

export default function DashboardScreen() {
  const user = useAuthStore((state) => state.user);
  const { t } = useLanguageStore();
  const rtlStyle = useRTLStyle();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animation values for cards
  const scaleAnim1 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim3 = useRef(new Animated.Value(0)).current;
  const scaleAnim4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    // Animate cards on mount
    if (!loading && stats) {
      Animated.stagger(100, [
        Animated.spring(scaleAnim1, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
        Animated.spring(scaleAnim2, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
        Animated.spring(scaleAnim3, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
        Animated.spring(scaleAnim4, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
      ]).start();
    }
  }, [loading, stats]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/stats/dashboard');
      
      if (response.data.status === 'success') {
        setStats(response.data.data);
      } else {
        setError('Failed to load statistics');
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Unable to load dashboard data');
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

  const formatCurrency = (amount: number): string => {
    return `${formatNumber(amount)} EGP`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={[styles.loadingText, rtlStyle]}>{t('loading')}</Text>
      </View>
    );
  }

  if (error || !stats) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, rtlStyle]}>{error || 'No data available'}</Text>
      </View>
    );
  }

  // Prepare chart data
  const statusChartData = stats.properties.byStatus.slice(0, 6).map((item, index) => ({
    name: item.status || 'Unknown',
    population: item.count,
    color: COLORS[index % COLORS.length],
    legendFontColor: '#666',
    legendFontSize: 12,
  }));

  // Smart label formatter for property types
  const formatTypeLabel = (type: string | null | undefined): string => {
    if (!type) return 'Unknown';
    if (type.includes('Apartment Compound')) return 'Apt Comp';
    if (type.includes('Apartment Out')) return 'Apt Out';
    if (type.includes('Apartment')) return 'Apartment';
    if (type.includes('Standalone Compound')) return 'Standalone';
    if (type.includes('Office')) return 'Office';
    if (type.includes('Villa Out')) return 'Villa Out';
    if (type.includes('Villa')) return 'Villa';
    return type.length > 12 ? type.substring(0, 12) : type;
  };

  // Smart label formatter for regions
  const formatRegionLabel = (region: string | null | undefined): string => {
    if (!region) return 'Unknown';
    return region.length > 12 ? region.substring(0, 12) : region;
  };

  const typeBarData = {
    labels: stats.properties.byType.slice(0, 5).map(item => formatTypeLabel(item.type)),
    datasets: [{
      data: stats.properties.byType.slice(0, 5).map(item => item.count),
    }],
  };

  const regionBarData = {
    labels: stats.properties.byRegion.slice(0, 5).map(item => formatRegionLabel(item.region)),
    datasets: [{
      data: stats.properties.byRegion.slice(0, 5).map(item => item.count),
    }],
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchDashboardStats} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.welcomeText, rtlStyle]}>
          {t('welcomeBack')}, {user?.name || 'User'} 👋
        </Text>
        <Text style={[styles.subtitle, rtlStyle]}>{t('dashboardOverview')}</Text>
      </View>

      {/* Main Stats Cards with Gradients & Icons */}
      <View style={styles.statsGrid}>
        {/* Properties Card */}
        <Animated.View style={[styles.statCardWrapper, { transform: [{ scale: scaleAnim1 }] }]}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="home" size={28} color="#fff" />
            </View>
            <Text style={[styles.statNumber, rtlStyle]}>{formatNumber(stats.properties.total)}</Text>
            <Text style={[styles.statLabel, rtlStyle]}>{t('totalProperties')}</Text>
            <View style={styles.statDetails}>
              <View style={styles.statBadge}>
                <Ionicons name="eye" size={12} color="#fff" />
                <Text style={styles.badgeText}>{stats.properties.public} {t('public')}</Text>
              </View>
              <View style={styles.statBadge}>
                <Ionicons name="lock-closed" size={12} color="#fff" />
                <Text style={styles.badgeText}>{stats.properties.private} Private</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Leads Card */}
        <Animated.View style={[styles.statCardWrapper, { transform: [{ scale: scaleAnim2 }] }]}>
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="people" size={28} color="#fff" />
            </View>
            <Text style={[styles.statNumber, rtlStyle]}>{formatNumber(stats.leads.total)}</Text>
            <Text style={[styles.statLabel, rtlStyle]}>{t('totalLeads')}</Text>
            <View style={styles.statDetails}>
              <View style={styles.statBadge}>
                <Ionicons name="star" size={12} color="#fff" />
                <Text style={styles.badgeText}>{stats.leads.new} New</Text>
              </View>
              <View style={styles.statBadge}>
                <Ionicons name="checkmark-circle" size={12} color="#fff" />
                <Text style={styles.badgeText}>{stats.leads.won} Won</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Team Card */}
        <Animated.View style={[styles.statCardWrapper, { transform: [{ scale: scaleAnim3 }] }]}>
          <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="briefcase" size={28} color="#fff" />
            </View>
            <Text style={[styles.statNumber, rtlStyle]}>{formatNumber(stats.team.total)}</Text>
            <Text style={[styles.statLabel, rtlStyle]}>{t('teamMembers')}</Text>
            <View style={styles.statDetails}>
              <View style={styles.statBadge}>
                <Ionicons name="shield-checkmark" size={12} color="#fff" />
                <Text style={styles.badgeText}>{stats.team.managers} {t('managers')}</Text>
              </View>
              <View style={styles.statBadge}>
                <Ionicons name="person" size={12} color="#fff" />
                <Text style={styles.badgeText}>{stats.team.employees} Staff</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Total Value Card */}
        <Animated.View style={[styles.statCardWrapper, { transform: [{ scale: scaleAnim4 }] }]}>
          <LinearGradient
            colors={['#fa709a', '#fee140']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientCard}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="cash" size={28} color="#fff" />
            </View>
            <Text style={[styles.statNumber, rtlStyle]}>{formatCurrency(stats.properties.valueStats.total_value)}</Text>
            <Text style={[styles.statLabel, rtlStyle]}>{t('totalValue')}</Text>
            <View style={styles.statDetails}>
              <View style={styles.statBadge}>
                <Ionicons name="trending-up" size={12} color="#fff" />
                <Text style={styles.badgeText}>Avg: {formatCurrency(stats.properties.valueStats.avg_value)}</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    padding: 20,
  },
  header: {
    padding: 20,
    paddingTop: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 12,
  },
  statCardWrapper: {
    flex: 1,
    minWidth: '47%',
  },
  gradientCard: {
    padding: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.95,
    fontWeight: '600',
    marginBottom: 8,
  },
  statDetails: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryCard: {
    backgroundColor: '#2196F3',
  },
  successCard: {
    backgroundColor: '#4CAF50',
  },
  infoCard: {
    backgroundColor: '#FF9800',
  },
  warningCard: {
    backgroundColor: '#9C27B0',
  },
  chartSection: {
    margin: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  detailSection: {
    margin: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  valueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  valueCard: {
    flex: 1,
    minWidth: '30%',
    padding: 12,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
  },
  valueLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  valueAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  leadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  leadCard: {
    flex: 1,
    minWidth: '22%',
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    alignItems: 'center',
  },
  leadNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  leadLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
});
