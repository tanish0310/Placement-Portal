import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import { fetchJobs } from "../../api/api";

const ApplyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentCgpa, setStudentCgpa] = useState(0);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        // Check authentication
        const userType = localStorage.getItem("userType");
        const userData = localStorage.getItem("userData");

        if (!userType || userType !== "student") {
          navigate("/login");
          return;
        }

        // Get student CGPA for eligibility filtering
        if (userData) {
          const parsedData = JSON.parse(userData);
          setStudentCgpa(parseFloat(parsedData.cgpa) || 0);
        }

        // Fetch all jobs
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.detail || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [navigate]);

  const handleApply = (jobId) => {
    navigate(`/student/apply/${jobId}`);
  };

  const isEligible = (job) => {
    // Check if student's CGPA meets the eligibility requirement
    const requiredCgpa = parseFloat(job.eligibility) || 0;
    return studentCgpa >= requiredCgpa;
  };

  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="text-slate-600">Loading jobs...</div>
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
            Available Opportunities
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Browse and apply to positions matching your profile
          </p>
          {studentCgpa > 0 && (
            <p className="text-sm text-slate-500 mt-2">
              Your CGPA: {studentCgpa}
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => {
            const eligible = isEligible(job);
            const deadlinePassed = isDeadlinePassed(job.deadline);
            const canApply = eligible && !deadlinePassed;

            return (
              <div
                key={job.id}
                className={`bg-white border rounded-2xl p-8 transition-all ${
                  canApply
                    ? "border-slate-200 hover:border-slate-300"
                    : "border-slate-100 opacity-60"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-medium text-slate-900 mb-2">
                      {job.title}
                    </h2>
                    <p className="text-lg text-slate-700 mb-4">
                      {job.company_name || "Company"}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{job.location || "Not specified"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign size={16} />
                        <span>₹{job.salary ? parseFloat(job.salary).toLocaleString() : "N/A"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>
                          Due {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {deadlinePassed ? (
                      <div className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200">
                        <span className="text-sm font-medium">Expired</span>
                      </div>
                    ) : !eligible ? (
                      <div className="flex items-center space-x-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
                        <span className="text-sm font-medium">Not Eligible</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all whitespace-nowrap"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-slate-600 leading-relaxed">
                    {job.description || "No description available."}
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-2 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      eligible
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    Min CGPA: {job.eligibility || "N/A"}
                  </span>
                  {!eligible && studentCgpa > 0 && (
                    <span className="text-amber-600 text-xs">
                      (Your CGPA: {studentCgpa})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {jobs.length === 0 && !loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Briefcase size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              No Jobs Available
            </h3>
            <p className="text-slate-600 font-light">
              Check back soon for new opportunities matching your profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyJobs;