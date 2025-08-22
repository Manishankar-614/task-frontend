import {useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] =  useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const getTasks = async () => {
    const res = await axios.get(`${API_URL}/api/tasks`);
    setTasks(res.data);
  };
  const createTask = async () => {
    if (!title) return;
    await axios.post(`${API_URL}/api/tasks`,{title});
    setTitle('');
    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/api/tasks/${id}`) ;
    getTasks();
  }
  useEffect(() => {
    getTasks();
  }, [] );

  return (
    <div className="d">
      <img src="https://i.pinimg.com/736x/1c/ff/0b/1cff0b33f92ffd7f34f5cc80adbbf9af.jpg" alt="Profile" />
      <h1>Task Manager</h1>
      <input 
      type="text" 
      value={title}
      placeholder="Enter the task"
      onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add</button>
      <ul>
        {tasks.map((task) => {
          <li key={tasks._id}>
            {task.title}
          <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>

        })}
      </ul>
      
    </div>
  );

}

export default App;