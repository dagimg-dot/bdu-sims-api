const Pages = require('../utils/types').Pages;

class User {
    static users = [];

    constructor(username, ipaddress) {
        this.username = username;
        this.ipaddress = ipaddress;
        this.browserInstance = null;
        this.pages = {
            [Pages.INFO]: { name: Pages.INFO, value: null },
            [Pages.COURSES]: { name: Pages.COURSES, value: null },
            [Pages.GRADES]: { name: Pages.GRADES, value: null },
            [Pages.GENERAL_STATUS]: { name: Pages.GENERAL_STATUS, value: null },
            [Pages.DETAIL_STATUS]: { name: Pages.DETAIL_STATUS, value: null },
        };
        this.info = null;
        this.courses = null;
        this.grades = null;
        this.generalStatus = null;
        this.detailStatus = null;
        this.requested = null;
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
        if(user.browserInstance != null) {
            user.browserInstance.close();
            user.browserInstance = null;
        }
    } 
    
    static closePage(user) {
        const requested = user.getRequested();
        if(requested !== null) {
            let currentPage = user.pages[requested].value ;
            if(currentPage !== null) {
                currentPage.close();
                currentPage = null;
                user.setRequested(null);
            }
        }   
    }

    getInfo() {
        return this.info;
    }
     
    setInfo(info) {
        this.info = info;
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

    getRequested() {
        return this.requested;
    }
     
    setRequested(requested) {
        this.requested = requested;
    }

}

module.exports = User;