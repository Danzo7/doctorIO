import { color } from '@assets/styles/color';
import TextButton, {
  IconType,
  PressHandler,
} from '@components/buttons/text_button';
import './style/index.scss';

interface TooltipItemProps {
  text: string;
  selectedColor?: string;
  Icon?: IconType;
  onPress?: PressHandler;
  type?: 'normal' | 'warning';
}
export default function TooltipItem({
  Icon,
  text,
  selectedColor = color.secondary_color,
  onPress,
  type,
}: TooltipItemProps) {
  return (
    <div className="tooltip-item">
      <TextButton
        Icon={Icon}
        text={text}
        fontSize={13}
        fontWeight={500}
        fontColor={type == 'warning' ? color.hot_red : color.text_gray}
        afterFontColor={color.white}
        afterBgColor={type == 'warning' ? color.hot_red : selectedColor}
        padding={'5px 10px'}
        alignment="start"
        width={'100%'}
        onPress={onPress}
      />
    </div>
  );
}
