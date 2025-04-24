import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Addjobs.css";

function AddJob() {
  const [item, setItem] = useState({
    company: "",
    role: "",
    status: "",
    appliedDate: "",
    link: "",
  });

  const navigate = useNavigate();

  function inputHandler(e) {
    const { name, value } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleClick(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://job-tracker-kappa-vert.vercel.app/api/createJob",
        item,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Submitting item:", item);
      console.log("Job created successfully:", response.data);
      toast.success("add the job successfully");
      navigate("/");
    } catch (error) {
      console.log("Submitting item:", item);
      console.error("Error creating job:", error);
    }
  }

  return (
    <div className="container">
      <h1>Add Job Application</h1>
      <form className="form" onSubmit={handleClick}>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            placeholder="company"
            onChange={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            placeholder="role"
            onChange={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select name="status" id="" onChange={inputHandler}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date of Application</label>
          <input type="date" name="appliedDate" id="" onChange={inputHandler} />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            name="link"
            placeholder="link"
            onChange={inputHandler}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddJob;
