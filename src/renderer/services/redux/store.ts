import { configureStore, Middleware } from '@reduxjs/toolkit';
import { api as AppointmentQueueApi } from './instance/appointmentQueue/AppointmentQueueApi';
import appointmentQueueSlice from './instance/appointmentQueue/appointmentQueueSlice';
import bookedAppointmentSlice from './instance/bookedAppointmentSlice';
import { api as recordApi } from './instance/record/recordApi';
import sessionSlice from './local/sessionSlice';
//import userSlice from './local/userSlice';
export const store = configureStore({
  reducer: {
    appointmentQueue: appointmentQueueSlice,
    bookedAppointment: bookedAppointmentSlice,
    session: sessionSlice,
    [AppointmentQueueApi.reducerPath]: AppointmentQueueApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
    //  counter: userSlice,
  },
  middleware: (getDefaultMiddleware): Middleware[] =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      AppointmentQueueApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
