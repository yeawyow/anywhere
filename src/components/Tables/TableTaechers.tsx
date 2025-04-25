import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { TeacherDatatable } from '../TaecherDatatable';
import { ColumnDef } from '@tanstack/react-table';
import Settings from '../../pages/Settings';

type TeacherRow = {
  id: number;
  firstName: string;
  email: string;
};

const TableTeachers: React.FC = () => {
  const teacher = useSelector((state: RootState) => state.teacher.teachersList);
  const status = useSelector((state: RootState) => state.teacher.status);
  const error = useSelector((state: RootState) => state.teacher.error);
  const [isOpen, setIsOpen] = useState(false);
  const handleEdit = (rowData) => {
    // ฟังก์ชันจัดการข้อมูลที่ต้องการแก้ไข
    setIsOpen(true);

    console.log('ข้อมูลที่ต้องการแก้ไข:', rowData, 'setisopen', isOpen);
  };
  const data: TeacherRow[] = teacher.map(
    ({ id, first_name_thai, last_name_thai, email, national_id }: any) => ({
      id: id,
      firstName: `${first_name_thai} ${last_name_thai}`,
      email: email || 'ไม่มีอีเมล',
      national_id: national_id,
    }),
  );

  const columns = React.useMemo<ColumnDef<TeacherRow>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'รหัส',
      },
      {
        accessorKey: 'firstName',
        header: 'ชื่อ-สกุล',
      },
      {
        accessorKey: 'email',
        header: 'อีเมล',
      },
    ],
    [],
  );

  if (status === 'loading') return <p>กำลังโหลดข้อมูล...</p>;
  if (status === 'failed') return <p className="text-red-500">{error}</p>;
  if (teacher.length === 0) return <p>ไม่มีข้อมูลนักศึกษา</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ทะเบียนอาจารย์</h1>
      <TeacherDatatable data={data} columns={columns} onEdit={handleEdit} />
    </div>
  );
};

export default TableTeachers;
