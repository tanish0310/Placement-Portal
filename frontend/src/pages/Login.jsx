import React, { useState } from "react";
import "../App.css";
import bgImage from "../assets/IIIT_allh.jpg";
import { loginStudent, loginCompany } from "../api/user"; // Assuming your login functions are in the 'auth.js' file

const Login = () => {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    try {
      let response;
      if (userType === "student") {
        response = await loginStudent(formData);
      } else if (userType === "company") {
        response = await loginCompany(formData);
      }

      // Handle successful login here (e.g., redirect or store user data)
      console.log(response);
      // Redirect or update the state to indicate successful login
    } catch (error) {
      setErrorMessage(error.detail || "Login failed. Please try again.");
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
        </div>
      </div>
    );
  }

  return (
    <div className="center-page">
      <div className="form-container">
        <h2>{userType.charAt(0).toUpperCase() + userType.slice(1)} Login</h2>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
        <br />
        <button onClick={() => setUserType("")}>Go Back</button>
      </div>
    </div>
  );
};

export default Login;
