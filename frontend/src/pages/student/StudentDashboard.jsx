import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    setStudent(storedStudent);

    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get("/api/student/applied-jobs");
        setAppliedJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("student");
    window.location.href = "/LandingPage";
  };

  const handleApply = (jobId) => {
    console.log(`Applying to job with ID: ${jobId}`);
    // TODO: Implement application logic
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {student?.name || "Student"}</h1>

      {/* Profile Section */}
      <section className="profile-section">
        <h2>Profile</h2>
        <p>
          <strong>Email:</strong> {student?.email}
        </p>
        <p>
          <strong>CGPA:</strong> {student?.cgpa}
        </p>
        <p>
          <strong>Branch:</strong> {student?.branch}
        </p>
        <p>
          <strong>Year:</strong> {student?.year}
        </p>
        {student?.profile_pic && (
          <img
            src={student.profile_pic}
            alt={`${student.name}'s profile`}
            height="100"
            style={{ borderRadius: "8px" }}
          />
        )}
      </section>

      {/* Available Jobs */}
      <section className="jobs-section">
        <h2>Available Jobs</h2>
        {jobs.length === 0 ? (
          <p>No job listings available currently.</p>
        ) : (
          <ul className="job-list">
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
      </section>

      {/* Applied Jobs */}
      <section className="applied-jobs-section">
        <h2>Jobs You've Applied To</h2>
        {appliedJobs.length === 0 ? (
          <p>You haven't applied to any jobs yet.</p>
        ) : (
          <ul className="applied-job-list">
            {appliedJobs.map((job) => (
              <li key={job.id}>
                <h4>
                  {job.title} at {job.company_name}
                </h4>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Actions */}
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
