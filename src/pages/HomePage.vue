<template>
  <q-page class="flex flex-center">
    <div class="home-container">
      <div class="header-section">
        <h1 class="title">Boost Baguio</h1>
        <p class="subtitle">Navigate Baguio City with Confidence</p>
      </div>
      
      <div class="feature-grid">
        <div class="feature-card">
          <h3>APANAM (P2P Navigation)</h3>
          <p>Point-to-point navigation using Baguio's jeepney system</p>
          <embossed-button color="primary" @click="goTo('/apanam')">Start Journey</embossed-button>
        </div>
        
        <div class="feature-card">
          <h3>PAGNAAM (City Jeeps)</h3>
          <p>Comprehensive information about all jeepney routes in Baguio</p>
          <embossed-button color="secondary" @click="goTo('/pagnaam')">Explore Routes</embossed-button>
        </div>
        
        <div class="feature-card">
          <h3>MAYKAN (Places)</h3>
          <p>Discover tourist spots and how to get there via jeepney</p>
          <embossed-button color="success" @click="goTo('/maykan')">Find Places</embossed-button>
        </div>
        
        <div class="feature-card">
          <h3>ARAMIDEM (Events)</h3>
          <p>Upcoming events in Baguio with transportation details</p>
          <embossed-button color="warning" @click="goTo('/aramidem')">See Events</embossed-button>
        </div>
        
        <div class="feature-card">
          <h3>AYAN MO (Near Me)</h3>
          <p>Suggestions for nearby places based on your location</p>
          <embossed-button color="danger" @click="goTo('/ayan-mo')">Find Nearby</embossed-button>
        </div>
      </div>
      
      <div class="community-section">
        <h3>Join Our Community</h3>
        <p>Connect with other travelers and locals on our Facebook group</p>
        <embossed-button color="secondary" @click="openCommunity">
          Visit "Sa Baguio" Group
        </embossed-button>
      </div>
    </div>
  </q-page>
</template>

<script>
import EmbossedButton from 'components/EmbossedButton.vue'

export default {
  name: 'HomePage',
  components: {
    EmbossedButton
  },
  methods: {
    goTo(route) {
      this.$router.push(route)
    },
    openCommunity() {
      window.open('https://facebook.com/sabaguio', '_blank')
    }
  }
}
</script>

<style scoped>
.home-container {
  max-width: 800px;
  width: 100%;
  padding: 20px;
  text-align: center;
}

.title {
  color: #2e5d3e;
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  font-weight: 600;
}

.subtitle {
  color: #8d6e63;
  font-size: 1.2rem;
  margin: 0 0 40px 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e0e0e0;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #2e5d3e;
  margin: 0 0 12px 0;
  font-size: 1.4rem;
}

.feature-card p {
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.community-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}

.community-section h3 {
  color: #2e5d3e;
  margin: 0 0 12px 0;
  font-size: 1.5rem;
}

.community-section p {
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .home-container {
    padding: 16px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>