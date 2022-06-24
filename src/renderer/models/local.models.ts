interface AppLocalPreferences {
  language: 'en';
  theme: 'Nighty';
  welcomeDismissedIn?: Date;
}
interface User {
  userId: number; //"machineId"
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  privateKey: string;
  publicKey: string;
  clinic: LocalClinicData[];
  selectedClinic?: LocalClinicData;
  userPreferences: AppLocalPreferences;
}
interface MedicalSessionLocal {
  sessionId: number;
  patientId: number;
  memberId: number;
  notice: string;
  prescription: Prescription;
}
interface Prescription {
  id: number;
  drugs: Drug[];
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
  userId: number; //"contactId"
  dmAvatar: string;
  messages: Message[];
}
interface Message {
  text: string;
  date: Date;
  seen: boolean;
}
interface LocalClinicData {
  clinicId: number;
  name: string;
  serverLocation: string;
  accessKey: string;
  memberId: number;
}

export type {
  DirectMessage,
  Message,
  User,
  LocalClinicData,
  AppLocalPreferences,
  MedicalSessionLocal,
};
