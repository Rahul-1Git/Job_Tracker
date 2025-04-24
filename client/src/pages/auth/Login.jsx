import React, { useState } from "react";
import "./edit.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; // Make sure this is imported!

function Login({ setAuthenticated }) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = login;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      const { success, message, jwtToken, name, error } = response.data;

      if (success) {
        toast.success(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setAuthenticated(true);
        setTimeout(() => {
          navigate("/"); // or "/" if that's your main page
        }, 1000);
      } else if (error) {
        toast.error(error?.details?.[0]?.message || "Something went wrong");
      } else {
        toast.error(message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Server error");
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            value={login.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={login.password}
          />
        </div>
        <button type="submit">Submit</button>
        <p>
          Don’t have an account? <Link to="/signup">SignUp</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
