// src/pages/student/ApplyJobsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApplyJobs.css";
import { useNavigate } from "react-router";

const ApplyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedStudent = JSON.parse(localStorage.getItem("student"));
      setStudent(storedStudent);

      try {
        const jobsRes = await axios.get("http://localhost:8000/api/jobs/list/");
        console.log("Fetched jobs:", jobsRes.data); // 👀 Debug output
        setJobs(jobsRes.data);

        const appliedRes = await axios.get("/api/student/applied-jobs");
        setAppliedJobs(appliedRes.data.map((job) => job.id)); // Only job IDs
      } catch (err) {
        console.error("Error loading job data:", err);
      }
    };

    fetchData();
  }, []);

  // Filter jobs based on student CGPA
  const filteredJobs = jobs.filter((job) => {
    const cgpaRequirement = parseFloat(job.eligibility);
    return student?.cgpa >= cgpaRequirement;
  });

  const handleApply = (jobId, job) => {
    console.log(`Applying to job with ID: ${jobId}`);
    navigate(`/student/apply/${jobId}`, {
      state: {
        company: job.company_name,
        title: job.title,
      },
    });
  };

  return (
    <div className="apply-jobs-container">
      <h1>Apply for Jobs</h1>

      {filteredJobs.length === 0 ? (
        <p>No jobs available that match your eligibility.</p>
      ) : (
        <ul className="job-list">
          {filteredJobs.map((job) => (
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
                <button onClick={() => handleApply(job.id, job)}>Apply</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="page-actions">
        {/* <button
          onClick={() => (window.location.href = "/student/update-profile")}
        >
          Update Profile
        </button>
        <button
          onClick={() => (window.location.href = "/student/change-password")}
        >
          Change Password
        </button> */}
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
