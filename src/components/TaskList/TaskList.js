// src/components/TaskList/TaskList.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from '../TaskItem/TaskItem';
import moment from 'moment';
import { Table } from 'react-bootstrap';
const TaskList = ({ addedTask }) => {
  const [tasks, setTasks] = useState([]);
  console.log('tasks', tasks);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [addedTask]);

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
    const updatedTasks = Array.from(tasks);
    const [reorderedItem] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedItem);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <>
      {addedTask.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='tasks' type='task'>
            {(provided) => (
              <Table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='table'
                style={{ width: '100%' }}
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#b3f0a2' }}>ID</th>
                    <th style={{ backgroundColor: '#b3f0a2' }}>Task Title</th>
                    <th style={{ backgroundColor: '#b3f0a2' }}>Created Date</th>
                    <th style={{ backgroundColor: '#b3f0a2' }}>Description</th>
                    <th style={{ backgroundColor: '#b3f0a2' }}>Due Date</th>
                    <th style={{ backgroundColor: '#b3f0a2' }}>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <Draggable
                      type='task'
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td>{index + 1}</td>
                          <td>
                            {/* <p>{task.title}</p> */}
                            <TaskItem key={task.id} task={task} />
                          </td>
                          <td>{moment(task.time).format('DD-MMM-YYYY')}</td>
                          <td>{task.description}</td>
                          <td>{moment(task.dueDate).format('DD-MMM-YYYY')}</td>
                          <td>{task.priority}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                </tbody>
                {provided.placeholder}
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
};

export default TaskList;
