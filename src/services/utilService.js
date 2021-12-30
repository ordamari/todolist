import moment from "moment";

export const utilService = {
    getFilteredTasks,
    getSortedTasks,
    checkTimeIsValid,
    generateId,
    parseDaytime,
    timestampToStr,
    timestampToTimeInDay
};

function getFilteredTasks(tasks, filterBy) {
    if (filterBy === 'archives') return tasks.filter(task => task.status === 'done' || task.status === 'canceled');
    if (filterBy === 'open tasks') return tasks.filter(task => task.status === 'pending' || task.status === 'in progress');
    if (filterBy === 'tasks of this week') return tasks.filter(task => _checkIfInThisWeek(task.dueDate));
    return tasks;
}

function getSortedTasks(tasks, sortedBy, isStartToEnd) {
    let newTasks = [...tasks];
    if (sortedBy === 'due date') newTasks = newTasks.sort((firstTask, secondTask) => (firstTask.dueDate - secondTask.dueDate));
    else if (sortedBy === 'status') newTasks = newTasks.sort((firstTask, secondTask) => {
        return (firstTask.status.toLowerCase() >= secondTask.status.toLowerCase()) ? 1 : -1
    })
    else if (sortedBy === 'in charge of') newTasks = newTasks.sort((firstTask, secondTask) => {
        return (firstTask.inChargeOf >= secondTask.inChargeOf) ? 1 : -1
    });
    else if (sortedBy === 'creation date') newTasks = newTasks.sort((firstTask, secondTask) => (firstTask.createAt - secondTask.createAt));
    else if (sortedBy === 'priority') newTasks = newTasks.sort((firstTask, secondTask) => (firstTask.priority - secondTask.priority));
    if (!isStartToEnd) newTasks = newTasks.sort((firstTask, secondTask) => -1);
    return newTasks
}

function checkTimeIsValid(str) {
    const timeMat = /^([0]?[0-9]|1[0-2]):[0-5][0-9]$/i;
    if (str.split(' ').length !== 2) return false;
    const [clock, AMorPM] = str.split(' ');
    if (!(AMorPM.toUpperCase() === 'AM' || AMorPM.toUpperCase() === 'PM')) return false;
    return timeMat.test(clock);
}

function generateId() {
    return "id" + Math.random().toString(16).slice(2);
}

function parseDaytime(timeInText) {
    let hours = +timeInText.slice(0, 2)
    const minutes = +timeInText.slice(3, 5)
    if (timeInText.toLowerCase().includes("pm") && hours !== 12) hours += 12;
    return 1000 * 60 * ((hours * 60) + minutes);
}

function timestampToStr(timeStamp) {
    const date = new Date(timeStamp);
    // create DD/MM/YY HH:MM AM/PM format
    const monthStr = date.getMonth() > 8 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    const dayStr = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const yearStr = ('' + date.getFullYear()).substring(2);
    return `${dayStr}/${monthStr}/${yearStr} ${timestampToTimeInDay(timeStamp)}`
}

function timestampToTimeInDay(timeStamp) {
    const date = new Date(timeStamp);
    const hourStr = (date.getHours() % 12) > 9 ? (date.getHours() % 12) : '0' + (date.getHours() % 12);
    const minuteStr = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    const isAm = date.getHours() <= 12;
    return `${hourStr}:${minuteStr} ${isAm ? 'AM' : 'PM'}`
}

function _checkIfInThisWeek(timeStamp) { // all varibles that statrt with m is used moment library
    const mNow = moment();
    const mTimestamp = moment(timeStamp);
    return mNow.isoWeek() === mTimestamp.isoWeek();
}
