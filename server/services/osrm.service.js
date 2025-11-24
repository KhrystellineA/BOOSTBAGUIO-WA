const axios = require('axios');

// Service for interacting with OSRM (Open Source Routing Machine) for route calculations
// Note: Since OSRM is not a free service, we'll implement a mock version that simulates
// route calculations using our own spatial service for the Boost Baguio implementation
const osrmService = {
  // Get route between two points using OSRM (mock implementation)
  async getRoute(start, end) {
    // In a real implementation, this would call an OSRM service
    // For Boost Baguio, we'll use our own spatial service to calculate distances
    const { calculateRoute } = require('./spatial.service');
    
    const routeInfo = await calculateRoute(
      start.lat, 
      start.lng, 
      end.lat, 
      end.lng
    );
    
    // Format the response to match OSRM format
    return {
      code: 'Ok',
      waypoints: [
        {
          name: 'Start Point',
          location: [start.lng, start.lat]
        },
        {
          name: 'End Point',
          location: [end.lng, end.lat]
        }
      ],
      routes: [
        {
          geometry: {
            coordinates: [
              [start.lng, start.lat],
              [end.lng, end.lat]
            ],
            type: 'LineString'
          },
          legs: [
            {
              steps: [
                {
                  maneuver: {
                    type: 'depart',
                    location: [start.lng, start.lat]
                  },
                  geometry: {
                    coordinates: [
                      [start.lng, start.lat],
                      [end.lng, end.lat]
                    ],
                    type: 'LineString'
                  },
                  name: 'Route',
                  duration: routeInfo.duration,
                  distance: routeInfo.distance
                }
              ],
              summary: 'Direct route',
              duration: routeInfo.duration,
              distance: routeInfo.distance
            }
          ],
          duration: routeInfo.duration,
          distance: routeInfo.distance,
          weight_name: 'routability',
          weight: routeInfo.duration
        }
      ]
    };
  },

  // Get nearest road network point to a coordinate
  async getNearest(lat, lng) {
    // In a real implementation, this would call OSRM's nearest service
    // For now, we'll return the point itself as the nearest
    return {
      code: 'Ok',
      waypoints: [
        {
          hint: 'mock_hint',
          distance: 0,
          name: 'Nearest Point',
          location: [lng, lat]
        }
      ]
    };
  },

  // Get trip between multiple points (for complex routes with waypoints)
  async getTrip(locations) {
    // In a real implementation, this would call OSRM's trip service
    // For now, we'll return a simple trip between the first and last points
    if (locations.length < 2) {
      throw new Error('At least 2 locations required for a trip');
    }
    
    const start = locations[0];
    const end = locations[locations.length - 1];
    
    const routeInfo = await this.getRoute(
      { lat: start[1], lng: start[0] },
      { lat: end[1], lng: end[0] }
    );
    
    return routeInfo;
  }
};

module.exports = osrmService;