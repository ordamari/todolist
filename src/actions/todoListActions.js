import { todoListService } from '../services/todoListService'
import { utilService } from '../services/utilService';

export function onSetTasks(taskId) {
  return async dispatch => {
    const todoList = await todoListService.getTodoListById(taskId);
    dispatch({ type: 'SET_TODOLIST', todoList });
  }
}

export function onAddTask(todoListId, task) {
  task.id = utilService.generateId();
  return async dispatch => {
    const todoList = await todoListService.addTask(todoListId, task);
    dispatch({ type: 'SET_TODOLIST', todoList });
  }
}

export function onEditTask(todoListId, task) {
  return async dispatch => {
    const todoList = await todoListService.editTask(todoListId, task);
    dispatch({ type: 'SET_TODOLIST', todoList });
  }
}

export function onDeleteTask(todoListId, taskId) {
  return async dispatch => {
    const todoList = await todoListService.deleteTask(todoListId, taskId);
    dispatch({ type: 'SET_TODOLIST', todoList });
  }
}
