import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { StudentDatatable } from '../../components/StudentDatatable';
import { ColumnDef } from '@tanstack/react-table';

type StudentRow = {
  image: string;
  studentCode: string;
  firstName: string;
  email: string;
};

const TableStudent: React.FC = () => {
  const student = useSelector((state: RootState) => state.student.studentList);
  const status = useSelector((state: RootState) => state.student.status);
  const error = useSelector((state: RootState) => state.student.error);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<StudentRow[]>([]);

  const handleEdit = (rowData: any) => {
    setIsOpen(true);
    console.log('ข้อมูลที่ต้องการแก้ไข:', rowData);
  };
// const base64String = buffer.toString('base64');

  // ฟังก์ชันแปลง Buffer (จาก backend) เป็น Base64
  const bufferToBase64 = (buffer: { data: number[] }): string => {
    const binary = new Uint8Array(buffer.data).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      '',
    );
    return 'data:image/jpeg;base64,' + btoa(binary);
  };

  useEffect(() => {
    const convertedData = student.map((s: any) => {
      const imageBase64 = s.image?.data ? bufferToBase64(s.image) : '';

      return {
        image: imageBase64,
        studentCode: s.student_code,
        firstName: `${s.first_name_thai} ${s.last_name_thai}`,
        email: s.email || 'ไม่มีอีเมล',
      };
    });

    setData(convertedData);
  }, [student]);

  const columns = React.useMemo<ColumnDef<StudentRow>[]>(
    () => [
      {
        accessorKey: 'image',
        header: 'รูปภาพ',
        cell: ({ row }) => (
          <img
            src={row.original.image}
            alt="student"
            className="w-12 h-12 object-cover rounded-full border"
          />
        ),
      },
      {
        accessorKey: 'studentCode',
        header: 'รหัสนักศึกษา',
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
  if (data.length === 0) return <p>ไม่มีข้อมูลนักศึกษา</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">รายชื่อนักศึกษา</h1>
      <StudentDatatable data={data} columns={columns} onEdit={handleEdit} />
    </div>
  );
};

export default TableStudent;
