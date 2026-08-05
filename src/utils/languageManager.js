import hiContent from '../locales/hi/index.js';
import enContent from '../locales/en/index.js';
import mrContent from '../locales/mr/index.js';
import saContent from '../locales/sa/index.js';
import bnContent from '../locales/bn/index.js';

const languages = { hi: hiContent, en: enContent, mr: mrContent, sa: saContent, bn: bnContent };

// Reactive state — plain object watched by Vue components via $forceUpdate or computed
export const langState = {
  current: localStorage.getItem('ebhakti_lang') || 'hi'
};

// Listeners for components that need to react
const listeners = new Set();

export function onLanguageChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn); // returns unsubscribe
}

export function setLanguage(code) {
  if (!languages[code]) return false;
  langState.current = code;
  localStorage.setItem('ebhakti_lang', code);
  listeners.forEach(fn => fn(code));
  return true;
}

export function getCurrentLanguage() {
  return langState.current;
}

export function t(path) {
  const content = languages[langState.current];
  if (!path) return '';
  const val = path.split('.').reduce((obj, key) => obj?.[key], content);
  return val || path;
}

export function getContent(path = '') {
  const content = languages[langState.current];
  if (!path) return content;
  return path.split('.').reduce((obj, key) => obj?.[key], content);
}
