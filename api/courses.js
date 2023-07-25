const logger = require("../logger/logger");
const getIPAddress = require("../utils/ipUtils");

const courses = (request, response) => {
    logger.info(
        `Courses Page requested from IP Address: ${getIPAddress(request)}`
    );
    response.json({
        courses: [
        {
            id: 1,
            name: "Software Engineering",
        },
        {
            id: 2,
            name: "Computer Science",
        },
        {
            id: 3,
            name: "Information Technology",
        },
        ],
    });
}

module.exports = courses;