import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
 import { loginApi } from "../../api/auth";
// import axios from 'axios';
// import { API_URL } from "../../config/constants";


// ประเภทของข้อมูลผู้ใช้

interface User {
  pname: string;
  fname: string;
  lname: string;
  tell: string;
  email: string;
}
interface AuthState {
  user: User, 
  loading: boolean;
  error: string | null;
  isAuthenticated:boolean;
  
}

// ค่าตั้งต้นของ State
const initialState: AuthState = {
  user: {  // เปลี่ยนจากอาเรย์ ([{}]) เป็นอ็อบเจ็กต์
    pname: "",
    fname: "",
    lname: "",
    tell: "",
    email: "",
  },
  loading: false,
  error: null,
  isAuthenticated: false
};


// // ฟังก์ชัน Login (ใช้ async thunk)
export const loginUser = createAsyncThunk("auth/login", async (credentials: { username: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials.username, credentials.password);
    return  response; // ส่งกลับเป็น object ที่มีทั้ง token และ user
  } catch (error: any) {
    return rejectWithValue(error.response || "Login failed");
  }
});
// Async thunk สำหรับ login
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (
//     credentials: { username: string; password: string },
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

  },setUser:(state,action)=>{
    console.log("9999",action.payload.data.user_info)
    state.user = action.payload; 
  }},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Full Payload:", action.payload); // ✅ ตรวจสอบ payload ก่อน
  const data = action.payload?.data; // ✅ ป้องกัน undefined
  // console.log("Extracted Data:", data);

  if (data) {
    state.loading = false;
    state.isAuthenticated = true;
    sessionStorage.setItem("token", data.message || "ไม่มี token");
    
  } else {
    state.error = "ข้อมูลที่ได้รับไม่ถูกต้อง";
  }
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
export const { setAuth,setUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
