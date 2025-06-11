<script setup>
import { ref, onMounted } from 'vue'

const pElementRef = ref('')
const Eintrag = ref('')


function Mountqm() {
  pElementRef.value.textContent = Eintrag.value

  if (Notification.permission === 'granted') {
    new Notification(Eintrag.value)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(Eintrag.value)
      }
    })
  }
}



</script>

<template>
  <form @submit.prevent="Mountqm">
    <input v-model="Eintrag" required placeholder="Neuer Text">
    <button>Add Todo</button>
  </form>
  <p ref="pElementRef">Halllii halloo</p>


</template>