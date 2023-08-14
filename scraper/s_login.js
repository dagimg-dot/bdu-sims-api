const browserPool = require("../utils/browser");
const User = require("../memory_db/user");
const handleError = require("../utils/errorHandler");
const Url = require("../utils/types").Url;

const login = async (credentials) => {
  try {
    let browser = await browserPool.createBrowserInstance(credentials.username);
    
    const user = User.getUser(credentials.username);
    user.browserInstance = browser;

    const page = await browser.newPage();

    await page.goto(Url.LOGIN);

    const username = await page.$("#dnn_ctr_login_login_dnn_txtusername");
    await username.type(credentials.username);

    const password = await page.$("#dnn_ctr_login_login_dnn_txtpassword");
    await password.type(credentials.password);

    const login = await page.$("#dnn_ctr_login_login_dnn_cmdlogin");
    await login.click();

    await page.waitForNavigation();

    if ((await page.$("#dnn_dnnuser_cmdregister")) != null) {
      return true;
    } else {
      await browser.close();
      browser = null;
      browserPool.removeBrowserInstance(credentials.username);
      User.removeUser(credentials.username);
      return false;
    }
  } catch (error) {
    const user = User.getUser(credentials.username)
    User.closeInstance(user);
    handleError(error);
  }
};

module.exports = login;
