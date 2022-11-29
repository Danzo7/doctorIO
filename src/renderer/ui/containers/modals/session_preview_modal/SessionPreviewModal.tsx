import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import PrintedLayout from '@components/printed_layout';
import TabMenu from '@components/tab_menu';
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
}
export default function SessionPreviewModal({
  session,
  patientName,
  patientAge,
  memberName,
}: SessionPreviewModalProps) {
  const { isSuccess, isLoading, data } = useGetClinicQuery();
  const { prescription } = session;
  return (
    <ModalContainer
      gap={0}
      title="Session preview"
      controls={
        patientAge != undefined &&
        patientName &&
        memberName &&
        prescription &&
        data && (
          <TextButton
            text="Print..."
            backgroundColor={color.lighter_background}
            padding="10px 15px"
            fontSize={13}
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
        <TabMenu
          items={Object.keys(session)}
          borderBottom={false}
          menuItemsAlignment="center"
        >
          {session.prescription && (
            <MedicamentTable drugList={session.prescription} />
          )}
          {session.diagnosis && (
            <TimeLineDiagnosis diagnosis={session.diagnosis} />
          )}
        </TabMenu>
      </div>
    </ModalContainer>
  );
}
