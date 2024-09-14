import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ task, setTaskList, updateMode, setUpdateMode }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
  const [category, setCategory] = useState(task ? task.category : '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setCategory(task.category);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }

    try {
      if (updateMode) {
        await axios.patch(`http://localhost:3006/tasks/${task._id}`, { title, description, dueDate, category });
        setUpdateMode(false);
        // Update the task in the task list (for edit mode)
        setTaskList((prevTasks) =>
          prevTasks.map((t) => (t._id === task._id ? { ...t, title, description, dueDate, category } : t))
        );
      } else {
        const response = await axios.post('http://localhost:3006/tasks', { title, description, dueDate, category });
        setTaskList((prevTasks) => [...prevTasks, response.data]);  // Add the new task to the task list
      }
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategory('');
    } catch (error) {
      console.error('Error creating/updating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{updateMode ? 'Edit Task' : 'Create New Task'}</h2>
      <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button type="submit">{updateMode ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
