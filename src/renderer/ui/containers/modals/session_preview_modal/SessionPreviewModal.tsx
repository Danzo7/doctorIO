import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
import TabMenu from '@components/tab_menu';
import NoticeTab from '@layers/medical_session/pages/notice_tab';
import MedicamentTable from '@layers/medical_session/pages/prescription_tab/medicament_table';
import './style/index.scss';

const dataList = [
  {
    drugName: 'aymen',
    qts: 15,
    dose: 3,
    duration: '5 days',
    comment: 'dont die',
    id: 1,
  },
  {
    drugName: 'aymen',
    qts: 10,
    dose: 3,
    duration: '5 days',
    comment: 'dont die',
    id: 2,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: '5 days',
    comment: 'dont die',
    id: 3,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: '5 days',
    comment: 'dont die',
    id: 3,
  },
  {
    drugName: 'aymen',
    qts: 5,
    dose: 3,
    duration: '5 days',
    comment: 'dont die',
    id: 3,
  },
];

interface SessionPreviewModalProps {}
export default function SessionPreviewModal({}: SessionPreviewModalProps) {
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
          <MedicamentTable dataList={dataList} />
          <NoticeTab />
        </TabMenu>
      </div>
    </ModalContainer>
  );
}
