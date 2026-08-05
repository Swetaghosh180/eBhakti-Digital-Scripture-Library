<template>
  <!-- Loading -->
  <div v-if="loading" class="max-w-prose mx-auto px-6 md:px-8 py-16">
    <div class="skeleton h-3 w-16 mb-8"></div>
    <div class="skeleton h-10 w-2/3 mb-4"></div>
    <div class="skeleton h-4 w-1/3 mb-8"></div>
    <div class="flex gap-2 mb-12">
      <div class="skeleton h-6 w-16"></div>
      <div class="skeleton h-6 w-16"></div>
    </div>
    <div v-for="n in 3" :key="n" class="mb-12">
      <div class="skeleton h-3 w-20 mb-6"></div>
      <div class="skeleton h-8 w-full mb-3"></div>
      <div class="skeleton h-8 w-5/6"></div>
    </div>
  </div>

  <!-- Content -->
  <div v-else-if="content">
    <!-- Reading Mode -->
    <div v-if="readingMode" class="reading-mode">
      <div class="text-center mb-12">
        <button @click="readingMode = false" class="text-xs text-text-muted hover:text-charcoal transition-colors uppercase tracking-widest mb-10 block mx-auto">
          ← Exit Reading Mode
        </button>
        <p class="section-label mb-3">{{ content.deity }}</p>
        <h1 class="text-3xl md:text-4xl font-serif text-charcoal mb-4">{{ content.title }}</h1>
        <div class="hero-ornament mb-6"></div>
        <div class="flex justify-center gap-1 flex-wrap">
          <button
            v-for="script in scripts"
            :key="script.value"
            @click="activeScript = script.value"
            class="px-4 py-2 text-sm transition-all duration-200 rounded-sm"
            :class="activeScript === script.value ? 'bg-saffron-soft text-gold font-medium' : 'text-text-secondary hover:text-charcoal'"
          >{{ script.label }}</button>
        </div>
      </div>

      <div class="space-y-12">
        <div v-for="(verse, i) in content.verses" :key="verse.number" class="stagger-item" :style="{ animationDelay: `${i * 60}ms` }">
          <p v-if="verse.number > 0" class="text-xs text-text-muted uppercase tracking-widest mb-4 text-center">Verse {{ verse.number }}</p>
          <div class="verse-block">
            <div v-if="activeScript === 'devanagari'" class="sanskrit text-center">{{ verse.sanskrit }}</div>
            <div v-else-if="activeScript === 'roman'" class="text-charcoal text-lg leading-loose text-center italic">{{ verse.transliteration }}</div>
            <div v-else-if="activeScript === 'hindi'" class="text-charcoal leading-loose text-lg">{{ verse.hindi }}</div>
            <div v-else-if="activeScript === 'english'" class="text-charcoal leading-loose text-lg">{{ verse.english }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Normal Mode -->
    <div v-else class="max-w-reading mx-auto px-6 md:px-8 py-12">
      <!-- Back -->
      <button @click="$router.back()" class="flex items-center gap-2 text-sm text-text-secondary hover:text-charcoal transition-colors mb-10 group">
        <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <!-- Header card -->
      <div class="bg-white border border-border-subtle p-8 md:p-10 mb-10">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div class="flex-1">
            <p class="section-label mb-3">{{ content.category || content.deity }}</p>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-serif text-charcoal mb-4 leading-tight">{{ content.title }}</h1>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="tag-devotional">{{ content.deity }}</span>
              <span class="tag-devotional">{{ content.language }}</span>
              <span v-for="tag in (content.tags || [])" :key="tag" class="tag-devotional">{{ tag }}</span>
            </div>
            <p v-if="content.description" class="text-text-secondary leading-relaxed max-w-2xl">{{ content.description }}</p>
          </div>
        </div>

        <!-- Script selector + Reading mode toggle -->
        <div class="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex flex-wrap gap-1">
            <button
              v-for="script in scripts"
              :key="script.value"
              @click="activeScript = script.value"
              class="px-4 py-2 text-sm transition-all duration-200 rounded-sm"
              :class="activeScript === script.value
                ? 'bg-saffron-soft text-gold font-medium border border-gold border-opacity-30'
                : 'text-text-secondary hover:text-charcoal hover:bg-ivory'"
            >{{ script.label }}</button>
          </div>
          <button
            @click="readingMode = true"
            class="flex items-center gap-2 text-xs uppercase tracking-widest text-text-secondary hover:text-gold transition-colors"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Reading Mode
          </button>
        </div>
      </div>

      <!-- Verses -->
      <div class="space-y-6">
        <div
          v-for="(verse, i) in content.verses"
          :key="verse.number"
          class="bg-white border border-border-subtle overflow-hidden stagger-item"
          :style="{ animationDelay: `${i * 70}ms` }"
        >
          <!-- Verse header -->
          <div v-if="verse.number > 0" class="px-6 py-3 bg-ivory border-b border-border-subtle flex items-center justify-between">
            <span class="text-xs text-text-muted uppercase tracking-widest">Verse {{ verse.number }}</span>
            <div class="w-8 h-px bg-gold opacity-40"></div>
          </div>

          <!-- Verse content -->
          <div class="p-6 md:p-8">
            <div v-if="activeScript === 'devanagari'" class="sanskrit text-center leading-loose">
              {{ verse.sanskrit }}
            </div>
            <div v-else-if="activeScript === 'roman'" class="text-charcoal text-lg leading-loose text-center italic font-serif">
              {{ verse.transliteration }}
            </div>
            <div v-else-if="activeScript === 'hindi'" class="text-charcoal leading-loose text-lg">
              {{ verse.hindi }}
            </div>
            <div v-else-if="activeScript === 'english'" class="text-charcoal leading-loose text-lg">
              {{ verse.english }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Not found -->
  <div v-else class="max-w-reading mx-auto px-8 py-32 text-center">
    <p class="text-5xl mb-6">🙏</p>
    <p class="text-text-secondary text-lg mb-6">Content not found.</p>
    <button @click="$router.back()" class="btn-primary">← Go Back</button>
  </div>
</template>

<script>
import { getContentById } from '../content/index.js';

export default {
  name: 'ContentReadingPage',
  data() {
    return {
      content: null,
      loading: true,
      readingMode: false,
      activeScript: 'devanagari',
      scripts: [
        { label: 'Sanskrit', value: 'devanagari' },
        { label: 'Roman',    value: 'roman' },
        { label: 'Hindi',    value: 'hindi' },
        { label: 'English',  value: 'english' }
      ]
    };
  },
  created() {
    setTimeout(() => {
      this.content = getContentById(this.$route.params.id);
      this.loading = false;
    }, 400);
  },
  watch: {
    '$route.params.id'(id) {
      this.loading = true;
      setTimeout(() => {
        this.content = getContentById(id);
        this.loading = false;
        this.readingMode = false;
        this.activeScript = 'devanagari';
      }, 400);
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
.hero-ornament {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #C48A3A, transparent);
  margin: 0 auto;
}
.bg-saffron-soft { background: #FDF0E0; }
.bg-ivory { background: #FAF7F2; }
</style>
