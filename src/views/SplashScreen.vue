<template>
  <div class="min-h-screen flex items-center justify-center overflow-hidden" style="background: linear-gradient(160deg, #FAF7F2 0%, #F5EFE4 50%, #FDF0E0 100%);">
    <!-- Background Om watermark -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <span class="text-gold opacity-5 leading-none" style="font-size: 40rem; font-family: 'Noto Serif Devanagari', serif; animation: omPulse 4s ease-in-out infinite;">ॐ</span>
    </div>

    <div class="relative text-center px-8">
      <!-- Om symbol -->
      <div class="splash-om mb-6">
        <span class="text-6xl leading-none" style="font-family: 'Noto Serif Devanagari', serif; color: #C48A3A;">ॐ</span>
      </div>

      <!-- Gold line -->
      <div class="splash-line mb-8"></div>

      <!-- Title -->
      <h1 class="splash-title text-6xl font-serif text-charcoal mb-3 tracking-tight">eBhakti</h1>

      <!-- Tagline -->
      <p class="splash-sub text-text-secondary text-sm mb-12 tracking-widest uppercase">
        Sacred Texts. Thoughtfully Preserved.
      </p>

      <!-- Sanskrit blessing -->
      <p class="splash-blessing text-gold text-lg mb-10" style="font-family: 'Noto Serif Devanagari', serif;">
        जय श्री राम
      </p>

      <!-- Loading dots -->
      <div class="flex items-center justify-center gap-2">
        <span class="splash-dot" style="animation-delay:0s"></span>
        <span class="splash-dot" style="animation-delay:0.25s"></span>
        <span class="splash-dot" style="animation-delay:0.5s"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
  mounted() {
    setTimeout(() => this.$router.push('/home'), 2800);
  }
}
</script>

<style scoped>
.splash-om {
  opacity: 0;
  animation: heroReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
}
.splash-line {
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #C48A3A, transparent);
  margin: 0 auto;
  animation: drawLine 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
}
.splash-title {
  opacity: 0;
  animation: heroReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s forwards;
}
.splash-sub {
  opacity: 0;
  animation: heroReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.75s forwards;
}
.splash-blessing {
  opacity: 0;
  animation: heroReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.95s forwards;
}
.splash-dot {
  display: inline-block;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #C48A3A;
  opacity: 0;
  animation: pulseDot 1.2s ease-in-out infinite, heroReveal 0.5s ease 1.1s forwards;
}
@keyframes drawLine {
  from { width: 0; }
  to   { width: 5rem; }
}
@keyframes omPulse {
  0%, 100% { opacity: 0.04; transform: scale(1); }
  50%       { opacity: 0.07; transform: scale(1.02); }
}
</style>
