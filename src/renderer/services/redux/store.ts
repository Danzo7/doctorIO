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
import { template } from '@api/fake';
import settingsSlice from './local/settings/settingsSlice';
import connectionStateSlice from './local/connectionStateSlice';
import authSlice from './local/auth/authSlice';
import authApi from './local/auth/authApi';
import invitationApi from './clinic/invitation/invitationApi';
import memberApi from './clinic/rbac/member/memberApi';
import roleApi from './clinic/rbac/role/roleApi';
import roleSettingSlice from './clinic/rbac/role/roleSettingSlice';
import smallRoleInvSlice from './local/small_role_invSlice';

const persistUserConfig = {
  key: 'user',
  storage,
  //  whitelist: [...Object.keys(template)],
};
const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['refreshToken', 'accessToken'],
};

const persistedUser = persistReducer(persistUserConfig, userSlice.reducer);
const persistedAuth = persistReducer(persistAuthConfig, authSlice.reducer);

const appReducer = combineReducers({
  [smallRoleInvSlice.name]: smallRoleInvSlice.reducer,
  [roleSettingSlice.name]: roleSettingSlice.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [memberApi.reducerPath]: memberApi.reducer,
  [invitationApi.reducerPath]: invitationApi.reducer,
  [authSlice.name]: persistedAuth,
  [settingsSlice.name]: settingsSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [connectionStateSlice.name]: connectionStateSlice.reducer,
  [userSlice.name]: persistedUser,
  [authApi.reducerPath]: authApi.reducer,
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
        key == 'user' || key == 'authSlice' || key == authApi.reducerPath
          ? value
          : undefined,
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
    ),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
