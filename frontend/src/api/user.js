import axios from "./axios"; // Make sure this is your configured axios instance

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
