<template>
  <div>
    <div class="bg-parchment border-b border-border-subtle">
      <div class="max-w-reading mx-auto px-6 md:px-8 py-14">
        <p class="section-label mb-3">{{ t('pujaVidhi.label') }}</p>
        <h1 class="text-4xl md:text-5xl font-serif text-charcoal mb-4">{{ t('pujaVidhi.title') }}</h1>
        <p class="text-text-secondary text-lg max-w-xl">{{ t('pujaVidhi.subtitle') }}</p>
      </div>
    </div>

    <div class="max-w-reading mx-auto px-6 md:px-8 py-10">
      <div class="relative mb-10">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="searchQuery" :placeholder="t('pujaVidhi.searchPlaceholder')" class="w-full pl-11 pr-4 py-3.5 border border-border-subtle focus:outline-none focus:border-gold transition-colors text-charcoal bg-white text-sm">
      </div>

      <!-- Puja cards grid -->
      <template v-if="loading">
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="n in 4" :key="n" class="bg-white border border-border-subtle p-6">
            <div class="skeleton h-3 w-24 mb-4"></div>
            <div class="skeleton h-6 w-3/4 mb-3"></div>
            <div class="skeleton h-3 w-full mb-2"></div>
            <div class="skeleton h-3 w-5/6 mb-6"></div>
            <div class="flex gap-3">
              <div class="skeleton h-8 w-20"></div>
              <div class="skeleton h-8 w-20"></div>
            </div>
          </div>
        </div>
      </template>

      <div v-else class="grid sm:grid-cols-2 gap-4">
        <div
          v-for="(puja, i) in filteredPujas"
          :key="puja.id"
          class="devotional-card p-6 cursor-pointer group stagger-item"
          :style="{ animationDelay: `${i * 80}ms` }"
          @click="$router.push(`/puja-vidhi/${puja.id}`)"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-sm text-2xl" style="background: #FDF5EC;">🌸</div>
            <div class="flex-1">
              <p class="section-label mb-1">{{ puja.festival }}</p>
              <h3 class="text-xl font-serif text-charcoal group-hover:text-gold transition-colors duration-200 leading-tight">
                {{ puja.title }}
              </h3>
              <p class="text-text-secondary text-sm mt-1">{{ puja.deity }}</p>
            </div>
          </div>

          <p class="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-2">{{ puja.significance }}</p>

          <!-- Stats row -->
          <div class="flex items-center gap-4 pt-4 border-t border-border-subtle">
            <div class="flex items-center gap-1.5 text-xs text-text-muted">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {{ puja.steps?.length || 0 }} {{ t('pujaVidhi.steps') }}
            </div>
            <div class="flex items-center gap-1.5 text-xs text-text-muted">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {{ puja.samagri?.length || 0 }} {{ t('pujaVidhi.items') }}
            </div>
            <div class="ml-auto flex items-center gap-1 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {{ t('pujaVidhi.viewGuide') }}
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5 mt-4">
            <span v-for="tag in puja.tags" :key="tag" class="tag-devotional">{{ tag }}</span>
          </div>
        </div>
      </div>

      <div v-if="!loading && !filteredPujas.length" class="py-16 text-center">
        <p class="text-4xl mb-4">🌸</p>
        <p class="text-text-secondary">{{ t('pujaVidhi.notFound') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { pujaVidhis } from '../content/pujaVidhi.js';
import { langMixin } from '../utils/langMixin.js';
export default {
  name: 'PujaVidhiPage',
  mixins: [langMixin],
  data() { return { searchQuery: '', pujaVidhis, loading: true }; },
  mounted() { setTimeout(() => { this.loading = false; }, 500); },
  computed: {
    filteredPujas() {
      const q = this.searchQuery.toLowerCase();
      return this.pujaVidhis.filter(p =>
        p.title.toLowerCase().includes(q) || p.deity.toLowerCase().includes(q) || p.festival.toLowerCase().includes(q)
      );
    }
  }
};
</script>

<style scoped>
.section-label { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #C48A3A; display: block; }
.bg-parchment { background: #F5EFE4; }
</style>
