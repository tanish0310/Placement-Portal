import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, MapPin, CheckCircle } from "lucide-react";
import { applyToJob, fetchJobs } from "../../api/api";

const UploadResume = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [resume, setResume] = useState(null);
  const [preferredLocation, setPreferredLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  
  const [jobDetails, setJobDetails] = useState(null);
  const [studentEmail, setStudentEmail] = useState("");

  useEffect(() => {
    const loadJobAndUser = async () => {
      try {
        // Check authentication
        const userType = localStorage.getItem("userType");
        const userEmail = localStorage.getItem("userEmail");
        
        if (!userType || userType !== "student") {
          navigate("/login");
          return;
        }

        setStudentEmail(userEmail);

        // Fetch job details
        const jobs = await fetchJobs();
        const job = jobs.find(j => j.id === parseInt(jobId));
        
        if (job) {
          setJobDetails(job);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        console.error("Error loading job:", err);
        setError("Failed to load job details");
      }
    };

    loadJobAndUser();
  }, [jobId, navigate]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PDF or DOC file");
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      
      setResume(file);
      setError("");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a PDF or DOC file");
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      
      setResume(file);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!resume) {
      setError("Please upload your resume");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('email', studentEmail);
      formData.append('resume', resume);
      
      if (preferredLocation) {
        formData.append('preferred_location', preferredLocation);
      }

      console.log("Submitting application for job:", jobId);
      
      // Submit the application
      const response = await applyToJob(jobId, formData);
      console.log("Application submitted:", response);
      
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(err.response?.data?.detail || err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success && jobDetails) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-light text-slate-900 mb-3">
            Application Submitted
          </h2>
          <p className="text-slate-600 font-light mb-8">
            Your application for <span className="font-medium">{jobDetails.title}</span> at{" "}
            <span className="font-medium">{jobDetails.company_name}</span> has been submitted successfully.
          </p>
          <button
            onClick={() => navigate("/student/StudentDashboard")}
            className="block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="text-slate-600">
          {error || "Loading job details..."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/student/ApplyJobs")}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Jobs</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            Complete Your Application
          </h1>
          <p className="text-slate-600 font-light">
            Applying for <span className="font-medium">{jobDetails.title}</span> at{" "}
            <span className="font-medium">{jobDetails.company_name}</span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Upload Resume <span className="text-red-500">*</span>
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive
                    ? "border-slate-900 bg-slate-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {resume ? (
                  <div className="flex items-center justify-center space-x-3">
                    <FileText size={24} className="text-slate-700" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-900">
                        {resume.name}
                      </p>
                      <p className="text-xs text-slate-600">
                        {(resume.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setResume(null);
                      }}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={20} className="text-slate-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Drop your resume here, or click to browse
                    </p>
                    <p className="text-xs text-slate-600">
                      PDF, DOC, or DOCX (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Preferred Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Job Location (Optional)
              </label>
              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="e.g., Bangalore, Mumbai, Remote"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !resume}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;