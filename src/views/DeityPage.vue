<template>
  <div v-if="deity" class="max-w-reading mx-auto px-8 py-16">
    <!-- Deity Header -->
    <div class="mb-4">
      <button @click="$router.push('/home')" class="text-text-secondary hover:text-charcoal text-sm transition-colors">
        ← All Deities
      </button>
    </div>

    <div class="border-b border-border-subtle pb-12 mb-16">
      <div>
        <p class="text-xs uppercase tracking-widest text-gold mb-2">{{ deity.epithet }}</p>
          <h1 class="text-4xl md:text-5xl font-serif text-charcoal mb-2 leading-tight">
            {{ deity.name }}
            <span class="text-2xl text-text-secondary font-sans font-light ml-3">{{ deity.devanagari }}</span>
          </h1>
          <p class="text-text-secondary leading-relaxed max-w-2xl mt-4">{{ deity.description }}</p>
      </div>

      <!-- Content type tabs -->
      <div class="flex flex-wrap gap-2 mt-10">
        <button
          v-for="tab in availableTabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-5 py-2 text-sm transition-all duration-200',
            activeTab === tab.key
              ? 'bg-charcoal text-white'
              : 'border border-border-subtle text-text-secondary hover:border-charcoal hover:text-charcoal'
          ]"
        >
          {{ tab.label }}
          <span class="ml-1 text-xs opacity-60">({{ tab.count }})</span>
        </button>
      </div>
    </div>

    <!-- Content Sections -->
    <div v-if="activeTab === 'all'">
      <ContentSection
        v-for="section in contentSections"
        :key="section.type"
        :title="section.title"
        :items="section.items"
        :type="section.type"
        @item-click="navigateToContent"
      />
    </div>

    <div v-else>
      <ContentSection
        v-if="currentSection"
        :title="currentSection.title"
        :items="currentSection.items"
        :type="currentSection.type"
        @item-click="navigateToContent"
      />
    </div>
  </div>

  <div v-else class="max-w-reading mx-auto px-8 py-32 text-center">
    <p class="text-text-secondary">Deity not found.</p>
    <button @click="$router.push('/home')" class="btn-minimal mt-6">← Return Home</button>
  </div>
</template>

<script>
import { getDeityById } from '../content/deities.js';
import { getContentByDeity } from '../content/index.js';
import ContentSection from '../components/ContentSection.vue';

export default {
  name: 'DeityPage',
  components: { ContentSection },
  data() {
    return {
      deity: null,
      content: null,
      activeTab: 'all'
    };
  },
  computed: {
    contentSections() {
      if (!this.content) return [];
      const sections = [];
      if (this.content.aartis.length)     sections.push({ type: 'aarti',      title: 'Aartis',     items: this.content.aartis });
      if (this.content.stotras.length)    sections.push({ type: 'stotra',     title: 'Stotras',    items: this.content.stotras });
      if (this.content.mantras.length)    sections.push({ type: 'mantra',     title: 'Mantras',    items: this.content.mantras });
      if (this.content.bhajans.length)    sections.push({ type: 'bhajan',     title: 'Bhajans',    items: this.content.bhajans });
      if (this.content.pujaVidhis.length) sections.push({ type: 'puja-vidhi', title: 'Puja Vidhi', items: this.content.pujaVidhis });
      return sections;
    },
    availableTabs() {
      const tabs = [{ key: 'all', label: 'All', count: this.contentSections.reduce((n, s) => n + s.items.length, 0) }];
      this.contentSections.forEach(s => tabs.push({ key: s.type, label: s.title, count: s.items.length }));
      return tabs;
    },
    currentSection() {
      return this.contentSections.find(s => s.type === this.activeTab) || null;
    }
  },
  methods: {
    navigateToContent(item, type) {
      if (type === 'puja-vidhi') {
        this.$router.push(`/puja-vidhi/${item.id}`);
      } else {
        this.$router.push(`/content/${item.id}`);
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    this.deity = getDeityById(id);
    if (this.deity) {
      this.content = getContentByDeity(this.deity.name);
    }
  }
};
</script>
