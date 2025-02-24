import React, { ReactNode, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';

interface ProtectRouteProps {
  children: ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  //const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
 console.log('isAuthenticated=',isAuthenticated)
  

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // ถ้าไม่ได้ล็อกอิน จะรีไดเรกไปที่หน้า login
  }

  return <>{children}</>; // ถ้าผ่านการตรวจสอบ isAuthenticated แล้ว ให้แสดง children
};

export default ProtectRoute;
