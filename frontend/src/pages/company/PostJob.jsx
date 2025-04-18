import React, { useState } from "react";
import "./PostJob.css"; // CSS file for styles

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    eligibility: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const companyId = localStorage.getItem("companyId");

  const jobDataToSend = {
    title: jobData.title,
    description: jobData.description,
    location: jobData.location,
    salary: jobData.salary,
    eligibility: jobData.eligibility,
    deadline: jobData.deadline,
    company: companyId, // Add companyId to the job data
  };

  try {
    const response = await fetch("http://localhost:8000/api/jobs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobDataToSend),
    });

    if (response.ok) {
      alert("Job posted successfully!");
      setJobData({
        title: "",
        description: "",
        location: "",
        salary: "",
        eligibility: "",
        deadline: "",
      });
    } else {
      alert("Failed to post job.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while posting the job.");
  }
};





  return (
    <div className="post-job-container">
      <div className="post-job-card">
        <h2 className="post-job-title">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="post-job-form">
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Eligibility Criteria</label>
            <textarea
              name="eligibility"
              value={jobData.eligibility}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Application Deadline</label>
            <input
              type="date"
              name="deadline"
              value={jobData.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
