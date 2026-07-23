export const deities = [
  {
    id: 'ganesha',
    name: 'Ganesha',
    devanagari: 'गणेश',
    epithet: 'Remover of Obstacles',
    description: 'Lord of beginnings, wisdom, and intellect. Worshipped before any auspicious undertaking.',
    color: '#FF6B00',
    aartis: ['ganesh-aarti', 'jai-ganesh-aarti'],
    bhajans: ['ganpati-bappa-morya'],
    stotras: ['ganpati-atharvashirsha', 'ganesh-pancharatnam'],
    mantras: ['om-gam-ganapataye', 'vakratunda-mahakaya'],
    pujaVidhi: ['ganesh-puja-vidhi']
  },
  {
    id: 'shiva',
    name: 'Shiva',
    devanagari: 'शिव',
    epithet: 'The Auspicious One',
    description: 'The destroyer and transformer. Lord of meditation, yoga, and cosmic dance.',
    color: '#1C1C2E',
    aartis: ['shiva-aarti', 'om-jai-shiv-omkara'],
    bhajans: ['bholenath-baba'],
    stotras: ['shiva-tandava-stotram', 'shiva-mahimna-stotram'],
    mantras: ['mahamrityunjaya-mantra', 'om-namah-shivaya'],
    pujaVidhi: ['shiva-puja-vidhi', 'mahashivratri-puja']
  },
  {
    id: 'krishna',
    name: 'Krishna',
    devanagari: 'कृष्ण',
    epithet: 'The Divine Flute Player',
    description: 'The eighth avatar of Vishnu. Embodiment of love, joy, and divine wisdom.',
    color: '#1A4A8A',
    aartis: ['krishna-aarti', 'jai-jagdish-hare'],
    bhajans: ['hare-krishna-mahamantra', 'achyutam-keshavam'],
    stotras: ['krishna-ashtakam', 'madhurashtakam'],
    mantras: ['hare-krishna-mantra', 'om-namo-bhagavate'],
    pujaVidhi: ['krishna-janmashtami-puja']
  },
  {
    id: 'durga',
    name: 'Durga',
    devanagari: 'दुर्गा',
    epithet: 'The Invincible Goddess',
    description: 'The fierce form of Shakti. Destroyer of evil and protector of the righteous.',
    color: '#8B0000',
    aartis: ['durga-aarti', 'jai-ambe-gauri'],
    bhajans: ['jai-mata-di', 'ambe-tu-hai-jagdambe'],
    stotras: ['durga-saptashati', 'mahishasura-mardini'],
    mantras: ['om-dum-durgayei', 'navarna-mantra'],
    pujaVidhi: ['navratri-puja', 'durga-puja-vidhi']
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    devanagari: 'लक्ष्मी',
    epithet: 'Goddess of Prosperity',
    description: 'Goddess of wealth, fortune, and beauty. Consort of Lord Vishnu.',
    color: '#C9922A',
    aartis: ['lakshmi-aarti', 'jai-laxmi-mata'],
    bhajans: ['lakshmi-chalisa'],
    stotras: ['shri-lakshmi-stotra', 'kanakadhara-stotram'],
    mantras: ['om-shreem-mahalakshmiyei', 'lakshmi-gayatri'],
    pujaVidhi: ['lakshmi-puja-vidhi', 'diwali-lakshmi-puja']
  },
  {
    id: 'hanuman',
    name: 'Hanuman',
    devanagari: 'हनुमान',
    epithet: 'The Devoted Servant',
    description: 'Symbol of strength, devotion, and selfless service. Devotee of Lord Rama.',
    color: '#FF4500',
    aartis: ['hanuman-aarti', 'jai-hanuman-gyan-gun-sagar'],
    bhajans: ['bajrang-baan', 'hanuman-bhajan'],
    stotras: ['hanuman-chalisa', 'hanuman-ashtak'],
    mantras: ['om-hanumate-namah', 'hanuman-beej-mantra'],
    pujaVidhi: ['hanuman-puja-vidhi']
  },
  {
    id: 'saraswati',
    name: 'Saraswati',
    devanagari: 'सरस्वती',
    epithet: 'Goddess of Knowledge',
    description: 'Goddess of learning, arts, wisdom, and speech. Bestower of knowledge and creativity.',
    color: '#FFFFFF',
    aartis: ['saraswati-aarti'],
    bhajans: ['ya-kundendu'],
    stotras: ['saraswati-stotram', 'saraswati-vandana'],
    mantras: ['om-aim-saraswatyei', 'saraswati-gayatri'],
    pujaVidhi: ['saraswati-puja-vidhi', 'vasant-panchami-puja']
  },
  {
    id: 'vishnu',
    name: 'Vishnu',
    devanagari: 'विष्णु',
    epithet: 'The Preserver',
    description: 'The preserver of the universe. Protector of dharma and cosmic order.',
    color: '#1A4A8A',
    aartis: ['vishnu-aarti', 'jai-jagdish-hare'],
    bhajans: ['vishnu-sahasranama-bhajan'],
    stotras: ['vishnu-sahasranama', 'narayana-stotram'],
    mantras: ['om-namo-narayanaya', 'vishnu-gayatri'],
    pujaVidhi: ['vishnu-puja-vidhi', 'ekadashi-puja']
  }
];

export const getDeityById = (id) => deities.find(d => d.id === id);
