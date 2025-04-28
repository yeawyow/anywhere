import { HiHome, HiUser, HiCog } from 'react-icons/hi';
import { ReactNode } from 'react';

export type AppRoute = {
  path: string;
  element: string;
  layout?: string;
  title?: string;
  protected?: boolean;
  roles?: string[];
  icon?: ReactNode; // ตรงนี้ต้องเป็น ReactNode นะ
};

export const appRoutes = [
  {
    path: '/',
    element: 'Dashboard',
    layout: 'DefaultLayout',
    title: 'Dashboard',
    protected: true,
    roles: ['superadmin', 'admin', 'teacher', 'student'],
    icon: <HiHome size={15} />,
  },
  {
    path: '/StudentRegist',
    element: 'StudentRegist',
    layout: 'DefaultLayout',
    title: 'ทะเบียนนักศึกษา',
    protected: true,
    roles: ['superadmin', 'admin', 'student'],
    icon: <HiUser size={15} />,
  },
  {
    path: '/TeacherRegist',
    element: 'TeacherRegist',
    layout: 'DefaultLayout',
    title: 'ทะเบียนอาจารย์',
    protected: true,
    roles: ['superadmin', 'admin', 'teacher'],
    icon: <HiCog size={15} />,
  },
  {
    path: '/userlist',
    element: 'UserList',
    layout: 'DefaultLayout',
    title: 'ข้อมูลผู้ใช้งาน',
    protected: true,
    roles: ['superadmin', 'admin'],
    icon: <HiCog size={15} />,
  },
  {
    path: '/apsettings',
    element: 'AppSettings',
    layout: 'DefaultLayout',
    title: 'ตั้งค่าโปรแกรม',
    protected: true,
    roles: ['superadmin'],
    icon: <HiCog size={15} />,
  },
];
