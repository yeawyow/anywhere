import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudent, registerStudentApi } from '../../api/sregist';

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
// สร้าง AsyncThunk สำหรับการลงทะเบียนนักเรียน
export const registerStudent = createAsyncThunk<
  Student,
  object,
  { rejectValue: string }
>(
  'student/register', // ชื่อ action
  async (studentData: object, { rejectWithValue }) => {
    try {
      // เรียกใช้งานฟังก์ชัน registerStudent ที่คุณได้เขียนไว้
      const response = await registerStudentApi(studentData);
      return response; // ส่งผลลัพธ์กลับไป
    } catch (error) {
      console.error('Error registering student:', error);
      return rejectWithValue(error); // ถ้ามีข้อผิดพลาดให้ส่งไปที่ reject
    }
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
      })
      .addCase(registerStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.student.push(action.payload); // เพิ่มข้อมูลที่ได้รับจาก API
      })
      .addCase(registerStudent.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default studentSlice.reducer;
