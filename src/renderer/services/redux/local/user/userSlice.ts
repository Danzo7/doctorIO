import { firstUser } from '@api/fake';
import { User } from '@models/local.models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Partial<User> = {
  username: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (
      state: Partial<User>,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
      }>,
    ) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phoneNumber;
      state.password = firstUser.password;
      state.avatar = firstUser.avatar;
      state.userId = firstUser.userId;
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
