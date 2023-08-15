const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_status_detail = require("../scraper/s_status_detail");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const sendResult = require("../utils/sendResult");
const Pages = require("../utils/types").Pages;

const status_detail = async (request, response) => {
  logger.info(
    `Detail status requested from IP Address: ${getClientIPAddress(request)}`
  );

  const year = request.params.year;
  const semester = request.params.semester;

  const { username, isExpired } = getUsername(request);
  const user = User.getUser(username);
  user.setRequested(Pages.DETAIL_STATUS);

  // TODO: Caching will be implemented in the future.

  if (isNaN(year) || isNaN(semester) || semester < 1 || semester >= 3) {
    response.status(400).json({
      error: {
        message: "Bad Request",
      },
    });
  } else {
    const result = await s_status_detail(request);
    sendResult(result, response, Pages.DETAIL_STATUS, () => user.setDetailStatus)
  }
};

module.exports = status_detail;
