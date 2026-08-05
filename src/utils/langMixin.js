import { onLanguageChange, t } from './languageManager.js';

/**
 * Mix this into any component that uses t() in its template.
 * It subscribes to language changes and forces a re-render.
 */
export const langMixin = {
  methods: { t },
  mounted() {
    this._unsubLang = onLanguageChange(() => { this.$forceUpdate(); });
  },
  beforeUnmount() {
    if (this._unsubLang) this._unsubLang();
  }
};
