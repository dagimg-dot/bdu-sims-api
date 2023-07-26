const puppeteer = require("puppeteer");
// const Browser = require("./browser");

const login = async (credentials) => {
  // const browser = await Browser.getInstance();
  try {
    const browser = await puppeteer.launch({ headless: "new" });
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
      // await browser.close();
      return true;
    } else {
      // await browser.close();
      return false;
    }
  } catch (error) {
    // await browser.close();
    return error;
  }
};

module.exports = login;