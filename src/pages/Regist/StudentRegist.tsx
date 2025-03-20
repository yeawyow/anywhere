import { Button } from '@headlessui/react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { IoIosPersonAdd } from 'react-icons/io';
import { useEffect, useState } from 'react';
import Modal from '../../components/ui/modal/Modal';
import StudentRegistrationForm from '../Form/StudentRegForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchStudentData } from '../../features/data/studentslice';
import TableStudent from '../../components/Tables/TableStudent';

export default function StudentRegist() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const student = useSelector((state: RootState) => state.student.student);
  const status = useSelector((state: RootState) => state.student.status);
  const error = useSelector((state: RootState) => state.student.error);

  useEffect(() => {
    dispatch(fetchStudentData());
  }, [dispatch]);

  return (
    <>
      <Breadcrumb pageName="ทะเบียนนักศึกษา" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          <div className="flex items-center gap-3 mt-1-4">
            <Button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-pink-600 hover:bg-brand-600"
            >
              ลงทะเบียน
              <IoIosPersonAdd size={20} />
            </Button>
          </div>
        </h3>

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
        <StudentRegistrationForm />
      </Modal>
    </>
  );
}
