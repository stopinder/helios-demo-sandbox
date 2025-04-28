<template>
  <button class="portal-link">🌌 Enter the Portal</button>
</template>

<script setup>
</script>

<style scoped>
.portal-link {
  display: block;
  margin: 48px auto 0;
  padding: 16px 32px;
  background: radial-gradient(circle, var(--accent-gold) 0%, #1a1a2e 100%);
  border-radius: 999px;
  color: white;
  font-size: 18px;
  box-shadow: 0 0 20px var(--accent-gold);
  transition: 0.3s;
}

.portal-link:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px var(--accent-gold);
}
</style>
