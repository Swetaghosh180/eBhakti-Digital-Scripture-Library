<template>
  <div v-if="loading" class="max-w-reading mx-auto px-8 py-16">
    <div class="skeleton h-3 w-16 mb-10"></div>
    <div class="skeleton h-3 w-20 mb-4"></div>
    <div class="skeleton h-10 w-2/3 mb-6"></div>
    <div class="skeleton h-3 w-full mb-2"></div>
    <div class="skeleton h-3 w-4/5 mb-16"></div>
    <div v-for="n in 4" :key="n" class="flex gap-6 mb-8">
      <div class="skeleton w-10 h-10 flex-shrink-0"></div>
      <div class="flex-1">
        <div class="skeleton h-4 w-1/3 mb-3"></div>
        <div class="skeleton h-3 w-full mb-2"></div>
        <div class="skeleton h-3 w-5/6"></div>
      </div>
    </div>
  </div>

  <div v-else-if="puja" class="max-w-reading mx-auto px-8 py-16">
    <button @click="$router.back()" class="text-text-secondary hover:text-charcoal text-sm transition-colors mb-10 block">
      ← Back to Puja Vidhi
    </button>

    <!-- Header -->
    <div class="border-b border-border-subtle pb-12 mb-16">
      <span class="text-xs uppercase tracking-widest text-gold block mb-3">{{ puja.festival }}</span>
      <h1 class="text-4xl md:text-5xl font-serif text-charcoal mb-4 leading-tight">{{ puja.title }}</h1>
      <div class="flex flex-wrap gap-2 mb-8">
        <span class="tag-minimal">{{ puja.deity }}</span>
        <span v-for="tag in puja.tags" :key="tag" class="tag-minimal">{{ tag }}</span>
      </div>
      <p class="text-text-secondary leading-relaxed max-w-2xl text-lg">{{ puja.significance }}</p>
    </div>

    <!-- Samagri -->
    <section class="mb-16">
      <h2 class="text-2xl font-serif text-charcoal mb-8">Puja Samagri</h2>
      <p class="text-text-secondary text-sm mb-6">Items required to perform this puja</p>
      <div class="grid md:grid-cols-2 gap-x-12 gap-y-3">
        <div
          v-for="(item, index) in puja.samagri"
          :key="index"
          class="flex items-start gap-3 py-2 border-b border-border-subtle"
        >
          <span class="text-gold text-xs mt-1 flex-shrink-0">◆</span>
          <span class="text-charcoal text-sm">{{ item }}</span>
        </div>
      </div>
    </section>

    <!-- Steps -->
    <section class="mb-16">
      <h2 class="text-2xl font-serif text-charcoal mb-8">Step-by-Step Procedure</h2>
      <div class="space-y-8">
        <div
          v-for="(step, i) in puja.steps"
          :key="step.number"
          class="flex gap-6 stagger-item"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <div class="flex-shrink-0">
            <div class="w-10 h-10 border border-gold text-gold text-sm font-serif flex items-center justify-center">
              {{ step.number }}
            </div>
          </div>
          <div class="flex-1 pb-8 border-b border-border-subtle">
            <h3 class="text-lg font-serif text-charcoal mb-3">{{ step.title }}</h3>
            <p class="text-text-secondary leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Do's and Don'ts -->
    <section class="mb-16">
      <div class="grid md:grid-cols-2 gap-12">
        <div>
          <h2 class="text-2xl font-serif text-charcoal mb-8">Do's</h2>
          <div class="space-y-3">
            <div
              v-for="(item, index) in puja.dos"
              :key="index"
              class="flex items-start gap-3 py-3 border-b border-border-subtle"
            >
              <span class="text-gold text-xs mt-1 flex-shrink-0">✓</span>
              <span class="text-charcoal text-sm leading-relaxed">{{ item }}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-serif text-charcoal mb-8">Don'ts</h2>
          <div class="space-y-3">
            <div
              v-for="(item, index) in puja.donts"
              :key="index"
              class="flex items-start gap-3 py-3 border-b border-border-subtle"
            >
              <span class="text-text-secondary text-xs mt-1 flex-shrink-0">✕</span>
              <span class="text-charcoal text-sm leading-relaxed">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Mantras -->
    <section v-if="puja.relatedMantras && puja.relatedMantras.length">
      <h2 class="text-2xl font-serif text-charcoal mb-8">Related Mantras</h2>
      <div class="space-y-1">
        <div
          v-for="(mantraId, index) in puja.relatedMantras"
          :key="mantraId"
          class="py-5 cursor-pointer hover:bg-white transition-colors duration-150 px-4 -mx-4 group"
          :class="{ 'border-t border-border-subtle': index > 0 }"
          @click="$router.push(`/content/${mantraId}`)"
        >
          <div class="flex items-center justify-between">
            <span class="font-serif text-charcoal group-hover:text-gold transition-colors duration-200">
              {{ formatMantraId(mantraId) }}
            </span>
            <span class="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="max-w-reading mx-auto px-8 py-32 text-center">
    <p class="text-text-secondary">Puja guide not found.</p>
    <button @click="$router.back()" class="btn-minimal mt-6">← Go Back</button>
  </div>
</template>

<script>
import { getPujaVidhiById } from '../content/index.js';

export default {
  name: 'PujaVidhiReadingPage',
  data() {
    return { puja: null, loading: true };
  },
  methods: {
    formatMantraId(id) {
      return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  },
  created() {
    setTimeout(() => {
      this.puja = getPujaVidhiById(this.$route.params.id);
      this.loading = false;
    }, 400);
  },
  watch: {
    '$route.params.id'(id) {
      this.loading = true;
      setTimeout(() => {
        this.puja = getPujaVidhiById(id);
        this.loading = false;
      }, 400);
    }
  }
};
</script>
