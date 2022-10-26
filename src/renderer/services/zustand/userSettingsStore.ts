import { AppClinics, UserSettings } from '@models/local.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserSettingsState extends UserSettings {
  resetWelcomeDismissedIn(): void;
}
export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    immer((set) => ({
      welcomeDismissedIn: '',
      language: 'en',
      theme: 'Nighty',
      resetWelcomeDismissedIn() {
        set((state) => {
          state.welcomeDismissedIn = new Date().toISOString();
        });
      },
    })),

    {
      name: 'UserSettingsStore', // unique name

      deserialize(str) {
        const state = JSON.parse(str);
        if (state.state != undefined && state.version != undefined)
          throw new Error('invalid data');
        state.state.clinicData = new AppClinics(state.clinicData);
        return state;
      },
    },
  ),
);
