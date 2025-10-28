import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PublicNavigator from './src/navigation/PublicNavigator';
import AuthenticatedNavigator from './src/navigation/AuthenticatedNavigator';
import { useAuthStore } from './src/stores/authStore';

export default function App() {
  const { isAuthenticated, isLoading, restoreSession } = useAuthStore();

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
    <NavigationContainer>
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
