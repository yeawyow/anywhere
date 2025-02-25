import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginApi } from '../../api/auth';

interface UserInfo {
  first_name: string;
  last_name: string;
  role: string[];
}

interface AuthState {
  loading: boolean;
  error: boolean;
  isAuthenticated: boolean;
  user_info: UserInfo | null;
}

const initialState: AuthState = {
  loading: false,
  error: false,
  isAuthenticated: false,
  user_info: null,
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
      return rejectWithValue(error.response.data);
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
    setAuth: (
      state,
      action: PayloadAction<{ valid: boolean; user: UserInfo }>,
    ) => {
      state.isAuthenticated = action.payload.valid;
      state.user_info = action.payload.user; // ✅ อัปเดตข้อมูล user
      console.log('verify', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { valid, user_info } = action.payload.message;
        state.loading = false;
        state.isAuthenticated = valid;
        state.user_info = user_info;
        state.error = false;
        sessionStorage.setItem('token', action.payload.message);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        // sessionStorage.clear()
        // localStorage.clear()
      });
  },
});

// Export Selector
export const { setAuth } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
