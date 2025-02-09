import React,{useEffect} from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
import ProtectRoute from '../Router/'; // ปรับตามชื่อไฟล์ที่ใช้
import DefaultLayout from '../layout/DefaultLayout';
import BlankLayout from '../layout/BlankLayout';
import Loader from '../common/Loader';

import {  useSelector } from 'react-redux';
import { RootState } from '../app/store';

// 🔹 Import JSON Routes
import routesData from './routes.json';
import SignIn from '../pages/Authentication/SignIn';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile';
import PageTitle from '../components/PageTitle';
import PageAceess from '../pages/PageAceess';
import { verifyToken } from '../hooks/vertifytoken';


const componentsMap: { [key: string]: React.ElementType } = {
  SignIn,
  Dashboard,
  Profile,
  PageAceess,
};

const layoutMap: { [key: string]: React.ElementType } = {
  DefaultLayout,
  BlankLayout,
};

const AppRoutes = ({ loading }: { loading: boolean }) => {
    const navigate = useNavigate();
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
// useEffect(()=>{
//  const checkvertify= verifyToken()
//  if (checkvertify) {
      
//       navigate("/"); // เปลี่ยนเส้นทางไปที่หน้าหลัก
//   //   }
// }},[navigate])
  
  if (loading) return <Loader />; // ถ้าแอปกำลังโหลดให้แสดง Loader

  return (
    <Routes>
      {routesData.map(
        ({ path, element, layout, title, protected: isProtected }) => {
          const Component = componentsMap[element] || PageAceess; // หากไม่พบ Component ให้ใช้ PageAceess
          const Layout = layout ? layoutMap[layout] : React.Fragment; // เลือก Layout หากไม่มีใช้ React.Fragment

          const RouteElement = (
            <Layout>
              {title && <PageTitle title={title} />}
              <Component />
            </Layout>
          );

          return (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  isAuthenticated && verifyToken() ? (
                    <ProtectRoute>{RouteElement}</ProtectRoute> // ถ้าต้องการการยืนยันตัวตน
                  ) : (
                    <SignIn /> // ถ้ายังไม่ได้ล็อกอินจะให้ไปหน้า SignIn
                  )
                ) : (
                  RouteElement // หากไม่ต้องการการยืนยันตัวตน ก็แสดงหน้าตามปกติ
                )
              }
            />
          );
        }
      )}
    </Routes>
  );
};

export default AppRoutes;
