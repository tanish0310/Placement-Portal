import React, { useEffect, useState } from "react";
import "../../App.css";


const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  

  
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    setAdminData(storedAdmin);

    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/home";
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {adminData?.name || "Admin"}</h1>

      {/* Companies Section */}
      <div className="dashboard-section">
        <h2>Companies</h2>
        {companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          className="view-button"
          onClick={() => (window.location.href = "/admin/ViewCompany")}
        >
          View & Manage Companies
        </button>
      </div>

      <div className="dashboard-section">
  <h2>Students</h2>
  {students.length === 0 ? (
    <p>No Students found.</p>
  ) : (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  <button
    className="view-button"
    onClick={() => (window.location.href = "/admin/ViewStudents")}
  >
    View & Manage Students
  </button>
</div>


      {/* Logout Button */}
      <div className="dashboard-actions">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
 

    

}

export default AdminDashboard;
