const browserPool = require("../utils/browser");

const login = async (credentials) => {
  try {
    const browser = await browserPool.createBrowserInstance(credentials.username);

    const page = await browser.newPage();

    await page.goto("https://studentinfo.bdu.edu.et/login.aspx");

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
      return false;
    }
  } catch (error) {
    return error;
  }
};

module.exports = login;
