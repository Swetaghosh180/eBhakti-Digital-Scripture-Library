<template>
  <div class="flex flex-wrap gap-2 mb-6">
    <button 
      v-for="script in scripts" 
      :key="script.value"
      @click="$emit('change', script.value)"
      :class="[
        'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
        activeScript === script.value 
          ? 'bg-primary text-white' 
          : 'bg-white border border-border-light text-text-secondary hover:border-primary'
      ]"
    >
      {{ script.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ScriptToggle',
  props: {
    activeScript: {
      type: String,
      default: 'devanagari'
    },
    scripts: {
      type: Array,
      default: () => [
        { label: 'Devanagari', value: 'devanagari' },
        { label: 'Roman', value: 'roman' },
        { label: 'Hindi Meaning', value: 'hindi' },
        { label: 'English Meaning', value: 'english' }
      ]
    }
  },
  emits: ['change']
}
</script>
