import { Clinic, ClinicTiming } from '@models/server.models';
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
        name: string;
        description: string;
        address: string;
        phone: string;
      }>,
    ) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
    },
    changeLogo: (state: Clinic, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    updateTimingAndSchedule: (
      state: Clinic,
      action: PayloadAction<Partial<ClinicTiming>>,
    ) => {
      state.timing = { ...state.timing, ...action.payload };
    },
  },
});
export const { setOverviewInfo, changeLogo, updateTimingAndSchedule } =
  settingsSlice.actions;

export default settingsSlice;
