const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

function authenticationMiddleware(req, res, next) {
  const auth = req.header('Authorization');
  const token = auth && auth.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken; // Store the decoded token data in the request object for future use
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired authentication token.' });
  }
}

module.exports = authenticationMiddleware;
