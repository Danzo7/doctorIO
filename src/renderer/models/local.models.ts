interface AppLocalPreferences {
  language: 'en';
  theme: 'Nighty';
  welcomeDismissedIn: string;
}
interface User {
  userId: number; //"machineId"
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  privateKey: string;
  publicKey: string;
  clinic: LocalClinicData[];
  selectedClinic?: number;
  userPreferences: AppLocalPreferences;
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
  userId: number; //"contactId"
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
interface LocalClinicData {
  clinicId: number;
  name: string;
  serverLocation: string;
  memberId: number;
  memberCount?: number;
  patientCount?: number;
}

export type {
  DirectMessage,
  Message,
  User,
  LocalClinicData,
  AppLocalPreferences,
  MedicalSessionLocal,
};
