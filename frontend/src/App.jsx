import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Main Pages
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import ApplyJobs from "./pages/student/ApplyJobs";
import UploadResume from "./pages/student/UploadResume";
import ChangePassword from "./pages/student/ChangePassword";
import MyApplications from "./pages/student/MyApplications";

// Company Pages
import CompanyDashboard from "./pages/company/CompanyDashboard";
import PostJob from "./pages/company/PostJob";
import ViewApplications from "./pages/company/ViewApplications";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ViewCompany from "./pages/admin/ViewCompany";
import ViewStudents from "./pages/admin/ViewStudents";
import AdminViewApplications from "./pages/admin/AdminViewApplications";

function Layout() {
  const location = useLocation();
  
  // Routes where Navbar and Footer should NOT be shown
  const hiddenNavbarRoutes = [
    '/student/StudentDashboard',
    '/student/ApplyJobs',
    '/student/ChangePassword',
    '/student/my-applications',
    '/company/CompanyDashboard',
    '/company/PostJob',
    '/company/ViewApplications',
    '/admin/AdminDashboard',
    '/admin/ViewCompany',
    '/admin/ViewStudents',
    '/admin/AdminViewApplications',
  ];

  // Check if current path starts with any of the hidden routes
  const shouldHideNavbar = hiddenNavbarRoutes.some(route => 
    location.pathname.startsWith(route.split(':')[0])
  ) || location.pathname.startsWith('/student/apply/');

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Student Routes */}
          <Route path="/student/StudentDashboard" element={<StudentDashboard />} />
          <Route path="/student/ApplyJobs" element={<ApplyJobs />} />
          <Route path="/student/apply/:jobId" element={<UploadResume />} />
          <Route path="/student/ChangePassword" element={<ChangePassword />} />
          <Route path="/student/my-applications" element={<MyApplications />} />

          {/* Company Routes */}
          <Route path="/company/CompanyDashboard" element={<CompanyDashboard />} />
          <Route path="/company/PostJob" element={<PostJob />} />
          <Route path="/company/ViewApplications" element={<ViewApplications />} />

          {/* Admin Routes */}
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/ViewCompany" element={<ViewCompany />} />
          <Route path="/admin/ViewStudents" element={<ViewStudents />} />
          <Route path="/admin/AdminViewApplications" element={<AdminViewApplications />} />
        </Routes>
      </main>
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;