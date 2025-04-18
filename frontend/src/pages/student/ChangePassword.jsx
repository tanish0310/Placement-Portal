import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    new_password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/send-otp/", {
        email: formData.email,
      });
      setMessage(response.data.message);
      setOtpSent(true);
      setStep(2);
    } catch (error) {
      const err = error.response?.data?.error || "Failed to send OTP.";
      setMessage(err);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reset-password/",
        {
          email: formData.email,
          otp: formData.otp,
          new_password: formData.new_password,
        }
      );

      setMessage(response.data.message);
      setStep(3);
    } catch (error) {
      const err = error.response?.data?.error || "Reset failed.";
      setMessage(err);
    }
  };

  return (
    <div className="change-password-container">
      <form
        className="change-password-form"
        onSubmit={step === 1 ? handleSendOTP : handleResetPassword}
      >
        <h3>Reset Password via OTP</h3>

        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
            <button type="submit">Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="new_password"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm New Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Reset Password</button>
          </>
        )}

        {step === 3 && (
          <p style={{ color: "green" }}>
            Password has been reset successfully.
          </p>
        )}

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
