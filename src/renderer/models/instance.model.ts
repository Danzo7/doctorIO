interface Appointment {}
interface BookedAppointment {}
interface Patient {
  patId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  registerDate: string;
  gender: string;
  testResult: TestResult;
  medicalDocuments: MedicalDocument[];
  medicalHistory: MedicalHistory[];
  session: Session[];
}
interface Session {}
interface MedicalDocument {}
interface MedicalHistory {}
interface TestResult {}
export type { Appointment, BookedAppointment, Patient };
