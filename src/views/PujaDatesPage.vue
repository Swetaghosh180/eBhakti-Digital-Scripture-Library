<template>
  <div class="max-w-reading mx-auto px-8 py-16">
    <button @click="$router.back()" class="text-text-secondary hover:text-charcoal mb-12 text-sm">
      ← Back to Festivals
    </button>

    <div class="mb-16">
      <h1 class="text-4xl font-serif text-charcoal mb-4">Puja Dates</h1>
      <p class="text-text-secondary">Important puja and worship dates for 2026</p>
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
  name: 'PujaDatesPage',
  data() {
    return {
      dates: [
        {
          id: 1,
          name: 'Ganesh Chaturthi',
          date: 'Sep 7, 2026',
          description: 'Birthday celebration of Lord Ganesha'
        },
        {
          id: 2,
          name: 'Navratri',
          date: 'Oct 3-12, 2026',
          description: 'Nine nights of Goddess Durga worship'
        }
      ]
    }
  }
}
</script>
