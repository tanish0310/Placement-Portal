import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import Navbar from "./components/Navbar";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostJob from "./pages/company/PostJob";
import ApplyJobs from "./pages/student/ApplyJobs";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/student/StudentDashboard"
          element={<StudentDashboard />}
        />
        <Route
          path="/company/CompanyDashboard"
          element={<CompanyDashboard />}
        />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/company/PostJob" element={<PostJob />} />
        <Route path="/student/ApplyJobs" element={<ApplyJobs />} />
      </Routes>
    </Router>
  );
}

export default App;
