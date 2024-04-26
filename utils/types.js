const Pages = {
    COURSES: 'courses',
    GENERAL_STATUS: 'generalStatus',
    DETAIL_STATUS: 'detailStatus'
}

const BASE_URL = 'https://studentportal.bdu.edu.et' 

const Url = {
    LOGIN: `${BASE_URL}/Account/Login`,
    STATUS: `${BASE_URL}/Report/StudentLevel/AcademicSumamry`,
    COURSES: `${BASE_URL}/Report/StudentLevel/RemainingCoursesSummary`,
}

module.exports = { Pages, Url };