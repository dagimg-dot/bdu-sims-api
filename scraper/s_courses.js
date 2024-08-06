const browserPool = require("../utils/browser");
const { handleError } = require("../utils/errorHandler");
const User = require("../memory_db/user");
const { Pages, Url } = require("../utils/types");
const getUsername = require("../utils/usernameHandler");

const courses = async (req) => {
  const username = getUsername(req).username;

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();

    const user = User.getUser(username);

    user.pages[Pages.COURSES].value = page;

    try {
      await page.goto(Url.COURSES);

      // const curriculumInput = await page.$(
      //   "#dx-272abb16-4ce9-baa3-6948-01b7e2881b5d > div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div > div.dx-item-content.dx-list-item-content"
      //   "#dx-2a43f10c-d819-bab4-33ef-fc4f6426feb4 > div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div > div.dx-item-content.dx-list-item-content"
      //   "#dx-2a43f10c-d819-bab4-33ef-fc4f6426feb4 > div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div > div.dx-item-content.dx-list-item-content"
      //   "#dx-2a43f10c-d819-bab4-33ef-fc4f6426feb4 > div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div"
      // );

      // const curriculumInput = await page.$x("/html/body/div[2]/div/div/div/div[1]/div/div[1]/div[2]/div/div[1]")

      await curriculumInput.click();

      await page.waitForSelector(
        "div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div > div"
      );

      const curriculumOption = await page.$(
        "div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div > div"
      );

      await curriculumOption.click();

      const optionsInput = await page.$(
        "#ddlRemainingOption > div.dx-dropdowneditor-input-wrapper.dx-selectbox-container > div > div.dx-texteditor-input-container > input"
      );

      await optionsInput.click();

      await page.waitForSelector(
        "body > div.dx-overlay-wrapper.dx-dropdowneditor-overlay.dx-popup-wrapper.dx-dropdownlist-popup-wrapper.dx-selectbox-popup-wrapper > div"
      );

      const remainingCoursesOption = await page.$(
        "div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div:nth-child(6) > div"
      );

      await remainingCoursesOption.click();

      await page.waitForTimeout(2000);

      const rows = await page.evaluate(() => {
        const rowElements = document.querySelectorAll(
          "#remContainer > div > div.dx-datagrid-rowsview.dx-datagrid-nowrap.dx-scrollable.dx-visibility-change-handler.dx-scrollable-both.dx-scrollable-simulated.dx-last-row-border > div > div > div.dx-scrollable-content > div > table > tbody > tr"
        );

        const rowsData = Array.from(rowElements).map((rowElement) => {
          const tds = rowElement.querySelectorAll("td");
          return {
            coursetitle: tds[0].innerText,
            credit: tds[1].innerText,
            offerType: tds[2].innerText,
            categoryType: tds[3].innerText,
          };
        });
        return rowsData;
      });
      return rows;
    } catch (error) {
      handleError(error);
      throw error;
    }
  } else {
    return null;
  }
};

module.exports = courses;
