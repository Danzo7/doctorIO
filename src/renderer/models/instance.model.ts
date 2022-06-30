interface AppointmentQueueItem {
  patientId: number;
  patientName: string;
  date: Date;
  position: number;
  diagnosis?: TestResult;
}
interface BookedAppointment {
  id: number;
  patientName: string;
  patientId: number;
  bookTime: Date;
  bookedBy: { memberId: number; memberName: string };
  state: 'panding' | 'in queue';
}

interface AppointmentQueue {
  roleId: number;
  state:
    | 'paused'
    | ({ state: 'inProgress' | 'waiting' } & AppointmentQueueItem);
  appointments: AppointmentQueueItem[];
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
  description: string;
  dosage: string;
  duration: string;
  endDate: Date;
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
