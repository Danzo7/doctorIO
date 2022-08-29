import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import TabMenu from '@components/tab_menu';
import { TimelineNotice } from '@layers/medical_session/pages/diagnosis_tab/DiagnosisTab';
import MedicamentTable from '@layers/medical_session/pages/prescription_tab/medicament_table';
import { Session } from '@models/instance.model';
import './style/index.scss';

interface SessionPreviewModalProps {
  session: Session;
}
export default function SessionPreviewModal({
  session,
}: SessionPreviewModalProps) {
  return (
    <ModalContainer
      title="Session preview"
      controls={
        <TextButton
          text="Print..."
          backgroundColor={color.lighter_background}
          padding="10px 15px"
          fontSize={13}
          fontWeight={700}
          borderColor={color.border_color}
        />
      }
    >
      <div className="tab-menu-container">
        <TabMenu
          items={['prescription', 'notice']}
          borderBottom={false}
          menuItemsAlignment="center"
        >
          <MedicamentTable prescriptionList={session.prescription} />
          <TimelineNotice diagnosis={session.diagnosis} />
        </TabMenu>
      </div>
    </ModalContainer>
  );
}
