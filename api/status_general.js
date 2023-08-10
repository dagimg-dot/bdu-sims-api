const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_status_general = require("../scraper/s_status_general");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");

const status = async (request, response) => {
  logger.info(
    `Status Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const { username, isExpired } = getUsername(request);
  const user = User.getUser(username);

  if (user.getGrades() !== null) {
    response.status(200).json({
      status: user.getGeneralStatus(),
    });
  } else {
    const result = await s_status_general(request);
    if (result !== null) {
      user.setGeneralStatus(result);
      response.status(200).json({
        status: result,
      });
    } else if (result === null) {
      response.status(401).json({
        message: "Unauthorized",
      });
    } else {
      response.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};

module.exports = status;
