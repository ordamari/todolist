import React, { useEffect, useState } from 'react';
import { utilService } from '../../services/utilService';
import TaskPreview from './TaskPreview';

export default function TaskList({
  tasks,
  sortBy,
  users,
  onDeleteTask,
  setEditTask
}) {

  const [sortedTasks, setSortedTasks] = useState([]);
  const [isStartToEnd, setIsStartToEnd] = useState(true);
  const [openedTask, setOpenedTask] = useState('');

  useEffect(() => {
    if (tasks) setSortedTasks(utilService.getSortedTasks(tasks, sortBy, isStartToEnd));
  }, [sortBy, tasks]);

  function isTaskOpen(taskId) {
    return openedTask === taskId
  }

  function toggleIsOpen(taskId) {
    setOpenedTask(openedTask === taskId ? '' : taskId)
  }


  return (
    <div className="task-list">
      {!!sortedTasks.length ? (

        sortedTasks.map(task => (
          <TaskPreview
            key={task.id}
            task={task}
            isOpen={isTaskOpen(task.id)}
            toggleIsOpen={toggleIsOpen}
            users={users}
            onDeleteTask={onDeleteTask}
            setEditTask={setEditTask}
          />
        ))
      ) : (
        <p>Sorry, you do not have any task that follow this filter</p>
      )}

    </div>
  )
}

