<script setup>
import { ref } from 'vue'

const text = ref('')

</script>

<template>
  <input v-model="text" placeholder="Kack hier rein">
  <p> {{ text }} </p>

</template>