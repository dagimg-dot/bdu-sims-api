const puppeteer = require('puppeteer');

class Browser {
  static instance = null;

  static async getInstance() {

    if (Browser.instance === null) {
      Browser.instance = new Browser();
      await Browser.instance.init();
    }
    return Browser.instance;
  }

  async init() {
    Browser.instance = await puppeteer.launch({ headless: false });
  }


}

module.exports = Browser;
