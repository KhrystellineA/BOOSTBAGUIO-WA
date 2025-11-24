<template>
  <q-page class="flex flex-center">
    <div class="pagnaam-container">
      <h2 class="title">PAGNAAM (City Jeeps)</h2>
      <p class="subtitle">Comprehensive information about all jeepney routes in Baguio</p>
      
      <div class="search-section">
        <q-input 
          v-model="searchQuery" 
          placeholder="Search for routes, terminals, or destinations" 
          outlined 
          class="search-input"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      
      <div class="routes-grid">
        <div v-for="route in routes" :key="route.id" class="route-card">
          <div class="route-header" :style="{ 'border-left-color': route.color }">
            <div class="route-info">
              <h3 class="route-name">{{ route.name }}</h3>
              <p class="route-description">{{ route.description }}</p>
            </div>
            <div class="route-fare">₱{{ route.fare }}</div>
          </div>
          
          <div class="route-details">
            <div class="route-terminals">
              <div class="terminal">
                <q-icon name="location_on" color="primary" />
                <span>{{ route.terminalStart }}</span>
              </div>
              <div class="terminal">
                <q-icon name="location_on" color="secondary" />
                <span>{{ route.terminalEnd }}</span>
              </div>
            </div>
            
            <div class="route-stats">
              <div class="stat">
                <q-icon name="schedule" />
                <span>{{ route.operatingHours }}</span>
              </div>
              <div class="stat">
                <q-icon name="access_time" />
                <span>~{{ route.estimatedDuration }} min</span>
              </div>
            </div>
          </div>
          
          <div class="route-actions">
            <embossed-button color="primary" @click="viewRoute(route.id)">
              View Route
            </embossed-button>
            <embossed-button color="secondary" @click="getDirections(route.id)">
              How to Get Here
            </embossed-button>
          </div>
        </div>
      </div>
      
      <div class="disclaimer">
        <p><strong>Note:</strong> This is a teaching tool, not a real-time tracker. Route information is based on static data.</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import EmbossedButton from 'components/EmbossedButton.vue'

export default {
  name: 'PagnaamPage',
  components: {
    EmbossedButton
  },
  data() {
    return {
      searchQuery: '',
      routes: [
        {
          id: 'route-1',
          name: 'Route 1',
          description: 'SM Baguio to Burnham Park',
          color: '#2E5D3E',
          terminalStart: 'SM Baguio Terminal',
          terminalEnd: 'Burnham Park Terminal',
          fare: 15,
          operatingHours: '5:00 AM - 10:00 PM',
          estimatedDuration: 25
        },
        {
          id: 'route-2',
          name: 'Route 2',
          description: 'Burnham Park to Mines View',
          color: '#8D6E63',
          terminalStart: 'Burnham Park Terminal',
          terminalEnd: 'Mines View Terminal',
          fare: 20,
          operatingHours: '5:30 AM - 9:30 PM',
          estimatedDuration: 30
        },
        {
          id: 'route-3',
          name: 'Route 3',
          description: 'Session Road to Baguio Cathedral',
          color: '#4A7D5D',
          terminalStart: 'Session Road Terminal',
          terminalEnd: 'Baguio Cathedral Terminal',
          fare: 12,
          operatingHours: '6:00 AM - 10:00 PM',
          estimatedDuration: 20
        }
      ]
    }
  },
  methods: {
    viewRoute(routeId) {
      console.log('Viewing route:', routeId)
    },
    getDirections(routeId) {
      console.log('Getting directions for route:', routeId)
    }
  }
}
</script>

<style scoped>
.pagnaam-container {
  max-width: 800px;
  width: 100%;
  padding: 20px;
}

.title {
  color: #2e5d3e;
  font-size: 2rem;
  margin: 0 0 10px 0;
  text-align: center;
}

.subtitle {
  color: #8d6e63;
  font-size: 1.1rem;
  margin: 0 0 30px 0;
  text-align: center;
}

.search-section {
  margin-bottom: 24px;
}

.search-input {
  width: 100%;
}

.routes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.route-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.route-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-left: 8px;
  border-left: 4px solid #2e5d3e;
}

.route-info {
  flex: 1;
}

.route-name {
  color: #2e5d3e;
  margin: 0 0 4px 0;
  font-size: 1.2rem;
}

.route-description {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.route-fare {
  font-weight: bold;
  color: #8d6e63;
  font-size: 1.1rem;
  align-self: center;
}

.route-details {
  margin-bottom: 16px;
}

.route-terminals {
  margin-bottom: 12px;
}

.terminal {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #555;
}

.terminal:last-child {
  margin-bottom: 0;
}

.route-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.stat {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #555;
  gap: 4px;
}

.route-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.disclaimer {
  background: #fff8e1;
  border-left: 4px solid #ffc107;
  padding: 12px;
  border-radius: 4px;
  text-align: left;
}

.disclaimer p {
  margin: 0;
  color: #5d4037;
}

@media (max-width: 768px) {
  .pagnaam-container {
    padding: 16px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .routes-grid {
    grid-template-columns: 1fr;
  }
  
  .route-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .route-fare {
    margin-top: 8px;
  }
  
  .route-actions {
    flex-direction: column;
  }
}
</style>