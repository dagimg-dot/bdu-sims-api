const browserPool = require("../utils/browser");
const jwt = require("jsonwebtoken");

const status = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const username = decoded.username;

  const year = req.body.year;
  const semester = req.body.semester;

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();
    await page.goto("https://studentinfo.bdu.edu.et/MyStatus.aspx");

    const rows = await page.evaluate(
      async (year, semester) => {
        const rowElements = document.querySelectorAll(
          "#dnn_ctr397_ViewMyStatus_reportviewer11_grid2_ob_grid2BodyContainer > div.ob_gBICont > table > tbody > tr"
        );

        const img = document.querySelectorAll(
          "#dnn_ctr397_ViewMyStatus_reportviewer11_grid2_ob_grid2BodyContainer > div.ob_gBICont > table > tbody > tr > td.ob_gDGE.ob_gC.ob_gC_Fc > div > div.ob_gDGEB > img"
        );

        const rowElementsArr = Array.from(rowElements);
        const lastElement = rowElements[rowElementsArr.length - 2];

        const checkYear = () => {
          const tds = lastElement.querySelectorAll("td");
          const maxYear = tds[3].querySelector("div > div").innerText;
          if (year > Number(maxYear)) {
            return false;
          }
          return true;
        };

        const getSemester = (semester) => {
          let added = semester;
          if (semester == 1) {
            added = 0;
          }
          return added;
        };

        const getSelector = () => {
          const yearSelector = (year - 1) * 4 + getSemester(semester);
          return `#dnn_ctr397_ViewMyStatus_reportviewer11_grid2_ob_grid2BodyContainer_grid3_${yearSelector}_ob_grid3_${yearSelector}BodyContainer > div.ob_gBICont > table > tbody > tr`;
        };

        const isValid = checkYear();

        if (isValid) {
          const btnSelector =
            semester == 1 ? (year - 1) * 2 : (year - 1) * 2 + 1;
          img[btnSelector].click();
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const choosenDetailGrades = getSelector();
          if (document.querySelector(choosenDetailGrades) == null) {
            return null;
          }
          const indGradeRowElements =
            document.querySelectorAll(choosenDetailGrades);

          const rowsData = Array.from(indGradeRowElements).map((rowElement) => {
            const tds = rowElement.querySelectorAll("td");
            return {
              courseCode: tds[2].querySelector("div > div").innerText,
              courseTitle: tds[3].querySelector("div > div").innerText,
              credit: tds[4].querySelector("div > div").innerText,
              grade: tds[5].querySelector("div > div").innerText,
              gradePoint: tds[6].querySelector("div > div").innerText,
            };
          });

          return rowsData;
        } else {
          return null;
        }
      },
      year,
      semester
    );
    if (rows != null) {
      const filteredRows = rows.filter((row) => row != "detailGrade");
      return filteredRows;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = status;
