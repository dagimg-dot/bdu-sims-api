const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/IPHandler");
const s_status_general = require("../scraper/s_status_general");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types").Pages;
const sendResult = require("../utils/sendResult");

const status_general = async (request, response) => {
  logger.info(
    `General status requested from IP Address: ${getClientIPAddress(request)}`
  );

  const username = getUsername(request).username;
  const user = User.getUser(username);
  user.setRequested(Pages.GENERAL_STATUS);

  if (user.getGeneralStatus() !== null) {
    response.status(200).json({
      [Pages.GENERAL_STATUS]: user.getGeneralStatus(),
    });
  } else {
    const result = await s_status_general(request);
    sendResult(
      request,
      response,
      result,
      Pages.GENERAL_STATUS,
      () => user.setGeneralStatus
    );
  }
};

module.exports = status_general;
