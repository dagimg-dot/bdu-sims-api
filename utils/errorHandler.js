const logger = require('../logger/logger');
const User = require('../memory_db/user');

const handleError = (error, username) => {
    const user = User.getUser(username);
    if (error.message.includes("net")) {
        logger.info(`Something is wrong in ${user.ipaddress} connection`);
    } else if(error.message.includes("Navigation")) {
        logger.info(`Request from ${user.ipaddress} is timed out`);
        user.setRequested(null);
    }
}

module.exports = handleError;