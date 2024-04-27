const Pages = {
  COURSES: "courses",
  GENERAL_STATUS: "generalStatus",
  DETAIL_STATUS: "detailStatus",
};

const BASE_URL = "https://studentportal.bdu.edu.et";

const Url = {
  LOGIN: `${BASE_URL}/Account/Login`,
  STATUS: `${BASE_URL}/Report/StudentLevel/AcademicSumamry`,
  COURSES: `${BASE_URL}/Report/StudentLevel/RemainingCoursesSummary`,
};

const RomanToNumber = {
  I: 1,
  II: 2,
};

module.exports = { Pages, Url, RomanToNumber };
