import { create } from 'zustand';
import { User, Tenant, AuthState } from '../types/auth';
import { authService } from '../services/authService';

interface AuthStore extends AuthState {
  // Actions
  login: (mobile: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  setUser: (user: User | null) => void;
  setTenant: (tenant: Tenant | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  tenant: null,
  isAuthenticated: false,
  isLoading: true,

  // Actions
  login: async (mobile: string, password: string) => {
    set({ isLoading: true });
    
    const response = await authService.login({ mobile, password });
    
    if (response.success && response.user && response.tenant) {
      set({
        user: response.user,
        tenant: response.tenant,
        isAuthenticated: true,
        isLoading: false,
      });
      return { success: true };
    }
    
    set({ isLoading: false });
    return { success: false, message: response.message };
  },

  logout: async () => {
    await authService.logout();
    set({
      user: null,
      tenant: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  restoreSession: async () => {
    set({ isLoading: true });
    
    const response = await authService.restoreSession();
    
    if (response.success && response.user && response.tenant) {
      set({
        user: response.user,
        tenant: response.tenant,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({
        user: null,
        tenant: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setUser: (user) => set({ user }),
  
  setTenant: (tenant) => set({ tenant }),
  
  setLoading: (loading) => set({ isLoading: loading }),
}));
