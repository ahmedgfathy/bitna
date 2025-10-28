import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';

export default function EmployeesScreen() {
  const tenant = useAuthStore((state) => state.tenant);

  if (tenant?.type !== 'company') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.content}>
          <Text style={styles.title}>Team Management</Text>
          <Text style={styles.subtitle}>
            This feature is only available for company accounts
          </Text>
          <Text style={styles.icon}>🏢</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Team</Text>
        <Text style={styles.subtitle}>Manage your employees and roles</Text>
        <Text style={styles.comingSoon}>👥 Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  comingSoon: {
    fontSize: 48,
  },
  icon: {
    fontSize: 64,
    marginTop: 20,
  },
});
