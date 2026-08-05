<template>
  <div v-if="deity">
    <!-- Deity Hero Banner -->
    <div class="relative overflow-hidden" :style="{ background: `linear-gradient(160deg, ${deity.bgLight} 0%, #FAF7F2 100%)` }">
      <!-- Decorative Devanagari watermark -->
      <div class="absolute right-0 top-0 bottom-0 flex items-center justify-end pr-8 pointer-events-none overflow-hidden">
        <span class="font-sanskrit opacity-10 leading-none select-none" :style="{ fontSize: '16rem', color: deity.accentColor, fontFamily: '\'Noto Serif Devanagari\', serif' }">
          {{ deity.devanagari }}
        </span>
      </div>

      <div class="relative max-w-reading mx-auto px-6 md:px-8 py-16">
        <button @click="$router.push('/home')" class="flex items-center gap-2 text-sm text-text-secondary hover:text-charcoal transition-colors mb-8 group">
          <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
          </svg>
          {{ t('deity.allDeities') }}
        </button>

        <div class="max-w-2xl">
          <p class="section-label mb-3">{{ deity.epithet }}</p>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal mb-3 leading-tight">
            {{ deity.name }}
          </h1>
          <p class="font-sanskrit text-3xl mb-6 leading-none" :style="{ color: deity.accentColor, fontFamily: '\'Noto Serif Devanagari\', serif' }">
            {{ deity.devanagari }}
          </p>
          <p class="text-text-secondary leading-relaxed text-lg max-w-xl">{{ deity.description }}</p>

          <!-- Content count badges -->
          <div class="flex flex-wrap gap-2 mt-8">
            <span
              v-for="section in contentSections"
              :key="section.type"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-sm"
              :style="{ borderColor: deity.accentColor + '40', color: deity.accentColor, background: deity.bgLight }"
            >
              {{ section.items.length }} {{ section.title }}
            </span>
          </div>
        </div>
      </div>

      <!-- Bottom accent line -->
      <div class="h-0.5 w-full" :style="{ background: `linear-gradient(90deg, ${deity.accentColor}, transparent)` }"></div>
    </div>

    <!-- Tab Navigation -->
    <div class="sticky top-16 z-30 bg-white border-b border-border-subtle shadow-sm">
      <div class="max-w-reading mx-auto px-6 md:px-8">
        <div class="flex gap-0 overflow-x-auto scrollbar-hide">
          <button
            v-for="tab in availableTabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="flex-shrink-0 px-5 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap"
            :class="activeTab === tab.key
              ? 'border-gold text-gold'
              : 'border-transparent text-text-secondary hover:text-charcoal hover:border-border-warm'"
          >
            {{ tab.label }}
            <span class="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" :class="activeTab === tab.key ? 'bg-saffron-soft text-gold' : 'bg-gray-100 text-text-muted'">
              {{ tab.count }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-reading mx-auto px-6 md:px-8 py-12">
      <div v-if="activeTab === 'all'">
        <ContentSection
          v-for="section in contentSections"
          :key="section.type"
          :title="section.title"
          :items="section.items"
          :type="section.type"
          :accent-color="deity.accentColor"
          @item-click="navigateToContent"
        />
      </div>
      <div v-else>
        <ContentSection
          v-if="currentSection"
          :title="currentSection.title"
          :items="currentSection.items"
          :type="currentSection.type"
          :accent-color="deity.accentColor"
          @item-click="navigateToContent"
        />
      </div>
    </div>
  </div>

  <div v-else class="max-w-reading mx-auto px-8 py-32 text-center">
    <p class="text-6xl mb-6">🙏</p>
    <p class="text-text-secondary text-lg mb-6">{{ t('deity.notFound') }}</p>
    <button @click="$router.push('/home')" class="btn-primary">{{ t('deity.returnHome') }}</button>
  </div>
</template>

<script>
import { getDeityById } from '../content/deities.js';
import { getContentByDeity } from '../content/index.js';
import ContentSection from '../components/ContentSection.vue';
import { langMixin } from '../utils/langMixin.js';

const deityThemes = {
  ganesha:   { accentColor: '#E8821A', bgLight: '#FDF5EC' },
  shiva:     { accentColor: '#5B8DB8', bgLight: '#EEF4FB' },
  krishna:   { accentColor: '#4A7C9E', bgLight: '#EBF3F8' },
  durga:     { accentColor: '#C0392B', bgLight: '#FDECEA' },
  lakshmi:   { accentColor: '#C48A3A', bgLight: '#FDF0E0' },
  hanuman:   { accentColor: '#E8821A', bgLight: '#FDF5EC' },
  saraswati: { accentColor: '#7B68EE', bgLight: '#F0EEFF' },
  vishnu:    { accentColor: '#2E86AB', bgLight: '#E8F4F8' },
};

export default {
  name: 'DeityPage',
  components: { ContentSection },
  mixins: [langMixin],
  data() {
    return { deity: null, content: null, activeTab: 'all' };
  },
  computed: {
    contentSections() {
      if (!this.content) return [];
      const s = [];
      if (this.content.aartis.length)     s.push({ type: 'aarti',      title: this.t('deity.tabs.aarti'),     items: this.content.aartis });
      if (this.content.stotras.length)    s.push({ type: 'stotra',     title: this.t('deity.tabs.stotra'),    items: this.content.stotras });
      if (this.content.mantras.length)    s.push({ type: 'mantra',     title: this.t('deity.tabs.mantra'),    items: this.content.mantras });
      if (this.content.bhajans.length)    s.push({ type: 'bhajan',     title: this.t('deity.tabs.bhajan'),    items: this.content.bhajans });
      if (this.content.pujaVidhis.length) s.push({ type: 'puja-vidhi', title: this.t('deity.tabs.pujaVidhi'), items: this.content.pujaVidhis });
      return s;
    },
    availableTabs() {
      const total = this.contentSections.reduce((n, s) => n + s.items.length, 0);
      const tabs = [{ key: 'all', label: this.t('deity.tabs.all'), count: total }];
      this.contentSections.forEach(s => tabs.push({ key: s.type, label: s.title, count: s.items.length }));
      return tabs;
    },
    currentSection() {
      return this.contentSections.find(s => s.type === this.activeTab) || null;
    }
  },
  methods: {
    navigateToContent(item, type) {
      if (type === 'puja-vidhi') this.$router.push(`/puja-vidhi/${item.id}`);
      else this.$router.push(`/content/${item.id}`);
    }
  },
  created() {
    const id = this.$route.params.id;
    this.deity = getDeityById(id);
    if (this.deity) {
      const theme = deityThemes[id] || { accentColor: '#C48A3A', bgLight: '#FDF0E0' };
      this.deity = { ...this.deity, ...theme };
      this.content = getContentByDeity(this.deity.name);
    }
  }
};
</script>

<style scoped>
.section-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #C48A3A;
  display: block;
}
.font-sanskrit { font-family: 'Noto Serif Devanagari', serif; }
.bg-saffron-soft { background: #FDF0E0; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
