const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_status_general = require("../scraper/s_status_general")

const status = async (request, response) => {
  logger.info(
    `Status Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const result = await s_status_general(request);
  if (result !== null) {
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
};

module.exports = status;
