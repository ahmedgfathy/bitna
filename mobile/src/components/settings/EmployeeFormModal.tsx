import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLanguageStore } from '../../stores/languageStore';
import { employeeService } from '../../services/employeeService';
import { Employee, CreateEmployeeData, UserRole, UserStatus } from '../../types/company';

interface EmployeeFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (employee: Employee) => void;
  employee?: Employee | null;
}

export default function EmployeeFormModal({
  visible,
  onClose,
  onSuccess,
  employee,
}: EmployeeFormModalProps) {
  const { t } = useLanguageStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateEmployeeData>({
    name: employee?.name || '',
    mobile: employee?.mobile || '',
    email: employee?.email || '',
    role: employee?.role || 'employee',
    status: employee?.status || 'active',
  });
  const [showPin, setShowPin] = useState(false);
  const [generatedPin, setGeneratedPin] = useState<string>('');

  const roles: UserRole[] = ['sales_agent', 'marketer', 'manager', 'admin_assistant', 'employee'];
  const statuses: UserStatus[] = ['active', 'inactive'];

  // Helper to convert role format for translation
  const translateRole = (role: string) => {
    const roleMap: { [key: string]: string } = {
      sales_agent: 'salesAgent',
      admin_assistant: 'adminAssistant',
    };
    return t(roleMap[role] as any || role as any);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.mobile) {
      Alert.alert(t('error'), 'Name and mobile number are required');
      return;
    }

    setLoading(true);
    try {
      if (employee) {
        // Update existing employee
        const updated = await employeeService.updateEmployee(employee.id, formData);
        if (updated) {
          onSuccess(updated);
          onClose();
        }
      } else {
        // Create new employee
        const created = await employeeService.createEmployee(formData);
        if (created && created.temporaryPin) {
          setGeneratedPin(created.temporaryPin);
          setShowPin(true);
          onSuccess(created);
        }
      }
    } catch (error: any) {
      Alert.alert(t('error'), error.message);
    }
    setLoading(false);
  };

  const handleClosePinDialog = () => {
    setShowPin(false);
    setGeneratedPin('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {showPin ? (
            // PIN Display Dialog
            <View style={styles.pinDialog}>
              <Text style={styles.pinTitle}>{t('temporaryPin')}</Text>
              <Text style={styles.pinSubtitle}>{t('pinForFirstLogin')}</Text>
              
              <View style={styles.pinContainer}>
                <Text style={styles.pinText}>{generatedPin}</Text>
              </View>
              
              <Text style={styles.pinWarning}>
                Please save this PIN and share it with the employee. They will be asked to change it on first login.
              </Text>
              
              <TouchableOpacity
                style={styles.pinCloseButton}
                onPress={handleClosePinDialog}
              >
                <Text style={styles.pinCloseButtonText}>{t('close')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Employee Form
            <>
              <View style={styles.header}>
                <Text style={styles.title}>
                  {employee ? t('editEmployee') : t('createEmployee')}
                </Text>
                <TouchableOpacity onPress={onClose} disabled={loading}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>
                    {t('employeeName')} <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    placeholder={t('employeeName')}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>
                    {t('mobileNumber')} <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={formData.mobile}
                    onChangeText={(text) => setFormData({ ...formData, mobile: text })}
                    placeholder={t('mobileNumber')}
                    keyboardType="phone-pad"
                    editable={!employee} // Can't change mobile on edit
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>
                    {t('email')} <Text style={styles.optional}>({t('optional')})</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    placeholder={t('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>{t('employeeRole')}</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
                      style={styles.picker}
                    >
                      {roles.map((role) => (
                        <Picker.Item
                          key={role}
                          label={translateRole(role)}
                          value={role}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>{t('employeeStatus')}</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as UserStatus })}
                      style={styles.picker}
                    >
                      {statuses.map((status) => (
                        <Picker.Item
                          key={status}
                          label={t(status as any)}
                          value={status}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={onClose}
                    disabled={loading}
                  >
                    <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text style={styles.saveButtonText}>
                        {employee ? t('save') : t('createEmployee')}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
  },
  closeButton: {
    fontSize: 24,
    color: '#64748b',
    padding: 4,
  },
  form: {
    maxHeight: 500,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 6,
  },
  required: {
    color: '#ef4444',
  },
  optional: {
    color: '#94a3b8',
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1e293b',
    backgroundColor: '#ffffff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 50,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  pinDialog: {
    alignItems: 'center',
    padding: 20,
  },
  pinTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  pinSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
  },
  pinContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
  },
  pinText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3b82f6',
    letterSpacing: 4,
  },
  pinWarning: {
    fontSize: 14,
    color: '#f59e0b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  pinCloseButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  pinCloseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
