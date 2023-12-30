// src/App.js
import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import { Container } from 'react-bootstrap';
import TaskGraph from './components/TaskGraph/TaskGraph';

function App() {
  const [tasks, setTasks] = useState([]);
  console.log('tassss', tasks.length);
  const addTask = (values) => {
    const updatedTasks = [
      ...tasks,
      {
        id: tasks.length + 1,
        title: values.newTask,
        dueDate: values.dueDate,
        description: values.description,
        priority: values.priority,
        time: values.time,
      },
    ];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);
  return (
    <Container>
      <h1>Task Management App</h1>
      {tasks.length > 0 && <TaskGraph tasks={tasks} />}
      <TaskForm addTask={addTask} taskData={tasks} />
      <TaskList addedTask={tasks} />
    </Container>
  );
}

export default App;
