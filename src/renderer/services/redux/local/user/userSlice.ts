import { User } from '@models/local.models';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@store';

const initialState: User = {
  userPreferences: {
    language: 'en',
    theme: 'Nighty',
    welcomeDismissedIn: '',
  },
  firstName: '',
  lastName: '',
  clinic: [],
  age: 18,
  gender: 'male',
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
        gender: 'male' | 'female';
        age: string;
        address?: string;
      }>,
    ) => {
      state.userId = nanoid();
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phoneNumber;
      state.age = Number(action.payload.age);
      state.gender = action.payload.gender;
      state.address = action.payload.address;
    },

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
    setCurrentLocation: (state: User, action: PayloadAction<string>) => {
      if (state.selectedClinic != undefined)
        state.clinic[state.selectedClinic].serverLocation =
          action.payload + ':3000';
    },
  },
});
export const {
  setUser,
  resetWelcomeDismissedIn,
  setSelectedServer,
  addNewClinic,
  setCurrentLocation,
} = userSlice.actions;
export const useSelectLocation = () =>
  useAppSelector((state) =>
    state.user.selectedClinic != undefined
      ? state.user.clinic[state.user.selectedClinic]?.serverLocation
      : undefined,
  );
export default userSlice;
