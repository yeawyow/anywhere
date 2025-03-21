import {
  HiOutlineDotsVertical,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';

const SidebarContext = createContext({ expanded: true });

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false); // ปรับค่า expanded เป็น false เมื่อหน้าจอเล็กกว่า 768px
      } else {
        setExpanded(true); // ปรับค่า expanded เป็น true เมื่อหน้าจอใหญ่กว่า 768px
      }
    };

    // ฟังการเปลี่ยนขนาดหน้าจอ
    window.addEventListener('resize', handleResize);

    // เรียกฟังก์ชั่นในตอนเริ่มต้น
    handleResize();

    // ลบ event listener เมื่อคอมโพเนนต์ถูกทำลาย
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? 'w-24' : 'w-0 hidden'
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <HiChevronLeft size={20} />
            ) : (
              <HiChevronRight size={20} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-1">{children}</ul>
        </SidebarContext.Provider>

        {/* <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center transition-all ${
              expanded ? 'w-32 ml-3' : 'w-0 overflow-hidden'
            }`}
          > */}
        {/* <div className="leading-4">
              <h4 className="font-semibold"></h4>
              <span className="text-xs text-gray-600"></span>
            </div>
            <HiOutlineDotsVertical size={20} /> */}
        {/* </div> */}
        {/* </div> */}
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  to,
}: {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  to: string;
}) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={to}>
      <li
        className={`
        relative flex items-center py-2 px-3 my-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
      `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? 'w-34 ml-1' : 'w-0'
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-3 h-2 rounded bg-indigo-400 ${
              expanded ? '' : 'top-2'
            }`}
          />
        )}
        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-2 ml-3
            bg-indigo-100 text-indigo-800 text-xs
            invisible opacity-0 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            group-hover:top-0
            z-10
        `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
