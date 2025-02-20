import {useState} from 'react';
//import { Link } from 'react-router-dom';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
//import LogoDark from '../../images/logo/logo-dark.svg';
//import Logo from '../../images/logo/logo.svg';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { APP_NAME, INSTITUION } from '../../config/constants';
import { CiUser,CiLock } from "react-icons/ci";
import { loginUser, selectAuth } from "../../features/auth/authslice";
import bg from '../../images/bg/bg.jpg';
import { AppDispatch,RootState } from '../../app/store';
const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(selectAuth);
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) navigate("/");
  };
  // useEffect(() => {
  //   if (isAuthenticated) {
      
  //     navigate("/"); // เปลี่ยนเส้นทางไปที่หน้าหลัก
  //   }
  // }, [isAuthenticated, navigate]);
  
  
  const fullScreenBackgroundStyle : React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'block',
    overflow: 'hidden',
    width: '100vw',  // ใช้ความกว้างของหน้าจอทั้งหมด
    height: '100vh', // ใช้ความสูงของหน้าจอทั้งหมด
    background: `url(${bg}) no-repeat center center`,
    backgroundSize: 'cover',  // ทำให้พื้นหลังครอบคลุมพื้นที่ทั้งหมด
    opacity: 1,
    border: 0,
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  
  
  return (
    
    <>
     

      <div className="bg-cover  fullScreenBackgroundStyle  min-h-screen"
      style={fullScreenBackgroundStyle}>
        
          <div className="max-w-lg py-5 2xl:py-5 mx-auto">
            
            <div className='flex justify-center mb-2 sm:mb-8 relative w-[200px] h-[35px] sm:w-[325px] sm:h-[55px] mx-auto'>
            {/* <span style={styles}>สวัสดี</span> */}
             
            </div>
             
             <div className="flex flex-col items-center w-full h-full rounded-2xl border-transparent px-4 py-8 sm:p-12 bg-white   bg-transparent shadow-none ">
             <h3 className="text-grayFS-800 text-center text-lg sm:text-xl lg:text-3xl">เข้าสู่บัญชี {APP_NAME}</h3>
             <h6 className="text-grayFS-600 text-center mt-2 sm:mt-4">เรียนรู้คอร์สเรียนกับ<span className="text-primaryFS-500">{INSTITUION}</span></h6>
              <div className='mt-12 w-full'>
            <div className='w-full sm:w-[400px]'  >
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
                    username
                  </label> */}
                  <div className="relative">
                    <input
                    onChange={(e) => setUser(e.target.value)}
                      type="text"
                      placeholder="ชื่อผู้ใช้งาน"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-pink-600 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                    <CiUser size={30} />

                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  {/* <label className=" font-sarabun mb-2.5 block font-medium text-black dark:text-white">
                     Password
                  </label> */}
                  <div className="relative">
                    <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                      placeholder="รหัสผ่าน"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-pink-600 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                    <CiLock size={30} />
                    </span>
                  </div>
                </div>
<div className="mt-8 flex justify-end"><h6 className="text-pink-500 cursor-pointer mb-5" >ลืมรหัสผ่าน ?</h6></div>
                <div className="mb-5">
                        <button className="w-full rounded-lg  bg-pink-600 p-4 text-white transition hover:bg-opacity-90"  type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

                </div>

                {/* <button disabled className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in with Google
                </button> */}

                <div className="mt-6 text-center">
                 
                  {error && <p style={{ color: "red" }}>{error}</p>}
                
                </div>
              </form>
              </div>
              </div>
              </div>
            </div>
          </div>
        
      
    </>
  );
};

export default SignIn;
