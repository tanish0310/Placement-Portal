// src/pages/student/ApplyJobsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApplyJobs.css";

const ApplyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedStudent = JSON.parse(localStorage.getItem("student"));
      setStudent(storedStudent);

      try {
        const jobsRes = await axios.get("/api/jobs");
        setJobs(jobsRes.data);

        const appliedRes = await axios.get("/api/student/applied-jobs");
        setAppliedJobs(appliedRes.data.map((job) => job.id)); // Only job IDs
      } catch (err) {
        console.error("Error loading job data:", err);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await axios.post(`/api/student/apply-job/${jobId}`);
      alert("Applied successfully!");
      setAppliedJobs([...appliedJobs, jobId]);
    } catch (err) {
      alert("Failed to apply for job");
      console.error(err);
    }
  };

  return (
    <div className="apply-jobs-container">
      <h1>Apply for Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.id} className="job-card">
              <h2>{job.title}</h2>
              <p>
                <strong>Company:</strong> {job.company_name}
              </p>
              <p>
                <strong>Eligibility:</strong> {job.eligibility}
              </p>
              <p>
                <strong>Description:</strong> {job.description}
              </p>

              {appliedJobs.includes(job.id) ? (
                <button disabled>Already Applied</button>
              ) : (
                <button onClick={() => handleApply(job.id)}>Apply</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="page-actions">
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
        <button
          onClick={() => (window.location.href = "/student/StudentDashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ApplyJobs;
