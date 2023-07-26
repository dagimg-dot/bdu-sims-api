const puppeteer = require("puppeteer");

class BrowserPool {
  constructor() {
    this.browserMap = new Map();
  }

  async createBrowserInstance(username) {
    // Check if a browser instance already exists for the username
    if (this.browserMap.has(username)) {
      return this.getBrowserInstance(username);
    }

    const browser = await puppeteer.launch({
      headless: 'new',
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
