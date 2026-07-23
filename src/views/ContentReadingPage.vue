<template>
  <div v-if="loading" class="max-w-reading mx-auto px-8 py-16">
    <div class="skeleton h-3 w-16 mb-8"></div>
    <div class="skeleton h-8 w-2/3 mb-4"></div>
    <div class="skeleton h-4 w-1/3 mb-6"></div>
    <div class="skeleton h-3 w-full mb-2"></div>
    <div class="skeleton h-3 w-5/6 mb-2"></div>
    <div class="skeleton h-3 w-4/6 mb-12"></div>
    <div v-for="n in 3" :key="n" class="mb-12">
      <div class="skeleton h-4 w-20 mb-6"></div>
      <div class="skeleton h-8 w-full mb-3"></div>
      <div class="skeleton h-8 w-5/6"></div>
    </div>
  </div>

  <div v-else-if="content" :class="readingMode ? 'reading-mode' : 'max-w-reading mx-auto px-8 py-16'">

    <!-- Normal mode header -->
    <div v-if="!readingMode" class="mb-12">
      <button @click="$router.back()" class="text-text-secondary hover:text-charcoal text-sm transition-colors mb-8 block">
        ← Back
      </button>

      <span class="text-xs uppercase tracking-widest text-gold block mb-3">{{ content.category || content.deity }}</span>
      <h1 class="text-4xl md:text-5xl font-serif text-charcoal mb-4 leading-tight">{{ content.title }}</h1>

      <div class="flex flex-wrap gap-2 mb-6">
        <span class="tag-minimal">{{ content.deity }}</span>
        <span class="tag-minimal">{{ content.language }}</span>
        <span v-for="tag in (content.tags || [])" :key="tag" class="tag-minimal">{{ tag }}</span>
      </div>

      <p v-if="content.description" class="text-text-secondary leading-relaxed mb-8 max-w-2xl">
        {{ content.description }}
      </p>

      <div class="border-t border-border-subtle pt-6 flex items-center justify-between">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="script in scripts"
            :key="script.value"
            @click="activeScript = script.value"
            :class="[
              'px-4 py-2 text-sm transition-all duration-200',
              activeScript === script.value
                ? 'border-b-2 border-gold text-charcoal font-medium'
                : 'text-text-secondary hover:text-charcoal'
            ]"
          >{{ script.label }}</button>
        </div>
        <button
          @click="readingMode = true"
          class="text-xs uppercase tracking-widest text-text-secondary hover:text-charcoal transition-colors"
        >
          Reading Mode
        </button>
      </div>
    </div>

    <!-- Reading mode header -->
    <div v-if="readingMode" class="text-center mb-16">
      <h1 class="text-3xl font-serif text-charcoal mb-4">{{ content.title }}</h1>
      <p class="text-text-secondary text-sm mb-8">{{ content.deity }} · {{ content.language }}</p>
      <div class="flex justify-center gap-4 mb-6">
        <button
          v-for="script in scripts"
          :key="script.value"
          @click="activeScript = script.value"
          :class="[
            'px-4 py-2 text-sm transition-all duration-200',
            activeScript === script.value
              ? 'border-b-2 border-gold text-charcoal'
              : 'text-text-secondary hover:text-charcoal'
          ]"
        >{{ script.label }}</button>
      </div>
      <button
        @click="readingMode = false"
        class="text-xs text-text-secondary hover:text-charcoal transition-colors"
      >
        Exit Reading Mode
      </button>
    </div>

    <!-- Verses -->
    <div class="space-y-16">
      <div
        v-for="(verse, i) in content.verses"
        :key="verse.number"
        class="pb-12 border-b border-border-subtle last:border-0 stagger-item"
        :style="{ animationDelay: `${i * 80}ms` }"
      >
        <div class="text-text-secondary text-xs uppercase tracking-widest mb-8">
          {{ verse.number > 0 ? `Verse ${verse.number}` : '' }}
        </div>

        <div v-if="activeScript === 'devanagari'" class="sanskrit text-center leading-loose">
          {{ verse.sanskrit }}
        </div>
        <div v-else-if="activeScript === 'roman'" class="text-charcoal text-lg leading-loose text-center italic">
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

  <div v-else class="max-w-reading mx-auto px-8 py-32 text-center">
    <p class="text-text-secondary">Content not found.</p>
    <button @click="$router.back()" class="btn-minimal mt-6">← Go Back</button>
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
        { label: 'Roman', value: 'roman' },
        { label: 'Hindi', value: 'hindi' },
        { label: 'English', value: 'english' }
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
