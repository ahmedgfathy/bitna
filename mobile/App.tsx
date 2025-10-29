import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PublicNavigator from './src/navigation/PublicNavigator';
import AuthenticatedNavigator from './src/navigation/AuthenticatedNavigator';
import { useAuthStore } from './src/stores/authStore';
import { useLanguageStore } from './src/stores/languageStore';

const NAVIGATION_STATE_KEY = '@contaboo:navigation_state';

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
  const { initLanguage } = useLanguageStore();
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

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

  // Restore session and navigation state on app load
  useEffect(() => {
    const restoreState = async () => {
      try {
        // Restore language first
        await initLanguage();
        
        // Restore auth session
        await restoreSession();
        
        // Restore navigation state
        const savedStateString = await AsyncStorage.getItem(NAVIGATION_STATE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        
        if (state !== undefined) {
          setInitialState(state);
        }
      } catch (e) {
        console.error('Failed to restore state:', e);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  // Show loading spinner while checking authentication or restoring state
  if (!isReady || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <NavigationContainer 
      linking={linking}
      initialState={initialState}
      onStateChange={(state) => {
        // Save navigation state whenever it changes
        AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state));
      }}
    >
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
