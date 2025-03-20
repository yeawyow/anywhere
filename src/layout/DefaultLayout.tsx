import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import { Link } from 'react-router-dom';

import Sidebar, { SidebarItem } from '../components/Sidebar/Sidebar'; // นำเข้า Sidebar และ SidebarItem
import { HiHome, HiUser, HiCog } from 'react-icons/hi'; // หรือไอคอนที่คุณใช้งาน

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar>
          <SidebarItem
            icon={<HiHome size={15} />}
            text="Dashboard"
            to="/"
            active
          />
          <SidebarItem
            icon={<HiUser size={15} />}
            text="ทะเบียนนักศึกษา"
            to="/StudentRegist"
          />
          <SidebarItem
            icon={<HiCog size={15} />}
            text="ทะเบียนอาจารย์"
            to="/teacherRegist"
          />
        </Sidebar>
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
