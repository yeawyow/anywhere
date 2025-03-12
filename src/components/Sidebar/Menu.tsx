import {
  FaTachometerAlt,
  FaUserCog,
  FaUsers,
  FaBook,
  FaPlus,
} from 'react-icons/fa';

const menuGroups = [
  {
    title: 'ระบบหลัก',
    items: [
      {
        name: 'Dashboard',
        path: '/',
        roles: ['admin', 'teacher', 'student'],
        icon: <FaTachometerAlt />, // Icon for Dashboard
      },
      {
        name: 'Manage Users',
        roles: ['admin'],
        icon: <FaUserCog />, // Icon for Manage Users
        subMenu: [
          { name: 'All Users', path: '/users', icon: <FaUsers /> }, // Icon for All Users
          { name: 'Add User', path: '/users/add', icon: <FaPlus /> }, // Icon for Add User
        ],
      },
    ],
  },
  {
    title: 'จัดการเนื้อหา',
    items: [
      {
        name: 'Courses',
        roles: ['admin', 'teacher'],
        icon: <FaBook />, // Icon for Courses
        subMenu: [
          { name: 'All Courses', path: '/courses', icon: <FaBook /> }, // Icon for All Courses
          { name: 'Add Course', path: '/courses/add', icon: <FaPlus /> }, // Icon for Add Course
        ],
      },
    ],
  },
  {
    title: 'กิจกรรม',
    items: [
      {
        name: 'My Activities',
        path: '/activities',
        roles: ['teacher', 'student'],
        icon: <FaUsers />, // Icon for My Activities
      },
    ],
  },
];

export default menuGroups;
