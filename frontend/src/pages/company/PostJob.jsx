import React, { useState } from "react";
import "./PostJob.css";
import { postJob } from "../../api/user";

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

    // Fetch the company data from localStorage
    const storedCompanyData = localStorage.getItem("company");

    // If no company data is found, alert and stop the process
    if (!storedCompanyData) {
        alert("Please log in to post a job.");
        return;
    }

    let companyName = null;
    try {
        // Parse the stored company data
        const parsedData = JSON.parse(storedCompanyData);
        // Get the company name from the parsed data
        companyName = parsedData?.name; // Assumes the company name is under the 'name' key
    } catch (error) {
        console.error("Error parsing company data from localStorage:", error);
        alert("An error occurred while retrieving your company data.");
        return;
    }

    // If no company name is found, alert and stop the process
    if (!companyName) {
        alert("Company name not found. Please check your login data.");
        return;
    }

    // Prepare the job data to send, including the company name
    const jobDataToSend = {
        ...jobData,
        company_name: companyName,
    };

    // Sending job data to the server
    try {
        const response = await postJob(jobDataToSend);
        if (response.status === 201) {
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
            alert("An error occurred while posting the job.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert(error?.detail || "An error occurred while posting the job.");
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
