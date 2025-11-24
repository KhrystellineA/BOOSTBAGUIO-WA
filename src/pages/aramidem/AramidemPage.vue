<template>
  <q-page class="flex flex-center">
    <div class="aramidem-container">
      <h2 class="title">ARAMIDEM (Events)</h2>
      <p class="subtitle">Upcoming events in Baguio with transportation details</p>
      
      <div class="search-section">
        <q-input 
          v-model="searchQuery" 
          placeholder="Search for events, festivals, or activities" 
          outlined 
          class="search-input"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        
        <div class="filter-buttons">
          <embossed-button 
            v-for="filter in filters" 
            :key="filter.id"
            :color="selectedFilter === filter.id ? 'primary' : 'secondary'"
            @click="selectFilter(filter.id)"
            class="filter-btn"
          >
            {{ filter.name }}
          </embossed-button>
        </div>
      </div>
      
      <div class="events-grid">
        <div v-for="event in events" :key="event.id" class="event-card">
          <div class="event-header">
            <h3 class="event-name">{{ event.name }}</h3>
            <span class="event-date">{{ formatDate(event.startDate) }}</span>
          </div>
          
          <p class="event-description">{{ event.description }}</p>
          
          <div class="event-details">
            <div class="event-venue">
              <q-icon name="location_on" color="primary" />
              <span>{{ event.venue }}</span>
            </div>
            <div class="event-time">
              <q-icon name="schedule" color="secondary" />
              <span>{{ formatTime(event.startDate) }} - {{ formatTime(event.endDate) }}</span>
            </div>
          </div>
          
          <div class="event-actions">
            <embossed-button color="primary" @click="getDirections(event.id)">
              How to Get There
            </embossed-button>
            <embossed-button color="secondary" @click="openCommunity(event.id)">
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
  name: 'AramidemPage',
  components: {
    EmbossedButton
  },
  data() {
    return {
      searchQuery: '',
      selectedFilter: 'all',
      filters: [
        { id: 'all', name: 'All Events' },
        { id: 'festival', name: 'Festivals' },
        { id: 'concert', name: 'Concerts' },
        { id: 'market', name: 'Markets' },
        { id: 'workshop', name: 'Workshops' }
      ],
      events: [
        {
          id: 'event-1',
          name: 'Panagbenga Festival',
          description: 'Annual flower festival celebrating the blooming of flowers in Baguio',
          venue: 'Burnham Park',
          startDate: '2025-02-01T08:00:00',
          endDate: '2025-02-28T22:00:00',
          routesToAccess: ['route-1', 'route-2']
        },
        {
          id: 'event-2',
          name: 'Baguio Night Market',
          description: 'Weekly night market featuring local food, crafts, and entertainment',
          venue: 'Session Road',
          startDate: '2025-01-15T17:00:00',
          endDate: '2025-01-15T23:00:00',
          routesToAccess: ['route-3', 'route-5']
        },
        {
          id: 'event-3',
          name: 'Strawberry Festival',
          description: 'Celebrate the famous Benguet strawberries with various activities',
          venue: 'La Trinidad, Benguet',
          startDate: '2025-04-10T09:00:00',
          endDate: '2025-04-12T18:00:00',
          routesToAccess: ['route-4', 'route-6']
        }
      ]
    }
  },
  methods: {
    selectFilter(filterId) {
      this.selectedFilter = filterId
    },
    getDirections(eventId) {
      console.log('Getting directions to event:', eventId)
      // Navigate to directions page or open directions modal
    },
    openCommunity(eventId) {
      window.open('https://facebook.com/sabaguio', '_blank')
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    },
    formatTime(dateString) {
      const date = new Date(dateString)
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }
}
</script>

<style scoped>
.aramidem-container {
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

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.event-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.event-name {
  color: #2e5d3e;
  margin: 0 0 4px 0;
  font-size: 1.2rem;
}

.event-date {
  font-size: 0.85rem;
  color: #8d6e63;
  align-self: center;
}

.event-description {
  color: #666;
  margin: 0 0 16px 0;
  font-size: 0.95rem;
}

.event-details {
  margin-bottom: 16px;
}

.event-venue,
.event-time {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #555;
}

.event-venue:last-child,
.event-time:last-child {
  margin-bottom: 0;
}

.event-actions {
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
  .aramidem-container {
    padding: 16px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .event-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .event-date {
    margin-top: 4px;
  }
  
  .event-actions {
    flex-direction: column;
  }
}
</style>