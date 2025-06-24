import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewApplications.css";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To handle any errors

  const company = JSON.parse(localStorage.getItem("company"));

  // Fetch applications when the component mounts or company email changes
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/company/view-applications/",
          {
            params: { email: company.email },
          }
        );
        console.log("Fetched applications:", response.data); // Debug
        setApplications(response.data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [company.email]);

  const handleDecision = async (applicationId, decision) => {
    try {
      // Show loading indicator on decision change
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/company/decide-application/",
        {
          id: applicationId,
          decision: decision,
        }
      );

      console.log("Decision updated:", response.data);
      // Update the application list after decision
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === applicationId ? { ...app, status: decision } : app
        )
      );
    } catch (error) {
      console.error("Failed to update application status", error.response.data);
      setError(
        "Failed to update the application status. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading applications...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="view-applications-container">
      <h2>Student Applications for Your Jobs</h2>
      {applications.length === 0 ? (
        <p>No applications available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>CGPA</th>
              <th>Preferred Location</th>
              <th>Resume</th>
              <th>Applied At</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => {
              console.log("Application object:", app); // Debug each app object
              return (
                <tr key={index}>
                  <td>{app.job_title}</td>
                  <td>{app.student_name}</td>
                  <td>{app.student_email}</td>
                  <td>{app.student_cgpa}</td>
                  <td>{app.preferred_location || "N/A"}</td>
                  <td>
                    <a href={app.resume_url} target="_blank" rel="noreferrer">
                      View Resume
                    </a>
                  </td>
                  <td>{new Date(app.applied_at).toLocaleString()}</td>
                  {/* <td> */}
                    {/* <button
                      className="accept-btn"
                      onClick={() => handleDecision(app.id, "Accepted")}
                      disabled={app.status === "Accepted"}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleDecision(app.id, "Rejected")}
                      disabled={app.status === "Rejected"}
                    >
                      Reject
                    </button> */}
                  {/* </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewApplications;
