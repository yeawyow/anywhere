import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginApi } from '../../api/auth';
// import axios from 'axios';
// import { API_URL } from "../../config/constants";

// ประเภทของข้อมูลผู้ใช้

interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// ค่าตั้งต้นของ State
const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: false,
};

// // ฟังก์ชัน Login (ใช้ async thunk)
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await loginApi(
        credentials.username,
        credentials.password,
      );
      return response.data; // ส่งกลับเป็น object ที่มีทั้ง token และ user
    } catch (error: any) {
      return rejectWithValue(error.response || 'Login failed');
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  return null;
});

// สร้าง Slice สำหรับ Auth
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (
      state,
      action: PayloadAction<{
        message: { valid: boolean };
      }>,
    ) => {
      state.isAuthenticated = action.payload.message.valid;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log('Full Payload:', action.payload); // ✅ ตรวจสอบ payload ก่อน

        state.loading = false;
        state.isAuthenticated = true;
        sessionStorage.setItem('token', action.payload.message);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // state.loading=false;
        // sessionStorage.clear()
        // localStorage.clear()
      });
  },
});

// Export Selector
export const { setAuth, setUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
