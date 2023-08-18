const sendResult = (
  request,
  response,
  result,
  pageType,
  setFunc,
  queryFunc
) => {
  if (!response.headersSent) {
    if (result !== null) {
      setFunc(result); // This is a callback
      if (request.query) {
        queryFunc(request, response, result);
      } else {
        response.status(200).json({
          [pageType]: result,
        });
      }
    } else if (result === null) {
      response.status(401).json({
        error: {
          message: "Unauthorized",
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

module.exports = sendResult;