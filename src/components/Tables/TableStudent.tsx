import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store'; // นำเข้าจาก store
import { fetchStudentData } from '../../features/data/studentslice'; // นำเข้าฟังก์ชัน fetchStudent

type Student = {
  logo: string;
  name: string;
  visitors: number;
  revenues: string;
  sales: number;
  conversion: number;
};

const TableStudent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ดึงข้อมูลจาก Redux store
  const student = useSelector((state: RootState) => state.student.student);
  const status = useSelector((state: RootState) => state.student.status);
  const error = useSelector((state: RootState) => state.student.error);

  // เรียกใช้ fetchStudentData เมื่อ component ถูก mount
  // useEffect(() => {
  //   dispatch(fetchStudentData());
  // }, [dispatch]);

  if (status === 'loading') {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  if (status === 'failed') {
    return <p className="text-red-500">{error}</p>;
  }

  if (student.length === 0) {
    return <p>ไม่มีข้อมูลนักศึกษา</p>;
  }

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Top Channels
        </h4> */}

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                รหัสนักศึกษา
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                ชื่อ-สกุล
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                ระดับชั้น
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                คณะ
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                สถานะ
              </h5>
            </div>
          </div>

          {student.map((studentData) => (
            <div
              className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark"
              key={studentData.id}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  {studentData.image ? (
                    // <img src={studentData.logo} alt={studentData.name} />
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  )}
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {studentData.first_name_thai}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {studentData.graduated_institution}K
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  ${studentData.guardian_province_id}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  {studentData.phone_number}
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{studentData.email}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableStudent;
