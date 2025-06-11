<script setup>
import Testzentr from '~/components/testzentr.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faHouse, faHandPointLeft } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Noisebg from "~/components/Backgrounds/noisebg.vue";
import NasaBG from "~/components/Backgrounds/NasaBG.vue";

library.add(faUser, faHouse, faHandPointLeft)
</script>

<template>

  <router-view />

  <div class="main-content">
    <span v-if="route.path !== '/'">
      <Sidebar />
      <Noisebg />

    </span>
    <span v-else>
      <NasaBG />
    </span>
  </div>
</template>

<style scoped>
:root {
  --color-purple: #6c18b0;
  --color-purple-light: #b197fc;
  --color-orange: #d67228;
  --color-orange-dark: #a14800;
  --color-white: #ffffff;
}

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: sans-serif;
  background-color: var(--color-white);
  color: #333;
}

.main-content {
  margin-left: 200px; /* Platz für Sidebar */
  padding: 2rem;
}

.icon-demo {
  margin-top: 1rem;
  font-size: 2rem;
  display: flex;
  gap: 1rem;
}

.flipped {
  transform: scaleX(-1);
}
</style>
