export const storageService = {
    saveToStorage,
    loadFromStorage
}

// use to update and take data from local-storage

function saveToStorage(key, val) {

    var str = JSON.stringify(val);
    localStorage.setItem(key, str)
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var val = JSON.parse(str)
    return val;
}

