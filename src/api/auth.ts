import api from './axiosInstance';
import { API_POST } from '../config/constants';

export const loginApi = async (username: string, password: string) => {
  const response = await api.post(
    `${API_POST.LOGIN}`,
    { username, password },
    { withCredentials: true },
  );

  // Destructuring ต้องทำหลังจากที่ response.data ถูกส่งกลับ
  // const { message } = response.data;

  console.log(response);
  return response; // ส่งกลับข้อมูลทั้งหมด
};

export const logoutApi = async () => {
  const token = sessionStorage.getItem('token');
  const response = await api.post(`${API_POST.LOGOUT}`, { token });
  return response;
};
