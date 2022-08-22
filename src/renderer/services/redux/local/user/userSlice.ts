import { firstUser } from '@api/fake';
import { User } from '@models/local.models';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Partial<User> = {
  username: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: Partial<User>) => {
      state.email = firstUser.email;
      state.password = firstUser.password;
      state.avatar = firstUser.avatar;
      state.firstName = firstUser.firstName;
      state.lastName = firstUser.lastName;
      state.phoneNumber = firstUser.phoneNumber;
      state.userId = firstUser.userId;
      state.username = firstUser.username;
      state.privateKey = firstUser.privateKey;
      state.publicKey = firstUser.publicKey;
      state.clinic = firstUser.clinic;
      state.selectedClinic = firstUser.selectedClinic;
      state.userPreferences = firstUser.userPreferences;
    },
    resetWelcomeDismissedIn: (state: Partial<User>) => {
      if (state.userPreferences)
        state.userPreferences.welcomeDismissedIn = new Date().toISOString();
    },
  },
});
export const { setUser, resetWelcomeDismissedIn } = userSlice.actions;

export default userSlice;
