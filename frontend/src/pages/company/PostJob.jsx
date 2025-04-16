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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", jobData);
    setJobData({
      title: "",
      description: "",
      location: "",
      salary: "",
      eligibility: "",
      deadline: "",
    });
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
