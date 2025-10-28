import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../stores/authStore';

// Import dashboard screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import PropertiesStackNavigator from './PropertiesStackNavigator';
import LeadsStackNavigator from './LeadsStackNavigator';
import EmployeesScreen from '../screens/dashboard/EmployeesScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AuthenticatedNavigator() {
  const tenant = useAuthStore((state) => state.tenant);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarShowLabel: false, // Hide labels, show icons only
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Properties"
        component={PropertiesStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="business-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leads"
        component={LeadsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={28} color={color} />
          ),
        }}
      />
      {tenant?.type === 'company' && (
        <Tab.Screen
          name="Team"
          component={EmployeesScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="people-outline" size={28} color={color} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
