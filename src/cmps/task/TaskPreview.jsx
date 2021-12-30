import React from 'react';
import TaskDetails from './TaskDetails';

export default function TaskPreview({
  task,
  isOpen,
  toggleIsOpen,
  users,
  onDeleteTask,
  setEditTask
}) {

  const taskInChargeOf = users.find(user => user.id === task.inChargeOf);

  return (
    <div className="task-container">
      <div
        className='task-preview'
        onClick={() => toggleIsOpen(task.id)}
      >
        <p>{task.title}</p>
      </div>
        <TaskDetails
          task={task}
          taskInChargeOf={taskInChargeOf}
          onDeleteTask={onDeleteTask}
          toggleIsOpen={toggleIsOpen}
          setEditTask={setEditTask}
          isOpen={isOpen}
        />
    </div>
  )
}

