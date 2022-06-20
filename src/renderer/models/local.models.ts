interface AppLocalPreferences {
  language: string;
  theme: string;
  welcomeDismissed: Date;
}
interface User {
  userId: number; //"machineId"
  machineId: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneN: string;
  avatar: string;
  privateKey: string;
  publicKey: string;
  clinic: LocalClinicData[];
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

export type { DirectMessage, Message, User, LocalClinicData };
