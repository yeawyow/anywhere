import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authslice.tsx';
import studentSlice from '../features/data/studentslice'; // เส้นทางของ student slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentSlice, // 🔥 ชื่อที่ต้องใช้ใน useSelector()
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
