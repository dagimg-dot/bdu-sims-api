const logger = require('../logger/logger');
const User = require('../memory_db/user');

const handleError = (error, username) => {
    const user = User.getUser(username);
    if (error.message.includes("ERR_NAME_NOT_RESOLVED")) {
        logger.info(`Unable to resolve the hostname.`);
    } else if(error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        logger.info(`Internet connection not available.`)
    }   
    else if(error.message.includes("Navigation")) {
        logger.info(`Request from ${user.ipaddress} is timed out`);
        user.setRequested(null);
    } 
}

module.exports = handleError;