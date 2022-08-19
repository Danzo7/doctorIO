import { firstUser } from '@api/fake';
import { User } from '@models/local.models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserType {
  user: User | undefined;
}

const initialState: UserType = {
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: UserType) => {
      state.user = firstUser;
    },
  },
});
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
