const express = require('express');
const router = express.Router();
const axios = require('axios');

// PAGNAAM (City Jeeps) - Feature #2
// Purpose: Provide comprehensive information about all jeepney routes operating in Baguio City

// Get all jeepney routes
router.get('/routes', async (req, res) => {
  try {
    // In a real implementation, this would fetch from the database
    // For now, return mock data following the specification
    
    const routes = [
      {
        routeId: "route-1",
        name: "Route 1",
        description: "SM Baguio to Burnham Park",
        color: "#2E5D3E",
        terminalStart: "SM Baguio Terminal",
        terminalEnd: "Burnham Park Terminal",
        stops: [
          {name: "SM Baguio", lat: 16.4122, lng: 120.5948},
          {name: "Session Road", lat: 16.4145, lng: 120.5972},
          {name: "Burnham Park", lat: 16.4178, lng: 120.6012}
        ],
        fare: 15,
        operatingHours: "5:00 AM - 10:00 PM",
        estimatedDuration: 25,
        isActive: true
      },
      {
        routeId: "route-2",
        name: "Route 2",
        description: "Burnham Park to Mines View",
        color: "#8D6E63",
        terminalStart: "Burnham Park Terminal",
        terminalEnd: "Mines View Terminal",
        stops: [
          {name: "Burnham Park", lat: 16.4178, lng: 120.6012},
          {name: "Session Road", lat: 16.4145, lng: 120.5972},
          {name: "Mines View", lat: 16.4015, lng: 120.5863}
        ],
        fare: 12,
        operatingHours: "5:30 AM - 9:30 PM",
        estimatedDuration: 30,
        isActive: true
      }
    ];

    res.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error.message);
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
});

// Get specific route by ID
router.get('/routes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock data for a specific route
    const route = {
      routeId: id,
      name: `Route ${id.split('-')[1]}`,
      description: "Sample route description",
      color: "#2E5D3E",
      terminalStart: "Sample Terminal Start",
      terminalEnd: "Sample Terminal End",
      stops: [
        {name: "Stop 1", lat: 16.4122, lng: 120.5948},
        {name: "Stop 2", lat: 16.4145, lng: 120.5972},
        {name: "Stop 3", lat: 16.4178, lng: 120.6012}
      ],
      fare: 15,
      operatingHours: "5:00 AM - 10:00 PM",
      estimatedDuration: 25,
      isActive: true,
      howToIdentify: "Look for the route number displayed on the front and side of the jeepney, and check the destination sign."
    };

    res.json(route);
  } catch (error) {
    console.error('Error fetching route:', error.message);
    res.status(500).json({ error: 'Failed to fetch route' });
  }
});

// Get route data from Overpass API
router.get('/overpass', async (req, res) => {
  try {
    // Query Overpass API for jeepney routes in Baguio
    const query = `[out:json]; area["name"="Baguio"]->.baguio; (way["route"="bus"](area.baguio);); out body;`;
    const encodedQuery = encodeURIComponent(query);
    
    const response = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodedQuery}`);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Overpass API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Overpass API' });
  }
});

module.exports = router;