const logger = require("../logger/logger");
const getClientIPAddress = require("../utils/ipUtils");
const s_info = require("../scraper/s_info");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");
const Pages = require("../utils/types").Pages;
const sendResult = require("../utils/sendResult");

const info = async (request, response) => {
  logger.info(
    `Info Page requested from IP Address: ${getClientIPAddress(request)}`
  );

  const username = getUsername(request).username;
  const user = User.getUser(username);
  user.setRequested(Pages.INFO);

  if (user.getInfo() !== null) {
    response.status(200).json({
      [Pages.INFO]: user.getInfo(),
    });
  } else {
    const result = await s_info(request);
    sendResult(request, response, result, Pages.INFO, () => user.setInfo);
  }
};

module.exports = info;
