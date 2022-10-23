interface AppPreferences {
  language: 'en';
  theme: 'Nighty';
  welcomeDismissedIn: string;
}
interface User {
  userId?: string; //"machineId"
  email?: string;
  firstName?: string;
  lastName?: string;
  gender: 'male' | 'female';
  age: number;
  address?: string;
  phone?: string;
  avatar?: string;
  privateKey?: string;
  publicKey?: string;

  clinic: LocalClinicData[];
  selectedClinic?: number;
  appPreferences: AppPreferences;
}
interface AppData {
  user: AppUser;
  clinicData: AppClinics;
  appPreferences: AppPreferences;
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
    return this.selected ? this.clinics?.[this.selected] : undefined;
  }

  set select(index: number) {
    if (index >= 0 && index < this.clinics.length) this.selected = index;
    else throw new Error('out of bound');
  }

  set location(ip: string) {
    if (this.clinic) this.clinic.serverLocation = ip;
  }

  set add(clinic: LocalClinicData) {
    this.clinics.push(clinic);
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
  User,
  LocalClinicData,
  AppPreferences,
  MedicalSessionLocal,
  AppData,
};
