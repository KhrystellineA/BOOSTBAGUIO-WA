const express = require('express');
const router = express.Router();
const axios = require('axios');

// Import services
const nominatimService = require('../services/nominatim.service');
const osrmService = require('../services/osrm.service');
const spatialService = require('../services/spatial.service');

// APANAM (P2P Navigation) - Feature #1
// Purpose: Provide step-by-step navigation instructions between any two points in Baguio City using the jeepney system

// Search locations using Nominatim API
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Use the Nominatim service to search for locations in Baguio
    const locations = await nominatimService.searchLocations(query);
    
    res.json(locations);
  } catch (error) {
    console.error('Error searching locations:', error.message);
    res.status(500).json({ error: 'Failed to search locations' });
  }
});

// Get route options between two points
router.post('/route', async (req, res) => {
  try {
    const { start, end } = req.body;
    
    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end points are required' });
    }

    // In a real implementation, we would calculate actual routes using jeepney routes
    // For now, we'll return mock data that follows the specification
    // But we'll use our spatial service to calculate real distances
    
    // Calculate direct distance between points
    const directRoute = await spatialService.calculateRoute(
      start.lat, start.lng, 
      end.lat, end.lng
    );
    
    // Generate route options that would use jeepneys in Baguio
    // This is a simplified implementation - in reality, we'd match with actual jeepney routes
    const routeOptions = [{
      optionId: "route-1",
      jeepneyName: "Route 1",
      terminalStart: "SM Baguio Terminal",
      terminalEnd: "Burnham Park Terminal",
      steps: [
        {
          stepNumber: 1,
          type: "walk",
          description: `Walk ${Math.round(directRoute.distance * 0.1)}m to SM Baguio Terminal`,
          distance: Math.round(directRoute.distance * 0.1),
          duration: Math.round(directRoute.duration * 0.1)
        },
        {
          stepNumber: 2,
          type: "jeepney",
          description: "Take Route 1 jeepney from SM Baguio to Burnham Park",
          fare: 15,
          duration: Math.round(directRoute.duration * 0.8)
        },
        {
          stepNumber: 3,
          type: "walk",
          description: `Walk ${Math.round(directRoute.distance * 0.15)}m to your destination`,
          distance: Math.round(directRoute.distance * 0.15),
          duration: Math.round(directRoute.duration * 0.15)
        }
      ],
      totalFare: 15,
      totalDuration: directRoute.duration,
      totalDistance: directRoute.distance / 1000 // Convert to km
    }];

    res.json({
      routeOptions,
      disclaimer: "This is a teaching tool, not a real-time tracker. Route information is static and for educational purposes."
    });
  } catch (error) {
    console.error('Error calculating route:', error.message);
    res.status(500).json({ error: 'Failed to calculate route' });
  }
});

module.exports = router;