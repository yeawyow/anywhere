import api from './axiosInstance';
import { API_GET_PREFIX, API_LOGOUT } from '../config/constants';

export const getPrefix = async () => {
  try {
    const response = await api.get(API_GET_PREFIX, {
      withCredentials: true,
    });
    // ส่งกลับแค่ response.data ที่ต้องการ
    return response.data;
  } catch (error) {
    console.error('Error fetching prefix:', error);
    throw error; // โยน error ออกไปให้ component ที่เรียกใช้งานจัดการ
  }
};

export const logoutApi = async () => {
  const token = sessionStorage.getItem('token');
  try {
    const response = await api.post(API_LOGOUT, { token });
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    throw error; // จัดการข้อผิดพลาด
  }
};
