<template>
  <q-page class="flex flex-center">
    <div class="maykan-container">
      <h2 class="title">MAYKAN (Places)</h2>
      <p class="subtitle">Discover tourist spots and how to get there via jeepney</p>
      
      <div class="search-section">
        <q-input 
          v-model="searchQuery" 
          placeholder="Search for places, attractions, or activities" 
          outlined 
          class="search-input"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        
        <div class="filter-buttons">
          <embossed-button 
            v-for="category in categories" 
            :key="category.id"
            :color="selectedCategory === category.id ? 'primary' : 'secondary'"
            @click="selectCategory(category.id)"
            class="filter-btn"
          >
            {{ category.name }}
          </embossed-button>
        </div>
      </div>
      
      <div class="places-grid">
        <div v-for="place in places" :key="place.id" class="place-card">
          <div class="place-header">
            <h3 class="place-name">{{ place.name }}</h3>
            <span class="place-category">{{ place.category }}</span>
          </div>
          
          <p class="place-description">{{ place.description }}</p>
          
          <div class="place-actions">
            <embossed-button color="primary" @click="getDirections(place.id)">
              How to Get Here
            </embossed-button>
            <embossed-button color="secondary" @click="openCommunity(place.id)">
              View in Sa Baguio
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
  name: 'MaykanPage',
  components: {
    EmbossedButton
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      categories: [
        { id: 'all', name: 'All' },
        { id: 'tourist', name: 'Tourist Spots' },
        { id: 'food', name: 'Restaurants' },
        { id: 'accommodation', name: 'Hotels' },
        { id: 'shopping', name: 'Shopping' }
      ],
      places: [
        {
          id: 'place-1',
          name: 'Burnham Park',
          description: 'Iconic park in the heart of Baguio with a beautiful man-made lake',
          category: 'Tourist Spot',
          routesToAccess: ['route-1', 'route-2']
        },
        {
          id: 'place-2',
          name: 'Mines View',
          description: 'Scenic viewpoint overlooking the old mining site with souvenir shops',
          category: 'Tourist Spot',
          routesToAccess: ['route-2', 'route-4']
        },
        {
          id: 'place-3',
          name: 'Baguio Cathedral',
          description: 'Famous cathedral with distinctive blue dome and beautiful architecture',
          category: 'Tourist Spot',
          routesToAccess: ['route-3', 'route-5']
        }
      ]
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId
    },
    getDirections(placeId) {
      console.log('Getting directions to place:', placeId)
      // Navigate to directions page or open directions modal
    },
    openCommunity(placeId) {
      window.open('https://facebook.com/sabaguio', '_blank')
    }
  }
}
</script>

<style scoped>
.maykan-container {
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
  margin-bottom: 16px;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.filter-btn {
  padding: 6px 12px !important;
  font-size: 14px !important;
}

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.place-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.place-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.place-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.place-name {
  color: #2e5d3e;
  margin: 0 0 4px 0;
  font-size: 1.2rem;
}

.place-category {
  font-size: 0.8rem;
  color: #8d6e63;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  align-self: center;
}

.place-description {
  color: #666;
  margin: 0 0 16px 0;
  font-size: 0.95rem;
}

.place-actions {
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
  .maykan-container {
    padding: 16px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .places-grid {
    grid-template-columns: 1fr;
  }
  
  .place-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .place-category {
    margin-top: 8px;
  }
  
  .place-actions {
    flex-direction: column;
  }
}
</style>