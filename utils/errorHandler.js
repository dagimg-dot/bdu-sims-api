const logger = require("../logger/logger");

const handleError = (error) => {
  if (error.message.includes("ERR_NAME_NOT_RESOLVED")) {
    logger.info(`Unable to resolve the hostname.`);
  } else if (error.message.includes("ERR_INTERNET_DISCONNECTED")) {
    logger.info(`Internet connection not available.`);
  }
};

module.exports = handleError;
