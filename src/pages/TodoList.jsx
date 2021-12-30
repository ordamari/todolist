import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { onSetTasks } from "../actions/todoListActions";
import { onAddTask } from "../actions/todoListActions";
import { onEditTask } from "../actions/todoListActions";
import { onDeleteTask } from "../actions/todoListActions";
import { onSetUsers } from '../actions/userActions';
import { onLogout } from '../actions/userActions';
import TaskList from '../cmps/task/TaskList';
import Add from '../cmps/todoListActions/Add';
import Edit from '../cmps/todoListActions/Edit';
import Filter from '../cmps/todoListActions/Filter';
import Sort from '../cmps/todoListActions/Sort';
import { utilService } from '../services/utilService';



function _TodoList(props) {
  const [filterTasks, setFilterTasks] = useState([]);
  const [filterBy, setFilterBy] = useState('all tasks');
  const [sortBy, setSortBy] = useState('creation date');
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    if (!props.loggedInUser) props.history.push('/')
    else {
      props.onSetTasks(props.loggedInUser.todoList);
      props.onSetUsers();
    }
  }, [])

  useEffect(() => {
    if (props.todoList) setFilterTasks(utilService.getFilteredTasks(props.todoList.tasks, filterBy));
  }, [filterBy, props.todoList])

  function onAddTask(task) {
    props.onAddTask(props.todoList.id, task);
  }

  function onEditTask(task) {
    props.onEditTask(props.todoList.id, task);
  }

  function onDeleteTask(taskId) {
    props.onDeleteTask(props.todoList.id, taskId);
  }

  function toggleIsAddTaskOpen() {
    setAddTaskOpen(state => !state)
  }

  function onLogout() {
    props.onLogout();
    props.history.push('/');
  }

  return (
    <div className='main-container todo-list' >
      <h1>TODO List</h1>
      {props.loggedInUser &&
        <p className='welcome' >Welcome {props.loggedInUser.userName}, if you want to connect from another user - <span onClick={onLogout}>logout</span></p>
      }
      <div className="action-containers flex align-center">
        <Filter
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />
        <Sort
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <button
          onClick={toggleIsAddTaskOpen}
        >
          add
        </button>
      </div>

      <Add
        isOpen={addTaskOpen}
        toggleIsOpen={toggleIsAddTaskOpen}
        users={props.users}
        onAddTask={onAddTask}
      />
      <Edit
        task={editTask}
        close={() => { setEditTask(null) }}
        users={props.users}
        onEditTask={onEditTask}
      />

      {props.todoList &&
        <TaskList
          tasks={filterTasks}
          sortBy={sortBy}
          users={props.users}
          onDeleteTask={onDeleteTask}
          setEditTask={setEditTask}
        />
      }
    </div>
  )
}
//redux
const mapStateToProps = state => {
  return {
    todoList: state.todoList.todoList,
    users: state.user.users,
    loggedInUser: state.user.loggedInUser
  }
}
const mapDispatchToProps = {
  onSetTasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onSetUsers,
  onLogout
}
export const TodoList = connect(mapStateToProps, mapDispatchToProps)(_TodoList)

