import React from "react";
import axios from "axios";

const TaskList = ({ taskList, setTaskList, setUpdateTask, setUpdateMode }) => {

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3006/tasks/${taskId}`);
      setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Update the task list locally
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await axios.patch(`http://localhost:3006/tasks/${taskId}`, {
        isCompleted: true,
      });
      // Update task status locally without refetching
      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: true } : task
        )
      );
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const editTask = (task) => {
    setUpdateTask(task);
    setUpdateMode(true);
  };

  return (
    <div>
      <h2>Task List</h2>
      {taskList.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        taskList.map((task) => (
          <div
            key={task._id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Due Date:{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No Due Date"}
            </p>
            <p>Category: {task.category || "No Category"}</p>
            <p>Status: {task.isCompleted ? "Completed" : "Not Completed"}</p>
            <button
              onClick={() => completeTask(task._id)}
              disabled={task.isCompleted}
            >
              {task.isCompleted ? "Completed" : "Mark as Complete"}
            </button>
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
