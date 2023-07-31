const jwt = require("jsonwebtoken");

const getUsername = (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    return { username: username, isExpired: false };
  } catch (error) {
    return { username: null, isExpired: true };
  }
};

module.exports = getUsername;
