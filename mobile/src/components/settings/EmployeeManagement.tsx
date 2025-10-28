import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLanguageStore } from '../../stores/languageStore';
import { employeeService } from '../../services/employeeService';
import { Employee } from '../../types/company';
import EmployeeFormModal from './EmployeeFormModal';

export default function EmployeeManagement() {
  const { t } = useLanguageStore();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Helper to convert role format for translation
  const translateRole = (role: string) => {
    const roleMap: { [key: string]: string } = {
      sales_agent: 'salesAgent',
      admin_assistant: 'adminAssistant',
    };
    return t(roleMap[role] as any || role as any);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [employees, searchQuery, selectedRole, selectedStatus]);

  const loadEmployees = async () => {
    setLoading(true);
    const data = await employeeService.getEmployees();
    setEmployees(data);
    setLoading(false);
  };

  const filterEmployees = () => {
    let filtered = [...employees];

    if (searchQuery) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.mobile.includes(searchQuery)
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((emp) => emp.role === selectedRole);
    }

    if (selectedStatus) {
      filtered = filtered.filter((emp) => emp.status === selectedStatus);
    }

    setFilteredEmployees(filtered);
  };

  const handleCreateEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleFormSuccess = (employee: Employee) => {
    loadEmployees();
  };

  const handleDeactivate = (employee: Employee) => {
    Alert.alert(
      t('confirmDeactivate'),
      `Deactivate ${employee.name}?`,
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('confirm'),
          style: 'destructive',
          onPress: async () => {
            const success = await employeeService.deactivateEmployee(employee.id);
            if (success) {
              loadEmployees();
            }
          },
        },
      ]
    );
  };

  const handleResetPin = async (employee: Employee) => {
    Alert.alert(
      t('resetPin'),
      `Reset PIN for ${employee.name}?`,
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('confirm'),
          onPress: async () => {
            const newPin = await employeeService.resetPin(employee.id);
            if (newPin) {
              Alert.alert(
                t('temporaryPin'),
                `New PIN: ${newPin}\n\nPlease share this with the employee.`,
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: { [key: string]: string } = {
      owner: '#8b5cf6',
      manager: '#3b82f6',
      sales_agent: '#10b981',
      marketer: '#f59e0b',
      admin_assistant: '#ec4899',
      employee: '#64748b',
    };
    return colors[role] || '#64748b';
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' ? '#10b981' : '#ef4444';
  };

  const renderEmployee = ({ item }: { item: Employee }) => (
    <View style={styles.employeeCard}>
      <View style={styles.employeeHeader}>
        <View>
          <Text style={styles.employeeName}>{item.name}</Text>
          <Text style={styles.employeeMobile}>{item.mobile}</Text>
          {item.email && <Text style={styles.employeeEmail}>{item.email}</Text>}
        </View>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: getRoleBadgeColor(item.role) }]}>
            <Text style={styles.badgeText}>{translateRole(item.role)}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: getStatusBadgeColor(item.status) }]}>
            <Text style={styles.badgeText}>{t(item.status as any)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.employeeActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditEmployee(item)}
        >
          <Text style={styles.actionButtonText}>{t('edit')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleResetPin(item)}
        >
          <Text style={styles.actionButtonText}>{t('resetPin')}</Text>
        </TouchableOpacity>
        {item.status === 'active' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.dangerButton]}
            onPress={() => handleDeactivate(item)}
          >
            <Text style={[styles.actionButtonText, styles.dangerButtonText]}>
              {t('deactivateEmployee')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('teamManagement')}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateEmployee}>
          <Text style={styles.addButtonText}>+ {t('addEmployee')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchEmployees')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedRole && styles.filterChipActive]}
            onPress={() => setSelectedRole('')}
          >
            <Text style={[styles.filterChipText, !selectedRole && styles.filterChipTextActive]}>
              {t('allRoles')}
            </Text>
          </TouchableOpacity>
          {['sales_agent', 'marketer', 'manager', 'employee'].map((role) => (
            <TouchableOpacity
              key={role}
              style={[styles.filterChip, selectedRole === role && styles.filterChipActive]}
              onPress={() => setSelectedRole(role === selectedRole ? '' : role)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedRole === role && styles.filterChipTextActive,
                ]}
              >
                {translateRole(role)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedStatus && styles.filterChipActive]}
            onPress={() => setSelectedStatus('')}
          >
            <Text
              style={[styles.filterChipText, !selectedStatus && styles.filterChipTextActive]}
            >
              {t('allStatuses')}
            </Text>
          </TouchableOpacity>
          {['active', 'inactive'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.filterChip, selectedStatus === status && styles.filterChipActive]}
              onPress={() => setSelectedStatus(status === selectedStatus ? '' : status)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedStatus === status && styles.filterChipTextActive,
                ]}
              >
                {t(status as any)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : filteredEmployees.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('noEmployeesFound')}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEmployees}
          renderItem={renderEmployee}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <EmployeeFormModal
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSuccess={handleFormSuccess}
        employee={editingEmployee}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  filters: {
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterChipText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  list: {
    gap: 12,
  },
  employeeCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  employeeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  employeeMobile: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  employeeEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  badges: {
    alignItems: 'flex-end',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '700',
  },
  employeeActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  dangerButtonText: {
    color: '#ffffff',
  },
});
