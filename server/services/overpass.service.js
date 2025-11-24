const axios = require('axios');
const config = require('../config/env');

// Service for interacting with Overpass API (OpenStreetMap data extraction)
const overpassService = {
  // Get jeepney routes in Baguio using Overpass API
  async getJeepneyRoutes() {
    try {
      // Query Overpass API for jeepney routes in Baguio
      const query = `[out:json]; area["name"="Baguio"]->.baguio; (way["route"="bus"](area.baguio);>;); out body;`;
      const encodedQuery = encodeURIComponent(query);
      
      const response = await axios.get(`${config.overpassEndpoint}?data=${encodedQuery}`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching from Overpass API:', error.message);
      throw new Error('Failed to fetch data from Overpass API');
    }
  },

  // Get specific route data
  async getRouteData(routeName) {
    try {
      // Query Overpass API for a specific route
      const query = `[out:json]; area["name"="Baguio"]->.baguio; (way["route"="bus"]["ref"="${routeName}"](area.baguio);>;); out body;`;
      const encodedQuery = encodeURIComponent(query);
      
      const response = await axios.get(`${config.overpassEndpoint}?data=${encodedQuery}`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching specific route from Overpass API:', error.message);
      throw new Error('Failed to fetch route data from Overpass API');
    }
  },

  // Get all public transport routes in Baguio
  async getAllPublicTransport() {
    try {
      // Query Overpass API for all public transport in Baguio
      const query = `[out:json]; area["name"="Baguio"]->.baguio; (relation["route"~"bus|trolleybus|tram|train|subway|light_rail"](area.baguio);>;); out body;`;
      const encodedQuery = encodeURIComponent(query);
      
      const response = await axios.get(`${config.overpassEndpoint}?data=${encodedQuery}`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching public transport from Overpass API:', error.message);
      throw new Error('Failed to fetch public transport data from Overpass API');
    }
  }
};

module.exports = overpassService;