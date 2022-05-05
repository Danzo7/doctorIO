import './style/index.scss';
import colors from '@colors';
import TextButton from '../text_button/TextButton';
interface DarkLightCornerButtonProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
//the reason why i put borderColor={colors.background} is to eliminate the height change after hover //
function DarkLightCornerButton({
  title,
  isActive = false,
  onPress,
  type,
}: DarkLightCornerButtonProps) {
  return (
    <div className="dark-light-corner-button">
      <TextButton
        onPress={onPress}
        text={title}
        fontColor={colors.white}
        fontSize={14}
        backgroundColor={isActive ? colors.darkersec_color : undefined}
        borderColor={isActive ? colors.border_color : undefined}
        afterBgColor={colors.darkersec_color}
        afterBorderColor={colors.border_color}
        radius={7}
        type={type}
      />
    </div>
  );
}

export default DarkLightCornerButton;
