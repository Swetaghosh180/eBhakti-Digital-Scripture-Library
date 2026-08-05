<template>
  <div>
    <div class="bg-parchment border-b border-border-subtle">
      <div class="max-w-reading mx-auto px-6 md:px-8 py-14">
        <p class="section-label mb-3">{{ t('festivals.label') }}</p>
        <h1 class="text-4xl md:text-5xl font-serif text-charcoal mb-4">{{ t('festivals.title') }}</h1>
        <p class="text-text-secondary text-lg max-w-xl leading-relaxed">{{ t('festivals.subtitle') }}</p>
      </div>
    </div>

    <div class="max-w-reading mx-auto px-6 md:px-8 py-12">
      <!-- Category cards -->
      <div class="grid md:grid-cols-3 gap-4 mb-16">
        <div
          v-for="(cat, i) in categoryKeys"
          :key="cat.key"
          class="devotional-card p-8 cursor-pointer group stagger-item"
          :style="{ animationDelay: `${i * 80}ms` }"
          @click="$router.push(cat.path)"
        >
          <div class="text-3xl mb-5">{{ cat.icon }}</div>
          <p class="section-label mb-2">{{ t(`festivals.categories.${cat.key}.label`) }}</p>
          <h3 class="text-xl font-serif text-charcoal mb-3 group-hover:text-gold transition-colors duration-200">
            {{ t(`festivals.categories.${cat.key}.name`) }}
          </h3>
          <p class="text-text-secondary text-sm leading-relaxed mb-5">{{ t(`festivals.categories.${cat.key}.description`) }}</p>
          <div class="flex items-center gap-1 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {{ t('home.explore') }}
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Upcoming highlights -->
      <div>
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-2xl font-serif text-charcoal">{{ t('festivals.upcoming') }}</h2>
          <div class="flex-1 h-px bg-border-subtle"></div>
          <span class="text-xs text-text-muted uppercase tracking-widest">{{ t('festivals.year') }}</span>
        </div>

        <div class="bg-white border border-border-subtle overflow-hidden">
          <div
            v-for="(item, index) in highlights"
            :key="item.name"
            class="flex items-center justify-between gap-4 px-6 py-5"
            :class="{ 'border-t border-border-subtle': index > 0 }"
          >
            <div class="flex items-center gap-4">
              <div class="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-sm text-lg" :style="{ background: item.bg }">
                {{ item.icon }}
              </div>
              <div>
                <h3 class="text-base font-serif text-charcoal">{{ item.name }}</h3>
                <p class="text-text-secondary text-xs mt-0.5">{{ item.region }}</p>
              </div>
            </div>
            <span class="tag-devotional flex-shrink-0">{{ item.date }}</span>
          </div>
        </div>
      </div>

      <!-- Note -->
      <div class="mt-10 p-5 bg-white border border-border-subtle flex items-start gap-3">
        <svg class="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-text-secondary text-sm leading-relaxed">{{ t('festivals.note') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { langMixin } from '../utils/langMixin.js';
export default {
  name: 'FestivalsPage',
  mixins: [langMixin],
  data() {
    return {
      categoryKeys: [
        { key: 'pujaDates',       icon: '🪔', path: '/festivals/puja-dates' },
        { key: 'ekadashiDates',   icon: '🌙', path: '/festivals/ekadashi-dates' },
        { key: 'auspiciousDates', icon: '⭐', path: '/festivals/auspicious-dates' },
      ],
      highlights: [
        { name: 'Maha Shivaratri',       date: 'Feb 15, 2026', region: 'Pan-India',            icon: '🔱', bg: '#EEF4FB' },
        { name: 'Holi',                  date: 'Mar 4, 2026',  region: 'Pan-India',            icon: '🎨', bg: '#FDF5EC' },
        { name: 'Rama Navami',           date: 'Mar 26, 2026', region: 'Pan-India',            icon: '🏹', bg: '#FDF0E0' },
        { name: 'Akshaya Tritiya',       date: 'May 10, 2026', region: 'Pan-India',            icon: '✨', bg: '#FDF0E0' },
        { name: 'Krishna Janmashtami',   date: 'Sep 4, 2026',  region: 'Pan-India',            icon: '🪈', bg: '#EEF4FB' },
        { name: 'Ganesh Chaturthi',      date: 'Sep 15, 2026', region: 'West & Central India', icon: '🐘', bg: '#FDF5EC' },
        { name: 'Sharad Navratri',       date: 'Sep 22, 2026', region: 'Pan-India',            icon: '🌺', bg: '#FDECEA' },
        { name: 'Dussehra',              date: 'Sep 30, 2026', region: 'Pan-India',            icon: '🏹', bg: '#FDF0E0' },
        { name: 'Diwali & Lakshmi Puja', date: 'Oct 22, 2026', region: 'Pan-India',            icon: '🪔', bg: '#FDF5EC' },
        { name: 'Kartik Purnima',        date: 'Nov 15, 2026', region: 'Pan-India',            icon: '🌕', bg: '#FDF0E0' },
      ]
    };
  }
};
</script>

<style scoped>
.section-label { font-size:0.6875rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#C48A3A; display:block; }
.bg-parchment { background:#F5EFE4; }
</style>
