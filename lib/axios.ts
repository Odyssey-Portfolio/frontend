// src/lib/axios.ts
import { DEPLOYED_SERVER_URL } from "@/_constants/Endpoints";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: DEPLOYED_SERVER_URL, // Your backend URL
  withCredentials: true, // 👈 This ensures cookies are sent/received
});

// Optional: Add interceptors for auth or error handling
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["ngrok-skip-browser-warning"] = "true";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Global error handler or redirect
    return Promise.reject(error);
  }
);

export default axiosInstance;
