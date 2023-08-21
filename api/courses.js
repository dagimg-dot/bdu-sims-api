const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/IPHandler");
const s_courses = require("../scraper/s_courses");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types").Pages;
const sendResult = require("../utils/sendResult");
const courses_query = require("./with_query/courses_query");

const courses = async (request, response) => {
  logger.info(
    `Courses Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const username = getUsername(request).username;
  const user = User.getUser(username);
  user.setRequested(Pages.COURSES);

  if (user.getCourses() !== null) {
    const result = user.getCourses();
    if (request.query) {
      courses_query(request, response, result);
    } else {
      response.status(200).json({
        [Pages.COURSES]: result,
      });
    }
  } else {
    const result = await s_courses(request);
    sendResult(
      request,
      response,
      result,
      Pages.COURSES,
      () => user.setCourses,
      courses_query
    );
  }
};

module.exports = courses;
