import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Shield, ArrowLeft, Mail, Lock } from "lucide-react";
import { studentLogin, companyLogin, sendAdminOtp, verifyAdminOtp } from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    
    try {
      let response;
      
      if (userType === "student") {
        response = await studentLogin({ email, password });
        // Store user data in localStorage
        localStorage.setItem("userType", "student");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userData", JSON.stringify(response));
        // Redirect to student dashboard
        navigate("/student/StudentDashboard");
      } else if (userType === "company") {
        response = await companyLogin({ email, password });
        // Store user data in localStorage
        localStorage.setItem("userType", "company");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userData", JSON.stringify(response));
        // Redirect to company dashboard
        navigate("/company/CompanyDashboard");
      }
      
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.detail || error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    
    try {
      await sendAdminOtp(email);
      setOtpSent(true);
    } catch (error) {
      console.error("OTP send error:", error);
      setErrorMessage(error.detail || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    
    try {
      const response = await verifyAdminOtp(email, otp);
      // Store admin data
      localStorage.setItem("userType", "admin");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userData", JSON.stringify(response));
      // Redirect to admin dashboard
      navigate("/admin/AdminDashboard");
    } catch (error) {
      console.error("OTP verification error:", error);
      setErrorMessage(error.detail || "Invalid OTP. Please try again.");
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
              Sign In
            </h1>
            <p className="text-slate-600 font-light">
              Choose your account type to continue
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

            <button
              onClick={() => setUserType("admin")}
              className="w-full flex items-center justify-between p-5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-all">
                  <Shield size={20} className="text-slate-700" />
                </div>
                <span className="text-base font-medium text-slate-900">
                  Administrator
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
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-slate-900 hover:underline"
              >
                Sign up
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
            setOtpSent(false);
            setEmail("");
            setPassword("");
            setOtp("");
            setErrorMessage("");
          }}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-900 mb-2">
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Sign In
          </h1>
          <p className="text-slate-600 font-light">
            OTP sent! Please check your spam folder if you don't see it in your inbox."
          </p>
        </div>

        {userType === "admin" ? (
          <div className="space-y-4">
            {!otpSent ? (
              <>
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
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                )}
                <button
                  onClick={handleSendOtp}
                  disabled={loading || !email}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="12345"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                    maxLength={5}
                  />
                </div>
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                )}
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length < 5}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
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
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-sm text-red-800">{errorMessage}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;