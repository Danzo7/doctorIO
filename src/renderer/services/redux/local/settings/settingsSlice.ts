import { Clinic } from '@models/server.models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clinic } from '@api/fake';
const initialState: Clinic = clinic;

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setOverviewInfo: (
      state: Clinic,
      action: PayloadAction<{
        clinicName: string;
        description: string;
        clinicAddress: string;
        phoneNumber: string;
      }>,
    ) => {
      state.clinicName = action.payload.clinicName;
      state.description = action.payload.description;
      state.clinicAddress = action.payload.clinicAddress;
      state.phoneNumber = action.payload.phoneNumber;
    },
    changeLogo: (state: Clinic, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});
export const { setOverviewInfo, changeLogo } = settingsSlice.actions;

export default settingsSlice;
