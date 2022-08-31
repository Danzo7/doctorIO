import { firstUser } from '@api/fake';
import { User } from '@models/local.models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Partial<User> = {};

const userSlice = createSlice({
  name: 'user',
  initialState: { username: undefined, clinic: [] } as any as User,
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
    //TODO use another slice for connection status
    setSelectedServer: (
      state: Partial<User>,
      action: PayloadAction<number | undefined>,
    ) => {
      state.selectedClinic = action.payload;
    },

    resetWelcomeDismissedIn: (state: Partial<User>) => {
      if (state.userPreferences)
        state.userPreferences.welcomeDismissedIn = new Date().toISOString();
    },
    addNewClinic: (
      state: User,
      action: PayloadAction<{ serverLocation: string; memberId: number }>,
    ) => {
      state.clinic?.push({
        name: 'Clinic' + (Math.random() * 100).toString(),
        serverLocation: action.payload.serverLocation,
        clinicId: Math.random() * 100,
        memberId: action.payload.memberId,
      });
      if (state.clinic)
        state.selectedClinic = state.clinic.findIndex(
          (cli) => cli == state.clinic[state.clinic.length - 1],
        );
    },
  },
});
export const {
  setUser,
  resetWelcomeDismissedIn,
  setSelectedServer,
  addNewClinic,
} = userSlice.actions;

export default userSlice;
