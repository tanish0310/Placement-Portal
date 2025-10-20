import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar, FileText } from "lucide-react";
import { postJob } from "../../api/api";

const PostJob = () => {
  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState(null);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    eligibility: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check authentication and get company ID
    const userType = localStorage.getItem("userType");
    const userData = localStorage.getItem("userData");

    if (!userType || userType !== "company") {
      navigate("/login");
      return;
    }

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setCompanyId(parsedData.id);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setJobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate all fields
    if (!jobDetails.title || !jobDetails.description || !jobDetails.location || 
        !jobDetails.salary || !jobDetails.eligibility || !jobDetails.deadline) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Prepare job data
      const jobData = {
        company: companyId,
        title: jobDetails.title,
        description: jobDetails.description,
        location: jobDetails.location,
        salary: parseFloat(jobDetails.salary) * 100000, // Convert LPA to actual amount
        eligibility: jobDetails.eligibility,
        deadline: jobDetails.deadline,
      };

      console.log("Posting job with data:", jobData);

      // Call the API
      const response = await postJob(jobData);
      console.log("Job posted successfully:", response);
      
      setSuccess(true);
    } catch (err) {
      console.error("Error posting job:", err);
      
      // Handle different error formats
      if (err.response?.data) {
        const errorData = err.response.data;
        
        if (errorData.error) {
          setError(errorData.error);
        } else if (errorData.details) {
          // Handle field-specific errors
          const errorMessages = Object.entries(errorData.details)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
          setError(errorMessages);
        } else if (errorData.detail) {
          setError(errorData.detail);
        } else {
          setError(JSON.stringify(errorData));
        }
      } else {
        setError(err.message || "Failed to post job. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-light text-slate-900 mb-3">
            Job Posted Successfully
          </h2>
          <p className="text-slate-600 font-light mb-8">
            Your job listing is now live and visible to qualified candidates.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/company/CompanyDashboard")}
              className="block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => {
                setSuccess(false);
                setJobDetails({
                  title: "",
                  description: "",
                  location: "",
                  salary: "",
                  eligibility: "",
                  deadline: "",
                });
              }}
              className="block w-full py-3 text-slate-700 hover:bg-slate-100 font-medium rounded-xl transition-all"
            >
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/company/CompanyDashboard")}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            Post a Job
          </h1>
          <p className="text-slate-600 font-light">
            Create a new job listing to attract qualified candidates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Title
              </label>
              <div className="relative">
                <Briefcase
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Software Engineer"
                  value={jobDetails.title}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Description
              </label>
              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />
                <textarea
                  name="description"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={jobDetails.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Bangalore, India"
                    value={jobDetails.location}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Salary (LPA)
                </label>
                <div className="relative">
                  <DollarSign
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    name="salary"
                    placeholder="12"
                    value={jobDetails.salary}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum CGPA
                </label>
                <input
                  type="text"
                  name="eligibility"
                  placeholder="7.5"
                  value={jobDetails.eligibility}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Application Deadline
                </label>
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="date"
                    name="deadline"
                    value={jobDetails.deadline}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Posting Job..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
