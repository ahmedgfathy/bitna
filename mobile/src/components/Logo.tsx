import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import theme from '../config/theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
  style?: ViewStyle;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showTagline = true,
  style 
}) => {
  const sizes = {
    small: {
      circle: 32,
      letter: 18,
      text: 16,
      tagline: 9,
    },
    medium: {
      circle: 40,
      letter: 24,
      text: 20,
      tagline: 10,
    },
    large: {
      circle: 50,
      letter: 28,
      text: 24,
      tagline: 11,
    },
  };

  const currentSize = sizes[size];

  return (
    <View style={[styles.logoContainer, style]}>
      <View 
        style={[
          styles.logoCircle, 
          { 
            width: currentSize.circle, 
            height: currentSize.circle, 
            borderRadius: currentSize.circle / 2 
          }
        ]}
      >
        <Text style={[styles.logoLetter, { fontSize: currentSize.letter }]}>C</Text>
      </View>
      <View style={styles.logoTextContainer}>
        <Text style={[styles.logoText, { fontSize: currentSize.text }]}>Contaboo</Text>
        {showTagline && (
          <Text style={[styles.logoTagline, { fontSize: currentSize.tagline }]}>
            your home
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logoLetter: {
    fontWeight: theme.typography.fontWeight.bold as TextStyle['fontWeight'],
    color: theme.colors.white,
  },
  logoTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: theme.typography.fontWeight.bold as TextStyle['fontWeight'],
    color: theme.colors.primary,
    lineHeight: 28,
  },
  logoTagline: {
    fontWeight: theme.typography.fontWeight.medium as TextStyle['fontWeight'],
    color: theme.colors.textSecondary,
    marginTop: -2,
  },
});
