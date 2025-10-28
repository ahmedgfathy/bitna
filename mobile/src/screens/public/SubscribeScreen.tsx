import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../types/navigation';

type SubscribeScreenProps = NativeStackScreenProps<PublicStackParamList, 'Subscribe'>;

type AccountType = 'free' | 'freelancer' | 'company' | null;

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;

export default function SubscribeScreen({ navigation }: SubscribeScreenProps) {
  const [selectedType, setSelectedType] = useState<AccountType>(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select an account type');
      return;
    }

    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (selectedType !== 'free' && !mobile.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (selectedType !== 'free' && mobile.length !== 11) {
      Alert.alert('Error', 'Mobile number must be 11 digits');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    // TODO: Implement signup API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', `Account created as ${selectedType}`);
    }, 1500);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
    Alert.alert('Coming Soon', `${provider} authentication will be available soon`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Logo Header */}
      <TouchableOpacity 
        style={styles.topLogoContainer}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}
      >
        <View style={styles.logoCircleSmall}>
          <Text style={styles.logoLetterSmall}>C</Text>
        </View>
        {isDesktop && <Text style={styles.topLogoText}>Contaboo</Text>}
      </TouchableOpacity>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {isDesktop && (
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>Join Contaboo today</Text>
              <Text style={styles.heroSubtitle}>
                It's quick and easy.
              </Text>
            </View>
          )}

          <View style={styles.formContainer}>
            {/* Account Type Selection */}
            <View style={styles.accountTypeSection}>
              <Text style={styles.sectionTitle}>Choose Account Type</Text>
              
              <View style={styles.accountTypes}>
                {/* Free Account */}
                <TouchableOpacity
                  style={[
                    styles.accountTypeButton,
                    selectedType === 'free' && styles.accountTypeButtonSelected,
                  ]}
                  onPress={() => setSelectedType('free')}
                >
                  <View style={styles.accountTypeHeader}>
                    <Text style={styles.accountTypeIcon}>🌟</Text>
                    <View style={styles.radioOuter}>
                      {selectedType === 'free' && <View style={styles.radioInner} />}
                    </View>
                  </View>
                  <Text style={styles.accountTypeTitle}>Free Account</Text>
                  <Text style={styles.accountTypeDesc}>Browse properties</Text>
                  <Text style={styles.accountTypeBadge}>Always Free</Text>
                </TouchableOpacity>

                {/* Freelancer Account */}
                <TouchableOpacity
                  style={[
                    styles.accountTypeButton,
                    selectedType === 'freelancer' && styles.accountTypeButtonSelected,
                  ]}
                  onPress={() => setSelectedType('freelancer')}
                >
                  <View style={styles.accountTypeHeader}>
                    <Text style={styles.accountTypeIcon}>👤</Text>
                    <View style={styles.radioOuter}>
                      {selectedType === 'freelancer' && <View style={styles.radioInner} />}
                    </View>
                  </View>
                  <Text style={styles.accountTypeTitle}>Freelancer</Text>
                  <Text style={styles.accountTypeDesc}>Individual agent</Text>
                  <Text style={styles.accountTypeBadge}>Business</Text>
                </TouchableOpacity>

                {/* Company Account */}
                <TouchableOpacity
                  style={[
                    styles.accountTypeButton,
                    selectedType === 'company' && styles.accountTypeButtonSelected,
                  ]}
                  onPress={() => setSelectedType('company')}
                >
                  <View style={styles.accountTypeHeader}>
                    <Text style={styles.accountTypeIcon}>🏢</Text>
                    <View style={styles.radioOuter}>
                      {selectedType === 'company' && <View style={styles.radioInner} />}
                    </View>
                  </View>
                  <Text style={styles.accountTypeTitle}>Company</Text>
                  <Text style={styles.accountTypeDesc}>Full CRM</Text>
                  <Text style={styles.accountTypeBadge}>Enterprise</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Signup Card */}
            {selectedType && (
              <View style={styles.card}>
                {selectedType === 'free' && (
                  <>
                    <Text style={styles.cardTitle}>Sign up with</Text>
                    
                    {/* Social Login Buttons */}
                    <TouchableOpacity
                      style={[styles.socialButton, styles.googleButton]}
                      onPress={() => handleSocialLogin('google')}
                    >
                      <Text style={[styles.socialButtonText, { color: '#1c1e21' }]}>Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.socialButton, styles.facebookButton]}
                      onPress={() => handleSocialLogin('facebook')}
                    >
                      <Text style={[styles.socialButtonText, { color: '#ffffff' }]}>Continue with Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.socialButton, styles.appleButton]}
                      onPress={() => handleSocialLogin('apple')}
                    >
                      <Text style={[styles.socialButtonText, { color: '#ffffff' }]}>Continue with Apple</Text>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>or</Text>
                      <View style={styles.dividerLine} />
                    </View>
                  </>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#8e8e93"
                  editable={!isLoading}
                  autoCapitalize="words"
                />

                {selectedType !== 'free' && (
                  <TextInput
                    style={styles.input}
                    placeholder="Mobile number (11 digits)"
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                    maxLength={11}
                    placeholderTextColor="#8e8e93"
                    editable={!isLoading}
                  />
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Email (optional)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor="#8e8e93"
                  editable={!isLoading}
                  autoCapitalize="none"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#8e8e93"
                  editable={!isLoading}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  style={[styles.signupButton, isLoading && styles.buttonDisabled]}
                  onPress={handleSignup}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>

                <Text style={styles.termsText}>
                  By clicking Sign Up, you agree to our Terms and Privacy Policy.
                </Text>
              </View>
            )}

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginButtonText}>Already have an account?</Text>
              </TouchableOpacity>
            </View>

            {isDesktop && (
              <Text style={styles.footerText}>
                <Text style={styles.boldText}>Create a Page</Text> for a real estate business or brand
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e6eb',
  },
  logoCircleSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1877f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoLetterSmall: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  topLogoText: {
    fontSize: isDesktop ? 32 : 22,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: isDesktop ? 'flex-start' : 'center',
    padding: isDesktop ? 40 : 16,
    paddingTop: isDesktop ? 40 : 20,
    backgroundColor: isDesktop ? '#f0f2f5' : '#ffffff',
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: isDesktop ? 80 : 0,
    maxWidth: 580,
    paddingLeft: isDesktop ? 40 : 0,
  },
  heroTitle: {
    fontSize: isDesktop ? 56 : 28,
    fontWeight: 'bold',
    color: '#1877f2',
    lineHeight: isDesktop ? 64 : 32,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: isDesktop ? 28 : 16,
    color: '#1c1e21',
    lineHeight: isDesktop ? 32 : 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 432,
    alignItems: 'center',
  },
  accountTypeSection: {
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1e21',
    marginBottom: 12,
    textAlign: 'center',
  },
  accountTypes: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: 12,
    width: '100%',
  },
  accountTypeButton: {
    flex: isDesktop ? 1 : 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#dddfe2',
    padding: 12,
    alignItems: 'center',
  },
  accountTypeButtonSelected: {
    borderColor: '#1877f2',
    backgroundColor: '#e7f3ff',
  },
  accountTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  accountTypeIcon: {
    fontSize: 32,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1877f2',
  },
  accountTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c1e21',
    marginBottom: 4,
  },
  accountTypeDesc: {
    fontSize: 12,
    color: '#65676b',
    marginBottom: 8,
  },
  accountTypeBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#42b72a',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: isDesktop ? 8 : 0,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDesktop ? 0.1 : 0,
    shadowRadius: 8,
    elevation: isDesktop ? 2 : 0,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    color: '#65676b',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialButton: {
    width: '100%',
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderColor: '#dadde1',
  },
  facebookButton: {
    backgroundColor: '#1877f2',
    borderColor: '#1877f2',
  },
  appleButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  socialButtonText: {
    color: '#1c1e21',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#f5f6f7',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dddfe2',
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#1c1e21',
    marginBottom: 12,
  },
  signupButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#42b72a',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 11,
    color: '#65676b',
    textAlign: 'center',
    lineHeight: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dadde1',
  },
  dividerText: {
    color: '#8a8d91',
    fontSize: 14,
    paddingHorizontal: 16,
  },
  loginContainer: {
    width: '100%',
    marginTop: 16,
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dddfe2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#1877f2',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 28,
    fontSize: 14,
    color: '#1c1e21',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: '600',
  },
});
