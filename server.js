const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const logger = require("./logger/logger");
const login = require("./auth/login");
const getIPAddress = require("./utils/ipUtils");
const authenticationMiddleware = require("./middleware/authMiddleware");

const app = express();
const port = process.env.EXPRESS_PORT;
const secret_key = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;
const ipAddress = "192.168.1.4";

app.use(express.json());

app.post("/auth/login", async (request, response) => {
  logger.info(`Login Page requested from IP Address: ${getIPAddress(request)}`);

  try {
    const username = request.body.username;
    const password = request.body.password;

    // logging the username
    logger.info(`Username: ${username}`);

    const credentials = {
      username: username,
      password: password,
    };

    const isValidated = await login(credentials);

    // logging the validation result
    logger.info(`Is Validated: ${isValidated}`);

    if (isValidated) {
      const tokenContent = {
        username: username,
        iat: Date.now() / 1000,
      };
      const token = jwt.sign(tokenContent, secret_key, {expiresIn: expiresIn});

      response.header("Authorization", token);

      response.status(200).json({ status: "success" });
    } else {
      response
        .status(401)
        .json({ status: "failed", message: "Invalid Credentials" });
    }
  } catch (error) {
    logger.error(error);
    response.json(error);
  }
});

app.get("/api/courses", authenticationMiddleware, (request, response) => {
    logger.info(
        `Courses Page requested from IP Address: ${getIPAddress(request)}`
    );
    response.json({
        courses: [
        {
            id: 1,
            name: "Software Engineering",
        },
        {
            id: 2,
            name: "Computer Science",
        },
        {
            id: 3,
            name: "Information Technology",
        },
        ],
    });
});

//Initialises the express server on the port 3000
app.listen(port, ipAddress, () =>
  logger.info(`Server listening on ${ipAddress + ":" + port}`)
);
