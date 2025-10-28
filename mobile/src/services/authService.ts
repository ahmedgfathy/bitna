import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, LoginResponse, User, Tenant } from '../types/auth';

// Temporary mock credentials for development
const MOCK_CREDENTIALS = {
  mobile: '01002778090',
  password: 'zerocall',
};

// Mock user and tenant data
const MOCK_USER: User = {
  id: '1',
  mobile: '01002778090',
  name: 'Ahmed Gomaa',
  role: 'owner',
  tenantId: 'tenant-1',
};

const MOCK_TENANT: Tenant = {
  id: 'tenant-1',
  name: 'Ahmed Real Estate',
  type: 'freelancer',
  mobile: '01002778090',
  createdAt: new Date().toISOString(),
};

const TOKEN_KEY = '@bitna_auth_token';
const USER_KEY = '@bitna_user';
const TENANT_KEY = '@bitna_tenant';

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
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER));
        await AsyncStorage.setItem(TENANT_KEY, JSON.stringify(MOCK_TENANT));

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
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const userJson = await AsyncStorage.getItem(USER_KEY);
      const tenantJson = await AsyncStorage.getItem(TENANT_KEY);

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
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY, TENANT_KEY]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  /**
   * Get stored token
   */
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  },
};
