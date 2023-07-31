const express = require("express");
const os = require("os");

const login = require("./auth/login");
const logout = require("./auth/logout");
const logger = require("./logger/logger");
const courses = require("./api/courses");
const grades = require("./api/grades");
const statusGeneral = require("./api/status_general");
const statusDetail = require("./api/status_detail");
const info = require("./api/info");
const authenticationMiddleware = require("./middleware/authMiddleware");
const getServerIPAddress = require("./utils/ipUtils");
const User = require("./memory_db/user");
const timeoutHandler = require("./utils/timeOutHandler");

const app = express();
const port = process.env.EXPRESS_PORT;
// const ipAddress = "192.168.1.4"
const ipAddress = "localhost";

app.use(express.json());

app.use(timeoutHandler);

// clear the users cache every 5 minutes
setInterval(() => {
  User.clear();
  logger.info("Users data cleared");
}, 5 * 60 * 1000);

app.post("/auth/login", login);

app.get("/auth/logout", authenticationMiddleware, logout);

app.get("/api/courses", authenticationMiddleware, courses);

app.get("/api/grades", authenticationMiddleware, grades);

app.get("/api/status/general", authenticationMiddleware, statusGeneral);

app.get(
  "/api/status/detail/:year/:semester",
  authenticationMiddleware,
  statusDetail
);

app.get("/api/info", authenticationMiddleware, info);

//Initialises the express server on the port 3000
app.listen(port, () =>
  logger.info(`Server listening on ${ipAddress + ":" + port}`)
);
