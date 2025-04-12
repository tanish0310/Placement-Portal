import axios from "./axios"; // Make sure this is your configured axios instance

// 🧑‍🎓 Student Signup
export const signupStudent = async (formData) => {
  try {
    const response = await axios.post("/signup/student/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Student signup failed" };
  }
};

// 🏢 Company Signup
export const signupCompany = async (formData) => {
  try {
    const response = await axios.post("/signup/company/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Company signup failed" };
  }
};
