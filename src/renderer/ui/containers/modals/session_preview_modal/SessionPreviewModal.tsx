import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import PrintedLayout from '@components/printed_layout';
import TabMenu from '@components/tab_menu';
import { TimeLineDiagnosis } from '@layers/medical_session/pages/diagnosis_tab/DiagnosisTab';
import MedicamentTable from '@layers/medical_session/pages/prescription_tab/medicament_table';
import { useOverlay } from '@libs/overlay/useOverlay';
import { Session } from '@models/instance.model';
import { useGetClinicQuery } from '@redux/clinic/clinicApi';
import './style/index.scss';

interface SessionPreviewModalProps {
  session: Session;
  patientName?: string;
  patientAge?: number;
  memberName?: string;
}
export default function SessionPreviewModal({
  session,
  patientName,
  patientAge,
  memberName,
}: SessionPreviewModalProps) {
  const { open } = useOverlay();
  const { isSuccess, isLoading, data } = useGetClinicQuery();

  return (
    <ModalContainer
      title="Session preview"
      controls={
        patientAge &&
        patientName &&
        memberName && (
          <TextButton
            text="Print..."
            backgroundColor={color.lighter_background}
            padding="10px 15px"
            fontSize={13}
            fontWeight={700}
            borderColor={color.border_color}
            disabled={isLoading && !isSuccess}
            onPress={() =>
              data &&
              open(
                <PrintedLayout
                  patientName={patientName}
                  patientAge={patientAge}
                  drugList={session.prescription}
                  doctorName={memberName}
                />,
                {
                  closeOnClickOutside: true,
                  closeOnBlur: true,
                  isDimmed: true,
                  clickThrough: false,
                },
              )
            }
          />
        )
      }
    >
      <div className="tab-menu-container">
        <TabMenu
          items={
            ['prescription', session.diagnosis && 'Diagnosis'].filter(
              Boolean,
            ) as string[]
          }
          borderBottom={false}
          menuItemsAlignment="center"
        >
          <MedicamentTable drugList={session.prescription} />
          {session.diagnosis && (
            <TimeLineDiagnosis diagnosis={session.diagnosis} />
          )}
        </TabMenu>
      </div>
    </ModalContainer>
  );
}
