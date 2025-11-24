const { createClient } = require('@supabase/supabase-js');
const config = require('../config/env');

// Initialize Supabase client
const supabase = createClient(config.supabaseUrl, config.supabaseKey);

// Routes service
const routesService = {
  // Get all routes
  async getAllRoutes() {
    const { data, error } = await supabase
      .from('routes')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Get route by ID
  async getRouteById(routeId) {
    const { data, error } = await supabase
      .from('routes')
      .select('*')
      .eq('route_id', routeId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Search routes by terminal or name
  async searchRoutes(query) {
    const { data, error } = await supabase
      .from('routes')
      .select('*')
      .or(`name.ilike.%${query}%,terminal_start.ilike.%${query}%,terminal_end.ilike.%${query}%`)
      .eq('is_active', true);
    
    if (error) throw new Error(error.message);
    return data;
  }
};

// Places service
const placesService = {
  // Get all places
  async getAllPlaces() {
    const { data, error } = await supabase
      .from('places')
      .select('*');
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Get place by ID
  async getPlaceById(placeId) {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('place_id', placeId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Get places by category
  async getPlacesByCategory(category) {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .ilike('category', `%${category}%`);
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Search places
  async searchPlaces(query) {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .ilike('name', `%${query}%`)
      .or(`category.ilike.%${query}%,description.ilike.%${query}%`);
    
    if (error) throw new Error(error.message);
    return data;
  }
};

// Events service
const eventsService = {
  // Get all events
  async getAllEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('end_date', new Date().toISOString());
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Get event by ID
  async getEventById(eventId) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_id', eventId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Get events by date range
  async getEventsByDateRange(startDate, endDate) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', startDate)
      .lte('end_date', endDate);
    
    if (error) throw new Error(error.message);
    return data;
  }
};

// Users service
const usersService = {
  // Get user by ID
  async getUserById(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Update user premium status
  async updateUserPremiumStatus(userId, tier, expiresAt) {
    const { data, error } = await supabase
      .from('users')
      .update({
        is_premium: tier !== 'free',
        premium_tier: tier,
        premium_expires_at: expiresAt,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }
};

// Spatial service for geospatial operations
const spatialService = {
  // Get nearby places based on location
  async getNearbyPlaces(lat, lng, radius = 5000) {
    // Convert lat/lng to PostGIS point format for Supabase
    // Note: Supabase has specific syntax for geospatial queries
    const { data, error } = await supabase
      .rpc('get_places_within_radius', {
        lat_input: parseFloat(lat),
        lng_input: parseFloat(lng),
        radius_input: radius
      });
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Get nearby events based on location
  async getNearbyEvents(lat, lng, radius = 5000) {
    const { data, error } = await supabase
      .rpc('get_events_within_radius', {
        lat_input: parseFloat(lat),
        lng_input: parseFloat(lng),
        radius_input: radius
      });
    
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = {
  supabase,
  routesService,
  placesService,
  eventsService,
  usersService,
  spatialService
};