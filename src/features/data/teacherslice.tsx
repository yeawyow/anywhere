import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getTeachers, registerTecherApi } from '../../api/tregist';

interface Teacher {
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

interface TeacherState {
  teachersList: Teacher[];
  selectedStudent: Teacher | null;
  studentFormData: Partial<Teacher>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchTeacherData = createAsyncThunk<Teacher[], void>(
  'teacher/fetchTeacherData',
  async () => {
    const data = await getTeachers();
    return data.message;
  },
);

// สร้าง AsyncThunk สำหรับการลงทะเบียนนักเรียน
export const registerTeacher = createAsyncThunk<
  Teacher,
  Partial<Teacher>, // เปลี่ยนเป็น Partial<Student> เพื่อรองรับข้อมูลที่ไม่ครบถ้วน
  { rejectValue: string }
>(
  'teacher/register',
  async (teacherData: Partial<Teacher>, { rejectWithValue }) => {
    try {
      console.log(teacherData);
      const response = await registerTecherApi(teacherData);

      return response;
    } catch (error) {
      console.error('Error registering student:', error);
      return rejectWithValue('Registration failed. Please try again.'); // เพิ่มข้อความผิดพลาด
    }
  },
);

const initialState: TeacherState = {
  teachersList: [],
  selectedStudent: null,
  studentFormData: {},
  status: 'idle',
  error: null,
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchTeacherData.fulfilled,
        (state, action: PayloadAction<Teacher[]>) => {
          state.status = 'succeeded';
          state.teachersList = action.payload;
        },
      )
      .addCase(fetchTeacherData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error occurred';
      })
      .addCase(registerTeacher.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teachersList.push(action.payload); // เพิ่มข้อมูลที่ได้จาก API
      })
      .addCase(registerTeacher.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      });
  },
});

export default teacherSlice.reducer;
