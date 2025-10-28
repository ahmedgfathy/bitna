import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../types/navigation';

type SubscribeScreenProps = NativeStackScreenProps<PublicStackParamList, 'Subscribe'>;

type AccountType = 'freelancer' | 'company' | null;

export default function SubscribeScreen({ navigation }: SubscribeScreenProps) {
  const [selectedType, setSelectedType] = useState<AccountType>(null);

  const handleContinue = () => {
    if (!selectedType) return;
    
    // TODO: Implement registration flow in Phase 4
    console.log('Selected account type:', selectedType);
    alert(`Registration for ${selectedType} account will be implemented in Phase 4`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Bitna</Text>
          <Text style={styles.title}>Join Bitna</Text>
          <Text style={styles.subtitle}>
            Choose your account type to get started
          </Text>
        </View>

        {/* Account Type Selection */}
        <View style={styles.cardsContainer}>
          {/* Freelancer Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedType === 'freelancer' && styles.cardSelected,
            ]}
            onPress={() => setSelectedType('freelancer')}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>👤</Text>
              <View style={styles.radioOuter}>
                {selectedType === 'freelancer' && <View style={styles.radioInner} />}
              </View>
            </View>
            <Text style={styles.cardTitle}>Freelancer Agent</Text>
            <Text style={styles.cardDescription}>
              Perfect for individual real estate agents working independently
            </Text>
            
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Manage your own properties</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Connect with clients directly</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Track leads and inquiries</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Personal dashboard</Text>
              </View>
            </View>
            
            <View style={styles.pricingBadge}>
              <Text style={styles.pricingText}>Starter Plan</Text>
            </View>
          </TouchableOpacity>

          {/* Company Card */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedType === 'company' && styles.cardSelected,
            ]}
            onPress={() => setSelectedType('company')}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🏢</Text>
              <View style={styles.radioOuter}>
                {selectedType === 'company' && <View style={styles.radioInner} />}
              </View>
            </View>
            <Text style={styles.cardTitle}>Company / Agency</Text>
            <Text style={styles.cardDescription}>
              Ideal for real estate companies with multiple agents
            </Text>
            
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Team management</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Multiple user roles</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Centralized property pool</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Advanced analytics</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Company branding</Text>
              </View>
            </View>
            
            <View style={[styles.pricingBadge, styles.pricingBadgePremium]}>
              <Text style={[styles.pricingText, styles.pricingTextPremium]}>
                Business Plan
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedType && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedType}
        >
          <Text style={styles.continueButtonText}>
            Continue as {selectedType === 'freelancer' ? 'Freelancer' : selectedType === 'company' ? 'Company' : '...'}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why Join Bitna?</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🚀</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoTextBold}>Fast Setup:</Text> Get started in minutes
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📱</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoTextBold}>Mobile-First:</Text> Manage on the go
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🔒</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoTextBold}>Secure:</Text> Your data is protected
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 48,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563eb',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 20,
  },
  featuresList: {
    gap: 12,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: '#475569',
  },
  pricingBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  pricingBadgePremium: {
    backgroundColor: '#fef3c7',
  },
  pricingText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 12,
  },
  pricingTextPremium: {
    color: '#f59e0b',
  },
  continueButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#94a3b8',
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 32,
  },
  loginText: {
    fontSize: 14,
    color: '#64748b',
  },
  loginLink: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '700',
  },
  infoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  infoList: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  infoTextBold: {
    fontWeight: '700',
    color: '#1e293b',
  },
});
