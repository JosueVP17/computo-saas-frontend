import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://computo-saas-backend.onrender.com/api"
    : "http://localhost:4050/api";

const http = axios.create({ baseURL });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
