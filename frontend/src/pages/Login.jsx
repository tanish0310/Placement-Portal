import React, { useState } from "react";
import "../App.css";
import bgImage from "../assets/IIIT_allh.jpg";

const Login = () => {
  const [userType, setUserType] = useState("");

  if (!userType) {
    return (
      <div
        className="center-page"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="form-container">
          <h2>Login As</h2>
          <button onClick={() => setUserType("Admin")}>Admin</button>
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
        <form>
          <input type="email" placeholder="Email" required />
          <br />
          <input type="password" placeholder="Password" required />
          <br />
          <button type="submit">Login</button>
        </form>
        <br />
        <button onClick={() => setUserType("")}>Go Back</button>
      </div>
    </div>
  );
};

export default Login;
