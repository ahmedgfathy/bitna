import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useLanguageStore } from '../stores/languageStore';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();
  const isEnglish = language === 'en';

  const toggleLanguage = () => {
    setLanguage(isEnglish ? 'ar' : 'en');
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={toggleLanguage}
      activeOpacity={0.7}
    >
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>{isEnglish ? '🇪🇬' : '🇺🇸'}</Text>
      </View>
      <Text style={styles.label}>{isEnglish ? 'عربي' : 'English'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  flagContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    fontSize: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563eb',
  },
});
