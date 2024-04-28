const express = require("express");

const login = require("./auth/login");
const logout = require("./auth/logout");
const logger = require("./logger/logger");
const courses = require("./api/courses");
const statusGeneral = require("./api/status_general");
const statusDetail = require("./api/status_detail");
const authenticationMiddleware = require("./middleware/authMiddleware");
const User = require("./memory_db/user");
const timeoutHandler = require("./utils/timeOutHandler");
const undefinedRouteHandler = require("./utils/undefinedRouteHandler");
const { getserverIPAddress } = require("./utils/IPHandler");

const app = express();
const port = process.env.EXPRESS_PORT;
const ipAddress = getserverIPAddress() || "localhost";

app.use(express.json());

app.use(timeoutHandler);

// clear the users cache every 5 minutes
setInterval(() => {
  if (User.users.length != 0) {
    User.clear();
    logger.info("Users data cleared");
  }
}, 5 * 60 * 1000);

app.post("/auth/login", login);

app.get("/auth/logout", authenticationMiddleware, logout);

app.get("/api/remaining-courses", authenticationMiddleware, courses);

app.get("/api/status/general", authenticationMiddleware, statusGeneral);

app.get(
  "/api/status/detail/:year/:semester",
  authenticationMiddleware,
  statusDetail
);

app.use(undefinedRouteHandler);

//Initialises the express server on the port 3000
app.listen(port, () =>
  logger.info(`Server listening on ${ipAddress + ":" + port}`)
);
