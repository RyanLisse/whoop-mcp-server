/**
 * Middleware to check for a valid authentication token in the Authorization header
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      error: 'Authentication failed',
      message: 'Authorization header is required' 
    });
  }

  // For WHOOP API, we just need to pass the token to the API
  // No need to validate it here as the WHOOP API will do that
  
  // You could add additional validation logic here if needed
  
  next();
};

/**
 * Middleware to check for API key in request for internal authentication
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ 
      error: 'Authentication failed',
      message: 'Invalid or missing API key' 
    });
  }
  
  next();
};
