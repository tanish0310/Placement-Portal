// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For CSRF tokens
});

// Student APIs
export const studentSignup = async (formData) => {
  const response = await api.post('/signup/student/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const studentLogin = async (credentials) => {
  const response = await api.post('/login/student/', credentials);
  return response.data;
};

// Company APIs
export const companySignup = async (data) => {
  const response = await api.post('/signup/company/', data);
  return response.data;
};

export const companyLogin = async (credentials) => {
  const response = await api.post('/login/company/', credentials);
  return response.data;
};

// Admin APIs
export const sendAdminOtp = async (email) => {
  const response = await api.post('/login/admin/send-otp/', { email });
  return response.data;
};

export const verifyAdminOtp = async (email, otp) => {
  const response = await api.post('/login/admin/verify-otp/', { email, otp });
  return response.data;
};

// Job APIs
export const fetchJobs = async () => {
  const response = await api.get('/jobs/list/');
  return response.data;
};

export const postJob = async (jobData) => {
  const response = await api.post('/jobs/', jobData);
  return response.data;
};

// Application APIs
export const applyToJob = async (jobId, formData) => {
  const response = await api.post(`/student/apply-job/${jobId}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const fetchApplicationsByCompany = async (email) => {
  const response = await api.get('/company/view-applications/', {
    params: { email },
  });
  return response.data;
};

export const fetchAllApplications = async () => {
  const response = await api.get('/applications/');
  return response.data;
};

// Admin management APIs
export const fetchCompanies = async () => {
  const response = await api.get('/companies/');
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await api.delete(`/companies/${id}/`);
  return response.data;
};

export const fetchStudents = async () => {
  const response = await api.get('/students/');
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}/`);
  return response.data;
};


export const fetchStudentApplications = async (studentEmail) => {
  const response = await api.get('/student/applications/', {
    params: { email: studentEmail },
  });
  return response.data;
};

// Update application status (accept/reject)
export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.post(`/applications/${applicationId}/status/`, { status });
  return response.data;
};

// Update student profile
export const updateStudentProfile = async (formData) => {
  const response = await api.put('/student/update-profile/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export default api;