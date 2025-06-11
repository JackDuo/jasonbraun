<script setup>
import { ref, onMounted } from 'vue'

const noiseImageUrl = ref('')

function generateNoise() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const tiles = Math.floor(Math.random() * 50) + 1
  const tileSize = Math.floor(Math.random() * 20) + 1
  const borderWidth = Math.floor(Math.random() * 16)
  const mode = Math.random() > 0.5 ? 'brightness' : 'around'

  noiseImageUrl.value = `https://php-noise.com/noise.php?hex=$6C18B0&json`
}

onMounted(() => {
  generateNoise()
})
</script>

<template>
  <div class="noise-background" :style="{ backgroundImage: `url(${noiseImageUrl})` }"></div>
</template>

<style scoped>
.noise-background {
  position: fixed;      /* Fixiert den Hintergrund im Viewport */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1000;           /* Ganz hinten, unter allen anderen Inhalten */
  pointer-events: none; /* Verhindert, dass der Hintergrund Mausereignisse blockiert */
}
</style>
