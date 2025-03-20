import { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import {
  getProvince,
  getDistricts,
  getSubDistricts,
} from '../../../api/provineMahad'; // ปรับให้ตรงกับ API ของคุณ

interface Province {
  id: string;
  name_th: string;
}

interface District {
  id: string;
  name_th: string;
}

interface SubDistrict {
  id: string;
  name_th: string;
}

interface ThaiAddressSelectProps {
  register: any;
  setValue: (name: string, value: string) => void;
}

const ThaiAddressSelect: React.FC<ThaiAddressSelectProps> = ({
  register,
  setValue,
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null,
  );
  const [selectedSubDistrict, setSelectedSubDistrict] =
    useState<SubDistrict | null>(null);

  // โหลดจังหวัด
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvince();
        setProvinces(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  // โหลดอำเภอเมื่อเลือกจังหวัด
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict(null);
      return;
    }

    const fetchDistricts = async () => {
      try {
        const data = await getDistricts(selectedProvince.id);
        setDistricts(Array.isArray(data) ? data : []);
        setSelectedDistrict(null);
        setSelectedSubDistrict(null);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  // โหลดตำบลเมื่อเลือกอำเภอ
  useEffect(() => {
    if (!selectedDistrict) {
      setSubDistricts([]);
      setSelectedSubDistrict(null);
      return;
    }

    const fetchSubDistricts = async () => {
      try {
        const data = await getSubDistricts(selectedDistrict.id);
        setSubDistricts(Array.isArray(data) ? data : []);
        setSelectedSubDistrict(null);
      } catch (error) {
        console.error('Error fetching subdistricts:', error);
      }
    };

    fetchSubDistricts();
  }, [selectedDistrict]);

  // อัปเดตค่าใน react-hook-form
  useEffect(() => {
    setValue('province_id', selectedProvince?.id || '');
    setValue('district_id', selectedDistrict?.id || '');
    setValue('sub_district_id', selectedSubDistrict?.id || '');
  }, [selectedProvince, selectedDistrict, selectedSubDistrict, setValue]);

  return (
    <div className="flex space-x-4">
      {/* จังหวัด */}
      <CustomListbox
        label="จังหวัด"
        options={provinces}
        selected={selectedProvince}
        onChange={setSelectedProvince}
      />

      {/* อำเภอ */}
      <CustomListbox
        label="อำเภอ"
        options={districts}
        selected={selectedDistrict}
        onChange={setSelectedDistrict}
        disabled={!selectedProvince}
      />

      {/* ตำบล */}
      <CustomListbox
        label="ตำบล"
        options={subDistricts}
        selected={selectedSubDistrict}
        onChange={setSelectedSubDistrict}
        disabled={!selectedDistrict}
      />

      {/* หมู่ และ บ้านเลขที่ */}
      <div className="flex space-x-4">
        {/* หมู่ */}
        <div className="flex-1">
          <input
            type="text"
            id="villageNumber"
            className=" px-3 py-2 border border-gray-300 rounded-md w-full"
            {...register('village_number')}
            placeholder="หมู่"
          />
        </div>

        {/* บ้านเลขที่ */}
        <div className="flex-1">
          <input
            type="text"
            id="houseNumber"
            className=" px-3 py-2 border border-gray-300 rounded-md w-full"
            {...register('house_number')}
            placeholder="บ้านเลขที่"
          />
        </div>
      </div>
    </div>
  );
};

export default ThaiAddressSelect;

interface ListboxProps {
  label: string;
  options: { id: string; name_th: string }[];
  selected: { id: string; name_th: string } | null;
  onChange: (value: { id: string; name_th: string } | null) => void;
  disabled?: boolean;
}

const CustomListbox: React.FC<ListboxProps> = ({
  label,
  options,
  selected,
  onChange,
  disabled = false,
}) => {
  return (
    <Listbox value={selected} onChange={onChange} disabled={disabled}>
      <div className="relative w-72">
        <Listbox.Button className="relative w-full cursor-pointer bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus:ring-2 focus:ring-indigo-500">
          <span className="block">{selected ? selected.name_th : label}</span>
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
                    {option.name_th}
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
