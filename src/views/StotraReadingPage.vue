<template>
  <div :class="readingMode ? 'reading-mode' : 'max-w-reading mx-auto px-8 py-16'">
    <div v-if="!readingMode" class="mb-12">
      <button @click="$router.back()" class="text-text-secondary hover:text-charcoal mb-6 text-sm">
        ← Back to Stotras
      </button>
      <span class="text-xs uppercase tracking-widest text-text-secondary block mb-3">{{ stotra.category }}</span>
      <h1 class="text-4xl md:text-5xl font-serif text-charcoal mb-6 leading-tight">{{ stotra.title }}</h1>
      <div class="flex flex-wrap gap-2 mb-8">
        <span class="tag-minimal">{{ stotra.deity }}</span>
        <span class="tag-minimal">{{ stotra.language }}</span>
        <span v-for="tag in stotra.tags" :key="tag" class="tag-minimal">{{ tag }}</span>
      </div>
      <div class="divider-subtle mb-8"></div>
      <button @click="readingMode = true" class="text-sm text-text-secondary hover:text-charcoal transition-colors">
        Enter Reading Mode
      </button>
    </div>

    <div v-if="readingMode" class="text-center mb-12">
      <button @click="readingMode = false" class="text-text-secondary hover:text-charcoal text-sm transition-opacity duration-200">
        Exit Reading Mode
      </button>
    </div>

    <div class="flex flex-wrap gap-3 mb-12">
      <button 
        v-for="script in scripts" 
        :key="script.value"
        @click="activeScript = script.value"
        :class="[
          'px-5 py-2 text-sm transition-all duration-200',
          activeScript === script.value 
            ? 'border-b-2 border-gold text-charcoal' 
            : 'text-text-secondary hover:text-charcoal'
        ]"
      >
        {{ script.label }}
      </button>
    </div>

    <div class="space-y-16">
      <div v-for="verse in stotra.verses" :key="verse.number" class="pb-12 border-b border-border-subtle last:border-0">
        <div class="text-text-secondary text-xs uppercase tracking-wider mb-6">Verse {{ verse.number }}</div>
        
        <div v-if="activeScript === 'devanagari'" class="sanskrit text-center mb-6">
          {{ verse.sanskrit }}
        </div>
        
        <div v-if="activeScript === 'roman'" class="text-charcoal text-lg leading-loose text-center mb-6">
          {{ verse.transliteration }}
        </div>
        
        <div v-if="activeScript === 'hindi'" class="text-charcoal leading-loose">
          {{ verse.hindi }}
        </div>
        
        <div v-if="activeScript === 'english'" class="text-charcoal leading-loose">
          {{ verse.english }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { stotras } from '../content/stotras.js';

export default {
  name: 'StotraReadingPage',
  data() {
    return {
      readingMode: false,
      activeScript: 'devanagari',
      stotra: null,
      scripts: [
        { label: 'Sanskrit', value: 'devanagari' },
        { label: 'Roman', value: 'roman' },
        { label: 'Hindi Meaning', value: 'hindi' },
        { label: 'English Meaning', value: 'english' }
      ]
    }
  },
  created() {
    const id = this.$route.params.id;
    this.stotra = stotras.find(s => s.id === id) || stotras[0];
  }
}
</script>
