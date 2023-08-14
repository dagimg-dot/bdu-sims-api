const Pages = {
    INFO: 'info',
    COURSES: 'courses',
    GRADES: 'grades',
    GENERAL_STATUS: 'generalStatus',
    DETAIL_STATUS: 'detailStatus'
}

const BASE_URL = 'https://studentinfo.bdu.edu.et' 

const Url = {
    LOGIN: `${BASE_URL}/login.aspx`,
    INFO: `${BASE_URL}`,
    COURSES: `${BASE_URL}/MyCourses.aspx`,
    GRADES: `${BASE_URL}/MyGrades.aspx`,
    STATUS: `${BASE_URL}/MyStatus.aspx`
}

module.exports = { Pages, Url };