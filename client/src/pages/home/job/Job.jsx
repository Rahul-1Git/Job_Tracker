import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Job.css";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Job() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://job-tracker-kappa-vert.vercel.app/api/getAllJob", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(response.data);
    }
    fetchData();
  }, []);

  const deleteUser = async (jobId) => {
    try {
      const token = localStorage.getItem("token"); // Fetch token from localStorage
      const response = await axios.delete(
        `http://localhost:4000/api/deleteJob/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );

      // After successful deletion, filter the job from the state
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      console.log(response);
      toast.success("Deleted successfully", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job", { position: "top-right" });
    }
  };

  const filteredJobs =
    statusFilter === "All"
      ? jobs
      : jobs.filter((job) => job.status === statusFilter);
  return (
    <div className="job">
      <header className="header">
        <select
          name="status"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </header>

      <div className="job_list">
        <div className="alljob">
          {filteredJobs.map((data, index) => {
            return (
              <div className="item">
                <ul key={index}>
                  <li>
                    <b>Company:</b> {data.company}
                  </li>
                  <li>
                    <b>Role:</b> {data.role}
                  </li>
                  <li>
                    <b>Status: </b>
                    {data.status}
                  </li>
                  <li>
                    <b>Application date:</b> {data.appliedDate.slice(0, 10)}
                  </li>
                  <li>
                    <b>Link:</b>{" "}
                    <a
                      href={
                        data.link.startsWith("http://") ||
                        data.link.startsWith("https://")
                          ? data.link
                          : `https://${data.link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      link
                    </a>
                  </li>
                  <div className="edit">
                    <NavLink to={`/update/` + data._id}>
                      <button>
                        <BiSolidEdit />
                      </button>
                    </NavLink>
                    <button onClick={() => deleteUser(data._id)}>
                      <MdDelete />
                    </button>
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Job;
