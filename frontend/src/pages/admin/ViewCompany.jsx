import React, { useEffect, useState } from "react";
import { fetchCompanies, deleteCompany } from "../../api/user"; 
import "./ViewCompany.css";
const ViewCompany = () => {
  const [companies, setCompanies] = useState([]);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompaniesData = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompaniesData();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deleteCompany(id); // Call API to delete the company
      setCompanies(companies.filter((company) => company.id !== id)); // Update the state
      alert("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Failed to delete the company");
    }
  };

  return (
    <div className="view-company-container">
      <h2>Company List</h2>
      {companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <table className="company-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(company.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewCompany;
