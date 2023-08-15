const User = require("../memory_db/user");
const getUsername = require("./usernameHandler");

const TIME_OUT_SEC = Number(process.env.TIMEOUT);

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
    User.closeInstance(user);
  } else {
    const username = getUsername(req).username;
    user = User.getUser(username);
    User.closePage(user);
  }

  res.status(408).json({
    error: {
      message: "request timeout",
    },
  });
};

module.exports = timeoutHandler;
