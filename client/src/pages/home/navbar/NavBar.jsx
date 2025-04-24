import React from "react";
import "./Navbar.css";
import Job from "../job/Job";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser"); // if you're storing the username
    navigate("/login");
    window.location.reload(); // optional: force full state reset
  };
  return (
    <>
      <div className="Navbar">
        <h1>Job Tracker</h1>
        <div className="buttons">
          <NavLink to="/">
            <button>Jobs</button>
          </NavLink>
          <NavLink to="/add">
            <button>Add +</button>
          </NavLink>
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
