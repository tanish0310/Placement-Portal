import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, LogOut, GraduationCap, Mail, Edit2, X } from "lucide-react";
import { updateStudentProfile } from "../../api/api";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    cgpa: "",
    branch: "",
    year: "",
    profile_pic: null,
  });
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    // Get user data from localStorage
    const userType = localStorage.getItem("userType");
    const userData = localStorage.getItem("userData");

    // Check if user is logged in and is a student
    if (!userType || userType !== "student") {
      navigate("/login");
      return;
    }

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setStudent(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userData");
    // Redirect to home
    navigate("/");
  };

  const handleBrowseJobs = () => {
    navigate("/student/ApplyJobs");
  };

  const handleMyApplications = () => {
    // Navigate to applications page when you create it
    navigate("/student/my-applications");
  };

  const handleChangePassword = () => {
    navigate("/student/ChangePassword");
  };

  const handleEditProfile = () => {
    // Pre-fill the form with current data
    setEditForm({
      name: student.name || "",
      cgpa: student.cgpa || "",
      branch: student.branch || "",
      year: student.year || "",
      profile_pic: null,
    });
    setShowEditModal(true);
    setUpdateError("");
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setEditForm({ ...editForm, profile_pic: e.target.files[0] });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError("");

    try {
      const formData = new FormData();
      formData.append('email', student.email);
      formData.append('name', editForm.name);
      formData.append('cgpa', editForm.cgpa);
      formData.append('branch', editForm.branch);
      formData.append('year', editForm.year);
      
      if (editForm.profile_pic) {
        formData.append('profile_pic', editForm.profile_pic);
      }

      const updatedData = await updateStudentProfile(formData);
      
      // Update local state and localStorage
      setStudent(updatedData);
      localStorage.setItem("userData", JSON.stringify(updatedData));
      
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setUpdateError(err.response?.data?.detail || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!student) {
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
                Student Portal
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleChangePassword}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span>Change Password</span>
              </button>
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            Welcome back, {student.name?.split(" ")[0] || "Student"}
          </h1>
          <p className="text-slate-600 font-light">
            Here's your placement dashboard
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <User size={28} className="text-slate-600" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-900 mb-1">
                  {student.name || "N/A"}
                </h2>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Mail size={14} />
                  <span className="text-sm">{student.email || "N/A"}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all border border-slate-200"
            >
              <Edit2 size={16} />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <GraduationCap size={18} className="text-slate-600" />
                <span className="text-sm font-medium text-slate-600">
                  Branch
                </span>
              </div>
              <p className="text-lg font-medium text-slate-900">
                {student.branch || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <svg
                  className="w-[18px] h-[18px] text-slate-600"
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
                <span className="text-sm font-medium text-slate-600">CGPA</span>
              </div>
              <p className="text-lg font-medium text-slate-900">
                {student.cgpa || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-3 mb-2">
                <svg
                  className="w-[18px] h-[18px] text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-slate-600">Year</span>
              </div>
              <p className="text-lg font-medium text-slate-900">
                {student.year || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={handleBrowseJobs}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-8 text-left transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-all">
                <Briefcase size={24} className="text-slate-700" />
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
              Browse Jobs
            </h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Explore available job opportunities matching your profile and
              eligibility.
            </p>
          </button>

          <button 
            onClick={handleMyApplications}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-8 text-left transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-all">
                <svg
                  className="w-6 h-6 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
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
              My Applications
            </h3>
            <p className="text-slate-600 font-light leading-relaxed">
              Track the status of your job applications and manage your
              submissions.
            </p>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-light text-slate-900">Edit Profile</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  CGPA
                </label>
                <input
                  type="number"
                  name="cgpa"
                  value={editForm.cgpa}
                  onChange={handleEditFormChange}
                  step="0.01"
                  min="0"
                  max="10"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={editForm.branch}
                  onChange={handleEditFormChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={editForm.year}
                  onChange={handleEditFormChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Profile Picture (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>

              {updateError && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-sm text-red-800">{updateError}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={updating}
                  className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-xl transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;