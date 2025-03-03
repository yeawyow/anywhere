import { useState } from 'react';
import { Tab } from '@headlessui/react';
import StudentData from '../components/auth/StudentData';

const RegisterPage = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        ทะเบียน
      </h3>

      <Tab.Group>
        {/* ✅ Tabs Header */}
        <Tab.List className="flex space-x-2 bg-gray-200 p-1 rounded-xl">
          {['นักศึกษา', 'อาจารย์'].map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium leading-5 rounded-lg ${
                  selected
                    ? 'bg-blue-500 text-white'
                    : 'text-blue-700 hover:bg-white/[0.12]'
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        {/* ✅ Tabs Content */}
        <Tab.Panels className="mt-4">
          {/* 📌 นักศึกษา */}
          <Tab.Panel>
            <StudentData />
          </Tab.Panel>

          {/* 📌 อาจารย์ */}
          <Tab.Panel>
            <TeacherTable />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

// ✅ Component แสดงตารางอาจารย์
const TeacherTable = () => (
  <Table
    data={[
      { id: 1, name: 'ดร.ประเสริฐ ฉลาด', email: 'prasert@email.com' },
      { id: 2, name: 'อ.วรชัย มั่นคง', email: 'worachai@email.com' },
    ]}
    title="อาจารย์"
  />
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

export default RegisterPage;
