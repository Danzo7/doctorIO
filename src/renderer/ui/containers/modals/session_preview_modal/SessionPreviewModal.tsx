import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import PrintedLayout from '@components/printed_layout';
import SessionPreviewItem from '@components/session_preview_item';
import TabComponent from '@components/tab_component';
import { TimeLineDiagnosis } from '@layers/medical_session/pages/diagnosis_tab/DiagnosisTab';
import MedicamentTable from '@layers/medical_session/pages/prescription_tab/medicament_table';
import { useGetAppointmentDetailQuery } from '@redux/instance/Appointment/AppointmentApi';
import { modal } from '@stores/overlayStore';
import './style/index.scss';

interface SessionPreviewModalProps {
  id: number;
  patientName?: string;
  patientAge?: number;
}
export default function SessionPreviewModal({
  id,
  patientAge,
  patientName,
}: SessionPreviewModalProps) {
  const { data, isFetching } = useGetAppointmentDetailQuery(id);
  return (
    <ModalContainer
      isLoading={isFetching}
      gap={15}
      title="Session preview"
      controls={
        data &&
        patientAge != undefined &&
        patientName &&
        data.session?.prescription && (
          <TextButton
            text="Print..."
            backgroundColor={color.good_green}
            padding="5px 10px"
            fontSize={14}
            fontWeight={700}
            borderColor={color.border_color}
            onPress={() =>
              modal(
                () => (
                  <PrintedLayout
                    patientName={patientName}
                    patientAge={patientAge}
                    drugList={data.session!.prescription!}
                    doctorName={data.member?.memberName ?? 'Fix me'}
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
      {data && (
        <div className="tab-menu-container">
          <SessionPreviewItem
            bookedBy={data.assignedBy?.memberName}
            bookedIn={data.bookedFor ?? data.bookedIn}
            treatedBy={data.member?.memberName}
            treatedIn={data.date}
            subject={data.subject}
            state={data.state}
            bookedFor={data.bookedFor}
          />
          {data.session && (
            <TabComponent
              borderBottom={false}
              items={
                [
                  data.session.prescription && {
                    label: 'Prescription',
                    content: (
                      <MedicamentTable drugList={data.session.prescription} />
                    ),
                  },
                  data.session.diagnosis && {
                    label: 'Notice',
                    content: (
                      <TimeLineDiagnosis diagnosis={data.session.diagnosis} />
                    ),
                  },
                ].filter(Boolean) as any
              }
            />
          )}
        </div>
      )}
    </ModalContainer>
  );
}
