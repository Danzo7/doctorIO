import TextButton from '@components/buttons/text_button';
import './style/index.scss';
import color from '@assets/styles/color';
import Arrow from 'toSvg/arrow.svg?icon';
interface PdfPageSwitcherProps {
  text: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  alignSelf?:
    | 'center'
    | 'baseline'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'start'
    | 'stretch';
}
export default function PdfPageSwitcher({
  text,
  onLeftPress,
  onRightPress,
  alignSelf,
}: PdfPageSwitcherProps) {
  return (
    <div className="pdf-page-switcher" css={{ alignSelf: alignSelf }}>
      <TextButton
        disabled={onLeftPress == undefined}
        borderColor={color.border_color}
        padding="10px"
        afterBgColor={color.darkersec_color}
        onPress={onLeftPress}
      >
        <Arrow css={{ transform: 'rotate(90deg)' }} />
      </TextButton>
      <div className="page-number-div">
        <span>{text} </span>
      </div>
      <TextButton
        disabled={onRightPress == undefined}
        borderColor={color.border_color}
        padding="10px"
        afterBgColor={color.darkersec_color}
        onPress={onRightPress}
      >
        <Arrow css={{ transform: 'rotate(-90deg)' }} />
      </TextButton>
    </div>
  );
}
