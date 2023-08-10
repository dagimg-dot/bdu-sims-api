const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_grades = require("../scraper/s_grades");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types");

const courses = async (request, response) => {
  logger.info(
    `Grades Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const { username, isExpired } = getUsername(request);
  const user = User.getUser(username);
  user.setRequested(Pages.GRADES);

  if (user.getGrades() !== null) {
    response.status(200).json({
      grades: user.getGrades(),
    });
  } else {
    const result = await s_grades(request);
    if (!response.headersSent) {
      if (result !== null) {
        user.setGrades(result);
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
    }
  }
};

module.exports = courses;
