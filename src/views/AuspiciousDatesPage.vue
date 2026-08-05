<template>
  <div class="max-w-reading mx-auto px-8 py-16">
    <button @click="$router.back()" class="text-text-secondary hover:text-charcoal mb-12 text-sm transition-colors">
      ← Back to Festivals
    </button>

    <div class="mb-16">
      <p class="text-xs uppercase tracking-widest text-gold mb-3">Muhurat Calendar</p>
      <h1 class="text-4xl font-serif text-charcoal mb-4">Auspicious Dates 2026</h1>
      <p class="text-text-secondary max-w-xl">
        Favorable days for ceremonies, new ventures, and life events — sourced from Astroyogi Panchang and Drik Panchang.
      </p>
    </div>

    <!-- Section tabs -->
    <div class="flex flex-wrap gap-2 mb-16">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'px-5 py-2 text-sm transition-all duration-200',
          activeTab === tab.key
            ? 'bg-charcoal text-white'
            : 'border border-border-subtle text-text-secondary hover:border-charcoal hover:text-charcoal'
        ]"
      >{{ tab.label }}</button>
    </div>

    <!-- Griha Pravesh -->
    <div v-if="activeTab === 'griha'">
      <div class="mb-12">
        <h2 class="text-2xl font-serif text-charcoal mb-4">Griha Pravesh Muhurat 2026</h2>
        <p class="text-text-secondary leading-relaxed max-w-2xl mb-6">
          Auspicious dates for house warming and new home entry ceremonies, sourced from Astroyogi Panchang.
        </p>
        <div class="editorial-card p-6 mb-10">
          <p class="text-xs uppercase tracking-widest text-gold mb-3">Chaturmas Notice</p>
          <p class="text-text-secondary text-sm leading-relaxed">
            From <span class="text-charcoal font-medium">July 25 to November 20, 2026</span>, Lord Vishnu is in cosmic sleep (Yoga Nidra).
            Major home-moving rituals are traditionally avoided during this Chaturmas period.
            Ceremonies resume after Devutthana Ekadashi on November 20.
          </p>
        </div>
      </div>

      <div v-for="(month, mIndex) in grihaMonths" :key="month.name" class="mb-10">
        <h3 class="text-lg font-serif text-charcoal mb-4 pb-3 border-b border-border-subtle">
          {{ month.name }}
          <span v-if="month.note" class="text-xs text-gold font-sans font-normal ml-3">{{ month.note }}</span>
        </h3>
        <div v-if="month.dates.length" class="flex flex-wrap gap-2">
          <span v-for="date in month.dates" :key="date" class="tag-minimal">{{ date }}</span>
        </div>
        <p v-else class="text-text-muted text-sm italic">No dates — Chaturmas restrictions apply.</p>
      </div>
    </div>

    <!-- Annaprashan -->
    <div v-if="activeTab === 'annaprashan'">
      <div class="mb-12">
        <h2 class="text-2xl font-serif text-charcoal mb-4">Annaprashan Muhurat 2026</h2>
        <p class="text-text-secondary leading-relaxed max-w-2xl mb-6">
          Auspicious dates for a baby's first rice-eating ceremony, verified on AstroSage.
        </p>
        <div class="editorial-card p-6 mb-10">
          <p class="text-xs uppercase tracking-widest text-gold mb-3">Scheduling by Gender</p>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="border-l-2 border-gold pl-4">
              <p class="font-serif text-charcoal mb-1">Baby Boys</p>
              <p class="text-text-secondary text-sm">Performed in even months of life — 6th, 8th, 10th, or 12th month.</p>
            </div>
            <div class="border-l-2 border-gold pl-4">
              <p class="font-serif text-charcoal mb-1">Baby Girls</p>
              <p class="text-text-secondary text-sm">Performed in odd months of life — 5th, 7th, 9th, or 11th month.</p>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(month, mIndex) in annaprashanMonths" :key="month.name" class="mb-10">
        <h3 class="text-lg font-serif text-charcoal mb-4 pb-3 border-b border-border-subtle">{{ month.name }}</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="date in month.dates" :key="date" class="tag-minimal">{{ date }}</span>
        </div>
      </div>

      <div class="editorial-card p-6 mt-10">
        <p class="text-xs uppercase tracking-widest text-gold mb-4">Regional Names</p>
        <div class="grid md:grid-cols-2 gap-4 text-sm text-text-secondary">
          <p><span class="text-charcoal">Choroonu</span> — Kerala</p>
          <p><span class="text-charcoal">Mukhe Bhaat</span> — West Bengal</p>
          <p><span class="text-charcoal">Annaprashan</span> — North & Central India</p>
          <p><span class="text-charcoal">Odana Prashan</span> — Odisha</p>
        </div>
      </div>
    </div>

    <!-- Godh Bharai -->
    <div v-if="activeTab === 'godh'">
      <div class="mb-12">
        <h2 class="text-2xl font-serif text-charcoal mb-4">Baby Shower Muhurat 2026</h2>
        <p class="text-text-secondary leading-relaxed max-w-2xl mb-6">
          Auspicious windows for Godh Bharai (North India), Seemantham (South India), and Shaadh (Bengal).
          Traditionally scheduled during the 4th, 6th, 7th, or 8th month of pregnancy.
        </p>
        <div class="editorial-card p-6 mb-10">
          <p class="text-xs uppercase tracking-widest text-gold mb-3">Ideal Tithis & Nakshatras</p>
          <p class="text-text-secondary text-sm leading-relaxed">
            Best days align with Tithis — Dwitiya, Tritiya, Panchami, Saptami, Dashami, Trayodashi —
            and stable Nakshatras: <span class="text-charcoal">Rohini, Mrigashira, Pushya, Hasta</span>.
          </p>
        </div>
      </div>

      <div v-for="(window, wIndex) in godhWindows" :key="window.label" class="mb-10">
        <h3 class="text-lg font-serif text-charcoal mb-2 pb-3 border-b border-border-subtle">{{ window.label }}</h3>
        <p class="text-text-secondary text-sm mb-4">{{ window.description }}</p>
        <div class="flex flex-wrap gap-2">
          <span v-for="date in window.dates" :key="date" class="tag-minimal">{{ date }}</span>
        </div>
      </div>

      <div class="editorial-card p-6 mt-10">
        <p class="text-xs uppercase tracking-widest text-gold mb-4">Regional Names</p>
        <div class="grid md:grid-cols-2 gap-4 text-sm text-text-secondary">
          <p><span class="text-charcoal">Godh Bharai</span> — North India</p>
          <p><span class="text-charcoal">Seemantham</span> — South India</p>
          <p><span class="text-charcoal">Shaadh</span> — West Bengal</p>
          <p><span class="text-charcoal">Dohale Jevan</span> — Maharashtra</p>
        </div>
      </div>
    </div>

    <!-- Seasonal Guide -->
    <div v-if="activeTab === 'seasonal'">
      <h2 class="text-2xl font-serif text-charcoal mb-10">Seasonal Muhurat Guide</h2>
      <div>
        <div
          v-for="(season, index) in seasonalGuide"
          :key="season.months"
          class="py-8"
          :class="{ 'border-t border-border-subtle': index > 0 }"
        >
          <div class="flex items-start gap-6">
            <div class="flex-shrink-0 w-40">
              <p class="text-xs uppercase tracking-widest text-gold mb-1">{{ season.months }}</p>
              <p class="text-text-muted text-xs">{{ season.hindu }}</p>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-serif text-charcoal mb-2">{{ season.significance }}</h3>
              <p class="text-text-secondary text-sm leading-relaxed">{{ season.practice }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="text-text-muted text-xs mt-16 leading-relaxed border-t border-border-subtle pt-8">
      Dates sourced from Astroyogi Panchang and AstroSage. For precise nakshatra and tithi timings for your specific ceremony, consult a local pandit or Drik Panchang.
    </p>
  </div>
</template>

<script>
export default {
  name: 'AuspiciousDatesPage',
  data() {
    return {
      activeTab: 'griha',
      tabs: [
        { key: 'griha',       label: 'Griha Pravesh' },
        { key: 'annaprashan', label: 'Annaprashan' },
        { key: 'godh',        label: 'Baby Shower' },
        { key: 'seasonal',    label: 'Seasonal Guide' }
      ],
      grihaMonths: [
        { name: 'February 2026', note: 'Highly auspicious post-Uttarayana', dates: ['Feb 6', 'Feb 11', 'Feb 19', 'Feb 20', 'Feb 21', 'Feb 25', 'Feb 26'] },
        { name: 'March 2026',    note: '',                                   dates: ['Mar 4', 'Mar 5', 'Mar 6', 'Mar 9', 'Mar 13', 'Mar 14'] },
        { name: 'April 2026',    note: '',                                   dates: ['Apr 20'] },
        { name: 'May 2026',      note: '',                                   dates: ['May 4', 'May 8', 'May 13'] },
        { name: 'June 2026',     note: 'Last window before Chaturmas',       dates: ['Jun 24', 'Jun 26', 'Jun 27'] },
        { name: 'July 2026',     note: 'Last window before Chaturmas',       dates: ['Jul 1', 'Jul 2', 'Jul 6'] },
        { name: 'August – October 2026', note: 'Chaturmas',                  dates: [] },
        { name: 'November 2026', note: 'Ceremonies resume after Nov 20',     dates: ['Nov 11', 'Nov 14', 'Nov 20', 'Nov 21', 'Nov 25', 'Nov 26'] },
        { name: 'December 2026', note: '',                                   dates: ['Dec 2', 'Dec 3', 'Dec 4', 'Dec 11', 'Dec 12', 'Dec 18', 'Dec 19', 'Dec 30'] }
      ],
      annaprashanMonths: [
        { name: 'February 2026',  dates: ['Feb 6', 'Feb 18', 'Feb 20'] },
        { name: 'March 2026',     dates: ['Mar 4', 'Mar 5', 'Mar 16', 'Mar 20', 'Mar 25', 'Mar 27'] },
        { name: 'April 2026',     dates: ['Apr 2', 'Apr 3', 'Apr 6', 'Apr 15', 'Apr 20', 'Apr 23', 'Apr 29'] },
        { name: 'May 2026',       dates: ['May 1', 'May 4', 'May 11', 'May 14', 'May 15'] },
        { name: 'June 2026',      dates: ['Jun 17', 'Jun 24'] },
        { name: 'July 2026',      dates: ['Jul 1', 'Jul 9', 'Jul 15', 'Jul 20', 'Jul 24'] },
        { name: 'August 2026',    dates: ['Aug 3', 'Aug 5', 'Aug 7', 'Aug 10', 'Aug 17', 'Aug 26', 'Aug 28'] },
        { name: 'September 2026', dates: ['Sep 14', 'Sep 17', 'Sep 21', 'Sep 24'] },
        { name: 'October 2026',   dates: ['Oct 12', 'Oct 21', 'Oct 26'] },
        { name: 'November & December 2026', dates: ['Dec 14'] }
      ],
      godhWindows: [
        {
          label: 'Pre-Summer Window',
          description: 'Best general window for spring baby showers across North and West India.',
          dates: ['Feb 11', 'Feb 12', 'Feb 13', 'Feb 14', 'Feb 15', 'Feb 16', 'Feb 17', 'Feb 18', 'Feb 19', 'Feb 20', 'Feb 21', 'Feb 22', 'Feb 23', 'Feb 24', 'Feb 25', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7', 'Mar 8', 'Mar 9', 'Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14', 'Apr 20']
        },
        {
          label: 'Winter Window',
          description: 'Peak season for South Indian Seemantham and temple-based ceremonies.',
          dates: ['Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21', 'Nov 22', 'Nov 23', 'Nov 24', 'Nov 25', 'Nov 26', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7', 'Dec 8', 'Dec 9', 'Dec 10', 'Dec 11', 'Dec 12', 'Dec 13', 'Dec 14', 'Dec 15', 'Dec 16', 'Dec 17', 'Dec 18', 'Dec 19']
        }
      ],
      seasonalGuide: [
        {
          months: 'Jan – Feb',
          hindu: 'Magha / Pausha',
          significance: 'Winter Ceremonies',
          practice: 'Celebrated alongside Makar Sankranti and Pongal. Called Choroonu in Kerala and Mukhe Bhaat in Bengal. Families prefer early spring for pleasant weather across India.'
        },
        {
          months: 'Mar – Apr',
          hindu: 'Phalguna / Chaitra',
          significance: 'Hindu New Year Season',
          practice: 'Aligns with Ugadi, Gudi Padwa, and Poila Baisakh. Considered highly auspicious for new beginnings — both Annaprashan and Griha Pravesh are widely performed.'
        },
        {
          months: 'May – Jun',
          hindu: 'Vaishakha / Jyeshtha',
          significance: 'Pre-Monsoon Window',
          practice: 'Includes Akshaya Tritiya — a naturally auspicious day (Abujha Muhurat) requiring no special planetary checking. Widely used for ceremonies in North and West India before the monsoon.'
        },
        {
          months: 'Jul – Aug',
          hindu: 'Ashadha / Shravana',
          significance: 'Shravan & Chaturmas',
          practice: 'The holy month of Shravan is dedicated to Lord Shiva. Favored for baby showers (Godh Bharai, Seemantham, Shaadh). Griha Pravesh is avoided after July 25 due to Chaturmas.'
        },
        {
          months: 'Sep – Oct',
          hindu: 'Bhadrapada / Ashvin',
          significance: 'Navratri & Durga Puja Season',
          practice: 'The nine days of Navratri are completely auspicious. Mukhe Bhaat in Bengal is massive during this period, often performed at local temples or ancestral homes.'
        },
        {
          months: 'Nov – Dec',
          hindu: 'Kartika / Margashirsha',
          significance: 'Post-Diwali Peak Season',
          practice: 'South Indian families heavily use Karthika Masam for temple-based Choroonu ceremonies. Peak season for Griha Pravesh due to excellent weather and Chaturmas ending on November 20.'
        }
      ]
    };
  }
};
</script>
