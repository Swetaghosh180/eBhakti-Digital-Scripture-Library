<template>
  <div class="max-w-reading mx-auto px-8 py-16">
    <button @click="$router.back()" class="text-text-secondary hover:text-charcoal mb-12 text-sm">
      ← Back to Festivals
    </button>

    <div class="mb-16">
      <h1 class="text-4xl font-serif text-charcoal mb-4">Ekadashi Dates</h1>
      <p class="text-text-secondary">Ekadashi fasting dates for spiritual purification</p>
    </div>

    <div class="space-y-1">
      <div 
        v-for="(date, index) in dates" 
        :key="date.id"
        class="py-8"
        :class="{ 'border-t border-border-subtle': index > 0 }"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-serif text-charcoal mb-2">{{ date.name }}</h3>
            <p class="text-text-secondary text-sm leading-relaxed">{{ date.description }}</p>
          </div>
          <span class="tag-minimal ml-4">{{ date.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EkadashiDatesPage',
  data() {
    return {
      dates: [
        {
          id: 1,
          name: 'Pausha Putrada Ekadashi',
          date: 'Jan 6, 2026',
          description: 'Ekadashi for progeny and blessings'
        },
        {
          id: 2,
          name: 'Shattila Ekadashi',
          date: 'Jan 21, 2026',
          description: 'Ekadashi for removing sins'
        }
      ]
    }
  }
}
</script>
