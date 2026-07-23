<template>
  <div class="min-h-screen flex items-center justify-center bg-ivory overflow-hidden">
    <div class="text-center">
      <div class="splash-om mb-6">ॐ</div>
      <h1 class="splash-title text-5xl font-serif text-charcoal mb-3 tracking-tight">eBhakti</h1>
      <p class="splash-sub text-text-secondary text-sm mb-10 tracking-widest uppercase">Sacred Texts. Thoughtfully Preserved.</p>
      <div class="flex items-center justify-center gap-2">
        <span class="splash-dot" style="animation-delay:0s"></span>
        <span class="splash-dot" style="animation-delay:0.2s"></span>
        <span class="splash-dot" style="animation-delay:0.4s"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
  mounted() {
    setTimeout(() => this.$router.push('/home'), 2600);
  }
}
</script>

<style scoped>
.splash-om {
  font-family: 'Noto Serif Devanagari', serif;
  font-size: 3rem;
  color: #C9922A;
  opacity: 0;
  animation: heroReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
}
.splash-title {
  opacity: 0;
  animation: heroReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s forwards;
}
.splash-sub {
  opacity: 0;
  animation: heroReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.6s forwards;
}
.splash-dot {
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #C9922A;
  opacity: 0;
  animation: pulseDot 1.2s ease-in-out infinite, heroReveal 0.5s ease 0.9s forwards;
}
</style>
