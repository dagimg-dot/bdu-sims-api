const express = require("express");
const os = require("os");

const login = require("./auth/login");
const logout = require("./auth/logout");
const logger = require("./logger/logger");
const courses = require("./api/courses");
const grades = require("./api/grades");
const info = require("./api/info");
const authenticationMiddleware = require("./middleware/authMiddleware");
const getServerIPAddress = require("./utils/ipUtils");

const app = express();
const port = process.env.EXPRESS_PORT;
// const ipAddress = "192.168.1.4"
const ipAddress = "localhost";

app.use(express.json());

app.use((req, res, next) => {
  req.setTimeout(10000);
  req.on("timeout", function () {
    res.status(408).json({
      message: "Request Timeout",
    });
  });
  res.setTimeout(10000);
  res.on("timeout", function () {
    res.status(408).json({
      message: "Request Timeout",
    });
  });
  next();
});

app.post("/auth/login", login);

app.get("/auth/logout", authenticationMiddleware, logout);

app.get("/api/courses", authenticationMiddleware, courses);

app.get("/api/grades", authenticationMiddleware, grades);

app.get("/api/info", authenticationMiddleware, info)

//Initialises the express server on the port 3000
app.listen(port, () =>
  logger.info(`Server listening on ${ipAddress + ":" + port}`)
);
