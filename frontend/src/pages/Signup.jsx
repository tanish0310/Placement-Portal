import React, { useState } from "react";
import "../App.css";
import bgImage from "../assets/IIIT_allh.jpg";
import { signupStudent, signupCompany } from "../api/user";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userType, setUserType] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cgpa: "",
    branch: "",
    year: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // const handleImageChange = (e) => {
  //   setProfilePic(e.target.files[0]);
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);

    if (userType === "student") {
      data.append("cgpa", formData.cgpa);
      data.append("branch", formData.branch);
      data.append("year", formData.year);
      if (profilePic) {
        data.append("profile_pic", profilePic);
      }
    }

    try {
      let result;
      if (userType === "student") {
        result = await signupStudent(data);
      } else {
        result = await signupCompany(data);
      }

      console.log("Signup success:", result);
      setSuccess(result.message || "Signup successful!"); // ✅ Show message from backend
      setError(null);

      // After successful signup, navigate to the dashboard
      if (userType === "student") {
        navigate("/student/StudentDashboard");
      } else {
        navigate("/company/CompanyDashboard");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.detail || "Signup failed."); // ✅ Use fallback message
      setSuccess(null);
    }
  };


  // Choose user type
  if (!userType) {
    return (
      <div
        className="center-page"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="form-container">
          <h2>Signup As</h2>
          <button onClick={() => setUserType("student")}>Student</button>
          <button onClick={() => setUserType("company")}>Company</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="form-container">
        <h2>{userType.charAt(0).toUpperCase() + userType.slice(1)} Signup</h2>

        <form onSubmit={handleSubmit} className="form-file">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {userType === "student" && (
            <>
              <input
                type="text"
                name="cgpa"
                placeholder="CGPA"
                value={formData.cgpa}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
                required
              />
              {/* <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="profile_pic"
              /> */}
              {/* {profilePic && (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="Preview"
                  height="100"
                  style={{ marginTop: "10px", borderRadius: "8px" }}
                />
              )} */}
            </>
          )}

          <button type="submit">Signup</button>
        </form>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button style={{ marginTop: "10px" }} onClick={() => setUserType("")}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Signup;
