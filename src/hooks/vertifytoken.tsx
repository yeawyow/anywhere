import api from "../api/axiosInstance";
import { setAuth,setUser } from "../features/auth/authslice";
import { VERIFY_TOKEN } from "../config/constants";


export const verifyToken = async (dispatch: any) => {
  try {
    const response = await api.post(`${VERIFY_TOKEN}`); // API ตรวจสอบ token
    console.log("data5",response.data.valid)
    const {valid}=response.data.message

    if (valid) {
      dispatch(setAuth(true)); // ✅ อัปเดต Redux state
      dispatch(setUser(response))
      return true;
    }
    localStorage.clear();
    sessionStorage.clear()
    return false;
    
  } catch (error) {
    console.error("Token verification failed:", error);
    localStorage.clear();
    sessionStorage.clear()
    return false; // ถ้ามี error ให้ถือว่า token ใช้ไม่ได้

  }
};