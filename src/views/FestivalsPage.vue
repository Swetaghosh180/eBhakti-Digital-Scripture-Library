<template>
  <div class="max-w-reading mx-auto px-8 py-16">
    <div class="mb-16">
      <h1 class="text-4xl font-serif text-charcoal mb-4">Festivals</h1>
      <p class="text-text-secondary">Festival guides and auspicious dates</p>
    </div>

    <div class="grid md:grid-cols-3 gap-1">
      <div 
        v-for="category in categories" 
        :key="category.name"
        class="editorial-card p-10 text-center cursor-pointer"
        @click="$router.push(category.path)"
      >
        <h3 class="text-lg font-serif text-charcoal mb-2">{{ category.name }}</h3>
        <p class="text-text-secondary text-sm">{{ category.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FestivalsPage',
  data() {
    return {
      categories: [
        {
          name: 'Puja Dates',
          description: 'Important puja and worship dates',
          path: '/festivals/puja-dates'
        },
        {
          name: 'Ekadashi Dates',
          description: 'Ekadashi fasting dates',
          path: '/festivals/ekadashi-dates'
        },
        {
          name: 'Auspicious Dates',
          description: 'Muhurat and auspicious timings',
          path: '/festivals/auspicious-dates'
        }
      ]
    }
  }
}
</script>
