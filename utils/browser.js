const puppeteer = require("puppeteer");

class BrowserPool {
  constructor() {
    this.browserMap = new Map();
  }

  async createBrowserInstance(username) {
    try {
      const browser = await puppeteer.launch({
        headless: "new",
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // This will write shared memory files into /tmp instead of /dev/shm,
          // because Docker’s default for /dev/shm is 64MB
          "--disable-dev-shm-usage",
        ],
        executablePath: process.env.CHROME_EXECUTABLE_PATH,
      });
      this.browserMap.set(username, browser);
      return browser;
    } catch (error) {
      console.error("Error: launching browser", error);
      return null;
    }
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
