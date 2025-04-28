import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProtectRoute from '../Router'; // ปรับตามชื่อไฟล์ที่ใช้
import DefaultLayout from '../layout/DefaultLayout';
import BlankLayout from '../layout/BlankLayout';
import Loader from '../common/Loader';
import { ReactNode } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';

// 🔹 Import JSON Routes
import SignIn from '../pages/Authentication/SignIn';
import Settings from '../pages/Settings';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile';
import PageTitle from '../components/PageTitle';
import PageAceess from '../pages/PageAceess';
import AppSettings from '../pages/AppSettings';
import UserManage from '../pages/UserManage';
import StudentRegist from '../pages/Regist/StudentRegist';
import TeacherRegist from '../pages/Regist/TeacherRegist';
import UserList from '../pages/Regist/UserList';

import { verifyToken } from '../hooks/vertifytoken';
import { appRoutes } from './routes';

const componentsMap: { [key: string]: React.ElementType } = {
  SignIn,
  StudentRegist,
  TeacherRegist,
  Dashboard,
  UserManage,
  Profile,
  Settings,
  AppSettings,
  PageAceess,
  UserList,
};

const layoutMap: { [key: string]: React.ElementType } = {
  DefaultLayout,
  BlankLayout,
};
export type AppRoute = {
  path: string;
  element: string;
  layout?: string;
  title?: string;
  protected: boolean;
  roles?: string[]; // <-- Add this line to support roles
  icon?: ReactNode;
};
const AppRoutes = ({ loading }: { loading: boolean }) => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  const token = sessionStorage.getItem('token');
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const currentPath = window.location.pathname;

  useEffect(() => {
    const checkVerify = async () => {
      const tokenIsValid = await verifyToken(dispatch, token);
      setCheckingAuth(false);
      if (tokenIsValid) {
        navigate(currentPath || '/', { replace: true });
      }
    };

    if (token === null) {
      setCheckingAuth(false);
    } else {
      checkVerify();
    }
  }, [navigate, dispatch, token, currentPath]);

  if (loading || checkingAuth) return <Loader />;

  if (!isAuthenticated) {
    return currentPath === '/login' ? (
      <SignIn />
    ) : (
      <Navigate to="/login" replace />
    );
  }

  if (isAuthenticated && currentPath === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      {appRoutes.map(
        ({ path, element, layout, title, protected: isProtected, roles }) => {
          const Component = componentsMap[element] || PageAceess;
          const Layout = layout ? layoutMap[layout] : React.Fragment;

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
                  <ProtectRoute allowedRoles={roles}>
                    {RouteElement}
                  </ProtectRoute>
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
