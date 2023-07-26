const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_courses = require("../scraper/s_courses");

const courses = async (request, response) => {
  logger.info(
    `Courses Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const result = await s_courses(request);
  if (result !== null) {
    response.status(200).json({
      courses: result,
    });
  }

  response.status(500).json({
    message: "Internal Server Error",
  });
};

module.exports = courses;
