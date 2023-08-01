const handleError = (error) => {
    if (error.message.includes("net")) {
        logger.info(`Something is wrong in ${credentials.username} connection`);
    }
}

module.exports = handleError;