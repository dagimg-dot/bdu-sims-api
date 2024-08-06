const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/IPHandler");
const s_courses = require("../scraper/s_courses");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types").Pages;
const { sendResult, cacheResult } = require("../utils/utilityFunc");
const { handleUnauthorized, sendError } = require("../utils/errorHandler");

const courses = async (request, response) => {
  logger.info(
    `Courses Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const username = getUsername(request).username;
  const user = User.getUser(username);
  if (!user) {
    handleUnauthorized(response);
    return;
  } else {
    user.setRequested(Pages.COURSES);
  }

  // if (user.getCourses() !== null) {
  //   const result = user.getCourses();
  //   response.status(200).json({
  //     [Pages.COURSES]: result,
  //   });
  // } else {
  //   try {
  //     const result = await s_courses(request);
  //     cacheResult(result, user.setCourses.bind(user));
  //     sendResult(response, result, Pages.COURSES);
  //   } catch (error) {
  //     sendError(response, error);
  //   }
  // }

  response.status(200).json({
    sucess: false,
    message: "This endpoint is currently unavailable.",
  });
};

module.exports = courses;
