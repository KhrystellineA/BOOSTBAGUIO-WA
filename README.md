# Boost Baguio

A commuter-centric navigation and tourism platform specifically designed to simplify travel and exploration in Baguio City. The mission is to empower tourists, locals, students, and commuters to navigate Baguio City confidently using its unique jeepney system, while promoting sustainable urban mobility and positioning Baguio as the most commuter-friendly destination in the Philippines.

## Features

### 1. APANAM (P2P Navigation)
- Point-to-point navigation using Baguio's jeepney system
- Step-by-step instructions on which jeepney to take
- Walking directions to and from terminals
- Fare and duration estimates

### 2. PAGNAAM (City Jeeps)
- Comprehensive information about all jeepney routes
- Terminal locations and operating hours
- How to identify each jeepney route
- Route maps with custom styling

### 3. MAYKAN (Places)
- Information about tourist spots, restaurants, and establishments
- How to get there via jeepney
- Integration with "Sa Baguio" Facebook group

### 4. ARAMIDEM (Events)
- Upcoming events in Baguio City
- Transportation details to event venues
- Calendar view with event filtering

### 5. AYAN MO (Near Me)
- Suggest nearby places based on user's location
- Category filtering (tourist spots, restaurants, etc.)
- Distance and directions to nearby locations

## Philosophy: "Teaching, Not Tracking"

This platform focuses on teaching users how to commute rather than providing real-time tracking of vehicles. The system provides static route information to help users gain confidence and knowledge to navigate independently.

## Tech Stack

- **Frontend**: Quasar Framework (Vue.js)
- **Backend**: Node.js with Express.js
- **Database**: Supabase (PostgreSQL with PostGIS)
- **Mapping**: OpenStreetMap APIs, Mapbox GL JS
- **Authentication**: Supabase Auth
- **Offline**: Workbox for PWA functionality

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env` file
4. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/apanam/search` - Search for locations
- `POST /api/apanam/route` - Get route between two points
- `GET /api/pagnaam/routes` - Get all jeepney routes
- `GET /api/maykan/places` - Get all places
- `GET /api/aramidem/events` - Get all events
- `GET /api/ayanmo/nearby` - Get nearby places

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=8080
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
DB_USER=postgres
DB_HOST=localhost
DB_NAME=boost_baguio
DB_PASSWORD=your_db_password
DB_PORT=5432
MAPBOX_TOKEN=your_mapbox_token
```

## Development

This project follows a 9-day development roadmap focusing on:
1. Project foundation and setup
2. Core navigation and mapping
3. APANAM (P2P Navigation) implementation
4. PAGNAAM (City Jeeps) implementation
5. MAYKAN (Places) implementation
6. ARAMIDEM (Events) implementation
7. AYAN MO (Near Me) implementation
8. User system and authentication
9. Polish and testing

## License

MIT