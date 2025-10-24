/*import axios from "./axios"; // Make sure this is your configured axios instance

// 🧑‍🎓 Student Signup
export const signupStudent = async (formData) => {
  try {
    const response = await axios.post("/signup/student/", formData, {
      withCredentials: true, // ✅ Only needed if you're using cookies or sessions
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Student signup failed" };
  }
};

// 🏢 Company Signup
export const signupCompany = async (formData) => {
  try {
    const response = await axios.post("/signup/company/", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Company signup failed" };
  }
};

export const loginStudent = async (formData) => {
  try {
    const response = await axios.post("/login/student/", formData, {
      withCredentials: true, // Use this if you have session or cookie-based authentication
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Student login failed" };
  }
};

export const loginCompany = async (formData) => {
  try {
    const response = await axios.post("/login/company/", formData, {
      withCredentials: true, // Use this if you have session or cookie-based authentication
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Company login failed" };
  }
};

export const sendAdminOtp = async (email) => {
  const response = await axios.post("/login/admin/send-otp/", { email });
  return response.data;
};

export const verifyAdminOtp = async (email, otp) => {
  const response = await axios.post("/login/admin/verify-otp/", { email, otp });
  return response.data;
};



export const postJob = async (jobDetails) => {
  try {
    const response = await axios.post("http://localhost:8000/api/jobs/", jobDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error; // This will trigger the catch block in the PostJob component
  }
};


// Fetch all companies
export const fetchCompanies = async () => {
  try {
    const response = await axios.get("companies/");
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

// Delete a specific company
export const deleteCompany = async (id) => {
  try {
    const response = await axios.delete(`companies/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};

// Fetch all students
export const fetchStudents = async () => {
  try {
    const response = await axios.get("students/"); // Adjust the endpoint if necessary
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Delete a specific student
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`students/${id}/`); // Adjust the endpoint if necessary
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};



export const fetchJobApplications = async () => {
  try {
    const response = await axios.get('applications/'); // Adjust base URL as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
}; */