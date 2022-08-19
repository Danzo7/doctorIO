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
  state: 'PAUSED' | 'IDLE' | 'IN_PROGRESS' | 'WAITING';
  selected?: AppointmentQueueItem;
}
interface AppointmentQueueItem {
  patientId: number;
  patientName: string;
  date: Date;
  position: number;
  test?: Test;
  appointmentId: number;
}
interface Patient {
  firstName: string;
  lastName: string;
  birthDate: Date;
  registerDate: Date;
  gender: 'male' | 'female';
  age: number;
  test?: Test;
  nextAppointment?: Date;
  status: boolean;
}
interface PatientBrief {
  id: number;
  name: string;
}

interface Session {
  notice: string;
  prescription: Drug[];
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface Appointment_v2 {
  assignedBy: { memberId: number; memberName: string };
  member?: { memberId: number; memberName: string };
  subject: string;
  bookedFor?: Date;
  bookedIn: Date;
  date?: Date;
  session?: Session;
  diagnosis?: string;
  state: 'done' | 'done-booked' | 'missed' | 'upcoming' | 'opened' | 'canceled';
}

interface MedicalDocument {
  id: string;
  fileName: string;
  fileType: string;
  status: 'NORMAL' | 'LOST' | 'CORRUPTED';
  date: Date;
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

interface ServerError {
  statusCode: number;
  message: string | string[];
  error: string;
}
export type {
  ServerError,
  BookedAppointment,
  Patient,
  PatientBrief,
  AppointmentQueueItem,
  AppointmentQueue,
  Session,
  MedicalDocument,
  MedicalHistory,
  Test,
  Drug,
  QueueState,
  Appointment_v2 as Appointment,
};
