const sendResult = (response, result, pageType) => {
  if (!response.headersSent) {
    if (result !== null) {
      // This is for grades endpoint, no grades available error
      if (result.error) {
        // TODO: change the status code
        response.status(400).json({
          error: result.error,
        });
      } else {
        response.status(200).json({
          [pageType]: result,
        });
      }
    } else if (result === null) {
      response.status(401).json({
        error: {
          message: "Unkown error occurred. Please try again.",
        },
      });
    } else {
      response.status(500).json({
        error: {
          message: "Internal Server Error",
        },
      });
    }
  }
};

const cacheResult = (result, cacheFunc) => {
  if (result !== null) {
    cacheFunc(result);
  }
};

module.exports = { sendResult, cacheResult };
