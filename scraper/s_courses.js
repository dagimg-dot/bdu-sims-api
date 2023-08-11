const browserPool = require("../utils/browser");
const handleError = require("../utils/errorHandler");
const User = require("../memory_db/user");
const Pages = require("../utils/types");
const getUsername = require("../utils/usernameHandler");

const courses = async (req) => {
  const { username, isExpired } = getUsername(req);

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
      handleError(error);
    }
  } else {
    return null;
  }
};

module.exports = courses;
