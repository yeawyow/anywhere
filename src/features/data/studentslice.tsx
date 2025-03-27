import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudent, registerStudentApi } from '../../api/sregist';

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
  image: string;
}

interface StudentState {
  studentList: Student[];
  selectedStudent: Student | null;
  studentFormData: Partial<Student>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchStudentData = createAsyncThunk<Student[], void>(
  'student/fetchStudentData',
  async () => {
    const data = await getStudent();
    return data;
  },
);

// สร้าง AsyncThunk สำหรับการลงทะเบียนนักเรียน
export const registerStudent = createAsyncThunk<
  Student,
  Partial<Student>, // เปลี่ยนเป็น Partial<Student> เพื่อรองรับข้อมูลที่ไม่ครบถ้วน
  { rejectValue: string }
>(
  'student/register',
  async (studentData: Partial<Student>, { rejectWithValue }) => {
    try {
      console.log(studentData);
      const response = await registerStudentApi(studentData);

      return response;
    } catch (error) {
      console.error('Error registering student:', error);
      return rejectWithValue('Registration failed. Please try again.'); // เพิ่มข้อความผิดพลาด
    }
  },
);

const initialState: StudentState = {
  studentList: [],
  selectedStudent: null,
  studentFormData: {},
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
        state.status = 'loading';
      })
      .addCase(
        fetchStudentData.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.status = 'succeeded';
          state.studentList = action.payload;
        },
      )
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error occurred';
      })
      .addCase(registerStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studentList.push(action.payload); // เพิ่มข้อมูลที่ได้จาก API
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      });
  },
});

export default studentSlice.reducer;
