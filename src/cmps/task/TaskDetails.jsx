import React from 'react';
import { utilService } from '../../services/utilService';

export default function TaskDetails({
  task,
  taskInChargeOf,
  onDeleteTask,
  toggleIsOpen,
  setEditTask,
  isOpen
}) {

  function onDeleteThisTask() {
    toggleIsOpen(task.id);
    onDeleteTask(task.id);
  }

  return (
    <div className={`task-details ${isOpen? 'open':'close'}`}>
      <div className="descripiton-container">
        <p>{task.descripiton}</p>
      </div>
      <div className="other-details">
        <p className="status">Status: {task.status}</p>
        <p className="priority">Priority: {task.priority}</p>
        <p className="due-date">Due Date:{utilService.timestampToStr(task.dueDate)}</p>
        <p className="in-charge-of">In Charge Of: {taskInChargeOf.userName}</p>
        <p className="in-charge-of">Create at: {utilService.timestampToStr(task.createAt)}</p>
      </div>
      <div className="btns-container flex justify-space-between">
        <button onClick={() => { setEditTask(task) }} >edit</button>
        <button onClick={onDeleteThisTask} >delete</button>
      </div>
    </div>
  )
}

