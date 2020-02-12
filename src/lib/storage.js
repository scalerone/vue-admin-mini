// 设置localStorage
export function setLocalStorage(key, value) {
    window.localStorage.setItem(key, value);
}
// 获取localStorage
export function getLocalStorage(key) {
    return localStorage.getItem(key);
}
// 清空某个localStorage
export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}
// 清空所有localStorage
export function clearLocalStorage() {
    localStorage.clear();
}


// 设置sessionStorage
export function setSessionStorage(key, value) {
    window.sessionStorage.setItem(key, value);
}
// 获取sessionStorage
export function getSessionStorage(key) {
    return sessionStorage.getItem(key);
}
// 清空某个sessionStorage
export function removeSessionStorage(key) {
    sessionStorage.removeItem(key);
}

// 清空所有sessionStorage
export function clearSessionStorage() {
    sessionStorage.clear();
}

