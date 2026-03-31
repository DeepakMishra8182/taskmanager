import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">Task Manager</h2>

      <div className="navbar-links">

        {user && (
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        )}

        {!user && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}

        {user && (
          <button className="nav-btn" onClick={handleLogout}>Logout</button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;