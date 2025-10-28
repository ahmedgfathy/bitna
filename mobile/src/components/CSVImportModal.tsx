import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import csvImportService from '../services/csvImportService';

interface CSVImportModalProps {
  visible: boolean;
  onClose: () => void;
  onImportSuccess: (leads: any[]) => void;
  type: 'leads' | 'properties';
}

export default function CSVImportModal({
  visible,
  onClose,
  onImportSuccess,
  type = 'leads'
}: CSVImportModalProps) {
  const [importing, setImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [csvContent, setCsvContent] = useState<string>('');
  const [importResult, setImportResult] = useState<any>(null);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      setSelectedFile(file.name);

      // Read file content but don't process yet
      if (Platform.OS === 'web') {
        const response = await fetch(file.uri);
        const content = await response.text();
        setCsvContent(content);
      } else {
        const response = await fetch(file.uri);
        const content = await response.text();
        setCsvContent(content);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to read file: ' + error.message);
    }
  };

  const handleImport = async () => {
    if (!csvContent) {
      Alert.alert('Error', 'Please select a CSV file first');
      return;
    }
    
    await processCSV(csvContent);
  };

  const processCSV = async (csvContent: string) => {
    setImporting(true);
    setImportResult(null);

    try {
      let result;
      if (type === 'leads') {
        result = await csvImportService.importLeads(csvContent);
      } else {
        result = await csvImportService.importProperties(csvContent);
      }

      setImportResult(result);
      
      // Don't show alert or close automatically
      // Let user review results and click Done button
    } catch (error: any) {
      Alert.alert('Import Failed', error.message);
      setImportResult({
        success: false,
        imported: 0,
        failed: 0,
        errors: [{ row: 0, error: error.message }],
        data: []
      });
    } finally {
      setImporting(false);
    }
  };

  const handleDone = () => {
    if (importResult && importResult.data.length > 0) {
      onImportSuccess(importResult.data);
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedFile('');
    setCsvContent('');
    setImportResult(null);
    onClose();
  };

  const downloadTemplate = () => {
    const template = type === 'leads' 
      ? csvImportService.generateLeadsTemplate()
      : csvImportService.generatePropertiesTemplate();
    
    if (Platform.OS === 'web') {
      // Download template for web
      const blob = new Blob([template], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_import_template.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      Alert.alert(
        'Template',
        'Template will be downloaded. Please check your downloads folder.'
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Import {type === 'leads' ? 'Leads' : 'Properties'} from CSV
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* AI Hint */}
            <View style={styles.aiHintBox}>
              <Text style={styles.aiHintText}>
                🤖 AI-powered import automatically detects and maps your CSV columns
              </Text>
            </View>

            {/* File Selection */}
            <TouchableOpacity
              style={styles.selectFileButton}
              onPress={handlePickFile}
              disabled={importing}
            >
              {importing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.selectFileButtonText}>
                    📁 Select CSV File
                  </Text>
                  {selectedFile && (
                    <Text style={styles.selectedFileName}>{selectedFile}</Text>
                  )}
                </>
              )}
            </TouchableOpacity>

            {/* Import Progress */}
            {importing && (
              <View style={styles.progressBox}>
                <ActivityIndicator size="large" color="#1877f2" />
                <Text style={styles.progressText}>
                  Processing your CSV file...{'\n'}
                  Detecting fields and mapping data...
                </Text>
              </View>
            )}

            {/* Import Results */}
            {importResult && (
              <View style={styles.resultsBox}>
                <Text style={styles.resultsTitle}>
                  {importResult.success ? '✅ Import Results' : '⚠️ Import Results'}
                </Text>
                
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{importResult.imported}</Text>
                    <Text style={styles.statLabel}>Imported</Text>
                  </View>
                  <View style={[styles.statBox, styles.statBoxError]}>
                    <Text style={styles.statNumberError}>{importResult.failed}</Text>
                    <Text style={styles.statLabel}>Failed</Text>
                  </View>
                </View>

                {/* Error Details */}
                {importResult.errors.length > 0 && (
                  <View style={styles.errorsContainer}>
                    <Text style={styles.errorsTitle}>Errors:</Text>
                    <ScrollView style={styles.errorsList}>
                      {importResult.errors.slice(0, 10).map((error: any, index: number) => (
                        <Text key={index} style={styles.errorItem}>
                          Row {error.row}: {error.error}
                        </Text>
                      ))}
                      {importResult.errors.length > 10 && (
                        <Text style={styles.moreErrors}>
                          ... and {importResult.errors.length - 10} more errors
                        </Text>
                      )}
                    </ScrollView>
                  </View>
                )}

                {/* Preview Sample Data */}
                {importResult.data.length > 0 && (
                  <View style={styles.previewContainer}>
                    <Text style={styles.previewTitle}>
                      Preview (first 3 records):
                    </Text>
                    {importResult.data.slice(0, 3).map((item: any, index: number) => (
                      <View key={index} style={styles.previewItem}>
                        <Text style={styles.previewItemTitle}>
                          {item.name}
                        </Text>
                        <Text style={styles.previewItemDetail}>
                          📱 {item.phone}
                        </Text>
                        {item.email && (
                          <Text style={styles.previewItemDetail}>
                            ✉️ {item.email}
                          </Text>
                        )}
                        <Text style={styles.previewItemDetail}>
                          📍 Source: {item.source} | Status: {item.status}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.importButton,
                (!selectedFile || importing) && styles.importButtonDisabled
              ]}
              onPress={importResult ? handleDone : handleImport}
              disabled={!selectedFile || importing}
            >
              {importing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.importButtonText}>
                  {importResult ? '✓ Done' : '🚀 Import Now'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e6eb',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#050505',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#65676b',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  aiHintBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#1877f2',
  },
  aiHintText: {
    fontSize: 14,
    color: '#1877f2',
    fontWeight: '500',
    lineHeight: 20,
  },
  selectFileButton: {
    backgroundColor: '#1877f2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  selectFileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedFileName: {
    color: '#fff',
    fontSize: 13,
    marginTop: 4,
    opacity: 0.9,
  },
  progressBox: {
    backgroundColor: '#f0f2f5',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    marginTop: 12,
    fontSize: 14,
    color: '#65676b',
    textAlign: 'center',
    lineHeight: 20,
  },
  resultsBox: {
    backgroundColor: '#f0f2f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#050505',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statBoxError: {
    backgroundColor: '#fee',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1877f2',
  },
  statNumberError: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e74c3c',
  },
  statLabel: {
    fontSize: 12,
    color: '#65676b',
    marginTop: 4,
  },
  errorsContainer: {
    marginTop: 12,
  },
  errorsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c',
    marginBottom: 8,
  },
  errorsList: {
    maxHeight: 120,
  },
  errorItem: {
    fontSize: 12,
    color: '#e74c3c',
    marginBottom: 4,
    paddingLeft: 8,
  },
  moreErrors: {
    fontSize: 12,
    color: '#65676b',
    fontStyle: 'italic',
    marginTop: 4,
  },
  previewContainer: {
    marginTop: 16,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#050505',
    marginBottom: 8,
  },
  previewItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  previewItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#050505',
    marginBottom: 4,
  },
  previewItemDetail: {
    fontSize: 12,
    color: '#65676b',
    marginTop: 2,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f0f2f5',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#65676b',
  },
  importButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1877f2',
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importButtonDisabled: {
    backgroundColor: '#e4e6eb',
    opacity: 0.6,
  },
  importButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
