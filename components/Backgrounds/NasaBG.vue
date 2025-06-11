<script setup>
import { ref, onMounted } from 'vue'

const backgroundImage = ref('')

onMounted(async () => {
  try {
    const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=q9jgi97dVgDrq5SPkLGpz0wxsg3QKmdYa9TxC5Ex')
    const data = await res.json()
    if (data.media_type === 'image') {
      backgroundImage.value = data.url
    }
  } catch (err) {
    console.error('Fehler beim Laden des NASA-Bildes:', err)
  }
})
</script>

<template>
  <div
      class="background"
      :style="{
      backgroundImage: backgroundImage
        ? `linear-gradient(rgba(60, 0, 90, 0.5), rgba(20, 0, 40, 0.7)), url(${backgroundImage})`
        : 'none'
    }"
  >

  </div>
</template>

<style scoped>
.background {
  position: fixed;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  transition: background-image 1s ease-in-out;
}
</style>
