import { storageService } from "./storageService";
import { utilService } from "./utilService";

export const todoListService = {
    getTodoListById,
    addTask,
    deleteTask,
    editTask,
    addTodoList
};

let firstTodoLists = [
    {
        id: 'td101',
        tasks: [
            {
                id: 't101',
                title: 'task number: 1',
                descripiton: 'i am a description of task number: 1',
                priority: 1,
                status: 'done',
                createAt: Date.now(),
                dueDate: Date.now() + (1000 * 60 * 60 * 5),
                inChargeOf: 'u101',
            },
            {
                id: 't102',
                title: 'task number: 2',
                descripiton: 'i am a description of task number: 2',
                priority: 2,
                status: 'in progress',
                createAt: Date.now() - (1000 * 60 * 60 * 5),
                dueDate: Date.now() + (1000 * 60 * 60 * 5),
                inChargeOf: 'u101',
            },
            {
                id: 't109',
                title: 'task number: 9',
                descripiton: 'i am a description of task number: 1',
                priority: 1,
                status: 'done',
                createAt: Date.now(),
                dueDate: Date.now() + (1000 * 60 * 60 * 9),
                inChargeOf: 'u101',
            },
            {
                id: 't103',
                title: 'task number: 3',
                descripiton: 'i am a description of task number: 3',
                priority: 2,
                status: 'pending',
                createAt: Date.now() + (1000 * 60 * 60 * 5),
                dueDate: Date.now() + (1000 * 60 * 60 * 5),
                inChargeOf: 'u101',
            },
            {
                id: 't104',
                title: 'task number: 4',
                descripiton: 'i am a description of task number: 4',
                priority: 3,
                status: 'canceled',
                createAt: Date.now(),
                dueDate: Date.now() + (1000 * 60 * 60 * 5),
                inChargeOf: 'u101',
            },
        ]
    },
    {
        id: 'td102',
        tasks: [
            {
                id: 't105',
                title: 'task number: 5',
                descripiton: 'i am a description of task number: 5',
                priority: 1,
                status: 'done',
                createAt: Date.now(),
                dueDate: Date.now() + (1000 * 60 * 60 * 5),
                inChargeOf: 'u101',
            },
            {
                id: 't106',
                title: 'task number: 6',
                descripiton: 'i am a description of task number: 6',
                priority: 2,
                status: 'in progress',
                createAt: Date.now(),
                dueDate: Date.now() + (1000 * 60 * 60 * 5),
                inChargeOf: 'u101',
            },
            {
                id: 't107',
                title: 'task number: 7',
                descripiton: 'i am a description of task number: 7',
                priority: 2,
                status: 'pending',
                createAt: Date.now(),
                dueDate: Date.now() + (1000 * 60 * 60 * 5),
                inChargeOf: 'u101',
            },
            {
                id: 't108',
                title: 'task number: 8',
                descripiton: 'i am a description of task number: 8',
                priority: 1,
                status: 'canceled',
                createAt: Date.now(),
                dueDate: Date.now() + (1000 * 60 * 60 * 5),
                inChargeOf: 'u101',
            },
        ]
    }
];

let todoLists = storageService.loadFromStorage('todolists')? storageService.loadFromStorage('todolists'):firstTodoLists;

// all the function is async to image server request

async function getTodoListById(id) {
    const todoList = await todoLists.find(todoList => todoList.id === id);
    return { ...todoList };
}

async function addTodoList() {
    const newTodoList = { id: utilService.generateId(), tasks: [] }
    const newTodoLists = [...todoLists, newTodoList];
    todoLists = newTodoLists;
    storageService.saveToStorage('todolists',todoLists);
    return newTodoList
}

async function addTask(todoListId, task) {
    let newTodoList = { ...todoLists.find(todoList => todoList.id === todoListId) };
    newTodoList.tasks = [...newTodoList.tasks, task]
    _updateTodolist(newTodoList);
    return newTodoList;
}

async function editTask(todoListId, editedTask) {
    let newTodoList = { ...todoLists.find(todoList => todoList.id === todoListId) };
    newTodoList.tasks = newTodoList.tasks.map(task => task.id === editedTask.id ? editedTask : task);
    _updateTodolist(newTodoList);
    return newTodoList;
}

async function deleteTask(todoListId, taskId) {
    let newTodoList = { ...todoLists.find(todoList => todoList.id === todoListId) };
    newTodoList.tasks = [...newTodoList.tasks.filter(task => task.id !== taskId)];
    _updateTodolist(newTodoList);
    return newTodoList
}

function _updateTodolist(newTodoList) {
    todoLists = todoLists.map(todoList => todoList.id === newTodoList.id ? newTodoList : todoList);
    storageService.saveToStorage('todolists',todoLists);
}