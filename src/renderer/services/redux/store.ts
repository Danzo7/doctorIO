import {
  AnyAction,
  combineReducers,
  configureStore,
  Middleware,
} from '@reduxjs/toolkit';
import AppointmentQueueApi from './instance/appointmentQueue/AppointmentQueueApi';
import patientApi from './instance/record/patient_api';
import sessionSlice from './local/session/sessionSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './local/user/userSlice';
import medicalDocumentApi from './instance/record/medical_document_api';
import medicalHistoryApi from './instance/record/medical_history_api';
import appointmentApi from './instance/Appointment/AppointmentApi';
import { rtkQueryErrorLogger } from './middlewares/error.middleware';
import { firstUser } from '@api/fake';
import settingsSlice from './local/settings/settingsSlice';
import connectionStateSlice from './local/connectionStateSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [...Object.keys(firstUser)],
};

const persistedUser = persistReducer(persistConfig, userSlice.reducer);
const appReducer = combineReducers({
  [settingsSlice.name]: settingsSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [connectionStateSlice.name]: connectionStateSlice.reducer,
  [userSlice.name]: persistedUser,
  [AppointmentQueueApi.reducerPath]: AppointmentQueueApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [medicalDocumentApi.reducerPath]: medicalDocumentApi.reducer,
  [medicalHistoryApi.reducerPath]: medicalHistoryApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
  /* your app’s top-level reducers */
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'RESET' && state) {
    const myState = Object.fromEntries(
      Object.entries(state).map(([key, value]) => [
        key,
        key == 'user' ? value : undefined,
      ]),
    ) as ReturnType<typeof appReducer>;

    return appReducer(myState, { type: undefined });
  }
  return appReducer(state, action);
};
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware): Middleware[] =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      AppointmentQueueApi.middleware,
      patientApi.middleware,
      medicalDocumentApi.middleware,
      medicalHistoryApi.middleware,
      appointmentApi.middleware,
      rtkQueryErrorLogger,
    ),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
