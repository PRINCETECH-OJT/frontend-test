import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - Session expired or invalid token.");

      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

export default api;
