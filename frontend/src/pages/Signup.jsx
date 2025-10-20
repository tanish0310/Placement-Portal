import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, ArrowLeft, Mail, Lock } from "lucide-react";
import { studentSignup, companySignup } from "../api/api";

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cgpa: "",
    branch: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (userType === "student") {
        // Prepare form data for student
        const studentData = new FormData();
        studentData.append("name", formData.name);
        studentData.append("email", formData.email);
        studentData.append("password", formData.password);
        studentData.append("cgpa", formData.cgpa);
        studentData.append("branch", formData.branch);
        studentData.append("year", formData.year);

        const response = await studentSignup(studentData);
        console.log("Student signup response:", response);
        setSuccess("Account created successfully! Redirecting to login...");
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } else if (userType === "company") {
        // Prepare data for company
        const companyData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        const response = await companySignup(companyData);
        console.log("Company signup response:", response);
        setSuccess("Account created successfully! Redirecting to login...");
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } catch (err) {
      console.error("Signup error:", err);
      
      // Handle different error formats
      if (err.response?.data) {
        const errorData = err.response.data;
        
        // If error is an object with field-specific errors
        if (typeof errorData === 'object' && !errorData.detail) {
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
          setError(errorMessages);
        } else {
          // If there's a general detail message
          setError(errorData.detail || errorData.message || "Signup failed. Please try again.");
        }
      } else {
        setError(err.message || "Signup failed. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-light text-slate-900 mb-2">
              Create Account
            </h1>
            <p className="text-slate-600 font-light">
              Choose your account type to get started
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setUserType("student")}
              className="w-full flex items-center justify-between p-5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-all">
                  <User size={20} className="text-slate-700" />
                </div>
                <span className="text-base font-medium text-slate-900">
                  Student
                </span>
              </div>
              <svg
                className="w-5 h-5 text-slate-400"
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
            </button>

            <button
              onClick={() => setUserType("company")}
              className="w-full flex items-center justify-between p-5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-all">
                  <Building2 size={20} className="text-slate-700" />
                </div>
                <span className="text-base font-medium text-slate-900">
                  Company
                </span>
              </div>
              <svg
                className="w-5 h-5 text-slate-400"
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
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-slate-900 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={() => {
            setUserType("");
            setFormData({
              name: "",
              email: "",
              password: "",
              cgpa: "",
              branch: "",
              year: "",
            });
            setError("");
            setSuccess("");
          }}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            {userType === "student" ? "Student" : "Company"} Registration
          </h1>
          <p className="text-slate-600 font-light">
            Fill in your details to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {userType === "student" ? "Full Name" : "Company Name"}
            </label>
            <input
              type="text"
              name="name"
              placeholder={userType === "student" ? "John Doe" : "Acme Corporation"}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {userType === "student" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    CGPA
                  </label>
                  <input
                    type="text"
                    name="cgpa"
                    placeholder="9.2"
                    value={formData.cgpa}
                    onChange={handleChange}
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
                    placeholder="3rd"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  placeholder="Computer Science"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
            </>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;