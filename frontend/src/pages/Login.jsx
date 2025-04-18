import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bgImage from "../assets/IIIT_allh.jpg";
import {
  loginStudent,
  loginCompany,
  sendAdminOtp,
  verifyAdminOtp,
} from "../api/user";

const Login = () => {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    try {
      let response;

      if (userType === "student") {
        response = await loginStudent(formData);
        localStorage.setItem("student", JSON.stringify(response));
        navigate("/student/StudentDashboard");
      } else if (userType === "company") {
        response = await loginCompany(formData);
        // Store the company data but no companyId in localStorage
        localStorage.setItem("company", JSON.stringify(response));
         // Assuming response contains company.id
        navigate("/company/CompanyDashboard");
      }
    } catch (error) {
      setErrorMessage(error.detail || "Login failed. Please try again.");
    }
  };

  const handleSendOtp = async () => {
    try {
      await sendAdminOtp(email);
      setOtpSent(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.detail || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyAdminOtp(email, otp);
      localStorage.setItem("admin", JSON.stringify(response));
      navigate("/admin/AdminDashboard");
    } catch (error) {
      setErrorMessage(error.detail || "OTP verification failed");
    }
  };

  if (!userType) {
    return (
      <div
        className="center-page"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="form-container">
          <h2>Login As</h2>
          <button onClick={() => setUserType("student")}>Student</button>
          <button onClick={() => setUserType("company")}>Company</button>
          <button onClick={() => setUserType("admin")}>Admin</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="form-container">
        <h2>{userType.charAt(0).toUpperCase() + userType.slice(1)} Login</h2>

        {userType === "admin" ? (
          <>
            {!otpSent ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <button type="button" onClick={handleSendOtp}>
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <br />
                <button type="button" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </>
            )}
          </>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Login</button>
          </form>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />
        <button
          onClick={() => {
            setUserType("");
            setOtpSent(false);
            setEmail("");
            setPassword("");
            setOtp("");
            setErrorMessage("");
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Login;
