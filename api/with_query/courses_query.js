const { Pages } = require("../../utils/types");

const courses_query = (request, response, result) => {
  const year = request.query.year;
  const semester = request.query.semester;

  if (validateQuery(year, semester)) {
    const newResult = result.filter(
      (course) => course.year == year && course.semester == semester
    );
    response.status(200).json({
      [Pages.COURSES]: newResult,
    });
  } else {
    response.status(400).json({
      error: {
        message: "Bad Request",
      },
    });
  }
};

const validateQuery = (year, semester) => {
  if (
    isNaN(year) ||
    isNaN(semester) ||
    semester < 1 ||
    semester >= 3 ||
    year === undefined ||
    semester === undefined
  ) {
    return false;
  }

  return true;
};

module.exports = courses_query;
