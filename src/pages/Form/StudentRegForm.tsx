import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { getPrefix } from '../../api/sregist';
import BirthDatePicker from '../../components/Forms/DatePicker/BirthDatePicker';
import Select from '../../components/Forms/Select';
import { getethnicity, getNational } from '../../api/mokApi';
import ThaiAddressSelect from '../../components/Forms/SelectGroup/ThaiAddressSelect';
interface Prefix {
  id: number;
  prefix_name: string;
  [key: string]: string | number; // เพิ่ม index signature
}
interface Nationality {
  id: number;
  national_name_thai: string;
  [key: string]: string | number; // เพิ่ม index signature
}
interface Ethnicity {
  id: number;
  ethnicity_name_thai: string;
  [key: string]: string | number; // เพิ่ม index signature
}
interface Student {
  date_of_birth: string;
  phone_number: string;
}
const schema = z.object({
  prefix_id: z
    .number()
    .int({ message: 'คำนำหน้าต้องเป็นจำนวนเต็ม' }) // ตรวจสอบให้เป็นจำนวนเต็ม
    .min(1, { message: 'กรุณาเลือกคำนำหน้า' }), // ค่าต้องมากกว่า 0
  first_name_thai: z
    .string()
    .min(2, { message: 'ชื่อ(ไทย) ต้องมีอย่างน้อย 2 ตัวอักษร' })
    .max(50, { message: 'ชื่อ (ไทย) ต้องไม่เกิน 50 ตัวอักษร' })
    .regex(/^[ก-ฮะ-๏]*$/, {
      message: 'ชื่อ(ไทย) ต้องใช้ตัวอักษรภาษาไทยเท่านั้น',
    }), // ภาษาไทยเท่านั้น
  last_name_thai: z
    .string()
    .min(2, { message: 'นามสกุล (ไทย) ต้องมีอย่างน้อย 2 ตัวอักษร' })
    .max(50, { message: 'นามสกุล (ไทย) ต้องไม่เกิน 50 ตัวอักษร' })
    .regex(/^[ก-ฮะ-๏]*$/, {
      message: 'ชื่อ(ไทย) ต้องใช้ตัวอักษรภาษาไทยเท่านั้น',
    }), // ภาษาไทยเท่านั้น,
  first_name_english: z
    .string()
    .min(2, { message: 'ชื่อ (อังกฤษ) ต้องมีอย่างน้อย 2 ตัวอักษร' })
    .max(50, { message: 'ชื่อ (อังกฤษ) ต้องไม่เกิน 50 ตัวอักษร' })
    .regex(/^[A-Za-z\s]*$/, {
      message: 'ชื่อ(ภาษาอังกฤษ) ต้องใช้ตัวอักษรภาษาอังกฤษเท่านั้น',
    }), // ภาษาอังกฤษเท่านั้น
  last_name_english: z
    .string()
    .min(2, { message: 'นามสกุล (อังกฤษ) ต้องมีอย่างน้อย 2 ตัวอักษร' })
    .max(50, { message: 'นามสกุล (อังกฤษ) ต้องไม่เกิน 50 ตัวอักษร' })
    .regex(/^[A-Za-z\s]*$/, {
      message: 'ชื่อ(นามสกุล) ต้องใช้ตัวอักษรภาษาอังกฤษเท่านั้น',
    }), // ภาษาอังกฤษเท่านั้น
  national_id: z
    .string()
    .length(13, { message: 'เลขบัตรประชาชนต้องมีความยาว 13 หลัก' })
    .regex(/^\d{13}$/, { message: 'เลขบัตรประชาชนต้องเป็นตัวเลขเท่านั้น' }),
  nationality_id: z.number().optional(), // ทำให้ไม่บังคับกรอก
  ethnicity_id: z.number().optional(), // ทำให้ไม่บังคับกรอก

  age: z.number().min(1, { message: 'เลือกวันเกิด' }),
  date_of_birth: z.string().optional(),
  phone_number: z.string().length(10, { message: 'กรุณาใส่เบอร์โทร 10 หลัก' }),
  // .regex(/^\{10}$/, { message: 'ต้องเป็นตัวเลขเท่านั้น' }),
});

const StudentRegister = () => {
  const [prefixes, setPrefixes] = useState<Prefix[]>([]);
  const [selectedPrefix, setSelectedPrefix] = useState<Prefix | null>(null);
  const [nationality, setNationality] = useState<Nationality[]>([]);
  const [selectedNationality, setSelectedNationality] =
    useState<Nationality | null>(null);
  const [ethnicity, setEthnicity] = useState<Ethnicity[]>([]);
  const [selectedEthnicity, setselectedEthnicity] = useState<Ethnicity | null>(
    null,
  );
  const [dateOfBirth, setdateOfBirth] = useState<string>('');
  const [age, setAge] = useState<number>(0);

  const handleAgeChange = (newAge: number, birthdate: string) => {
    console.log('Age selected:', newAge); // ดูค่าที่ส่งมา
    setAge(newAge); // รับค่าจาก BirthDatePicker
    setdateOfBirth(birthdate); // เก็บค่า birthdate
  };
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      prefix_id: undefined,
      nationality_id: undefined,
      ethnicity_id: undefined,
      date_of_birth: '',
      age: 0,
      phone_number: '',
    },
  });
  useEffect(() => {
    const fetchPrefixAndNational = async () => {
      try {
        const [prefixData, nationalData, ethnicityData] = await Promise.all([
          getPrefix(), // ดึงข้อมูล Prefix
          getNational(), // ดึงข้อมูล National
          getethnicity(),
        ]);

        setPrefixes(prefixData.message); // เก็บข้อมูล Prefix
        setNationality(nationalData.message); // เก็บข้อมูล National
        setEthnicity(ethnicityData.message);

        if (nationalData.message.length > 0) {
          setSelectedNationality(nationalData.message[0]); // เลือกสัญชาติตัวแรก
          setValue('nationality_id', nationalData.message[0].id); // ตั้งค่าฟอร์มค่าเริ่มต้น
        }
        if (ethnicityData.message.length > 0) {
          setselectedEthnicity(ethnicityData.message[0]); // เลือกสัญชาติตัวแรก
          setValue('ethnicity_id', ethnicityData.message[0].id); // ตั้งค่าฟอร์มค่าเริ่มต้น
        }
      } catch (err) {
        console.error(err); // แสดงข้อผิดพลาดใน console
      }
    };

    fetchPrefixAndNational(); // เรียกใช้งานฟังก์ชัน
  }, [setValue]);

  useEffect(() => {
    setValue('age', age);
    setValue('date_of_birth', dateOfBirth);
  }, [age, dateOfBirth, setValue]);
  const onSubmit = (data: any) => {
    console.log('Submitting...', data);
  };
  console.log(errors);
  console.log(age);
  return (
    <div className="flex  justify-center items-center">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[200px,auto,auto] gap-4 m-4">
          {/* เลือกคำนำหน้า (Prefix) */}
          <div>
            <label className="block text-gray-600">คำนำหน้า</label>
            <Controller
              name="prefix_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={prefixes}
                  value={selectedPrefix || { id: '', prefix_name: '' }} // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                  onChange={(selectedPrefix: any) => {
                    setSelectedPrefix(selectedPrefix);
                    field.onChange(selectedPrefix.id);
                  }}
                  label={selectedPrefix ? '' : 'กรุณาเลือกคำนำหน้า'} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                  valueKey="id"
                  displayKey="prefix_name"
                />
              )}
            />
            {errors.prefix_id && (
              <p className="text-red-500 text-sm">{errors.prefix_id.message}</p>
            )}
          </div>
          {/* ชื่อ-สกุล (อังกฤษ) */}
          <div>
            <label className="block text-gray-600">ชื่อ (ไทย)</label>
            <input
              type="text"
              {...register('first_name_thai')}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {errors.first_name_thai && (
              <p className="text-red-500 text-sm">
                {errors.first_name_thai.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">นามสกุล (ไทย)</label>
            <input
              type="text"
              {...register('last_name_thai')}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {errors.last_name_thai && (
              <p className="text-red-500 text-sm">
                {errors.last_name_thai.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4">
          {/* ชื่อ (อังกฤษ) */}
          <div>
            <label className="block text-gray-600">ชื่อ (อังกฤษ)</label>
            <input
              type="text"
              {...register('first_name_english')}
              className=" px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {errors.first_name_english && (
              <p className="text-red-500 text-sm">
                {errors.first_name_english.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">นามสกุล (อังกฤษ)</label>
            <input
              type="text"
              {...register('last_name_english')}
              className=" px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {errors.last_name_english && (
              <p className="text-red-500 text-sm">
                {errors.last_name_english.message}
              </p>
            )}
          </div>
          {/* ชื่อ-สกุล (อังกฤษ) */}
          <div>
            <label className="block text-gray-600">เลขบัตรประชาชน</label>
            <input
              type="text"
              {...register('national_id')}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {errors.national_id && (
              <p className="text-red-500 text-sm">
                {errors.national_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">เบอร์โทร</label>
            <input
              type="text"
              {...register('phone_number')}
              className=" px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[auto,auto,auto,auto] gap-4 m-4">
          {/* เลือกวันเดือนปีเกิด */}
          <div>
            <label className="block text-gray-600">วันเดือนปีเกิด</label>
            <BirthDatePicker onAgeChange={handleAgeChange} />
            {/* ฟิลด์ birthdate ที่ซ่อน */}
            <input
              type="hidden"
              {...register('date_of_birth')} // ผูกกับฟิลด์ birthdate
            />
          </div>

          <div>
            <label className="block text-gray-600">อายุ</label>
            <input
              type="text"
              {...register('age')}
              className=" px-3 py-2 border border-gray-300 rounded-md w-full"
              // disabled // ไม่ให้ผู้ใช้แก้ไขอายุ
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">สัญชาติ</label>
            <Controller
              name="nationality_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={nationality}
                  value={
                    selectedNationality || { id: '', national_name_thai: '' }
                  } // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                  onChange={(selectedNationality: any) => {
                    setSelectedNationality(selectedNationality);
                    field.onChange(selectedNationality.id);
                  }}
                  label={selectedNationality ? '' : ''} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                  valueKey="id"
                  displayKey="national_name_thai"
                />
              )}
            />
            {errors.nationality_id && (
              <p className="text-red-500 text-sm">
                {errors.nationality_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">เชื้อชาติ</label>
            <Controller
              name="ethnicity_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={ethnicity}
                  value={
                    selectedEthnicity || { id: '', ethnicity_name_thai: '' }
                  } // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                  onChange={(selectedEthnicity: any) => {
                    setselectedEthnicity(selectedEthnicity);
                    field.onChange(selectedEthnicity.id);
                  }}
                  label={selectedEthnicity ? '' : ''} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                  valueKey="id"
                  displayKey="ethnicity_name_thai"
                />
              )}
            />
            {errors.ethnicity_id && (
              <p className="text-red-500 text-sm">
                {errors.ethnicity_id.message}
              </p>
            )}
          </div>

          {/* เลือกวันเดือนปีเกิด */}
        </div>
        <div className="grid grid-cols-1 gap-4 m-4 ">
          <div>
            <label className="block text-gray-600">ที่อยู่</label>
            <ThaiAddressSelect register={register} setValue={setValue} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 m-4 ">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            ลงทะเบียน
          </button>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            ยกเลิก
          </button>
        </div>
        {/* ปุ่ม Submit */}
      </form>
    </div>
  );
};

export default StudentRegister;
