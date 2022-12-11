import colors from '@colors';
import { ComponentProps } from 'react';
import TextButton from '../text_button';
interface DarkLightCornerButtonProps {
  isActive?: boolean;
  blend?: true;
}
//the reason why i put borderColor={colors.background} is to eliminate the height change after hover //
function DarkLightCornerButton({
  isActive = false,
  fontColor: fontColor = colors.white,
  blend,
  ...others
}: DarkLightCornerButtonProps &
  Omit<
    ComponentProps<typeof TextButton>,
    | 'backgroundColor'
    | 'borderColor'
    | 'afterBgColor'
    | 'afterBorderColor'
    | 'radius'
  >) {
  return (
    <TextButton
      fontColor={fontColor}
      fontSize={14}
      backgroundColor={isActive && !blend ? colors.darkersec_color : undefined}
      borderColor={isActive && !blend ? colors.border_color : undefined}
      afterBgColor={!blend ? colors.darkersec_color : colors.secondary_color}
      afterBorderColor={!blend ? colors.border_color : undefined}
      radius={7}
      {...others}
    />
  );
}

export default DarkLightCornerButton;
