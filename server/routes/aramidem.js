const express = require('express');
const router = express.Router();

// ARAMIDEM (Events) - Feature #4
// Purpose: Provide information about upcoming events in Baguio City with transportation details

// Get all events
router.get('/events', async (req, res) => {
  try {
    // In a real implementation, this would fetch from the database
    // For now, return mock data following the specification
    
    const events = [
      {
        eventId: "event-1",
        name: "Panagbenga Festival",
        description: "Annual flower festival celebrating the city's founding anniversary",
        startDate: "2025-02-01T08:00:00",
        endDate: "2025-02-28T22:00:00",
        venue: "Burnham Park",
        venuePosition: { lat: 16.4178, lng: 120.6012 },
        routesToAccess: ["route-1", "route-2"],
        imageUrl: "https://example.com/panagbenga.jpg",
        facebookGroupLink: "https://facebook.com/groups/sabaguio"
      },
      {
        eventId: "event-2",
        name: "Baguio Arts Festival",
        description: "Showcasing local artists and their works",
        startDate: "2025-03-15T10:00:00",
        endDate: "2025-03-22T18:00:00",
        venue: "Session Road",
        venuePosition: { lat: 16.4145, lng: 120.5972 },
        routesToAccess: ["route-1", "route-2", "route-3"],
        imageUrl: "https://example.com/baguioarts.jpg",
        facebookGroupLink: "https://facebook.com/groups/sabaguio"
      }
    ];

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get events by date range
router.get('/events/date', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Mock data filtered by date
    const events = [
      {
        eventId: "event-1",
        name: "Sample Event",
        description: "Sample event description",
        startDate: startDate || "2025-02-01T08:00:00",
        endDate: endDate || "2025-02-01T22:00:00",
        venue: "Sample Venue",
        venuePosition: { lat: 16.4178, lng: 120.6012 },
        routesToAccess: ["route-1"],
        imageUrl: "https://example.com/sample-event.jpg",
        facebookGroupLink: "https://facebook.com/groups/sabaguio"
      }
    ];

    res.json(events);
  } catch (error) {
    console.error('Error fetching events by date:', error.message);
    res.status(500).json({ error: 'Failed to fetch events by date' });
  }
});

// Get specific event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock data for a specific event
    const event = {
      eventId: id,
      name: "Sample Event",
      description: "Sample event description",
      startDate: "2025-02-01T08:00:00",
      endDate: "2025-02-01T22:00:00",
      venue: "Sample Venue",
      venuePosition: { lat: 16.4178, lng: 120.6012 },
      routesToAccess: ["route-1", "route-2"],
      imageUrl: "https://example.com/sample-event.jpg",
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
                description: "Walk 100m to event venue",
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

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error.message);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

module.exports = router;