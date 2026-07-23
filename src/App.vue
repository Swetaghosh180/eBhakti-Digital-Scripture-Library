<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import Header from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    Header,
    AppFooter
  }
}
</script>

<style>
.page-enter-active {
  animation: fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both;
}
.page-leave-active {
  animation: fadeOut 0.22s ease both;
}
</style>