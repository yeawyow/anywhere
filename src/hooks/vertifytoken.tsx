import api from "../api/axiosInstance";
import { setAuth } from "../features/auth/authslice";


export const verifyToken = async (dispatch: any) => {
 
  try {
    const response = await api.post("api/auth/verifyToken"); // API ตรวจสอบ token
    if (response.data.valid) {
      dispatch(setAuth(true)); // ✅ อัปเดต Redux state
      return true;
    }
    return false;
    
  } catch (error) {
    console.error("Token verification failed:", error);
    localStorage.clear();
    return false; // ถ้ามี error ให้ถือว่า token ใช้ไม่ได้

  }
};