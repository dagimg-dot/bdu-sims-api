const browserPool = require("../utils/browser");
const User = require("../memory_db/user");
const jwt = require("jsonwebtoken");

const logout = async (request) => {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    const browser = await browserPool.getBrowserInstance(username);

    if(browser != null) {
        await browser.close();
        browserPool.removeBrowserInstance(username);
        User.removeUser(username);
        return true;
    } else {
        return false;
    }
}; 

module.exports = logout;