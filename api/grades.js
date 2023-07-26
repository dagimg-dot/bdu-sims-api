const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_grades = require("../scraper/s_grades");

const courses = async (request, response) => {
  logger.info(
    `Grades Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const result = await s_grades(request);
  if (result !== null) {
    response.status(200).json({
      grades: result,
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
};

module.exports = courses;