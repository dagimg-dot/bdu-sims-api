const Browser = require("./browser");

const login = async (credentials) => {
  const browser = await Browser.getInstance();
  const page = await browser.newPage();

  await page.goto("https://studentinfo.bdu.edu.et/login.aspx?ReturnUrl=%2f");

  const username = await page.$("#dnn_ctr_Login_Login_DNN_txtUsername");
  await username.type(credentials.username);

  const password = await page.$("#dnn_ctr_Login_Login_DNN_txtPassword");
  await password.type(credentials.password);

  const login = await page.$("#dnn_ctr_Login_Login_DNN_cmdLogin");
  await login.click();

  try {
    await page.waitForSelector("#dnn_dnnUSER_cmdRegister", { timeout: 5000 });
    await browser.close();
    return true;
  } catch (error) {
    await browser.close();
    return false;
  }
  // await page.waitForNavigation();

  // if ((await page.$("#dnn_dnnUSER_cmdRegister")) != null) {
  //   await browser.close();
  //   return true;
  // } else {
  //   await browser.close();
  //   return false;
  // }
};

module.exports = login;
