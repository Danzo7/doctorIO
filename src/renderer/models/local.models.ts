import {
  LANG,
  DATE_FORMAT,
  DAY_FORMAT,
  THEME,
  TIME_FORMAT,
} from '@constants/app_settings';

interface AppSettings {
  language: typeof LANG[number];
  theme: typeof THEME[number];
  dateFormat: typeof DATE_FORMAT[number];
  timeFormat: typeof TIME_FORMAT[number];
  dayFormat: typeof DAY_FORMAT[number];
  welcomeDismissedIn: string;
}

interface AppData {
  user: AppUser;
  clinicData: AppClinics;
  appPreferences: AppSettings;
}
export interface AppUser {
  userId?: string; //"machineId"
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: 'male' | 'female';
  age?: number;
  address?: string;
  phone?: string;
  avatar?: string;
  privateKey?: string;
  publicKey?: string;
}
export class AppClinics {
  clinics: LocalClinicData[] = [];

  selected?: number;

  constructor(obj?: AppClinics) {
    this.clinics = obj?.clinics || [];
    this.selected = obj?.selected;
  }

  get clinic() {
    if (
      this.selected != undefined &&
      this.selected >= 0 &&
      this.selected < this.clinics.length
    )
      return this.clinics[this.selected];
    else throw new Error('No clinic selected');
  }

  setSelected(index?: number) {
    if (index == undefined) this.selected = undefined;
    else if (index >= 0 && index < this.clinics.length) this.selected = index;
    else throw new Error('out of bound');
  }

  setCurrentLocation(ip: string) {
    if (this.clinic) this.clinic.serverLocation = ip;
  }

  set add(clinic: LocalClinicData) {
    this.clinics.push(clinic);
    this.selected = this.clinics.length - 1;
  }
}
interface LocalClinicData {
  name: string;
  serverLocation: string;
  memberId: number;
  avatar?: string;
}
interface MedicalSessionLocal {
  sessionId: number;
  patientId: number;
  memberId: number;
  notice: string;
  prescription: Drug[];
}

interface Drug {
  id: number;
  name: string;
  description: string;
  dosage: string;
  duration: string;
  endDate: Date;
}
interface DirectMessage {
  dmId: number;
  userId: string; //"contactId"
  dmAvatar?: string;
  dmName: string; //contactName,update after get contact
  messages: Message[];
}
interface Message {
  text: string;
  date: Date;
  seen?: boolean;
  sent?: true;
}

export type {
  DirectMessage,
  Message,
  LocalClinicData,
  AppSettings,
  MedicalSessionLocal,
  AppData,
};
