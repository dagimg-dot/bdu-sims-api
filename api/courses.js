const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_courses = require("../scraper/s_courses");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types");
const sendResult = require("../utils/sendResult");

const courses = async (request, response) => {
  logger.info(
    `Courses Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const { username, isExpired } = getUsername(request);
  const user = User.getUser(username);
  user.setRequested(Pages.COURSES);

  if (user.getCourses() !== null) {
    response.status(200).json({
      courses: user.getCourses(),
    });
  } else {
    const result = await s_courses(request);
    sendResult(result, response, Pages.COURSES, user.setCourses(result));
  }
};

module.exports = courses;
