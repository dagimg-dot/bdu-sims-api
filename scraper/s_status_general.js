const browserPool = require("../utils/browser");
const handleError = require("../utils/errorHandler");
const User = require("../memory_db/user");
const Pages = require("../utils/types");
const getUsername = require("../utils/usernameHandler");

const status = async (req) => {
  const { username, isExpired } = getUsername(req);

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();

    const user = User.getUser(username);

    user.pages[Pages.GENERAL_STATUS].value = page;

    try {
      await page.goto("https://studentinfo.bdu.edu.et/MyStatus.aspx");

      const rows = await page.evaluate(() => {
        let count = 0;
        // TODO: make sure the try catch catches all the relevant errors 
        // or should i handle each error separately
        const rowElements = document.querySelectorAll(
          "#dnn_ctr397_ViewMyStatus_reportviewer11_grid2_ob_grid2BodyContainer > div.ob_gBICont > table > tbody > tr"
        );
        const rowsData = Array.from(rowElements).map((rowElement) => {
          const tds = rowElement.querySelectorAll("td");
          if (count % 2 == 0) {
            count++;
            return {
              AcYear: tds[2].querySelector("div > div").innerText,
              Year: tds[3].querySelector("div > div").innerText,
              Semester: tds[4].querySelector("div > div").innerText,
              RegistrationDate: tds[5].querySelector("div > div").innerText,
              RegType: tds[7].querySelector("div > div").innerText,
              SGPA: tds[9].querySelector("div > div").innerText,
              CGPA: tds[10].querySelector("div > div").innerText,
              PrevStatus: tds[11].querySelector("div > div").innerText,
              FinalStatus: tds[12].querySelector("div > div").innerText,
            };
          } else {
            count++;
            return "detailGrade";
          }
        });
        return rowsData;
      });

      const filteredRows = rows.filter((row) => row != "detailGrade");
      return filteredRows;
    } catch (error) {
      handleError(error);
    }
  } else {
    return null;
  }
};

module.exports = status;
