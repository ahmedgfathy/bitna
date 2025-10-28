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
      <View style={styles.content}>
        {isDesktop && (
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoLetter}>C</Text>
              </View>
              <Text style={styles.heroTitle}>contaboo</Text>
            </View>
            <Text style={styles.heroSubtitle}>
              Find your dream property with Contaboo
            </Text>
          </View>
        )}

        <View style={styles.formContainer}>
          {!isDesktop && (
            <View style={styles.mobileLogo}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoLetter}>C</Text>
              </View>
            </View>
          )}

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
    backgroundColor: isDesktop ? '#f0f2f5' : '#ffffff',
  },
  content: {
    flex: 1,
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isDesktop ? 40 : 16,
    paddingVertical: isDesktop ? 0 : 40,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 580,
    paddingRight: 60,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: isDesktop ? 70 : 60,
    height: isDesktop ? 70 : 60,
    borderRadius: isDesktop ? 35 : 30,
    backgroundColor: '#1877f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: {
    fontSize: isDesktop ? 42 : 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroTitle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1877f2',
    marginLeft: 12,
  },
  heroSubtitle: {
    fontSize: 28,
    lineHeight: 32,
    color: '#1c1e21',
  },
  mobileLogo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 396,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  input: {
    backgroundColor: '#f0f2f5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dddfe2',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
    marginBottom: 12,
    color: '#1c1e21',
  },
  loginButton: {
    backgroundColor: '#1877f2',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  forgotButton: {
    alignItems: 'center',
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
    backgroundColor: '#dddfe2',
  },
  dividerText: {
    color: '#8a8d91',
    paddingHorizontal: 16,
    fontSize: 13,
  },
  createButton: {
    backgroundColor: '#42b72a',
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#1c1e21',
    textAlign: 'center',
    marginTop: 28,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
