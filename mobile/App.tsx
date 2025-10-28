import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PublicNavigator from './src/navigation/PublicNavigator';
import AuthenticatedNavigator from './src/navigation/AuthenticatedNavigator';
import { useAuthStore } from './src/stores/authStore';

// Linking configuration to preserve URL state on refresh
const linking = {
  prefixes: [],
  config: {
    screens: {
      Home: '',
      Login: 'login',
      Subscribe: 'subscribe',
      PropertyDetails: 'property/:id',
    },
  },
};

export default function App() {
  const { isAuthenticated, isLoading, restoreSession } = useAuthStore();

  // Set document title for web
  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Contaboo - Find Your Dream Property';
      
      // Set favicon dynamically
      const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
      favicon.type = 'image/png';
      favicon.rel = 'icon';
      favicon.href = '/assets/favicon.png';
      if (!document.querySelector("link[rel*='icon']")) {
        document.head.appendChild(favicon);
      }
    }
  }, []);

  // Restore session on app load
  useEffect(() => {
    restoreSession();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated ? <AuthenticatedNavigator /> : <PublicNavigator />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
});
