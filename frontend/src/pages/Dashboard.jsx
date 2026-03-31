import { useState, useEffect } from "react";
import axios from "axios";
import './dashboard.css'

const Dashboard = () => {

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks", {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (editId) {
        await axios.put(
          `http://localhost:3000/tasks/${editId}`,
          { title },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:3000/tasks",
          { title },
          { withCredentials: true }
        );
      }

      setTitle("");
      setEditId(null);
      fetchTasks();
    } catch (err) {
      setError("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

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
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>

      {error && <p className="dashboard-error">{error}</p>}

      <form className="dashboard-form" onSubmit={handleSubmit}>
        <input
          className="dashboard-input"
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="dashboard-btn"
          type="submit"
          disabled={loading}
        >
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <br />

      <ul className="dashboard-list">
        {tasks.map((task) => (
          <li className="dashboard-item" key={task._id}>
            <span className="dashboard-text">{task.title}</span>

            <div className="dashboard-actions">
              <button
                className="dashboard-edit"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>

              <button
                className="dashboard-delete"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;