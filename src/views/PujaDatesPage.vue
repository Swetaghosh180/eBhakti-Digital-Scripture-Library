<template>
  <div class="max-w-reading mx-auto px-8 py-16">
    <button @click="$router.back()" class="text-text-secondary hover:text-charcoal mb-12 text-sm transition-colors">
      ← Back to Festivals
    </button>

    <div class="mb-16">
      <p class="text-xs uppercase tracking-widest text-gold mb-3">2026 Calendar</p>
      <h1 class="text-4xl font-serif text-charcoal mb-4">Puja & Festival Dates</h1>
      <p class="text-text-secondary">Key Hindu festivals and puja dates across 2026, organised by season. Dates verified from Drik Panchang.</p>
    </div>

    <div class="mb-12">
      <input
        v-model="searchQuery"
        placeholder="Search festivals..."
        class="w-full px-5 py-4 border border-border-subtle focus:outline-none focus:border-gold transition-colors text-charcoal bg-white"
      >
    </div>

    <div v-if="!searchQuery">
      <div v-for="season in seasons" :key="season.label" class="mb-16">
        <h2 class="text-xl font-serif text-charcoal mb-8 pb-4 border-b border-border-subtle">
          {{ season.label }}
        </h2>
        <div>
          <div
            v-for="(date, index) in season.dates"
            :key="date.id"
            class="py-6"
            :class="{ 'border-t border-border-subtle': index > 0 }"
          >
            <div class="flex items-start justify-between gap-6">
              <div class="flex-1">
                <h3 class="text-lg font-serif text-charcoal mb-1">{{ date.name }}</h3>
                <p class="text-text-secondary text-sm mb-1">{{ date.region }}</p>
                <p class="text-text-secondary text-sm leading-relaxed">{{ date.description }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <span class="tag-minimal block mb-1">{{ date.date }}</span>
                <span class="text-text-muted text-xs">{{ date.day }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div
        v-for="(date, index) in filteredDates"
        :key="date.id"
        class="py-6"
        :class="{ 'border-t border-border-subtle': index > 0 }"
      >
        <div class="flex items-start justify-between gap-6">
          <div class="flex-1">
            <h3 class="text-lg font-serif text-charcoal mb-1">{{ date.name }}</h3>
            <p class="text-text-secondary text-sm mb-1">{{ date.region }}</p>
            <p class="text-text-secondary text-sm leading-relaxed">{{ date.description }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="tag-minimal block mb-1">{{ date.date }}</span>
            <span class="text-text-muted text-xs">{{ date.day }}</span>
          </div>
        </div>
      </div>
      <p v-if="!filteredDates.length" class="text-text-secondary py-12 text-center">No festivals found.</p>
    </div>

    <p class="text-text-muted text-xs mt-16 leading-relaxed border-t border-border-subtle pt-8">
      Dates sourced from Drik Panchang. Regional observances may vary by one day based on local Moon sighting times.
    </p>
  </div>
</template>

<script>
export default {
  name: 'PujaDatesPage',
  data() {
    return {
      searchQuery: '',
      seasons: [
        {
          label: 'Winter — January & February 2026',
          dates: [
            { id: 1,  name: 'Makar Sankranti / Pongal / Magh Bihu', date: 'Jan 14, 2026', day: 'Wednesday', region: 'Pan-India',        description: 'Harvest festival marking the sun\'s entry into Capricorn. Celebrated as Pongal in Tamil Nadu and Bihu in Assam.' },
            { id: 2,  name: 'Vasant Panchami (Saraswati Puja)',      date: 'Jan 23, 2026', day: 'Friday',    region: 'Pan-India',        description: 'Worship of Goddess Saraswati on the fifth day of spring. Highly prominent in West Bengal, Bihar, and Uttar Pradesh.' },
            { id: 3,  name: 'Maha Shivaratri',                       date: 'Feb 15, 2026', day: 'Sunday',    region: 'Pan-India',        description: 'The great night of Lord Shiva. Devotees fast, perform abhishek, and observe an all-night vigil with chanting.' }
          ]
        },
        {
          label: 'Spring & New Year — March & April 2026',
          dates: [
            { id: 4,  name: 'Holika Dahan',                          date: 'Mar 3, 2026',  day: 'Tuesday',   region: 'Pan-India',        description: 'Bonfire night symbolising the victory of devotion over evil. Performed the evening before Holi.' },
            { id: 5,  name: 'Holi',                                  date: 'Mar 4, 2026',  day: 'Wednesday', region: 'Pan-India',        description: 'Festival of colours celebrating the arrival of spring and the triumph of good over evil.' },
            { id: 6,  name: 'Chaitra Navratri / Gudi Padwa / Ugadi',date: 'Mar 19, 2026', day: 'Thursday',  region: 'Pan-India',        description: 'Hindu New Year in Maharashtra (Gudi Padwa) and South India (Ugadi). Chaitra Navratri begins — nine days of Goddess Durga worship.' },
            { id: 7,  name: 'Rama Navami',                           date: 'Mar 26, 2026', day: 'Thursday',  region: 'Pan-India',        description: 'Birthday of Lord Rama. Culmination of Chaitra Navratri with Ramayana recitation and temple processions.' },
            { id: 8,  name: 'Hanuman Jayanti',                       date: 'Apr 2, 2026',  day: 'Thursday',  region: 'Pan-India',        description: 'Birthday of Lord Hanuman. Devotees recite Hanuman Chalisa and visit temples for special pujas.' },
            { id: 9,  name: 'Akshaya Tritiya',                       date: 'May 10, 2026', day: 'Sunday',    region: 'Pan-India',        description: 'One of the most auspicious days of the year for new ventures, investments, and buying gold.' }
          ]
        },
        {
          label: 'Monsoon — July & August 2026',
          dates: [
            { id: 10, name: 'Raksha Bandhan',                        date: 'Aug 28, 2026', day: 'Friday',    region: 'North, West & Central India', description: 'Sisters tie a sacred thread (rakhi) on their brothers\' wrists as a symbol of love and protection.' }
          ]
        },
        {
          label: 'Autumn Mega-Festivals — September to November 2026',
          dates: [
            { id: 11, name: 'Krishna Janmashtami',                   date: 'Sep 4, 2026',  day: 'Friday',    region: 'Pan-India',        description: 'Birthday of Lord Krishna. Grand midnight celebrations, Dahi Handi in Maharashtra, and temple festivities across India.' },
            { id: 12, name: 'Ganesh Chaturthi',                      date: 'Sep 15, 2026', day: 'Tuesday',   region: 'West & Central India', description: 'Ten-day festival celebrating the birth of Lord Ganesha. Centred in Maharashtra, Goa, and Karnataka.' },
            { id: 13, name: 'Shardiya Navratri Begins',              date: 'Sep 22, 2026', day: 'Tuesday',   region: 'Pan-India',        description: 'Nine-day mega festival with Garba in Gujarat, Ramlila in North India, and Durga Puja in East India.' },
            { id: 14, name: 'Dussehra / Vijayadashami',             date: 'Sep 30, 2026', day: 'Wednesday', region: 'Pan-India',        description: 'Victory of good over evil. Effigy burning in North India, Shami puja in West, Vidyarambham in South India.' },
            { id: 15, name: 'Karwa Chauth',                          date: 'Oct 2, 2026',  day: 'Friday',    region: 'North & West India', description: 'Strict fast by married women from sunrise until moonrise for their husband\'s long life.' },
            { id: 16, name: 'Dhanteras',                             date: 'Oct 20, 2026', day: 'Tuesday',   region: 'Pan-India',        description: 'Beginning of Diwali festivities. Auspicious day to buy metal, gold, and worship Lord Dhanvantari.' },
            { id: 17, name: 'Diwali / Lakshmi Puja',                date: 'Oct 22, 2026', day: 'Thursday',  region: 'Pan-India',        description: 'Festival of lights. Goddess Lakshmi worshipped at night with diyas, fireworks, and family gatherings.' },
            { id: 18, name: 'Govardhan Puja',                        date: 'Oct 23, 2026', day: 'Friday',    region: 'North & West India', description: 'Worship of Lord Krishna\'s lifting of Govardhan Hill. Temples offer mountains of food (Annakut) to the deity.' },
            { id: 19, name: 'Bhai Dooj',                             date: 'Oct 24, 2026', day: 'Saturday',  region: 'Pan-India',        description: 'Celebration of the brother-sister bond. Sisters apply tilak on their brothers\' foreheads and pray for their well-being.' },
            { id: 20, name: 'Chhath Puja',                           date: 'Nov 11, 2026', day: 'Sunday',    region: 'East & North India', description: 'The biggest sun-worship festival across Bihar, Jharkhand, and Uttar Pradesh. Devotees offer arghya to the rising and setting sun.' },
            { id: 21, name: 'Kartik Purnima / Dev Deepawali',       date: 'Nov 15, 2026', day: 'Sunday',    region: 'North India',      description: 'Grand festival of lights in Varanasi. Thousands of diyas lit on the ghats of the Ganga in honour of the gods.' }
          ]
        }
      ]
    };
  },
  computed: {
    allDates() {
      return this.seasons.flatMap(s => s.dates);
    },
    filteredDates() {
      const q = this.searchQuery.toLowerCase();
      return this.allDates.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }
  }
};
</script>
