// src/lib/axios.ts
import { LOCAL_SECURE_SERVER_URL } from "@/_constants/Endpoints";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: LOCAL_SECURE_SERVER_URL, // Your backend URL
  withCredentials: true, // 👈 This ensures cookies are sent/received
});

// Optional: Add interceptors for auth or error handling
axiosInstance.interceptors.request.use(
  (config) => {
    // You can inject headers if needed
    // config.headers.Authorization = `Bearer ${token}`;
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
