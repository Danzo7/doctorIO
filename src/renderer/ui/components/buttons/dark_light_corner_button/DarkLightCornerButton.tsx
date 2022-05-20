import colors from '@colors';
import TextButton from '../text_button/TextButton';
interface DarkLightCornerButtonProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
  textColor?: string;
  type?: 'button' | 'submit' | 'reset';
}
//the reason why i put borderColor={colors.background} is to eliminate the height change after hover //
function DarkLightCornerButton({
  title,
  isActive = false,
  onPress,
  type,
  textColor = colors.white,
}: DarkLightCornerButtonProps) {
  return (
    <TextButton
      onPress={onPress}
      text={title}
      fontColor={textColor}
      fontSize={14}
      backgroundColor={isActive ? colors.darkersec_color : undefined}
      borderColor={isActive ? colors.border_color : undefined}
      afterBgColor={colors.darkersec_color}
      afterBorderColor={colors.border_color}
      radius={7}
      type={type}
    />
  );
}

export default DarkLightCornerButton;
