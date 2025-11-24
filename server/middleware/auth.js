// Authentication middleware for Boost Baguio
// Handles user authentication and premium tier verification

const auth = async (req, res, next) => {
  try {
    // In a real implementation, this would verify JWT tokens or session cookies
    // For now, we'll use a simple mock implementation
    
    // Check for authorization header
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      // Mock token verification (in real app, verify JWT)
      const token = authHeader.split(' ')[1]; // Bearer <token>
      
      // Mock user data (in real app, decode from token)
      req.user = {
        id: 'mock-user-id',
        email: 'user@example.com',
        isPremium: false, // Default to free tier
        tier: 'free' // 'free', 'basic', 'premium'
      };
      
      // In a real implementation, you would query the database to get user tier
      // For now, we'll set a mock premium status based on a query parameter
      if (req.query.premium === 'true') {
        req.user.isPremium = true;
        req.user.tier = 'premium';
      } else if (req.query.tier === 'basic') {
        req.user.isPremium = true; // Basic tier also gets some premium features
        req.user.tier = 'basic';
      }
    } else {
      // Unauthenticated users default to free tier
      req.user = {
        id: null,
        email: null,
        isPremium: false,
        tier: 'free'
      };
    }
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Middleware to check if user is premium
const requirePremium = (req, res, next) => {
  if (!req.user || !req.user.isPremium) {
    return res.status(403).json({ 
      error: 'Premium tier required for this feature',
      message: 'Upgrade to premium to access this feature'
    });
  }
  next();
};

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ 
      error: 'Authentication required' 
    });
  }
  next();
};

module.exports = {
  auth,
  requirePremium,
  requireAuth
};