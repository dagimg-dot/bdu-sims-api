const browserPool = require("../utils/browser");
const handleError = require("../utils/errorHandler");
const User = require("../memory_db/user");
const { Pages, Url } = require("../utils/types");
const getUsername = require("../utils/usernameHandler");

const courses = async (req) => {
  const username = getUsername(req).username;

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();

    const user = User.getUser(username);

    user.pages[Pages.GRADES].value = page;

    try {
      await page.goto(Url.GRADES);

      // find "There are no records available." in the html page
      if (
        (await page.$(
          "#dnn_ctr398_ViewMyGrades_reportviewer14_grid2_ob_grid2BodyContainer > div.ob_gBICont > table > tbody > tr > td > div"
        ).innerText) == "There are no records available."
      ) {
        return {
          error: "There are no records available.",
        };
      }

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
    } catch (error) {
      handleError(error);
    }
  } else {
    return null;
  }
};

module.exports = courses;
