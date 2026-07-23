import { stotras } from './stotras.js';
import { aartis } from './aartis.js';
import { mantras } from './mantras.js';
import { bhajans } from './bhajans.js';
import { pujaVidhis } from './pujaVidhi.js';

export const getContentById = (id) =>
  [...stotras, ...aartis, ...mantras, ...bhajans].find(c => c.id === id) || null;

export const getPujaVidhiById = (id) =>
  pujaVidhis.find(p => p.id === id) || null;

export const getContentByDeity = (deityName) => ({
  stotras: stotras.filter(s => s.deity.toLowerCase() === deityName.toLowerCase()),
  aartis: aartis.filter(a => a.deity.toLowerCase() === deityName.toLowerCase()),
  mantras: mantras.filter(m => m.deity.toLowerCase() === deityName.toLowerCase()),
  bhajans: bhajans.filter(b => b.deity.toLowerCase() === deityName.toLowerCase()),
  pujaVidhis: pujaVidhis.filter(p => p.deity.toLowerCase() === deityName.toLowerCase())
});

export { stotras, aartis, mantras, bhajans, pujaVidhis };
