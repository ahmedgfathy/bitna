import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { translations, Language, TranslationKey } from '../i18n/translations';

const LANGUAGE_KEY = '@contaboo:language';

interface LanguageStore {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: TranslationKey) => string;
  initLanguage: () => Promise<void>;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: 'en',
  isRTL: false,

  t: (key: TranslationKey) => {
    const { language } = get();
    return translations[language][key] || key;
  },

  setLanguage: async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
      const isRTL = lang === 'ar';
      
      // Don't force RTL layout - only use RTL for text direction
      // We'll handle text alignment in the UI components
      // if (I18nManager.isRTL !== isRTL) {
      //   I18nManager.forceRTL(isRTL);
      // }

      set({ language: lang, isRTL });
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  },

  initLanguage: async () => {
    try {
      const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
        const isRTL = savedLang === 'ar';
        // Don't force RTL layout on init
        // I18nManager.forceRTL(isRTL);
        set({ language: savedLang, isRTL });
      }
    } catch (error) {
      console.error('Failed to load language:', error);
    }
  },
}));
