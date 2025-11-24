require('dotenv').config();

// Environment configuration
const config = {
  port: process.env.PORT || 8080,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  mapboxToken: process.env.MAPBOX_TOKEN,
  overpassEndpoint: process.env.OVERPASS_ENDPOINT || 'https://overpass-api.de/api/interpreter',
  nominatimEndpoint: process.env.NOMINATIM_ENDPOINT || 'https://nominatim.openstreetmap.org',
};

module.exports = config;