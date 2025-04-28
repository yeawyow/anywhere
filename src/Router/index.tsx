import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Swal from 'sweetalert2';

interface ProtectRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const userRole = useSelector((state: RootState) => state.auth.user_info.role); // 🛠️ userRole ตอนนี้เป็น string[] แล้ว
  const location = useLocation();

  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (isAuthenticated && allowedRoles) {
      const hasAccess = Array.isArray(userRole)
        ? userRole.some((role) => allowedRoles.includes(role))
        : allowedRoles.includes(userRole || '');

      if (!hasAccess) {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'คุณไม่มีสิทธิ์ใช้งานหน้านี้',
        });
        setAccessDenied(true);
      }
    }
  }, [isAuthenticated, allowedRoles, userRole]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (accessDenied) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
