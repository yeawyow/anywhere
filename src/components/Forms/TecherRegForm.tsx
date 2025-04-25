import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  getPrefix,
  getEducationalInstitutions,
  getSpectial,
} from '../../api/sregist';
import {
  getEducation,
  getPosition,
  getEducationLevel,
} from '../../api/tregist';
import BirthDatePicker from './DatePicker/BirthDatePicker';
import DatePickerOne from './DatePicker/DatePickerOne';
import Select from './Select';
import { getethnicity, getNationality, geteregion } from '../../api/mokApi';
import { registerTeacher } from '../../features/data/teacherslice';
import { useDispatch } from 'react-redux';
import ThaiAddressSelect from './SelectGroup/ThaiAddressSelect';
import { AppDispatch } from '../../app/store';
import InputField from './input/InputField';
import { getGenderFromPrefix } from '../../features/function';
import { fetchStudentData } from '../../features/data/studentslice';

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

interface EducaInstitut {
  id: number;
  educational_institution_name: string;
  [key: string]: string | number;
}
interface Specialization {
  id: number;
  specialization_name: string;
  [key: string]: string | number;
}
interface EdcationLevel {
  id: number;
  education_level_abbreviation: string;
  [key: string]: string | number;
}

interface Position {
  id: number;
  position_name: string;
  [key: string]: string | number;
}
interface Props {
  onClose: () => void;
  isEditMode: boolean;
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
  first_name_english: z.string().optional(),
  last_name_english: z.string().optional(),
  nationality_id: z.number().optional(), // ทำให้ไม่บังคับกรอก
  ethnicity_id: z.number().optional(), // ทำให้ไม่บังคับกรอก
  religion_id: z.number().optional(),
  gender_id: z.number().optional(),
  national_id: z.string().optional(),

  date_of_birth: z.string().optional(),
  phone_number: z.string().length(10, { message: 'กรุณาใส่เบอร์โทร 10 หลัก' }),
  email: z.string().optional(),

  house_number: z.string().optional(),
  village_group: z.string().optional(),
  sub_district_id: z.number().optional(),
  district_id: z.number().optional(),
  province_id: z.number().optional(),
  education_level_id: z.number().optional(),
  educational_institution_id: z.number().optional(),
  specialization_id: z.number().optional(),
  position_id: z.number().optional(),
  teacher_status_id: z.number().optional(),
  // student_code: z.string().optional(),
});

const TecherRegister = ({ onClose, isEditMode }: Props) => {
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
  const [Education, setEducation] = useState<EducaInstitut[]>([]);
  const [selectedEducation, setselectedEducation] =
    useState<EducaInstitut | null>(null);
  const [EducationLevel, setEducationLevel] = useState<EdcationLevel[]>([]);
  const [selectedEducationLevel, setselectedEducationLevel] =
    useState<EdcationLevel | null>(null);
  const [Position, setPosition] = useState<Position[]>([]);
  const [selectedPosition, setselectedPosition] = useState<Position | null>(
    null,
  );
  const [EducationalI, setEducationalI] = useState<EducaInstitut[]>([]);
  const [selectedEducationalI, setselectedEducationalI] =
    useState<EducaInstitut | null>(null);
  const [Specialization, setSpecialization] = useState<EducaInstitut[]>([]);
  const [selectedSpecialization, setselectedSpecialization] =
    useState<EducaInstitut | null>(null);
  const [region, setRegion] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [date_of_birth, setdateOfBirth] = useState<string>('');
  const [age, setAge] = useState<number>(0);

  const handleAgeChange = (newAge: number, birthdate: string) => {
    // console.log('Age selected:', newAge); // ดูค่าที่ส่งมา
    setAge(newAge); // รับค่าจาก BirthDatePicker
    setdateOfBirth(birthdate); // เก็บค่า birthdate
  };
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, isValid, errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      prefix_id: undefined,
      nationality_id: undefined,
      ethnicity_id: undefined,
      religion_id: 1,
      teacher_status_id: 1,
    },
  });
  useEffect(() => {
    const fetchPrefixAndNational = async () => {
      try {
        const [
          prefixData,
          nationalityData,
          ethnicityData,
          geteregionData,
          getEducationData,
          getEducationalInstitutionsData,
          getSpectialData,
          getPositionData,
          getEducationLevelData,
        ] = await Promise.all([
          getPrefix(), // ดึงข้อมูล Prefix
          getNationality(), // ดึงข้อมูล National
          getethnicity(),
          geteregion(),
          getEducation(),
          getEducationalInstitutions(),
          getSpectial(),
          getPosition(),
          getEducationLevel(),
        ]);

        setPrefixes(prefixData.message); // เก็บข้อมูล Prefix
        setNationality(nationalityData.message); // เก็บข้อมูล National
        setEthnicity(ethnicityData.message);
        setRegion(geteregionData.message);
        setEducation(getEducationData.message);
        setEducationalI(getEducationalInstitutionsData.message);
        setSpecialization(getSpectialData.message);
        setPosition(getPositionData.message);
        setEducationLevel(getEducationLevelData.message);

        if (nationalityData.message.length > 0) {
          setSelectedNationality(nationalityData.message[0]); // เลือกสัญชาติตัวแรก
          setValue('nationality_id', nationalityData.message[0].id); // ตั้งค่าฟอร์มค่าเริ่มต้น
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
    // setValue('age', age);
    setValue('date_of_birth', date_of_birth);
  }, [age, date_of_birth, setValue]);

  const onChangePrefix = (selectedPrefix: Prefix, field: any) => {
    setSelectedPrefix(selectedPrefix); // ตั้งค่าคำนำหน้า
    const gender = getGenderFromPrefix(selectedPrefix.id); // หาค่าเพศจากคำนำหน้า
    setGenderId(genderId); // เก็บค่าเพศไว้ใน state
    setValue('gender_id', gender); // อัปเดตฟอร์มค่า gender_id

    field.onChange(selectedPrefix.id); // อัปเดตค่าของ prefix_id ในฟอร์ม
  };
  const onSubmit = async (data: object) => {
    try {
      console.log(data);
      // ใช้ dispatch เพื่อเรียกใช้งาน AsyncThunk
      await dispatch(registerTeacher(data));
      onClose();
      dispatch(fetchStudentData()); // ฟังก์ชันนี้ควรใช้ในการดึงข้อมูลรายชื่อนักศึกษา
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-lg px-4 font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          ข้อมูลส่วนตัว
        </h4>
        <div className="grid grid-cols-[200px,auto,auto,auto,auto] gap-4 m-4">
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
              <p className="text-red-500 text-sm">{errors.prefix_id.message}</p>
            )}
          </div>

          {/* ชื่อ-สกุล (อังกฤษ) */}

          <InputField
            label="ชื่อ"
            name="first_name_thai"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอกชื่อ' }} // เพิ่ม validation
          />

          <InputField
            label="สกุล"
            name="last_name_thai"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอกนามสกุล' }} // เพิ่ม validation
          />
          <InputField
            label="ชื่อ(อังกฤษ)"
            name="first_name_english"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอกชื่อ' }} // เพิ่ม validation
          />

          <InputField
            label="สกุล(อังกฤษ)"
            name="last_name_english"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอกนามสกุล' }} // เพิ่ม validation
          />
        </div>
        <div className="grid grid-cols-6 gap-4 m-4">
          <InputField
            label="เลขบัตรประชาชน"
            name="national_id"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอเลขบัตร' }} // เพิ่ม validation
          />
          <InputField
            label="เบอร์โทร"
            name="phone_number"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอกเบอร์โทร' }} // เพิ่ม validation
          />
          <InputField
            label="อีเมลล์"
            name="email"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอกอีเมลล์' }} // เพิ่ม validation
          />
          <div>
            <label className="block text-gray-600">ระดับการศึกษา</label>
            <Controller
              name="education_level_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={EducationLevel}
                  value={
                    selectedEducationLevel || {
                      id: '',
                      education_level_id: '',
                    }
                  } // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                  onChange={(selectedEducationLevel: any) => {
                    setselectedEducationLevel(selectedEducationLevel);
                    field.onChange(selectedEducationLevel.id);
                  }}
                  label={selectedEducationLevel ? '' : 'เลือก'} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                  valueKey="id"
                  displayKey="education_level_abbreviation"
                />
              )}
            />
            {errors.education_level_id && (
              <p className="text-red-500 text-sm">
                {errors.education_level_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">สาขาวิชา</label>
            <Controller
              name="specialization_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={Specialization}
                  value={
                    selectedSpecialization || {
                      id: '',
                      specialization_id: '',
                    }
                  } // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                  onChange={(selectedSpecialization: any) => {
                    setselectedEducation(selectedSpecialization);
                    field.onChange(selectedSpecialization.id);
                  }}
                  label={selectedSpecialization ? '' : 'เลือก'} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                  valueKey="id"
                  displayKey="specialization_name"
                />
              )}
            />
            {errors.specialization_id && (
              <p className="text-red-500 text-sm">
                {errors.specialization_id.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">จบจาก</label>
            <Controller
              name="educational_institution_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={EducationalI}
                  value={
                    selectedEducationalI || {
                      id: '',
                      educational_institution_name: '',
                    }
                  } // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                  onChange={(selectedEducationalI: any) => {
                    setselectedEducationalI(selectedEducationalI);
                    field.onChange(selectedEducationalI.id);
                  }}
                  label={selectedEducationalI ? '' : 'เลือกโรงเรียนที่จบ'} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                  valueKey="id"
                  displayKey="educational_institution_name"
                />
              )}
            />
            {errors.educational_institution_id && (
              <p className="text-red-500 text-sm">
                {errors.educational_institution_id.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[400px,400px,auto,auto] gap-4 m-4">
          <div>
            <label className="block text-gray-600">ตำแหน่ง</label>
            <Controller
              name="position_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={Position}
                  value={
                    selectedPosition || {
                      id: '',
                      position_name: '',
                    }
                  } // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                  onChange={(selectedPosition: any) => {
                    setselectedPosition(selectedPosition);
                    field.onChange(selectedPosition.id);
                  }}
                  label={selectedPosition ? '' : 'เลือตำแหน่ง'} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                  valueKey="id"
                  displayKey="position_name"
                />
              )}
            />
            {errors.position_id && (
              <p className="text-red-500 text-sm">
                {errors.position_id.message}
              </p>
            )}
          </div>
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
          {/* 
          <InputField
            label=""
            name="age"
            type="hidden"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอกอายุ' }} // เพิ่ม validation
            readOnly={true} // ตั้งค่า readOnly เพื่อไม่ให้สามารถแก้ไขค่าเพศโดยตรง
          /> */}

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

        {/* 
        <div className="grid grid-cols-5 gap-4 m-4">
          <DatePickerOne
            label="วันที่เข้าทำงาน"
            name="enrollment_date"
            register={register}
            errors={errors}
            validation={{ required: 'กรุณากรอกเลือกวันที่' }}
          />
        </div> */}
        {/* <div className="grid grid-cols-4 gap-4 m-4">
          <div>
            <label className="block text-gray-600">ตำแหน่ง</label>
            <Controller
              name="educational_institution_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={EducationalI}
                  value={
                    selectedEducationalI || {
                      id: '',
                      educational_institution_name: '',
                    }
                  } // ถ้ายังไม่ได้เลือก ให้เป็นค่าว่าง
                  onChange={(selectedEducationalI: any) => {
                    setselectedEducationalI(selectedEducationalI);
                    field.onChange(selectedEducationalI.id);
                  }}
                  label={selectedEducationalI ? '' : 'เลือกตำแหน่ง'} // ถ้าเลือกแล้วให้ label เป็นค่าว่าง
                  valueKey="id"
                  displayKey="educational_institution_name"
                />
              )}
            />
            {errors.educational_institution_id && (
              <p className="text-red-500 text-sm">
                {errors.educational_institution_id.message}
              </p>
            )}
          </div>
        </div> */}

        <button
          type="submit"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditMode
              ? 'กำลังแก้ไข...'
              : 'กำลังบันทึก...'
            : isEditMode
            ? 'แก้ไข'
            : 'ลงทะเบียน'}
        </button>
      </form>
    </>
  );
};

export default TecherRegister;
