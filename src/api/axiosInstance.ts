import axios from "axios";
import { API_URL } from "../config/constants";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ดักจับ request เพื่อเพิ่ม Token อัตโนมัติ
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response, 
  error => {
    if (error.response && error.response.status === 401) {
      // จัดการกับกรณี token หมดอายุ เช่น การรีไดเรกต์ไปหน้า login หรือ รีเฟรช token
    }
    return Promise.reject(error);
  }
);
export default api;
