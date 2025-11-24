<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="flex items-center">
            <div class="text-h6">Boost Baguio</div>
          </div>
        </q-toolbar-title>
        <q-btn flat @click="toggleDarkMode" :icon="darkMode ? 'brightness_3' : 'wb_sunny'" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="minimal-container">
        <div class="minimal-content">
          <router-view />
        </div>
      </div>
    </q-page-container>

    <q-footer class="bg-primary text-white">
      <div class="footer-content">
        <div class="footer-buttons">
          <embossed-button 
            v-for="tab in tabs" 
            :key="tab.name"
            :color="currentRoute === tab.route ? 'primary' : 'secondary'"
            @click="navigateTo(tab.route)"
            class="footer-btn"
          >
            {{ tab.name }}
          </embossed-button>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import EmbossedButton from 'components/EmbossedButton.vue'

export default {
  name: 'MinimalLayout',
  components: {
    EmbossedButton
  },
  data() {
    return {
      darkMode: false,
      tabs: [
        { name: 'APANAM', route: '/apanam' },
        { name: 'PAGNAAM', route: '/pagnaam' },
        { name: 'MAYKAN', route: '/maykan' },
        { name: 'ARAMIDEM', route: '/aramidem' },
        { name: 'AYAN MO', route: '/ayan-mo' }
      ]
    }
  },
  computed: {
    currentRoute() {
      return this.$route.path
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      this.$q.dark.toggle()
    },
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.minimal-container {
  min-height: calc(100vh - 120px);
  background-color: #f5f5f5;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.minimal-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer-content {
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-btn {
  min-width: 80px;
  padding: 8px 16px !important;
  font-size: 14px !important;
}

@media (max-width: 768px) {
  .footer-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .footer-btn {
    width: 100%;
    max-width: 140px;
  }
}
</style>