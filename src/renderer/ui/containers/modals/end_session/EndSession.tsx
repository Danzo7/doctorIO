import SquareIconButton from '@components/buttons/square_icon_button/SquareIconButton';
import './style/index.scss';
import Print from 'toSvg/print.svg?icon';
import IconicButton from '@components/buttons/iconic_button';
import { color } from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import ModalContainer from '@components/modal_container';
interface EndSessionProps {
  onConfirm: () => void;
  onPrint: () => void;
}
export default function EndSession({ onConfirm, onPrint }: EndSessionProps) {
  return (
    <ModalContainer
      title="End the session?"
      gap={10}
      controls={
        <div className="end-session-controls">
          <IconicButton
            Icon={Print}
            backgroundColor={color.cold_blue}
            radius={7}
            iconSize={14}
            width={30}
            onPress={onPrint}
          />
          <TextButton
            text="Confirm"
            fontSize={14}
            fontColor={color.white}
            fontWeight={700}
            backgroundColor={color.good_green}
            padding=" 5px 15px"
            width={'100%'}
            onPress={onConfirm}
          />
        </div>
      }
    ></ModalContainer>
  );
}
