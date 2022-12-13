import { Member } from './server.models';

interface BookedAppointment {
  id: number;
  bookedFor: Date;
  patientId: number;
  patientName: string;
  bookedBy: { memberId: number; memberName: string };
  state: 'IN_QUEUE' | 'PANDING';
}
type AppointmentQueue = {
  isOwner: boolean;
  appointments: AppointmentQueueItem[];
} & QueueState;
interface QueueState {
  state: 'PAUSED' | 'IDLE' | 'IN_PROGRESS' | 'WAITING' | 'EMPTY';
  selected?: AppointmentQueueItem;
}
interface AppointmentQueueItem {
  patientId: number;
  patientName: string;
  date: Date;
  position: number;
  test?: BiometricScreening;
  appointmentId: number;
}
export interface BloodType {
  group: 'A' | 'B' | 'AB' | 'O';
  rh: boolean;
}
interface Patient {
  firstName: string;
  lastName: string;
  birthDate: Date;
  registerDate: Date;
  gender: 'male' | 'female';
  age: number;
  test?: BiometricScreening;
  nextAppointment?: Date;
  status: boolean;
  bloodType?: BloodType;
}
interface PatientBrief {
  id: number;
  name: string;
}

interface Session {
  prescription?: Drug[];
  diagnosis?: string;
  //here we can add more types for a session(example a file or scanner)
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface Appointment_v2 {
  assignedBy: Pick<Member, 'id' | 'avatar' | 'name'>;
  member?: Pick<Member, 'id' | 'avatar' | 'name'>;
  subject: string;
  bookedFor?: Date;
  queue?: { id: number; name: string };
  bookedIn: Date;
  date?: Date;
  session?: Session;
  diagnosis?: string; //TODO remove this field
  state: {
    phase: 'done' | 'missed' | 'upcoming' | 'opened' | 'canceled' | 'in queue';
    isBooked: boolean;
  };
}
export type AppointmentBrief = Pick<
  Appointment_v2,
  'assignedBy' | 'state' | 'subject' | 'bookedFor' | 'date'
> & { id: number };
interface MedicalDocument {
  id: string;
  fileName: string;
  fileType: string;
  status: 'NORMAL' | 'LOST' | 'CORRUPTED';
  date: Date;
}
interface Drug {
  id: string;
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
interface BiometricScreening {
  weight: number;
  height: number;
  bloodPressure: number; // [key: string]: any;
}

export type {
  BookedAppointment,
  Patient,
  PatientBrief,
  AppointmentQueueItem,
  AppointmentQueue,
  Session,
  MedicalDocument,
  MedicalHistory,
  BiometricScreening,
  Drug,
  QueueState,
  Appointment_v2 as Appointment,
};
