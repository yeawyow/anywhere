import api from "./axiosInstance";
import { API_LOGIN } from "../config/constants";





export const loginApi = async (username: string, password: string)=> {
  const response = await api.post(`${API_LOGIN}`, { username, password }, { withCredentials: true });

  // Destructuring ต้องทำหลังจากที่ response.data ถูกส่งกลับ
  // const { message } = response.data;

   
  return response; // ส่งกลับข้อมูลทั้งหมด
};

