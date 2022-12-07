import DocumentPreviewPanel from '@components/document_preview_panel';
import MedicalHistory from '@components/medical_history';
import { PatientInfoCard } from '@components/patient_card';
import { Patient } from '@models/instance.model';
import './style/index.scss';
interface RecordInfoSideBarProps {
  data: Patient;
  patientId: number;
  numPostAppointment: number;
}
export default function RecordInfoSideBar({
  data,
  patientId,
  numPostAppointment,
}: RecordInfoSideBarProps) {
  return (
    <div className="record-info-side-bar">
      <PatientInfoCard
        patientFullName={data.firstName + ' ' + data.lastName}
        patientId={'#' + patientId}
        birthDate={data.birthDate}
        bloodType={data.bloodType}
        registerDate={data.registerDate}
        gender={data.gender}
        numPostAppointment={numPostAppointment}
        nextAppointmentDate={data.nextAppointment}
      />

      <div className="scroll-div">
        <DocumentPreviewPanel patientId={Number(patientId)} />
        <MedicalHistory patientId={Number(patientId)} />
      </div>
    </div>
  );
}
