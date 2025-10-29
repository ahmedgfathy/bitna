import { TextStyle } from 'react-native';
import { useLanguageStore } from '../stores/languageStore';

/**
 * Hook that returns text style with RTL support
 * For Arabic: textAlign: 'right' and writingDirection: 'rtl'
 * For English: textAlign: 'left'
 */
export const useRTLStyle = (): TextStyle => {
  const { isRTL } = useLanguageStore();
  
  if (isRTL) {
    return {
      textAlign: 'right',
      writingDirection: 'rtl',
    };
  }
  
  return {
    textAlign: 'left',
  };
};

/**
 * Get alignment based on language (for flexbox/View alignment)
 */
export const useAlignment = () => {
  const { isRTL } = useLanguageStore();
  
  return {
    alignStart: isRTL ? 'flex-end' : 'flex-start',
    alignEnd: isRTL ? 'flex-start' : 'flex-end',
    textAlign: isRTL ? 'right' as const : 'left' as const,
  };
};

