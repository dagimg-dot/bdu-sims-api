class User {
    static users = [];

    constructor(username, ipaddress) {
        this.username = username;
        this.ipaddress = ipaddress;
        this.browserInstance = null;
        this.courses = null;
        this.grades = null;
        this.generalStatus = null;
        this.detailStatus = null;
        User.users.push(this);
    }

    static getUser(username) {
        return User.users.find(user => user.username === username);
    }

    static addUser(username, ipaddress) {
        const user = User.getUser(username);
        if (!user) {
            new User(username, ipaddress);
        }
    }

    static removeUser(username) {
        const user = User.getUser(username);
        if (user) {
            User.users = User.users.filter(user => user.username !== username);
        }
    }

}

module.exports = User;