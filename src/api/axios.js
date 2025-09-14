import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend ka URL (Vercel deploy karne par change karna)
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
