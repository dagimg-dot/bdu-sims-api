const browserPool = require("../utils/browser");
const getUsername = require("../utils/usernameHandler");
const User = require("../memory_db/user");
const { Pages, Url, RomanToNumber } = require("../utils/types");
const { handleError } = require("../utils/errorHandler");

const status = async (req) => {
  const username = getUsername(req).username;

  const year = req.params.year;
  const semester = req.params.semester;

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();

    const user = User.getUser(username);

    user.pages[Pages.DETAIL_STATUS].value = page;

    try {
      await page.goto(Url.STATUS);

      const curriculumInput = await page.$(
        "#ddlCurriculum > div.dx-dropdowneditor-input-wrapper.dx-selectbox-container > div > div.dx-texteditor-input-container > input"
      );
      await curriculumInput.click();

      await page.waitForSelector(
        "div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div > div"
      );

      const curriculumOption = await page.$(
        "div.dx-scrollable-wrapper > div > div.dx-scrollable-content > div.dx-scrollview-content.dx-wrap-item-text > div > div"
      );

      await curriculumOption.click();

      await page.waitForTimeout(2000);

      const rows = await page.evaluate(
        async (year, semester, RomanToNumber) => {
          const rowElements = document.querySelectorAll(
            "#RegGrid > div > div.dx-datagrid-rowsview.dx-last-row-border.dx-scrollable.dx-visibility-change-handler.dx-scrollable-both.dx-scrollable-simulated > div > div > div.dx-scrollable-content > div > table > tbody > tr"
          );

          const rowElementsArr = Array.from(rowElements);
          const lastElement = rowElements[rowElementsArr.length - 2];

          const checkYear = () => {
            const tds = lastElement.querySelectorAll("td");
            const maxYear = tds[2].innerText;
            const maxSemester = tds[3].innerText;
            if (
              year > Number(maxYear) ||
              (year == Number(maxYear) && semester > RomanToNumber[maxSemester])
            ) {
              throw new Error("Bad Request - Invalid year or semester.");
            }

            return true;
          };

          const isValid = checkYear();

          if (isValid) {
            const btnSelector = semester == 1 ? (year - 1) * 2 + 1 : year * 2;

            const detailDropDown = document.querySelector(
              `#RegGrid > div > div.dx-datagrid-rowsview.dx-last-row-border.dx-scrollable.dx-visibility-change-handler.dx-scrollable-both.dx-scrollable-simulated > div > div > div.dx-scrollable-content > div > table > tbody > tr:nth-child(${btnSelector}) > td.dx-command-expand.dx-datagrid-group-space.dx-datagrid-expand.dx-selection-disabled > div`
            );

            if (detailDropDown == null) {
              return null;
            }

            detailDropDown.click();

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const rowElements = document.querySelectorAll(
              "#CourseGrid > div > div.dx-datagrid-rowsview.dx-last-row-border.dx-scrollable.dx-visibility-change-handler.dx-scrollable-both.dx-scrollable-simulated > div > div > div.dx-scrollable-content > div > table > tbody > tr"
            );

            const rowsData = Array.from(rowElements).map((rowElement) => {
              const tds = rowElement.querySelectorAll("td");

              return {
                courseCode: tds[0].innerText,
                courseTitle: tds[1].innerText,
                credit: tds[2].innerText,
                letterGrade: tds[3].innerText,
                gradePoint: tds[4].innerText,
                courseStatus: tds[5].innerText,
                gradeRemark: tds[6].innerText,
              };
            });

            return rowsData;
          } else {
            return null;
          }
        },
        year,
        semester,
        RomanToNumber
      );
      return rows.filter((row) => row.courseCode != "");
    } catch (error) {
      handleError(error);
      throw error;
    }
  } else {
    return null;
  }
};

module.exports = status;
