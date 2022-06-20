interface User {
  userId: string;
  machineId: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneN: string;
  avatar: string;
  privateKey: string;
  publicKey: string;
  clinic: ClinicLocal[];
}

interface DirectMessage {
  dmId: string;
  userId: string;
  messages: Message[];
}
interface Message {
  text: string;
  date: Date;
  userId: string;
  dmId: string;
}
interface ClinicLocal {
  clinicId: string;
  description: string;
  serverLocation: string;
}

export type { DirectMessage, Message, User };
