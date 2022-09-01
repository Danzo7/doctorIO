import { User } from '@models/local.models';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  userPreferences: {
    language: 'en',
    theme: 'Nighty',
    welcomeDismissedIn: '',
  },
  firstName: '',
  lastName: '',
  clinic: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (
      state: User,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
      }>,
    ) => {
      state.userId = nanoid();
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phoneNumber;
    },
    //TODO use another slice for connection status
    setSelectedServer: (
      state: User,
      action: PayloadAction<number | undefined>,
    ) => {
      state.selectedClinic = action.payload;
    },

    resetWelcomeDismissedIn: (state: User) => {
      if (state.userPreferences)
        state.userPreferences.welcomeDismissedIn = new Date().toISOString();
    },
    addNewClinic: (
      state: User,
      action: PayloadAction<{ serverLocation: string; memberId: number }>,
    ) => {
      state.clinic.push({
        name: 'Clinic' + (Math.random() * 100).toString(),
        serverLocation: action.payload.serverLocation,
        clinicId: Math.random() * 100,
        memberId: action.payload.memberId,
      });

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
