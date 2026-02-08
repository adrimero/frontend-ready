const ACTIVE_USER_KEY = 'activeUser';
const USER_NAME_KEY = 'userName';

export function setActiveUser(userId) {
    localStorage.setItem(ACTIVE_USER_KEY, userId);
}

export function getActiveUser() {
    return localStorage.getItem(ACTIVE_USER_KEY);
}

export function setUserName(name) {
    localStorage.setItem(USER_NAME_KEY, name);
}

export function getUserName() {
    return localStorage.getItem(USER_NAME_KEY) || '';
}