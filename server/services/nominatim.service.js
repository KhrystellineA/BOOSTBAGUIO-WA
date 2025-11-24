const axios = require('axios');
const config = require('../config/env');

// Service for interacting with Nominatim API (OpenStreetMap geocoding)
const nominatimService = {
  // Search for locations using Nominatim
  async searchLocations(query, limit = 10) {
    try {
      const response = await axios.get(`${config.nominatimEndpoint}/search`, {
        params: {
          q: `${query}, Baguio, Philippines`,
          format: 'json',
          addressdetails: 1,
          limit: limit
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error searching locations with Nominatim:', error.message);
      throw new Error('Failed to search locations');
    }
  },

  // Reverse geocode coordinates to get location details
  async reverseGeocode(lat, lng) {
    try {
      const response = await axios.get(`${config.nominatimEndpoint}/reverse`, {
        params: {
          lat: lat,
          lon: lng,
          format: 'json',
          addressdetails: 1
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error with reverse geocoding:', error.message);
      throw new Error('Failed to reverse geocode coordinates');
    }
  }
};

module.exports = nominatimService;