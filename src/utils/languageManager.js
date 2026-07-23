import hiContent from '../locales/hi/index.js';
import enContent from '../locales/en/index.js';
import mrContent from '../locales/mr/index.js';
import saContent from '../locales/sa/index.js';
import bnContent from '../locales/bn/index.js';

const languages = {
  hi: hiContent,
  en: enContent,
  mr: mrContent,
  sa: saContent,
  bn: bnContent
};

let currentLanguage = 'hi';

export function setLanguage(langCode) {
  if (languages[langCode]) {
    currentLanguage = langCode;
    return true;
  }
  return false;
}

export function getCurrentLanguage() {
  return currentLanguage;
}

export function getContent(path = '') {
  const content = languages[currentLanguage];
  
  if (!path) return content;
  
  // Navigate through nested object path like 'home.title'
  return path.split('.').reduce((obj, key) => obj?.[key], content);
}

export function t(path) {
  return getContent(path) || path;
}