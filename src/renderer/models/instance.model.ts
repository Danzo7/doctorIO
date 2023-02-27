import { CustomElement } from '@libs/slate_editor/slate.types';
import { Member } from './server.models';
import { Descendant } from 'slate';

interface BookedAppointment {
  id: number;
  bookedFor: Date;
  patientId: number;
  patientName: string;
  member: Pick<Member, 'id' | 'avatar' | 'name'>;
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
export interface MedicalCertificate {
  id: string;
  title: string;
  description: Descendant[];
}
interface Patient {
  firstName: string;
  lastName: string;
  fullName: string;
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
  diagnosis?: string; //Todo remove this
  certificates?: MedicalCertificate[];
  //here we can add more types for a session(example a file or scanner)
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface Appointment_v2 {
  id: number;
  assignedBy: Pick<Member, 'id' | 'avatar' | 'name'>;
  member?: Pick<Member, 'id' | 'avatar' | 'name'>;
  subject?: string;
  bookedFor?: Date;
  queue?: { id: number; name: string };
  bookedIn: Date;
  date?: Date;
  session?: Session;
  state: {
    phase: 'done' | 'missed' | 'upcoming' | 'opened' | 'canceled' | 'in queue';
    isBooked: boolean;
  };
}
export interface Payment {
  id: number;
  amount: number;
  status: 'PENDING' | 'PAID' | 'CANCELED';
  date: Date;
  doneDate?: Date;
  name: string;
}
export type AppointmentBrief = Pick<
  Appointment_v2,
  'assignedBy' | 'state' | 'subject' | 'bookedFor' | 'date' | 'id'
>;
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
  [key: string]: any;
}

interface PrintingTemplate {
  paperFormat?: 'A4' | 'A5';
  margins?: any;
  letterSpacing?: number;
  template: CustomElement[];
}
interface CertificateTemplate {
  id: number;
  title: string;
  template?: Descendant[];
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
  PrintingTemplate,
  CertificateTemplate,
};
