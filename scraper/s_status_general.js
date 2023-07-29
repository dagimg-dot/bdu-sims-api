const browserPool = require("../utils/browser");
const jwt = require("jsonwebtoken");

const status = async (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const username = decoded.username;

  const browser = await browserPool.getBrowserInstance(username);
  if (browser != null) {
    const page = await browser.newPage();
    await page.goto("https://studentinfo.bdu.edu.et/MyStatus.aspx");

    const rows = await page.evaluate(() => {
      let count = 0;
      try {
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
      } catch (error) {
        return null;
      }
    });

    const filteredRows = rows.filter((row) => row != "detailGrade");
    return filteredRows;
  } else {
    return null;
  }
};

module.exports = status;
