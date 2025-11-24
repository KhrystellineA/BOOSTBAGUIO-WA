require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');

// Import configuration
const config = require('./config/env');

// Import middleware
const { auth } = require('./middleware/auth');

// Initialize Express app
const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply authentication middleware to all routes
app.use(auth);

// Import routes
const apanamRoutes = require('./routes/apanam');
const pagnaamRoutes = require('./routes/pagnaam');
const maykanRoutes = require('./routes/maykan');
const aramidemRoutes = require('./routes/aramidem');
const ayanmoRoutes = require('./routes/ayanmo');

// Use routes
app.use('/api/apanam', apanamRoutes);
app.use('/api/pagnaam', pagnaamRoutes);
app.use('/api/maykan', maykanRoutes);
app.use('/api/aramidem', aramidemRoutes);
app.use('/api/ayanmo', ayanmoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Boost Baguio API is running',
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Boost Baguio API',
    version: '1.0.0',
    description: 'A commuter-centric navigation and tourism platform for Baguio City',
    features: [
      'APANAM (P2P Navigation)',
      'PAGNAAM (City Jeeps)',
      'MAYKAN (Places)',
      'ARAMIDEM (Events)',
      'AYAN MO (Near Me)'
    ],
    philosophy: 'Teaching, not tracking - focused on educating users about Baguio\'s jeepney system',
    user: req.user
  });
});

// Serve static files for production
app.use(express.static('dist/spa'));

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/spa/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Boost Baguio server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API available at: http://localhost:${PORT}/api/info`);
});

module.exports = server;