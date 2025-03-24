import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { getPrefix } from '../../api/sregist';
import BirthDatePicker from '../../components/Forms/DatePicker/BirthDatePicker';
import Select from '../../components/Forms/Select';
import { getethnicity, getNational, geteregion } from '../../api/mokApi';
import { registerStudent } from '../../features/data/studentslice';
import { useDispatch } from 'react-redux';
import ThaiAddressSelect from '../../components/Forms/SelectGroup/ThaiAddressSelect';
import { AppDispatch } from '../../app/store';
import InputField from '../../components/Forms/input/InputField';
import { getGenderFromPrefix } from '../../features/function';

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
interface Region {
  id: number;
  region_name_thai: string;
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
  gender_id: z.number().optional(),
  phone_number: z.string().length(10, { message: 'กรุณาใส่เบอร์โทร 10 หลัก' }),
  region_id: z.number().optional(),
  house_number: z.string().optional(),
  village_group: z.string().optional(),
  // sub_district_id: z.number().optional(),
  // district_id: z.number().optional(),
  // province_id: z.number().optional(),
  student_code: z.string().optional(),
  // .regex(/^\{10}$/, { message: 'ต้องเป็นตัวเลขเท่านั้น' }),
});

const StudentRegister = () => {
  const dispatch = useDispatch<AppDispatch>(); // ใช้ AppDispatch
  const [prefixes, setPrefixes] = useState<Prefix[]>([]);
  const [genderId, setGenderId] = useState(0);
  const [selectedPrefix, setSelectedPrefix] = useState<Prefix | null>(null);
  const [nationality, setNationality] = useState<Nationality[]>([]);
  const [selectedNationality, setSelectedNationality] =
    useState<Nationality | null>(null);
  const [ethnicity, setEthnicity] = useState<Ethnicity[]>([]);
  const [selectedEthnicity, setselectedEthnicity] = useState<Ethnicity | null>(
    null,
  );
  const [region, setRegion] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [dateOfBirth, setdateOfBirth] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [step, setStep] = useState(0);
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
      region_id: 1,
      date_of_birth: '',
      age: 0,
    },
  });
  useEffect(() => {
    const fetchPrefixAndNational = async () => {
      try {
        const [prefixData, nationalData, ethnicityData, geteregionData] =
          await Promise.all([
            getPrefix(), // ดึงข้อมูล Prefix
            getNational(), // ดึงข้อมูล National
            getethnicity(),
            geteregion(),
          ]);

        setPrefixes(prefixData.message); // เก็บข้อมูล Prefix
        setNationality(nationalData.message); // เก็บข้อมูล National
        setEthnicity(ethnicityData.message);
        setRegion(geteregionData.message);

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

  console.log(errors);
  const steps = ['ข้อมูลส่วนตัว', 'ข้อมูลนักศึกษา', 'ข้อมูลผู้ติดต่อ'];

  const onChangePrefix = (selectedPrefix: Prefix, field: any) => {
    setSelectedPrefix(selectedPrefix); // ตั้งค่าคำนำหน้า
    const gender = getGenderFromPrefix(selectedPrefix.id); // หาค่าเพศจากคำนำหน้า
    setGenderId(genderId); // เก็บค่าเพศไว้ใน state
    setValue('gender_id', gender); // อัปเดตฟอร์มค่า gender_id
    console.log('getgen2', gender);

    field.onChange(selectedPrefix.id); // อัปเดตค่าของ prefix_id ในฟอร์ม
  };
  const onSubmit = async (data: object) => {
    try {
      // ใช้ dispatch เพื่อเรียกใช้งาน AsyncThunk
      console.log(data);
      await dispatch(registerStudent(data));
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  const renderStep = () => {
    switch (step) {
      case 0: {
        return (
          <>
            <div className="grid grid-cols-[200px,auto,auto] gap-4 m-4">
              <div>
                <label className="block text-gray-600">คำนำหน้า</label>
                <Controller
                  name="prefix_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={prefixes}
                      value={selectedPrefix || { id: '', prefix_name: '' }} // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                      onChange={(selectedPrefix: any) =>
                        onChangePrefix(selectedPrefix, field)
                      } // เรียกใช้งาน onChangePrefix
                      label={selectedPrefix ? '' : 'กรุณาเลือกคำนำหน้า'} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                      valueKey="id"
                      displayKey="prefix_name"
                    />
                  )}
                />
                {errors.prefix_id && (
                  <p className="text-red-500 text-sm">
                    {errors.prefix_id.message}
                  </p>
                )}
              </div>

              {/* ชื่อ-สกุล (อังกฤษ) */}

              <InputField
                label="ชื่อ (ไทย)"
                name="first_name_thai"
                register={register}
                errors={errors}
                validation={{ required: 'กรุณากรอกชื่อ' }} // เพิ่ม validation
              />

              <InputField
                label="ชื่อ (ไทย)"
                name="last_name_thai"
                register={register}
                errors={errors}
                validation={{ required: 'กรุณากรอกนามสกุล' }} // เพิ่ม validation
              />
            </div>
            <div className="grid grid-cols-4 gap-4 m-4">
              <InputField
                label="ชื่อ (อังกฤษ)"
                name="first_name_english"
                register={register}
                errors={errors}
                validation={{ required: 'กรุณากรอกชื่อ' }} // เพิ่ม validation
              />
              <InputField
                label="นามสกุล (อังกฤษ)"
                name="last_name_english"
                register={register}
                errors={errors}
                validation={{ required: 'กรุณากรอกนามสกุล' }} // เพิ่ม validation
              />
              <InputField
                label="เลขบัตรประชาชน"
                name="national_id"
                register={register}
                errors={errors}
                validation={{ required: 'กรุณากรอกนามสกุล' }} // เพิ่ม validation
              />
              <InputField
                label="เบอร์โทร"
                name="phone_number"
                register={register}
                errors={errors}
                validation={{ required: 'กรุณากรอกเบอร์โทร' }} // เพิ่ม validation
              />
            </div>
            <div className="grid grid-cols-[400px,100px,auto,auto,auto] gap-5 m-4">
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
                <InputField
                  label="อายุ (ปี)"
                  name="age"
                  register={register}
                  errors={errors}
                  validation={{ required: 'กรุณากรอกอายุ' }} // เพิ่ม validation
                  readOnly={true} // ตั้งค่า readOnly เพื่อไม่ให้สามารถแก้ไขค่าเพศโดยตรง
                />
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
                        selectedNationality || {
                          id: '',
                          national_name_thai: '',
                        }
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
              <div>
                <label className="block text-gray-600">ศาสนา</label>
                <Controller
                  name="region_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={region}
                      value={
                        selectedRegion || {
                          id: '',
                          region_name_thai: '',
                        }
                      } // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                      onChange={(selectedRegion: any) => {
                        setSelectedRegion(selectedRegion);
                        field.onChange(selectedRegion.id);
                      }}
                      label={selectedRegion ? '' : ''} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                      valueKey="id"
                      displayKey="region_name_thai"
                    />
                  )}
                />
                {errors.region_id && (
                  <p className="text-red-500 text-sm">
                    {errors.region_id.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 m-4 ">
              <div>
                <label className="block text-gray-600">ที่อยู่</label>
                <ThaiAddressSelect register={register} setValue={setValue} />
              </div>
              <InputField
                type="hidden"
                label=""
                name="gender_id"
                register={register}
                errors={errors}
              />
            </div>
          </>
        );
      }
      case 1:
        return (
          <>
            <InputField
              label="รหัสนักศึกษา"
              name="student_code"
              register={register}
              errors={errors}
              validation={{ required: 'กรุณากรอกรหัสนักศึกษา' }} // เพิ่ม validation
            />
            <InputField
              label="อีเมลล์"
              name="email"
              register={register}
              errors={errors}
              validation={{ required: 'กรุณากรอกอีเมลล์' }} // เพิ่ม validation
            />
          </>
        );
    }
  };
  return (
    <div className="flex  justify-center items-center">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {renderStep()}
        <div className="grid grid-cols-1 gap-4 m-4">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
            >
              ย้อนกลับ
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              ถัดไป
            </button>
          ) : (
            <button
              type="submit"
              // onSubmit={onSubmit}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              ลงทะเบียน
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentRegister;
