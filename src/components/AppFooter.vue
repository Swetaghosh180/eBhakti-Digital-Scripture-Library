<template>
  <footer class="bg-charcoal text-white mt-24">
    <div class="h-0.5 bg-gold-gradient"></div>

    <div class="max-w-reading mx-auto px-6 md:px-8 pt-16 pb-10">
      <div class="grid md:grid-cols-3 gap-12 mb-12">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-5">
            <span class="text-3xl font-sanskrit text-gold">ॐ</span>
            <div>
              <p class="text-xl font-serif text-white leading-none">eBhakti</p>
              <p class="text-xs text-gold-light tracking-widest uppercase mt-0.5" style="font-size:0.6rem">{{ t('footer.tagline') }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed mb-5">{{ t('footer.mission') }}</p>
          <p class="text-xs text-gray-500 font-sanskrit">{{ t('footer.verse') }}</p>
          <p class="text-xs text-gray-600 mt-1">{{ t('footer.verseMeaning') }}</p>
        </div>

        <!-- Quick links -->
        <div>
          <p class="footer-label mb-5">{{ t('footer.explore') }}</p>
          <div class="grid grid-cols-2 gap-2">
            <router-link v-for="link in quickLinks" :key="link.key" :to="link.path"
              class="text-sm text-gray-400 hover:text-gold transition-colors duration-200 py-1">
              {{ t(link.labelKey) }}
            </router-link>
          </div>
        </div>

        <!-- Deities -->
        <div>
          <p class="footer-label mb-5">{{ t('footer.deities') }}</p>
          <div class="grid grid-cols-2 gap-2">
            <router-link v-for="deity in deityLinks" :key="deity.id" :to="`/deity/${deity.id}`"
              class="text-sm text-gray-400 hover:text-gold transition-colors duration-200 py-1">
              {{ deity.name }}
            </router-link>
          </div>
        </div>
      </div>

      <div class="divider-gold opacity-30 mb-8"></div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-500">{{ t('footer.copyright') }}</p>
        <div class="flex items-center gap-6">
          <span class="text-xs text-gray-600">{{ t('footer.verified') }}</span>
          <span class="text-xs text-gray-600">•</span>
          <span class="text-xs text-gray-600">{{ t('footer.nonprofit') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { langMixin } from '../utils/langMixin.js';

export default {
  name: 'AppFooter',
  mixins: [langMixin],
  data() {
    return {
      quickLinks: [
        { key: 'stotras',   labelKey: 'navigation.stotras',   path: '/stotras' },
        { key: 'aartis',    labelKey: 'navigation.aartis',    path: '/aartis' },
        { key: 'mantras',   labelKey: 'navigation.mantras',   path: '/mantras' },
        { key: 'bhajans',   labelKey: 'navigation.bhajans',   path: '/bhajans' },
        { key: 'pujaVidhi', labelKey: 'navigation.pujaVidhi', path: '/puja-vidhi' },
        { key: 'festivals', labelKey: 'navigation.festivals', path: '/festivals' },
      ],
      deityLinks: [
        { id: 'ganesha',   name: 'Ganesha' },
        { id: 'shiva',     name: 'Shiva' },
        { id: 'krishna',   name: 'Krishna' },
        { id: 'durga',     name: 'Durga' },
        { id: 'lakshmi',   name: 'Lakshmi' },
        { id: 'hanuman',   name: 'Hanuman' },
        { id: 'saraswati', name: 'Saraswati' },
        { id: 'vishnu',    name: 'Vishnu' },
      ]
    };
  }
};
</script>

<style scoped>
.bg-gold-gradient { background: linear-gradient(90deg, #C48A3A, #E8B96A, #C48A3A); }
.font-sanskrit { font-family: 'Noto Serif Devanagari', serif; }
.footer-label {
  font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #E8B96A; display: block;
}
.divider-gold {
  height: 1px;
  background: linear-gradient(90deg, transparent, #C48A3A, transparent);
}
</style>
