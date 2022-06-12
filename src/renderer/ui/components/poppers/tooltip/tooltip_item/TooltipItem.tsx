import color from '@assets/styles/color';
import TextButton from '@components/buttons/text_button';
import { FunctionComponent, ReactNode, SVGProps } from 'react';
import './style/index.scss';
type IconProps = {
  svg: FunctionComponent<SVGProps<SVGSVGElement>> | ReactNode;
  iconColor?: string;
  iconAfterColor?: string;
  iconType?: 'stroke' | 'fill';
};
interface TooltipItemProps {
  text: string;
  selectedColor?: string;
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>> | IconProps | ReactNode;
  onPress: () => void;
}
export default function TooltipItem({
  Icon,
  text,
  selectedColor = color.secondary_color,
  onPress,
}: TooltipItemProps) {
  return (
    <div className="tooltip-item">
      <TextButton
        Icon={Icon}
        text={text}
        fontSize={13}
        fontWeight={500}
        fontColor={color.white}
        afterBgColor={selectedColor}
        padding={'5px 10px'}
        alignment="start"
        width={'100%'}
        onPress={onPress}
      />
    </div>
  );
}
