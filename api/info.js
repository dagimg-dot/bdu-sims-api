const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_info = require("../scraper/s_info");

const info = async (request, response) => {
  logger.info(
    `Info Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const result = await s_info(request);
  if (result !== null) {
    response.status(200).json({
      info: result,
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

module.exports = info;
