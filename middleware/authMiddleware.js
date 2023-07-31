const jwt = require("jsonwebtoken");
const User = require("../memory_db/user");
const dotenv = require("dotenv");
const getUsername = require("../utils/usernameHandler");
dotenv.config();

const secretKey = process.env.JWT_SECRET;

function authenticationMiddleware(req, res, next) {
  const auth = req.header("Authorization");
  const token = auth && auth.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: { message: "Authentication token not provided." } });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken; // Store the decoded token data in the request object for future use
    next();
  } catch (error) {
    const { username, isExpired } = getUsername(req);
    if (isExpired) {
      const user = User.getUser(username);
      if (user != undefined) {
        if (user.browserInstance != null) {
          User.closeInstance(user);
        }
      }
    }
    return res
      .status(401)
      .json({ error: { message: "Invalid or expired authentication token." } });
  }
}

module.exports = authenticationMiddleware;
