import React, { useEffect, useState } from "react";
import { fetchJobApplications } from "../../api/user";
import "./AdminViewApplications.css";

const AdminViewApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await fetchJobApplications();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="view-applications-container">
      <h1>View Job Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Job Title</th>
              <th>Preferred Location</th>
              <th>Applied At</th>
              {/* <th>Status</th> */}
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.student}</td>
                <td>{application.job}</td>
                <td>{application.preferred_location || "N/A"}</td>
                <td>{new Date(application.applied_at).toLocaleString()}</td>
                {/* <td>{application.status}</td> */}
                <td>
                  {application.resume ? (
                    <a href={application.resume} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminViewApplications;
