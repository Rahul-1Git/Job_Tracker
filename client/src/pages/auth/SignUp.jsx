import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignUp() {
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSignup(e) {
    e.preventDefault();
    const { name, email, password } = signUp;
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res = await fetch("https://job-tracker-kappa-vert.vercel.app/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUp),
      });

      const data = await res.json();
      const { success, message, error } = data;

      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        toast.error(details);
      } else if (!success) {
        toast.error(message);
      }
      console.log(result);
    } catch (err) {
      toast.error("Server error");
    }
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            value={signUp.name}
          />
        </div>
        <div>
          <label htmlFor="name">Email : </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            value={signUp.email}
          />
        </div>
        <div>
          <label htmlFor="name">Password : </label>
          <input
            type="password"
            name="password"
            id=""
            placeholder="enter password"
            onChange={handleChange}
            value={signUp.password}
          />
        </div>
        <button>Submit</button>
        <p>
          Already have account <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
