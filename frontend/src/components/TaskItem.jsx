import { useState } from "react";
import axios from "axios";
import './taskitem.css'

const TaskItem = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.put(
        `http://localhost:3000/tasks/${task._id}`,
        { title },
        { withCredentials: true }
      );

      setIsEditing(false);
      fetchTasks();
    } catch (err) {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/tasks/${task._id}`,
        { withCredentials: true }
      );
      fetchTasks();
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <li>
      {error && <p>{error}</p>}

      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Save"}
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;