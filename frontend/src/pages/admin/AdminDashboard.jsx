import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [students, setStudents] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    setAdminData(storedAdmin);

    const fetchData = async () => {
      try {
        const [compRes, jobRes, studentRes, appliedRes] = await Promise.all([
          axios.get("/api/admin/companies"),
          axios.get("/api/admin/jobs"),
          axios.get("/api/admin/students"),
          axios.get("/api/admin/applied-jobs"),
        ]);
        setCompanies(compRes.data);
        setJobs(jobRes.data);
        setStudents(studentRes.data);
        setAppliedJobs(appliedRes.data);
      } catch (err) {
        console.error("Error fetching admin dashboard data", err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/home";
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {adminData?.name || "Admin"}</h1>

      <div className="dashboard-section">
        <h2>Companies</h2>
        {companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          <ul>
            {companies.map((company) => (
              <li key={company.id} className="dashboard-card">
                <h3>{company.name}</h3>
                <p>
                  <strong>Email:</strong> {company.email}
                </p>
                <button
                  onClick={() => {
                    /* Update logic */
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    /* Delete logic */
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => (window.location.href = "/admin/add-company")}>
          Add Company
        </button>
      </div>

      <div className="dashboard-section">
        <h2>Jobs</h2>
        {jobs.length === 0 ? (
          <p>No job listings found.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job.id} className="dashboard-card">
                <h3>{job.title}</h3>
                <p>
                  <strong>Company:</strong> {job.company_name}
                </p>
                <button
                  onClick={() => {
                    /* Update logic */
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    /* Delete logic */
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => (window.location.href = "/admin/add-job")}>
          Add Job
        </button>
      </div>

      <div className="dashboard-section">
        <h2>Registered Students</h2>
        {students.length === 0 ? (
          <p>No students registered.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student.id} className="dashboard-card">
                <h3>{student.name}</h3>
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                <p>
                  <strong>Branch:</strong> {student.branch}
                </p>
                <button
                  onClick={() => {
                    /* Update logic */
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    /* Delete logic */
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Applied Jobs by Students</h2>
        {appliedJobs.length === 0 ? (
          <p>No job applications found.</p>
        ) : (
          <ul>
            {appliedJobs.map((item, index) => (
              <li key={index} className="dashboard-card">
                <p>
                  <strong>{item.student_name}</strong> applied to{" "}
                  <strong>{item.job_title}</strong> at{" "}
                  <strong>{item.company_name}</strong>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dashboard-actions">
        <button
          onClick={() => (window.location.href = "/admin/change-password")}
        >
          Change Password
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
