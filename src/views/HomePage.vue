<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden" style="background: linear-gradient(160deg, #FAF7F2 0%, #F5EFE4 50%, #FDF0E0 100%);">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span class="text-gold opacity-5 leading-none" style="font-size:32rem; font-family:'Noto Serif Devanagari',serif;">ॐ</span>
      </div>

      <div class="relative max-w-reading mx-auto px-6 md:px-8 py-24 md:py-32 text-center">
        <div class="hero-sub mb-6">
          <span class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold bg-saffron-soft border border-gold border-opacity-20 px-4 py-2 rounded-sm">
            <span style="font-family:'Noto Serif Devanagari',serif; font-size:1rem;">ॐ</span>
            {{ t('home.badge') }}
          </span>
        </div>

        <h1 class="hero-title text-5xl md:text-6xl lg:text-7xl font-serif text-charcoal mb-6 leading-tight">
          {{ t('home.title1') }}<br>
          <span class="text-gold-gradient italic">{{ t('home.title2') }}</span>
        </h1>

        <div class="hero-ornament mb-8"></div>

        <p class="hero-desc text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
          {{ t('home.subtitle') }}
        </p>

        <div class="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="scrollToDeities" class="btn-primary">
            {{ t('home.exploreBtn') }}
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <router-link to="/stotras" class="btn-outline">{{ t('home.browseBtn') }}</router-link>
        </div>

        <div class="hero-stats flex flex-wrap justify-center gap-8 mt-16 pt-10 border-t border-border-subtle">
          <div class="text-center">
            <p class="text-2xl font-serif text-gold font-semibold">8</p>
            <p class="text-xs text-text-muted uppercase tracking-widest mt-1">{{ t('home.stats.deities') }}</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-serif text-gold font-semibold">30+</p>
            <p class="text-xs text-text-muted uppercase tracking-widest mt-1">{{ t('home.stats.texts') }}</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-serif text-gold font-semibold">11</p>
            <p class="text-xs text-text-muted uppercase tracking-widest mt-1">{{ t('home.stats.mantras') }}</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-serif text-gold font-semibold">4</p>
            <p class="text-xs text-text-muted uppercase tracking-widest mt-1">{{ t('home.stats.pujaGuides') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Deity Grid -->
    <section id="deities" class="max-w-reading mx-auto px-6 md:px-8 py-20">
      <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12">
        <div>
          <p class="section-label mb-2">{{ t('home.deitySection.label') }}</p>
          <h2 class="text-3xl md:text-4xl font-serif text-charcoal">{{ t('home.deitySection.title') }}</h2>
        </div>
        <p class="text-sm text-text-secondary">{{ t('home.deitySection.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <template v-if="loading">
          <div v-for="n in 8" :key="n" class="bg-white border border-border-subtle p-6">
            <div class="skeleton h-3 w-12 mx-auto mb-4"></div>
            <div class="skeleton h-5 w-3/4 mx-auto mb-2"></div>
            <div class="skeleton h-3 w-1/2 mx-auto mb-4"></div>
          </div>
        </template>

        <div
          v-else
          v-for="(deity, i) in deities"
          :key="deity.id"
          class="deity-card stagger-item"
          :style="{ animationDelay: `${i * 70}ms` }"
          @click="$router.push(`/deity/${deity.id}`)"
        >
          <div class="h-1 w-full" :style="{ background: deity.accentColor }"></div>
          <div class="p-6 text-center">
            <p class="text-2xl mb-2 leading-none" :style="{ color: deity.accentColor, fontFamily: '\'Noto Serif Devanagari\', serif' }">
              {{ deity.devanagari }}
            </p>
            <h3 class="text-lg font-serif text-charcoal mb-1 group-hover:text-gold transition-colors duration-200">{{ deity.name }}</h3>
            <p class="text-xs text-text-secondary mb-4 leading-snug">{{ deity.epithet }}</p>
            <div class="flex flex-wrap gap-1 justify-center">
              <span v-for="type in deity.contentTypes" :key="type"
                class="text-xs px-2 py-0.5 rounded-sm"
                style="background:#FDF0E0; color:#9E6B22; font-size:0.6rem; letter-spacing:0.06em; text-transform:uppercase;">
                {{ type }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Browse by Type -->
    <section class="bg-parchment border-y border-border-subtle">
      <div class="max-w-reading mx-auto px-6 md:px-8 py-20">
        <div class="mb-12">
          <p class="section-label mb-2">{{ t('home.browseSection.label') }}</p>
          <h2 class="text-3xl md:text-4xl font-serif text-charcoal">{{ t('home.browseSection.title') }}</h2>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="(cat, i) in categoryKeys"
            :key="cat.key"
            class="devotional-card p-8 cursor-pointer group stagger-item"
            :style="{ animationDelay: `${i * 80}ms` }"
            @click="$router.push(cat.path)"
          >
            <div class="text-3xl mb-4">{{ cat.icon }}</div>
            <p class="section-label mb-2">{{ t(`home.categories.${cat.key}.label`) }}</p>
            <h3 class="text-xl font-serif text-charcoal mb-2 group-hover:text-gold transition-colors duration-200">
              {{ t(`home.categories.${cat.key}.name`) }}
            </h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ t(`home.categories.${cat.key}.description`) }}</p>
            <div class="mt-4 flex items-center gap-1 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {{ t('home.explore') }} <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Additions -->
    <section class="max-w-reading mx-auto px-6 md:px-8 py-20">
      <div class="mb-12">
        <p class="section-label mb-2">{{ t('home.recentSection.label') }}</p>
        <h2 class="text-3xl md:text-4xl font-serif text-charcoal">{{ t('home.recentSection.title') }}</h2>
      </div>
      <div class="bg-white border border-border-subtle">
        <div
          v-for="(item, index) in recentItems"
          :key="item.id"
          class="content-row px-6 py-6 stagger-item"
          :style="{ animationDelay: `${index * 80}ms` }"
          @click="$router.push(item.path)"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-5">
              <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-sm" :style="{ background: item.bgColor }">
                <span class="text-lg">{{ item.icon }}</span>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="tag-devotional">{{ item.type }}</span>
                  <span class="text-xs text-text-muted">{{ item.deity }}</span>
                </div>
                <h3 class="text-lg font-serif text-charcoal">{{ item.title }}</h3>
                <p class="text-text-secondary text-sm mt-0.5">{{ item.language }}</p>
              </div>
            </div>
            <svg class="w-5 h-5 text-gold flex-shrink-0 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Daily Wisdom -->
    <section class="bg-charcoal text-white">
      <div class="max-w-reading mx-auto px-6 md:px-8 py-16 text-center">
        <p class="section-label text-gold-light mb-4">{{ t('home.dailyWisdom.label') }}</p>
        <p class="text-3xl md:text-4xl text-white mb-4 leading-relaxed" style="font-family:'Noto Serif Devanagari',serif;">
          सर्वे भवन्तु सुखिनः
        </p>
        <div class="hero-ornament mb-4" style="background:linear-gradient(90deg,transparent,#C48A3A,transparent);"></div>
        <p class="text-gray-300 text-lg italic mb-2">Sarve bhavantu sukhinaḥ</p>
        <p class="text-gray-400 text-sm">{{ t('footer.verseMeaning') }}</p>
        <p class="text-gold text-xs uppercase tracking-widest mt-4">— Brihadaranyaka Upanishad</p>
      </div>
    </section>
  </div>
</template>

<script>
import { deities } from '../content/deities.js';
import { langMixin } from '../utils/langMixin.js';

const deityColors = {
  ganesha: '#E8821A', shiva: '#5B8DB8', krishna: '#4A7C9E',
  durga: '#C0392B', lakshmi: '#C48A3A', hanuman: '#E8821A',
  saraswati: '#7B68EE', vishnu: '#2E86AB',
};

export default {
  name: 'HomePage',
  mixins: [langMixin],
  data() {
    return {
      loading: true,
      deities: deities.map(d => ({
        ...d,
        accentColor: deityColors[d.id] || '#C48A3A',
        contentTypes: ['Aarti', 'Stotra', 'Mantra']
      })),
      categoryKeys: [
        { key: 'stotras',   icon: '📜', path: '/stotras' },
        { key: 'aartis',    icon: '🪔', path: '/aartis' },
        { key: 'mantras',   icon: '🔔', path: '/mantras' },
        { key: 'bhajans',   icon: '🎵', path: '/bhajans' },
        { key: 'pujaVidhi', icon: '🌸', path: '/puja-vidhi' },
        { key: 'festivals', icon: '📅', path: '/festivals' },
      ],
      recentItems: [
        { id: 1, title: 'Ganpati Atharvashirsha',  type: 'Stotra', deity: 'Ganesha', language: 'Sanskrit', icon: '📜', bgColor: '#FDF0E0', path: '/content/ganpati-atharvashirsha' },
        { id: 2, title: 'Mahamrityunjaya Mantra',  type: 'Mantra', deity: 'Shiva',   language: 'Sanskrit', icon: '🔔', bgColor: '#EEF4FB', path: '/content/mahamrityunjaya-mantra' },
        { id: 3, title: 'Jai Ambe Gauri',          type: 'Aarti',  deity: 'Durga',   language: 'Hindi',    icon: '🪔', bgColor: '#FDECEA', path: '/content/jai-ambe-gauri' },
        { id: 4, title: 'Hare Krishna Mahamantra', type: 'Bhajan', deity: 'Krishna', language: 'Sanskrit', icon: '🎵', bgColor: '#EEF4FB', path: '/content/hare-krishna-bhajan' },
      ]
    };
  },
  mounted() {
    setTimeout(() => { this.loading = false; }, 500);
  },
  methods: {
    scrollToDeities() {
      document.getElementById('deities')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.text-gold-gradient {
  background: linear-gradient(135deg, #C48A3A, #E8B96A);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.section-label {
  font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: #C48A3A; display: block;
}
.hero-ornament { width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #C48A3A, transparent); margin: 0 auto; }
.bg-parchment { background: #F5EFE4; }
.bg-saffron-soft { background: #FDF0E0; }
.hero-sub   { opacity:0; animation: heroReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards; }
.hero-title { opacity:0; animation: heroReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s forwards; }
.hero-desc  { opacity:0; animation: heroReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards; }
.hero-cta   { opacity:0; animation: heroReveal 0.6s cubic-bezier(0.22,1,0.36,1) 0.6s forwards; }
.hero-stats { opacity:0; animation: heroReveal 0.6s cubic-bezier(0.22,1,0.36,1) 0.8s forwards; }
</style>
