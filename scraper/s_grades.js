const browserPool = require("../utils/browser");
const jwt = require("jsonwebtoken");

const courses = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const username = decoded.username;

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();
    await page.goto("https://studentinfo.bdu.edu.et/MyGrades.aspx");

    const rows = await page.evaluate(() => {
      const rowElements = document.querySelectorAll(
        "#dnn_ctr398_ViewMyGrades_reportviewer14_grid2_ob_grid2BodyContainer > div.ob_gBICont > table > tbody > tr"
      );
      const rowsData = Array.from(rowElements).map((rowElement) => {
        const tds = rowElement.querySelectorAll("td");
        return {
          courseCode: tds[0].querySelector("div > div").innerText,
          courseTitle: tds[1].querySelector("div > div").innerText,
          credit: tds[2].querySelector("div > div").innerText,
          grade: tds[3].querySelector("div > div").innerText,
          courseCategory: tds[4].querySelector("div > div").innerText,
        };
      });
      return rowsData;
    });
    return rows;
  } else {
    return null;
  }
};

module.exports = courses;
