const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");

const courses = (request, response) => {
    logger.info(
        `Courses Page requested from IP Address: ${getClientIPAddress(request)}`
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