<template>
  <section class="mb-16">
    <h2 class="text-2xl font-serif text-charcoal mb-8 pb-4 border-b border-border-subtle">{{ title }}</h2>
    <div class="space-y-1">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="py-6 cursor-pointer hover:bg-white transition-colors duration-150 px-4 -mx-4 group"
        :class="{ 'border-t border-border-subtle': index > 0 }"
        @click="$emit('item-click', item, type)"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-serif text-charcoal mb-1 group-hover:text-gold transition-colors duration-200">
              {{ item.title }}
            </h3>
            <p class="text-text-secondary text-sm mb-2">{{ item.language }}</p>
            <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="tag in (item.tags || []).slice(0, 3)"
                :key="tag"
                class="tag-minimal"
              >{{ tag }}</span>
            </div>
          </div>
          <span class="text-gold text-lg flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContentSection',
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
    type: { type: String, required: true }
  },
  emits: ['item-click']
};
</script>
