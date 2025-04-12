import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import Home from "../Home";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    // Replace with your backend endpoint
    const fetchStudentData = async () => {
      try {
        const res = await axios.get("/api/student/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming JWT
          },
        });
        setStudentData(res.data);
      } catch (err) {
        console.error("Error fetching student data", err);
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get("/api/student/applied-jobs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAppliedJobs(res.data);
      } catch (err) {
        console.error("Error fetching applied jobs", err);
      }
    };

    fetchStudentData();
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Home";
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {studentData?.name}</h1>

      <div className="profile-section">
        <h2>Profile</h2>
        <p>
          <strong>Email:</strong> {studentData?.email}
        </p>
        <p>
          <strong>CGPA:</strong> {studentData?.cgpa}
        </p>
        <p>
          <strong>Branch:</strong> {studentData?.branch}
        </p>
        <p>
          <strong>Year:</strong> {studentData?.year}
        </p>
        {studentData?.profile_pic && (
          <img
            src={studentData.profile_pic}
            alt="Profile"
            height="100"
            style={{ borderRadius: "8px" }}
          />
        )}
      </div>
      <div className="jobs-section">
        <h2>Available Jobs</h2>
        {jobs.length === 0 ? (
          <p>No job listings available currently.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>
                  <strong>Company:</strong> {job.company_name}
                </p>
                <p>
                  <strong>Eligibility:</strong> {job.eligibility}
                </p>
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                <button onClick={() => handleApply(job.id)}>Apply</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="applied-jobs-section">
        <h2>Jobs You've Applied To</h2>
        {appliedJobs.length === 0 ? (
          <p>You haven't applied to any jobs yet.</p>
        ) : (
          <ul>
            {appliedJobs.map((job) => (
              <li key={job.id}>
                <h4>
                  {job.title} at {job.company_name}
                </h4>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dashboard-actions">
        <button
          onClick={() => (window.location.href = "/student/update-profile")}
        >
          Update Profile
        </button>
        <button
          onClick={() => (window.location.href = "/student/change-password")}
        >
          Change Password
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default StudentDashboard;
