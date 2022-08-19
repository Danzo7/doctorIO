import { configureStore, Middleware } from '@reduxjs/toolkit';
import AppointmentQueueApi from './instance/appointmentQueue/AppointmentQueueApi';
import bookedAppointmentSlice from './instance/bookedAppointmentSlice';
import patientApi from './instance/record/patient_api';
import sessionSlice from './local/sessionSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './local/user/userSlice';
import medicalDocumentApi from './instance/record/medical_document_api';
import medicalHistoryApi from './instance/record/medical_history_api';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [userSlice.name],
};

const persistedUser = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    bookedAppointment: bookedAppointmentSlice,
    [sessionSlice.name]: sessionSlice.reducer,
    [userSlice.name]: persistedUser,
    [AppointmentQueueApi.reducerPath]: AppointmentQueueApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [medicalDocumentApi.reducerPath]: medicalDocumentApi.reducer,
    [medicalHistoryApi.reducerPath]: medicalHistoryApi.reducer,
  },
  middleware: (getDefaultMiddleware): Middleware[] =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      AppointmentQueueApi.middleware,
      patientApi.middleware,
      medicalDocumentApi.middleware,
      medicalHistoryApi.middleware,
    ),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
