<template>
  <section class="mb-16">
    <div class="flex items-center gap-4 mb-8">
      <h2 class="text-2xl font-serif text-charcoal">{{ title }}</h2>
      <div class="flex-1 h-px bg-border-subtle"></div>
      <span class="text-xs text-text-muted">{{ items.length }} items</span>
    </div>

    <div class="bg-white border border-border-subtle overflow-hidden">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="content-row px-6 py-5 group"
        :class="{ 'border-t border-border-subtle': index > 0 }"
        @click="$emit('item-click', item, type)"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4 flex-1 min-w-0">
            <!-- Type icon -->
            <div class="w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-sm text-sm" :style="iconStyle">
              {{ typeIcon }}
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-serif text-charcoal group-hover:text-gold transition-colors duration-200 truncate">
                {{ item.title }}
              </h3>
              <p class="text-text-secondary text-xs mt-0.5">{{ item.language }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 flex-shrink-0">
            <div class="hidden sm:flex flex-wrap gap-1">
              <span
                v-for="tag in (item.tags || []).slice(0, 2)"
                :key="tag"
                class="tag-devotional"
              >{{ tag }}</span>
            </div>
            <svg class="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <!-- Description on hover -->
        <p v-if="item.description" class="text-text-secondary text-sm mt-2 ml-13 leading-relaxed line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style="margin-left: 3.25rem;">
          {{ item.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
const typeConfig = {
  aarti:       { icon: '🪔', bg: '#FDF5EC', color: '#E8821A' },
  stotra:      { icon: '📜', bg: '#FDF0E0', color: '#C48A3A' },
  mantra:      { icon: '🔔', bg: '#EEF4FB', color: '#5B8DB8' },
  bhajan:      { icon: '🎵', bg: '#F0EEFF', color: '#7B68EE' },
  'puja-vidhi':{ icon: '🌸', bg: '#FDF5EC', color: '#E8821A' },
};

export default {
  name: 'ContentSection',
  props: {
    title:       { type: String, required: true },
    items:       { type: Array,  required: true },
    type:        { type: String, required: true },
    accentColor: { type: String, default: '#C48A3A' }
  },
  emits: ['item-click'],
  computed: {
    typeIcon() { return typeConfig[this.type]?.icon || '📄'; },
    iconStyle() {
      const cfg = typeConfig[this.type] || { bg: '#FDF0E0', color: '#C48A3A' };
      return { background: cfg.bg, color: cfg.color };
    }
  }
};
</script>
