import apiClient from './api';
import { CompanyProfile, UpdateCompanyProfileData } from '../types/company';

export const companyService = {
  // Get company profile
  getProfile: async (): Promise<CompanyProfile | null> => {
    try {
      const response = await apiClient.get('/company/profile');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching company profile:', error);
      return null;
    }
  },

  // Update company profile
  updateProfile: async (data: UpdateCompanyProfileData): Promise<CompanyProfile | null> => {
    try {
      const response = await apiClient.put('/company/profile', data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating company profile:', error);
      throw error;
    }
  },
};
