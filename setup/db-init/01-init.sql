-- Boost Baguio Database Schema

-- Enable PostGIS extension for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table for authentication and premium tier management
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_premium BOOLEAN DEFAULT FALSE,
    premium_tier VARCHAR(20) DEFAULT 'free', -- 'free', 'basic', 'premium'
    premium_expires_at TIMESTAMP WITH TIME ZONE
);

-- Jeepney routes table
CREATE TABLE IF NOT EXISTS routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7), -- hex color code
    terminal_start VARCHAR(255),
    terminal_end VARCHAR(255),
    fare INTEGER,
    operating_hours VARCHAR(50),
    estimated_duration INTEGER, -- in minutes
    is_active BOOLEAN DEFAULT TRUE,
    route_path GEOGRAPHY(LINESTRING, 4326), -- PostGIS geography for route path
    stops JSONB, -- array of stop objects with name and position
    data_version VARCHAR(20) DEFAULT 'v1.0.0',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Places table (tourist spots, restaurants, etc.)
CREATE TABLE IF NOT EXISTS places (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    place_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    address TEXT,
    position GEOGRAPHY(POINT, 4326), -- PostGIS geography for location
    image_urls TEXT[],
    routes_to_access TEXT[], -- array of route IDs that serve this place
    data_version VARCHAR(20) DEFAULT 'v1.0.0',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    venue VARCHAR(255),
    venue_position GEOGRAPHY(POINT, 4326), -- PostGIS geography for venue location
    routes_to_access TEXT[], -- array of route IDs that serve this venue
    image_url TEXT,
    is_recurring BOOLEAN DEFAULT FALSE,
    data_version VARCHAR(20) DEFAULT 'v1.0.0',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_routes_position ON routes USING GIST(route_path);
CREATE INDEX IF NOT EXISTS idx_places_position ON places USING GIST(position);
CREATE INDEX IF NOT EXISTS idx_events_venue_position ON events USING GIST(venue_position);
CREATE INDEX IF NOT EXISTS idx_routes_active ON routes(is_active);
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(start_date, end_date);

-- Function to update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update the 'updated_at' timestamp
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_routes_updated_at BEFORE UPDATE ON routes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_places_updated_at BEFORE UPDATE ON places FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();