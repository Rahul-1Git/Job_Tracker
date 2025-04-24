import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./Update.css";

function Update() {
  const { id } = useParams();
  const [update, setUpdate] = useState({
    company: "",
    role: "",
    status: "",
    appliedDate: "",
    link: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  function handleChanges(e) {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Fetch job data for updating
  useEffect(() => {
    const fetchJobData = async () => {
      const token = localStorage.getItem("token"); // Get the JWT token from localStorage
      try {
        const response = await axios.get(
          `http://localhost:4000/api/getJob/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers for authentication
            },
          }
        );
        setUpdate(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobData();
  }, [id]);

  // Submit the updated job data
  async function submitForm(e) {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the JWT token from localStorage
    try {
      const response = await axios.put(
        `http://localhost:4000/api/updateJob/${id}`,
        update,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers for authentication
          },
        }
      );
      console.log("Job updated successfully:", response.data);
      toast.success("Updated successfully", { position: "top-right" });
      navigate("/"); // Redirect to the home page after successful update
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error("Failed to update job", { position: "top-right" });
    }
  }

  return (
    <div className="container">
      <h1>Update Job Application</h1>
      <form className="form" onSubmit={submitForm}>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            placeholder="company"
            onChange={handleChanges}
            value={update.company}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            placeholder="role"
            onChange={handleChanges}
            value={update.role}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select name="status" onChange={handleChanges} value={update.status}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date of Application</label>
          <input
            type="date"
            name="appliedDate"
            value={update.appliedDate.slice(0, 10)}
            onChange={handleChanges}
          />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input
            type="text"
            name="link"
            placeholder="link"
            onChange={handleChanges}
            value={update.link}
          />
        </div>

        <button>Update</button>
      </form>
    </div>
  );
}

export default Update;
