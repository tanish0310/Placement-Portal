import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, User, Briefcase, ExternalLink, Search, Clock, CheckCircle, XCircle } from "lucide-react";
import { fetchAllApplications } from "../../api/api";

const AdminViewApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        // Check authentication
        const userType = localStorage.getItem("userType");

        if (!userType || userType !== "admin") {
          navigate("/login");
          return;
        }

        // Fetch all applications
        const data = await fetchAllApplications();
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

  const companies = ["all", ...new Set(applications.map((a) => a.company_name).filter(Boolean))];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.student?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany =
      filterCompany === "all" || app.company_name === filterCompany;
    const matchesStatus =
      filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesCompany && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200 text-sm">
            <CheckCircle size={14} />
            <span>Accepted</span>
          </div>
        );
      case "Rejected":
        return (
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-200 text-sm">
            <XCircle size={14} />
            <span>Rejected</span>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200 text-sm">
            <Clock size={14} />
            <span>Pending</span>
          </div>
        );
    }
  };

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
          onClick={() => navigate("/admin/AdminDashboard")}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            All Applications
          </h1>
          <p className="text-slate-600 font-light">
            {filteredApplications.length} application
            {filteredApplications.length !== 1 ? "s" : ""} total
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by student or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
          </div>

          <select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          >
            <option value="all">All Companies</option>
            {companies.slice(1).map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <FileText size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              No Applications Found
            </h3>
            <p className="text-slate-600 font-light">
              {searchTerm || filterCompany !== "all" || filterStatus !== "all"
                ? "Try adjusting your filters"
                : "No applications have been submitted yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app, index) => (
              <div
                key={app.id || index}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-slate-900 mb-1">
                          {app.student || "Unknown Student"}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                          <div className="flex items-center space-x-1">
                            <Briefcase size={14} />
                            <span>{app.job || "Unknown Job"}</span>
                          </div>
                          {app.company_name && (
                            <>
                              <span className="text-slate-400">•</span>
                              <span>{app.company_name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 ml-14">
                      {app.preferred_location && (
                        <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          {app.preferred_location}
                        </div>
                      )}
                      {getStatusBadge(app.status)}
                      {app.applied_at && (
                        <div className="px-3 py-1 text-slate-600 text-sm">
                          Applied {new Date(app.applied_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {app.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition-all"
                      >
                        <FileText size={16} />
                        <span>View Resume</span>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-slate-50 text-slate-400 rounded-lg">
                        <FileText size={16} />
                        <span>No Resume</span>
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

export default AdminViewApplications;