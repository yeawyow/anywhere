import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { loginApi, logoutApi } from '../../api/auth';

interface UserInfo {
  first_name_thai: string;
  last_name_thai: string;
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
  try {
    const response = await logoutApi();
    return response.data;
  } catch (error: any) {
    return isRejectedWithValue(error.response.data);
  }
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

      // ✅ Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user_info = null;
        sessionStorage.clear();
        localStorage.clear();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// Export Selector
export const { setAuth } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
