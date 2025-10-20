import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, LogOut, Users, Building2, FileText, TrendingUp } from "lucide-react";
import { fetchStudents, fetchCompanies, fetchAllApplications } from "../../api/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalApplications: 0,
    acceptedApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Check authentication
        const userType = localStorage.getItem("userType");
        const userData = localStorage.getItem("userData");

        if (!userType || userType !== "admin") {
          navigate("/login");
          return;
        }

        if (userData) {
          const parsedData = JSON.parse(userData);
          setAdmin(parsedData);

          // Fetch all data for stats
          try {
            const [students, companies, applications] = await Promise.all([
              fetchStudents(),
              fetchCompanies(),
              fetchAllApplications(),
            ]);

            // Calculate placement rate
            const acceptedCount = applications.filter(app => app.status === "Accepted").length;
            const placementRate = students.length > 0 
              ? Math.round((acceptedCount / students.length) * 100)
              : 0;

            setStats({
              totalStudents: students.length,
              totalCompanies: companies.length,
              totalApplications: applications.length,
              placementRate: placementRate,
            });
          } catch (err) {
            console.error("Error fetching stats:", err);
            // Keep default stats on error
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error loading dashboard:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleManageStudents = () => {
    navigate("/admin/ViewStudents");
  };

  const handleManageCompanies = () => {
    navigate("/admin/ViewCompany");
  };

  const handleViewApplications = () => {
    navigate("/admin/AdminViewApplications");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!admin) {
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
                Admin Portal
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
            Welcome back, Administrator
          </h1>
          <p className="text-slate-600 font-light">
            Overview of your placement portal
          </p>
          {admin.email && (
            <p className="text-sm text-slate-500 mt-1">
              {admin.email}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Total Students
            </p>
            <p className="text-3xl font-light text-slate-900">
              {stats.totalStudents.toLocaleString()}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Building2 size={20} className="text-purple-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Active Companies
            </p>
            <p className="text-3xl font-light text-slate-900">
              {stats.totalCompanies}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-amber-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Applications
            </p>
            <p className="text-3xl font-light text-slate-900">
              {stats.totalApplications.toLocaleString()}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Placement Rate
            </p>
            <p className="text-3xl font-light text-slate-900">
              {stats.placementRate}%
            </p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-slate-700" />
              </div>
              <h2 className="text-xl font-medium text-slate-900">Students</h2>
            </div>
            <p className="text-slate-600 font-light mb-6 leading-relaxed">
              Manage student registrations, profiles, and placement status.
            </p>
            <button 
              onClick={handleManageStudents}
              className="w-full py-3 text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Manage Students
            </button>
          </div>

          {/* Companies Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Building2 size={20} className="text-slate-700" />
              </div>
              <h2 className="text-xl font-medium text-slate-900">Companies</h2>
            </div>
            <p className="text-slate-600 font-light mb-6 leading-relaxed">
              Oversee company registrations, verify credentials, and monitor activity.
            </p>
            <button 
              onClick={handleManageCompanies}
              className="w-full py-3 text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Manage Companies
            </button>
          </div>

          {/* Applications Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-slate-700" />
              </div>
              <h2 className="text-xl font-medium text-slate-900">
                Applications
              </h2>
            </div>
            <p className="text-slate-600 font-light mb-6 leading-relaxed">
              View all job applications, track progress, and generate reports.
            </p>
            <button 
              onClick={handleViewApplications}
              className="w-full py-3 text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              View Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;