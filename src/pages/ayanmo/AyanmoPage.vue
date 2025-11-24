<template>
  <q-page class="flex flex-center">
    <div class="ayanmo-container">
      <h2 class="title">AYAN MO (Near Me)</h2>
      <p class="subtitle">Suggestions for nearby places based on your location</p>
      
      <div class="location-section">
        <embossed-button color="primary" @click="getCurrentLocation" class="location-btn">
          <q-icon name="my_location" left />
          Find My Location
        </embossed-button>
        
        <div v-if="location" class="location-info">
          <p>Current location: {{ location }}</p>
        </div>
      </div>
      
      <div class="category-section">
        <h3>Nearby Categories</h3>
        <div class="category-buttons">
          <embossed-button 
            v-for="category in categories" 
            :key="category.id"
            :color="selectedCategories.includes(category.id) ? 'primary' : 'secondary'"
            @click="toggleCategory(category.id)"
            class="category-btn"
          >
            {{ category.name }}
          </embossed-button>
        </div>
      </div>
      
      <div class="places-section">
        <h3>Nearby Places</h3>
        <div v-if="nearbyPlaces.length > 0" class="places-grid">
          <div v-for="place in nearbyPlaces" :key="place.id" class="place-card">
            <div class="place-header">
              <h4 class="place-name">{{ place.name }}</h4>
              <span class="place-distance">{{ place.distanceMeters }}m away</span>
            </div>
            
            <p class="place-category">{{ place.category }}</p>
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
        <div v-else class="no-places">
          <p>Enable location services to find nearby places</p>
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
  name: 'AyanmoPage',
  components: {
    EmbossedButton
  },
  data() {
    return {
      location: null,
      selectedCategories: ['all'],
      categories: [
        { id: 'all', name: 'All' },
        { id: 'tourist', name: 'Tourist Spots' },
        { id: 'food', name: 'Restaurants' },
        { id: 'accommodation', name: 'Hotels' },
        { id: 'shopping', name: 'Shopping' },
        { id: 'transport', name: 'Transportation' }
      ],
      nearbyPlaces: [
        {
          id: 'place-1',
          name: 'Burnham Park',
          description: 'Iconic park in the heart of Baguio with a beautiful man-made lake',
          category: 'Tourist Spot',
          distanceMeters: 250
        },
        {
          id: 'place-2',
          name: 'Session Road',
          description: 'Popular shopping and dining district in Baguio City',
          category: 'Shopping',
          distanceMeters: 400
        },
        {
          id: 'place-3',
          name: 'Baguio Cathedral',
          description: 'Famous cathedral with distinctive blue dome and beautiful architecture',
          category: 'Tourist Spot',
          distanceMeters: 600
        }
      ]
    }
  },
  methods: {
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location = `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`;
            // In a real app, we would use this location to find nearby places
            // For now, we'll just show the example places
          },
          (error) => {
            console.error('Error getting location:', error);
            this.location = 'Location access denied or unavailable';
          }
        );
      } else {
        this.location = 'Geolocation not supported by this browser';
      }
    },
    toggleCategory(categoryId) {
      if (categoryId === 'all') {
        // If 'all' is selected, clear other selections
        if (!this.selectedCategories.includes('all')) {
          this.selectedCategories = ['all'];
        } else {
          this.selectedCategories = [];
        }
      } else {
        // Remove 'all' if it's selected
        if (this.selectedCategories.includes('all')) {
          this.selectedCategories = this.selectedCategories.filter(id => id !== 'all');
        }
        
        // Toggle the category
        if (this.selectedCategories.includes(categoryId)) {
          this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
          // If no categories are selected, default to 'all'
          if (this.selectedCategories.length === 0) {
            this.selectedCategories = ['all'];
          }
        } else {
          this.selectedCategories.push(categoryId);
        }
      }
    },
    getDirections(placeId) {
      console.log('Getting directions to place:', placeId);
      // Navigate to directions page or open directions modal
    },
    openCommunity(placeId) {
      window.open('https://facebook.com/sabaguio', '_blank');
    }
  }
}
</script>

<style scoped>
.ayanmo-container {
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

.location-section {
  text-align: center;
  margin-bottom: 24px;
}

.location-btn {
  margin-bottom: 12px;
}

.location-info {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
  color: #555;
}

.category-section {
  margin-bottom: 24px;
}

.category-section h3 {
  color: #2e5d3e;
  margin: 0 0 16px 0;
  text-align: center;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.category-btn {
  padding: 8px 16px !important;
  font-size: 14px !important;
}

.places-section h3 {
  color: #2e5d3e;
  margin: 0 0 16px 0;
  text-align: center;
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
  margin-bottom: 8px;
}

.place-name {
  color: #2e5d3e;
  margin: 0 0 4px 0;
  font-size: 1.1rem;
}

.place-distance {
  font-size: 0.85rem;
  color: #8d6e63;
  align-self: center;
}

.place-category {
  font-size: 0.9rem;
  color: #8d6e63;
  margin: 0 0 8px 0;
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

.no-places {
  text-align: center;
  padding: 40px 20px;
  color: #666;
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
  .ayanmo-container {
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
  
  .place-distance {
    margin-top: 4px;
  }
  
  .place-actions {
    flex-direction: column;
  }
}
</style>