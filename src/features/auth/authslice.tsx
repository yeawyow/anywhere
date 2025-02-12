import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
 import { loginApi } from "../../api/auth";
// import axios from 'axios';
// import { API_URL } from "../../config/constants";


// ประเภทของข้อมูลผู้ใช้

interface AuthState {
  //token: string;
  loading: boolean;
  error: string | null;
  isAuthenticated:boolean;
  
}

// ค่าตั้งต้นของ State
const initialState: AuthState = {
 // token: '',
  loading: false,
  error: null,
  isAuthenticated:false
};

// // ฟังก์ชัน Login (ใช้ async thunk)
export const loginUser = createAsyncThunk("auth/login", async (credentials: { user_national_id: string; password: string }, { rejectWithValue }) => {
  try {
    const data = await loginApi(credentials.user_national_id, credentials.password);
    
    console.log("tokennenee",data)
    
    return data.token;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});
// Async thunk สำหรับ login
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (
//     credentials: { user_national_id: string; password: string },
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/api/auth/login`,
//         credentials,
//       );
//       return response.data; 
//     } catch (error: any) {
//       return rejectWithValue(error.response.data.message || 'Login failed');
//     }
//   },
// );
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token"); // ลบ Token
  return null;
});

// สร้าง Slice สำหรับ Auth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {setAuth: (state, action: PayloadAction<boolean>) => {
    state.isAuthenticated = action.payload;
  }},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
       // state.token = action.payload;
        state.isAuthenticated=true;
        localStorage.setItem('token',action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
       // state.token = '';
      });
  },
});

// Export Selector
export const { setAuth } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
