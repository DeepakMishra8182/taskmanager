import { useEffect, useState } from "react";
import axios from "axios";
import './tasklist.css'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:3000/tasks", {
        withCredentials: true,
      });

      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        withCredentials: true,
      });
      fetchTasks();
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div className="tasklist-container">
      <h2 className="tasklist-title">Task List</h2>

      {error && <p className="tasklist-error">{error}</p>}
      {loading && <p className="tasklist-loading">Loading...</p>}

      <ul className="tasklist-list">
        {tasks.map((task) => (
          <li className="tasklist-item" key={task._id}>
            <span className="tasklist-text">{task.title}</span>
            <button
              className="tasklist-btn"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;