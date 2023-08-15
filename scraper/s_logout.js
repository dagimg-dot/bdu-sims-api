const browserPool = require("../utils/browser");
const User = require("../memory_db/user");
const getUsername = require("../utils/usernameHandler");

const logout = async (req) => {
    const username = getUsername(req).username;

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