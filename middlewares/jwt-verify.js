require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = 'secret';

// Middleware to verify JWT
const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
  
    const [bearer, token] = authHeader.split(' ');
  
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid authorization header' });
    }
  
    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.user = { 
        id: decodedToken.id,
        email: decodedToken.email };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

  module.exports = verifyJwt