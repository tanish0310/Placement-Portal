import React, { useEffect, useState } from "react";
import "./Company.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    // Get company data from localStorage
    const storedCompany = JSON.parse(localStorage.getItem("company"));
    setCompanyData(storedCompany);

    const fetchPostedJobs = async () => {
      try {
        const res = await axios.get("/api/company/jobs");
        setPostedJobs(res.data);
      } catch (err) {
        console.error("Error fetching posted jobs", err);
      }
    };

    fetchPostedJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("company");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {companyData?.name || "Company"}</h1>

      <div className="profile-section">
        <h2>Company Info</h2>
        <p>
          <strong>Email:</strong> {companyData?.email}
        </p>
        <p>
          <strong>Description:</strong> {companyData?.description || "N/A"}
        </p>
      </div>

      <div className="jobs-section">
        <h2>Your Posted Jobs</h2>
        {postedJobs.length === 0 ? (
          <p>You haven't posted any jobs yet.</p>
        ) : (
          <ul>
            {postedJobs.map((job) => (
              <li key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>
                  <strong>Eligibility:</strong> {job.eligibility}
                </p>
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dashboard-actions">
        <button onClick={() => (window.location.href = "/company/PostJob")}>
          Post a Job
        </button>
        {/* <button onClick={() => (window.location.href = "/company/update-info")}>
          Update Company Info
        </button> */}
        <button
          onClick={() =>
            (window.location.href = "/company/update-job-criteria")
          }
        >
          Update Job Criteria
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default CompanyDashboard;
