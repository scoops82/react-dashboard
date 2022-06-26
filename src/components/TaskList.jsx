import React from "react";

const { useState } = React;

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [completedTaskList, setCompletedTaskList] = useState([]);

  const addTask = (task, e) => {
    e.preventDefault();
    setTaskList([...taskList, task]);
    setNewTask("");
  };

  const deleteTask = (idx) =>
    setTaskList([...taskList.slice(0, idx), ...taskList.slice(idx + 1)]);

  const completeTask = (idx) => {
    setCompletedTaskList([taskList[idx], ...completedTaskList]);
    deleteTask(idx);
  };

  const deleteCompletedTask = (idx) =>
    setCompletedTaskList([
      ...completedTaskList.slice(0, idx),
      ...completedTaskList.slice(idx + 1),
    ]);

  const undoCompletion = (idx) => {
    setTaskList([completedTaskList[idx], ...taskList]);
    deleteCompletedTask(idx);
  };

  const completedTaskStyles = {
    textDecorationLine: "line-through",
    opacity: 0.4,
  };

  return (
    <div>
      <h2>Task List</h2>
      <form onSubmit={(e) => addTask(newTask, e)}>
        <input
          type="text"
          name="new-task-input"
          id="new-task-input"
          placeholder="Add new task here"
          value={newTask}
          onChange={($e) => setNewTask($e.target.value)}
        />
        <button type="submit">+</button>
      </form>
      <ul id="incomplete-task-list" style={{}}>
        {taskList.map((task, i) => (
          <li key={i}>
            <p>{task}</p>
            <button onClick={() => completeTask(i)}>
              <span>&#10003;</span>
            </button>
            <button onClick={() => deleteTask(i)}>X</button>
          </li>
        ))}
      </ul>
      <ul id="completed-task-list">
        {completedTaskList.map((task, i) => (
          <li key={i}>
            <p style={completedTaskStyles}>{task}</p>
            <button onClick={() => undoCompletion(i)}>
              <span>&#10553;</span>
            </button>
            <button onClick={() => deleteCompletedTask(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
