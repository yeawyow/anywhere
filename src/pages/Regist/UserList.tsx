import { Button } from '@headlessui/react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { IoIosPersonAdd } from 'react-icons/io';
import { useEffect, useState } from 'react';
import Modal from '../../components/ui/modal/Modal';
import StudentRegistrationForm from '../../components/Forms/StudentRegForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchStudentData } from '../../features/data/studentslice';
import TableStudent from '../../components/Tables/TableStudent';

export default function UserList() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const student = useSelector((state: RootState) => state.student.studentList);
  const status = useSelector((state: RootState) => state.student.status);
  const error = useSelector((state: RootState) => state.student.error);

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  return (
    <>
      <Breadcrumb pageName="ข้อมูลผู้ใช้งาน" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          {status === 'loading' && <p>กำลังโหลดข้อมูล...</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}

          {status === 'succeeded' && student.length > 0 ? (
            <TableStudent />
          ) : (
            status === 'succeeded' &&
            student.length === 0 && <p>ไม่มีข้อมูลนักศึกษาที่ลงทะเบียน</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ลงทะเบียนนักศึกษา"
        fullscreen={true}
      >
        <StudentRegistrationForm onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
