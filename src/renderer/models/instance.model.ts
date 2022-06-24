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
  id: number;
  patientName: string;
  patientId: number;
  bookTime: Date;
  state: 'panding' | 'in queue';
}
interface AppointmentQueue {
  roleId: number;
  list: AppointmentQueueItem[];
}
interface Patient {
  patId: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  registerDate: Date;
  gender: 'male' | 'female';
  age: number;
  testResult: TestResult;
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
}
interface Session {
  sessionId: number;
  patientId: number;
  memberId: number;
  date: Date;
  notice: string;
  prescriptionId: number;
}

type Appointment = {
  id: number;
  patId?: number; //foreign
  doctorId: number;
  assistantId: number;
  doctorName: string;
  assistantName: string;
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
interface MedicalHistory {
  id: number;
  description: string;
  date: Date;
}
interface TestResult {
  weight: number;
  height: number;
  bloodType: 'A' | 'B';
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
  TestResult,
};
