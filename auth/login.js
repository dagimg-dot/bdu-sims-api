const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_login = require("../scraper/s_login");

const secret_key = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

const login = async (request, response) => {
  logger.info(
    `Login Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  try {
    const { username, password } = request.body;

    // logging the username
    logger.info(`Username: ${username}`);

    const credentials = {
      username: username,
      password: password,
    };

    const isValidated = await s_login(credentials);

    // logging the validation result
    logger.info(`Is Validated: ${isValidated}`);

    if (isValidated === true) {
      const token = generateToken(username);
      response.header("Authorization", token);
      response.status(200).json({ status: "success" });
    } else if (isValidated === false) {
      response
        .status(401)
        .json({ status: "failed", message: "Invalid Credentials" });
    } else {
      response.status(503).json({
        error: {
          message: "service unavailable",
        },
      });
    }
  } catch (error) {
    logger.error(error);
    response.json(error);
  }
};

const generateToken = (username) => {
  const tokenContent = {
    username: username,
    iat: Date.now() / 1000,
  };
  const token = jwt.sign(tokenContent, secret_key, { expiresIn: expiresIn });

  return token;
};

module.exports = login;