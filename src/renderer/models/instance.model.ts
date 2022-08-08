interface BookedAppointment {
  bookDate: Date;
  patientId: number;
  patientName: string;
  bookedBy?: { memberId: number; memberName: string };
  state: 'IN_QUEUE' | 'PANDING';
}

interface AppointmentQueue {
  isOwner: boolean;
  state: 'PAUSED' | 'IDLE' | 'IN_PROGRESS' | 'WAITING';
  selected?: AppointmentQueueItem;
  appointments: AppointmentQueueItem[];
}
interface AppointmentQueueItem {
  patientId: number;
  patientName: string;
  date: Date;
  position: number;
  test?: Test;
}
interface Patient {
  patId: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  registerDate: Date;
  gender: 'male' | 'female';
  age: number;
  test: Test;
  medicalDocuments: MedicalDocument[];
  medicalHistory: MedicalHistory[];
  appointments: Appointment[];
  nextAppointment?: Date;
  status: 'active' | 'off';
  specification?: PatientSpecification;
}
interface PatientSpecification {
  weight: number;
  height: number;
  bloodType: 'A' | 'B' | 'AB' | 'O';
  allergies: string;
  diseases: string;
  medications: string;
  surgeries: string;
  other: string;
}
interface Session {
  sessionId: number;
  patientId: number;
  memberId: number;
  date: Date;
  notice: string;
  prescription: Prescription;
}

type Appointment = {
  id: number;
  patId?: number; //foreign
  member: { memberId: number; memberName: string };
  assignedBy: { memberId: number; memberName: string };
} & (
  | ({ state: 'done' } & {
      date: Date;
      sessionId: number;
      subject: string;
    })
  | ({ state: 'done-booked' } & {
      date: Date;
      bookDate: Date;
      sessionId: number;
      subject: string;
    })
  | ({ state: 'missed' | 'upcoming' } & { bookDate?: Date })
);

interface MedicalDocument {
  fileId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  date: Date;
}
interface Prescription {
  id: number;
  drugs: Drug[];
}
interface Drug {
  id: number;
  name: string;
  qts: number;
  description: string;
  dosage: number;
  duration: number;
}
interface MedicalHistory {
  id: number;
  description: string;
  date: Date;
}
interface Test {
  weight: number;
  height: number;
  bloodType: 'A' | 'B' | 'AB' | 'O';
  Rh: boolean;
  bloodPressure: number;
}
export type {
  Appointment,
  BookedAppointment,
  Patient,
  AppointmentQueueItem,
  AppointmentQueue,
  Session,
  MedicalDocument,
  MedicalHistory,
  Test,
  Drug,
  Prescription,
};
