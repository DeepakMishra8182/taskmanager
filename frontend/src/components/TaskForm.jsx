import { useState } from "react";
import axios from "axios";
import './taskfrom.css'

const TaskForm = ({ fetchTasks, editTask, setEditTask }) => {
  const [title, setTitle] = useState(editTask ? editTask.title : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (editTask) {
        await axios.put(
          `http://localhost:3000/tasks/${editTask._id}`,
          { title },
          { withCredentials: true }
        );
        setEditTask(null);
      } else {
        await axios.post(
          "http://localhost:3000/tasks",
          { title },
          { withCredentials: true }
        );
      }

      setTitle("");
      fetchTasks();
    } catch (err) {
      setError("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="taskform-container">
      <h3 className="taskform-title">
        {editTask ? "Update Task" : "Add Task"}
      </h3>

      {error && <p className="taskform-error">{error}</p>}

      <form className="taskform-form" onSubmit={handleSubmit}>
        <input
          className="taskform-input"
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="taskform-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : editTask
            ? "Update"
            : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;