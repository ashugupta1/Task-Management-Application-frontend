import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3006/tasks');
      setTaskList(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm task={updateTask} setTaskList={setTaskList} updateMode={updateMode} setUpdateMode={setUpdateMode} />
      <TaskList taskList={taskList} setTaskList={setTaskList} setUpdateTask={setUpdateTask} setUpdateMode={setUpdateMode} />
    </div>
  );
};

export default App;
