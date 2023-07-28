const browserPool = require("../utils/browser");
const jwt = require("jsonwebtoken");

const info = async (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const username = decoded.username;

  const browser = await browserPool.getBrowserInstance(username);
  const page = await browser.newPage();
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
};

module.exports = info;
