const { Pool } = require('pg');
const config = require('../config/database');

// Direct PostgreSQL/PostGIS connection for complex spatial operations
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

// Spatial service for geospatial operations using PostGIS
const spatialService = {
  // Get nearby places based on location using PostGIS
  async getNearbyPlaces(lat, lng, radius = 5000) {
    const client = await pool.connect();
    try {
      // Query to find places within a radius using PostGIS
      const query = `
        SELECT 
          id,
          place_id,
          name,
          description,
          category,
          address,
          ST_AsGeoJSON(position) as position,
          image_urls,
          routes_to_access,
          data_version,
          last_updated,
          created_at,
          ST_Distance(
            position, 
            ST_SetSRID(ST_MakePoint($1, $2), 4326)
          ) * 100000 as distance_meters
        FROM places
        WHERE ST_DWithin(
          position, 
          ST_SetSRID(ST_MakePoint($1, $2), 4326), 
          $3 / 100000  -- Convert meters to degrees (approximation)
        )
        ORDER BY distance_meters
        LIMIT 20
      `;
      
      const result = await client.query(query, [parseFloat(lng), parseFloat(lat), radius]);
      
      // Parse the position from GeoJSON
      const places = result.rows.map(place => {
        const position = JSON.parse(place.position);
        return {
          ...place,
          position: {
            lat: position.coordinates[1],
            lng: position.coordinates[0]
          },
          distanceMeters: Math.round(place.distance_meters)
        };
      });
      
      return places;
    } finally {
      client.release();
    }
  },

  // Get nearby events based on location using PostGIS
  async getNearbyEvents(lat, lng, radius = 5000) {
    const client = await pool.connect();
    try {
      // Query to find events within a radius using PostGIS
      const query = `
        SELECT 
          id,
          event_id,
          name,
          description,
          start_date,
          end_date,
          venue,
          ST_AsGeoJSON(venue_position) as venue_position,
          routes_to_access,
          image_url,
          is_recurring,
          data_version,
          last_updated,
          created_at,
          ST_Distance(
            venue_position, 
            ST_SetSRID(ST_MakePoint($1, $2), 4326)
          ) * 100000 as distance_meters
        FROM events
        WHERE ST_DWithin(
          venue_position, 
          ST_SetSRID(ST_MakePoint($1, $2), 4326), 
          $3 / 100000  -- Convert meters to degrees (approximation)
        )
        AND end_date >= NOW()  -- Only future events
        ORDER BY distance_meters
        LIMIT 20
      `;
      
      const result = await client.query(query, [parseFloat(lng), parseFloat(lat), radius]);
      
      // Parse the position from GeoJSON
      const events = result.rows.map(event => {
        const position = JSON.parse(event.venue_position);
        return {
          ...event,
          venuePosition: {
            lat: position.coordinates[1],
            lng: position.coordinates[0]
          },
          distanceMeters: Math.round(event.distance_meters)
        };
      });
      
      return events;
    } finally {
      client.release();
    }
  },

  // Calculate route between two points using PostGIS
  async calculateRoute(startLat, startLng, endLat, endLng) {
    // This is a simplified implementation
    // In a real application, you'd use a routing engine like pgRouting
    // For now, we'll return a straight line distance and time estimate
    
    // Calculate distance using Haversine formula (simplified)
    const toRadians = (degrees) => degrees * (Math.PI/180);
    
    const R = 6371e3; // Earth radius in meters
    const φ1 = toRadians(startLat);
    const φ2 = toRadians(endLat);
    const Δφ = toRadians(endLat - startLat);
    const Δλ = toRadians(endLng - startLng);
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const distance = R * c; // in meters
    const duration = (distance / 10000) * 60; // in minutes (assuming avg speed of 10km/h)
    
    return {
      distance: Math.round(distance),
      duration: Math.round(duration),
      estimatedFare: Math.ceil(distance / 1000) * 15 // 15 PHP per km
    };
  }
};

module.exports = spatialService;