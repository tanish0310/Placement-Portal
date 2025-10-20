import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, MapPin, FileText, ExternalLink, Check, X } from "lucide-react";
import { fetchApplicationsByCompany, updateApplicationStatus } from "../../api/api";

const ViewApplicationsCompany = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const loadApplications = async () => {
    try {
      // Get company email from localStorage
      const userEmail = localStorage.getItem("userEmail");
      const userType = localStorage.getItem("userType");

      // Check if user is logged in as company
      if (!userEmail || userType !== "company") {
        navigate("/login");
        return;
      }

      // Fetch applications
      const data = await fetchApplicationsByCompany(userEmail);
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.response?.data?.detail || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [navigate]);

  const handleUpdateStatus = async (applicationId, newStatus) => {
    setUpdatingId(applicationId);
    setError("");

    try {
      await updateApplicationStatus(applicationId, newStatus);
      
      // Reload applications to get updated data
      await loadApplications();
      
      // Show success message briefly
      const successMsg = newStatus === "Accepted" ? "Application accepted!" : "Application rejected.";
      setError(""); // Clear any previous errors
      
      // Optional: Show a success toast notification here
      console.log(successMsg);
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.response?.data?.detail || "Failed to update application status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.job_title?.toLowerCase().includes(filter.toLowerCase());
  });

  // Get unique job titles for filter dropdown
  const uniqueJobTitles = [...new Set(applications.map(app => app.job_title))];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="text-slate-600">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/company/CompanyDashboard")}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-slate-900 mb-2">
              Applications Received
            </h1>
            <p className="text-slate-600 font-light">
              {filteredApplications.length} application
              {filteredApplications.length !== 1 ? "s" : ""} total
            </p>
          </div>

          {uniqueJobTitles.length > 1 && (
            <div className="mt-4 md:mt-0">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              >
                <option value="all">All Jobs</option>
                {uniqueJobTitles.map((title) => (
                  <option key={title} value={title.toLowerCase()}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {filteredApplications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <FileText size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              No Applications Yet
            </h3>
            <p className="text-slate-600 font-light">
              Applications will appear here once students start applying to your
              job postings.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {console.log("Applications:", filteredApplications)}
            {filteredApplications.map((app, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={20} className="text-slate-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">
                          {app.student_name}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <Mail size={14} />
                            <span>{app.student_email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                            <span>CGPA: {app.student_cgpa}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 ml-16">
                      <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {app.job_title}
                      </div>
                      {app.preferred_location && (
                        <div className="flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          <MapPin size={12} />
                          <span>{app.preferred_location}</span>
                        </div>
                      )}
                      <div className="px-3 py-1 text-slate-600 text-sm">
                        Applied {new Date(app.applied_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                    {app.resume_url ? (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition-all"
                      >
                        <FileText size={16} />
                        <span>View Resume</span>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-slate-50 text-slate-400 font-medium rounded-lg">
                        <FileText size={16} />
                        <span>No Resume</span>
                      </div>
                    )}
                    
                    {/* Accept/Reject buttons - only show if status is Pending */}
                    {app.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(app.id, "Accepted")}
                          disabled={updatingId === app.id}
                          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Check size={16} />
                          <span>{updatingId === app.id ? "Updating..." : "Accept"}</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, "Rejected")}
                          disabled={updatingId === app.id}
                          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X size={16} />
                          <span>{updatingId === app.id ? "Updating..." : "Reject"}</span>
                        </button>
                      </>
                    )}
                    
                    {/* Show status badge if already decided */}
                    {app.status === "Accepted" && (
                      <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                        <Check size={16} />
                        <span className="font-medium">Accepted</span>
                      </div>
                    )}
                    {app.status === "Rejected" && (
                      <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                        <X size={16} />
                        <span className="font-medium">Rejected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplicationsCompany;