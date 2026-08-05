<template>
  <div class="max-w-reading mx-auto px-8 py-16">
    <button @click="$router.back()" class="text-text-secondary hover:text-charcoal mb-12 text-sm transition-colors">
      ← Back to Festivals
    </button>

    <div class="mb-16">
      <p class="text-xs uppercase tracking-widest text-gold mb-3">Fasting Calendar</p>
      <h1 class="text-4xl font-serif text-charcoal mb-4">Ekadashi Dates 2026</h1>
      <p class="text-text-secondary max-w-xl">
        Ekadashi fasts occur twice a month — on the eleventh day of both Shukla Paksha (waxing moon)
        and Krishna Paksha (waning moon). All Ekadashis are dedicated to Lord Vishnu.
      </p>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap gap-4 mb-12">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-gold opacity-60 inline-block"></span>
        <span class="text-text-secondary text-sm">Shukla Paksha (Waxing Moon)</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 border border-gold inline-block"></span>
        <span class="text-text-secondary text-sm">Krishna Paksha (Waning Moon)</span>
      </div>
    </div>

    <div>
      <div v-for="(month, mIndex) in months" :key="month.name" class="mb-12">
        <h2 class="text-xl font-serif text-charcoal mb-6 pb-3 border-b border-border-subtle">
          {{ month.name }}
        </h2>
        <div>
          <div
            v-for="(ekadashi, eIndex) in month.ekadashis"
            :key="ekadashi.id"
            class="py-5"
            :class="{ 'border-t border-border-subtle': eIndex > 0 }"
          >
            <div class="flex items-start justify-between gap-6">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <span
                    :class="[
                      'text-xs uppercase tracking-wider px-2 py-0.5',
                      ekadashi.paksha === 'Shukla'
                        ? 'bg-gold bg-opacity-15 text-gold'
                        : 'border border-gold text-gold'
                    ]"
                  >{{ ekadashi.paksha }} Paksha</span>
                </div>
                <h3 class="text-lg font-serif text-charcoal mb-1">{{ ekadashi.name }}</h3>
                <p class="text-text-secondary text-sm leading-relaxed">{{ ekadashi.significance }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <span class="tag-minimal block mb-1">{{ ekadashi.date }}</span>
                <span class="text-text-muted text-xs">{{ ekadashi.day }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="text-text-muted text-xs mt-8 leading-relaxed border-t border-border-subtle pt-8">
      Note: Ekadashi timings may vary by one day based on regional panchang. Consult Drik Panchang or AstroSage for precise local timings.
    </p>
  </div>
</template>

<script>
export default {
  name: 'EkadashiDatesPage',
  data() {
    return {
      months: [
        {
          name: 'January 2026',
          ekadashis: [
            { id: 1,  name: 'Shattila Ekadashi',    date: 'Jan 14, 2026', day: 'Wednesday', paksha: 'Krishna', significance: 'Observed for the removal of sins. Devotees donate sesame seeds (til) and perform charity.' },
            { id: 2,  name: 'Jaya Ekadashi',         date: 'Jan 29, 2026', day: 'Thursday',  paksha: 'Shukla',  significance: 'Fasting on this day liberates one from the cycle of rebirth and grants victory in all endeavors.' }
          ]
        },
        {
          name: 'February 2026',
          ekadashis: [
            { id: 3,  name: 'Vijaya Ekadashi',       date: 'Feb 13, 2026', day: 'Friday',    paksha: 'Krishna', significance: 'Grants victory over enemies and obstacles. Lord Rama observed this fast before crossing to Lanka.' },
            { id: 4,  name: 'Amalaki Ekadashi',      date: 'Feb 27, 2026', day: 'Friday',    paksha: 'Shukla',  significance: 'Worship of the Amalaki (Indian gooseberry) tree, sacred to Lord Vishnu. Grants moksha and prosperity.' }
          ]
        },
        {
          name: 'March 2026',
          ekadashis: [
            { id: 5,  name: 'Papmochani Ekadashi',  date: 'Mar 15, 2026', day: 'Sunday',    paksha: 'Krishna', significance: 'Destroys all sins accumulated over lifetimes. Observed at the end of the dark fortnight of Chaitra.' },
            { id: 6,  name: 'Kamada Ekadashi',       date: 'Mar 29, 2026', day: 'Sunday',    paksha: 'Shukla',  significance: 'Fulfills all desires and removes the sin of Brahmahatya. One of the most auspicious Ekadashis.' }
          ]
        },
        {
          name: 'April 2026',
          ekadashis: [
            { id: 7,  name: 'Varuthini Ekadashi',    date: 'Apr 13, 2026', day: 'Monday',    paksha: 'Krishna', significance: 'Grants happiness, virtue, and liberation. Fasting on this day equals the merit of great charity.' },
            { id: 8,  name: 'Mohini Ekadashi',       date: 'Apr 27, 2026', day: 'Monday',    paksha: 'Shukla',  significance: 'Removes delusion and grants liberation. Lord Vishnu appeared in the Mohini form on this day.' }
          ]
        },
        {
          name: 'May 2026',
          ekadashis: [
            { id: 9,  name: 'Apara Ekadashi',        date: 'May 13, 2026', day: 'Wednesday', paksha: 'Krishna', significance: 'Grants unlimited merit and removes the sin of false witness, false scriptures, and broken vows.' },
            { id: 10, name: 'Padmini Ekadashi (Adhik Maas)', date: 'May 27, 2026', day: 'Wednesday', paksha: 'Shukla', significance: 'Rare Ekadashi occurring in the Adhika (leap) month. Grants the merit of all other Ekadashis combined.' }
          ]
        },
        {
          name: 'June 2026',
          ekadashis: [
            { id: 11, name: 'Parama Ekadashi (Adhik Maas)', date: 'Jun 11, 2026', day: 'Thursday', paksha: 'Krishna', significance: 'Observed in the Adhika month. Grants supreme merit and liberation from the cycle of birth and death.' },
            { id: 12, name: 'Nirjala Ekadashi',      date: 'Jun 25, 2026', day: 'Thursday',  paksha: 'Shukla',  significance: 'The most rigorous Ekadashi — observed without water. Fasting on this single day equals all 24 Ekadashis.' }
          ]
        },
        {
          name: 'July 2026',
          ekadashis: [
            { id: 13, name: 'Yogini Ekadashi',       date: 'Jul 10, 2026', day: 'Friday',    paksha: 'Krishna', significance: 'Removes all sins and cures diseases. Fasting on this day equals feeding 88,000 Brahmins.' },
            { id: 14, name: 'Devshayani Ekadashi',   date: 'Jul 25, 2026', day: 'Saturday',  paksha: 'Shukla',  significance: 'Lord Vishnu enters his cosmic sleep (Yoga Nidra). Marks the beginning of Chaturmas — major ceremonies are paused.' }
          ]
        },
        {
          name: 'August 2026',
          ekadashis: [
            { id: 15, name: 'Kamika Ekadashi',       date: 'Aug 9, 2026',  day: 'Sunday',    paksha: 'Krishna', significance: 'Grants the merit of bathing in all sacred rivers. Removes sins of violence and impure conduct.' },
            { id: 16, name: 'Putrada Ekadashi',      date: 'Aug 23, 2026', day: 'Sunday',    paksha: 'Shukla',  significance: 'Grants the boon of a virtuous son. Observed by couples seeking progeny and family prosperity.' }
          ]
        },
        {
          name: 'September 2026',
          ekadashis: [
            { id: 17, name: 'Aja Ekadashi',          date: 'Sep 7, 2026',  day: 'Monday',    paksha: 'Krishna', significance: 'Destroys all sins and grants liberation. Fasting on this day removes the effects of past karma.' },
            { id: 18, name: 'Parivartini Ekadashi',  date: 'Sep 22, 2026', day: 'Tuesday',   paksha: 'Shukla',  significance: 'Lord Vishnu turns over in his cosmic sleep. Also called Vamana Ekadashi — Lord Vamana\'s appearance day.' }
          ]
        },
        {
          name: 'October 2026',
          ekadashis: [
            { id: 19, name: 'Indira Ekadashi',       date: 'Oct 6, 2026',  day: 'Tuesday',   paksha: 'Krishna', significance: 'Observed during Pitru Paksha. Fasting liberates ancestors from lower realms and grants them peace.' },
            { id: 20, name: 'Papankusha Ekadashi',   date: 'Oct 22, 2026', day: 'Thursday',  paksha: 'Shukla',  significance: 'Removes all sins like a hook (ankusha) removes an elephant. Grants liberation and heavenly abode.' }
          ]
        },
        {
          name: 'November 2026',
          ekadashis: [
            { id: 21, name: 'Rama Ekadashi',         date: 'Nov 5, 2026',  day: 'Thursday',  paksha: 'Krishna', significance: 'Grants the merit of Ashwamedha Yajna. Removes sins and grants the devotee residence in Vaikuntha.' },
            { id: 22, name: 'Devutthana / Prabodhini Ekadashi', date: 'Nov 20, 2026', day: 'Friday', paksha: 'Shukla', significance: 'Lord Vishnu awakens from his cosmic sleep. Marks the end of Chaturmas — the wedding and ceremony season resumes.' }
          ]
        },
        {
          name: 'December 2026',
          ekadashis: [
            { id: 23, name: 'Utpanna Ekadashi',      date: 'Dec 4, 2026',  day: 'Friday',    paksha: 'Krishna', significance: 'The day Ekadashi Devi was born from Lord Vishnu to slay the demon Mura. Observing this fast grants liberation.' },
            { id: 24, name: 'Mokshada / Vaikuntha Ekadashi', date: 'Dec 20, 2026', day: 'Sunday', paksha: 'Shukla', significance: 'Grants liberation (moksha) to the devotee and their ancestors. The Bhagavad Gita was spoken on this day.' }
          ]
        }
      ]
    };
  }
};
</script>
