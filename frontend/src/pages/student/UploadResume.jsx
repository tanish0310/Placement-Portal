import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./UploadResume.css";

const UploadResume = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const location = useLocation();
  const { company, title } = location.state || {};

  const [resume, setResume] = useState(null);
  const [preferredLocation, setPreferredLocation] = useState("");

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

const handleUpload = async () => {
  if (!resume) {
    alert("Please select a resume file.");
    return;
  }

  const student = JSON.parse(localStorage.getItem("student")); // Get student data
  if (!student || !student.email) {
    alert("Student not logged in properly.");
    return;
  }

  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("email", student.email); // Send email to backend

  try {
    await axios.post(
      `http://localhost:8000/api/student/apply-job/${jobId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Application submitted successfully!");
    navigate("/student/StudentDashboard");
  } catch (err) {
    console.error("Upload error:", err);
    alert("Failed to apply for the job.");
  }
};


  return (
    <div className="upload-container">
      <h2>
        Upload Resume for {title} at {company}
      </h2>

      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Preferred Job Location"
        value={preferredLocation}
        onChange={(e) => setPreferredLocation(e.target.value)}
      />
      <button className="upload-button" onClick={handleUpload}>
        Upload and Apply
      </button>
    </div>
  );
};

export default UploadResume;
