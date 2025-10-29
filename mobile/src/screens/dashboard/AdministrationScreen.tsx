import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguageStore } from '../../stores/languageStore';
import { useRTLStyle } from '../../components/RTLText';

export default function AdministrationScreen() {
  const { t } = useLanguageStore();
  const rtlStyle = useRTLStyle();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, rtlStyle]}>Administration</Text>
        <Text style={[styles.subtitle, rtlStyle]}>System Administration & Management</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Administration Panel</Text>
          <Text style={styles.cardText}>
            This section will contain system administration features such as:
          </Text>
          <Text style={styles.cardText}>• User management</Text>
          <Text style={styles.cardText}>• System settings</Text>
          <Text style={styles.cardText}>• Access control</Text>
          <Text style={styles.cardText}>• Audit logs</Text>
          <Text style={styles.cardText}>• Database management</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
});
