import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProtectRoute from '../Router/'; // ปรับตามชื่อไฟล์ที่ใช้
import DefaultLayout from '../layout/DefaultLayout';
import BlankLayout from '../layout/BlankLayout';
import Loader from '../common/Loader';

import { useSelector, useDispatch } from 'react-redux';
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
  const [checkingAuth, setCheckingAuth] = useState(true);
  const token = sessionStorage.getItem('token') || false;
  console.log(token);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const checkVerify = async () => {
      const isValid = await verifyToken(dispatch, token);
      setCheckingAuth(false);
      if (isValid) {
        navigate(window.location.pathname || '/', { replace: true }); // ✅ ถ้าไม่มี pathname ให้ไปที่ "/"
        // console.log("isvaid",isValid)
      }
    };
    if (token) {
      checkVerify(); // ✅ เรียกใช้งานเฉพาะเมื่อ isAuthenticated === true
    } else {
      setCheckingAuth(false); // ถ้าไม่ authenticated ไม่ต้องรอ token
    }
  }, [navigate, verifyToken, dispatch, window.location.pathname]);

  if (loading || checkingAuth) return <Loader />;
  if (!isAuthenticated) {
    // ✅ ถ้าผู้ใช้ยังไม่ได้ล็อกอิน และอยู่ที่ /signin → แสดงหน้า SignIn
    return window.location.pathname === '/login' ? (
      <SignIn />
    ) : (
      <Navigate to="/login" replace />
    );
  }

  // ✅ ถ้าผู้ใช้ล็อกอินแล้ว แต่พยายามเข้าหน้า /signin → ให้ Redirect ไป Dashboard (/)
  if (isAuthenticated && window.location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }
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
                  <ProtectRoute>{RouteElement}</ProtectRoute>
                ) : (
                  RouteElement
                )
              }
            />
          );
        },
      )}
    </Routes>
  );
};

export default AppRoutes;
