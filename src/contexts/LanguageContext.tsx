import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTranslations, getBrowserLanguage, getSavedLanguage, saveLanguage, translations } from '@/lib/i18n';

type TranslationType = typeof translations.en | typeof translations.ro;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
  showSelector: boolean;
  setShowSelector: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ro');
  const [showSelector, setShowSelector] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const saved = getSavedLanguage();
    if (saved) {
      setLanguageState(saved);
      setInitialized(true);
    } else {
      const browserLang = getBrowserLanguage();
      setLanguageState(browserLang);
      setShowSelector(true);
      setInitialized(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
    setShowSelector(false);
  };

  const t = getTranslations(language);

  if (!initialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, showSelector, setShowSelector }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
