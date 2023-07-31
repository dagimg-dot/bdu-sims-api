const User = require("../memory_db/user");
const getClientIPAddress = require("../utils/ipUtils");

const TIME_OUT_SEC = 10000;

const timeoutHandler = (req, res, next) => {
  req.setTimeout(TIME_OUT_SEC);
  req.on("timeout", () => onTimeout(req, res));
  res.setTimeout(TIME_OUT_SEC);
  res.on("timeout", () => onTimeout(req, res));
  next();
};

const onTimeout = (req, res) => {
  console.log("timeoutHandler.js: timeout");
  let user = null;

  if (req.url == "/auth/login") {
    user = User.getUser(req.body.username);
  } else {
    user = User.getUser(req.headers.username);
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
