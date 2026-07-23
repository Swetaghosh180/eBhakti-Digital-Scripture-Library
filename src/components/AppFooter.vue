<template>
  <footer class="bg-white border-t border-border-subtle mt-32 footer-reveal">
    <div class="max-w-reading mx-auto py-16 px-8 text-center">
      <div class="footer-line mb-8"></div>
      <p class="text-xl font-serif text-charcoal mb-2">eBhakti</p>
      <p class="text-text-secondary text-sm leading-relaxed max-w-2xl mx-auto mb-4">
        A non-profit initiative dedicated to preserving sacred texts in a refined and accessible format.
      </p>
      <p class="text-text-secondary text-xs">© 2026 eBhakti. Made with devotion.</p>
    </div>
  </footer>
</template>

<script>
export default { name: 'AppFooter' };
</script>

<style scoped>
.footer-reveal {
  animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
}
.footer-line {
  width: 0;
  height: 1px;
  background: #C9922A;
  margin: 0 auto;
  animation: drawLine 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
}
</style>
