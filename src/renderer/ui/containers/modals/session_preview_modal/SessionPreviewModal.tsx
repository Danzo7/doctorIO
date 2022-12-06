import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import PrintedLayout from '@components/printed_layout';
import SessionPreviewItem from '@components/session_preview_item';
import TabComponent from '@components/tab_component';
import { TimeLineDiagnosis } from '@layers/medical_session/pages/diagnosis_tab/DiagnosisTab';
import MedicamentTable from '@layers/medical_session/pages/prescription_tab/medicament_table';
import { Session } from '@models/instance.model';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import { modal } from '@stores/overlayStore';
import './style/index.scss';

interface SessionPreviewModalProps {
  session: Session;
  patientName?: string;
  patientAge?: number;
  memberName?: string;
  bookedBy?: string;
  treatedBy?: string;
  bookedIn?: Date;
  treatedIn?: Date;
  subject?: string;
}
export default function SessionPreviewModal({
  session,
  patientName,
  patientAge,
  memberName,
  bookedBy,
  treatedBy,
  bookedIn,
  treatedIn,
  subject,
}: SessionPreviewModalProps) {
  const { isSuccess, isLoading, data } = useGetClinicQuery();
  const { prescription } = session;
  return (
    <ModalContainer
      gap={15}
      title="Session preview"
      controls={
        patientAge != undefined &&
        patientName &&
        memberName &&
        prescription &&
        data && (
          <TextButton
            text="Print..."
            backgroundColor={color.good_green}
            padding="5px 10px"
            fontSize={14}
            fontWeight={700}
            borderColor={color.border_color}
            disabled={isLoading && !isSuccess}
            onPress={() =>
              modal(
                () => (
                  <PrintedLayout
                    patientName={patientName}
                    patientAge={patientAge}
                    drugList={prescription}
                    doctorName={memberName}
                  />
                ),
                {
                  closeOnClickOutside: true,
                  closeOnBlur: true,
                  isDimmed: true,
                  clickThrough: false,
                },
              ).open()
            }
          />
        )
      }
    >
      <div className="tab-menu-container">
        <SessionPreviewItem
          bookedBy={bookedBy}
          bookedIn={bookedIn}
          treatedBy={treatedBy}
          treatedIn={treatedIn}
          subject={subject}
        />
        <TabComponent
          borderBottom={false}
          items={
            [
              session.prescription && {
                label: 'Prescription',
                content: <MedicamentTable drugList={session.prescription} />,
              },
              session.diagnosis && {
                label: 'Notice',
                content: <TimeLineDiagnosis diagnosis={session.diagnosis} />,
              },
            ].filter(Boolean) as any
          }
        />
      </div>
    </ModalContainer>
  );
}
