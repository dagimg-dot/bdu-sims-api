const User = require("../memory_db/user");
const getClientIPAddress = require("../utils/ipUtils");
const jwt = require("jsonwebtoken");
const getUsername = require("./usernameHandler");

const TIME_OUT_SEC = 10000;

const timeoutHandler = (req, res, next) => {
  req.setTimeout(TIME_OUT_SEC);
  req.on("timeout", () => onTimeout(req, res));
  res.setTimeout(TIME_OUT_SEC);
  res.on("timeout", () => onTimeout(req, res));
  next();
};

const onTimeout = (req, res) => {
  let user = null;

  if (req.originalUrl == "/auth/login") {
    user = User.getUser(req.body.username);
  } else {
    const username = getUsername(req);
    user = User.getUser(username);
  }

  if (user.browserInstance != null) {
    user.browserInstance.close();
    user.browserInstance = null;
  }
  res.status(408).json({
    error: {
      message: "request timeout",
    },
  });
};

module.exports = timeoutHandler;
