<template>
  <div class="space-y-1">
    <div 
      v-for="(item, index) in items" 
      :key="item.id"
      class="py-8 cursor-pointer transition-colors hover:bg-white"
      :class="{ 'border-t border-border-subtle': index > 0 }"
      @click="$emit('item-click', item)"
    >
      <slot :item="item">
        <h3 class="text-xl font-serif text-charcoal mb-2">{{ item.title }}</h3>
        <p class="text-text-secondary text-sm leading-relaxed">{{ item.description }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentList',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  emits: ['item-click']
}
</script>
