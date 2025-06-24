import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostJob.css";
import { postJob } from "../../api/user";

const PostJob = () => {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    eligibility: "",
    deadline: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get company data from localStorage
  const companyData = JSON.parse(localStorage.getItem("company"));
  const companyId = companyData?.id; // Make sure your company data includes ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "location",
      "salary",
      "eligibility",
      "deadline",
    ];
    const missingFields = requiredFields.filter((field) => !jobDetails[field]);

    if (missingFields.length > 0) {
      setError(`Please fill all required fields: ${missingFields.join(", ")}`);
      return;
    }

    if (!companyId) {
      setError("Company information is missing. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const jobData = {
        ...jobDetails,
        company: companyId, 
        salary: parseFloat(jobDetails.salary).toFixed(2), 
      };

      console.log("Submitting job data:", jobData); 

      await postJob(jobData);
      alert("Job posted successfully!");
      navigate("/company/CompanyDashboard");
    } catch (err) {
      console.error("Error posting job:", err);
      setError(
        err.response?.data?.error?.details ||
          err.response?.data?.error ||
          "Failed to post job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-container">
      <div className="post-job-card">
        <h2 className="post-job-title">Post a Job</h2>
        <form onSubmit={handleSubmit} className="post-job-form">
          <div className="form-group">
            <label htmlFor="title">Job Title*</label>
            <input
              type="text"
              name="title"
              value={jobDetails.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              name="description"
              value={jobDetails.description}
              onChange={handleChange}
              placeholder="Enter job description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              name="location"
              value={jobDetails.location}
              onChange={handleChange}
              placeholder="Enter job location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary (INR)*</label>
            <input
              type="number"
              name="salary"
              value={jobDetails.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eligibility">Eligibility Criteria*</label>
            <input
              type="text"
              name="eligibility"
              value={jobDetails.eligibility}
              onChange={handleChange}
              placeholder="Enter eligibility criteria"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Application Deadline*</label>
            <input
              type="date"
              name="deadline"
              value={jobDetails.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Posting Job..." : "Post Job"}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostJob;
