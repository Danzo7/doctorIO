import { firstUser } from '@api/fake';
import { User } from '@models/local.models';
import { createSlice } from '@reduxjs/toolkit';

interface UserType {
  user: User | undefined;
}

const initialState: UserType = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: UserType) => {
      state.user = firstUser;
    },
    resetWelcomeDismissedIn: (state: UserType) => {
      if (state.user) {
        state.user.userPreferences = {
          ...state.user.userPreferences,
          welcomeDismissedIn: new Date().toISOString(),
        };
      }
    },
  },
});
export const { setUser, resetWelcomeDismissedIn } = userSlice.actions;

export default userSlice;
