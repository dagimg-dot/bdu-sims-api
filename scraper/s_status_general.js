const browserPool = require("../utils/browser");
const handleError = require("../utils/errorHandler");
const User = require("../memory_db/user");
const { Pages, Url } = require("../utils/types");
const getUsername = require("../utils/usernameHandler");

const status = async (req) => {
  const username = getUsername(req).username;

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();

    const user = User.getUser(username);

    user.pages[Pages.GENERAL_STATUS].value = page;

    try {
      await page.goto(Url.STATUS);

      const curriculumInput = await page.$(
        "#ddlCurriculum > div.dx-dropdowneditor-input-wrapper.dx-selectbox-container > div > div.dx-texteditor-input-container > input"
      );
      await curriculumInput.click();

      await page.waitForSelector(
        "#dx-2d369e0b-b555-a5ce-2467-df58ad3edb1d > div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div"
      );

      const curriculumOption = await page.$("#dx-2d369e0b-b555-a5ce-2467-df58ad3edb1d > div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div")

      console.log("curriculumOption: ", curriculumOption);
      await curriculumOption.click();

      await page.waitForTimeout(2000);

      const rows = await page.evaluate(() => {
        // TODO: make sure the try catch catches all the relevant errors
        // or should i handle each error separately
        const rowElements = document.querySelectorAll(
          "#RegGrid > div > div.dx-datagrid-rowsview.dx-last-row-border.dx-scrollable.dx-visibility-change-handler.dx-scrollable-both.dx-scrollable-simulated > div > div > div.dx-scrollable-content > div > table > tbody > tr"
        );

        const rowsData = Array.from(rowElements).map((rowElement) => {
          const tds = rowElement.querySelectorAll("td");

          return {
            academicyear: tds[1].innerText,
            batch: tds[2].innerText,
            semester: tds[3].innerText,
            registrationDate: tds[4].innerText,
            registrationCondition: tds[6].innerText,
            sgpa: tds[7].innerText,
            cgpa: tds[8].innerText,
            prevStatus: tds[9].innerText,
            finalStatus: tds[10].innerText,
          };
        });

        return rowsData;
      });

      const filteredRows = rows.filter((row) => row.academicyear != "");
      console.log(filteredRows);
      return filteredRows;
    } catch (error) {
      handleError(error);
    }
  } else {
    return null;
  }
};

module.exports = status;
