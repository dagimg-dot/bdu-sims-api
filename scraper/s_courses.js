const browserPool = require("../utils/browser");
const jwt = require("jsonwebtoken");
const handleError = require("../utils/errorHandler");
const User = require("../memory_db/user");
const Pages = require("../utils/types");

const courses = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const username = decoded.username;

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();
    
    const user = User.getUser(username);
    
    user.pages[Pages.COURSES].value = page;

    try {
      await page.goto("https://studentinfo.bdu.edu.et/mycourses.aspx");

      const rows = await page.evaluate(() => {
        const rowElements = document.querySelectorAll(
          "#dnn_ctr396_ViewMyCourses_component23_grid2_ob_grid2BodyContainer > div.ob_gBICont > table > tbody > tr"
        );
        const rowsData = Array.from(rowElements).map((rowElement) => {
          const tds = rowElement.querySelectorAll("td");
          return {
            id: tds[0].querySelector("div > div").innerText,
            courseCode: tds[1].querySelector("div > div").innerText,
            courseTitle: tds[2].querySelector("div > div").innerText,
            credit: tds[3].querySelector("div > div").innerText,
            year: tds[4].querySelector("div > div").innerText,
            semester: tds[5].querySelector("div > div").innerText,
            courseCategory: tds[6].querySelector("div > div").innerText,
          };
        });
        return rowsData;
      });
      return rows;
    } catch (error) {
      handleError(error, username);
    }
  } else {
    return null;
  }
};

module.exports = courses;
