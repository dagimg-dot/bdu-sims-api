const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/IPHandler");
const s_status_general = require("../scraper/s_status_general");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types").Pages;
const { sendResult, cacheResult } = require("../utils/utilityFunc");
const { handleUnauthorized, sendError } = require("../utils/errorHandler");

const status_general = async (request, response) => {
  logger.info(
    `General status requested from IP Address: ${getClientIPAddress(request)}`
  );

  const username = getUsername(request).username;
  const user = User.getUser(username);
  if (!user) {
    handleUnauthorized(response);
    return;
  } else {
    user.setRequested(Pages.GENERAL_STATUS);
  }

  if (user.getGeneralStatus() !== null) {
    response.status(200).json({
      [Pages.GENERAL_STATUS]: user.getGeneralStatus(),
    });
  } else {
    try {
      const result = await s_status_general(request);
      cacheResult(result, user.setGeneralStatus.bind(user));
      sendResult(response, result, Pages.GENERAL_STATUS);
    } catch (error) {
      sendError(response, error);
    }
  }
};

module.exports = status_general;
