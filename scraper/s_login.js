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

    const username = await page.$("#Input_UserName");
    await username.type(credentials.username);

    const password = await page.$("#Input_Password");
    await password.type(credentials.password);

    const login = await page.$x("/html/body/div[1]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[1]/div[2]/div[1]/div/div/div/section/form/div[4]/button");
    await login[0].click();

    await page.waitForNavigation();

    if ((await page.$x("/html/body/div[1]/div[1]/div/div/div[3]/div/div/div/div/div/table/tbody/tr/td[1]/div/label"))[0] != null) {
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
