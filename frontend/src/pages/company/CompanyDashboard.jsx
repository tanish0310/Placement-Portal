import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, LogOut, Plus, FileText, Users } from "lucide-react";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    pendingReview: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Get user data from localStorage
        const userType = localStorage.getItem("userType");
        const userData = localStorage.getItem("userData");

        // Check if user is logged in and is a company
        if (!userType || userType !== "company") {
          navigate("/login");
          return;
        }

        if (userData) {
          const parsedData = JSON.parse(userData);
          setCompany(parsedData);

          // Fetch company stats
          try {
            // Import the API functions at the component level
            const { fetchJobs, fetchApplicationsByCompany } = await import("../../api/api");
            
            // Get all jobs
            const allJobs = await fetchJobs();
            const companyJobs = allJobs.filter(job => job.company === parsedData.id);
            
            // Get applications for this company
            const applications = await fetchApplicationsByCompany(parsedData.email);
            
            // Calculate stats
            setStats({
              activeJobs: companyJobs.length,
              totalApplications: applications.length,
              pendingReview: applications.filter(app => app.status === "Pending").length,
            });
          } catch (err) {
            console.error("Error fetching stats:", err);
            // Keep default stats on error
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userData");
    // Redirect to home
    navigate("/");
  };

  const handlePostJob = () => {
    navigate("/company/PostJob");
  };

  const handleViewApplications = () => {
    navigate("/company/ViewApplications");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">PP</span>
              </div>
              <span className="text-lg font-medium text-slate-900">
                Company Portal
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            Welcome back, {company.name?.split(" ")[0] || "Company"}
          </h1>
          <p className="text-slate-600 font-light">
            Manage your recruitment activities
          </p>
        </div>

        {/* Stats Cards - Placeholder for now, you can add API calls later */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-slate-700" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Active Jobs
            </p>
            <p className="text-3xl font-light text-slate-900">
              {stats.activeJobs}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-slate-700" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Total Applications
            </p>
            <p className="text-3xl font-light text-slate-900">
              {stats.totalApplications}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Pending Review
            </p>
            <p className="text-3xl font-light text-slate-900">
              {stats.pendingReview}
            </p>
          </div>
        </div>

        {/* Company Profile */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 size={28} className="text-slate-600" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-slate-900 mb-1">
                {company.name || "N/A"}
              </h2>
              <p className="text-slate-600 mb-2">{company.email || "N/A"}</p>
              <p className="text-slate-600 font-light">
                Welcome to your recruitment dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={handlePostJob}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-8 text-left transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-slate-800 transition-all">
                <Plus size={24} className="text-white" />
              </div>
              <svg
                className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              Post New Job
            </h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Create a new job listing to attract qualified candidates for your
              open positions.
            </p>
          </button>

          <button 
            onClick={handleViewApplications}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-8 text-left transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-all">
                <FileText size={24} className="text-slate-700" />
              </div>
              <svg
                className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              View Applications
            </h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Review and manage applications received for your job postings.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;