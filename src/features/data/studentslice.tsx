import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudent } from '../../api/sregist';

interface Image {
  type: string;
  data: any[]; // หรือ Buffer ถ้าจำเป็น
}

interface Student {
  id: number;
  prefix_id: number;
  first_name_thai: string;
  last_name_thai: string;
  first_name_english: string;
  last_name_english: string;
  national_id: string;
  date_of_birth: string;
  gender_id: number;
  enrollment_age: string;
  nationality_id: number;
  ethnicity_id: number;
  religion_id: number;
  phone_number: string;
  email: string;
  house_number: string;
  village_group: string;
  sub_district_id: number;
  district_id: number;
  province_id: number;
  student_code: string;
  enrollment_date: string;
  enrollment_year_id: number;
  enrollment_term_id: number;
  graduated_institution: string;
  graduation_level: string;
  previous_qualification: string;
  father_prefix_id: number;
  father_first_name_thai: string;
  father_last_name_thai: string;
  father_national_id: string;
  father_marital_status_id: number;
  father_occupation_id: number;
  father_nationality_id: number;
  father_phone_number: string;
  mother_prefix_id: number;
  mother_first_name_thai: string;
  mother_last_name_thai: string;
  mother_national_id: string;
  mother_marital_status_id: number;
  mother_occupation_id: number;
  mother_nationality_id: number;
  mother_phone_number: string;
  guardian_prefix_id: number;
  guardian_first_name_thai: string;
  guardian_last_name_thai: string;
  guardian_national_id: string;
  guardian_relation_to_student: number;
  guardian_phone_number: string;
  guardian_occupation_id: number;
  guardian_nationality_id: number;
  guardian_house_number: string;
  guardian_village_group: string;
  guardian_sub_district_id: number;
  guardian_district_id: number;
  guardian_province_id: number;
  image: Image;
  student_status_id: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

interface StudentState {
  student: Student[]; // ปรับเป็นอาร์เรย์ของ Student
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchStudentData = createAsyncThunk<Student[], void>( // ดึงข้อมูลเป็น Student[]
  'student/fetchStudentData',
  async () => {
    const data = await getStudent(); // ดึงข้อมูลจาก API
    return data.message; // เราจะดึงเฉพาะข้อมูลใน message ที่เป็นอาร์เรย์
  },
);

const initialState: StudentState = {
  student: [], // กำหนด state ให้เป็นอาร์เรย์ของ Student
  status: 'idle',
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentData.pending, (state) => {
        state.status = 'loading'; // เริ่มโหลด
      })
      .addCase(
        fetchStudentData.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          // เปลี่ยนเป็น Student[]
          state.status = 'succeeded'; // ถ้าข้อมูลมาครบ
          state.student = action.payload; // เก็บข้อมูลที่ได้รับ
        },
      )
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.status = 'failed'; // ถ้าเกิดข้อผิดพลาด
        state.error = action.error.message || 'Error occurred';
      });
  },
});

export default studentSlice.reducer;
