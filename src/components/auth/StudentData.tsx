import React from 'react';
import { Modal } from '../ui/modal/Modal';
import { useModal } from '../../hooks/useModal';
import RegStudentForm from '../Forms/RegStudentForm ';
export default function StudentData() {
  const { isOpen, openModal, closeModal } = useModal();

  // ✅ Component แสดงตารางนักศึกษา
  const StudentTable = ({ data }: { data: any[] }) => (
    <Table data={data} title="นักศึกษา" />
  );
  // ✅ Component ตารางข้อมูล (ใช้ได้ทั้ง นักศึกษา และ อาจารย์)
  const Table = ({ data, title }: { data: any[]; title: string }) => (
    <div className="mt-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <table className="w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">ชื่อ</th>
            <th className="border border-gray-300 p-2">อีเมล</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={person.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{person.name}</td>
              <td className="border border-gray-300 p-2">{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  // ข้อมูลตัวอย่าง (นักศึกษาแยกตามปี)
  const students = {
    2565: [
      { id: 1, name: 'สมชาย ใจดี', email: 'somchai@email.com' },
      { id: 2, name: 'สมหญิง ขยัน', email: 'somhhing@email.com' },
    ],
    2566: [
      { id: 3, name: 'ธีระยุทธ วิชัย', email: 'teerayut@email.com' },
      { id: 4, name: 'มานพ แซ่ลี้', email: 'manop@email.com' },
    ],
  };
  return (
    <>
      <div className="mb-3">
        <button className="ml-3 success" onClick={openModal}>
          เพิ่มข้อมูลนักศึกษา
        </button>
      </div>
      {/* Modal ที่แสดงฟอร์มข้อมูล */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <RegStudentForm />
        </div>
      </Modal>
    </>
  );
}
