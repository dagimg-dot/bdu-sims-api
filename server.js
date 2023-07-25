const express = require("express");

const login = require("./auth/login");
const logger = require("./logger/logger");
const courses = require("./api/courses");
const authenticationMiddleware = require("./middleware/authMiddleware");

const app = express();
const port = process.env.EXPRESS_PORT;
const ipAddress = "192.168.1.4";

app.use(express.json());

app.post("/auth/login", login);

app.get("/api/courses", authenticationMiddleware, courses);

//Initialises the express server on the port 3000
app.listen(port, ipAddress, () =>
  logger.info(`Server listening on ${ipAddress + ":" + port}`)
);
