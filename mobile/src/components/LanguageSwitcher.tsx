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
      <Text style={styles.label}>{isEnglish ? 'AR' : 'EN'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 50,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 0.5,
  },
});
