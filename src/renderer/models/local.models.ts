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
}

export type {
  DirectMessage,
  Message,
  User,
  LocalClinicData,
  AppLocalPreferences,
};
