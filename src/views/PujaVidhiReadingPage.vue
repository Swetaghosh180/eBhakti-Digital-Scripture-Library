<template>
  <!-- Loading -->
  <div v-if="loading" class="max-w-reading mx-auto px-6 md:px-8 py-16">
    <div class="skeleton h-3 w-16 mb-10"></div>
    <div class="skeleton h-3 w-20 mb-4"></div>
    <div class="skeleton h-10 w-2/3 mb-6"></div>
    <div class="skeleton h-3 w-full mb-2"></div>
    <div class="skeleton h-3 w-4/5 mb-16"></div>
    <div v-for="n in 4" :key="n" class="flex gap-6 mb-8">
      <div class="skeleton w-11 h-11 flex-shrink-0"></div>
      <div class="flex-1">
        <div class="skeleton h-4 w-1/3 mb-3"></div>
        <div class="skeleton h-3 w-full mb-2"></div>
        <div class="skeleton h-3 w-5/6"></div>
      </div>
    </div>
  </div>

  <!-- Content -->
  <div v-else-if="puja">
    <!-- Hero Header -->
    <div class="bg-parchment border-b border-border-subtle">
      <div class="max-w-reading mx-auto px-6 md:px-8 py-14">
        <button @click="$router.back()" class="flex items-center gap-2 text-sm text-text-secondary hover:text-charcoal transition-colors mb-8 group">
          <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Puja Vidhi
        </button>

        <div class="flex items-start gap-5">
          <div class="w-16 h-16 flex items-center justify-center flex-shrink-0 rounded-sm text-3xl" style="background: #FDF5EC;">🌸</div>
          <div>
            <p class="section-label mb-2">{{ puja.festival }}</p>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal mb-3 leading-tight">{{ puja.title }}</h1>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="tag-devotional">{{ puja.deity }}</span>
              <span v-for="tag in puja.tags" :key="tag" class="tag-devotional">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-reading mx-auto px-6 md:px-8 py-12">
      <!-- Significance -->
      <div class="bg-white border border-border-subtle p-8 mb-12">
        <div class="flex items-start gap-4">
          <div class="w-1 self-stretch bg-gold rounded-full flex-shrink-0"></div>
          <p class="text-text-secondary leading-relaxed text-lg">{{ puja.significance }}</p>
        </div>
      </div>

      <!-- Quick stats -->
      <div class="grid grid-cols-3 gap-4 mb-12">
        <div class="bg-white border border-border-subtle p-5 text-center">
          <p class="text-2xl font-serif text-gold mb-1">{{ puja.steps?.length || 0 }}</p>
          <p class="text-xs text-text-muted uppercase tracking-widest">Steps</p>
        </div>
        <div class="bg-white border border-border-subtle p-5 text-center">
          <p class="text-2xl font-serif text-gold mb-1">{{ puja.samagri?.length || 0 }}</p>
          <p class="text-xs text-text-muted uppercase tracking-widest">Samagri Items</p>
        </div>
        <div class="bg-white border border-border-subtle p-5 text-center">
          <p class="text-2xl font-serif text-gold mb-1">{{ (puja.dos?.length || 0) + (puja.donts?.length || 0) }}</p>
          <p class="text-xs text-text-muted uppercase tracking-widest">Guidelines</p>
        </div>
      </div>

      <!-- Samagri -->
      <section class="mb-14">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-2xl font-serif text-charcoal">Puja Samagri</h2>
          <div class="flex-1 h-px bg-border-subtle"></div>
          <span class="text-xs text-text-muted">Items required</span>
        </div>
        <div class="bg-white border border-border-subtle overflow-hidden">
          <div class="grid sm:grid-cols-2">
            <div
              v-for="(item, index) in puja.samagri"
              :key="index"
              class="flex items-center gap-3 px-5 py-3.5 border-b border-border-subtle"
              :class="{ 'sm:border-r': index % 2 === 0 }"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>
              <span class="text-charcoal text-sm">{{ item }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Steps -->
      <section class="mb-14">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-2xl font-serif text-charcoal">Step-by-Step Procedure</h2>
          <div class="flex-1 h-px bg-border-subtle"></div>
        </div>
        <div class="space-y-4">
          <div
            v-for="(step, i) in puja.steps"
            :key="step.number"
            class="bg-white border border-border-subtle overflow-hidden stagger-item"
            :style="{ animationDelay: `${i * 60}ms` }"
          >
            <div class="flex items-stretch">
              <div class="step-number flex-shrink-0 self-stretch flex items-center justify-center w-14" style="background: linear-gradient(135deg, #C48A3A, #E8B96A); color: white; font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 600;">
                {{ step.number }}
              </div>
              <div class="flex-1 p-5">
                <h3 class="text-base font-serif text-charcoal mb-2">{{ step.title }}</h3>
                <p class="text-text-secondary text-sm leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Do's and Don'ts -->
      <section class="mb-14">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-sm flex items-center justify-center text-sm" style="background: #E8F5E9; color: #2E7D32;">✓</div>
              <h2 class="text-xl font-serif text-charcoal">Do's</h2>
            </div>
            <div class="bg-white border border-border-subtle overflow-hidden">
              <div
                v-for="(item, index) in puja.dos"
                :key="index"
                class="flex items-start gap-3 px-5 py-3.5 border-b border-border-subtle last:border-0"
              >
                <span class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs" style="background: #E8F5E9; color: #2E7D32; font-weight: 700;">✓</span>
                <span class="text-charcoal text-sm leading-relaxed">{{ item }}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-sm flex items-center justify-center text-sm" style="background: #FDECEA; color: #C62828;">✕</div>
              <h2 class="text-xl font-serif text-charcoal">Don'ts</h2>
            </div>
            <div class="bg-white border border-border-subtle overflow-hidden">
              <div
                v-for="(item, index) in puja.donts"
                :key="index"
                class="flex items-start gap-3 px-5 py-3.5 border-b border-border-subtle last:border-0"
              >
                <span class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs" style="background: #FDECEA; color: #C62828; font-weight: 700;">✕</span>
                <span class="text-charcoal text-sm leading-relaxed">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Mantras -->
      <section v-if="puja.relatedMantras?.length">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-2xl font-serif text-charcoal">Related Mantras</h2>
          <div class="flex-1 h-px bg-border-subtle"></div>
        </div>
        <div class="bg-white border border-border-subtle overflow-hidden">
          <div
            v-for="(mantraId, index) in puja.relatedMantras"
            :key="mantraId"
            class="content-row px-6 py-5 group"
            :class="{ 'border-t border-border-subtle': index > 0 }"
            @click="$router.push(`/content/${mantraId}`)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-lg">🔔</span>
                <span class="font-serif text-charcoal group-hover:text-gold transition-colors duration-200">{{ formatMantraId(mantraId) }}</span>
              </div>
              <svg class="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="max-w-reading mx-auto px-8 py-32 text-center">
    <p class="text-5xl mb-6">🌸</p>
    <p class="text-text-secondary text-lg mb-6">Puja guide not found.</p>
    <button @click="$router.back()" class="btn-primary">← Go Back</button>
  </div>
</template>

<script>
import { getPujaVidhiById } from '../content/index.js';
export default {
  name: 'PujaVidhiReadingPage',
  data() { return { puja: null, loading: true }; },
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
      setTimeout(() => { this.puja = getPujaVidhiById(id); this.loading = false; }, 400);
    }
  }
};
</script>

<style scoped>
.section-label { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #C48A3A; display: block; }
.bg-parchment { background: #F5EFE4; }
</style>
