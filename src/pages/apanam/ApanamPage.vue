<template>
  <q-page class="flex flex-center">
    <div class="apanam-container">
      <h2 class="title">APANAM (P2P Navigation)</h2>
      <p class="subtitle">Navigate from point A to point B using Baguio's jeepney system</p>
      
      <div class="search-section">
        <div class="input-group">
          <label>Starting Point</label>
          <q-input 
            v-model="startPoint" 
            placeholder="Enter starting location" 
            outlined 
            class="input-field"
          />
        </div>
        
        <div class="input-group">
          <label>Destination</label>
          <q-input 
            v-model="destination" 
            placeholder="Enter destination" 
            outlined 
            class="input-field"
          />
        </div>
        
        <embossed-button color="primary" @click="findRoute" class="search-btn">
          Find Route
        </embossed-button>
      </div>
      
      <div v-if="showResults" class="results-section">
        <h3>Available Routes</h3>
        <div class="route-option">
          <div class="route-header">
            <span class="route-name">Route 1: SM Baguio to Burnham Park</span>
            <span class="route-fare">₱15</span>
          </div>
          <div class="route-steps">
            <div class="step">
              <span class="step-number">1</span>
              <span class="step-text">Walk 200m to SM Baguio Terminal</span>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <span class="step-text">Take Route 1 jeepney from SM Baguio to Burnham Park</span>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <span class="step-text">Walk 100m to your destination</span>
            </div>
          </div>
          <embossed-button color="success" class="action-btn">
            Save Route
          </embossed-button>
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
  name: 'apanamPage',
  components: {
    EmbossedButton
  },
  data() {
    return {
      startPoint: '',
      destination: '',
      showResults: false
    }
  },
  methods: {
    findRoute() {
      if (this.startPoint && this.destination) {
        this.showResults = true
      }
    }
  }
}
</script>

<style scoped>
.apanam-container {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  text-align: center;
}

.title {
  color: #2e5d3e;
  font-size: 2rem;
  margin: 0 0 10px 0;
}

.subtitle {
  color: #8d6e63;
  font-size: 1.1rem;
  margin: 0 0 30px 0;
}

.search-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
}

.input-group {
  margin-bottom: 16px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #2e5d3e;
  font-weight: 500;
}

.input-field {
  width: 100%;
}

.search-btn {
  margin-top: 16px;
  width: 100%;
  max-width: 200px;
}

.results-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
}

.route-option {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #eee;
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.route-name {
  font-weight: 500;
  color: #2e5d3e;
}

.route-fare {
  font-weight: bold;
  color: #8d6e63;
}

.route-steps {
  margin-bottom: 16px;
}

.step {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #2e5d3e;
  color: white;
  border-radius: 50%;
  margin-right: 12px;
  font-size: 12px;
  font-weight: bold;
}

.step-text {
  flex: 1;
  text-align: left;
  color: #666;
}

.action-btn {
  width: 100%;
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
  .apanam-container {
    padding: 16px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .route-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .route-fare {
    margin-top: 8px;
  }
}
</style>