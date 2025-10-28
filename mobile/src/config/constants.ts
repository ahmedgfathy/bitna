// Mobile App Environment Configuration
import { Platform } from 'react-native';

// API Configuration
// Use your local machine's IP for mobile devices (Expo can't reach localhost)
// For web, localhost works fine
const getApiBaseUrl = () => {
  // Check if running on web
  if (Platform.OS === 'web') {
    return 'http://localhost:3000/api';
  }
  
  // For mobile (Android/iOS), use your machine's local IP
  // Replace 192.168.0.104 with your actual local IP if different
  // To find your IP: run 'ipconfig getifaddr en0' on Mac or 'ipconfig' on Windows
  return 'http://192.168.0.104:3000/api';
};

export const API_BASE_URL = getApiBaseUrl();

// App Configuration
export const APP_NAME = 'Bitna';
export const APP_VERSION = '1.0.0';

// Timeouts
export const API_TIMEOUT = 30000; // 30 seconds

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@bitna:auth_token',
  USER_DATA: '@bitna:user_data',
  TENANT_ID: '@bitna:tenant_id',
};
