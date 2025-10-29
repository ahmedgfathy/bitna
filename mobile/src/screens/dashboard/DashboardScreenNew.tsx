import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import { useRTLStyle } from '../../components/RTLText';
import apiClient from '../../services/api';
import { PieChart, BarChart } from 'react-native-chart-kit';

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

  useEffect(() => {
    fetchDashboardStats();
  }, []);

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
    count: item.count,
    color: COLORS[index % COLORS.length],
    legendFontColor: '#666',
    legendFontSize: 12,
  }));

  const typeBarData = {
    labels: stats.properties.byType.slice(0, 5).map(item => item.type?.substring(0, 10) || 'Unknown'),
    datasets: [{
      data: stats.properties.byType.slice(0, 5).map(item => item.count),
    }],
  };

  const regionBarData = {
    labels: stats.properties.byRegion.slice(0, 5).map(item => item.region?.substring(0, 10) || 'Unknown'),
    datasets: [{
      data: stats.properties.byRegion.slice(0, 5).map(item => item.count),
    }],
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.welcomeText, rtlStyle]}>
          {t('welcome')}, {user?.name || 'User'}
        </Text>
        <Text style={[styles.subtitle, rtlStyle]}>{t('dashboardOverview')}</Text>
      </View>

      {/* Main Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, styles.primaryCard]}>
          <Text style={[styles.statNumber, rtlStyle]}>{formatNumber(stats.properties.total)}</Text>
          <Text style={[styles.statLabel, rtlStyle]}>{t('totalProperties')}</Text>
        </View>

        <View style={[styles.statCard, styles.successCard]}>
          <Text style={[styles.statNumber, rtlStyle]}>{formatNumber(stats.leads.total)}</Text>
          <Text style={[styles.statLabel, rtlStyle]}>{t('totalLeads')}</Text>
        </View>

        <View style={[styles.statCard, styles.infoCard]}>
          <Text style={[styles.statNumber, rtlStyle]}>{formatNumber(stats.team.total)}</Text>
          <Text style={[styles.statLabel, rtlStyle]}>{t('teamMembers')}</Text>
        </View>

        <View style={[styles.statCard, styles.warningCard]}>
          <Text style={[styles.statNumber, rtlStyle]}>{formatCurrency(stats.properties.valueStats.total_value)}</Text>
          <Text style={[styles.statLabel, rtlStyle]}>{t('totalValue')}</Text>
        </View>
      </View>

      {/* Property Status Distribution */}
      <View style={styles.chartSection}>
        <Text style={[styles.sectionTitle, rtlStyle]}>{t('propertiesByStatus')}</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={statusChartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>

      {/* Properties by Type */}
      <View style={styles.chartSection}>
        <Text style={[styles.sectionTitle, rtlStyle]}>{t('topPropertyTypes')}</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={typeBarData}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 10,
              },
            }}
            style={styles.chart}
            showValuesOnTopOfBars
            fromZero
          />
        </View>
      </View>

      {/* Properties by Region */}
      <View style={styles.chartSection}>
        <Text style={[styles.sectionTitle, rtlStyle]}>{t('topRegions')}</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={regionBarData}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 10,
              },
            }}
            style={styles.chart}
            showValuesOnTopOfBars
            fromZero
          />
        </View>
      </View>

      {/* Detailed Type Breakdown */}
      <View style={styles.detailSection}>
        <Text style={[styles.sectionTitle, rtlStyle]}>{t('propertyTypeBreakdown')}</Text>
        {stats.properties.byType.slice(0, 8).map((item, index) => (
          <View key={item.type_id || index} style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <View style={[styles.colorDot, { backgroundColor: COLORS[index % COLORS.length] }]} />
              <Text style={[styles.detailLabel, rtlStyle]}>{item.type || 'Unknown'}</Text>
            </View>
            <Text style={[styles.detailValue, rtlStyle]}>{formatNumber(item.count)}</Text>
          </View>
        ))}
      </View>

      {/* Value Statistics */}
      <View style={styles.detailSection}>
        <Text style={[styles.sectionTitle, rtlStyle]}>{t('valueStatistics')}</Text>
        <View style={styles.valueGrid}>
          <View style={styles.valueCard}>
            <Text style={[styles.valueLabel, rtlStyle]}>{t('averagePrice')}</Text>
            <Text style={[styles.valueAmount, rtlStyle]}>{formatCurrency(stats.properties.valueStats.avg_value)}</Text>
          </View>
          <View style={styles.valueCard}>
            <Text style={[styles.valueLabel, rtlStyle]}>{t('minPrice')}</Text>
            <Text style={[styles.valueAmount, rtlStyle]}>{formatCurrency(stats.properties.valueStats.min_value)}</Text>
          </View>
          <View style={styles.valueCard}>
            <Text style={[styles.valueLabel, rtlStyle]}>{t('maxPrice')}</Text>
            <Text style={[styles.valueAmount, rtlStyle]}>{formatCurrency(stats.properties.valueStats.max_value)}</Text>
          </View>
        </View>
      </View>

      {/* Lead Statistics */}
      <View style={styles.detailSection}>
        <Text style={[styles.sectionTitle, rtlStyle]}>{t('leadStatistics')}</Text>
        <View style={styles.leadGrid}>
          <View style={styles.leadCard}>
            <Text style={[styles.leadNumber, rtlStyle]}>{stats.leads.new}</Text>
            <Text style={[styles.leadLabel, rtlStyle]}>{t('newLeads')}</Text>
          </View>
          <View style={styles.leadCard}>
            <Text style={[styles.leadNumber, rtlStyle]}>{stats.leads.qualified}</Text>
            <Text style={[styles.leadLabel, rtlStyle]}>{t('qualified')}</Text>
          </View>
          <View style={styles.leadCard}>
            <Text style={[styles.leadNumber, rtlStyle]}>{stats.leads.won}</Text>
            <Text style={[styles.leadLabel, rtlStyle]}>{t('won')}</Text>
          </View>
          <View style={styles.leadCard}>
            <Text style={[styles.leadNumber, rtlStyle]}>{stats.leads.lost}</Text>
            <Text style={[styles.leadLabel, rtlStyle]}>{t('lost')}</Text>
          </View>
        </View>
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
    gap: 10,
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
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
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
