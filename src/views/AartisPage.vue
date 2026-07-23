<template>
  <div class="max-w-reading mx-auto px-8 py-16">
    <div class="mb-16">
      <p class="text-xs uppercase tracking-widest text-gold mb-3">Devotional Prayers</p>
      <h1 class="text-4xl font-serif text-charcoal mb-4">Aartis</h1>
      <p class="text-text-secondary">Traditional lamp offerings and devotional songs.</p>
    </div>

    <div class="flex flex-col md:flex-row gap-4 mb-12">
      <input
        v-model="searchQuery"
        placeholder="Search aartis..."
        class="flex-1 px-5 py-4 border border-border-subtle focus:outline-none focus:border-gold transition-colors text-charcoal bg-white"
      >
      <select
        v-model="selectedDeity"
        class="px-5 py-4 border border-border-subtle focus:outline-none focus:border-gold transition-colors text-text-secondary bg-white"
      >
        <option value="">All Deities</option>
        <option v-for="d in deityOptions" :key="d" :value="d">{{ d }}</option>
      </select>
    </div>

    <div>
      <template v-if="loading">
        <div v-for="n in 4" :key="n" class="py-8 border-t border-border-subtle first:border-0">
          <div class="skeleton h-5 w-1/2 mb-3"></div>
          <div class="skeleton h-3 w-1/4 mb-3"></div>
          <div class="skeleton h-3 w-3/4"></div>
        </div>
      </template>
      <div
        v-else
        v-for="(aarti, index) in filtered"
        :key="aarti.id"
        class="py-8 cursor-pointer hover:bg-white transition-colors duration-150 px-4 -mx-4 group stagger-item"
        :class="{ 'border-t border-border-subtle': index > 0 }"
        :style="{ animationDelay: `${index * 60}ms` }"
        @click="$router.push(`/content/${aarti.id}`)"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-xl font-serif text-charcoal mb-2 group-hover:text-gold transition-colors duration-200">
              {{ aarti.title }}
            </h3>
            <p class="text-text-secondary text-sm mb-3">{{ aarti.deity }} · {{ aarti.language }}</p>
            <p class="text-text-secondary text-sm leading-relaxed">{{ aarti.description }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span v-for="tag in (aarti.tags || []).slice(0,3)" :key="tag" class="tag-minimal">{{ tag }}</span>
            </div>
          </div>
          <span class="text-gold text-lg flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
        </div>
      </div>
      <p v-if="!filtered.length" class="text-text-secondary py-12 text-center">No aartis found.</p>
    </div>
  </div>
</template>

<script>
import { aartis } from '../content/aartis.js';

export default {
  name: 'AartisPage',
  data() {
    return { searchQuery: '', selectedDeity: '', aartis, loading: true };
  },
  mounted() { setTimeout(() => { this.loading = false; }, 500); },
  computed: {
    deityOptions() {
      return [...new Set(this.aartis.map(a => a.deity))];
    },
    filtered() {
      return this.aartis.filter(a => {
        const q = this.searchQuery.toLowerCase();
        const matchSearch = a.title.toLowerCase().includes(q) || (a.description || '').toLowerCase().includes(q);
        const matchDeity = !this.selectedDeity || a.deity === this.selectedDeity;
        return matchSearch && matchDeity;
      });
    }
  }
};
</script>
