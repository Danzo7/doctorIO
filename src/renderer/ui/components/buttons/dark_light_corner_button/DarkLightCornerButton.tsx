import colors from '@colors';
import TextButton, { PressHandler } from '../text_button';
interface DarkLightCornerButtonProps {
  title: string;
  isActive?: boolean;
  onPress?: PressHandler;
  textColor?: string;
  blend?: true;
  type?: 'button' | 'submit' | 'reset';
  blank?: true;
}
//the reason why i put borderColor={colors.background} is to eliminate the height change after hover //
function DarkLightCornerButton({
  title,
  isActive = false,
  onPress,
  type,
  textColor = colors.white,
  blend,
  blank,
}: DarkLightCornerButtonProps) {
  return (
    <TextButton
      onPress={onPress}
      text={title}
      fontColor={textColor}
      fontSize={14}
      backgroundColor={isActive && !blend ? colors.darkersec_color : undefined}
      borderColor={isActive && !blend ? colors.border_color : undefined}
      afterBgColor={!blend ? colors.darkersec_color : colors.secondary_color}
      afterBorderColor={!blend ? colors.border_color : undefined}
      radius={7}
      type={type}
      blank={blank}
    />
  );
}

export default DarkLightCornerButton;
