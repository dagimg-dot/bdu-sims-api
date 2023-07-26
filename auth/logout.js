const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_logout = require("../scraper/s_logout");

const logout = async (request, response) => {
  logger.info(
    `Logout requested from IP Address: ${getClientIPAddress(request)}`
  );

  const isLoggedOut = await s_logout(request);

  if (isLoggedOut === true) {
    response.status(200).json({
      status: "success",
    });
  } else if (isLoggedOut === false) {
    response.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
  } else {
    response.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });
  }
};

module.exports = logout;
