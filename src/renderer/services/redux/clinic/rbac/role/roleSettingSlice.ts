import { PermKeys } from '@models/server.models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import roleApi from './roleApi';

const initialState: Partial<{
  isDirty: boolean;
  name?: string;
  description?: string;
  permissions: PermKeys[];
}> = { isDirty: false, permissions: [] };

const roleSettingSlice = createSlice({
  name: 'roleSettingSlice',
  initialState: initialState,
  reducers: {
    setRoleSettings: (
      state,
      { payload }: PayloadAction<typeof initialState>,
    ) => {
      if (payload.name != undefined) state.name = payload.name;
      if (payload.description != undefined)
        state.description = payload.description;
      if (payload.permissions != undefined)
        state.permissions = payload.permissions;
      state.isDirty = payload.isDirty;
      console.log('state dirty : ', state.isDirty);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      roleApi.endpoints.getRoleById.matchFulfilled,
      (state, { payload }) => {
        console.log('mathcer');

        state.name = payload.name;

        state.description = payload.description;

        state.permissions = payload.permissions;
        state.isDirty = false;
      },
    );
  },
});
export const { setRoleSettings } = roleSettingSlice.actions;

export default roleSettingSlice;
