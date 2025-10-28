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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../../types/navigation';
import { useAuthStore } from '../../stores/authStore';

type LoginScreenProps = NativeStackScreenProps<PublicStackParamList, 'Login'>;

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!mobile.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (mobile.length !== 11) {
      Alert.alert('Error', 'Mobile number must be 11 digits');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setIsLoading(true);
    const result = await login(mobile, password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.message || 'Invalid mobile number or password');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Logo Header - Always Visible */}
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

      <View style={styles.content}>
        {isDesktop && (
          <View style={styles.heroSection}>
            <Text style={styles.heroMainTitle}>
              Home Investment with Contaboo
            </Text>
          </View>
        )}

        <View style={styles.formContainer}>

          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Mobile number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={11}
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
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('Subscribe')}
            >
              <Text style={styles.createButtonText}>Create new account</Text>
            </TouchableOpacity>
          </View>

          {isDesktop && (
            <Text style={styles.footerText}>
              <Text style={styles.boldText}>Create a Page</Text> for a real estate business or brand
            </Text>
          )}
        </View>
      </View>
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
    justifyContent: 'flex-start',
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
  content: {
    flex: 1,
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isDesktop ? 40 : 0,
    paddingTop: isDesktop ? 0 : 20,
    backgroundColor: isDesktop ? '#f0f2f5' : '#ffffff',
  },
  heroSection: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingRight: isDesktop ? 80 : 0,
    paddingTop: isDesktop ? 20 : 0,
    maxWidth: 580,
    paddingLeft: isDesktop ? 40 : 0,
  },
  heroMainTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1877f2',
    lineHeight: 56,
  },
  formContainer: {
    width: '100%',
    maxWidth: 396,
    alignItems: 'center',
    paddingHorizontal: isDesktop ? 0 : 16,
    marginTop: isDesktop ? 0 : 0,
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
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#1877f2',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  forgotButton: {
    alignSelf: 'center',
    paddingVertical: 16,
  },
  forgotText: {
    color: '#1877f2',
    fontSize: 14,
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
  createButton: {
    width: isDesktop ? 'auto' : '100%',
    backgroundColor: '#42b72a',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: isDesktop ? 64 : 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 17,
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
