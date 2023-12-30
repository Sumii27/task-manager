// src/components/TaskItem/TaskItem.js
import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div className='task-item'>
      <p>{task.title}</p>
    </div>
  );
};

export default TaskItem;
