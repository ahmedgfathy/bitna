// Authentication types
export type TenantType = 'freelancer' | 'company';

export type UserRole = 'owner' | 'manager' | 'sales_agent' | 'marketer' | 'admin_assistant' | 'employee';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  mobile: string;
  name: string;
  email?: string;   
  role: UserRole;
  status?: UserStatus;
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
  type: TenantType;
  mobile: string;
  companyName?: string;
  logoUrl?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  mobile: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  tenant?: Tenant;
  token?: string;
  message?: string;
}
