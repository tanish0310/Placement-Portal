import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import axios from "axios";
import { useNavigate } from "react-router";

const StudentDashboard = () => {
  const navigate = useNavigate();
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
       const student = JSON.parse(localStorage.getItem("student"));
       const res = await axios.get(
         `/api/student/applied-jobs?student_id=${student.id}`
       );
       setAppliedJobs(res.data); // This will correctly update the appliedJobs state
     } catch (error) {
       console.error("Failed to fetch applied jobs:", error);
     }
   };



    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/");
  };

  const handleApply = (jobId) => {
    console.log(`Applying to job with ID: ${jobId}`);
    // TODO: Implement application logic
  };

  return (
    <div className="studentdashboard-container">
      <div className="dashboard-container">
        <h1>Welcome, {student?.name || "Student"}</h1>

        {/* Profile Section */}
        <div className="leftside">
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
        </div>

        {/* Job Listings */}
        <div className="rightside">
          {/* Applied Jobs */}
          <section className="applied-jobs-section">
            <h2>Jobs You've Applied To</h2>
            {appliedJobs.length === 0 ? (
              <p>You haven't applied to any jobs yet.</p>
            ) : (
              <ul className="applied-job-list">
                {appliedJobs.map((job) => (
                  <li key={job.id} className="applied-job-item">
                    <div className="job-details">
                      <h4>
                        {job.title} at {job.company_name}
                      </h4>
                      <p>
                        Status:
                        <span
                          className={`status-tag ${job.status.toLowerCase()}`}
                        >
                          {job.status}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Actions */}
        <div className="dashboard-actions">
          <button onClick={() => (window.location.href = "/student/ApplyJobs")}>
            Apply Job
          </button>
          <button
            onClick={() => (window.location.href = "/student/ChangePassword")}
          >
            Change Password
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
