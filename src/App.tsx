import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './Router/AppRoutes';
import Loader from './common/Loader'; // ใช้ Loader ที่คุณมี

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  // Reset scroll position on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // ตั้งค่า loading = false หลัง 1 วิ
  }, []);
  
  // ✅ ใช้ useEffect เพื่อดูการเปลี่ยนแปลงของ loading
  useEffect(() => {
   // console.log("Loading state changed:", loading);
  }, [loading]);
  

  return (
    <>
      {loading ? (
        <Loader /> // แสดง Loader ระหว่างการโหลด
      ) : (
        <AppRoutes  loading={loading} />
      )}
    </>
  );
}

export default App;
