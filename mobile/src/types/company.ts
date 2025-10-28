import { UserRole, UserStatus } from './auth';

// Re-export for convenience
export type { UserRole, UserStatus };

export interface CompanyProfile {
  id: string;
  name: string;
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
  mobile: string;
  type: 'freelancer' | 'company';
  subscriptionStatus: string;
}

export interface UpdateCompanyProfileData {
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
}

export interface Employee {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
  temporaryPin?: string; // Only visible on creation
}

export interface CreateEmployeeData {
  name: string;
  mobile: string;
  email?: string;
  role: UserRole;
  status?: UserStatus;
}

export interface UpdateEmployeeData {
  name?: string;
  mobile?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}
