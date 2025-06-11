<script setup>
import {ref} from 'vue'

const count = ref('5')

function pressed() {
  count.value++
}

<h1 :class="headlineclass">Hallöchen!</h1>

</script>


<template>
  <button @click="pressed"> Anzahl: {{ count }}</button>

</template>

