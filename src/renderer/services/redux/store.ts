import {
  AnyAction,
  combineReducers,
  configureStore,
  Middleware,
} from '@reduxjs/toolkit';
import AppointmentQueueApi from './instance/appointmentQueue/AppointmentQueueApi';
import patientApi from './instance/record/patient_api';
import sessionSlice from './local/session/sessionSlice';
import medicalDocumentApi from './instance/record/medical_document_api';
import medicalHistoryApi from './instance/record/medical_history_api';
import appointmentApi from './instance/Appointment/AppointmentApi';
import { rtkQueryErrorLogger } from './middlewares/error.middleware';
import authApi from './local/auth/authApi';
import invitationApi from './clinic/invitation/invitationApi';
import memberApi from './clinic/rbac/member/memberApi';
import roleApi from './clinic/rbac/role/roleApi';
import clinicApi from './clinic/clinicApi';

const appReducer = combineReducers({
  [clinicApi.reducerPath]: clinicApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [memberApi.reducerPath]: memberApi.reducer,
  [invitationApi.reducerPath]: invitationApi.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [AppointmentQueueApi.reducerPath]: AppointmentQueueApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [medicalDocumentApi.reducerPath]: medicalDocumentApi.reducer,
  [medicalHistoryApi.reducerPath]: medicalHistoryApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'RESET' && state) {
    const myState = Object.fromEntries(
      Object.entries(state).map(([key, value]) => [key, value]),
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
      rtkQueryErrorLogger,
      AppointmentQueueApi.middleware,
      patientApi.middleware,
      medicalDocumentApi.middleware,
      medicalHistoryApi.middleware,
      appointmentApi.middleware,
      authApi.middleware,
      invitationApi.middleware,
      memberApi.middleware,
      roleApi.middleware,
      clinicApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
