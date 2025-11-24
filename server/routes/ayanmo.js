const express = require('express');
const router = express.Router();

// AYAN MO (Near Me) - Feature #5
// Purpose: Suggest nearby places based on user's current location

// Get nearby places based on user's location
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, category, radius = 5000 } = req.query; // radius in meters
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // In a real implementation, this would use PostGIS to calculate nearby places
    // For now, return mock data following the specification
    
    const nearbyPlaces = [
      {
        placeId: "place-1",
        name: "Burnham Park",
        category: "Tourist Spot",
        distanceMeters: 250,
        directionsTo: "Walk 250m northwest",
        position: { lat: 16.4178, lng: 120.6012 },
        routesToAccess: ["route-1", "route-2"]
      },
      {
        placeId: "place-2",
        name: "Session Road",
        category: "Shopping & Dining",
        distanceMeters: 800,
        directionsTo: "Walk 800m east",
        position: { lat: 16.4145, lng: 120.5972 },
        routesToAccess: ["route-1", "route-2", "route-3"]
      },
      {
        placeId: "place-3",
        name: "Mines View",
        category: "Tourist Spot",
        distanceMeters: 2100,
        directionsTo: "Take Route 2 jeepney for 30 minutes",
        position: { lat: 16.4015, lng: 120.5863 },
        routesToAccess: ["route-2"]
      }
    ];

    // Filter by category if provided
    let filteredPlaces = nearbyPlaces;
    if (category) {
      filteredPlaces = nearbyPlaces.filter(place => 
        place.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    res.json({
      userLocation: { lat: parseFloat(lat), lng: parseFloat(lng) },
      nearbyPlaces: filteredPlaces,
      radiusMeters: parseInt(radius)
    });
  } catch (error) {
    console.error('Error fetching nearby places:', error.message);
    res.status(500).json({ error: 'Failed to fetch nearby places' });
  }
});

// Get nearby events based on user's location
router.get('/nearby/events', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Mock data for nearby events
    const nearbyEvents = [
      {
        eventId: "event-1",
        name: "Street Food Festival",
        venue: "Burnham Park",
        venuePosition: { lat: 16.4178, lng: 120.6012 },
        distanceMeters: 250,
        startDate: "2025-02-15T10:00:00",
        endDate: "2025-02-17T20:00:00",
        routesToAccess: ["route-1", "route-2"]
      }
    ];

    res.json({
      userLocation: { lat: parseFloat(lat), lng: parseFloat(lng) },
      nearbyEvents,
      radiusMeters: parseInt(radius)
    });
  } catch (error) {
    console.error('Error fetching nearby events:', error.message);
    res.status(500).json({ error: 'Failed to fetch nearby events' });
  }
});

module.exports = router;