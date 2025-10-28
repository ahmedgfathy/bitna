import apiClient from './api';
import { Employee, CreateEmployeeData, UpdateEmployeeData } from '../types/company';

export const employeeService = {
  // Get all employees
  getEmployees: async (filters?: { role?: string; status?: string }): Promise<Employee[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.role) params.append('role', filters.role);
      if (filters?.status) params.append('status', filters.status);
      
      const response = await apiClient.get(`/employees?${params.toString()}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  },

  // Create employee
  createEmployee: async (data: CreateEmployeeData): Promise<Employee | null> => {
    try {
      const response = await apiClient.post('/employees', data);
      return response.data.data;
    } catch (error: any) {
      console.error('Error creating employee:', error);
      throw new Error(error.response?.data?.message || 'Failed to create employee');
    }
  },

  // Update employee
  updateEmployee: async (id: string, data: UpdateEmployeeData): Promise<Employee | null> => {
    try {
      const response = await apiClient.put(`/employees/${id}`, data);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating employee:', error);
      throw new Error(error.response?.data?.message || 'Failed to update employee');
    }
  },

  // Deactivate employee
  deactivateEmployee: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/employees/${id}`);
      return true;
    } catch (error) {
      console.error('Error deactivating employee:', error);
      return false;
    }
  },

  // Reset employee PIN
  resetPin: async (id: string): Promise<string | null> => {
    try {
      const response = await apiClient.post(`/employees/${id}/reset-pin`);
      return response.data.data.temporaryPin;
    } catch (error) {
      console.error('Error resetting PIN:', error);
      return null;
    }
  },
};
