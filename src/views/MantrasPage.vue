<template>
  <div>
    <div class="bg-parchment border-b border-border-subtle">
      <div class="max-w-reading mx-auto px-6 md:px-8 py-14">
        <p class="section-label mb-3">{{ t('mantras.label') }}</p>
        <h1 class="text-4xl md:text-5xl font-serif text-charcoal mb-4">{{ t('mantras.title') }}</h1>
        <p class="text-text-secondary text-lg max-w-xl">{{ t('mantras.subtitle') }}</p>
      </div>
    </div>

    <div class="max-w-reading mx-auto px-6 md:px-8 py-10">
      <div class="flex flex-col sm:flex-row gap-3 mb-10">
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input v-model="searchQuery" :placeholder="t('mantras.searchPlaceholder')" class="w-full pl-11 pr-4 py-3.5 border border-border-subtle focus:outline-none focus:border-gold transition-colors text-charcoal bg-white text-sm">
        </div>
        <select v-model="selectedDeity" class="px-4 py-3.5 border border-border-subtle focus:outline-none focus:border-gold transition-colors text-text-secondary bg-white text-sm min-w-40">
          <option value="">{{ t('mantras.allDeities') }}</option>
          <option v-for="d in deityOptions" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>

      <p v-if="!loading" class="text-xs text-text-muted uppercase tracking-widest mb-6">
        {{ filtered.length }} {{ filtered.length === 1 ? t('mantras.foundOne') : t('mantras.found') }}
      </p>

      <div class="bg-white border border-border-subtle overflow-hidden">
        <template v-if="loading">
          <div v-for="n in 4" :key="n" class="px-6 py-6 border-b border-border-subtle last:border-0">
            <div class="flex gap-4">
              <div class="skeleton w-10 h-10 flex-shrink-0"></div>
              <div class="flex-1">
                <div class="skeleton h-5 w-1/2 mb-3"></div>
                <div class="skeleton h-3 w-1/4 mb-3"></div>
                <div class="skeleton h-3 w-3/4"></div>
              </div>
            </div>
          </div>
        </template>

        <div
          v-else
          v-for="(mantra, index) in filtered"
          :key="mantra.id"
          class="content-row px-6 py-6 group stagger-item"
          :class="{ 'border-t border-border-subtle': index > 0 }"
          :style="{ animationDelay: `${index * 50}ms` }"
          @click="$router.push(`/content/${mantra.id}`)"
        >
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-sm text-lg" style="background:#EEF4FB;">🔔</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-lg font-serif text-charcoal mb-1 group-hover:text-gold transition-colors duration-200">{{ mantra.title }}</h3>
                  <p class="text-text-secondary text-sm mb-2">{{ mantra.deity }} · {{ mantra.language }}</p>
                  <p class="text-text-secondary text-sm leading-relaxed line-clamp-2">{{ mantra.description }}</p>
                  <div class="flex flex-wrap gap-1.5 mt-3">
                    <span v-for="tag in (mantra.tags || []).slice(0,3)" :key="tag" class="tag-devotional">{{ tag }}</span>
                  </div>
                </div>
                <svg class="w-5 h-5 text-gold flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!loading && !filtered.length" class="px-6 py-16 text-center">
          <p class="text-4xl mb-4">🔔</p>
          <p class="text-text-secondary">{{ t('mantras.notFound') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mantras } from '../content/mantras.js';
import { langMixin } from '../utils/langMixin.js';
export default {
  name: 'MantrasPage',
  mixins: [langMixin],
  data() { return { searchQuery: '', selectedDeity: '', mantras, loading: true }; },
  mounted() { setTimeout(() => { this.loading = false; }, 500); },
  computed: {
    deityOptions() { return [...new Set(this.mantras.map(m => m.deity))]; },
    filtered() {
      return this.mantras.filter(m => {
        const q = this.searchQuery.toLowerCase();
        return (m.title.toLowerCase().includes(q) || (m.description || '').toLowerCase().includes(q))
          && (!this.selectedDeity || m.deity === this.selectedDeity);
      });
    }
  }
};
</script>

<style scoped>
.section-label { font-size:0.6875rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#C48A3A; display:block; }
.bg-parchment { background:#F5EFE4; }
</style>
