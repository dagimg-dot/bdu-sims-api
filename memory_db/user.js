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

    static clear() {
        User.users = [];
    }

    static closeInstance(user) {
        user.browserInstance.close();
        user.browserInstance = null;
    } 

    getCourses() {
        return this.courses;
    }

    setCourses(courses) {
        this.courses = courses;
    }

    getGrades() {
        return this.grades;
    }

    setGrades(grades) {
        this.grades = grades;
    }

    getGeneralStatus() {
        return this.generalStatus;
    }

    setGeneralStatus(generalStatus) {
        this.generalStatus = generalStatus;
    }

    getDetailStatus() {
        return this.detailStatus;
    }

    setDetailStatus(detailStatus) {
        this.detailStatus = detailStatus;
    }
}

module.exports = User;