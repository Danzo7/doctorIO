import { configureStore, Middleware } from '@reduxjs/toolkit';
import { api as AppointmentQueueApi } from './instance/appointmentQueue/AppointmentQueueApi';
import bookedAppointmentSlice from './instance/bookedAppointmentSlice';
import { api as recordApi } from './instance/record/recordApi';
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

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [AppointmentQueueApi.reducerPath, recordApi.reducerPath],
};

const persistedUser = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    bookedAppointment: bookedAppointmentSlice,
    session: sessionSlice,
    user: persistedUser,
    [AppointmentQueueApi.reducerPath]: AppointmentQueueApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
  },
  middleware: (getDefaultMiddleware): Middleware[] =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(AppointmentQueueApi.middleware, recordApi.middleware),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
