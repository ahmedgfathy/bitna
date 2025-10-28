import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, LoginResponse, User, Tenant } from '../types/auth';
import { STORAGE_KEYS } from '../config/constants';

// Temporary mock credentials for development
const MOCK_CREDENTIALS = {
  mobile: '01002778090',
  password: 'zerocall',
};

// Mock Super Admin user and tenant data
const MOCK_USER: User = {
  id: 'super-admin-1',
  mobile: '01002778090',
  name: 'Ahmed Gomaa',
  role: 'owner', // Super Admin - Platform Owner
  tenantId: 'super-admin-tenant',
};

const MOCK_TENANT: Tenant = {
  id: 'super-admin-tenant',
  name: 'Contaboo - Real Estate CRM',
  type: 'company', // SaaS Platform
  mobile: '01002778090',
  createdAt: new Date().toISOString(),
};

export const authService = {
  /**
   * Validate mobile number format (Egyptian mobile: 11 digits starting with 01)
   */
  validateMobile: (mobile: string): boolean => {
    const cleanMobile = mobile.replace(/\s/g, '');
    return /^01[0-9]{9}$/.test(cleanMobile);
  },

  /**
   * Mock login - validates against temporary credentials
   * TODO: Replace with real API call to backend OTP system
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate mobile format
      if (!authService.validateMobile(credentials.mobile)) {
        return {
          success: false,
          message: 'Invalid mobile number format. Must be 11 digits starting with 01.',
        };
      }

      // Check credentials against mock data
      if (
        credentials.mobile === MOCK_CREDENTIALS.mobile &&
        credentials.password === MOCK_CREDENTIALS.password
      ) {
        // Generate mock token
        const token = `mock_token_${Date.now()}`;

        // Store session data
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(MOCK_USER));
        await AsyncStorage.setItem(STORAGE_KEYS.TENANT_ID, JSON.stringify(MOCK_TENANT));

        return {
          success: true,
          user: MOCK_USER,
          tenant: MOCK_TENANT,
          token,
        };
      }

      return {
        success: false,
        message: 'Invalid mobile number or password.',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login. Please try again.',
      };
    }
  },

  /**
   * Restore session from AsyncStorage
   */
  restoreSession: async (): Promise<LoginResponse> => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      const tenantJson = await AsyncStorage.getItem(STORAGE_KEYS.TENANT_ID);

      if (token && userJson && tenantJson) {
        const user = JSON.parse(userJson) as User;
        const tenant = JSON.parse(tenantJson) as Tenant;

        return {
          success: true,
          user,
          tenant,
          token,
        };
      }

      return {
        success: false,
        message: 'No saved session found.',
      };
    } catch (error) {
      console.error('Restore session error:', error);
      return {
        success: false,
        message: 'Failed to restore session.',
      };
    }
  },

  /**
   * Logout - clear all session data
   */
  logout: async (): Promise<void> => {
    try {
      console.log('🚪 Logging out - clearing session data...');
      await AsyncStorage.multiRemove([STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.USER_DATA, STORAGE_KEYS.TENANT_ID]);
      
      // Verify data is cleared
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const user = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      const tenant = await AsyncStorage.getItem(STORAGE_KEYS.TENANT_ID);
      
      if (!token && !user && !tenant) {
        console.log('✅ Session data cleared successfully');
      } else {
        console.warn('⚠️ Some session data may not have been cleared');
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  },

  /**
   * Get stored token
   */
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  },
};
