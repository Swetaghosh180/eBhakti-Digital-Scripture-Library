<template>
  <header class="sticky top-0 z-40 bg-white border-b border-border-subtle header-enter">
    <nav class="max-w-reading mx-auto px-8 py-5">
      <div class="flex justify-between items-center">
        <router-link to="/home" class="text-xl font-serif text-charcoal tracking-tight logo-link">
          eBhakti
        </router-link>

        <div class="hidden md:flex items-center space-x-10">
          <router-link
            v-for="(section, i) in sections"
            :key="section.name"
            :to="section.path"
            class="text-sm text-text-secondary hover:text-charcoal transition-colors duration-200 link-elegant nav-item"
            :style="{ animationDelay: `${i * 50}ms` }"
            active-class="text-charcoal"
          >
            {{ t(section.name) }}
          </router-link>

          <div class="relative">
            <button
              @click="langDropdownOpen = !langDropdownOpen"
              class="text-sm text-text-secondary hover:text-charcoal transition-colors duration-200"
            >
              {{ selectedLanguage.name }}
            </button>

            <transition name="dropdown">
              <div v-if="langDropdownOpen" class="absolute right-0 mt-3 w-36 bg-white border border-border-subtle shadow-lg z-50">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="selectLanguage(lang)"
                  class="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-ivory hover:text-charcoal transition-colors"
                >
                  {{ lang.name }}
                </button>
              </div>
            </transition>
          </div>
        </div>

        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-charcoal menu-btn">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="md:hidden mt-6 pt-6 border-t border-border-subtle">
          <router-link
            v-for="section in sections"
            :key="section.name"
            :to="section.path"
            @click="mobileMenuOpen = false"
            class="block py-3 text-sm text-text-secondary hover:text-charcoal transition-colors"
            active-class="text-charcoal"
          >
            {{ t(section.name) }}
          </router-link>

          <div class="border-t border-border-subtle mt-6 pt-6">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="selectLanguage(lang); mobileMenuOpen = false"
              class="block w-full text-left py-3 text-sm text-text-secondary hover:text-charcoal transition-colors"
            >
              {{ lang.name }}
            </button>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script>
import { setLanguage, t } from '../utils/languageManager.js';

export default {
  name: 'AppHeader',
  data() {
    return {
      mobileMenuOpen: false,
      langDropdownOpen: false,
      selectedLanguage: { code: 'hi', name: 'Hindi' },
      sections: [
        { name: 'navigation.home', path: '/home' },
        { name: 'navigation.stotras', path: '/stotras' },
        { name: 'navigation.aartis', path: '/aartis' },
        { name: 'navigation.mantras', path: '/mantras' },
        { name: 'navigation.bhajans', path: '/bhajans' },
        { name: 'navigation.pujaVidhi', path: '/puja-vidhi' },
        { name: 'navigation.festivals', path: '/festivals' }
      ],
      languages: [
        { code: 'hi', name: 'Hindi' },
        { code: 'en', name: 'English' },
        { code: 'mr', name: 'Marathi' },
        { code: 'sa', name: 'Sanskrit' },
        { code: 'bn', name: 'Bengali' }
      ]
    };
  },
  methods: {
    t,
    selectLanguage(lang) {
      this.selectedLanguage = lang;
      this.langDropdownOpen = false;
      setLanguage(lang.code);
      this.$forceUpdate();
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) this.langDropdownOpen = false;
    });
  }
};
</script>

<style scoped>
.header-enter {
  animation: fadeSlideDown 0.5s cubic-bezier(0.22,1,0.36,1) both;
}
.logo-link {
  transition: opacity 0.2s ease;
}
.logo-link:hover { opacity: 0.7; }

.nav-item {
  opacity: 0;
  animation: fadeSlideDown 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
}
.menu-btn {
  transition: transform 0.2s ease;
}
.menu-btn:hover { transform: scale(1.1); }

/* Dropdown */
.dropdown-enter-active { animation: fadeSlideDown 0.2s cubic-bezier(0.22,1,0.36,1) both; }
.dropdown-leave-active { animation: fadeOut 0.15s ease both; }

/* Mobile menu */
.mobile-menu-enter-active { animation: fadeSlideDown 0.28s cubic-bezier(0.22,1,0.36,1) both; }
.mobile-menu-leave-active { animation: fadeOut 0.18s ease both; }
</style>
