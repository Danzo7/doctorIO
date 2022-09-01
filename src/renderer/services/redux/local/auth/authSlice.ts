import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from './authApi';

const initialState: Partial<{
  accessToken: string | undefined;
  refreshToken: string | undefined;
}> = {};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        console.log('match');
        console.log(payload);
        state.accessToken = payload.access_token;
        state.refreshToken = payload.refresh_token;
      },
    );
    builder.addMatcher(
      authApi.endpoints.connectMember.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.access_token;
        state.refreshToken = payload.refresh_token;
      },
    );
  },
});
export const { setTokens } = authSlice.actions;

export default authSlice;
