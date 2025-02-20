import api from "./axiosInstance";





export const loginApi = async (user_national_id: string, password: string)=> {
  const response = await api.post("api/auth/login", { user_national_id, password }, { withCredentials: true });

  // Destructuring ต้องทำหลังจากที่ response.data ถูกส่งกลับ
  const { token, user } = response.data;

  console.log(token, user); // ตรวจสอบข้อมูลที่ดึงมา

  return response.data; // ส่งกลับข้อมูลทั้งหมด
};

