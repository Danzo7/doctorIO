import { RoleBrief } from '@models/server.models';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  addedRole: RoleBrief[];
} = {
  addedRole: [],
};

const smallRoleInvSlice = createSlice({
  name: 'smallRoleInvSlice',
  initialState: initialState,
  reducers: {
    clearAddedRoles: (state) => {
      state.addedRole = [];
    },
    addRole: (state, action: PayloadAction<RoleBrief>) => {
      const find = state.addedRole.filter(
        (role) => role.id == action.payload.id,
      );
      if (!(find && find.length > 0)) state.addedRole.push(action.payload);
    },
    deleteRole: (state, action: PayloadAction<RoleBrief>) => {
      state.addedRole = state.addedRole.filter(
        (role) => role.id != action.payload.id,
      );
    },
  },
});

export const { clearAddedRoles, addRole, deleteRole } =
  smallRoleInvSlice.actions;
export default smallRoleInvSlice;
