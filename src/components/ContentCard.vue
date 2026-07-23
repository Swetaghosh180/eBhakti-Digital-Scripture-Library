<template>
  <div class="py-8 cursor-pointer transition-colors hover:bg-white" @click="$emit('click')">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <h3 class="text-xl font-serif text-charcoal mb-2">{{ title }}</h3>
        <p v-if="description" class="text-text-secondary text-sm leading-relaxed mb-3">{{ description }}</p>
        <div v-if="metadata" class="text-sm text-text-secondary">{{ metadata }}</div>
      </div>
      <span v-if="tag" class="tag-minimal ml-4">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentCard',
  props: {
    title: String,
    description: String,
    tag: String,
    metadata: String
  },
  emits: ['click']
}
</script>
