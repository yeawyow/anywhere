import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button } from '@headlessui/react';
import { IoIosPersonAdd } from 'react-icons/io';
import { useEffect, useState } from 'react';
import Modal from '../../components/ui/modal/Modal';
import TecherRegister from '../../components/Forms/TecherRegForm';
import TableTeachers from '../../components/Tables/TableTaechers';
import { fetchTeacherData } from '../../features/data/teacherslice';
import { RootState, AppDispatch } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../common/Loader';

const TeacherRegist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teachers = useSelector(
    (state: RootState) => state.teacher.teachersList,
  );
  const status = useSelector((state: RootState) => state.teacher.status);
  const error = useSelector((state: RootState) => state.teacher.error);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // setSavedData(formData); // บันทึกข้อมูล
    // setFormData({ name: '', email: '' }); // เคลียร์ฟอร์ม
    setIsEditMode(false); // กลับไปโหมดเพิ่มใหม่
  };

  const handleEdit = () => {
    // if (savedData) {
    // setFormData(savedData); // โหลดข้อมูลเดิมกลับเข้า form
    setIsEditMode(true); // เปิดโหมดแก้ไข
    // }
  };
  useEffect(() => {
    dispatch(fetchTeacherData());
  }, [dispatch]);
  // console.log(isOpen);
  return (
    <>
      <Breadcrumb pageName="ทะเบียนอาจารย์" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          <div className="flex items-center gap-3 mt-1-4">
            <Button
              onClick={() => {
                setIsOpen(true);
                setIsEditMode(false);
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-pink-600 hover:bg-brand-600"
            >
              ลงทะเบียน
              <IoIosPersonAdd size={20} />
            </Button>
          </div>
        </h3>

        {
          <div className="space-y-6">
            {status === 'loading' && <Loader />}
            {status === 'failed' && <p className="text-red-500">{error}</p>}
            {status === 'succeeded' && teachers.length > 0 ? (
              <TableTeachers />
            ) : (
              status === 'succeeded' &&
              teachers.length === 0 && <p>ไม่มีข้อมูลนักศึกษาที่ลงทะเบียน</p>
            )}
          </div>
        }
      </div>

      {
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={isEditMode ? 'แก้ไขข้อมูลอาจารย์' : 'บันทึกข้อมูลอาจารย์'}
          fullscreen={true}
        >
          <TecherRegister
            isEditMode={isEditMode}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </Modal>
      }
    </>
  );
};
export default TeacherRegist;
