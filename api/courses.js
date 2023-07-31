const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_courses = require("../scraper/s_courses");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");

const courses = async (request, response) => {
  logger.info(
    `Courses Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const user = User.getUser(getUsername(request));
  if (user.getCourses() !== null) {
    response.status(200).json({
      courses: user.getCourses(),
    });
  } else {
    const result = await s_courses(request);
    if (result !== null) {
      user.setCourses(result);
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
