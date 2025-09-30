import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/profileSlice';
import doctorReducer from '../features/doctor/doctorSlice';


export const store = configureStore({
  reducer: {
    profile:profileReducer,
    doctor :doctorReducer
  },
  devTools: true, // optional; true by default in dev mode
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
