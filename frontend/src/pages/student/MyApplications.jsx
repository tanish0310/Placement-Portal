import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, Building2, MapPin, DollarSign, Calendar, FileText, ExternalLink, Clock, CheckCircle, XCircle } from "lucide-react";
import { fetchStudentApplications } from "../../api/api";

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        // Check authentication
        const userType = localStorage.getItem("userType");
        const userEmail = localStorage.getItem("userEmail");

        if (!userType || userType !== "student") {
          navigate("/login");
          return;
        }

        // Fetch student's applications
        const data = await fetchStudentApplications(userEmail);
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.response?.data?.detail || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [navigate]);

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
            <CheckCircle size={14} />
            <span className="text-sm font-medium">Accepted</span>
          </div>
        );
      case "Rejected":
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
            <XCircle size={14} />
            <span className="text-sm font-medium">Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
            <Clock size={14} />
            <span className="text-sm font-medium">Pending</span>
          </div>
        );
    }
  };

  const getStatusCounts = () => {
    return {
      total: applications.length,
      pending: applications.filter(app => app.status === "Pending").length,
      accepted: applications.filter(app => app.status === "Accepted").length,
      rejected: applications.filter(app => app.status === "Rejected").length,
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="text-slate-600">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/student/StudentDashboard")}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-2">
            My Applications
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Track the status of your job applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-sm text-slate-600 mb-1">Total</p>
            <p className="text-2xl font-light text-slate-900">{statusCounts.total}</p>
          </div>
          <div className="bg-white border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-700 mb-1">Pending</p>
            <p className="text-2xl font-light text-amber-700">{statusCounts.pending}</p>
          </div>
          <div className="bg-white border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-700 mb-1">Accepted</p>
            <p className="text-2xl font-light text-green-700">{statusCounts.accepted}</p>
          </div>
          <div className="bg-white border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700 mb-1">Rejected</p>
            <p className="text-2xl font-light text-red-700">{statusCounts.rejected}</p>
          </div>
        </div>

        {/* Filter */}
        {applications.length > 0 && (
          <div className="mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            >
              <option value="all">All Applications</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Briefcase size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              {applications.length === 0 ? "No Applications Yet" : "No applications match your filter"}
            </h3>
            <p className="text-slate-600 font-light mb-6">
              {applications.length === 0 
                ? "Start applying to jobs to see them here."
                : "Try selecting a different status filter."}
            </p>
            {applications.length === 0 && (
              <button
                onClick={() => navigate("/student/ApplyJobs")}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all"
              >
                Browse Jobs
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-medium text-slate-900 mb-1">
                          {app.job_title}
                        </h2>
                        <div className="flex items-center space-x-2 text-slate-600 mb-3">
                          <Building2 size={16} />
                          <span className="text-sm">{app.company_name}</span>
                        </div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                      {app.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} />
                          <span>{app.location}</span>
                        </div>
                      )}
                      {app.salary && (
                        <div className="flex items-center space-x-2">
                          <DollarSign size={14} />
                          <span>₹{parseFloat(app.salary).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>Applied {new Date(app.applied_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {app.status === "Accepted" && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                        🎉 Congratulations! Your application has been accepted. The company will contact you soon.
                      </div>
                    )}

                    {app.status === "Rejected" && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                        Your application was not selected this time. Keep applying to other opportunities!
                      </div>
                    )}
                  </div>

                  {app.resume_url && (
                    <div className="lg:ml-6">
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition-all"
                      >
                        <FileText size={16} />
                        <span>View Resume</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;