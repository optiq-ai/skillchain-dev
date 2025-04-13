import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importy plików tłumaczeń
import translationPL from './locales/pl/translation.json';
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';
import translationUK from './locales/uk/translation.json';

// Zasoby tłumaczeń
const resources = {
  pl: {
    translation: translationPL
  },
  en: {
    translation: translationEN
  },
  de: {
    translation: translationDE
  },
  uk: {
    translation: translationUK
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl', // Domyślny język
    fallbackLng: 'en', // Język zapasowy
    interpolation: {
      escapeValue: false // React już zabezpiecza przed XSS
    }
  });

export default i18n;
