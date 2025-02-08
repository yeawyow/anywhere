// ฟังก์ชันตรวจสอบ Token
export const verifyToken = () => {
    const token = localStorage.getItem("token");
  
    // ตรวจสอบว่า token มีหรือไม่
    if (!token) {
      return false;
    }
  
    // ถอดข้อมูลจาก JWT Token
    const payload = JSON.parse(atob(token.split(".")[1])); // ถอดข้อมูลจาก JWT token
    const currentTime = Date.now() / 1000; // เวลาปัจจุบันในหน่วยวินาที
  
    if (payload.exp < currentTime) {
      localStorage.removeItem("token"); // ลบ token ออกจาก localStorage ถ้าหมดอายุ
      return false;
    }
  
    return true; // token ยังไม่หมดอายุ
  };