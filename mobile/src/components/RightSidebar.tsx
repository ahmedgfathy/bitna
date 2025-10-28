import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RightSidebar() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Activity Feed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Ionicons name="person-add-outline" size={16} color="#10b981" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>New lead added</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: '#dbeafe' }]}>
            <Ionicons name="home-outline" size={16} color="#2563eb" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Property updated</Text>
            <Text style={styles.activityTime}>5 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: '#f3e8ff' }]}>
            <Ionicons name="checkmark-circle-outline" size={16} color="#8b5cf6" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>Deal closed</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationItem}>
          <Ionicons name="mail-outline" size={20} color="#2563eb" />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>New message from client</Text>
            <Text style={styles.notificationTime}>10 min ago</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationItem}>
          <Ionicons name="calendar-outline" size={20} color="#f59e0b" />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>Meeting reminder</Text>
            <Text style={styles.notificationTime}>30 min ago</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationItem}>
          <Ionicons name="chatbubble-outline" size={20} color="#10b981" />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>Team message</Text>
            <Text style={styles.notificationTime}>1 hour ago</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Today's Tasks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <TouchableOpacity style={styles.taskItem}>
          <View style={styles.checkbox} />
          <Text style={styles.taskText}>Follow up with lead</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskItem}>
          <View style={styles.checkbox} />
          <Text style={styles.taskText}>Update property photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskItem}>
          <View style={[styles.checkbox, styles.checkboxChecked]}>
            <Ionicons name="checkmark" size={14} color="#ffffff" />
          </View>
          <Text style={[styles.taskText, styles.taskTextCompleted]}>Review contracts</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats Widget */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Month</Text>
        <View style={styles.statsWidget}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Revenue</Text>
            <Text style={styles.statValue}>-</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>New Leads</Text>
            <Text style={styles.statValue}>-</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Closed Deals</Text>
            <Text style={styles.statValue}>-</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
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
