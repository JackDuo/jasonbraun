<script setup>
import { ref } from 'vue'

const toggledtext = ref(true)

function toggle() {
if (toggledtext.value == true) {
  toggledtext.value = false
} else {
  toggledtext.value = true
}
}

</script>


<template>
  <button @click="toggle">Wechsel!</button>
  <h1 v-if="toggledtext == true">Jaaaaa</h1>
  <h1 v-else>noooooo</h1>
</template>

