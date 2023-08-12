const browserPool = require("../utils/browser");
const handleError = require("../utils/errorHandler");
const User = require("../memory_db/user");
const Pages = require("../utils/types");
const getUsername = require("../utils/usernameHandler");

const info = async (req) => {
  const { username, isExpired } = getUsername(req);

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();

    const user = User.getUser(username);

    user.pages[Pages.INFO].value = page;

    try {
      await page.goto("https://studentinfo.bdu.edu.et");
      const rows = await page.evaluate(() => {
        const rowElements = document.querySelectorAll(
          "#dnn_ctr409_HtmlModule_lblContent > span > table > tbody > tr"
        );
        const rowsData = Array.from(rowElements)
          .slice(1)
          .map((rowElement) => {
            const tds = rowElement.querySelectorAll("td");
            return {
              id: tds[0].querySelector("span").innerText.split(".")[0],
              contactName: tds[1].querySelector("span").innerText,
              position: tds[2].querySelector("span").innerText,
              college: tds[3].querySelector("span").innerText,
              contactPhone: tds[4].querySelector("span").innerText,
            };
          });
        return rowsData;
      });
      return rows;
    } catch (error) {
      handleError(error);
    }
  } else {
    return null;
  }
};

module.exports = info;
