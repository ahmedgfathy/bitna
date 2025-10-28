import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticatedStackParamList } from '../types/navigation';

// Import components
import TopNavBar from '../components/TopNavBar';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';

// Import dashboard screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import PropertiesScreen from '../screens/dashboard/PropertiesScreen';
import PropertyDetailScreen from '../screens/dashboard/PropertyDetailScreen';
import PropertyFormScreen from '../screens/dashboard/PropertyFormScreen';
import LeadsScreen from '../screens/dashboard/LeadsScreen';
import LeadDetailScreen from '../screens/dashboard/LeadDetailScreen';
import LeadFormScreen from '../screens/dashboard/LeadFormScreen';
import EmployeesScreen from '../screens/dashboard/EmployeesScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';

// Import public screens for authenticated users
import HomeScreen from '../screens/public/HomeScreen';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

function MainLayout({ children }: any) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Top Navigation Bar */}
        <TopNavBar />

        {/* Main Content Area */}
        <View style={[styles.contentWrapper, isDesktop && styles.contentWrapperDesktop]}>
          {/* Left Sidebar (Web Only) */}
          {isDesktop && (
            <View style={styles.leftSidebar}>
              <LeftSidebar />
            </View>
          )}

          {/* Center Content */}
          <View style={[styles.mainContent, isDesktop && styles.mainContentDesktop]}>
            {children}
          </View>

          {/* Right Sidebar (Web Only) */}
          {isDesktop && (
            <View style={styles.rightSidebar}>
              <RightSidebar />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function AuthenticatedNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Dashboard">
        {() => (
          <MainLayout>
            <DashboardScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Properties">
        {() => (
          <MainLayout>
            <PropertiesScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="PropertyDetail">
        {() => (
          <MainLayout>
            <PropertyDetailScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="PropertyForm">
        {() => (
          <MainLayout>
            <PropertyFormScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Leads">
        {() => (
          <MainLayout>
            <LeadsScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="LeadDetail">
        {() => (
          <MainLayout>
            <LeadDetailScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="LeadForm">
        {() => (
          <MainLayout>
            <LeadFormScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Team">
        {() => (
          <MainLayout>
            <EmployeesScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      <Stack.Screen name="Settings">
        {() => (
          <MainLayout>
            <SettingsScreen />
          </MainLayout>
        )}
      </Stack.Screen>
      
      {/* Public Home Screen - Accessible while logged in */}
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentWrapper: {
    flex: 1,
  },
  contentWrapperDesktop: {
    flexDirection: 'row',
  },
  leftSidebar: {
    width: 300,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
  },
  mainContent: {
    flex: 1,
  },
  mainContentDesktop: {
    maxWidth: 1200,
    flex: 1,
    marginHorizontal: 'auto',
  },
  rightSidebar: {
    width: 300,
    backgroundColor: '#ffffff',
    borderLeftWidth: 1,
    borderLeftColor: '#e2e8f0',
  },
});
