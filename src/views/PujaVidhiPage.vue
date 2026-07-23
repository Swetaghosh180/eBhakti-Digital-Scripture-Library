<template>
  <div class="max-w-reading mx-auto px-8 py-16">
    <div class="mb-16">
      <p class="text-xs uppercase tracking-widest text-gold mb-3">Ritual Guides</p>
      <h1 class="text-4xl font-serif text-charcoal mb-4">Puja Vidhi</h1>
      <p class="text-text-secondary">Complete step-by-step guides for performing sacred rituals.</p>
    </div>

    <div class="mb-10">
      <input
        v-model="searchQuery"
        placeholder="Search puja guides..."
        class="w-full px-5 py-4 border border-border-subtle focus:outline-none focus:border-gold transition-colors text-charcoal bg-white"
      >
    </div>

    <div>
      <template v-if="loading">
        <div v-for="n in 3" :key="n" class="py-8 border-t border-border-subtle first:border-0">
          <div class="skeleton h-3 w-24 mb-3"></div>
          <div class="skeleton h-5 w-1/2 mb-3"></div>
          <div class="skeleton h-3 w-3/4"></div>
        </div>
      </template>
      <div
        v-else
        v-for="(puja, index) in filteredPujas"
        :key="puja.id"
        class="py-8 cursor-pointer hover:bg-white transition-colors duration-150 px-4 -mx-4 group stagger-item"
        :class="{ 'border-t border-border-subtle': index > 0 }"
        :style="{ animationDelay: `${index * 60}ms` }"
        @click="$router.push(`/puja-vidhi/${puja.id}`)"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <span class="text-xs uppercase tracking-widest text-gold mb-2 block">{{ puja.festival }}</span>
            <h3 class="text-xl font-serif text-charcoal mb-2 group-hover:text-gold transition-colors duration-200">
              {{ puja.title }}
            </h3>
            <p class="text-text-secondary text-sm mb-3">{{ puja.deity }}</p>
            <p class="text-text-secondary text-sm leading-relaxed line-clamp-2">{{ puja.significance }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span v-for="tag in puja.tags" :key="tag" class="tag-minimal">{{ tag }}</span>
            </div>
          </div>
          <span class="text-gold text-lg flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pujaVidhis } from '../content/pujaVidhi.js';

export default {
  name: 'PujaVidhiPage',
  data() {
    return {
      searchQuery: '',
      pujaVidhis,
      loading: true
    };
  },
  mounted() { setTimeout(() => { this.loading = false; }, 500); },
  computed: {
    filteredPujas() {
      const q = this.searchQuery.toLowerCase();
      return this.pujaVidhis.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.deity.toLowerCase().includes(q) ||
        p.festival.toLowerCase().includes(q)
      );
    }
  }
};
</script>
