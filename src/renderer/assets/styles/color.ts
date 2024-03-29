import { SETTINGS, useAppSettingsStore } from '@stores/appSettingsStore';
const nighty = {
  cold_red: '#ff4b59',
  background: '#23315e',
  lighter_background: '#2c3964',
  cold_blue: '#01b9ca',
  hot_red: '#f44336',
  good_green: '#0acf83',
  secondary_color: '#344175',
  darkersec_color: '#29336a',
  border_color: '#3c4b7e',
  hot_purple: '#626ED4',
  silver_gray: '#646d8d',
  white: '#fff',
  text_gray: '#bdbdbd',
  good_black: '#18191c',
  warm_orange: '#f2994a',
  darker: ' #00000020',
  light: '#ffffff20',
  coldBlack: '#374151',
};

const drakula = {
  cold_red: '#C5434D',
  background: '#303030',
  lighter_background: '#404040',
  cold_blue: '#439297',
  hot_red: '#C13E34',
  good_green: '#1D7D58',
  secondary_color: '#363636',
  darkersec_color: '#262626',
  border_color: '#ffffff0d',
  hot_purple: '#4D8F87',
  silver_gray: '#5a6a67',
  white: '#ffffff',
  text_gray: '#bdbdbd',
  good_black: '#18191c',
  warm_orange: '#f2994a',
  darker: '#00000020',
  light: '#ffffff20',
};
let staticColors = SETTINGS.theme === 'Nighty' ? nighty : drakula;
useAppSettingsStore.subscribe((state) => {
  staticColors = state.theme === 'Nighty' ? nighty : drakula;
});
const color = {
  cold_red: 'var(--cold-red)',
  background: 'var(--background)',
  lighter_background: 'var(--lighter-background)',
  cold_blue: 'var(--cold-blue)',
  hot_red: 'var(--hot-red)',
  good_green: 'var(--good-green)',
  secondary_color: 'var(--secondary-color)',
  darkersec_color: 'var(--darker-secondary-color)',
  border_color: 'var(--border-color)',
  hot_purple: 'var(--hot-purple)',
  silver_gray: 'var(--silver-gray)',
  white: 'var(--white)',
  text_gray: 'var(--text-gray)',
  good_black: 'var(--good-black)',
  warm_orange: 'var(--warm-orange)',
  darker: 'var(--darker)',
  light: 'var(--light)',
  coldBlack: 'var(--cold-black)',
};
export default color;
export { color, staticColors };
