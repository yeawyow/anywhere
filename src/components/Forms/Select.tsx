import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

interface SelectOption {
  id: number;
  [key: string]: string | number; // รองรับ key และ value อื่นๆ
}

interface SelectProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  label: string;
  valueKey: keyof T; // ค่า key ที่จะใช้ในการดึงข้อมูลเก็บค่า
  displayKey: keyof T; // ค่า key ที่จะใช้ในการแสดงผลใน Select (ค่าที่จะแสดงใน UI)
}
const Select = <T extends SelectOption>({
  options,
  value,
  onChange,
  label,
  valueKey,
  displayKey,
}: SelectProps<T>) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative ">
        <Listbox.Button className="relative w-full cursor-pointer bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus:ring-2 focus:ring-indigo-500">
          <span className="block truncate">
            {label
              ? label
              : value && value[displayKey]
              ? String(value[displayKey])
              : options[0]?.[displayKey] || 'กรุณาเลือก'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {options.map((option) => (
            <Listbox.Option
              key={String(option[valueKey])} // ใช้ valueKey ในการดึงค่าที่จะใช้เป็น key
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
                    className={`block truncate ${
                      selected ? 'font-semibold' : 'font-normal'
                    }`}
                  >
                    {option[displayKey]} {/* แสดง key ที่กำหนด */}
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

export default Select;
