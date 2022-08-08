import { configureStore } from '@reduxjs/toolkit';
import appointmentQueueSlice from './instance/appointmentQueue/appointmentQueueSlice';
import bookedAppointmentSlice from './instance/bookedAppointmentSlice';
//import userSlice from './local/userSlice';
export const store = configureStore({
  reducer: {
    appointmentQueue: appointmentQueueSlice,
    bookedAppointment: bookedAppointmentSlice,
    //  counter: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
