import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Mail, Search, Trash2 } from "lucide-react";
import { fetchCompanies, deleteCompany } from "../../api/api";

const ViewCompanies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, [navigate]);

  const loadCompanies = async () => {
    try {
      // Check authentication
      const userType = localStorage.getItem("userType");

      if (!userType || userType !== "admin") {
        navigate("/login");
        return;
      }

      // Fetch companies
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError(err.response?.data?.detail || "Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCompany) return;

    setDeleting(true);
    setError("");

    try {
      await deleteCompany(selectedCompany.id);
      
      // Remove from local state
      setCompanies(companies.filter((c) => c.id !== selectedCompany.id));
      
      setShowDeleteModal(false);
      setSelectedCompany(null);
    } catch (err) {
      console.error("Error deleting company:", err);
      setError(err.response?.data?.detail || "Failed to delete company");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="text-slate-600">Loading companies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/admin/AdminDashboard")}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            Manage Companies
          </h1>
          <p className="text-slate-600 font-light">
            {filteredCompanies.length} registered compan
            {filteredCompanies.length !== 1 ? "ies" : "y"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by company name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Companies List */}
        {filteredCompanies.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Building2 size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              No Companies Found
            </h3>
            <p className="text-slate-600 font-light">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "No companies have registered yet"}
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-700">
                      Registered
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredCompanies.map((company) => (
                    <tr
                      key={company.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Building2 size={18} className="text-slate-600" />
                          </div>
                          <span className="font-medium text-slate-900">
                            {company.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Mail size={14} />
                          <span className="text-sm">{company.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">
                          {company.created_at 
                            ? new Date(company.created_at).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteClick(company)}
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
                Delete Company
              </h3>
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium">{selectedCompany?.name}</span>?
                This will also delete all their job postings and cannot be undone.
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

export default ViewCompanies;