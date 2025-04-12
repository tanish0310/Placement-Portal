import axios from "./axios";

// For student signup
export const signupStudent = async (formData) => {
  try {
    const response = await axios.post("/signup/student/", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Student signup failed" };
  }
};

// For company signup
export const signupCompany = async (formData) => {
  try {
    const response = await axios.post("/signup/company/", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Company signup failed" };
  }
};
