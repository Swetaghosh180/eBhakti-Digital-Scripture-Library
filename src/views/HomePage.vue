<template>
  <div>
    <!-- Hero -->
    <section class="bg-ivory border-b border-border-subtle">
      <div class="max-w-reading mx-auto px-8 py-24 text-center">
        <p class="text-xs uppercase tracking-widest text-gold mb-6 hero-sub">A Sacred Digital Library</p>
        <h1 class="text-5xl md:text-6xl font-serif text-charcoal mb-6 leading-tight hero-title">
          Sacred Texts.<br>Thoughtfully Preserved.
        </h1>
        <p class="text-lg text-text-secondary max-w-lg mx-auto mb-10 hero-desc">
          A refined, ad-free sanctuary for devotional reading — organised by deity, free from distraction.
        </p>
        <div class="hero-cta">
          <button @click="scrollToDeities" class="btn-minimal">Explore Deities ↓</button>
        </div>
      </div>
    </section>

    <!-- Deity Grid -->
    <section id="deities" class="max-w-reading mx-auto px-8 py-20">
      <div class="flex items-baseline justify-between mb-12">
        <h2 class="text-3xl font-serif text-charcoal">Choose a Deity</h2>
        <p class="text-sm text-text-secondary">Select to explore all related content</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <!-- Skeleton while loading -->
        <template v-if="loading">
          <div v-for="n in 8" :key="n" class="bg-white border border-border-subtle p-6">
            <div class="skeleton h-4 w-3/4 mx-auto mb-3"></div>
            <div class="skeleton h-3 w-1/2 mx-auto mb-4"></div>
            <div class="flex gap-1 justify-center">
              <div class="skeleton h-4 w-10"></div>
              <div class="skeleton h-4 w-10"></div>
            </div>
          </div>
        </template>
        <div
          v-else
          v-for="(deity, i) in deities"
          :key="deity.id"
          class="deity-card group cursor-pointer stagger-item"
          :style="{ animationDelay: `${i * 60}ms` }"
          @click="$router.push(`/deity/${deity.id}`)"
        >
          <div class="deity-card-inner">
            <h3 class="text-lg font-serif text-charcoal mb-1 group-hover:text-gold transition-colors duration-200">
              {{ deity.name }}
            </h3>
            <p class="text-xs text-text-secondary font-sans mb-3">{{ deity.epithet }}</p>
            <div class="flex flex-wrap gap-1 justify-center">
              <span
                v-for="type in deity.contentTypes"
                :key="type"
                class="text-xs text-text-muted border border-border-subtle px-2 py-0.5"
              >{{ type }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Browse by Type -->
    <section class="border-t border-border-subtle bg-white">
      <div class="max-w-reading mx-auto px-8 py-20">
        <h2 class="text-3xl font-serif text-charcoal mb-12">Browse by Type</h2>
        <div class="grid md:grid-cols-3 gap-1">
          <div
            v-for="(cat, i) in categories"
            :key="cat.name"
            class="editorial-card p-8 cursor-pointer group stagger-item"
            :style="{ animationDelay: `${i * 80}ms` }"
            @click="$router.push(cat.path)"
          >
            <p class="text-xs uppercase tracking-widest text-gold mb-3">{{ cat.label }}</p>
            <h3 class="text-xl font-serif text-charcoal mb-2 group-hover:text-gold transition-colors duration-200">
              {{ cat.name }}
            </h3>
            <p class="text-text-secondary text-sm">{{ cat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Additions -->
    <section class="max-w-reading mx-auto px-8 py-20">
      <h2 class="text-3xl font-serif text-charcoal mb-12">Recent Additions</h2>
      <div>
        <div
          v-for="(item, index) in recentItems"
          :key="item.id"
          class="py-7 cursor-pointer hover:bg-white transition-colors duration-150 px-4 -mx-4"
          :class="{ 'border-t border-border-subtle': index > 0 }"
          @click="$router.push(item.path)"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="text-xs uppercase tracking-widest text-gold mb-2 block">{{ item.type }}</span>
              <h3 class="text-xl font-serif text-charcoal mb-2">{{ item.title }}</h3>
              <p class="text-text-secondary text-sm">{{ item.deity }} · {{ item.language }}</p>
            </div>
            <span class="text-gold text-lg mt-1 flex-shrink-0">→</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { deities } from '../content/deities.js';

export default {
  name: 'HomePage',
  data() {
    return {
      loading: true,
      deities: deities.map(d => ({
        ...d,
        contentTypes: ['Aarti', 'Stotra', 'Mantra', 'Bhajan'].filter((_, i) => i < 3)
      })),
      categories: [
        { label: 'Hymns', name: 'Stotras', description: 'Sacred Sanskrit hymns and prayers', path: '/stotras' },
        { label: 'Prayers', name: 'Aartis', description: 'Devotional lamp offerings and songs', path: '/aartis' },
        { label: 'Chants', name: 'Mantras', description: 'Sacred syllables and seed mantras', path: '/mantras' },
        { label: 'Songs', name: 'Bhajans', description: 'Devotional songs of love and surrender', path: '/bhajans' },
        { label: 'Rituals', name: 'Puja Vidhi', description: 'Step-by-step ritual guides', path: '/puja-vidhi' },
        { label: 'Calendar', name: 'Festivals', description: 'Auspicious dates and observances', path: '/festivals' }
      ],
      recentItems: [
        { id: 1, title: 'Ganpati Atharvashirsha', type: 'Stotra', deity: 'Ganesha', language: 'Sanskrit', path: '/content/ganpati-atharvashirsha' },
        { id: 2, title: 'Mahamrityunjaya Mantra', type: 'Mantra', deity: 'Shiva', language: 'Sanskrit', path: '/content/mahamrityunjaya-mantra' },
        { id: 3, title: 'Jai Ambe Gauri', type: 'Aarti', deity: 'Durga', language: 'Hindi', path: '/content/jai-ambe-gauri' },
        { id: 4, title: 'Hare Krishna Mahamantra', type: 'Bhajan', deity: 'Krishna', language: 'Sanskrit', path: '/content/hare-krishna-bhajan' }
      ]
    };
  },
  mounted() {
    setTimeout(() => { this.loading = false; }, 600);
  },
  methods: {
    scrollToDeities() {
      document.getElementById('deities')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.deity-card {
  @apply bg-white border border-border-subtle;
  transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease;
}
.deity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 36px rgba(0,0,0,0.09);
}
.deity-card-inner {
  @apply p-6 text-center flex flex-col items-center;
}

/* Hero staggered entrance */
.hero-sub  { opacity:0; animation: heroReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards; }
.hero-title{ opacity:0; animation: heroReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s forwards; }
.hero-desc { opacity:0; animation: heroReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards; }
.hero-cta  { opacity:0; animation: heroReveal 0.6s cubic-bezier(0.22,1,0.36,1) 0.65s forwards; }
</style>
