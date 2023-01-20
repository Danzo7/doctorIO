import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import PrintedLayout from '@components/printed_layout';
import AppointmentDetailPreview from '@components/appointment_detail_preview';
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
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    drugList={data.session!.prescription!}
                    doctorName={data.member?.name ?? 'Unknown'}
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
          <AppointmentDetailPreview {...data} />
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
                    //TODO remove this
                    label: 'Certificates',
                    content: (
                      <TimeLineDiagnosis diagnosis={data.session.diagnosis} />
                    ),
                  },
                  //TODo show this instead
                  // data.session.certificates && {
                  //   label: 'Certificates',
                  //   content: (
                  //     <TimeLineDiagnosis diagnosis={data.session.diagnosis} />
                  //   ),
                  // },
                ].filter(Boolean) as any
              }
            />
          )}
        </div>
      )}
    </ModalContainer>
  );
}
