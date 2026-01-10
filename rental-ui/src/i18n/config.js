import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import frTranslations from '../locales/fr.json';
import hiTranslations from '../locales/hi.json';
import zhTranslations from '../locales/zh.json';
import deTranslations from '../locales/de.json';
import jaTranslations from '../locales/ja.json';
import paTranslations from '../locales/pa.json';
import ruTranslations from '../locales/ru.json';
import ptTranslations from '../locales/pt.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      hi: { translation: hiTranslations },
      zh: { translation: zhTranslations },
      de: { translation: deTranslations },
      ja: { translation: jaTranslations },
      pa: { translation: paTranslations },
      ru: { translation: ruTranslations },
      pt: { translation: ptTranslations },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
