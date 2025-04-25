import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store'; // นำเข้าจาก store
import { useTable, useFilters } from 'react-table';

type Users = {
  logo: string;
  name: string;
  visitors: number;
  revenues: string;
  sales: number;
  conversion: number;
};
const DataTable = ({ data, columns }: { data: any[]; columns: any[] }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { filters },
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // ใช้ hook นี้ในการใช้งานฟิลเตอร์
  );

  return (
    <div className="overflow-x-auto">
      {/* ช่องกรอง */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหาชื่อหรือข้อมูล"
          className="border p-2 rounded"
          onChange={(e) => setFilter('first_name_thai', e.target.value)} // กรองตามชื่อ
        />
      </div>
      {/* ตาราง */}
      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse"
      >
        <thead className="bg-gray-200">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-4 py-2 border-b">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border-b">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableStudent: React.FC = () => {
  // ดึงข้อมูลจาก Redux store
  const student = useSelector((state: RootState) => state.student.studentList);
  const status = useSelector((state: RootState) => state.student.status);
  const error = useSelector((state: RootState) => state.student.error);
  // กรองข้อมูลฟิลด์ที่ต้องการแสดง
  const filteredData = student.map(
    ({ student_code, first_name_thai, last_name_thai }: any) => ({
      studentCode: `${student_code}`,
      firstName: `${first_name_thai} ${last_name_thai}`,
      lastName: last_name_thai,
    }),
  );
  if (status === 'loading') {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  if (status === 'failed') {
    return <p className="text-red-500">{error}</p>;
  }

  if (student.length === 0) {
    return <p>ไม่มีข้อมูลนักศึกษา</p>;
  }
  // กำหนด columns สำหรับ React Table

  const columns = React.useMemo(
    () => [
      {
        Header: 'รหัสนักศึกษา',
        accessor: 'studentCode',
      },
      {
        Header: 'ชื่อ-สกุล',
        accessor: 'firstName', // ฟิลด์ที่ต้องการแสดง
      },
      {
        Header: 'อีเมลล์',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
    ],
    [],
  );
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">รายชื่อนักศึกษา</h1>
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
};

export default TableStudent;
