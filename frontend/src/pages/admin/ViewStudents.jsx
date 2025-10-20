import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Search, Trash2, GraduationCap } from "lucide-react";
import { fetchStudents, deleteStudent } from "../../api/api";

const ViewStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBranch, setFilterBranch] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadStudents();
  }, [navigate]);

  const loadStudents = async () => {
    try {
      // Check authentication
      const userType = localStorage.getItem("userType");

      if (!userType || userType !== "admin") {
        navigate("/login");
        return;
      }

      // Fetch students
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.response?.data?.detail || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const branches = ["all", ...new Set(students.map((s) => s.branch).filter(Boolean))];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch =
      filterBranch === "all" || student.branch === filterBranch;
    return matchesSearch && matchesBranch;
  });

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStudent) return;

    setDeleting(true);
    setError("");

    try {
      await deleteStudent(selectedStudent.id);
      
      // Remove from local state
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
      
      setShowDeleteModal(false);
      setSelectedStudent(null);
    } catch (err) {
      console.error("Error deleting student:", err);
      setError(err.response?.data?.detail || "Failed to delete student");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="text-slate-600">Loading students...</div>
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
            Manage Students
          </h1>
          <p className="text-slate-600 font-light">
            {filteredStudents.length} registered student
            {filteredStudents.length !== 1 ? "s" : ""}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
          </div>

          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          >
            <option value="all">All Branches</option>
            {branches.slice(1).map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Students List */}
        {filteredStudents.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <User size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              No Students Found
            </h3>
            <p className="text-slate-600 font-light">
              {searchTerm || filterBranch !== "all"
                ? "Try adjusting your filters"
                : "No students have registered yet"}
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">
                      Branch
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">
                      CGPA
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">
                      Year
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <User size={18} className="text-slate-600" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">
                              {student.name || "N/A"}
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-slate-600 mt-1">
                              <Mail size={12} />
                              <span>{student.email || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <GraduationCap size={16} className="text-slate-400" />
                          <span className="text-sm text-slate-700">
                            {student.branch || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                          {student.cgpa || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700">
                          {student.year ? `${student.year}` : "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteClick(student)}
                          className="inline-flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                          <span className="text-sm font-medium">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 text-center mb-2">
                Delete Student
              </h3>
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium">{selectedStudent?.name}</span>?
                This will also delete all their applications and cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStudents;

