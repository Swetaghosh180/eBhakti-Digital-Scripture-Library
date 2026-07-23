import { createRouter, createWebHistory } from 'vue-router'
import SplashScreen from '../views/SplashScreen.vue'
import HomePage from '../views/HomePage.vue'
import StotrasPage from '../views/StotrasPage.vue'
import ContentReadingPage from '../views/ContentReadingPage.vue'

const routes = [
  { path: '/', name: 'Splash', component: SplashScreen },
  { path: '/home', name: 'Home', component: HomePage },

  // Deity-centric routes
  { path: '/deity/:id', name: 'Deity', component: () => import('../views/DeityPage.vue') },

  // Unified content reading (aarti, stotra, mantra, bhajan)
  { path: '/content/:id', name: 'ContentReading', component: ContentReadingPage },

  // Category pages
  { path: '/stotras', name: 'Stotras', component: StotrasPage },
  { path: '/aartis', name: 'Aartis', component: () => import('../views/AartisPage.vue') },
  { path: '/mantras', name: 'Mantras', component: () => import('../views/MantrasPage.vue') },
  { path: '/bhajans', name: 'Bhajans', component: () => import('../views/BhajansPage.vue') },

  // Puja Vidhi
  { path: '/puja-vidhi', name: 'PujaVidhi', component: () => import('../views/PujaVidhiPage.vue') },
  { path: '/puja-vidhi/:id', name: 'PujaVidhiReading', component: () => import('../views/PujaVidhiReadingPage.vue') },

  // Festivals
  { path: '/festivals', name: 'Festivals', component: () => import('../views/FestivalsPage.vue') },
  { path: '/festivals/puja-dates', name: 'PujaDates', component: () => import('../views/PujaDatesPage.vue') },
  { path: '/festivals/ekadashi-dates', name: 'EkadashiDates', component: () => import('../views/EkadashiDatesPage.vue') },
  { path: '/festivals/auspicious-dates', name: 'AuspiciousDates', component: () => import('../views/AuspiciousDatesPage.vue') },

  // Legacy redirect
  { path: '/stotra/:id', redirect: to => `/content/${to.params.id}` }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
})

export default router
