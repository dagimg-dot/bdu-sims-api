const puppeteer = require("puppeteer");

class BrowserPool {
  constructor() {
    this.browserMap = new Map();
  }

  async createBrowserInstance(username) {
    const browser = await puppeteer.launch({
      headless: false,
      // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    this.browserMap.set(username, browser);
    return browser;
  }

  getBrowserInstance(username) {
    if (this.browserMap.has(username)) {
      return this.browserMap.get(username);
    }
    return null;
  }

  getBrowserMap() {
    return this.browserMap;
  }

  async removeBrowserInstance(username) {
    const browser = this.browserMap.get(username);
    if (browser) {
      await browser.close();
      this.browserMap.delete(username);
    }
  }
}

// Export an instance of the BrowserPool class (Singleton pattern)
module.exports = new BrowserPool();
