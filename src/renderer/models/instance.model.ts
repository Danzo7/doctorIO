interface AppointmentQueueItem {
  patientId: number;
  patientName: string;
  date: Date;
  diagnosis?: Diagnosis;
}
interface Diagnosis {
  diagnosisId: number;
}
interface BookedAppointment {
  appointmentId: number;
  patientId: number;
  date: Date;
}
interface AppointmentQueue {
  roleId: number;
  list: AppointmentQueueItem[];
}
interface Patient {
  patId: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  registerDate: string;
  gender: string;
  testResult: TestResult;
  medicalDocuments: MedicalDocument[];
  medicalHistory: MedicalHistory[];
  session: Appointment[];
}
interface Session {
  sessionId: number;
  patientId: number;
  memberId: number;
  date: Date;
  notice: string;
  prescriptionId: number;
}
interface Appointment {
  id: number;
  status: 'done' | 'upcoming' | 'missed';
  dateGiving: Date;
  date?: Date;
  sessionId?: string;
  subject?: string;
  session?: Session;
  doctorId: number;
  assistantId: number;
}

interface MedicalDocument {
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
}
interface MedicalHistory {
  id: string;
  description: string;
  date: Date;
}
interface TestResult {}
export type {
  Appointment,
  BookedAppointment,
  Patient,
  AppointmentQueueItem,
  AppointmentQueue,
  Session,
  MedicalDocument,
  MedicalHistory,
  TestResult,
};
