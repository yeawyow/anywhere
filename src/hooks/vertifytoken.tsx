import api from '../api/axiosInstance';
import { setAuth } from '../features/auth/authslice';
import { API_POST } from '../config/constants';

export const verifyToken = async (dispatch: any, token: any) => {
  if (!token) {
    console.log('No token found, skipping verification.');

    return false;
  }
  try {
    const response = await api.post(`${API_POST.VERIFY}`); // API ตรวจสอบ token
    // console.log("data5",response.data.valid)
    const { valid, user_info } = response.data.message;
    // console.log(response.data);
    if (valid) {
      dispatch(setAuth({ valid: true, user: user_info })); // ✅ อัปเดต Redux state
      // dispatch(setUser(response.data));
      return true;
    }
    localStorage.clear();
    sessionStorage.clear();
    return false;
  } catch (error) {
    console.error('Token verification failed:', error);
    localStorage.clear();
    sessionStorage.clear();
    return false; // ถ้ามี error ให้ถือว่า token ใช้ไม่ได้
  }
};
