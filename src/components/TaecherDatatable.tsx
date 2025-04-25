// components/StudentDatatable.tsx
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Papa from 'papaparse';
import React from 'react';

type StudentDatatableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  onEdit?: (rowData: T) => void; // ฟังก์ชันเรียกเมื่อกดปุ่มแก้ไข
};

export function TeacherDatatable<T>({
  data,
  columns,
  onEdit,
}: StudentDatatableProps<T>) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState([]);

  // เพิ่มคอลัมน์ "แก้ไข" เข้าไปใน columns
  const extendedColumns: ColumnDef<T, any>[] = [
    ...columns,
    {
      id: 'actions',
      header: 'การจัดการ',
      cell: ({ row }) => (
        <button
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded shadow"
          onClick={() => onEdit?.(row.original)}
        >
          แก้ไข
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns: extendedColumns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportToCSV = () => {
    const csvData = table.getFilteredRowModel().rows.map((row) =>
      row.getVisibleCells().reduce(
        (acc, cell) => {
          const colId = cell.column.id;
          acc[colId] = cell.getValue();
          return acc;
        },
        {} as Record<string, any>,
      ),
    );
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'students.csv';
    link.click();
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="ค้นหาทั้งตาราง..."
          className="border p-2 rounded w-full md:w-64"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <button
          onClick={exportToCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Export CSV
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-4 py-2 border text-left cursor-pointer select-none"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
        <span className="text-sm text-gray-700">
          หน้า {table.getState().pagination.pageIndex + 1} จาก{' '}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}
