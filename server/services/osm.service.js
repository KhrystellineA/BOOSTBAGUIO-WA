const axios = require('axios');
const config = require('../config/env');

// Service for interacting with OpenStreetMap APIs
const osmService = {
  // Search for points of interest using OSM
  async searchPOI(query, lat, lng, radius = 5000) {
    try {
      let url = `${config.nominatimEndpoint}/search`;
      let params = {
        q: query,
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
          nearlon: lng,
          bounded: 1
        };
      }

      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching POI with OSM:', error.message);
      throw new Error('Failed to search points of interest');
    }
  },

  // Get places around a specific location using OSM
  async getPlacesAround(lat, lng, tags = ['tourism', 'amenity'], radius = 5000) {
    try {
      // This is a simplified implementation
      // In a real implementation, we'd use the Overpass API directly
      const query = `[out:json];(node["tourism"~"attraction|hotel|restaurant|cafe|bar|park"](around:${radius},${lat},${lng});node["amenity"~"hospital|school|university|library|police"](around:${radius},${lat},${lng}););out;`;
      const encodedQuery = encodeURIComponent(query);
      
      const response = await axios.get(`${config.overpassEndpoint}?data=${encodedQuery}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching places around location:', error.message);
      throw new Error('Failed to fetch places around location');
    }
  },

  // Get map features (roads, buildings, etc.) for visualization
  async getMapFeatures(lat, lng, zoom = 15) {
    try {
      // Calculate bounding box for the area
      const latDiff = 0.01; // Approximate for zoom level 15
      const lngDiff = 0.01;
      
      const bbox = [
        lng - lngDiff,
        lat - latDiff,
        lng + lngDiff,
        lat + latDiff
      ].join(',');
      
      // Query for roads and other features in the area
      const query = `[out:json];(way["highway"](bbox:${bbox});way["building"](bbox:${bbox});way["amenity"](bbox:${bbox}););out;`;
      const encodedQuery = encodeURIComponent(query);
      
      const response = await axios.get(`${config.overpassEndpoint}?data=${encodedQuery}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching map features:', error.message);
      throw new Error('Failed to fetch map features');
    }
  }
};

module.exports = osmService;