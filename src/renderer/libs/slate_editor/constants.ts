import { color } from '@assets/styles/color';

export const DEFAULT_AUTO_REF = [
  {
    group: { name: 'Clinic', color: color.hot_purple },
    items: ['Name', 'Address'],
  },
  {
    group: { name: 'Patient', color: color.cold_blue },
    items: ['First name', 'Last name', 'Age', 'Birth date', 'Full name', 'id'],
  },
  {
    group: { name: 'Doctor', color: color.warm_orange },
    items: ['name', 'id'],
  },
  {
    group: { name: 'Appointment', color: color.cold_red },
    items: ['Date', 'id'],
  },
];
