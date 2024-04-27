const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/IPHandler");
const s_status_detail = require("../scraper/s_status_detail");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const { sendResult, cacheResult } = require("../utils/utilityFunc");
const { handleUnauthorized, sendError } = require("../utils/errorHandler");
const Pages = require("../utils/types").Pages;

const status_detail = async (request, response) => {
  logger.info(
    `Detail status requested from IP Address: ${getClientIPAddress(request)}`
  );

  const year = request.params.year;
  const semester = request.params.semester;

  const username = getUsername(request).username;
  const user = User.getUser(username);
  if (!user) {
    handleUnauthorized(response);
    return;
  } else {
    user.setRequested(Pages.DETAIL_STATUS);
  }

  // TODO: Caching will be implemented in the future.

  if (isNaN(year) || isNaN(semester) || semester < 1 || semester >= 3) {
    response.status(400).json({
      error: {
        message: "Bad Request",
      },
    });
  } else {
    try {
      const result = await s_status_detail(request);
      cacheResult(result, user.setDetailStatus.bind(user));
      sendResult(response, result, Pages.DETAIL_STATUS);
    } catch (error) {
      sendError(response, error);
    }
  }
};

module.exports = status_detail;
