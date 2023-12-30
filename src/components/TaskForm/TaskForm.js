// src/components/TaskForm/TaskForm.js
import React, { useState } from 'react';
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';

const TaskForm = ({ addTask, taskData }) => {
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const taskpriority = [
    { value: 'Low', title: 'Low' },
    { value: 'Medium', title: 'Medium' },
    { value: 'High', title: 'High' },
  ];
  const handleSubmit = (e) => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
    e.preventDefault();
    if (newTask.trim().length >= 3 && dueDate && description && priority) {
      addTask({
        newTask: newTask,
        dueDate: dueDate,
        description: description,
        priority: priority,
        time: formattedDate,
      });
      setNewTask('');
      setDueDate('');
      setDescription('');
      setPriority('');
    } else {
      alert('Fill All The Info...');
    }
  };

  const handleFAQque = (e) => {
    const filterQue = taskData?.find(
      (item) =>
        e.target.value.trim().replace(/\s+/g, ' ').toLowerCase() ==
        item?.title?.toLowerCase()
    );
    if (filterQue) {
      alert('Task already exists..!');
      setNewTask('');
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className='align-items-center'>
          <Col>
            <FormLabel>Add New Task</FormLabel>
            <Form.Control
              type='text'
              placeholder='enter task'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onBlur={(e) => handleFAQque(e)}
            />
          </Col>
          <Col>
            <FormLabel>Enter Due Date</FormLabel>

            <Form.Control
              type='date'
              name='date'
              placeholder='Enter due date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Col>
          <Col>
            <FormLabel>Add Description</FormLabel>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col>
            <FormLabel>Select Priority</FormLabel>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value='' hidden>
                Priority
              </option>
              {taskpriority.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Button type='submit'>Add Task</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default TaskForm;
