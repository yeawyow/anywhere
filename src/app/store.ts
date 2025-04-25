import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authslice.tsx';
import studentReducer from '../features/data/studentslice'; // เส้นทางของ student slice
import teacherReducer from '../features/data/teacherslice.tsx';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    teacher: teacherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
