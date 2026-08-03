import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor (Attach Auth Token)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor (Global Error Handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Handle status codes globally
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized! Redirecting to login...");
          // e.g., window.location.href = '/login';
          break;
        case 403:
          console.error("Forbidden resource.");
          break;
        case 500:
          console.error("Server error. Try again later.");
          break;
      }
    } else if (error.request) {
      console.error("Network error / Server not responding.");
    }
    return Promise.reject(error);
  },
);
