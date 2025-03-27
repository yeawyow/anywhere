import { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

const months = [
  { id: 1, name: 'มกราคม' },
  { id: 2, name: 'กุมภาพันธ์' },
  { id: 3, name: 'มีนาคม' },
  { id: 4, name: 'เมษายน' },
  { id: 5, name: 'พฤษภาคม' },
  { id: 6, name: 'มิถุนายน' },
  { id: 7, name: 'กรกฎาคม' },
  { id: 8, name: 'สิงหาคม' },
  { id: 9, name: 'กันยายน' },
  { id: 10, name: 'ตุลาคม' },
  { id: 11, name: 'พฤศจิกายน' },
  { id: 12, name: 'ธันวาคม' },
];

const currentYear = new Date().getFullYear(); // ปีปัจจุบัน เช่น 2025
const minYear = currentYear - 60; // อายุสูงสุด 60 ปี
const maxYear = currentYear - 12; // อายุขั้นต่ำ 12 ปี

const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => ({
  id: minYear + i, // เริ่มจากปีที่ต่ำสุด
  name: (minYear + i + 543).toString(), // แปลงเป็น พ.ศ.
}));

const days = Array.from({ length: 31 }, (_, i) => ({
  id: i + 1,
  name: (i + 1).toString(),
}));

interface BirthDatePickerProps {
  onAgeChange: (age: number, birthdate: string) => void; // ฟังก์ชันที่รับค่าอายุและวันเกิด
}

const BirthDatePicker: React.FC<BirthDatePickerProps> = ({ onAgeChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]); // ปีปัจจุบัน
  const [selectedDay, setSelectedDay] = useState(days[0]);

  // ฟังก์ชันที่ใช้ในการคำนวณวันที่ในรูปแบบ dd-mm-yyyy
  const getFormattedDate = () => {
    const day = selectedDay.name.padStart(2, '0'); // เติม 0 หน้าเลข 1 หลัก
    const month = selectedMonth.id.toString().padStart(2, '0'); // เติม 0 หน้าเดือนที่เป็นเลข 1 หลัก
    const year = selectedYear.id.toString(); // ปี พ.ศ.
    const birthdate = `${year}-${month}-${day}`;
    return birthdate;
  };

  // ฟังก์ชันคำนวณอายุ
  const calculateAge = () => {
    const birthDate = new Date(
      `${selectedYear.id}-${selectedMonth.id
        .toString()
        .padStart(2, '0')}-${selectedDay.name.padStart(2, '0')}`,
    );
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    const dayDiff = currentDate.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--; // ลดอายุลง 1 ปีหากยังไม่ถึงวันเกิดในปีนี้
    }

    const formattedBirthdate = getFormattedDate(); // รับค่า birthdate ที่คำนวณได้
    onAgeChange(age, formattedBirthdate); // ส่งค่าอายุและวันเกิดไปยัง parent component
    return age;
  };

  useEffect(() => {
    calculateAge(); // คำนวณอายุทุกครั้งที่เลือกวัน เดือน หรือ ปี
  }, [selectedDay, selectedMonth, selectedYear]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* เลือกวัน */}
      <CustomListbox
        label="วัน"
        options={days}
        selected={selectedDay}
        onChange={setSelectedDay}
      />
      {/* เลือกเดือน */}
      <CustomListbox
        label="เดือน"
        options={months}
        selected={selectedMonth}
        onChange={setSelectedMonth}
      />
      {/* เลือกปี */}
      <CustomListbox
        label="ปี"
        options={years}
        selected={selectedYear}
        onChange={setSelectedYear}
      />

      {/* <div className="mt-2">
        <p>วันที่เลือก: {getFormattedDate()}</p>
      </div> */}
    </div>
  );
};

export default BirthDatePicker;

interface ListboxProps {
  label: string;
  options: { id: number; name: string }[];
  selected: { id: number; name: string };
  onChange: (value: { id: number; name: string }) => void;
}

const CustomListbox: React.FC<ListboxProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative w-32">
        <Listbox.Button className="relative w-full cursor-pointer bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus:ring-2 focus:ring-indigo-500">
          <span className="block ">{selected ? selected.name : label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className={({ active }) =>
                `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                  active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block  ${
                      selected ? 'font-semibold' : 'font-normal'
                    }`}
                  >
                    {option.name}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                      <CheckIcon className="w-5 h-5" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
