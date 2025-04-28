import React, { ReactNode } from 'react';
import Header from '../components/Header/index';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Sidebar, { SidebarItem } from '../components/Sidebar/Sidebar';
import { appRoutes } from '../Router/routes';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userRoles = useSelector(
    (state: RootState) => state.auth.user_info.role,
  );

  const hasRole = (routeRoles?: string[]): boolean => {
    if (!routeRoles || routeRoles.length === 0) {
      return true; // ถ้าไม่ได้กำหนด role ไว้ เข้าได้ทุกคน
    }
    return (
      userRoles.includes('superadmin') ||
      routeRoles.some((role) => userRoles.includes(role))
    );
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/* ===== Sidebar Start ===== */}
        <Sidebar>
          {appRoutes
            .filter(
              (route) =>
                route.layout === 'DefaultLayout' && hasRole(route.roles),
            )
            .map((route, index) => (
              <SidebarItem
                key={index}
                icon={route.icon}
                text={route.title || ''}
                to={route.path}
              />
            ))}
        </Sidebar>
        {/* ===== Sidebar End ===== */}

        {/* ===== Content Area Start ===== */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
        {/* ===== Content Area End ===== */}
      </div>
    </div>
  );
};

export default DefaultLayout;
