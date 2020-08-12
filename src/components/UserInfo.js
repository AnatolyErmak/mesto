export default class UserInfo {
    constructor ({name, job}) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    getUserInfo() {
        const userData = {};
        userData.name = this._name.textContent;
        userData.job = this._job.textContent;
        return userData;
    }

    setUserInfo(newUserData) {
        this._name.textContent = newUserData.name;
        this._job.textContent = newUserData.job;
    }
} 