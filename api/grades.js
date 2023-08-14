const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_grades = require("../scraper/s_grades");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types").Pages;
const sendResult = require("../utils/sendResult");

const courses = async (request, response) => {
  logger.info(
    `Grades Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const { username, isExpired } = getUsername(request);
  const user = User.getUser(username);
  user.setRequested(Pages.GRADES);

  if (user.getGrades() !== null) {
    response.status(200).json({
      [Pages.GRADES]: user.getGrades(),
    });
  } else {
    const result = await s_grades(request);
    sendResult(result, response, Pages.GRADES, () => user.setGrades);
  }
};

module.exports = courses;
