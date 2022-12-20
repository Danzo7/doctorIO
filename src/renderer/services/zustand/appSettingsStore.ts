import {
  DATE_FORMAT,
  DAY_FORMAT,
  LANG,
  THEME,
  TIME_FORMAT,
} from '@constants/app_settings';
import { AppSettings } from '@models/local.models';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface AppSettingsState extends AppSettings {
  resetWelcomeDismissedIn(): void;
  setDateFormat(format: typeof DATE_FORMAT[number]): void;
  setTimeFormat(format: typeof TIME_FORMAT[number]): void;
  setDayFormat(format: typeof DAY_FORMAT[number]): void;
  setLanguage(language: typeof LANG[number]): void;
  set: (state: Partial<AppSettingsState>) => void;
  setTheme(theme: typeof THEME[number]): void;
}
export const useAppSettingsStore = create<AppSettingsState>()(
  persist(
    (set) => ({
      welcomeDismissedIn: '',
      language: 'English',
      theme: 'Nighty',
      dateFormat: 'dd MMM yyyy',
      timeFormat: 'h:mm aa',
      dayFormat: 'EEEE, dd MMM',
      vitalFields: [
        { name: 'weight', unit: 'kg', display: true },
        { name: 'height', unit: 'cm', display: true },
        { name: 'bloodPressure', unit: 'mmHg', display: true },
        { name: 'bloodSugar', unit: 'mg/dL', display: true },
        { name: 'temperature', unit: '°C' },
        { name: 'heartRate', unit: 'bpm' },
        { name: 'respiratoryRate', unit: 'bpm' },
        { name: 'oxygenSaturation', unit: '%' },
        { name: 'pain', unit: 'out of 10' },
      ],
      setDateFormat(dateFormat) {
        set({ dateFormat });
      },
      setTimeFormat(timeFormat) {
        set({ timeFormat });
      },
      setDayFormat(dayFormat) {
        set({ dayFormat });
      },
      setLanguage(language) {
        set({ language });
      },
      setTheme(theme) {
        set({ theme });
      },
      set: (state) => {
        set(state);
      },

      resetWelcomeDismissedIn() {
        set({ welcomeDismissedIn: new Date().toISOString() });
      },
    }),

    {
      name: 'AppSettingsStore', // unique name
    },
  ),
);
export let SETTINGS = {
  dateFormat: useAppSettingsStore.getState().dateFormat,
  timeFormat: useAppSettingsStore.getState().timeFormat,
  dayFormat: useAppSettingsStore.getState().dayFormat,
  language: useAppSettingsStore.getState().language,
  theme: useAppSettingsStore.getState().theme,
};
useAppSettingsStore.subscribe((state) => {
  SETTINGS = state;
});
