const sendResult = (result, response, pageType, setFunc) => {
  if (!response.headersSent) {
    if (result !== null) {
      setFunc(result);
      response.status(200).json({
        [pageType]: result,
      });
    } else if (result === null) {
      response.status(401).json({
        message: "Unauthorized",
      });
    } else {
      response.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};
