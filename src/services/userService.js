import { storageService } from "./storageService";
import { todoListService } from "./todoListService";
import { utilService } from "./utilService";

export const userService = {
    getUsers,
    login,
    logout,
    signup
};

let firstUsers = [
    {
        id: 'u101',
        userName: 'moshe',
        password: '112233',
        todoList: 'td101',
        profileUrl: 'https://randomuser.me/api/portraits/men/72.jpg'
    },
    {
        id: 'u102',
        userName: 'or',
        password: '112233',
        todoList: 'td102',
        profileUrl: 'https://randomuser.me/api/portraits/men/46.jpg'
    },
];


var users = storageService.loadFromStorage('users')? storageService.loadFromStorage('users'):firstUsers;

// all the function is async to image server request

async function getUsers() {
    const newUsers = users.map(user => {
        let newUser = {...user};
        delete newUser.password;
        return newUser
    })
    return newUsers
}

async function login(credential) {
    const user = { ...users.find(user => user.userName === credential.userName) };
    if (!user) return false;
    if (user.password !== credential.password) return false;
    const newUser = {...user}
    delete newUser.password
    sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));
    return newUser;
}

async function signup(newUser) {
    newUser.id=utilService.generateId();
    const userTodoList = await todoListService.addTodoList();
    newUser.todoList = userTodoList.id;
    const newUsers = [...users, { ...newUser }];
    users = newUsers
    storageService.saveToStorage('users',users);
    delete newUser.password
    return newUser
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
}