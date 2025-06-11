<script>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
  components: { SidebarLink },
  setup() {
    const sidebarRef = ref(null)

    const handleClickOutside = (event) => {
      if (sidebarRef.value && !sidebarRef.value.contains(event.target)) {
        if (!collapsed.value) toggleSidebar()
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return { collapsed, toggleSidebar, sidebarWidth, sidebarRef }
  }
}
</script>

<template>
  <div class="sidebar" ref="sidebarRef" :style="{ width: sidebarWidth }">
    <h1>
      <div style="margin-left: 10px">
        <img src="public/Logos/LogoSolo.png" alt="LogoSolo"
             style="position: absolute; top: 0vh; left: 0vw; width: 100px; height: auto; background-color: #E07B39; border-radius: 7px; padding: 1rem; z-index: 2" />
      </div>

      <transition name="slide-in">
        <div v-if="!collapsed" class="animated-title">
          <h2>Jasons<br />Seite</h2>
        </div>
      </transition>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Homespace</SidebarLink>
    <SidebarLink to="/Radio" icon="fas fa-radio">Test</SidebarLink>
    <SidebarLink to="/wetter" icon="fas fa-cloud-bolt">Wetter</SidebarLink>
    <SidebarLink to="/banane" icon="fas fa-message">Bananentalk</SidebarLink>
    <SidebarLink to="/frosch" icon="fas fa-frog">Der Frosch</SidebarLink>
    <SidebarLink to="/images" icon="fas fa-image">Bilder</SidebarLink>

    <span
        class="collapse-icon"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleSidebar"
    >
      <i
          class="fas fa-hand-point-right fa-2x"
          style="margin-left: -10px; transform: rotate(-10deg)"
      />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #E07B39;
  --sidebar-item-hover: #D68A3A;
  --sidebar-item-active: #B55F2B;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.animated-title {
  position: absolute;
  top: -2vh;
  left: 2px;
  text-align: right;
  background-color: #E07B39;
  border-bottom-right-radius: 15px;
  padding-right: 2.5rem;
  padding-left: 5rem;
  padding-bottom: 1px;
  transition: all 5s linear;
  color: white;
  margin-left: 10vw;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(-100deg);
  margin-left: -10px;
  transition: 0.2s linear;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s ease;
}
</style>
