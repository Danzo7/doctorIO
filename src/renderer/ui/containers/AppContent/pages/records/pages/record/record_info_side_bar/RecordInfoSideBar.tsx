import DocumentPreviewPanel from '@components/document_preview_panel';
import MedicalHistory from '@components/medical_history';

import { Patient } from '@models/instance.model';
import './style/index.scss';
import { modal, DEFAULT_MODAL } from '@libs/overlay';

import AddPatientModal from '@containers/modals/add_patient_modal';
import PatientInfoCard from '@components/patient_card';
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
        onEdit={() => {
          modal(
            <AddPatientModal
              defaultValues={{
                patientId: patientId,
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                birthDate: data.birthDate,
                bloodGroup: data?.bloodType?.group ?? 'A',
                rh: data?.bloodType?.rh ?? true, //TODO fix bloodType is optional
              }}
            />,
            DEFAULT_MODAL,
          ).open();
        }}
      />

      <div className="scroll-div">
        <DocumentPreviewPanel patientId={patientId} />
        <MedicalHistory patientId={patientId} />
      </div>
    </div>
  );
}
