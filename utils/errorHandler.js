const logger = require("../logger/logger");

const handleError = (error) => {
  if (error.message.includes("ERR_NAME_NOT_RESOLVED")) {
    logger.error(`Unable to resolve the hostname.`);
  } else if (error.message.includes("ERR_INTERNET_DISCONNECTED")) {
    logger.error(`Internet connection not available.`);
  } else {
    logger.error(error.message);
  }
};

module.exports = handleError;
