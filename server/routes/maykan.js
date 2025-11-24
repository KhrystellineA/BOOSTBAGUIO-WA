const express = require('express');
const router = express.Router();
const axios = require('axios');

// MAYKAN (Places) - Feature #3
// Purpose: Provide information about tourist spots, popular places, and establishments in Baguio City with commute instructions

// Get all places
router.get('/places', async (req, res) => {
  try {
    // In a real implementation, this would fetch from the database
    // For now, return mock data following the specification
    
    const places = [
      {
        placeId: "place-1",
        name: "Burnham Park",
        description: "Iconic park in the heart of Baguio",
        category: "Tourist Spot",
        address: "Magsaysay Ave, Baguio, Benguet",
        position: { lat: 16.4178, lng: 120.6012 },
        imageUrls: ["https://example.com/burnham1.jpg"],
        routesToAccess: ["route-1", "route-2"]
      },
      {
        placeId: "place-2",
        name: "Mines View",
        description: "Scenic viewpoint with panoramic views of Baguio",
        category: "Tourist Spot",
        address: "Kisad, Baguio, Benguet",
        position: { lat: 16.4015, lng: 120.5863 },
        imageUrls: ["https://example.com/minesview1.jpg"],
        routesToAccess: ["route-2", "route-3"]
      },
      {
        placeId: "place-3",
        name: "Session Road",
        description: "Popular street with restaurants, bars, and shops",
        category: "Shopping & Dining",
        address: "Session Road, Baguio, Benguet",
        position: { lat: 16.4145, lng: 120.5972 },
        imageUrls: ["https://example.com/sessionroad1.jpg"],
        routesToAccess: ["route-1", "route-2", "route-3"]
      }
    ];

    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error.message);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// Get places by category
router.get('/places/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    // Mock data filtered by category
    const places = [
      {
        placeId: "place-1",
        name: "Burnham Park",
        description: "Iconic park in the heart of Baguio",
        category: category,
        address: "Magsaysay Ave, Baguio, Benguet",
        position: { lat: 16.4178, lng: 120.6012 },
        imageUrls: ["https://example.com/burnham1.jpg"],
        routesToAccess: ["route-1", "route-2"]
      }
    ];

    res.json(places);
  } catch (error) {
    console.error('Error fetching places by category:', error.message);
    res.status(500).json({ error: 'Failed to fetch places by category' });
  }
});

// Get specific place by ID
router.get('/places/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock data for a specific place
    const place = {
      placeId: id,
      name: "Sample Place",
      description: "Sample place description",
      category: "Tourist Spot",
      address: "Sample Address, Baguio, Benguet",
      position: { lat: 16.4178, lng: 120.6012 },
      imageUrls: ["https://example.com/sample.jpg"],
      routesToAccess: ["route-1", "route-2"],
      howToGetThere: {
        routeOptions: [
          {
            optionId: "route-1",
            jeepneyName: "Route 1",
            terminalStart: "SM Baguio Terminal",
            terminalEnd: "Burnham Park Terminal",
            steps: [
              {
                stepNumber: 1,
                type: "walk",
                description: "Walk 200m to SM Baguio Terminal",
                distance: 200,
                duration: 3
              },
              {
                stepNumber: 2,
                type: "jeepney",
                description: "Take Route 1 jeepney from SM Baguio to Burnham Park",
                fare: 15,
                duration: 20
              },
              {
                stepNumber: 3,
                type: "walk",
                description: "Walk 100m to your destination",
                distance: 100,
                duration: 2
              }
            ],
            totalFare: 15,
            totalDuration: 25,
            totalDistance: 0.4
          }
        ]
      },
      facebookGroupLink: "https://facebook.com/groups/sabaguio"
    };

    res.json(place);
  } catch (error) {
    console.error('Error fetching place:', error.message);
    res.status(500).json({ error: 'Failed to fetch place' });
  }
});

// Search places using OSM API
router.get('/search', async (req, res) => {
  try {
    const { query, lat, lng } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Use OSM API to search for places in Baguio
    let url = 'https://nominatim.openstreetmap.org/search';
    let params = {
      q: `${query}, Baguio, Philippines`,
      format: 'json',
      addressdetails: 1,
      limit: 10
    };

    // If coordinates are provided, search nearby
    if (lat && lng) {
      params = {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 10,
        nearlat: lat,
        nearlon: lng
      };
    }

    const response = await axios.get(url, { params });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching places:', error.message);
    res.status(500).json({ error: 'Failed to search places' });
  }
});

module.exports = router;