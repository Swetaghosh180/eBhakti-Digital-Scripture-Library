<template>
  <header class="sticky top-0 z-50 bg-white border-b border-border-subtle shadow-warm">
    <div class="h-0.5 bg-gold-gradient w-full"></div>

    <nav class="max-w-reading mx-auto px-6 md:px-8 py-4">
      <div class="flex justify-between items-center">

        <!-- Logo -->
        <router-link to="/home" class="flex items-center gap-2.5 group logo-link">
          <span class="om-symbol text-2xl group-hover:animate-glow transition-all duration-300" style="font-family:'Noto Serif Devanagari',serif; color:#C48A3A;">ॐ</span>
          <div>
            <span class="text-xl font-serif text-charcoal tracking-tight leading-none block">eBhakti</span>
            <span class="text-xs text-text-muted tracking-widest uppercase leading-none hidden sm:block" style="font-size:0.55rem">{{ t('footer.tagline') }}</span>
          </div>
        </router-link>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-8">
          <router-link
            v-for="(section, i) in sections"
            :key="section.key"
            :to="section.path"
            class="text-sm text-text-secondary hover:text-charcoal transition-colors duration-200 link-elegant nav-item"
            :style="{ animationDelay: `${i * 40}ms` }"
            active-class="!text-gold font-medium"
          >
            {{ t(section.labelKey) }}
          </router-link>
        </div>

        <!-- Right controls -->
        <div class="flex items-center gap-4">
          <!-- Language dropdown -->
          <div class="relative hidden md:block">
            <button
              @click="langDropdownOpen = !langDropdownOpen"
              class="flex items-center gap-1.5 text-sm text-text-secondary hover:text-charcoal transition-colors duration-200 px-3 py-1.5 border border-border-subtle hover:border-gold rounded-sm"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span class="font-medium">{{ currentLang.script }}</span>
              <span class="text-text-muted">{{ currentLang.name }}</span>
              <svg class="w-3 h-3 transition-transform duration-200" :class="langDropdownOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <transition name="dropdown">
              <div v-if="langDropdownOpen" class="absolute right-0 mt-2 w-44 bg-white border border-border-subtle shadow-warm-lg z-50 rounded-sm overflow-hidden">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="selectLanguage(lang)"
                  class="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3"
                  :class="currentLang.code === lang.code
                    ? 'text-gold bg-saffron-soft font-medium'
                    : 'text-text-secondary hover:bg-ivory hover:text-charcoal'"
                >
                  <span class="text-base w-6 text-center font-sanskrit">{{ lang.script }}</span>
                  <div>
                    <p class="leading-none">{{ lang.name }}</p>
                    <p class="text-xs text-text-muted mt-0.5">{{ lang.nativeName }}</p>
                  </div>
                  <svg v-if="currentLang.code === lang.code" class="w-3.5 h-3.5 text-gold ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </transition>
          </div>

          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden text-charcoal p-1.5 hover:bg-ivory rounded-sm transition-colors menu-btn">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="lg:hidden mt-4 pt-4 border-t border-border-subtle">
          <div class="grid grid-cols-2 gap-1 mb-4">
            <router-link
              v-for="section in sections"
              :key="section.key"
              :to="section.path"
              @click="mobileMenuOpen = false"
              class="flex items-center gap-2 py-3 px-3 text-sm text-text-secondary hover:text-charcoal hover:bg-ivory rounded-sm transition-colors"
              active-class="text-gold bg-saffron-soft font-medium"
            >
              <span class="text-base">{{ section.icon }}</span>
              {{ t(section.labelKey) }}
            </router-link>
          </div>

          <!-- Mobile language picker -->
          <div class="border-t border-border-subtle pt-4">
            <p class="text-xs text-text-muted uppercase tracking-widest mb-3 px-3">{{ langLabel }}</p>
            <div class="flex flex-wrap gap-2 px-3">
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="selectLanguage(lang); mobileMenuOpen = false"
                class="flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded-sm transition-colors"
                :class="currentLang.code === lang.code
                  ? 'border-gold text-gold bg-saffron-soft font-medium'
                  : 'border-border-subtle text-text-secondary hover:border-gold hover:text-gold'"
              >
                <span class="font-sanskrit">{{ lang.script }}</span>
                {{ lang.name }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script>
import { setLanguage, t, langState, onLanguageChange } from '../utils/languageManager.js';

export default {
  name: 'AppHeader',
  data() {
    return {
      mobileMenuOpen: false,
      langDropdownOpen: false,
      // reactive copy of current lang code — updated by listener
      activeLangCode: langState.current,
      sections: [
        { key: 'home',      labelKey: 'navigation.home',      path: '/home',       icon: '🏠' },
        { key: 'stotras',   labelKey: 'navigation.stotras',   path: '/stotras',    icon: '📜' },
        { key: 'aartis',    labelKey: 'navigation.aartis',    path: '/aartis',     icon: '🪔' },
        { key: 'mantras',   labelKey: 'navigation.mantras',   path: '/mantras',    icon: '🔔' },
        { key: 'bhajans',   labelKey: 'navigation.bhajans',   path: '/bhajans',    icon: '🎵' },
        { key: 'pujaVidhi', labelKey: 'navigation.pujaVidhi', path: '/puja-vidhi', icon: '🌸' },
        { key: 'festivals', labelKey: 'navigation.festivals', path: '/festivals',  icon: '📅' }
      ],
      languages: [
        { code: 'hi', name: 'Hindi',    nativeName: 'हिन्दी',      script: 'हि' },
        { code: 'en', name: 'English',  nativeName: 'English',     script: 'En' },
        { code: 'mr', name: 'Marathi',  nativeName: 'मराठी',       script: 'म'  },
        { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्',   script: 'सं' },
        { code: 'bn', name: 'Bengali',  nativeName: 'বাংলা',       script: 'বা' }
      ]
    };
  },
  computed: {
    currentLang() {
      return this.languages.find(l => l.code === this.activeLangCode) || this.languages[0];
    },
    langLabel() {
      const labels = { hi: 'भाषा', en: 'Language', mr: 'भाषा', sa: 'भाषा', bn: 'ভাষা' };
      return labels[this.activeLangCode] || 'Language';
    }
  },
  methods: {
    t,
    selectLanguage(lang) {
      setLanguage(lang.code);
      this.langDropdownOpen = false;
    }
  },
  mounted() {
    // Subscribe to language changes — update activeLangCode to trigger re-render
    this._unsubLang = onLanguageChange((code) => {
      this.activeLangCode = code;
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) this.langDropdownOpen = false;
    });
  },
  beforeUnmount() {
    if (this._unsubLang) this._unsubLang();
  }
};
</script>

<style scoped>
.bg-gold-gradient { background: linear-gradient(90deg, #C48A3A, #E8B96A, #C48A3A); }
.logo-link { transition: opacity 0.2s ease; }
.logo-link:hover { opacity: 0.85; }
.font-sanskrit { font-family: 'Noto Serif Devanagari', serif; }
.bg-saffron-soft { background: #FDF0E0; }
.bg-ivory { background: #FAF7F2; }

.nav-item {
  opacity: 0;
  animation: fadeSlideDown 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
}
.menu-btn { transition: transform 0.2s ease; }
.menu-btn:hover { transform: scale(1.05); }

.dropdown-enter-active { animation: fadeSlideDown 0.2s cubic-bezier(0.22,1,0.36,1) both; }
.dropdown-leave-active { animation: fadeOut 0.15s ease both; }
.mobile-menu-enter-active { animation: fadeSlideDown 0.28s cubic-bezier(0.22,1,0.36,1) both; }
.mobile-menu-leave-active { animation: fadeOut 0.18s ease both; }
</style>
