const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_status_detail = require("../scraper/s_status_detail");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types").Pages;

const courses = async (request, response) => {
  logger.info(
    `Status Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const year = request.params.year;
  const semester = request.params.semester;

  const { username, isExpired } = getUsername(request);
  const user = User.getUser(username);
  user.setRequested(Pages.DETAIL_STATUS);

  if (isNaN(year) || isNaN(semester) || semester < 1 || semester >= 3) {
    response.status(400).json({
      error: {
        message: "Bad Request",
      },
    });
  } else {
    const result = await s_status_detail(request);
    if (result !== null) {
      response.status(200).json({
        courses: result,
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

module.exports = courses;
