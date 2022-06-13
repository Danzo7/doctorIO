import color from '@assets/styles/color';
import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import TextButton from '@components/buttons/text_button';
import Header from '@components/header';
import TextArea from '@components/inputs/text_area';
import './style/index.scss';
interface AddMedicalHistoryModalProps {}
export default function AddMedicalHistoryModal({}: AddMedicalHistoryModalProps) {
  return (
    <div className="add-medical-history-modal">
      <Header title="Medical history" buttonNode={<SquareIconButton />} />
      <TextArea fillContainer />
      <TextButton
        text="Add"
        backgroundColor={color.good_green}
        width="fit-content"
        alignSelf="center"
        padding={'5px 15px'}
        fontSize={12}
      />
    </div>
  );
}
